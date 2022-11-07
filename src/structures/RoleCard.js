'use strict';

const Base = require('./Base');
const RoleCardPerk = require('./RoleCardPerk');
const { Rarities } = require('../util/Constants');

/**
 * Represents a role card.
 * @extends {Base}
 */
class RoleCard extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Card role id
     * @type {string}
     */
    this.role = data.roleId1;

    /**
     * Card advanced role id
     * @type {?string}
     */
    this.advancedRole = data.roleId2 || null;

    /**
     * Card rarity
     * @type {string}
     */
    this.rarity = Rarities[data.rarity];

    /**
     * Card perks
     * @type {RoleCardPerk[]}
     */
    this.perks = [data.abilityId1, data.abilityId2, data.abilityId3, data.abilityId4].map(
      ability => new RoleCardPerk(client, { id: ability }),
    );
  }
}

module.exports = RoleCard;
