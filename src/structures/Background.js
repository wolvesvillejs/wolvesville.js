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

    if ('imageDay' in data) {
      /**
       * Background day image URL
       * @type {?string}
       */
      this.dayImageURL = data.imageDay;
    } else {
      this.dayImageURL ??= null;
    }

    if ('imageDayWide' in data) {
      /**
       * Background wide day image URL
       * @type {?string}
       */
      this.wideDayImageURL = data.imageDayWide;
    } else {
      this.wideDayImageURL ??= null;
    }

    if ('imageNight' in data) {
      /**
       * Background night image URL
       * @type {?string}
       */
      this.nightImageURL = data.imageNight;
    } else {
      this.nightImageURL ??= null;
    }

    if ('imageNightWide' in data) {
      /**
       * Background wide night image URL
       * @type {?string}
       */
      this.wideNightImageURL = data.imageNightWide;
    } else {
      this.wideNightImageURL ??= null;
    }

    if ('imageDaySmall' in data) {
      /**
       * Background small day image URL
       * @type {?string}
       */
      this.smallDayImageURL = data.imageDaySmall;
    } else {
      this.smallDayImageURL ??= null;
    }

    if ('imageNightSmall' in data) {
      /**
       * Background small night image URL
       * @type {?string}
       */
      this.smallNightImageURL = data.imageNightSmall;
    } else {
      this.smallNightImageURL ??= null;
    }
  }
}

module.exports = Background;
