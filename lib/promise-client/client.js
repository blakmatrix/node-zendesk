// client.js - main client file that does most of the processing
'use strict';

const fs           = require('fs'),
    constants    = require('constants'),
    request      = require('request-promise'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    qs           = require('querystring'),
    async        = require('async'),
    path         = require('path'),
    flatten      = require('flatten'),
    promisePipe  = require('promisepipe'),
    throttler    = require('./throttle'),
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
    };


function Client(options) {
  this.options = options;
  this.sideLoad = [];
  this.userAgent = 'node-zendesk/' + pjson.version + ' (node/' + process.versions.node + ')';
  // Each client has its own cookies to isolate authentication between clients
  this._request = request.defaults({
    jar:      this.options.get('no-cookies') ? false : request.jar(),
    encoding: this.options.get('encoding') || null,
    timeout:  this.options.get('timeout')  || 240000,
    proxy:    this.options.get('proxy')    || null,
    secureOptions: constants.SSL_OP_NO_TLSv1_2,
    forever: true,
    pool: {maxSockets: 100}
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

Client.prototype.request = function request(method, uri) {
  let options, url, self = this, res, args = Array.prototype.slice.call(arguments),
      body     = 'object' === typeof args[args.length - 1] && !Array.isArray(args[args.length - 1]) && args.pop(),
      auth     = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
      encoded  = new Buffer(this.options.get('username') + auth).toString('base64'),
      proxy    = this.options.get('proxy'),
      useOAuth = this.options.get('oauth'),
      token    = this.options.get('token');

  url = assembleUrl(self, uri);

  if (options) { // is this ever used?
    self.options.headers = options;
  } else {
    self.options.headers = {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
      'User-Agent':   self.userAgent,
      'Content-Length': body.length
    };
  }

  if (useOAuth) {// token is an oauth token obtained from OAuth2
    self.options.headers.Authorization = 'Bearer ' + token;
  } else {// token is an API token obtained from the Zendesk Settings UI
    self.options.headers.Authorization = 'Basic ' + encoded;
  }

  self.options.uri = url;
  self.options.method = method || 'GET';

  if (body) {
    self.options.body = JSON.stringify(body);
  } else if ('GET' !== method && 'application/json' === self.options.headers['Content-Type']) {
    self.options.body = '{}';
  }

  if (proxy) {
    self.options.proxy = proxy;
  }

  self.emit('debug::request', self.options);

  return this._request(self.options)
    .then(() => requestCallback(self, response, result));
};

Client.prototype.requestAll = function (...args) {
  let nextPage     = 'Not Null!',
    bodyList     = [],
    statusList   = [],
    responseList = [],
    resultList   = [],
    self         = this,
    throttle     = this.options.get('throttle'),
    __request = (...args) => new Promise((resolve, reject) => {
      return this.request(...args)
        .then((status, body, response, result) => {
            statusList.push(status);
            bodyList.push(body);
            responseList.push(response);
            resultList.push(result);
            nextPage = result ? result.next_page : null;

            async.whilst(
              () => {
                if (nextPage === null) {
                  nextPage = '';
                }

                return nextPage;
              },
              (cb) => {
                __request.apply(self, ['GET', nextPage, function (error, status, body, response, result) {
                  if (error) {
                    return cb(error);
                  }

                  statusList.push(status);
                  bodyList.push(body);
                  responseList.push(response);
                  resultList.push(result);

                  nextPage = result ? result.next_page : null;

                  cb(null);
                }]);
              },
              (err) => {
                if (err) {
                  return reject(err);
                }

                return resolve(statusList, flatten(bodyList), responseList, resultList);
              }
            );
        })
        .catch(reject);
      };

    if ( throttle ) {
      __request = throttler( this, __request, throttle );
    }

    return __request.call(this, ...args);
};

Client.prototype.requestUpload = function requestUpload(uri, file) {
  const auth     = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
      encoded  = new Buffer(this.options.get('username') + auth).toString('base64'),
      useOAuth = this.options.get('oauth'),
      token    = this.options.get('token');

  this.options.uri = assembleUrl(this, uri);
  this.options.method = 'POST';
  this.options.headers = {'Content-Type': 'application/binary'};
  this.options.headers.Authorization = useOAuth ? ('Bearer ' + token) : ('Basic ' + encoded);

  let out = this._request(this.options)
    .then((response, result) => requestCallback(self, response, result));

  return promisePipe(fs.createReadStream(file), out); // pipe the file!
};

Client.prototype.setSideLoad = function setSideLoads(arr) {
  this.sideLoad = arr;
}

function checkRequestResponse(self, response, result) {
  return new Promise((resolve, reject) => {
    let statusCode, error, retryAfter, res;

    if (!result) { // should this really be an error?
      error = new Error('Zendesk returned an empty result');
      error.statusCode = 204;
      return reject(error);
    }

    try {
      statusCode = response.statusCode;
      res = JSON.parse(result);
    }
    catch (ex) {
       // Emit Errors
      self.emit('debug::error', {exception: ex, code: statusCode, request: self.options, result: result});
    }

    self.emit('debug::response', {statusCode: statusCode, result: result});

    retryAfter = response.headers['retry-after'];

    if (retryAfter) {
      error = new Error('Zendesk rate limits 200 requests per minute');
      error.statusCode = 429;
      error.result = result;
      error.retryAfter = retryAfter;
      return reject(error);
    }

    if (failCodes[statusCode]) {
      error = new Error('Zendesk Error (' + statusCode + '): ' + failCodes[statusCode]);
      error.statusCode = statusCode;
      error.result = result;
      error.retryAfter = null;
      return reject(error);
    }

    return resolve(null, res);
  });
}

function requestCallback(self, response, result) {
  return new Promise((resolve, reject) => {
    if (err) {
      return reject(err);
    }

    checkRequestResponse(self, response, result)
      .then((res) => {
        let body = null;

        if (res) {
          if (self.jsonAPINames){
            for (var i = 0; i < self.jsonAPINames.length; i++){
              if (res.hasOwnProperty(self.jsonAPINames[i].toString())){
                body = res[self.jsonAPINames[i].toString()];
                break;
              }
            }
          }

          if (!body) {
            body = res;
          }

          if (self.hasOwnProperty('sideLoadMap')){
            body = populateFields(body, res, self.sideLoadMap);
          }
        } else {
          body = '';
        }

        return resolve(response.statusCode, body, response, res);
      }).catch(reject);
  });
}

function populateFields(data, response, map){
  if (Array.isArray(data)){
    for (var i = 0; i < data.length; i++){
      var record = data[i];
      populateRecord(record);
    }
  } else {
    populateRecord(data);
  }
  return data;

  function populateRecord(record){
    for (var i = 0; i < map.length; i++){
      var field   = map[i].field;
      var name    = map[i].name;
      var dataset = map[i].dataset;


      if (record.hasOwnProperty(field) && response.hasOwnProperty(dataset)){
        //If specifying all, then put everything in response[dataset] to record[name]
        if ( map[i].hasOwnProperty('all') && map[i].all === true ){
          record[name] = response[dataset];
        } else {
          var key = 'id';
          if (map[i].hasOwnProperty('dataKey')){
            key = map[i].dataKey;
          }
          if (map[i].hasOwnProperty('array') && map[i].array){
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

function findAllRecordsById(data, key, id){
  var arr = [];
  for (var i = 0; i < data.length; i++){
    if (data[i][key] === id){
      arr.push(data[i]);
    }
  }
  return arr;
}

function findOneRecordById(data, key, id){
  for (var i = 0; i < data.length; i++){
    if (data[i][key] === id){
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
        if (self.sideLoad.length){
          lastElement.include = self.sideLoad.join(',');
        }
        params = '?' + qs.stringify(lastElement);
      }
      // we have received a query string ex. '?sort_by=id&sort_order=desc'
      else if (0 === lastElement.toString().indexOf('?')) {
        if (self.sideLoad.length){
          lastElement += '&include='+ self.sideLoad.join(',');
        }
        params = lastElement;
      }
      else {
        if (self.sideLoad.length){
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

module.exports.Client = Client;