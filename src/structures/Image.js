'use strict';

const Base = require('./Base');

/**
 * Represents a image.
 * @extends {Base}
 */
class Image extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Image url
     * @type {string}
     */
    this.url = data.url;

    /**
     * Image width
     * @type {number}
     */
    this.width = data.width;

    /**
     * Image number
     * @type {number}
     */
    this.height = data.height;
  }
}

module.exports = Image;
