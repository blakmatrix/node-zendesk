const {Client} = require('../client');

/**
 * Represents the UserFields client for the Zendesk API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/}
 */
class UserFields extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['user_fields', 'user_field'];
  }

  /**
   * Lists all custom user fields in the account.
   * @async
   * @returns {Promise<Object>} The list of user fields.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/#list-user-fields}
   * @example const userFields = await client.userfields.list();
   */
  async list() {
    return this.getAll(['user_fields']);
  }

  /**
   * Retrieves details of a specific user field.
   * @async
   * @param {number} userFieldID - The ID of the user field.
   * @returns {Promise<Object>} Details of the user field.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/#show-user-field}
   * @example const userField = await client.userfields.show(12345);
   */
  async show(userFieldID) {
    return this.get(['user_fields', userFieldID]);
  }

  /**
   * Creates a new user field.
   * @async
   * @param {Object} userField - The user field data.
   * @returns {Promise<Object>} The created user field.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/#create-user-field}
   * @example const newUserField = await client.userfields.create({ type: 'text', title: 'Support description' });
   */
  async create(userField) {
    return this.post(['user_fields'], userField);
  }

  /**
   * Updates an existing user field.
   * @async
   * @param {number} userFieldID - The ID of the user field.
   * @param {Object} userField - The updated user field data.
   * @returns {Promise<Object>} The updated user field.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/#update-user-field}
   * @example await client.userfields.update(12345, { title: 'Updated Support description' });
   */
  async update(userFieldID, userField) {
    return this.put(['user_fields', userFieldID], userField);
  }

  /**
   * Deletes a user field.
   * @async
   * @param {number} userFieldID - The ID of the user field.
   * @returns {Promise<Object>} The response from the delete operation.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/#delete-user-field}
   * @example await client.userfields.delete(12345);
   */
  async delete(userFieldID) {
    return super.delete(['user_fields', userFieldID]);
  }

  /**
   * Reorders the user fields based on the provided IDs.
   * @async
   * @param {Array<number>} userFieldIDs - An array of user field IDs in the desired order.
   * @returns {Promise<Object>} The reordered user fields.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/#reorder-user-field}
   * @example await client.userfields.reorder([3, 4]);
   */
  async reorder(userFieldIDs) {
    return this.put(['user_fields', 'reorder'], {user_field_ids: userFieldIDs});
  }

  /**
   * Lists options for a specific dropdown user field.
   * @async
   * @param {number} userFieldID - The ID of the user field.
   * @returns {Promise<Object>} The list of user field options.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/#list-user-field-options}
   * @example const options = await client.userfields.listOptions(12345);
   */
  async listOptions(userFieldID) {
    return this.get(['user_fields', userFieldID, 'options']);
  }

  /**
   * Retrieves details of a specific user field option.
   * @async
   * @param {number} userFieldID - The ID of the user field.
   * @param {number} userFieldOptionID - The ID of the user field option.
   * @returns {Promise<Object>} Details of the user field option.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/#show-a-user-field-option}
   * @example const option = await client.userfields.showOption(12345, 67890);
   */
  async showOption(userFieldID, userFieldOptionID) {
    return this.get(['user_fields', userFieldID, 'options', userFieldOptionID]);
  }

  /**
   * Creates or updates a user field option.
   * @async
   * @param {number} userFieldID - The ID of the user field.
   * @param {Object} customFieldOption - The user field option data.
   * @returns {Promise<Object>} The created or updated user field option.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/#create-or-update-a-user-field-option}
   * @example await client.userfields.createOrUpdateOption(12345, { name: 'Grapes', position: 2, value: 'grape' });
   */
  async createOrUpdateOption(userFieldID, customFieldOption) {
    return this.post(
      ['user_fields', userFieldID, 'options'],
      customFieldOption,
    );
  }

  /**
   * Deletes a user field option.
   * @async
   * @param {number} userFieldID - The ID of the user field.
   * @param {number} userFieldOptionID - The ID of the user field option.
   * @returns {Promise<Object>} The response from the delete operation.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_fields/#delete-user-field-option}
   * @example await client.userfields.deleteOption(12345, 67890);
   */
  async deleteOption(userFieldID, userFieldOptionID) {
    return super.delete([
      'user_fields',
      userFieldID,
      'options',
      userFieldOptionID,
    ]);
  }
}

exports.UserFields = UserFields;
