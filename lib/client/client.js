//client.js

var fs           = require('fs'),
    request      = require('request'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    Client       = require('./client').Client,
    qs           = require('querystring');;


var Client = exports.Client = function (options) {
  this.options = options;
  this._request = request;

  if (typeof this.options.get !== 'function') {
    this.options.get = function (key) {
      return this[key];
    };
  }

};

util.inherits(Client, EventEmitter);


// TODO?: Collections 100 records per page limit, Stop paging when the next_page attribute is null
// ?page=1 , count attribute lists total
Client.prototype.request = function (method, uri) {
  var options, params = '', last_element, args = Array.prototype.slice.call(arguments),
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
  }


  options = {
    method: method || 'GET',
    uri: this.options.get('remoteUri') + '/' + uri.join('/') + '.json' + params,
    headers: {
      'Authorization': 'Basic ' + encoded,
      'Content-Type' : 'application/json',
      'Accept'       : 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  else if (method !== 'GET') {
    options.body = '{}';
  }

  if (proxy) {
    options.proxy = proxy;
  }

  var self = this;

  self.emit('debug::request', options);

  this._request(options, function (err, response, body) {
    if (err) {
      return callback(err);
    }

    var statusCode, result, error;

    try {
      statusCode = response.statusCode;
      result = JSON.parse(body);
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

    callback(null, response, result);
  });
};

Client.prototype.requestAll = function (method, uri) {//TODO
  var options, params = '', last_element, args = Array.prototype.slice.call(arguments),
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
  }


  options = {
    method: method || 'GET',
    uri: this.options.get('remoteUri') + '/' + uri.join('/') + '.json' + params,
    headers: {
      'Authorization': 'Basic ' + encoded,
      'Content-Type' : 'application/json',
      'Accept'       : 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  else if (method !== 'GET') {
    options.body = '{}';
  }

  if (proxy) {
    options.proxy = proxy;
  }

  var self = this;

  self.emit('debug::request', options);

  this._request(options, function (err, response, body) {
    if (err) {
      return callback(err);
    }

    var statusCode, result, error;

    try {
      statusCode = response.statusCode;
      result = JSON.parse(body);
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

    callback(null, response, result);
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

