'use strict';

const CacheManager = require('./CacheManager');
const Badge = require('../structures/Badge');
const Routes = require('../util/Routes');

/**
 * Manages API methods for badges.
 * @extends {CacheManager}
 */
class BadgeManager extends CacheManager {
  /**
   * Fetch badges.
   * @param {?string} [locale] Optional locale for localized names and descriptions
   * @returns {Promise<Collection<string, Badge>>}
   */
  async fetch(locale) {
    const options = locale ? { query: { locale } } : {};
    const response = await this.client.rest.get(Routes.BADGES(), options);
    response.forEach(item => this._add(new Badge(this.client, item)));

    return this.cache;
  }
}

module.exports = BadgeManager;
