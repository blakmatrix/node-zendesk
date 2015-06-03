API Coverage Doc
=====================

This document specifies the endpoints that are not yet included in the node-zendesk library. Its contents will change as Zendesk updates its documentation and as PRs are merged.

## Core API

```
PUT /api/v2/dynamic_content/items/{id}/variants/update_many.json
```

## Help Center API

### Categories

```
PUT /api/v2/help_center/{locale}/categories/{id}.json
```
```
PUT /api/v2/help_center/categories/{id}/source_locale.json
```

### Sections

```
GET /api/v2/help_center/{locale}/sections.json
```
```
GET /api/v2/help_center/{locale}/sections/{id}.json
```
```
POST /api/v2/help_center/{locale}/categories/{id}/sections.json
```
```
PUT /api/v2/help_center/{locale}/sections/{id}.json
```
```
PUT /api/v2/help_center/sections/{id}/source_locale.json
```

### Articles

```
GET /api/v2/help_center/{locale}/articles/{id}.json
```
```
POST /api/v2/help_center/{locale}/sections/{id}/articles.json
```
```
PUT /api/v2/help_center/{locale}/articles/{id}.json
```
```
POST /api/v2/help_center/articles/{id}/bulk_attachments.json
```

### Translations

```
GET /api/v2/help_center/articles/{article_id}/translations/{locale}.json
```
```
GET /api/v2/help_center/locales.json
```

## Zopim API

Client authentication and all APIs need some love.

## Reseller API

All APIs need some love. However, the Reseller API is only accessible to Zendesk partners and resellers. Contact  channel@zendesk.com if you're interested in gaining access.
