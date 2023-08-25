const {Client} = require('./client');

class DynamicContent extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['items', 'variants'];
  }

  listItems(cb) {
    return this.get(['dynamic_content', 'items'], cb);
  }

  listAllItems(cb) {
    return this.getAll(['dynamic_content', 'items'], cb);
  }

  showItem(itemID, cb) {
    return this.get(['dynamic_content', 'items', itemID], cb);
  }

  createItem(item, cb) {
    return this.post(['dynamic_content', 'items'], item, cb);
  }

  updateItem(itemID, item, cb) {
    return this.put(['dynamic_content', 'items', itemID], item, cb);
  }

  deleteItem(itemID, cb) {
    return this.delete(['dynamic_content', 'items', itemID], cb);
  }

  listVariants(itemID, cb) {
    return this.get(['dynamic_content', 'items', itemID, 'variants'], cb);
  }

  listAllVariants(itemID, cb) {
    return this.getAll(['dynamic_content', 'items', itemID, 'variants'], cb);
  }

  showVariant(itemID, variantID, cb) {
    return this.get(
      ['dynamic_content', 'items', itemID, 'variants', variantID],
      cb,
    );
  }

  createVariant(itemID, variant, cb) {
    return this.post(
      ['dynamic_content', 'items', itemID, 'variants'],
      variant,
      cb,
    );
  }

  updateVariant(itemID, variantID, variant, cb) {
    return this.put(
      ['dynamic_content', 'items', itemID, 'variants', variantID],
      variant,
      cb,
    );
  }

  deleteVariant(itemID, variantID, cb) {
    return this.delete(
      ['dynamic_content', 'items', itemID, 'variants', variantID],
      cb,
    );
  }
}

exports.DynamicContent = DynamicContent;
