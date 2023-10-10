# Endpoint URI Override

If you have a middleware service or a proxy in front of the Zendesk API, you can override the default `endpointUri`. This can be useful for custom routing or handling of requests. Note that using this override will disable the `subdomain` option.

## Throttling

Enable request throttling by setting the `throttle` flag:

```js
const clientOptions = {
  throttle: true
};
```