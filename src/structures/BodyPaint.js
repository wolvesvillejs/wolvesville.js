'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a body paint item.
 * @extends {Base}
 */
class BodyPaint extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Body paint id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('imageUrl' in data) {
      /**
       * Body paint image URL
       * @type {?string}
       */
      this.imageURL = data.imageUrl;
    } else {
      this.imageURL ??= null;
    }

    if ('rarity' in data) {
      /**
       * Body paint rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('event' in data) {
      /**
       * Body paint event tag
       * @type {?string}
       */
      this.event = data.event ?? null;
    } else {
      this.event ??= null;
    }
  }
}

module.exports = BodyPaint;
