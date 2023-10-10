# API Types

`node-zendesk` supports different types of Zendesk APIs. By default, it uses the 'core' API. If you want to access the helpdesk API, you need to call it explicitly:

```js
client.helpdesk.categories.list();
```

Currently, there are only `helpdesk`, `services`, and `voice` and you can use them all by including the upon client instantiation as follows:

```js
const clientOptions = {
  username: 'your_username',
  token: 'your_token',
  subdomain: 'your_subdomain',
  apiType: ['core', 'helpdesk', 'services', 'voice'],
};
const client = zendesk.createClient(clientOptions);
```
