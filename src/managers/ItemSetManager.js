'use strict';

const CacheManager = require('./CacheManager');
const ItemSet = require('../structures/ItemSet');
const Routes = require('../util/Routes');

/**
 * Manages API methods for item sets.
 * @extends {CacheManager}
 */
class ItemSetManager extends CacheManager {
  /**
   * Fetch item sets.
   * @returns {Promise<Collection<string, ItemSet>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.AVATAR_ITEM_SETS());
    response.map(item => this._add(new ItemSet(this.client, item)));

    return this.cache;
  }
}

module.exports = ItemSetManager;
