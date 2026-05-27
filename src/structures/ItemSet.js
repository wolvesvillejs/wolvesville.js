'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents an item set.
 * @extends {Base}
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

    if ('promoImageUrl' in data) {
      this.imageURL = data.promoImageUrl;
    } else {
      this.imageURL ??= null;
    }

    if ('loadingScreenId' in data) {
      /**
       * Item set loading screen id
       * @type {?string}
       */
      this.loadingScreenId = data.loadingScreenId ?? null;
    } else {
      this.loadingScreenId ??= null;
    }

    if ('backgroundId' in data) {
      /**
       * Item set background id
       * @type {?string}
       */
      this.backgroundId = data.backgroundId ?? null;
    } else {
      this.backgroundId ??= null;
    }
  }
}

module.exports = ItemSet;
