---
order: 2
---

# Authentication

To interact with the Zendesk API using `node-zendesk`, you'll need to authenticate your requests. This section will guide you through the different authentication methods supported by the library.

## Basic Authentication

Using a combination of your username, token, and subdomain, you can quickly set up basic authentication:

::: code-group

```js
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
  username:  'your_username',
  token:     'your_token',
  subdomain: 'your_subdomain'
});
```

```ts
import {createClient} from 'node-zendesk'

var client = createClient({
  username:  'your_username',
  token:     'your_token',
  subdomain: 'your_subdomain'
});
```
:::

## OAuth Authentication

If you prefer to use an OAuth token for authentication, set the oauth key to true when creating the client. You can learn more about obtaining OAuth tokens from Zendesk's developer site.

::: code-group
```js
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
  token:     'your_oauth_token',
  oauth: true
});
```

```ts
import {createClient} from 'node-zendesk'

var client = zendesk.createClient({
  token:     'your_oauth_token',
  oauth: true
});
```
:::

## Impersonation

To make API requests on behalf of end users, you can use the impersonation feature. Ensure you've granted the impersonate scope and then pass the end-user's email when creating the client:

::: code-group
```js
var zendesk = require('node-zendesk');

var client = createClient({
  username:  'your_username',
  token:     'your_oauth_token',
  subdomain: 'your_subdomain',
  oauth: true,
  asUser: 'end-user@example.com'
});
```

```ts
import {createClient} from 'node-zendesk'

var client = createClient({
  username:  'your_username',
  token:     'your_oauth_token',
  subdomain: 'your_subdomain',
  oauth: true,
  asUser: 'end-user@example.com'
});
```
:::

With authentication set up, you're ready to start making requests to the Zendesk API. In the following sections, we'll delve into more advanced features and usage patterns of node-zendesk.