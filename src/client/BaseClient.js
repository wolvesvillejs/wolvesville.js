'use strict';

const REST = require('../rest/REST');
const Options = require('../util/Options');
const Util = require('../util/Util');

/**
 * The base class for all clients.
 */
class BaseClient {
  constructor(options = {}) {
    if (typeof options !== 'object' || options === null) {
      throw new Error('INVALID_OPTIONS');
    }

    /**
     * The options the client was instantiated with
     * @type {ClientOptions}
     */
    this.options = Util.mergeDefault(Options.createDefault(), options);

    /**
     * The REST manager of the client
     * @type {REST}
     */
    this.rest = new REST(this.options.rest);

    /**
     * Ready timestamp
     * @type {?number}
     */
    this.readyTimestamp = null;
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
   * Logs the client in.
   * @param {?string} [APIKey] API key
   * @returns {Client}
   */
  login(APIKey) {
    if (!APIKey && process.env.WOLVESVILLE_API_KEY) {
      APIKey = process.env.WOLVESVILLE_API_KEY;
    }

    if (!(APIKey && typeof APIKey === 'string')) {
      throw new Error('INVALID_API_KEY_FORMAT');
    }

    this.rest.setAPIKey(APIKey);
    this.readyTimestamp = Date.now();
    return this;
  }

  /**
   * Destroy client.
   */
  destroy() {
    this.rest.setAPIKey(null);
    this.readyTimestamp = null;
  }
}

module.exports = BaseClient;
