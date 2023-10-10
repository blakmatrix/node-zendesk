# Custom Transport Configuration

If you prefer not to use the default `cross-fetch`, you can configure a custom transport. Here's an example using `axios`:

```js
const transportConfigUsingAxios = {
  async transportFn(uri, options) {
    // Convert the options to be compatible with axios
    const requestOptions = {
      ...options,
      url: uri,
      method: options.method || 'GET',
      data: options.body,
    };

    try {
      const response = await axios(requestOptions);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  },

  responseAdapter(response) {
    return {
      json: () => Promise.resolve(response.data),
      status: response.status,
      headers: {
        get: (headerName) => response.headers[headerName.toLowerCase()],
      },
      statusText: response.statusText,
    };
  },
};

const setupClient = (config) => {
  return zd.createClient({
    username: ZENDESK_USERNAME,
    subdomain: ZENDESK_SUBDOMAIN,
    token: ZENDESK_TOKEN,
    transportConfig: transportConfigUsingAxios,
    ...config,
  });
};

async function foo() {
  try {
    const client = setupClient({debug: false});
    const result = await client.users.list();
    console.dir(result);
  } catch (error) {
    console.error(`Failed: ${error.message}`);
  }
}

foo();
```

This example demonstrates how to set up a client using `axios` as the transport mechanism instead of the default `cross-fetch`.