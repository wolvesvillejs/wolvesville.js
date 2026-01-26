'use strict';

const CacheManager = require('./CacheManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for profile icon borders.
 * @extends {CacheManager}
 */
class ProfileIconBorderManager extends CacheManager {
  /**
   * Fetch profile icon borders.
   * @returns {Promise<Collection<string, Object>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.PROFILE_ICON_BORDERS());
    response.forEach(item => this._add(item, item.id));

    return this.cache;
  }
}

module.exports = ProfileIconBorderManager;
