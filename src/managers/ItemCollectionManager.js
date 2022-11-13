'use strict';

const CacheManager = require('./CacheManager');
const ItemCollection = require('../structures/ItemCollection');
const Routes = require('../util/Routes');

/**
 * Manages API methods for item collections.
 * @extends {CacheManager}
 */
class ItemCollectionManager extends CacheManager {
  /**
   * Fetch item collections.
   * @returns {Promise<Collection<string, ItemCollection>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.AVATAR_ITEM_COLLECTIONS());
    response.forEach(item => this._add(new ItemCollection(this.client, item)));

    return this.cache;
  }
}

module.exports = ItemCollectionManager;
