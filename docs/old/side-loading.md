###For Users

#####Supported

client.users.list(function(err, code, res){ console.log(res)}); // This returns result without side-loading

client.users.sideLoad = ['organizations', 'roles'];

client.users.list(function(err, code, res){ console.log(res)}); // This returns result with side-loading

Sample:

`client.users.show` without side-loading

       {
          "user":{
             "id":1472782708,
             "url":"https://node-zendesk.zendesk.com/api/v2/users/1472782708.json",
             "name":"Xiaochen Nie",
             "email":"zjsnxc@gmail.com",
             "created_at":"2015-09-14T05:35:41Z",
             "updated_at":"2015-10-02T06:21:49Z",
             "time_zone":"Arizona",
             "phone":null,
             "photo":null,
             "locale_id":1,
             "locale":"en-US",
             "organization_id":786072488,
             "role":"admin",
             "verified":true,
             "external_id":null,
             "tags":[

             ],
             "alias":null,
             "active":true,
             "shared":false,
             "shared_agent":false,
             "last_login_at":"2015-10-02T06:21:49Z",
             "two_factor_auth_enabled":null,
             "signature":null,
             "details":null,
             "notes":null,
             "custom_role_id":null,
             "moderator":true,
             "ticket_restriction":null,
             "only_private_comments":false,
             "restricted_agent":false,
             "suspended":false,
             "chat_only":false,
             "user_fields":{

             }
          }
       }

`client.users.show` with side-loading

       {
          "user":{
             "id":1472782708,
             "url":"https://node-zendesk.zendesk.com/api/v2/users/1472782708.json",
             "name":"Xiaochen Nie",
             "email":"zjsnxc@gmail.com",
             "created_at":"2015-09-14T05:35:41Z",
             "updated_at":"2015-10-02T06:21:49Z",
             "time_zone":"Arizona",
             "phone":null,
             "photo":null,
             "locale_id":1,
             "locale":"en-US",
             "organization_id":786072488,
             "role":"admin",
             "verified":true,
             "external_id":null,
             "tags":[

             ],
             "alias":null,
             "active":true,
             "shared":false,
             "shared_agent":false,
             "last_login_at":"2015-10-02T06:21:49Z",
             "two_factor_auth_enabled":null,
             "signature":null,
             "details":null,
             "notes":null,
             "custom_role_id":null,
             "moderator":true,
             "ticket_restriction":null,
             "only_private_comments":false,
             "restricted_agent":false,
             "suspended":false,
             "chat_only":false,
             "user_fields":{

             }
          },
          "organizations":[
             {
                "url":"https://node-zendesk.zendesk.com/api/v2/organizations/786072488.json",
                "id":786072488,
                "name":"node-zendesk",
                "shared_tickets":false,
                "shared_comments":false,
                "external_id":null,
                "created_at":"2015-09-14T05:35:41Z",
                "updated_at":"2015-09-14T05:35:53Z",
                "domain_names":[

                ],
                "details":null,
                "notes":null,
                "group_id":null,
                "tags":[

                ],
                "organization_fields":{

                }
             }
          ],
          "roles":[
             {
                "id":null,
                "description":null,
                "created_at":null,
                "updated_at":null,
                "name":"admin",
                "configuration":{
                   "chat_access":true,
                   "manage_business_rules":true,
                   "manage_dynamic_content":true,
                   "manage_extensions_and_channels":true,
                   "manage_facebook":true,
                   "organization_editing":true,
                   "organization_notes_editing":true,
                   "ticket_deletion":true,
                   "ticket_tag_editing":true,
                   "twitter_search_access":true,
                   "forum_access_restricted_content":true,
                   "end_user_list_access":"full",
                   "ticket_access":"all",
                   "ticket_comment_access":"public",
                   "voice_access":true,
                   "moderate_forums":false,
                   "group_access":true,
                   "light_agent":false,
                   "end_user_profile_access":"full",
                   "forum_access":"full",
                   "macro_access":"full",
                   "report_access":"full",
                   "ticket_editing":true,
                   "ticket_merge":true,
                   "view_access":"full",
                   "user_view_access":"full"
                }
             }
          ]
       }

### For Contributors

How to add side-loading support for new endpoint?

There are 5 field used in sideLoadMap, take `users` for example:

        this.sideLoadMap = [
            { field: 'id',              name: 'group',        dataset: 'groups',      all: true },
            { field: 'id',              name: 'identity',     dataset: 'identities',  array: true,    dataKey: 'user_id' },
            { field: 'custom_role_id',  name: 'role',         dataset: 'roles'},
            { field: 'organization_id', name: 'organization', dataset: 'organizations'}
          ];

1. If the response just handle the side-loading result as a filed of each record, then no `this.sideLoadMap` item is required. For example, endpoint `users` has a side-loading support for `abilities`, but it is not specified in `this.sideLoadMap`.

2. If the response attaches side-loading result at the end, then:

   2.1 If all the side-loading result need to be set into record, then use `all`. For example:

      `{ field: 'id', name: 'group', dataset: 'groups', all: true }`

   means to add side-loading result `groups` into all the records that has field `id`. In the record, the new added side-loading filed's name is `group`.

   2.2 If the side-loading result need to correlate with the records, then

    2.2.1 If the side-loading result is an array, specify `array: true`

    2.2.2 Else set side-loading map item like

         `{ field: 'organization_id', name: 'organization', dataset: 'organizations'}`

    It will look into `organizations` and correlate field `id` (the default because we do not specify `dataKey`) with record field `organization_id` and add corresponding field `organization` for the record.

    2.2.3 If the side-loading result does not use the default field `id` for correlation, then we need to specify `dataKey`. Then the side-loading items that match `sideLoadingItem[dataKey] == record[field]` will be added.