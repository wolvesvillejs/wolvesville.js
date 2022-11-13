'use strict';

const CacheManager = require('./CacheManager');
const ProfileIcon = require('../structures/ProfileIcon');
const Routes = require('../util/Routes');

/**
 * Manages API methods for profile icons.
 * @extends {CacheManager}
 */
class ProfileIconManager extends CacheManager {
  /**
   * Fetch profile icons.
   * @returns {Promise<Collection<string, ProfileIcon>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.PROFILE_ICONS());
    response.forEach(item => this._add(new ProfileIcon(this.client, item)));

    return this.cache;
  }
}

module.exports = ProfileIconManager;
