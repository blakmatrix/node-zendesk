// Type definitions for node-zendesk 1.4
// Project: https://github.com/blakmatrix/node-zendesk
// Definitions by: jgeth <https://github.com/jgeth>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0

// <reference types="node"/>

import { PathLike, ReadStream } from 'fs';

export type ZendeskCallback<TResponse, TResult> = (
  error: Error | undefined,
  response: TResponse,
  result: TResult,
) => void;

export interface Client {
  accountsettings: unknown;
  activitystream: unknown;
  attachments: Attachments.Methods;
  brand: unknown;
  categories: unknown;
  customagentroles: unknown;
  dynamiccontent: unknown;
  forums: unknown;
  forumsubscriptions: unknown;
  groupmemberships: unknown;
  groups: unknown;
  helpers: unknown;
  imports: unknown;
  installations: unknown;
  jobstatuses: JobStatuses.Methods;
  locales: unknown;
  macros: Macros.Methods;
  oauthtokens: unknown;
  organizationfields: unknown;
  organizationmemberships: unknown;
  organizations: unknown;
  policies: unknown;
  requests: Requests.Methods;
  satisfactionratings: unknown;
  search: unknown;
  sessions: unknown;
  sharingagreement: unknown;
  suspendedtickets: unknown;
  tags: unknown;
  targets: unknown;
  ticketaudits: unknown;
  ticketevents: unknown;
  ticketexport: unknown;
  ticketfields: unknown;
  ticketforms: unknown;
  ticketimport: unknown;
  ticketmetrics: unknown;
  tickets: Tickets.Methods;
  topiccomments: unknown;
  topics: unknown;
  topicsubscriptions: unknown;
  topicvotes: unknown;
  triggers: unknown;
  userfields: Users.Fields.Methods;
  useridentities: Users.Identities.Methods;
  users: Users.Methods;
  views: unknown;
}

export interface ClientOptions {
  username: string;
  token: string;
  remoteUri: string;
  oauth?: boolean;
  debug?: boolean;
  disableGlobalState?: boolean;
  asUser?: string;
}

export function createClient(config: ClientOptions): Client;

export namespace Attachments {
  interface Methods {
    request(
      httpMethod: string,
      fields: unknown,
      config: unknown,
      cb?: ZendeskCallback<unknown, unknown>,
    ): unknown;

    upload(
      file: PathLike | ReadStream,
      fileOptions: {
        filename: string;
        token?: string;
      },
      isReadStream: boolean,
      cb?: ZendeskCallback<unknown, unknown>,
    ): void;
  }

  interface Photo extends PersistableModel {
    url: string;
    file_name: string;
    content_url: string;
    content_type: string;
    size: number;
    width: number;
    height: number;
    inline: boolean;
  }

  interface Model extends Photo {
    thumbnails: Array<Photo>;
  }
}

/**
 * @see {@link https://developer.zendesk.com/rest_api/docs/support/job_statuses|Zendesk Job Statuses}
 */
export namespace JobStatuses {
  interface Methods {
    show(jobStatusId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): Promise<ResponsePayload['job_status']>;
    watch(
      jobStatusId: ZendeskID,
      interval: number,
      maxAttempts: number,
      cb?: ZendeskCallback<unknown, unknown>,
    ): unknown;
  }

  type Status = 'queued' | 'working' | 'failed' | 'completed' | 'killed';

  interface Result extends PersistableModel {
    action: string;
    success: boolean;
    status: string;
  }

  interface ResponseModel extends PersistableModel {
    url?: string | null;
    total?: number;
    progress?: number;
    status?: Status;
    message?: string | null;
    results?: Array<Result>;
  }

  interface ResponsePayload {
    job_status: ResponseModel;
  }
}

/**
 * @see {@link https://developer.zendesk.com/rest_api/docs/support/macros|Zendesk Macros}
 */
export namespace Macros {
  interface Methods {
    applyTicket(
      ticketId: ZendeskID,
      macroId: number,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ApplyTicketResponsePayload['result']>;
  }

