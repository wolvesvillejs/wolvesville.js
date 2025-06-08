'use strict';

const CacheManager = require('./CacheManager');
const Role = require('../structures/Role');
const Routes = require('../util/Routes');

/**
 * Manages API methods for roles.
 * @extends {CacheManager}
 */
class RoleManager extends CacheManager {
  /**
   * Fetch roles.
   * @returns {Promise<Collection<string, Role>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.ROLES());
    response.roles.forEach(role => this._add(new Role(this.client, role)));

    return this.cache;
  }
}

module.exports = RoleManager;
