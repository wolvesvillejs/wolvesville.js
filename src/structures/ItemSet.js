'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a limited collection.
 * @extends {Offer}
 */
class ItemSet extends Base {
  constructor(client, data) {
    super(client, data);

    /**
     * Item set id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('avatarItemIds' in data) {
      /**
       * Item set items
       * @type {AvatarItem[]}
       */
      this.items = data.avatarItemIds?.map(id => this.client.items.resolve(id, ItemTypes.AVATAR_ITEM));
    } else {
      this.items ??= null;
    }

    if ('promoImagePrimaryColor' in data) {
      /**
       * Item set accent color
       * @type {string}
       */
      this.accentColor = data.promoImagePrimaryColor;
    } else {
      this.accentColor ??= null;
    }
  }
}

module.exports = ItemSet;
