'use strict';

const Base = require('./Base');
const Image = require('./Image');

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
    this.id = data.id;

    /**
     * Role team
     * @type {?string}
     */
    this.team = data.team;

    /**
     * Role aura
     * @type {?string}
     */
    this.aura = data.aura;

    /**
     * Role name
     * @type {?string}
     */
    this.name = data.name;

    /**
     * Role description
     * @type {?string}
     */
    this.description = data.description;

    /**
     * Role image
     * @type {?Image}
     */
    this.image = data.image;

    /**
     * Role probability
     * @type {?number}
     */
    this.probability = data.probability;
  }
}

module.exports = Role;
