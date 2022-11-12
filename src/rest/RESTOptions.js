'use strict';

/**
 * Options for a REST instance.
 * @typedef {Object} RESTOptions
 * @property {number} [timeout=15_000] The time to wait in milliseconds before a request is aborted
 * @property {string} [api='https://api.wolvesville.com'] Base URL of the API
 * @property {CDNOptions} [cdn] CDN options
 */

/**
 * CDN options.
 * @typedef {Object} CDNOptions
 * @property {string} [items='https://cdn.wolvesville.com'] CDN URL of the items
 * @property {string} [avatars='https://cdn-avatars.wolvesville.com'] CDN URL of the avatars
 */

/**
 * Options to be passed when creating the REST instance.
 */
class RESTOptions {
  /**
   * The default REST options.
   * @returns {RESTOptions}
   */
  static createDefault() {
    return {
      timeout: 15_000,
      api: 'https://api.wolvesville.com',
      cdn: {
        items: 'https://cdn.wolvesville.com',
        avatars: 'https://cdn-avatars.wolvesville.com',
      },
    };
  }
}

module.exports = RESTOptions;
