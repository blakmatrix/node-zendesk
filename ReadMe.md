# node-zendesk [![Join the chat at https://gitter.im/blakmatrix/node-zendesk](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/blakmatrix/node-zendesk?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![build status](https://secure.travis-ci.org/blakmatrix/node-zendesk.png)](http://travis-ci.org/blakmatrix/node-zendesk)

[![node-zendesk logo](https://blakmatrix.github.io/node-zendesk/Node_Zendesk_logo.svg "When you realize nothing is lacking, the whole world belongs to you. -Lao Tzu")](https://blakmatrix.github.io/node-zendesk/)

*A Zendesk API client library for use with node.js* 

**Read the full documentation at [blakmatrix.github.io/node-zendesk/](https://blakmatrix.github.io/node-zendesk/)**

---
## Promise support introduced

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

## Contributions

If you're looking to contribute, please refer to the [API Coverage Document](https://github.com/blakmatrix/node-zendesk/blob/master/doc/api-coverage.md), open an issue, or make a PR!

Tests and examples are also welcome.

Zendesk's documentation can be found [here](https://developer.zendesk.com/rest_api/docs/core/introduction).

## License

MIT.
