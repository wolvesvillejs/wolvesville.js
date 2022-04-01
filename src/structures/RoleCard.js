const Base = require('./Base');
const RoleCardAbility = require('./RoleCardAbility');

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
     * Card abilities.
     * @type {RoleCardAbility[]}
     */
    this.abilities = data.allAbilities.map(ability => new RoleCardAbility(client, ability));

    /**
     * Wether card is equipped.
     * @type {boolean}
     */
    this.equipped = data.equipped;
  }
}

module.exports = RoleCard;
