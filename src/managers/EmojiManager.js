'use strict';

const CacheManager = require('./CacheManager');
const Emoji = require('../structures/Emoji');
const Routes = require('../util/Routes');

/**
 * Manages API methods for emojis.
 * @extends {CacheManager}
 */
class EmojiManager extends CacheManager {
  /**
   * Fetch emojis.
   * @returns {Promise<Collection<string, Emoji>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.EMOJIS());
    response.forEach(item => this._add(new Emoji(this.client, item)));

    return this.cache;
  }
}

module.exports = EmojiManager;
