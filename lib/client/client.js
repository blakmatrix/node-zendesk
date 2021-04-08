// client.js - main client file that does most of the processing
'use strict';

var stream = require('stream'),
  fs = require('fs'),
  constants = require('crypto').constants,
  request = require('request'),
  util = require('util'),
  EventEmitter = require('events').EventEmitter,
  qs = require('querystring'),
  async = require('async'),
  throttler = require('./throttle'),
  pjson = require('./../../package.json'),
  failCodes = {
    400: 'Bad Request',
    401: 'Not Authorized',
    403: 'Forbidden',
    404: 'Item not found',
    405: 'Method not Allowed',
    409: 'Conflict',
    422: 'Unprocessable Entity',   // zendesk sends this one back when you re-use an organization name
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    503: 'Service Unavailable'
  };


// recursive flatten deep
function flatten(array) {
  var flattend = [];
  !(function flat(array) {
    array.forEach(function (el) {
      if (Array.isArray(el)) flat(el);
      else flattend.push(el);
    });
  })(array);
  return flattend;
}

var Client = exports.Client = function (options) {
  this.options = options;
  this.sideLoad = [];
  this.userAgent = 'node-zendesk/' + pjson.version + ' (node/' + process.versions.node + ')';
  // Each client has its own cookies to isolate authentication between clients
  this._request = request.defaults({
    jar: this.options.get('no-cookies') ? false : request.jar(),
    encoding: this.options.get('encoding') || null,
    timeout: this.options.get('timeout') || 240000,
    proxy: this.options.get('proxy') || null,
    secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
    forever: true,
    pool: { maxSockets: 100 },
    secureProtocol: 'TLSv1_2_method',
  });

  if (!this.jsonAPINames) {
    this.jsonAPINames = [];
  }

  if ('function' !== typeof this.options.get) {
    this.options.get = function (key) {
      return this[key];
    };
  }

};

util.inherits(Client, EventEmitter);

Client.prototype.request = function (method, uri) {
  var options, url, self = this, args = Array.prototype.slice.call(arguments),
    callback = args.pop(),
    body = 'object' === typeof args[args.length - 1] && !Array.isArray(args[args.length - 1]) && args.pop(),
    auth = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
    encoded = Buffer.from(this.options.get('username') + auth).toString('base64'),
    proxy = this.options.get('proxy'),
    useOAuth = this.options.get('oauth'),
    token = this.options.get('token'),
    asUser = this.options.get('asUser'),
    customHeaders = this.options.get('customHeaders');

  url = assembleUrl(self, uri);

  self.options.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': self.userAgent,
    'Content-Length': body.length
  };

  if (asUser) {
    self.options.headers['X-On-Behalf-Of'] = asUser;
  }

  if (useOAuth) {// token is an oauth token obtained from OAuth2
    self.options.headers.Authorization = 'Bearer ' + token;
  } else {// token is an API token obtained from the Zendesk Settings UI
    self.options.headers.Authorization = 'Basic ' + encoded;
  }

  if (customHeaders) {
    self.options.headers = { ...self.options.headers, ...customHeaders };
  }

  self.options.uri = url;
  self.options.method = method || 'GET';

  if ('GET' === method) {
    self.options.body = undefined;
  } else if (body) {
    self.options.body = JSON.stringify(body);
  } else if ('GET' !== method && 'application/json' === self.options.headers['Content-Type']) {
    self.options.body = '{}';
  }

  if (proxy) {
    self.options.proxy = proxy;
  }

  self.emit('debug::request', self.options);

  return new Promise(function (resolve, reject) {
    self._request(self.options, function (err, response, result) {
      var stdCb = function (error, statusCode, body, response) {
        if (error) return reject(error);
        return resolve(body);
      };
      return requestCallback(self, err, response, result, callback || stdCb);
    });
  });
};

