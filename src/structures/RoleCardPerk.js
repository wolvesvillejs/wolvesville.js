'use strict';

const Base = require('./Base');

/**
 * Represents a role card perk.
 * @extends {Base}
 */
class RoleCardPerk extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Perk id
     * @type {string}
     */
    this.id = data.id;
  }
}

module.exports = RoleCardPerk;
