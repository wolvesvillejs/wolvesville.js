const Base = require('./Base');

/**
 * Represents a role card ability.
 * @extends {Base}
 */
class RoleCardAbility extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Ability id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Ability tier.
     * @type {number}
     */
    this.tier = data.tier;

    /**
     * Ability efficiency.
     * @type {number}
     */
    this.efficiency = data.effectValue;
  }
}

module.exports = RoleCardAbility;
