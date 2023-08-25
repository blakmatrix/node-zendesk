// Sections.js: Client for the zendesk API.
const {Client} = require('../client');

class Sections extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['sections', 'section'];
    this.sideLoadMap = [
      {
        field: 'category_id',
        name: 'category',
        dataset: 'categories',
      },
    ];
  }

  // Sections
  // Listing Sections
  list(cb) {
    return this.getAll(['sections'], cb);
  }

  // Listing Sections In A Category
  listByCategory(categoryID, cb) {
    return this.getAll(['categories', categoryID, 'sections'], cb);
  }

  // Listing Sections By Locale
  listWithLocale(locale, cb) {
    return this.getAll([locale, 'sections'], cb);
  }

  // Listing Sections By Locale In A Category
  listByCategoryByLocale(locale, categoryID, cb) {
    return this.getAll([locale, 'categories', categoryID, 'sections'], cb);
  }

  // Viewing Sections
  show(sectionID, cb) {
    return this.get(['sections', sectionID], cb);
  }

  // Viewing Section by locale
  showWithLocale(locale, sectionID, cb) {
    return this.get([locale, 'sections', sectionID], cb);
  }

  // Creating Sections
  create(categoryId, section, cb) {
    return this.post(['categories', categoryId, 'sections'], section, cb);
  }

  // Creating Sections With Specified Locale
  createWithLocale(locale, categoryId, section, cb) {
    return this.post(
      [locale, 'categories', categoryId, 'sections'],
      section,
      cb,
    );
  }

  // Updating Sections
  update(sectionID, section, cb) {
    return this.put(['sections', sectionID], section, cb);
  }

  // Updating Sections By Locale
  updateWithLocale(locale, sectionID, section, cb) {
    return this.put([locale, 'sections', sectionID], section, cb);
  }

  // Updating Sections' Source Locale
  updateSourceLocale(sectionID, sourceLocale, cb) {
    return this.put(['sections', sectionID, 'source_locale'], sourceLocale, cb);
  }

  // Deleting Sections
  delete(sectionID, cb) {
    return this.delete(['sections', sectionID], cb);
  }
}

exports.Sections = Sections;
