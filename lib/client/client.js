//client.js
'use strict';

var fs           = require('fs'),
    request      = require('request'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    Client       = require('./client').Client,
    qs           = require('querystring'),
    async        = require('async'),
    path         = require('path'),
    flatten      = require('flatten'),
    pjson        = require('./../../package.json');



var failCodes = {
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


///////////////////////////////////////////////////////////////////////////////////////////////////


var Client = exports.Client = function (options) {
    this.options = options;
    this.userAgent = 'node-zendesk/' + pjson.version + ' (node/' + process.versions.node + ')';
    // Each client has its own cookies to isolate authentication between clients
    this._request = request.defaults({
        jar:      this.options.get('no-cookies')? false : request.jar(),
        encoding: this.options.get('encoding') || null,
        timeout:  this.options.get('timeout')  || 240000,
        proxy:    this.options.get('proxy')    || null
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


    if (typeof this.options.get !== 'function') {
        this.options.get = function (key) {
            return this[key];
        };
    }

};


///////////////////////////////////////////////////////////////////////////////////////////////////


util.inherits(Client, EventEmitter);


///////////////////////////////////////////////////////////////////////////////////////////////////


function assembleUrl(self, uri) {
    var params,
        last_element;

    if (typeof uri === 'object' && Array.isArray(uri)) {
        last_element = uri.pop();
        if (typeof last_element === 'object') {// we have recieved an object ex. {"sort_by":"id","sort_order":"desc"}
            params = '?' + qs.stringify(last_element);
        } else { // we have recieved a query string ex. '?sort_by=id&sort_order=desc'
            if (last_element.toString().indexOf('?') === 0) {
                params = last_element;
            } else {
                uri.push(last_element);
            }
        }
        return self.options.get('remoteUri') + '/' + uri.join('/') + '.json' + params;
    } else {
        if (uri.indexOf(self.options.get('remoteUri')) === -1) {
            return self.options.get('remoteUri') + uri;
        } else {
            return uri;
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////


function checkRequestResponse(self, response, result, callback) {

    var statusCode, error, retryAfter, res;

    if(!result){ //should this really be an error?
        error = new Error('Zendesk returned an empty result');
        error.statusCode = 204;
        return callback(error);
    }
    try {
        statusCode = response.statusCode;
        res = JSON.parse(result);
    }
    catch (ex) {
        // Ignore Errors
    }

    self.emit('debug::response', { statusCode: statusCode, result: result });

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

    return res;
}


///////////////////////////////////////////////////////////////////////////////////////////////////


function requestCallback(self, err, response, result, callback) {
    if (err) {
        return callback(err);
    }

    var res = checkRequestResponse(self, response, result, callback);

    var body = null;
    if (res) {
        if (!body && self.jsonAPIName !== null) {
            body = res[(self.jsonAPIName.toString())];
        }
        if (!body && self.jsonAPIName2 !== null) {
            body = res[(self.jsonAPIName2.toString())];
        }
        if (!body && self.jsonAPIName3 !== null) {
            body = res[(self.jsonAPIName3.toString())];
        }

        if (!body) {
            body = res;
        }
    }
    else {
        body = "";
    }

    callback(null, response.statusCode, body, response, res);
}


///////////////////////////////////////////////////////////////////////////////////////////////////


Client.prototype.request = function (method, uri) {

    var url,
        options,
        self = this,
        res,
        args = Array.prototype.slice.call(arguments),
        callback = args.pop(),
        body     = typeof args[args.length - 1] === 'object' && !Array.isArray(args[args.length - 1]) && args.pop(),
        auth     = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
        encoded  = new Buffer(this.options.get('username') + auth).toString('base64'),
        proxy    = this.options.get('proxy'),
        useOAuth = this.options.get('oauth'),
        token    = this.options.get('token');


    url = assembleUrl(self, uri);

    if( options ){
        this.options.headers = options;
    } else {
        this.options.headers =  { 'Content-Type' : 'application/json',
            'Accept'       : 'application/json',
            'User-Agent'   : self.userAgent
        };
    }


    if(useOAuth) {      //token is an oauth token obtained from OAuth2
        this.options.headers.Authorization = 'Bearer ' + token;
    } else {                             //token is an API token obtained from the Zendesk Settings UI
        this.options.headers.Authorization = 'Basic ' + encoded;
    }


    this.options.uri = url;
    this.options.method = method || 'GET';


    if (body) {
        this.options.body = JSON.stringify(body);
    }
    else if (method !== 'GET' && this.options.headers['Content-Type'] === 'application/json' ) {
        this.options.body = '{}';
    }

    if (proxy) {
        this.options.proxy = proxy;
    }


    self = this;
    self.emit('debug::request', this.options);

    return this._request(this.options, function requestCallback(err, response, result) {
        if (err) {
            return callback(err);
        }

        res = checkRequestResponse(self, response, result, callback);

        body = null;
        if (res) {
            if (!body && self.jsonAPIName !== null) {
                body = res[(self.jsonAPIName.toString())];
            }
            if (!body && self.jsonAPIName2 !== null) {
                body = res[(self.jsonAPIName2.toString())];
            }
            if (!body && self.jsonAPIName3 !== null) {
                body = res[(self.jsonAPIName3.toString())];
            }

            if (!body) {
                body = res;
            }
        }
        else {
            body = "";
        }

        // clean the damn body
        self.options.body = "";

        callback(null, response.statusCode, body, response, res);
    });
};


///////////////////////////////////////////////////////////////////////////////////////////////////


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
            function () {return nextPage !== null && typeof nextPage !== 'undefined'; },
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


///////////////////////////////////////////////////////////////////////////////////////////////////


Client.prototype.requestUpload = function (uri, file, fileToken, callback) {
    var self     = this,
        out,
        auth     = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
        encoded  = new Buffer(this.options.get('username') + auth).toString('base64'),
        useOAuth = this.options.get('oauth'),
        token = this.options.get('token'),
        uploadOptions = self.options,
        body,
        res;


    if (fileToken !== null && fileToken !== undefined && fileToken !== '') {
        uri.push({filename: path.basename(file), token: fileToken});
    } else {
        uri.push({filename: path.basename(file)});
    }

    uploadOptions.uri = assembleUrl(self, uri);

    var stat = fs.statSync(file);

    var headerObj = { 'Content-Type'  : 'application/octet-stream',
        'Content-Length': stat.size,
        'User-Agent'    : self.userAgent
    };


    if(useOAuth) {
        headerObj.Authorization = 'Bearer ' + token;
    } else {
        headerObj.Authorization = 'Basic ' + encoded;
    }


    uploadOptions.body = "";

    uploadOptions.method = 'POST';
    //uploadOptions.uri = self.options.get('remoteUri') + '/' + uri.join('/');
    uploadOptions.headers = headerObj;


    out = self._request(uploadOptions, function requestCallback(err, response, result) {

        if (err) {
            return callback(err);
        }

        res = checkRequestResponse(self, response, result, callback);

        body = null;
        if (res) {
            if (!body && self.jsonAPIName !== null) {
                body = res[(self.jsonAPIName.toString())];
            }
            if (!body && self.jsonAPIName2 !== null) {
                body = res[(self.jsonAPIName2.toString())];
            }
            if (!body && self.jsonAPIName3 !== null) {
                body = res[(self.jsonAPIName3.toString())];
            }

            if (!body) {
                body = res;
            }
        }
        else {
            body = "";
        }

        callback(null, response.statusCode, body, response, res);
    });

    fs.createReadStream(file).pipe(out);

};

