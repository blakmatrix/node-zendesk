//
// ### function defaultUser (appName)
// #### @appName {String} App name
//
// A helper to prepend a default username.
// needs 'this' to be able to options.get('username').
//
exports.defaultUser = function (appName) {
  if (appName.search('/') === -1) {
    appName = this.options.get('username') + '/' + appName;
  }

  return appName;
};