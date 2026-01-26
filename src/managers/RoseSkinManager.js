'use strict';

const CacheManager = require('./CacheManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for rose skins.
 * @extends {CacheManager}
 */
class RoseSkinManager extends CacheManager {
  /**
   * Fetch rose skins.
   * @returns {Promise<Collection<string, Object>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.ROSE_SKINS());
    response.forEach(item => this._add(item, item.id));

    return this.cache;
  }
}

module.exports = RoseSkinManager;
