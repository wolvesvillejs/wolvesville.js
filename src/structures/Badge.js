'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a badge.
 * @extends {Base}
 */
class Badge extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Badge id
     * @type {string}
     */
    this.id = data.badgeId;

    /**
     * Badge name
     * @type {string}
     */
    this.name = data.name;

    /**
     * Badge description
     * @type {?string}
     */
    this.description = data.description ?? null;

    /**
     * Badge rarity
     * @type {string}
     */
    this.rarity = Rarities[data.rarity] ?? data.rarity;

    /**
     * Badge image URL
     * @type {string}
     */
    this.imageURL = data.imageUrl;
  }
}

module.exports = Badge;
