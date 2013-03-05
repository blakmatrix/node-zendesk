//client.js

var fs           = require('fs'),
    request      = require('request'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    Client       = require('./client').Client,
    qs           = require('querystring'),
    async        = require('async'),
    path         = require('path'),
    flatten      = require('flatten');


var Client = exports.Client = function (options) {
  this.options = options;
  // Each client has its own cookies to isolate authentication between clients
  this._request = request.defaults({jar: request.jar()});

  if (!this.jsonAPIName) {
    this.jsonAPIName = null;
  }
  if (!this.jsonAPIName2) {
    this.jsonAPIName2 = null;
  }

  if (typeof this.options.get !== 'function') {
    this.options.get = function (key) {
      return this[key];
    };
  }

};

util.inherits(Client, EventEmitter);

Client.prototype.request = function (method, uri) {
  var options, params = '', last_element, url, self, res, args = Array.prototype.slice.call(arguments),
      callback = args.pop(),
      body     = typeof args[args.length - 1] === 'object' && !Array.isArray(args[args.length - 1]) && args.pop(),
      auth     = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
      encoded  = new Buffer(this.options.get('username') + auth).toString('base64'),
      proxy    = this.options.get('proxy');

  if (typeof uri === 'object' && Array.isArray(uri)) {
    last_element = uri.pop();
    if (typeof last_element === 'object') {
      params = '?' + qs.stringify(last_element);
    } else {
      uri.push(last_element);
    }
    url = this.options.get('remoteUri') + '/' + uri.join('/') + '.json' + params;
  } else {
    if (uri.indexOf(this.options.get('remoteUri')) === -1) {
      url = this.options.get('remoteUri') + uri;
    } else {
      url = uri;
    }
  }

  if(!options){
    options = {
      method: method || 'GET',
      uri: url,
      headers: {
        'Authorization': 'Basic ' + encoded,
        'Content-Type' : 'application/json',
        'Accept'       : 'application/json'
      }
    };
  }

  if (body) {
    options.body = JSON.stringify(body);
  }
  else if (method !== 'GET') {
    options.body = '{}';
  }

  if (proxy) {
    options.proxy = proxy;
  }

  self = this;
  self.emit('debug::request', options);

  this._request(options, function (err, response, result) {
    if (err) {
      return callback(err);
    }

    var statusCode, result, error;

    try {
      statusCode = response.statusCode;
      res = JSON.parse(result);
    }
    catch (ex) {
      // Ignore Errors
    }

    self.emit('debug::response', { statusCode: statusCode, result: result });

    var retryAfter = response.headers['Retry-After'];
    if (retryAfter) {
      error = new Error('Zendesk rate limits 200 requests per minute');
      error.statusCode = 429;
      error.result = retryAfter;
      return callback(error);
    }

    if (failCodes[statusCode]) {
      error = new Error('Zendesk Error (' + statusCode + '): ' + failCodes[statusCode]);
      error.statusCode = statusCode;
      error.result = result;
      return callback(error);
    }

    body = null;
    if (!body && self.jsonAPIName !== null) {
        body = res[(self.jsonAPIName.toString())];
    }
    if (!body && self.jsonAPIName2 !== null) {
        body = res[(self.jsonAPIName2.toString())];
    }
    if (!body) {
        body = res;
    }

    callback(null, statusCode, body, response, res);
  });
};

Client.prototype.requestAll = function (method, uri) {
  var args         = Array.prototype.slice.call(arguments),
      callback     = args.pop(),
      nextPage     = 'Not Null!',
      bodyList     = [],
      statusList   = [],
      responseList = [],
      resultList   = [],
      self         = this;


  return Client.prototype.request.apply(this, args.concat(function (error, status, body, response, result) {
    if (error) {
      return callback(error);
    }

    statusList.push(status);
    bodyList.push(body);
    responseList.push(response);
    resultList.push(result);
    nextPage = result.next_page;

    async.whilst(
      function () {return nextPage !== null && nextPage !== 'undefined'; },
      function (cb) {
        Client.prototype.request.apply(self, ['GET', nextPage, function (error, status, body, response, result) {
          if (error) {
            return cb(error);
          }

          statusList.push(status);
          bodyList.push(body);
          responseList.push(response);
          resultList.push(result);
          nextPage = result.next_page;
          cb(null);
        }]);
      },
      function (err) {
        if (err) {
          callback(err);
        } else {
          return callback(null, statusList, flatten(bodyList), responseList, resultList);
        }
      }
      );
  }));
};


Client.prototype.requestUpload = function (uri, file, fileToken, callback) {//TODO
  var self       = this,
      out,
      auth     = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
      encoded  = new Buffer(this.options.get('username') + auth).toString('base64');

  if (fileToken !== null && fileToken !== undefined && fileToken !== '') {
    uri.push({filename: path.basename(file), token: fileToken});
  } else {
    uri.push({filename: path.basename(file)});
  }

  fs.stat(file, function (err, stat) {
    if (err) {
      return callback(err);
    }

    this.options = {
      method: 'POST',
      uri: self.options.get('remoteUri') + '/' + uri.join('/'),
      headers: {
        'Authorization' : 'Basic ' + encoded,
        'Content-Type'  : 'application/octet-stream',
        'Content-Length': stat.size
      }
    };

    out  = Client.prototype.request.apply(this, ['POST', uri,  function (error, request, result) {
      if (error) {
        return callback(error);
      }

      callback(null, request, result);

    }]);

    fs.createReadStream(file).pipe(out);

  });
};

var failCodes = {
  400: 'Bad Request',
  401: 'Not Authorized',
  403: 'Forbidden',
  404: 'Item not found',
  405: 'Method not Allowed',
  409: 'Conflict',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable'
};

