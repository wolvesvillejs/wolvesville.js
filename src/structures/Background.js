'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a background.
 * @extends {Base}
 */
class Background extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Background id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('imageDay' in data) {
      /**
       * Background name
       * @type {?string}
       */
      this.name = data.imageDay.url.slice(`${this.client.rest.options.cdn.items}/backgrounds/`.length, -14);
    } else {
      this.name ??= null;
    }

    if ('rarity' in data) {
      /**
       * Background rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('backgroundColorDay' in data) {
      /**
       * Background day color
       * @type {?string}
       */
      this.dayColor = data.backgroundColorDay;
    } else {
      this.dayColor ??= null;
    }

    if ('backgroundColorNight' in data) {
      /**
       * Background night color
       * @type {?string}
       */
      this.nightColor = data.backgroundColorNight;
    } else {
      this.nightColor ??= null;
    }

    Object.defineProperty(this, '_cdn', {
      imageDay: data.imageDay,
      imageDayWide: data.imageDayWide,
      imageNight: data.imageNight,
      imageNightWide: data.imageNightWide,
      imageDaySmall: data.imageDaySmall,
      imageNightSmall: data.imageNightSmall,
    });
  }
}

module.exports = Background;
