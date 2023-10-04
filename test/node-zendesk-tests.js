const process = require('node:process');
const zd = require('../src/index');
const exampleConfig = require('../examples/exampleConfig');
const { Organizations } = require('../src/clients/core/organizations');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  subdomain: process.env.ZENDESK_TEST_SUBDOMAIN || exampleConfig.auth.subdomain,
  debug: true,
});

async function performZendeskOperations() {
  /** Job Statuses Methods */
  // await client.jobstatuses.show(123);
  // await client.jobstatuses.watch(123, 2, 3);

  /** Macros Methods */
  // await client.macros.applyTicket(123, 123);

  /** Organizations Methods */
  // await client.organizations.list();
  // await client.organizations.show(123);
  // await client.organizations.create({organization: {name: 'food'}});
  await client.get(Organizations).createMany({
    organizations: [{name: 'foo'}, {name: 'bar'}],
  });
  // Await client.organizations.update(123, {organization: {notes: 'foo'}});
  //   Await client.organizations.updateMany({
  //     organizations: [
  //       {id: 123, notes: 'foo'},
  //       {id: 456, notes: 'bar'},
  //     ],
  //   });
  // await client.organizations.delete(123);
  //   await client.organizations.search({external_id: 123});
  //   await client.organizations.autocomplete({name: 'foo'});

  /** Requests Methods */
  //   await client.requests.list();
  //   await client.requests.listOpen();
  //   await client.requests.listSolved();
  //   await client.requests.listCCD(123);
  // Await client.requests.listByUser(123);
  // await client.requests.listByOrganization(123);
  //   await client.requests.getRequest(123);
  // Await client.requests.create({request: {subject: 'foo', comment: {}}});
  // await client.requests.update(123, {request: {}});
  // await client.requests.listComments(123);
  // await client.requests.getComment(123, 123);

  /** Attachments Methods */

  //   const {
  //     r2: {
  //       upload: {token},
  //     },
  //   } = await (async () => {
  //     const r1 = await client.attachments.show(1);
  //     const r2 = await client.attachments.upload('/path/to/file', {
  //       filename: 'filename',
  //     });
  //     const r3 = await client.attachments.upload(
  //       require('node:buffer').Buffer.alloc(8),
  //       {
  //         filename: 'filename',
  //       },
  //     );
  //     const r4 = await client.attachments.upload(
  //       require('node:buffer').Buffer.from('Test'),
  //       {
  //         filename: 'filename',
  //         binary: true,
  //       },
  //     );
  //     return {r1, r2, r3, r4};
  //   })();

  //   await client.attachments.upload(path.resolve('./examples/busey.gif'), {
  //     filename: 'busey.gif',
  //   });

  /** Tickets Methods */
  //   await client.tickets.list();
  //  Await client.tickets.create({ticket: {comment: {uploads: [token]}}});
  //   await client.tickets.createMany({tickets: [{comment: {}}]});
  //   await client.tickets.update(123, {ticket: {}});
  //   await client.tickets.updateMany({tickets: [{}]});
  //   await client.tickets.delete(123);
  //   await client.tickets.deleteMany([123, 234]);
  //   await client.tickets.merge(123, {ids: [234, 345]});
  //   await client.tickets.export(1_332_034_771);
  //   await client.tickets.exportSample(1_332_034_771, {});
  //   await client.tickets.incremental(1_332_034_771);
  //   await client.tickets.incrementalInclude(1_332_034_771, {});
  //   await client.tickets.incrementalSample(1_332_034_771);
  //   await client.tickets.getComments(123);
  //   await client.tickets.exportAudit(123);
  //   await client.tickets.addTags(123, ['foo', 'bar']);

  /** Ticket Fields */
  //   await client.ticketfields.create({
  //     type: 'subject',
  //     title: 'Subject',
  //     description: 'This is the agent only description for the subject field',
  //     position: 0,
  //     active: true,
  //     key: 'subject',
  //   });

  /** Groups Methods */
  //   await client.groups.list();
  //   await client.groups.assignable();
  //   await client.groups.show(123);
  //   Await client.groups.create({
  //     group: {name: 'foo', default: false, description: 'bar'},
  //   });
  //   await client.groups
  //     .create({group: {name: 'foo', default: false, description: 'bar'}})
  //     .then();
  //   await client.groups.update(123, {group: {name: 'foo'}});
  //   await client.groups.delete(123);

  /** Users Methods */
  //   await client.users.auth();
  //   await client.users.list();
  //   Await client.users.listByGroup(123);
  //   await client.users.listByOrganization(123);
  //   await client.users.show(123);
  //   await client.users.showMany([123, 234]);
  //   await client.users.create({user: {name: 'foo'}});
  //   await client.users.createMany({users: [{name: 'foo'}]});
  //   await client.users.createOrUpdate({user: {name: 'foo'}});
  //   await client.users.createOrUpdateMany({users: [{name: 'foo'}]});
  //   await client.users.createOrUpdateMany({users: [{name: 'foo'}]}).then();
  //   await client.users.update(123, {user: {}});
  //   await client.users.updateMany([123, 234], {users: [{}, {}]});
  //   await client.users.suspend(123);
  //   await client.users.unsuspend(123);
  //   await client.users.delete(123);
  //   await client.users.search({});
  //   await client.users.me();
  //   await client.users.merge(123, 234);
  //   await client.users.password(123, 'foo', 'bar');
  //   await client.users.incrementalInclude(1_332_034_771, {});
  //   await client.users.incremental(1_332_034_771);
  //   await client.users.incrementalSample(1_332_034_771);

  /** User Identities Methods */
  //   await client.useridentities.list(123);
  //   await client.useridentities.show(123, 234);
  //   await client.useridentities.create(123, {
  //     identity: {type: 'email', value: 'foo@example.com'},
  //   });
  //   await client.useridentities
  //     .create(123, {identity: {type: 'email', value: 'foo@example.com'}})
  //     .then();
  //   await client.useridentities.update(123, 234, {identity: {}});
  //   await client.useridentities.makePrimary(123, 234);
  //   await client.useridentities.verify(123, 234);
  //   await client.useridentities.requestVerification(123, 234);
  //   await client.useridentities.delete(123, 234);

  /** User Fields */
  //   await client.userfields.create({
  //     title: 'Support description (type text is default)',
  //     description: 'This field describes the support plan this user has',
  //     position: 0,
  //     active: true,
  //     key: 'support_description',
  //   });
  //   await client.userfields.create({
  //     type: 'textarea',
  //     title: 'Support description',
  //     description: 'This field describes the support plan this user has',
  //     position: 0,
  //     active: true,
  //     key: 'support_description',
  //   });
  //   await client.userfields.create({
  //     type: 'tagger',
  //     title: 'Support description',
  //     description: 'This field describes the support plan this user has',
  //     position: 0,
  //     active: true,
  //     key: 'support_description',
  //     custom_field_options: [
  //       {
  //         id: 1,
  //         name: 'Custom Fielld Option',
  //         value: 5,
  //       },
  //     ],
  //   });
}

performZendeskOperations().catch((error) => {
  console.error('Error during Zendesk operations:', error);
});
