'use strict';

const CacheManager = require('./CacheManager');
const Bundle = require('../structures/Bundle');
const Routes = require('../util/Routes');

/**
 * Manages API methods for bundles.
 * @extends {CacheManager}
 */
class BundleManager extends CacheManager {
  /**
   * Fetch bundles.
   * @param {?string} [locale] Optional locale for localized names and descriptions
   * @returns {Promise<Collection<string, Bundle>>}
   */
  async fetch(locale) {
    const options = locale ? { query: { locale } } : {};
    const response = await this.client.rest.get(Routes.BUNDLES(), options);
    response.forEach(item => this._add(new Bundle(this.client, item)));

    return this.cache;
  }
}

module.exports = BundleManager;
