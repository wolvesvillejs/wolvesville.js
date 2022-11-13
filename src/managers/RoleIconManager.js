'use strict';

const CacheManager = require('./CacheManager');
const RoleIcon = require('../structures/RoleIcon');
const Routes = require('../util/Routes');

/**
 * Manages API methods for role icons.
 * @extends {CacheManager}
 */
class RoleIconManager extends CacheManager {
  /**
   * Fetch role icons.
   * @returns {Promise<Collection<string, RoleIcon>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.ROLE_ICONS());
    response.forEach(item => this._add(new RoleIcon(this.client, item)));

    return this.cache;
  }
}

module.exports = RoleIconManager;
