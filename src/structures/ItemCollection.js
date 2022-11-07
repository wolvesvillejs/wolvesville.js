'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a limited collection.
 * @extends {Offer}
 */
class ItemCollection extends Base {
  constructor(client, data) {
    super(client, data);

    /**
     * Collection id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('promoImageUrl' in data) {
      /**
       * Collection name
       * @type {string}
       */
      this.name = data.promoImageUrl.slice(`${this.client.rest.options.cdn.items}/promos/`.length, -4);
    } else {
      this.name ??= null;
    }

    if ('avatarItemIds' in data) {
      /**
       * Collection items
       * @type {AvatarItem[]}
       */
      this.items = data.avatarItemIds?.map(id => this.client.items.resolve(id, ItemTypes.AVATAR_ITEM));
    } else {
      this.items ??= null;
    }

    if ('bonusLoadingScreenId' in data) {
      /**
       * Bonus item
       * @type {LoadingScreen}
       */
      this.bonus = this.client.items.resolve(data.bonusLoadingScreenId, ItemTypes.LOADING_SCREEN);
    } else {
      this.bonus ??= null;
    }

    if ('bonusMinItemCount' in data) {
      /**
       * Bonus minimum item count
       * @type {number}
       */
      this.bonusRequirement = data.bonusMinItemCount;
    } else {
      this.bonusRequirement ??= null;
    }

    if ('promoImagePrimaryColor' in data) {
      /**
       * Collection accent color
       * @type {string}
       */
      this.accentColor = data.promoImagePrimaryColor;
    } else {
      this.accentColor ??= null;
    }

    if ('promoImageUrl' in data && 'iconUrl' in data) {
      Object.defineProperty(this, '_cdn', {
        imageURL: data.promoImageUrl,
        iconURL: data.iconUrl,
      });
    }
  }
}

module.exports = ItemCollection;
