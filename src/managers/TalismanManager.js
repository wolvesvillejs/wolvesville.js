'use strict';

const CacheManager = require('./CacheManager');
const Talisman = require('../structures/Talisman');
const Routes = require('../util/Routes');

/**
 * Manages API methods for talismans.
 * @extends {CacheManager}
 */
class TalismanManager extends CacheManager {
  /**
   * Fetch talismans.
   * @returns {Promise<Collection<string, Talisman>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.TALISMANS());
    response.forEach(item => this._add(new Talisman(this.client, item)));

    return this.cache;
  }
}

module.exports = TalismanManager;