Client.prototype.requestAll = function (method, uri) {
  var args = Array.prototype.slice.call(arguments),
    callbackOpt = args.pop(),
    nextPage = 'Not Null!',
    count = -1,
    bodyList = [],
    statusList = [],
    responseList = [],
    resultList = [],
    self = this,
    throttle = this.options.get('throttle'),
    isIncremental = uri[0] === 'incremental',
    __request = Client.prototype.request;

  return new Promise(function (resolve, reject) {
    var errorCb, nextCb, completeCb;
    if (typeof callbackOpt === 'function') {
      errorCb = callbackOpt;
      nextCb = function () { };
      completeCb = function (sl, bl, rl, rsl) { // avoids scope collision
        callbackOpt(null, sl, bl, rl, rsl)
      };
    } else {
      callbackOpt = callbackOpt || {};
      errorCb = callbackOpt.error || reject;
      nextCb = callbackOpt.next || function () { };
      completeCb = callbackOpt.complete || function (sl, scopedBodyList, rl, rsl) { resolve(scopedBodyList); }; // avoids scope collision
    }

    if (throttle) {
      __request = throttler(self, Client.prototype.request, throttle);
    }

    function processPage(status, body, response, result) {
      if (completeCb) { // only accumulate pages if a completeCb is provided
        statusList.push(status);
        bodyList.push(body);
        responseList.push(response);
        resultList.push(result);
      }
      nextPage = result ? result.next_page : null;
      count = result ? result.count : 0;
      nextCb(status, body, response, result, nextPage);
    }

    return __request.apply(self, args.concat(function (error, status, body, response, result) {
      if (error) {
        return errorCb(error);
      }
      processPage(status, body, response, result);
      async.whilst(
        function (cb) {
          if (nextPage === null || (isIncremental && count < 1000)) {
            nextPage = '';
          }
          cb(null, nextPage);
        },
        function (cb) {
          __request.apply(self, ['GET', nextPage, function (error, status, body, response, result) {
            if (error) {
              return cb(error);
            }
            processPage(status, body, response, result);
            cb(null);
          }]);
        },
        function (err) {
          if (err) {
            return errorCb(err);
          } else if (completeCb) {
            return completeCb(statusList, flatten(bodyList), responseList, resultList);
          }
        }
      );
    }));
  });

};

Client.prototype.requestUpload = function (uri, file, callback) {
  var self = this,
    out,
    auth = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
    encoded = Buffer.from(this.options.get('username') + auth).toString('base64'),
    useOAuth = this.options.get('oauth'),
    token = this.options.get('token'),
    uploadOptions = self.options,
    binary = uri[1] ? (uri[1].binary || file instanceof stream) : false;

  self.options.uri = assembleUrl(self, uri);
  self.options.method = 'POST';
  // Fixes ERR_STREAM_WRITE_AFTER_END after new ticket creation
  if (self.options.body) delete self.options.body

  self.options.headers = { 'Content-Type': 'application/binary' };

  if (useOAuth) {
    self.options.headers.Authorization = 'Bearer ' + token;
  } else {
    self.options.headers.Authorization = 'Basic ' + encoded;
  }

  self.emit('debug::request', self.options);

  return new Promise(function (resolve, reject) {

    var stdCallback = function (error, statusCode, body, response) {
      if (error) return reject(error);
      return resolve(body);
    };

    // assumes a binary file is passed in instead of a path
    if (binary) {
      self.options.body = file;
      return self._request(self.options, function (err, response, result) {
        if (!callback) callback = stdCallback;
        return requestCallback(self, err, response, result, callback);
      });
    } else {
      out = self._request(self.options, function (err, response, result) {
        if (!callback) callback = stdCallback;
        return requestCallback(self, err, response, result, callback);
      });
      fs.createReadStream(file).pipe(out); // pipe the file!
    }
  });
};

Client.prototype.setSideLoad = function (arr) {
  var self = this;
  self.sideLoad = arr;
}

