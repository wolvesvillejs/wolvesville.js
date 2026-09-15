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
     * Card base role id
     * @type {string}
     */
    this.role = data.roleIdBase ?? data.roleId1;

    /**
     * Card advanced role ids
     * @type {string[]}
     */
    this.advancedRoles = data.roleIdsAdvanced ?? (data.roleId2 ? [data.roleId2] : []);

    /**
     * Card rarity
     * @type {string}
     */
    this.rarity = Rarities[data.rarity];

    /**
     * Card perks
     * @type {RoleCardPerk[]}
     */
    this.perks = [data.abilityId1, data.abilityId2, data.abilityId3, data.abilityId4, data.abilityId5]
      .filter(Boolean)
      .map(ability => new RoleCardPerk(client, { id: ability }));
  }
}

module.exports = RoleCard;
