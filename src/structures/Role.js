const Base = require('./Base');
const roles = require('../resources/roles.json');

/**
 * Represents a role.
 * @extends {Base}
 */
class Role extends Base {
  constructor(client, data) {
    super(client);

    const role = roles.find(role => role.id === data.id);
    if(!role) return;

    /**
     * Role id.
     */
    this.id = role.id;

    /**
     * Role team.
     */
    this.team = role.team;

    if(role.difficulty) {
      /**
       * Role difficulty.
       */
      this.difficulty = role.difficulty;
    }

    if(role.class) {
      /**
       * Role class.
       */
      this.class = role.class;
    }
  }
}

module.exports = Role;
