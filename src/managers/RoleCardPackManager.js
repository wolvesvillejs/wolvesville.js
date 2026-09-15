'use strict';

const CacheManager = require('./CacheManager');
const RoleCardPack = require('../structures/RoleCardPack');
const Routes = require('../util/Routes');

/**
 * Manages API methods for role card packs.
 * @extends {CacheManager}
 */
class RoleCardPackManager extends CacheManager {
  /**
   * Fetch role card packs.
   * @returns {Promise<Collection<string, AdvancedRoleCardOffers>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.ADVANCED_ROLE_CARD_OFFERS());
    response.forEach(item => this._add(new RoleCardPack(this.client, item)));

    return this.cache;
  }
}

module.exports = RoleCardPackManager;
