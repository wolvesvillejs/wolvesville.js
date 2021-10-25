const Base = require('./Base');
const Role = require('./Role');

class RoleRotation extends Base {
  constructor(client, data) {
    super(client);
    this.id = data[0].roleRotation.id;
    this.roles = data[0].roleRotation.roles.map(entry => new Role(this.client, { id: entry[0].role }));
    this.probability = data[0].probability;
  }
}

module.exports = RoleRotation;
