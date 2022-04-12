const Base = require('./Base');
const RoleCardPerk = require('./RoleCardPerk');

/**
 * Represents a role card.
 * @extends {Base}
 */
class RoleCard extends Base {
  constructor(client, data) {
    super(client);
    /**
     * Card id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Card role id.
     * @type {string}
     */
    this.role = data.roleId1;

    if(data.roleId2) {
      /**
       * Card advanced role id.
       * @type {string}
       */
      this.advancedRole = data.roleId2;
    }

    /**
     * Card rarity.
     * @type {string}
     */
    this.rarity = data.rarity;

    /**
     * Card perks.
     * @type {RoleCardPerk[]}
     */
    this.perks = data.allAbilities.map(ability => new RoleCardPerk(client, ability));

    /**
     * Wether card is equipped.
     * @type {boolean}
     */
    this.equipped = data.equipped;
  }
}

module.exports = RoleCard;