function checkRequestResponse(self, response, result, callback) {
  var statusCode, error, retryAfter, res;

  if (!result) { // should this really be an error?
    error = new Error('Zendesk returned an empty result');
    error.statusCode = 204;
    return callback(error);
  }
  try {
    statusCode = response.statusCode;
    res = JSON.parse(result);
  }
  catch (ex) {
    // Emit Errors
    self.emit('debug::error', { exception: ex, code: statusCode, request: self.options, result: result });
  }

  self.emit('debug::response', { statusCode: statusCode, result: result });

  retryAfter = response.headers['retry-after'];
  if (retryAfter) {
    error = new Error('Zendesk rate limits 200 requests per minute');
    error.statusCode = 429;
    error.result = result;
    error.retryAfter = retryAfter;
    return callback(error);
  }

  if (failCodes[statusCode]) {
    error = new Error('Zendesk Error (' + statusCode + '): ' + failCodes[statusCode]);
    error.statusCode = statusCode;
    error.result = result;
    error.retryAfter = null;
    return callback(error);
  }

  return callback(null, res);
}

function requestCallback(self, err, response, result, callback) {
  if (err) {
    return callback(err);
  }

  checkRequestResponse(self, response, result, function (err, res) {
    if (err) {
      return callback(err);
    }
    var body = null;
    if (res) {
      if (self.jsonAPINames) {
        for (var i = 0; i < self.jsonAPINames.length; i++) {
          if (res.hasOwnProperty(self.jsonAPINames[i].toString())) {
            body = res[self.jsonAPINames[i].toString()];
            break;
          }
        }
      }

      if (!body) {
        body = res;
      }
      if (self.hasOwnProperty('sideLoadMap')) {
        body = populateFields(body, res, self.sideLoadMap);
      }
    } else {
      body = '';
    }

    return callback(null, response.statusCode, body, response, res);
  });

}

function populateFields(data, response, map) {
  if (Array.isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      var record = data[i];
      populateRecord(record);
    }
  } else {
    populateRecord(data);
  }
  return data;

  function populateRecord(record) {
    for (var i = 0; i < map.length; i++) {
      var field = map[i].field;
      var name = map[i].name;
      var dataset = map[i].dataset;


      if (record.hasOwnProperty(field) && response.hasOwnProperty(dataset)) {
        //If specifying all, then put everything in response[dataset] to record[name]
        if (map[i].hasOwnProperty('all') && map[i].all === true) {
          record[name] = response[dataset];
        } else {
          var key = 'id';
          if (map[i].hasOwnProperty('dataKey')) {
            key = map[i].dataKey;
          }
          if (map[i].hasOwnProperty('array') && map[i].array) {
            record[name] = findAllRecordsById(response[dataset], key, record[field]);
          } else {
            record[name] = findOneRecordById(response[dataset], key, record[field]);
          }
        }
      }
    }
    return record;
  }
}

function findAllRecordsById(data, key, id) {
  var arr = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i][key] === id) {
      arr.push(data[i]);
    }
  }
  return arr;
}

function findOneRecordById(data, key, id) {
  for (var i = 0; i < data.length; i++) {
    if (data[i][key] === id) {
      return data[i];
    }
  }
  return null;
}

function assembleUrl(self, uri) {
  var lastElement,
    params = '';

  if ('object' === typeof uri && Array.isArray(uri)) {
    lastElement = uri.pop();
    if (lastElement) {
      // we have received an object ex. {"sort_by":"id","sort_order":"desc"}
      if ('object' === typeof lastElement) {
        if (self.sideLoad.length) {
          lastElement.include = self.sideLoad.join(',');
        }
        params = '?' + qs.stringify(lastElement);
      }
      // we have received a query string ex. '?sort_by=id&sort_order=desc'
      else if (0 === lastElement.toString().indexOf('?')) {
        if (self.sideLoad.length) {
          lastElement += '&include=' + self.sideLoad.join(',');
        }
        params = lastElement;
      }
      else {
        if (self.sideLoad.length) {
          params = '?include=' + self.sideLoad.join(',');
        }
        uri.push(lastElement);
      }
    }
    return self.options.get('remoteUri') + '/' + uri.join('/') + '.json' + params;
  }
  else if ('string' === typeof uri && uri.indexOf(self.options.get('remoteUri')) === -1) {
    return self.options.get('remoteUri') + uri;
  }
  else {
    return uri;
  }
}
