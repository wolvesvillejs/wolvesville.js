'use strict';

const Offer = require('./Offer');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a limited offer.
 * @extends {Offer}
 */
class LimitedOffer extends Offer {
  constructor(client, data) {
    super(client, data);

    /**
     * Offer item set
     * @type {ItemSet}
     */
    this.itemSet = client.items.resolve(data.avatarItemSetIds[0], ItemTypes.ITEM_SET);

    Object.defineProperty(this, '_cdn', {
      imageURL: data.promoImageUrl,
    });
  }
}

module.exports = LimitedOffer;
