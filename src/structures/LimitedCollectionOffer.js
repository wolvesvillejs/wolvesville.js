'use strict';

const Offer = require('./Offer');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a limited collection offer.
 * @extends {Offer}
 */
class LimitedCollectionOffer extends Offer {
  constructor(client, data) {
    super(client, data);

    /**
     * Offer item set
     * @type {ItemSet[]}
     */
    this.itemSets = data.avatarItemSetIds.map(avatarItemSetId =>
      client.items.resolve(avatarItemSetId, ItemTypes.ITEM_SET),
    );

    /**
     * Offer image URL
     * @type {string}
     */    
    this.imageURL = data.promoImageUrl;
  }
}

module.exports = LimitedCollectionOffer;
