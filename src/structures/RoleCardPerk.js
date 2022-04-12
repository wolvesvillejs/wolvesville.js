const Base = require('./Base');

/**
 * Represents a role card perk.
 * @extends {Base}
 */
class RoleCardPerk extends Base {
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

    if(data.effectValue !== -1) {
      /**
       * Ability efficiency.
       * @type {number}
       */
      this.efficiency = data.effectValue;
    }
  }
}

module.exports = RoleCardPerk;
