'use strict';

const Base = require('./Base');
const Role = require('./Role');

/**
 * Represents a role rotation.
 * @extends {Base}
 */
class RoleRotation extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Role rotation id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Role rotation roles.
     * @type {Array<Role|Array<Role>>}
     */
    this.roles = data.roles.map(roles =>
      roles.map(item =>
        item.role
          ? new Role(client, { id: item.role, probability: item.probability })
          : item.roles.map(role => new Role(client, { id: role, probability: item.probability })),
      ),
    );
  }
}

module.exports = RoleRotation;
