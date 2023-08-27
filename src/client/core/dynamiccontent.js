const {Client} = require('../client');

class DynamicContent extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['items', 'variants'];
  }

  async listItems() {
    return this.get(['dynamic_content', 'items']);
  }

  async listAllItems() {
    return this.getAll(['dynamic_content', 'items']);
  }

  async showItem(itemID) {
    return this.get(['dynamic_content', 'items', itemID]);
  }

  async createItem(item) {
    return this.post(['dynamic_content', 'items'], item);
  }

  async updateItem(itemID, item) {
    return this.put(['dynamic_content', 'items', itemID], item);
  }

  async deleteItem(itemID) {
    return this.delete(['dynamic_content', 'items', itemID]);
  }

  async listVariants(itemID) {
    return this.get(['dynamic_content', 'items', itemID, 'variants']);
  }

  async listAllVariants(itemID) {
    return this.getAll(['dynamic_content', 'items', itemID, 'variants']);
  }

  async showVariant(itemID, variantID) {
    return this.get([
      'dynamic_content',
      'items',
      itemID,
      'variants',
      variantID,
    ]);
  }

  async createVariant(itemID, variant) {
    return this.post(['dynamic_content', 'items', itemID, 'variants'], variant);
  }

  async updateVariant(itemID, variantID, variant) {
    return this.put(
      ['dynamic_content', 'items', itemID, 'variants', variantID],
      variant,
    );
  }

  async deleteVariant(itemID, variantID) {
    return this.delete([
      'dynamic_content',
      'items',
      itemID,
      'variants',
      variantID,
    ]);
  }
}

exports.DynamicContent = DynamicContent;
