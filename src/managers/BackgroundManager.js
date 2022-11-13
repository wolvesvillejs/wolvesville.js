'use strict';

const CacheManager = require('./CacheManager');
const Background = require('../structures/Background');
const Routes = require('../util/Routes');

/**
 * Manages API methods for backgrounds.
 * @extends {CacheManager}
 */
class BackgroundManager extends CacheManager {
  /**
   * Fetch backgrounds.
   * @returns {Promise<Collection<string, Background>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.BACKGROUNDS());
    response.forEach(item => this._add(new Background(this.client, item)));

    return this.cache;
  }
}

module.exports = BackgroundManager;
