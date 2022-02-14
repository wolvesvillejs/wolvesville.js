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
    this.id = data[0].roleRotation.id;

    /**
     * Role rotation roles.
     * @type {Array<Role>}
     */
    this.roles = data[0].roleRotation.roles.map(entry => new Role(this.client, { id: entry[0].role }));

    /**
     * Role rotation probability.
     * @type {number}
     */
    this.probability = data[0].probability;
  }
}

module.exports = RoleRotation;
