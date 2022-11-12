'use strict';

const RESTOptions = require('../rest/RESTOptions');

/**
 * Options for a client.
 * @typedef {Object} ClientOptions
 * @property {RESTOptions} [rest] REST options
 */

/**
 * Contains various utilities for client options.
 */
class Options {
  /**
   * The default client options.
   * @returns {ClientOptions}
   */
  static createDefault() {
    return {
      rest: RESTOptions.createDefault(),
    };
  }
}

module.exports = Options;