  interface ApplyTicketResponsePayload {
    result: {
      ticket: Tickets.CreateModel;
      comment: {
        body: string;
        html_body: string;
        scoped_body?: unknown;
        public?: boolean;
      };
    };
  }
}

/**
 * @see {@link https://developer.zendesk.com/rest_api/docs/support/organizations|Zendesk Organizations}
 */
export namespace Organizations {
  interface Model extends AuditableModel {
    url?: string;
    external_id?: string | null;
    name: string;
    domain_names?: Array<string>;
    details?: string | null;
    notes?: string | null;
    group_id?: number | null;
    shared_tickets?: boolean;
    shared_comments?: boolean;
    tags?: Array<string>;
    organization_fields?: object | null;
  }
}

/**
 * @see {@link https://developer.zendesk.com/rest_api/docs/support/requests|Zendesk Requests}
 */
export namespace Requests {
  interface Methods {
    /** Listing Requests */
    list(cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['requests']>;
    listOpen(cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['requests']>;
    listSolved(cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['requests']>;
    listCCD(
      organizationId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['requests']>;
    listByUser(userId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['requests']>;
    listByOrganization(
      organizationId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['requests']>;

    /** Viewing Requests */
    getRequest(
      requestId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ResponsePayload['request']>;

    /** Creating Requests */
    create(
      request: CreatePayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ResponsePayload['request']>;

    /** Updating Requests */
    update(
      requestId: ZendeskID,
      request: UpdatePayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ResponsePayload['request']>;

    /** Listing Comments */
    listComments(
      requestId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<Comments.ListPayload[]>;

    /** Get Comment */
    getComment(
      requestId: ZendeskID,
      commentId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<Comments.ResponsePayload['comment']>;

    /** Inherited */
    requestAll(
      httpMethod: string,
      fields: unknown,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['requests']>;
  }

  /**
   * @see {@link https://developer.zendesk.com/rest_api/docs/support/requests#create-request|Zendesk Requests Create}
   */
  interface CreateModel {
    requester?: RequesterAnonymous; // Required for anonymous requests
    subject: string;
    comment: Comments.CreateModel;
    priority?: Tickets.Priority | null; // Anonymous requests can set priority, Authenticated requests cannot
    type?: Tickets.TicketType | null; // Anonymous requests can set type, Authenticated requests cannot
    custom_fields?: Tickets.Field[] | null;
    fields?: Tickets.Field[] | null;
    due_at?: string | null; // Anonymous requests can set due date as long as type == task. Authenticated requests cannot
    ticket_form_id?: number | null;
    recipient?: string | null;
    collaborators?: ZendeskID[] | string[] | Collaborator[];
  }

  /**
   * @see {@link https://developer.zendesk.com/rest_api/docs/support/requests#update-request|Zendesk Requests Update}
   */
  interface UpdateModel {
    comment?: Comments.CreateModel;
    solved?: boolean;
    additional_collaborators?: ZendeskID[] | string[] | Collaborator[];
  }

  /**
   * @see {@link https://developer.zendesk.com/rest_api/docs/support/requests#json-format|Zendesk Requests JSON Format}
   */
  interface ResponseModel extends AuditableModel {
    url: string;
    subject: string;
    description: string;
    status: Tickets.Status;
    priority: Tickets.Priority | null;
    type: Tickets.TicketType | null;
    custom_fields: Tickets.Field[] | null;
    fields: Tickets.Field[] | null;
    organization_id: ZendeskID | null;
    requester_id: ZendeskID;
    assignee_id: ZendeskID | null;
    group_id?: ZendeskID | null;
    collaborator_ids: ZendeskID[];
    email_cc_ids: ZendeskID[];
    via: Tickets.Via;
    is_public: boolean;
    due_at: string | null;
    can_be_solved_by_me?: boolean;
    solved?: boolean;
    ticket_form_id?: number | null;
    recipient: string | null;
    followup_source_id: string | null;
  }

  interface RequesterAnonymous {
    name: string;
    email?: string;
    locale_id?: ZendeskID;
  }

  interface Collaborator {
    name?: string;
    email: string;
  }

  interface CreatePayload {
    request: CreateModel;
  }

  interface UpdatePayload {
    request: UpdateModel;
  }

  interface ResponsePayload {
    request: ResponseModel;
  }

  interface ListPayload extends PaginablePayload {
    requests: Array<ResponseModel>;
  }

  namespace Comments {
    interface CreateModel {
      url?: string;
      request_id?: number;
      body?: string;
      html_body?: string;
      public?: boolean;
      author_id?: ZendeskID;
      uploads?: Array<string>;
    }

    interface ResponseModel extends TemporalModel {
      url: string;
      type: RequestType;
      request_id: number;
      body: string;
      html_body: string;
      plain_body: string;
      public: boolean;
      author_id: ZendeskID;
      attachments: Array<Attachments.Model>;
      via?: Tickets.Via;
      metadata?: Tickets.Comments.Metadata;
    }

    type RequestType = 'Comment' | 'VoiceComment';

    namespace CommentsUsers {
      interface ResponseModel extends PersistableModel {
        name: string;
        photo: Attachments.Model | null;
        agent: boolean;
        organization_id: number | null;
      }
    }

    interface ListPayload extends PaginablePayload {
      comments: Array<ResponseModel>;
      users: Array<CommentsUsers.ResponseModel>;
      organizations: Array<Tickets.Comments.Organizations.ResponseModel>;
    }

    interface ResponsePayload {
      comment: ResponseModel;
    }
  }
}

/**
 * @see {@link https://developer.zendesk.com/rest_api/docs/support/tickets|Zendesk Tickets}
 */
export namespace Tickets {
  interface Methods {
    /** Listing Tickets */
    list(cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['tickets']>;
    listAssigned(userId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['tickets']>;
    listByOrganization(
      organizationId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['tickets']>;
    listByUserRequested(
      userId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['tickets']>;
    listByUserCCD(userId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['tickets']>;
    listWithFilter(
      type: string,
      value: unknown,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['tickets']>;
    listRecent(cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['tickets']>;
    listCollaborators(
      ticketId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<Users.ListPayload['users']>;
    listIncidents(
      ticketId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['tickets']>;
    listMetrics(
      ticketId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<Metrics.ResponsePayload['ticket_metric']>;

    /** Viewing Tickets */
    show(ticketId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): Promise<ResponsePayload['ticket']>;
    showMany(
      ticketIds: Array<ZendeskID>,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['tickets']>;

    /** Creating Tickets */
    create(ticket: CreatePayload, cb?: ZendeskCallback<unknown, unknown>): Promise<ResponsePayload['ticket']>;
    createMany(
      tickets: CreateManyPayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<JobStatuses.ResponsePayload['job_status']>;

    /** Updating Tickets */
    update(
      ticketId: ZendeskID,
      ticket: UpdatePayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ResponsePayload['ticket']>;
    updateMany(
      tickets: UpdateManyPayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<JobStatuses.ResponsePayload['job_status']>;

    /** Deleting Tickets */
    delete(ticketId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): unknown;
    deleteMany(
      ticketIds: Array<ZendeskID>,
      cb?: ZendeskCallback<unknown, unknown>,
    ): unknown;

    /** Merging Tickets */
    merge(
      ticketId: ZendeskID,
      mergingTickets: MergePayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<JobStatuses.ResponsePayload['job_status']>;

    /** Ticket Exports */
    export(startTime: number, cb?: ZendeskCallback<unknown, unknown>): unknown;
    exportSample(startTime: number, options: unknown): unknown;
    incremental(startTime: number, cb?: ZendeskCallback<unknown, unknown>): unknown;
    incrementalInclude(
      startTime: number,
      include: unknown,
      cb?: ZendeskCallback<unknown, unknown>,
    ): unknown;
    incrementalSample(startTime: number, cb?: ZendeskCallback<unknown, unknown>): unknown;

    /** Listing Comments */
    getComments(
      requestId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<Comments.ListPayload['comments']>;

    /** Listing Audits */
    exportAudit(
      ticketId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<AuditsListPayload['audits']>;

    /** Adding Tags */
    addTags(
      ticketId: ZendeskID,
      tags: Array<string>,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<TagsPayload['tags']>;
  }

  /**
   * @see {@link https://developer.zendesk.com/rest_api/docs/support/tickets#create-ticket|Zendesk Tickets Create}
   */
  interface CreateModel {
    comment: Requests.Comments.CreateModel;
    external_id?: string | null;
    type?: TicketType | null;
    subject?: string | null;
    raw_subject?: string | null;
    priority?: Priority | null;
    status?: Status | null;
    recipient?: string | null;
    requester_id?: ZendeskID;
    submitter_id?: ZendeskID | null;
    assignee_id?: ZendeskID | null;
    organization_id?: number | null;
    group_id?: number | null;
    collaborator_ids?: Array<number> | null;
    collaborators?: Array<any> | null;
    follower_ids?: Array<number> | null;
    email_cc_ids?: Array<number> | null;
    forum_topic_id?: number | null;
    problem_id?: number | null;
    due_at?: string | null;
    tags?: Array<string> | null;
    custom_fields?: Field[] | null;
    fields?: Field[] | null;
    via_followup_source_id?: number | null;
    macro_ids?: Array<number> | null;
    ticket_form_id?: number | null;
    brand_id?: number | null;
  }

  /**
   * @see {@link https://developer.zendesk.com/rest_api/docs/support/tickets#update-ticket|Zendesk Tickets Update}
   */
  interface UpdateModel {
    subject?: string | null;
    comment?: Requests.Comments.CreateModel;
    requester_id?: ZendeskID;
    assignee_id?: ZendeskID | null;
    assignee_email?: string | null;
    group_id?: number | null;
    organization_id?: number | null;
    collaborator_ids?: Array<number> | null;
    additional_collaborators?: Array<any> | null;
    followers?: Array<Follower> | null;
    email_ccs?: Array<EmailCC> | null;
    type?: TicketType | null;
    priority?: Priority | null;
    status?: Status | null;
    tags?: Array<string> | null;
    external_id?: string | null;
    problem_id?: number | null;
    due_at?: string | null;
    custom_fields?: Field[] | null;
    updated_stamp?: string | null;
    safe_update?: boolean;
    sharing_agreement_ids?: Array<number> | null;
    macro_ids?: Array<number> | null;
    attribute_value_ids?: Array<number> | null;
  }

  /**
   * @see {@link https://developer.zendesk.com/rest_api/docs/support/tickets#json-format|Zendesk Tickets JSON Format}
   */
  interface ResponseModel extends AuditableModel {
    url: string;
    external_id: string | null;
    type: TicketType | null;
    subject: string | null;
    raw_subject: string | null;
    description: string;
    priority: Priority | null;
    status: Status;
    recipient: string | null;
    requester_id: ZendeskID;
    submitter_id: ZendeskID;
    assignee_id: ZendeskID | null;
    organization_id: number;
    group_id: number | null;
    collaborator_ids: Array<number>;
    follower_ids: Array<number>;
    email_cc_ids: Array<number>;
    forum_topic_id: number | null;
    problem_id: number | null;
    has_incidents: boolean;
    due_at: string | null;
    tags: Array<string>;
    via: Via;
    custom_fields: Field[];
    fields: Field[];
    satisfaction_rating: object | string | null;
    sharing_agreement_ids: Array<number>;
    followup_ids: Array<number>;
    ticket_form_id?: number | null; // Enterprise version only
    brand_id?: number | null; // Enterprise version only
    allow_channelback: boolean;
    allow_attachments: boolean;
    is_public: boolean;
    comment_count?: number;
  }

  interface Audit {
    id: ZendeskID;
    ticket_id: ZendeskID;
    metadata: unknown | null;
    via: Via | null;
    created_at: string;
    author_id: ZendeskID;
    events: Array<unknown> | null;
  }

  interface EmailCC {
    user_id?: ZendeskID;
    user_email?: string;
    action: string;
  }

  interface Field {
    id: number;
    value: any;
  }

  interface Follower {
    user_id?: ZendeskID;
    user_email?: string;
    action: string;
  }

  type Priority = 'urgent' | 'high' | 'normal' | 'low';

  type Status = 'new' | 'open' | 'pending' | 'hold' | 'solved' | 'closed';

  type TicketType = 'problem' | 'incident' | 'question' | 'task';

  interface Via {
    channel: ViaChannel;
    source: ViaSource;
  }

  type ViaChannel = 'api' | 'web' | 'mobile' | 'rule' | 'system';

  interface ViaSource {
    to: object;
    from: object;
    rel: string | null;
  }

  interface CreatePayload {
    ticket: CreateModel;
  }

  interface CreateManyPayload {
    tickets: Array<CreateModel>;
  }

  interface UpdatePayload {
    ticket: UpdateModel;
  }

  interface UpdateManyPayload {
    tickets: Array<UpdateModel>;
  }

  interface MergePayload {
    ids: Array<ZendeskID>;
    target_comment?: string | null;
    source_comment?: string | null;
  }

  interface AuditsListPayload extends PaginablePayload {
    audits: Array<Audit>;
  }

  interface TagsPayload {
    tags: Array<string>;
  }

  interface ResponsePayload {
    ticket: ResponseModel;
    audit: Audit;
  }

  interface ListPayload extends PaginablePayload {
    tickets: Array<ResponseModel>;
  }

  namespace Comments {
    interface ResponseModel extends Requests.Comments.ResponseModel {
      via?: Via;
      metadata?: Metadata;
    }

    interface Metadata {
      flags?: Array<number>;
      flag_options: unknown;
    }

    interface ListPayload extends PaginablePayload {
      comments: Array<ResponseModel>;
    }

    namespace CommentsUsers {
      interface ResponseModel extends Requests.Comments.CommentsUsers.ResponseModel {
        role: Users.Role;
      }
    }

    namespace Organizations {
      interface ResponseModel extends PersistableModel {
        name: string;
      }
    }
  }

  namespace Metrics {
    interface MinutesObject {
      calendar: number;
      business: number;
    }

    interface ResponseModel extends AuditableModel {
      ticket_id?: ZendeskID;
      url?: string;
      group_stations?: number;
      assignee_stations?: number;
      reopens?: number;
      replies?: number;
      assignee_updated_at?: string | null;
      requester_updated_at?: string | null;
      initially_assigned_at?: string | null;
      assigned_at?: string | null;
      solved_at?: string | null;
      latest_comment_added_at?: string | null;
      first_resolution_time_in_minutes?: MinutesObject;
      reply_time_in_minutes?: MinutesObject;
      full_resolution_time_in_minutes?: MinutesObject;
      agent_wait_time_in_minutes?: MinutesObject;
      requester_wait_time_in_minutes?: MinutesObject;
    }

    interface ResponsePayload {
      ticket_metric: ResponseModel;
    }

    interface ListPayload {
      ticket_metrics: Array<ResponseModel>;
    }
  }
}

/**
 * @see {@link https://developer.zendesk.com/rest_api/docs/support/users|Zendesk Users}
 */
export namespace Users {
  interface Methods {
    /** User Auth */
    auth(cb?: ZendeskCallback<unknown, unknown>): unknown;

    /** Listing Users */
    list(cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['users']>;
    listByGroup(groupId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['users']>;
    listByOrganization(
      organizationId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['users']>;

    /** Showing Users */
    show(userId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): Promise<ResponsePayload['user']>;
    showMany(
      userIds: Array<ZendeskID>,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['users']>;

    /** Creating Users */
    create(user: CreatePayload, cb?: ZendeskCallback<unknown, unknown>): Promise<ResponsePayload['user']>;
    createMany(
      users: CreateManyPayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<JobStatuses.ResponsePayload['job_status']>;
    createOrUpdate(
      user: CreatePayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ResponsePayload['user']>;
    createOrUpdateMany(
      users: CreateManyPayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<JobStatuses.ResponsePayload['job_status']>;

    /** Updating Users */
    update(
      userId: ZendeskID,
      user: UpdatePayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ResponsePayload['user']>;
    updateMany(
      userIds: UpdateIdPayload,
      users: UpdateManyPayload,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<JobStatuses.ResponsePayload['job_status']>;

    /** Suspending Users */
    suspend(userId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): Promise<ResponsePayload['user']>;
    unsuspend(userId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): Promise<ResponsePayload['user']>;

    /** Deleting Users */
    delete(userId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): unknown;

    /** Searching Users */
    search(params: unknown, cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['users']>;

    /** Getting own User */
    me(cb?: ZendeskCallback<unknown, unknown>): Promise<ResponsePayload['user']>;

    /** Merging Users */
    merge(
      userId: ZendeskID,
      targetUserId: ZendeskID,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ResponsePayload['user']>;

    /** Changing User Password */
    password(
      userId: ZendeskID,
      oldPassword: string,
      newPassword: string,
      cb?: ZendeskCallback<unknown, unknown>,
    ): unknown;

    /** Users Export */
    incrementalInclude(
      startTime: number,
      include: unknown,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['users']>;
    incremental(startTime: number, cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['users']>;
    incrementalSample(
      startTime: number,
      cb?: ZendeskCallback<unknown, unknown>,
    ): Promise<ListPayload['users']>;
  }

  interface BaseModel {
    email?: string | null;
    alias?: string | null;
    custom_role_id?: number | null;
    details?: string | null;
    external_id?: string | null;
    locale_id?: number | null;
    moderator?: boolean | null;
    notes?: string | null;
    only_private_comments?: boolean | null;
    organization_id?: number | null;
    default_group_id?: number | null;
    phone?: string | null;
    photo?: Attachments.Model | null;
    restricted_agent?: boolean | null;
    role?: Role | null;
    signature?: string | null;
    suspended?: boolean | null;
    tags?: Array<unknown> | null;
    ticket_restriction?: TicketRestriction | null;
    time_zone?: string | null;
    user_fields?: object | null;
    verified?: boolean | null;
  }

  /**
   * @see {@link https://developer.zendesk.com/rest_api/docs/support/users#create-user|Zendesk Users Create}
   */
  interface CreateModel extends BaseModel {
    name: string;
  }

  /**
   * @see {@link https://developer.zendesk.com/rest_api/docs/support/users#update-user|Zendesk Users Update}
   */
  interface UpdateModel extends BaseModel {
    name?: string;
  }

  /**
   * @see {@link https://developer.zendesk.com/rest_api/docs/support/users#json-format-for-agent-or-admin-requests|Zendesk Users JSON Format}
   */
  interface ResponseModel extends AuditableModel {
    email: string | null;
    name: string;
    active: boolean;
    alias: string | null;
    chat_only: boolean;
    custom_role_id: number | null;
    role_type: RoleType;
    details: string | null;
    external_id: string | null;
    last_login_at: string | null;
    locale: string | null;
    locale_id: number | null;
    moderator: boolean;
    notes: string | null;
    only_private_comments: boolean;
    organization_id: number | null;
    default_group_id: number | null;
    phone: string | null;
    shared_phone_number: boolean | null;
    photo: Attachments.Model | null;
    restricted_agent: boolean;
    role: Role;
    shared: boolean;
    shared_agent: boolean;
    signature: string | null;
    suspended: boolean;
    tags?: Array<unknown> | null;
    ticket_restriction: TicketRestriction | null;
    time_zone: string | null;
    two_factor_auth_enabled: boolean;
    url: string;
    user_fields?: object | null;
    verified: boolean;
    report_csv: boolean;
  }

  type UpdateIdPayload =
    | string
    | Array<ZendeskID>
    | { ids: Array<ZendeskID> }
    | { external_ids: Array<ZendeskID> };

  interface CreatePayload {
    user: CreateModel;
  }

  interface CreateManyPayload {
    users: Array<CreateModel>;
  }

  interface UpdatePayload {
    user: UpdateModel;
  }

  interface UpdateManyPayload {
    users: Array<UpdateModel>;
  }

  interface ResponsePayload {
    user: ResponseModel;
  }

  interface ListPayload extends PaginablePayload {
    users: Array<ResponseModel>;
  }

  type Role = 'admin' | 'agent' | 'end-user';

  /**
   * Defines an agent type
   * 0 - Custom
   * 1 - Light
   * 2 - Chat
   */
  type RoleType = 0 | 1 | 2;

  type TicketRestriction = 'assigned' | 'groups' | 'organization' | 'requested';

  /**
   * @see {@link https://developer.zendesk.com/rest_api/docs/support/user_identities|Zendesk User Identities}
   */
  namespace Identities {
    interface Methods {
      /** Listing Identities */
      list(userId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): Promise<ListPayload['identities']>;

      /** Viewing Identities */
      show(
        userId: ZendeskID,
        identityId: ZendeskID,
        cb?: ZendeskCallback<unknown, unknown>,
      ): Promise<ResponsePayload['identity']>;

      /** Creating Identities */
      create(
        userId: ZendeskID,
        identity: CreatePayload,
        cb?: ZendeskCallback<unknown, unknown>,
      ): Promise<ResponseModel>;

      /** Updating Identities */
      update(
        userId: ZendeskID,
        identityId: ZendeskID,
        identity: UpdatePayload,
        cb?: ZendeskCallback<unknown, unknown>,
      ): Promise<ResponsePayload['identity']>;
      makePrimary(
        userId: ZendeskID,
        identityId: ZendeskID,
        cb?: ZendeskCallback<unknown, unknown>,
      ): Promise<ListPayload['identities']>;
      verify(
        userId: ZendeskID,
        identityId: ZendeskID,
        cb?: ZendeskCallback<unknown, unknown>,
      ): Promise<ResponsePayload['identity']>;
      requestVerification(
        userId: ZendeskID,
        identityId: ZendeskID,
        cb?: ZendeskCallback<unknown, unknown>,
      ): unknown;

      /** Deleting Identities */
      delete(
        userId: ZendeskID,
        identityId: ZendeskID,
        cb?: ZendeskCallback<unknown, unknown>,
      ): unknown;
    }

    interface CreateModel {
      type: IdentityType;
      value: string;
      verified?: boolean;
      primary?: boolean;
    }

    interface UpdateModel {
      value?: string;
      verified?: boolean;
    }

    interface ResponseModel extends AuditableModel {
      url: string;
      user_id: ZendeskID;
      type: IdentityType;
      value: string;
      verified: boolean;
      primary: boolean;
      undeliverable_count: number;
      deliverable_state: DeliverableState;
    }

    interface CreatePayload {
      identity: CreateModel;
    }

    interface UpdatePayload {
      identity: UpdateModel;
    }

    interface ListPayload extends PaginablePayload {
      identities: Array<ResponseModel>;
    }

    interface ResponsePayload {
      identity: ResponseModel;
    }

    type IdentityType =
      | 'agent_forwarding'
      | 'email'
      | 'facebook'
      | 'google'
      | 'phone_number'
      | 'sdk';

    type DeliverableState = 'deliverable' | 'undeliverable';
  }

  namespace Fields {
    interface Methods {
      list(cb?: ZendeskCallback<unknown, unknown>): unknown;
      show(fieldId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): unknown;
      create(field: unknown, cb?: ZendeskCallback<unknown, unknown>): unknown;
      update(fieldId: ZendeskID, field: unknown, cb?: ZendeskCallback<unknown, unknown>): unknown;
      delete(fieldId: ZendeskID, cb?: ZendeskCallback<unknown, unknown>): unknown;
    }
  }
}

export interface PaginablePayload {
  next_page: number | null;
  previous_page: number | null;
  count: number;
}

export interface PersistableModel {
  id: ZendeskID;
}

export interface TemporalModel extends PersistableModel {
  created_at: string;
}

export interface AuditableModel extends TemporalModel {
  updated_at: string | null;
}

export type ZendeskID = number;
