# Custom Logging

`node-zendesk` provides an option to log to your own logger object. By default, it uses its own `ConsoleLogger`. To use a custom logger:

```js
const clientOptions = {
  username: 'your_username',
  token: 'your_token',
  subdomain: 'your_subdomain',
  logger: yourCustomLogger,
  debug: true
};
const client = zendesk.createClient(clientOptions);
```