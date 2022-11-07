'use strict';

const Offer = require('./Offer');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a limited item collection offer.
 * @extends {Offer}
 */
class LimitedItemCollectionOffer extends Offer {
  constructor(client, data) {
    super(client, data);

    /**
     * Offer item colection
     * @type {AvatarItem[]}
     */
    this.itemCollection = client.items.resolve(data.avatarItemsCollectionId, ItemTypes.ITEM_COLLECTION);
  }
}

module.exports = LimitedItemCollectionOffer;
