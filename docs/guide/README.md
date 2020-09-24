---
sidebar: auto
---

# Introduction

[![Join the chat at https://gitter.im/blakmatrix/node-zendesk](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/blakmatrix/node-zendesk?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![build status](https://secure.travis-ci.org/blakmatrix/node-zendesk.png)](http://travis-ci.org/blakmatrix/node-zendesk)

`node-zendesk` is a thin wrapper over the [Zendesk API](https://developer.zendesk.com/rest_api).

[[toc]]

## Promise support introduced <Badge text="new"/>

Promise support was introduced in @v`2.0.0`, the Legacy version of node-zendesk without Promises @v`1.5.0`

## Install

To use the API, just do the standard

    $ npm install --save node-zendesk


## Example

```js
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
  username:  'username',
  token:     'token',
  remoteUri: 'https://remote.zendesk.com/api/v2'
});

client.users.list(function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result[0], null, 2, true));//gets the first page
});
```
or you can use `Promises`, you just need to skip the callback:
```js
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
  username:  'username',
  token:     'token',
  remoteUri: 'https://remote.zendesk.com/api/v2'
});

client.users.list()
  .then(function(result) {
    console.log(JSON.stringify(result[0], null, 2, true));//gets the first page
  })
  .catch(function(error) {
    console.log(error);
  });
```
Take a look in the `examples` folder for more examples.

## Using OAuth for Authentication

If you want to use an OAuth token to authenticate with Zendesk, pass in the `oauth` key with a value of true when creating the client.

You can learn more about obtaining OAuth tokens from [Zendesk's developer site](https://support.zendesk.com/entries/24458591-Using-OAuth-authentication-with-your-application).

```js
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
  username:  'username',
  token:     'oauth_token',
  remoteUri: 'https://remote.zendesk.com/api/v2',
  oauth: true
});
```

## Command Line Options for scripts

Below is a list of options you may use when calling any scripts you may have written

```
-s    --subdomain X
-u    --username X
-p    --password X
-t    --token X
-r    --remoteUri X
-hc   --helpcenter
-v    --voice
-serv --services
--debug
--no-cookies
--timeout X(ms)
--proxy X
--encoding X
```

They are fairly self-explanatory no-cookies, timeout, proxy, encoding are all options to request. if using debug its recommended you use `--encoding utf8` or something similar as all you will see is a buffer otherwise in the response.

Because of these command line options you can try a few already from the examples section:

```bash
node examples/users-list.js -u <username> -t <token> -s <subdomain>
node examples/check-auth.js -u <username> -p <password> -s <subdomain>
node examples/check-auth-token.js -u <username> -t <token> -s <subdomain>
node examples/users-list.js -u <username> -t <token> -s <subdomain>
```

## Disable Default scripting functionality / Enable library only

If you rather use this library/script runner as a library only you should disable the library from reading from `process.argv` and `process.env` by enabling `disableGlobalState`.

```js
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
  username:  'username',
  token:     'oauth_token',
  remoteUri: 'https://remote.zendesk.com/api/v2',
  disableGlobalState: true,
  debug: true // if you want to debug in library only mode, you'll have to include this
});
```

## Side-Loading

For the endpoints that support side-loading, you can specify which other objects to bring in by setting the sideLoad variable to an array of object names:

```js
client.tickets.sideLoad = ['users', 'organizations', 'metric_sets'];
client.users.sideLoad = ['organizations', 'roles'];
```

For a full list of endpoints that support side-loading, see [Zendesk's developer site](https://developer.zendesk.com/rest_api/docs/core/side_loading)

## Impersonation

See [Making API requests on behalf of end users ](https://help.zendesk.com/hc/en-us/articles/229488908) to grant impersonate scope. Pass end-user's email when creating client.

```js
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
  username:  'username',
  token:     'oauth_token',
  remoteUri: 'https://remote.zendesk.com/api/v2',
  oauth: true,
  asUser: 'end-user@example.com'
});
```

## Pagination

When using the `requestAll` method, the client automatically pages-through results, accumulating all responses before returning them to the `cb` method. To monitor pagination, the `cb` parameter can also be an [observer](http://reactivex.io/rxjs/manual/overview.html#observer) – see [this example](examples/ticket-list-observer.js).

## Contributions

If you're looking to contribute, please refer to the [API Coverage Document](https://github.com/blakmatrix/node-zendesk/blob/master/doc/api-coverage.md), open an issue, or make a PR!

Tests and examples are also welcome.

Zendesk's documentation can be found [here](https://developer.zendesk.com/rest_api/docs/core/introduction).

## License

MIT.
