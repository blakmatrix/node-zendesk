# node-zendesk
---
[![build status](https://secure.travis-ci.org/blakmatrix/node-zendesk.png)](http://travis-ci.org/blakmatrix/node-zendesk)


## Example

```js
var zendesk = require('node-zendesk'),
    fs      = require('fs');

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
Take a look in the `examples` folder for more examples.

## Install

Install using npm:
```bash
npm install node-zendesk
```

## Using OAuth for Authentication

If you want to use an OAuth token to authenticate with Zendesk, pass in the `oauth` key with a value of true when creating the client.

You can learn more about obtaining OAuth tokens from [Zendesk's developer site](https://support.zendesk.com/entries/24458591-Using-OAuth-authentication-with-your-application).

```js
var zendesk = require('node-zendesk'),
    fs      = require('fs');

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
-s --subdomain X
-u --username X
-p --password X
-t --token X
-r --remoteUri X
--debug
--no-cookies
--timeout X(ms)
--proxy X
--encoding X
```

They are fairly self-explanatory no-cookies, timeout, proxy, encoding are all options to request. if using debug its reccomended you use `--encoding utf8` or something similar as all you will see is a buffer otherwise in the response.

Because of these command line options you can try a few already from the examples section:

```bash
node examples/users-list.js -u <username> -t <token> -s <subdomain>
node examples/check-auth.js -u <username> -p <password> -s <subdomain>
node examples/check-auth-token.js -u <username> -t <token> -s <subdomain>
node examples/users-list.js -u <username> -t <token> -s <subdomain>
```

## client


```js
request(method, uri)
requestAll(method, uri) //pulls back multiple pages
requestUpload(uri, file, fileToken, callback)
```

## Methods

### accountsettings

```js
show(cb)
```

### activitystream

```js
show(activityID, cb)
list(cb)
```

### attachments

```js
upload(file, fileToken, cb)
```

### categories

```js
list(cb)
show(categoryID, cb)
create(category, cb)
update(categoryID, category, cb)
delete(categoryID, cb)
```

### customagentroles

```js
list(cb)
```

### forums

```js
list(cb)
listByCategory(categoryID, cb)
show(forumID, cb)
create(forum, cb)
update(forumID, forum, cb)
delete(forumID, cb)
```

### forumsubscriptions

```js
list(cb)
listByForum(forumID, cb)
show(forumSubscriptionID, cb)
create(forumSubscription, cb)
delete(forumSubscriptionID, cb)
```

### groupmemberships

```js
list(cb)
listByUser(userID, cb)
listByGroup(groupID, cb)
show(groupMembershipID, cb)
showByUser(userID, groupMembershipID, cb)
create(groupMembership, cb)
createByUser(userID, groupMembership, cb)
delete(groupMembershipID, cb)
deleteByUser(userID, groupMembershipID, cb)
makeDefault(userID, groupMembershipID, cb)
```

### groups

```js
list(cb)
assignable(cb)
show(groupID, cb)
create(group, cb)
update(groupID, group, cb)
delete(groupID, cb)
```

### jobstatuses

```js
show(jobStatusID, cb)
watch(jobStatusID, interval, maxAttempts, cb)
```

### locales

```js
list(cb)
show(localeID, cb)
showCurrent(cb)
current(cb)
```

### macros

```js
list(cb)
apply(macroID, cb)
applyTicket(ticketID, macroID, cb)
```

### oauthtokens

```js
list(cb)
show(id, cb)
current(cb)
revoke(id, cb)
```

### organizations

```js
list(cb)
show(organizationID, cb)
create(organization, cb)
update(organizationID, organization, cb)
delete(organizationID, cb)
```

### organizationfields

```js
list(cb)
show(organizationFieldID, cb)
create(organizationField, cb)
update(organizationFieldID, organizationField, cb)
delete(organizationFieldID, cb)
```

### requests

```js
list(cb)
listOpen(cb)
listSolved(cb)
listCCD(cb)
listByUser(userID, cb)
listByOrganization(orgID, cb)
getRequest(requestID, cb)
create(request, cb)
update(requestID, request, cb)
listComments(requestID, cb)
getComment(requestID, commentID, cb)
```

### satisfactionratings

```js
list(cb)
received(cb)
show(satisfactionRatingID, cb)
```

### search

```js
query(searchTerm, cb)
queryAll(searchTerm, cb)
queryAnonymous (searchTerm, cb)
queryAnonymousAll (searchTerm, cb)
```

### suspendedtickets

```js
list(cb)
show(suspendedTicketID, cb)
recover(suspendedTicketID, cb)
recoverMany(suspendedTicketIDs, cb)
delete(suspendedTicketID, cb)
destroyMany(suspendedTicketIDs, cb)
deleteMany(suspendedTicketIDs, cb)
```

### tags

```js
list(cb)
```

### ticketaudits

```js
list(ticketID, cb)
```

### ticketfields

```js
list(cb)
show(ticketFieldID, cb)
create(ticketField, cb)
update(ticketFieldID, ticketField, cb)
delete(ticketFieldID, cb)
```

### ticketmetrics

```js
list(ticketId, cb)
listAll(cb)
show(ticketMetricId, cb)
```

### tickets

```js
list(cb)
listByOrganization(orgID, cb)
listByUserRequested(userID, cb)
listByUserCCD(userID, cb)    // email cc
listRecent(cb)
listCollaborators(ticketID, cb)
listIncidents(ticketID, cb)
listMetrics(ticketID, cb)
show(ticketID, cb)
showMany(ticket_ids, cb)
create(ticket, cb)
update(ticketID, ticket, cb)
updateMany(ticket_ids, ticket, cb)
deleteMany(ticket_ids, cb)
delete(ticketID, cb)
export(startTime, cb)        //1000 per page export
exportSample(startTime, cb)  //Ticket Export Sample (max 50 tickets per request)
exportAudit(ticketID, cb)    //Listing Audits
getComments(ticketID, cb)
```

### topiccomments

```js
list(topicID, cb)
listByUser(userID, cb)
show(topicID, commentID, cb)
showByUser(userID, commentID, cb)
create(topicID, comment, cb)
update(topicID, commentID, comment, cb)
delete(topicID, commentID, cb)
```

### topics

```js
list(cb)
listByForum(forumID, cb)
listByUser(userID, cb)
show(topicID, cb)
showMany(topicIDs, cb)
create(topic, cb)
update(topicID, topic, cb)
delete(topicID, cb)
```

### topicsubscriptions

```js
list(cb)
listByTopic(topicID, cb)
show(topicSubscriptionsID, cb)
create(topicSubscription, cb)
delete(topicSubscriptionsID, cb)
```

### topicvotes

```js
list(topicID, cb)
listByUser(userID, cb)
show(topicID, cb)
create(topicID, vote, cb)
delete(topicID, cb)
```

### useridentities

```js
list(userID, cb)
show(userID, userIDentityID, cb)
create(userID, userIDentity, cb)
update(userID, userIDentityID, cb)
makePrimary(userID, userIDentityID,  cb)
verify(userID, userIDentityID, cb)
requestVerification(userID, userIDentityID, cb)
unsuspend(userId, cb)
delete(userID, userIDentityID, cb)
```

### users

```js
auth(cb) //also me()
list(cb)
listByGroup(id, cb)
listByOrganization(id, cb)
show(id, cb)
create(user, cb)
createMany(users, cb)
update(id, user, cb)
suspend(id, cb)
delete(id, cb)
search(params, cb)
me(cb)
```

### userfields

```js
list(cb)
show(userFieldID, cb)
create(userField, cb)
update(userFieldID, userField, cb)
delete(userFieldID, cb)
```

### views

```js
list(cb)
listActive(cb)
listCompact(cb)
show(viewID, cb)
create(view, cb)
update(viewID, cb)
execute(viewID, params, cb)
tickets(viewID, cb)
preview(params, cb)
showCount(viewID, cb)
showCounts(viewIDs, cb)
export(viewID, cb)
```


## Tests

ToDO

## License

MIT.
