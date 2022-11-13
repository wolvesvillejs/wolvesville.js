'use strict';

const Offer = require('./Offer');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents an advanced role card offer.
 * @extends {Offer}
 */
class AdvancedRoleCardOffer extends Offer {
  constructor(client, data) {
    super(client, data);

    /**
     * Offer role card pack
     * @type {RoleCardPack[]}
     */
    this.roleCardPack = client.items.resolve(data.advancedRoleCardOfferId, ItemTypes.ROLE_CARD_PACK);
  }
}

module.exports = AdvancedRoleCardOffer;
