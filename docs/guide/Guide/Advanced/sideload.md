# Side-Loading

Side-loading allows you to retrieve related records along with the primary records you're querying. To set side-loading, use the `setSideLoad` method:

```js
client.users.setSideLoad(['group', 'role']);
```