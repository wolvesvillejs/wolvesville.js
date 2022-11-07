'use strict';

const Base = require('./Base');

/**
 * Represents a role.
 * @extends {Base}
 */
class Role extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Role name
     * @type {string}
     */
    this.name = data.name;

    /**
     * Role probability
     * @type {number}
     */
    this.probability = data.name;
  }
}

module.exports = Role;
