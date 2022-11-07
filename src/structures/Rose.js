'use strict';

const Base = require('./Base');

/**
 * Represents a rose package.
 * @extends {Base}
 */
class Rose extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Rose id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Rose type
     * @type {string}
     */
    this.type = data.type;
  }
}

module.exports = Rose;
