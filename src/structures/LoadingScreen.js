'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a loading screen.
 * @extends {Base}
 */
class LoadingScreen extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Loading screen id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('image' in data) {
      /**
       * Loading screen name
       * @type {?string}
       */
      this.name = data.image.url.slice(`${this.client.rest.options.cdn.items}/loadingScreens/`.length, -10);
    } else {
      this.name ??= null;
    }

    if ('rarity' in data) {
      /**
       * Loading screen rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('imagePrimaryColor' in data) {
      /**
       * Loading screen accent color
       * @type {?string}
       */
      this.accentColor = data.imagePrimaryColor;
    } else {
      this.accentColor ??= null;
    }

    Object.defineProperty({}, '_cdn', {
      image: data.image,
      imageWide: data.imageWide,
    });
  }
}

module.exports = LoadingScreen;
