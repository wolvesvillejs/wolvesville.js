'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a profile icon.
 * @extends {Base}
 */
class ProfileIcon extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Profile icon id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('name' in data) {
      /**
       * Profile icon name
       * @type {?string}
       */
      this.name = data.name.split(':')[1];
    } else {
      this.name ??= null;
    }

    if ('rarity' in data) {
      /**
       * Profile icon rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('costInGold' in data) {
      /**
       * Profile icon cost in gold
       * @type {?number}
       */
      this.costInGold = data.costInGold;
    } else {
      this.costInGold ??= null;
    }

    if ('costInRoses' in data) {
      /**
       * Profile icon cost in roses
       * @type {?number}
       */
      this.costInRoses = data.costInRoses;
    } else {
      this.costInRoses ??= null;
    }
  }
}

module.exports = ProfileIcon;
