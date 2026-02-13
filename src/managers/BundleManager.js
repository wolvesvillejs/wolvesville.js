'use strict';

const CacheManager = require('./CacheManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for bundles.
 * @extends {CacheManager}
 */
class BundleManager extends CacheManager {
  /**
   * Fetch bundles.
   * @returns {Promise<Collection<string, Object>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.BUNDLES());
    response.forEach(item => this._add(item, item.id));

    return this.cache;
  }
}

module.exports = BundleManager;
