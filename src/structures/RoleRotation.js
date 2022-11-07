'use strict';

const Base = require('./Base');
const Role = require('./Role');

class RoleRotation extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.id;

    this.roles = data.roles.map(roles =>
      roles.map(item =>
        item.role
          ? new Role(client, { name: item.role, probability: item.probability })
          : item.roles.map(role => new Role(client, { name: role, probability: item.probability })),
      ),
    );
  }
}

module.exports = RoleRotation;
