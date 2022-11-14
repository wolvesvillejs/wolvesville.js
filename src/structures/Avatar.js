'use strict';

const Base = require('./Base');

/**
 * Represents an avatar.
 * @extends {Base}
 */
class Avatar extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Avatar width
     * @type {number}
     */
    this.width = data.width;

    /**
     * Avatar height
     * @type {number}
     */
    this.height = data.height;

    Object.defineProperty(this, '_cdn', {
      value: { imageURL: data.url },
    });
  }

  /**
   * Get avatar image URL.
   * @returns {string}
   */
  imageURL() {
    return this._cdn.imageURL;
  }
}

module.exports = Avatar;
