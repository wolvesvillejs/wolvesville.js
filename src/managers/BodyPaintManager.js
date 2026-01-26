'use strict';

const CacheManager = require('./CacheManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for body paints.
 * @extends {CacheManager}
 */
class BodyPaintManager extends CacheManager {
  /**
   * Fetch body paints.
   * @returns {Promise<Collection<string, Object>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.BODY_PAINTS());
    response.forEach(item => this._add(item, item.id));

    return this.cache;
  }
}

module.exports = BodyPaintManager;
