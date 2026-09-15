'use strict';

const CacheManager = require('./CacheManager');
const BaseRoleCardOffer = require('../structures/BaseRoleCardOffer');
const Routes = require('../util/Routes');

/**
 * Manages API methods for base role card offers.
 * @extends {CacheManager}
 */
class BaseRoleCardOfferManager extends CacheManager {
  /**
   * Fetch base role card offers.
   * @returns {Promise<Collection<string, BaseRoleCardOffer>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.BASE_ROLE_CARD_OFFERS());
    response.forEach(item => this._add(new BaseRoleCardOffer(this.client, item)));

    return this.cache;
  }
}

module.exports = BaseRoleCardOfferManager;
