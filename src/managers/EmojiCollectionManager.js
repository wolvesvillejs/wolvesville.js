'use strict';

const CacheManager = require('./CacheManager');
const EmojiCollection = require('../structures/EmojiCollection');
const Routes = require('../util/Routes');

/**
 * Manages API methods for emoji collections.
 * @extends {CacheManager}
 */
class EmojiCollectionManager extends CacheManager {
  /**
   * Fetch emoji collections.
   * @returns {Promise<Collection<string, EmojiCollection>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.EMOJI_COLLECTIONS());
    response.forEach(item => this._add(new EmojiCollection(this.client, item)));

    return this.cache;
  }
}

module.exports = EmojiCollectionManager;
