'use strict';

const CacheManager = require('./CacheManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for calendars.
 * @extends {CacheManager}
 */
class CalendarManager extends CacheManager {
  /**
   * Fetch calendars.
   * @param {?string} [locale] Optional locale for translations
   * @returns {Promise<Collection<string, Object>>}
   */
  async fetch(locale) {
    const options = locale ? { query: { locale } } : {};
    const response = await this.client.rest.get(Routes.CALENDARS(), options);
    response.forEach(item => this._add(item, item.id));

    return this.cache;
  }
}

module.exports = CalendarManager;
