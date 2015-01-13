// client.js - main client file that does most of the processing
'use strict';

var fs           = require('fs'),
    constants    = require('constants'),
    request      = require('request'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    Client       = require('./client').Client,
    qs           = require('querystring'),
    async        = require('async'),
    path         = require('path'),
    flatten      = require('flatten'),
    pjson        = require('./../../package.json'),
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
    },

Client = exports.Client = function (options) {
  this.options = options;
  this.userAgent = 'node-zendesk/' + pjson.version + ' (node/' + process.versions.node + ')';
  // Each client has its own cookies to isolate authentication between clients
  this._request = request.defaults({
    jar:      this.options.get('no-cookies') ? false : request.jar(),
    encoding: this.options.get('encoding') || null,
    timeout:  this.options.get('timeout')  || 240000,
    proxy:    this.options.get('proxy')    || null,
    secureOptions: constants.SSL_OP_NO_TLSv1_2
  });

  if (!this.jsonAPIName) {
    this.jsonAPIName = null;
  }
  if (!this.jsonAPIName2) {
    this.jsonAPIName2 = null;
  }
  if (!this.jsonAPIName3) {
    this.jsonAPIName3 = null;
  }

  if ('function' !== typeof this.options.get) {
    this.options.get = function (key) {
      return this[key];
    };
  }

};

util.inherits(Client, EventEmitter);

Client.prototype.request = function (method, uri) {
  var options, params = '', lastElement, url, self = this, res, args = Array.prototype.slice.call(arguments),
      callback = args.pop(),
      body     = 'object' === typeof args[args.length - 1] && !Array.isArray(args[args.length - 1]) && args.pop(),
      auth     = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
      encoded  = new Buffer(this.options.get('username') + auth).toString('base64'),
      proxy    = this.options.get('proxy'),
      useOAuth = this.options.get('oauth'),
      token    = this.options.get('token');

  if ('object' === typeof uri && Array.isArray(uri)) {
    lastElement = uri.pop();
    if ('object' === typeof lastElement) {// we have recieved an object ex. {"sort_by":"id","sort_order":"desc"}
      params = '?' + qs.stringify(lastElement);
    } else { // we have recieved a query string ex. '?sort_by=id&sort_order=desc'
      if (0 === lastElement.toString().indexOf('?')) {
        params = lastElement;
      } else {
        uri.push(lastElement);
      }
    }
    url = this.options.get('remoteUri') + '/' + uri.join('/') + '.json' + params;
  } else {
    if (uri.indexOf(this.options.get('remoteUri')) === -1) {
      url = this.options.get('remoteUri') + uri;
    } else {
      url = uri;
    }
  }

  if (!options) {
    var headerObj = {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
      'User-Agent':   self.userAgent
    };
    if (useOAuth) {// token is an oauth token obtained from OAuth2
      headerObj['Authorization'] = 'Bearer ' + token;
      options = {
        method: method || 'GET',
        uri: url,
        headers: headerObj
      };
    } else {// token is an API token obtained from the Zendesk Settings UI
      headerObj['Authorization'] = 'Basic ' + encoded;
      options = {
        method: method || 'GET',
        uri: url,
        headers: headerObj
      };
    }
  }

  if (body) {
    options.body = JSON.stringify(body);
  } else if ('GET' !== method) {
    options.body = '{}';
  }

  if (proxy) {
    options.proxy = proxy;
  }

  self = this;
  self.emit('debug::request', options);

  return this._request(options, function (err, response, result) {
    if (err) {
      return callback(err);
    }

    var statusCode, error, retryAfter;

    if (!result) {// should this really be an error?
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
      self.emit('debug::error', {exception: ex, code: statusCode, request: options, result: result});
    }

    self.emit('debug::response', {statusCode: statusCode, result: result});

    retryAfter = response.headers['Retry-After'];
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
    if (res) {
      if (!body && null !== self.jsonAPIName) {
        body = res[(self.jsonAPIName.toString())];
      }
      if (!body && null !== self.jsonAPIName2) {
        body = res[(self.jsonAPIName2.toString())];
      }
      if (!body && null !== self.jsonAPIName3) {
        body = res[(self.jsonAPIName3.toString())];
      }

      if (!body) {
        body = res;
      }
    } else {
      body = '';
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
      function () {return null !== nextPage && 'undefined' !==  typeof nextPage; },
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

Client.prototype.requestUpload = function (uri, file, fileToken, callback) {
  var self     = this,
      out,
      auth     = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
      encoded  = new Buffer(this.options.get('username') + auth).toString('base64'),
      useOAuth = this.options.get('oauth'),
      token = this.options.get('token');

  if (null !== fileToken && undefined !== fileToken && '' !== fileToken) {
    uri.push({filename: path.basename(file), token: fileToken});
  } else {
    uri.push({filename: path.basename(file)});
  }

  fs.stat(file, function (err, stat) {
    if (err) {
      return callback(err);
    }

    var headerObj = {
      'Content-Type':   'application/octet-stream',
      'Content-Length': stat.size,
      'User-Agent':     self.userAgent
    };
    if (useOAuth) {
      headerObj['Authorization'] = 'Bearer ' + token;
      this.options = {
        method: 'POST',
        uri: self.options.get('remoteUri') + '/' + uri.join('/'),
        headers: headerObj
      };
    } else {
      headerObj['Authorization'] = 'Basic ' + encoded;
      this.options = {
        method: 'POST',
        uri: self.options.get('remoteUri') + '/' + uri.join('/'),
        headers: headerObj
      };
    }

    out  = Client.prototype.request.apply(self, ['POST', uri,  function (error, request, result) {
      if (error) {
        return callback(error);
      }

      callback(null, request, result);

    }]);

    fs.createReadStream(file).pipe(out);

  });
};
