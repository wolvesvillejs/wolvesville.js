'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a profile icon border.
 * @extends {Base}
 */
class ProfileIconBorder extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Border id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('rarity' in data) {
      /**
       * Border rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('event' in data) {
      /**
       * Border event tag
       * @type {?string}
       */
      this.event = data.event ?? null;
    } else {
      this.event ??= null;
    }

    if ('imageSmall' in data) {
      /**
       * Small border image URL
       * @type {?string}
       */
      this.imageSmallURL = data.imageSmall.url;
    } else {
      this.imageSmallURL ??= null;
    }

    if ('imageLarge' in data) {
      /**
       * Large border image URL
       * @type {?string}
       */
      this.imageLargeURL = data.imageLarge.url;
    } else {
      this.imageLargeURL ??= null;
    }
  }
}

module.exports = ProfileIconBorder;
