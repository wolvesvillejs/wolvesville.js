'use strict';

const CacheManager = require('./CacheManager');
const Rose = require('../structures/Rose');
const Routes = require('../util/Routes');

/**
 * Manages API methods for roses.
 * @extends {CacheManager}
 */
class RoseManager extends CacheManager {
  /**
   * Fetch roses.
   * @returns {Promise<Collection<string, Rose>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.ROSES());
    response.forEach(item => this._add(new Rose(this.client, item)));

    return this.cache;
  }
}

module.exports = RoseManager;
