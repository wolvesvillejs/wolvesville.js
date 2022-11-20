'use strict';

const REST = require('../rest/REST');

/**
 * The base class for all clients.
 * @abstract
 */
class BaseClient {
  constructor(APIKey) {
    if (!APIKey && process.env.WOLVESVILLE_API_KEY) {
      APIKey = process.env.WOLVESVILLE_API_KEY;
    }

    if (!APIKey || typeof APIKey !== 'string') {
      throw new Error('INVALID_API_KEY_FORMAT');
    }

    /**
     * The REST manager of the client
     * @type {REST}
     */
    this.rest = new REST(APIKey);

    /**
     * Ready timestamp
     * @type {?number}
     */
    this.readyTimestamp = Date.now();
  }

  /**
   * Time at which the client was ready
   * @type {?Date}
   * @readonly
   */
  get readyAt() {
    return this.readyTimestamp && new Date(this.readyTimestamp);
  }

  /**
   * How long it has been since the client was ready
   * @type {?number}
   * @readonly
   */
  get uptime() {
    return this.readyTimestamp && Date.now() - this.readyTimestamp;
  }

  /**
   * Destroy client.
   * @returns {void}
   */
  destroy() {
    this.rest.APIKey = null;
    this.readyTimestamp = null;
  }
}

module.exports = BaseClient;
