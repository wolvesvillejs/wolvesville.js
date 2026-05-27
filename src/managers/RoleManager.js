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
   * @param {?string} [locale] Optional locale for localized role names and descriptions
   * @returns {Promise<Collection<string, Role>>}
   */
  async fetch(locale) {
    const options = locale ? { query: { locale } } : {};
    const response = await this.client.rest.get(Routes.ROLES(), options);
    response.roles.forEach(role => this._add(new Role(this.client, role)));

    /**
     * Mapping of base role IDs to arrays of advanced role variant IDs
     * @type {Object<string, string[]>}
     */
    this.advancedRolesMapping = response.advancedRolesMapping ?? {};

    /**
     * Mapping of role IDs to arrays of random role variant IDs
     * @type {Object<string, string[]>}
     */
    this.randomRolesMapping = response.randomRolesMapping ?? {};

    /**
     * Role IDs excluded from ranked random selection
     * @type {string[]}
     */
    this.rankedRandomExcludedRoles = response.rankedRandomExcludedRoles ?? [];

    return this.cache;
  }
}

module.exports = RoleManager;
