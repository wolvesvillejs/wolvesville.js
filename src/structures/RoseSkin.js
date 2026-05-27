'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a rose skin.
 * @extends {Base}
 */
class RoseSkin extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Rose skin id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('singleImageUrl' in data) {
      /**
       * Single rose image URL
       * @type {?string}
       */
      this.singleImageURL = data.singleImageUrl;
    } else {
      this.singleImageURL ??= null;
    }

    if ('bouquetImageUrl' in data) {
      /**
       * Bouquet image URL
       * @type {?string}
       */
      this.bouquetImageURL = data.bouquetImageUrl;
    } else {
      this.bouquetImageURL ??= null;
    }

    if ('rarity' in data) {
      /**
       * Rose skin rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('event' in data) {
      /**
       * Rose skin event tag
       * @type {?string}
       */
      this.event = data.event ?? null;
    } else {
      this.event ??= null;
    }

    if ('costInGold' in data) {
      /**
       * Rose skin cost in gold
       * @type {?number}
       */
      this.costInGold = data.costInGold ?? null;
    } else {
      this.costInGold ??= null;
    }

    if ('costInRoses' in data) {
      /**
       * Rose skin cost in roses
       * @type {?number}
       */
      this.costInRoses = data.costInRoses ?? null;
    } else {
      this.costInRoses ??= null;
    }
  }
}

module.exports = RoseSkin;
