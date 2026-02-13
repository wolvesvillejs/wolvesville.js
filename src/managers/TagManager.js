'use strict';

const BaseManager = require('./BaseManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for item tags.
 * @extends {BaseManager}
 */
class TagManager extends BaseManager {
  /**
   * Fetch item tags.
   * @returns {Promise<Array>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.TAGS());
    return response;
  }
}

module.exports = TagManager;
