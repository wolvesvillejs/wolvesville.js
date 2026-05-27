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
   * @returns {Promise<Collection<string, Bundle>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.BUNDLES());
    response.forEach(item => this._add(new Bundle(this.client, item)));

    return this.cache;
  }
}

module.exports = BundleManager;
