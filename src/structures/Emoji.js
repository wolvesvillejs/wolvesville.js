'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents an emoji.
 * @extends {Base}
 */
class Emoji extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Emoji id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('name' in data) {
      /**
       * Emoji name
       * @type {?string}
       */
      this.name = data.name;
    } else {
      this.name ??= null;
    }

    if ('rarity' in data) {
      /**
       * Emoji rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('event' in data) {
      /**
       * Emoji event
       * @type {?string}
       */
      this.event = data.event;
    } else {
      this.event ??= null;
    }

    Object.defineProperty(this, '_cdn', {
      animationURL: data.urlAnimation,
      previewURL: data.urlPreview,
    });
  }
}

module.exports = Emoji;
