'use strict';

const CacheManager = require('./CacheManager');
const BodyPaint = require('../structures/BodyPaint');
const Routes = require('../util/Routes');

/**
 * Manages API methods for body paints.
 * @extends {CacheManager}
 */
class BodyPaintManager extends CacheManager {
  /**
   * Fetch body paints.
   * @returns {Promise<Collection<string, BodyPaint>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.BODY_PAINTS());
    response.forEach(item => this._add(new BodyPaint(this.client, item)));

    return this.cache;
  }
}

module.exports = BodyPaintManager;
