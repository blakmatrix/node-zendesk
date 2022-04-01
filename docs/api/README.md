---
sidebar: auto
---

# API - NodeJS Wrapper for Zendesk API

[![Circle CI](https://circleci.com/gh/StreakYC/node-api-wrapper.svg?style=shield)](https://circleci.com/gh/StreakYC/node-api-wrapper)
[![npm version](https://badge.fury.io/js/streakapi.svg)](https://badge.fury.io/js/streakapi)

NodeJS package that acts as a thin wrapper over the [Zendesk API](https://developer.zendesk.com/rest_api).

To use the API, just do the standard

    $ npm install --save node-zendesk

and then

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

[[toc]]


## Core API Methods
(See: https://developer.zendesk.com/rest_api/docs/core/introduction)

### client

```js
request(method, uri)
requestAll(method, uri) //pulls back multiple pages
requestUpload(uri, file, fileToken, callback)
```

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
upload(file, fileOptions, cb)
deleteUpload(token, cb)
show(attachmentID, cb)
delete(attachmentID, cb)
redactAttachmentComment(ticketID, commentID, attachmentID, cb)

fileOptions = {filename: 'file.txt', token: 'P1c4rDRuLz'}
// token is [optional]

file = // string or Stream (with 'pipe' function)
```

### automations

```js
list(cb)
listActive(automationID, cb)
show(automationID, cb)
create(automation, cb)
update(automationID, automation, cb)
delete(automationID, cb)
reorder(automationIDs, cb) //  automationIDs is Array
```

### dynamiccontent

https://developer.zendesk.com/rest_api/docs/core/dynamic_content

```js
listItems(cb)
listAllItems(cb)
showItem(itemID, cb)
createItem(item, cb)
updateItem(itemID, item, cb)
deleteItem(itemID, cb)
listVariants(itemID, cb)
listAllVariants(itemID, cb)
showVariant((itemID, variantID, cb)
createVariant(itemID, variant, cb)
updateVariant(itemID, variantID, variant, cb)
deleteVariant(itemID, variantID, cb)
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
listByParams(params, cb)
apply(macroID, cb)
applyTicket(ticketID, macroID, cb)
create(macro, cb)
categories(cb)
update(macroID, macro, cb)
createMany(users, cb)
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
createMany(organizations, cb)
update(organizationID, organization, cb)
updateMany(organizations, cb)
upsert(organizationID, organization, cb)
delete(organizationID, cb)
incrementalInclude(startTime, includes, cb)        // New Export API supporing includes
incremental(startTime, cb)        // New Export API
incrementalSample(startTime, cb)  // New Export API Sample
```

### organizationfields

```js
list(cb)
show(organizationFieldID, cb)
create(organizationField, cb)
update(organizationFieldID, organizationField, cb)
delete(organizationFieldID, cb)
```

### (SLA) policies

```js
list(cb)
show(policyID, cb)
create(policy, cb)
update(policyID, policy, cb)
delete(policyID, cb)
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

### sessions

```js
get(cb)
getByUserId(userId, cb)
getByUserIdBySessionId(userId, sessionId, cb)
getMyAuthenticatedSession(cb)
deleteByUserIdBySessionId(userId, sessionId, cb)
bulkDeleteByUserId(userId, cb)
logMeOut(cb)
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

### ticketevents
```js
incrementalInclude(startTime, includes, cb)        // New Export API supporing includes
incremental(startTime, cb)
incrementalSample(startTime, cb)
```

### ticketforms

```js
list(cb)
show(ticketFormID, cb)

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
listAssigned(userID, cb)
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
createMany(tickets, cb)
update(ticketID, ticket, cb)
merge(ticketID, mergedTicket, cb)
updateMany(ticket_ids, ticket, cb)
deleteMany(ticket_ids, cb)
delete(ticketID, cb)
export(startTime, cb)        //1000 per page export
exportSample(startTime, cb)  //Ticket Export Sample (max 50 tickets per request)
exportAudit(ticketID, cb)    //Listing Audits
getComments(ticketID, cb)
incrementalInclude(startTime, includes, cb)        // New Export API supporing includes
incremental(startTime, cb)        // New Export API
incrementalSample(startTime, cb)  // New Export API Sample
```

### ticketexports

```js
export(start_time, cb)
exportWithUser(start_time, cb)
exportAudit(ticketID, cb)
```

### ticketimport

```js
import(ticket, cb)
exportAudit(ticketID, cb)
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

### triggers

```js
list(cb)
listActive(triggerID, cb)
show(triggerID, cb)
create(trigger, cb)
update(triggerID, trigger, cb)
delete(triggerID, cb)
reorder(triggerIDs, cb) //  triggerIDs is Array
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
delete(userID, userIDentityID, cb)
```

### users

```js
auth(cb) //also me()
list(cb)
listByGroup(id, cb)
listByOrganization(id, cb)
show(id, cb)
showMany( userids, cb )
create(user, cb)
createMany(users, cb)
update(id, user, cb)
updateMany(/*Optional*/ids, users, cb)
createOrUpdate(user, cb)
createOrUpdateMany(users, cb)
suspend(id, cb)
unsuspend(id, cb)
delete(id, cb)
search(params, cb)
me(cb)
merge(id, targetId, cb)
incrementalInclude(startTime, includes, cb)        // New Export API supporing includes
incremental(startTime, cb)        // New Export API
incrementalSample(startTime, cb)  // New Export API Sample
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
update(viewID, viewData, cb)
execute(viewID, params, cb)
tickets(viewID, cb)
preview(params, cb)
showCount(viewID, cb)
showCounts(viewIDs, cb)
export(viewID, cb)
```

## Help Center API Methods
(See: https://developer.zendesk.com/rest_api/docs/help_center/introduction)
To enable help center client, use `-hc` or `--helpcenter` parameter.

### accesspolicies

```js
show(sectionID, cb)
update(sectionID, accessPolicy, cb)
```
### articleattachments

```js
list(articleID, cb)
listInline(articleID, cb)
listBlock(articleID, cb)
show(attachmentID, cb)
delete(attachmentID, cb)
```
### articlecomments

```js
listByUser(userID, cb)
listByArticle(articleID, cb)
show(articleID, commentID, cb)
create(articleID, comment, cb)
update(articleID, commentID, comment, cb)
delete(articleID, commentID, cb)
```
### articlelabels

```js
list(cb)
listByArticle(articleID, cb)
show(labelID, cb)
create(articleID, label, cb)
delete(articleID, labelID, cb)
```
### articles

```js
list(cb)
listByLocale(locale,cb)
listBySection(sectionID,cb)
listByCategory(categoryID,cb)
listByUser(userID,cb)
listSinceStartTime(startTime,cb)
listByLabelNames(labelNames,cb)
show(articleID, cb)
showWithLocale(locale, articleID, cb)
create(sectionID, article, cb)
createWithLocale(locale, sectionID, article, cb)
update(articleID, article, cb)
updateByLocale(locale, articleID, article, cb)
associateAttachmentsInBulk(articleID, attachmentIDsInBulk, cb)
delete(articleID, cb)
```

### categories

```js
list(cb)
listWithLocale(locale, cb)
show(categoryID, cb)
create(category, cb)
update(categoryID, category, cb)
delete(categoryID, cb)
```
### search

```js
searchArticles(searchString, cb)
searchArticlesInLocale(searchString, locale, cb)
searchArticlesByLabels(labelNames, cb)
searchQuestions(searchString, cb)
```

### sections

```js
list(cb)
listByCategory(categoryID, cb)
show(sectionID, cb)
create(section, cb)
update(sectionID, section, cb)
delete(sectionID, cb)
```

### usersegments

```js
list(cb)
listApplicable(cb)
listByUser(userID, cb)
show(sectionID, cb)
listSections(userSegmentID, cb)
listTopics(userSegmentID, cb)
create(userSegment, cb)
update(userSegmentID, userSegment, cb)
delete(userSegmentID, cb)
```

### subscriptions

```js
listByUser(userID, cb)
listByArticle(articleID, cb)
listBySection(sectionID, cb)
showbyArticle(articleID, subscriptionID, cb)
showbySection(sectionID, subscriptionID, cb)
createbyArticle(articleID, subscription, cb)
createbySection(sectionID, subscription, cb)
deletebyArticle(articleID, subscriptionID, cb)
deletebySection(sectionID, subscriptionID, cb)
```

### translations

```js
show(articleID, locale, cb)
listByArticle(articleID, filterParams, cb)
listBySection(sectionID, cb)
listByCategory(categoryID, cb)
listMissingLocalesByArticle(articleID, cb)
listMissingLocalesBySection(sectionID, cb)
listMissingLocalesByCategory(categoryID, cb)
createForArticle(articleID, translation, cb)
createForSection(sectionID, translation, cb)
createForCategory(categoryID, translation, cb)
updateForArticle(articleID, locale, translation, cb)
updateForSection(sectionID, locale, translation, cb)
delete(translationID, cb)
```

### votes

```js
listByUser(userID, cb)
listByArticle(articleID, cb)
show(voteID, cb)
createUpVoteForArticle(articleID, cb)
createDownVoteForArticle(articleID, cb)
createUpVoteForQuestion(questionID, cb)
createDownVoteForQuestion(questionID, cb)
createUpVoteForAnswer(answerID, cb)
createDownVoteForAnswer(answerID, cb)
delete(voteID, cb)
```

### targetfailures
```js
list(cb)
show(targetID, cb)
```

## Voice API Methods
(See: https://developer.zendesk.com/rest_api/docs/voice-api/voice)
To enable voice client, use `-v` or `--voice` parameter.

### agentactivities

```js
show(cb)
```

### availabilities

```js
update(agentID, cb)
show(agentID, cb)
```

### currentqueue

```js
show(cb)
```

### greetingcategories

```js
list(cb)
show(greetingCategoryID, cb)
```

### greetings

```js
list(cb)
show(greetingID, cb)
create(greetingID, cb)
update(greetingID, cb)
delete(greetingID, cb)
```

### historicalqueue

```js
show(cb)
```

### phonenumbers

```js
search(searchTerm, cb)
update(phoneID, cb)
list(cb)
create(cb)
update(phoneID, phone_number, cb)
delete(phoneID, cb)
```

## Services API Methods
(See: https://developer.zendesk.com/rest_api/docs/services/jira)
To enable services client, use `-serv` or `--services` parameter.

### links

```js
list(cb)
show(ticketID, cb)

```