const Base = require('./Base');
const roles = require('../resources/roles.json');

class Role extends Base {
  constructor(client, data) {
    super(client);

    const role = roles.find(role => role.id === data.id);

    this.id = role?.id;
    this.team = role?.team;
    if(role?.difficulty) this.difficulty = role.difficulty;
    if(role?.class) this.class = role.class;
  }
}

module.exports = Role;
