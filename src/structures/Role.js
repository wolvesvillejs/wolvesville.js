'use strict';

const Base = require('./Base');

/**
 * Represents a role.
 * <info>Roles inside a {@link RoleRotation} are partial and only carry an id and a probability;
 * all other properties are always defined when fetched via {@link RoleManager#fetch}.</info>
 * @extends {Base}
 */
class Role extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Role id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Role team
     * @type {?string}
     */
    this.team = data.team ?? null;

    /**
     * Role aura
     * @type {?string}
     */
    this.aura = data.aura ?? null;

    /**
     * Role name
     * @type {?string}
     */
    this.name = data.name ?? null;

    /**
     * Role description
     * @type {?string}
     */
    this.description = data.description ?? null;

    /**
     * Role image
     * @type {?Image}
     */
    this.image = data.image ?? null;

    /**
     * Event the role belongs to
     * @type {?string}
     */
    this.eventId = data.eventId ?? null;

    /**
     * Role probability
     * @type {?number}
     */
    this.probability = data.probability ?? null;
  }
}

module.exports = Role;
