'use strict';

const Base = require('./Base');
const { AvatarItemTypes, Rarities } = require('../util/Constants');

/**
 * Represents an item.
 * @extends {Base}
 */
class Item extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Item id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('imageUrl' in data) {
      /**
       * Item name
       * @type {?string}
       */
      this.name = data.imageUrl.slice(`${this.client.rest.options.cdn.items}/avatarItems/`.length, -10);
    } else {
      this.name ??= null;
    }

    if ('type' in data) {
      /**
       * Item type
       * @type {?string}
       */
      this.type = AvatarItemTypes[data.type];
    } else {
      this.type ??= null;
    }

    if ('rarity' in data) {
      /**
       * Item rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('costInGold' in data) {
      /**
       * Item cost
       * @type {?number}
       */
      this.cost = data.costInGold;
    } else {
      this.cost ??= null;
    }
  }

  /**
   * Get item image url.
   * @returns {string}
   */
  imageURL({ large = false, zoom } = {}) {
    if (!this.name) throw new Error('ITEMS_NOT_FETCHED');
    if (typeof large !== 'boolean') throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
    if (zoom && ![2, 3].includes(zoom)) throw new Error('INVALID_OPTION_VALUE');

    var url = `${this.client.rest.options.cdn.items}/avatarItems/${this.name}`;
    url += `.avatar-${large ? 'large' : 'small'}`;
    if (zoom) url += `@${zoom}x`;

    return `${url}.png`;
  }
}

module.exports = Item;
