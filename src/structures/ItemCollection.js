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
       * Bonus loading screen
       * @type {?LoadingScreen}
       */
      this.bonusLoadingScreen = this.client.items.resolve(data.bonusLoadingScreenId, ItemTypes.LOADING_SCREEN);
    } else {
      this.bonusLoadingScreen ??= null;
    }

    if ('bonusAvatarItemIds' in data) {
      /**
       * Bonus avatar items
       * @type {?Item[]}
       */
      this.bonusAvatarItems = data.bonusAvatarItemIds?.map(id => this.client.items.resolve(id, ItemTypes.AVATAR_ITEM));
    } else {
      this.bonusAvatarItems ??= null;
    }

    if ('bonusEmojiIds' in data) {
      /**
       * Bonus emojis
       * @type {?Emoji[]}
       */
      this.bonusEmojis = data.bonusEmojiIds?.map(id => this.client.items.resolve(id, ItemTypes.EMOJI));
    } else {
      this.bonusEmojis ??= null;
    }

    if ('bonusBackgroundIds' in data) {
      /**
       * Bonus backgrounds
       * @type {?Background[]}
       */
      this.bonusBackgrounds = data.bonusBackgroundIds?.map(id => this.client.items.resolve(id, ItemTypes.BACKGROUND));
    } else {
      this.bonusBackgrounds ??= null;
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

    if ('promoImageUrl' in data) {
      /**
       * Collection image URL
       * @type {string}
       */
      this.imageURL = data.promoImageUrl;
    } else {
      this.imageURL ??= null;
    }

    if ('iconUrl' in data) {
      /**
       * Collection icon URL
       * @type {string}
       */
      this.iconURL = data.iconUrl;
    } else {
      this.iconURL ??= null;
    }
  }
}

module.exports = ItemCollection;
