API Coverage Doc
=====================

This document specifies the endpoints that are not yet included in the node-zendesk library. Its contents will change as Zendesk updates its documentation and as PRs are merged.

## Core API

```
PUT /api/v2/dynamic_content/items/{id}/variants/update_many.json
```

## Help Center API



## Zopim API

Client authentication and all APIs need some love.

## Reseller API

All APIs need some love. However, the Reseller API is only accessible to Zendesk partners and resellers. Contact  channel@zendesk.com if you're interested in gaining access.

## Voice Integration API

The [Voice Integration API](https://developer.zendesk.com/rest_api/docs/voice-api/voice_integration) is not yet implemented.

```
POST /api/v2/channels/voice/agents/{agent_id}/users/{user_id}/display.json
```

```
POST /api/v2/channels/voice/agents/{agent_id}/tickets/{ticket_id}/display.json
```

```
POST /api/v2/channels/voice/tickets.json
```

```
POST /api/v2/channels/voice/tickets.json
```
