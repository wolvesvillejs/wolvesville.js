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
     * First role id.
     * @type {string}
     */
    this.roleId1 = data.roleId1;

    /**
     * First ability id.
     * @type {string}
     */
    this.abilityId1 = data.abilityId1;

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
