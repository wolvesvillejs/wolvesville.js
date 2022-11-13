'use strict';

const CacheManager = require('./CacheManager');
const LoadingScreen = require('../structures/LoadingScreen');
const Routes = require('../util/Routes');

/**
 * Manages API methods for loading screens.
 * @extends {CacheManager}
 */
class LoadingScreenManager extends CacheManager {
  /**
   * Fetch loading screens.
   * @returns {Promise<Collection<string, LoadingScreen>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.LOADING_SCREENS());
    response.forEach(item => this._add(new LoadingScreen(this.client, item)));

    return this.cache;
  }
}

module.exports = LoadingScreenManager;
