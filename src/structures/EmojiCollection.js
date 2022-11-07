'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a limited collection.
 * @extends {Offer}
 */
class EmojiCollection extends Base {
  constructor(client, data) {
    super(client, data);

    /**
     * Collection id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Collection name
     * @type {string}
     */
    this.name = data.promoImageUrl.slice(`${this.client.rest.options.cdn.items}/promos/`.length, -4);

    /**
     * Collection emojis
     * @type {AvatarItem[]}
     */
    this.emojis = data.emojiIds?.map(id => client.items.resolve(id, ItemTypes.EMOJI));

    this.bonus = client.items.resolve(data.bonusLoadingScreenId, ItemTypes.LOADING_SCREEN);

    /**
     * Bonus minimum item count
     * @type {number}
     */
    this.bonusRequirement = data.bonusMinItemCount;

    /**
     * Collection accent color
     * @type {string}
     */
    this.accentColor = data.promoImagePrimaryColor;

    Object.defineProperty(this, '_cdn', {
      imageURL: data.promoImageUrl,
      iconURL: data.iconUrl,
    });
  }
}

module.exports = EmojiCollection;
