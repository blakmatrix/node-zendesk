# Pagination

`node-zendesk` optimizes pagination by default, ensuring efficient retrieval of large datasets. However, if you wish to override the default pagination mechanism, you can do so during client instantiation:

```js
const clientOptions = {
  username: 'your_username',
  token: 'your_token',
  subdomain: 'your_subdomain',
  query: { page: { size: 1 } }
};
const client = zendesk.createClient(clientOptions);
```

::: danger **Warning**
Overriding the default pagination mechanism is not recommended. Additionally, cursor-based pagination in the Zendesk API does not support more than 100 items for most cursor-based endpoints.
:::