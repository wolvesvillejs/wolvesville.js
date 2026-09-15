'use strict';

const Base = require('./Base');

/**
 * Represents a moonlight offer.
 * @extends {Base}
 */
class Moonlight extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Moonlight start timestamp
     * @type {number}
     */
    this.startTimestamp = new Date(data.startTime).getTime();

    /**
     * Moonlight image URL
     * @type {string}
     */
    this.imageURL = data.imageUrl;

    /**
     * Moonlight accent color
     * @type {string}
     */
    this.accentColor = data.imagePrimaryColor;

    /**
     * Profile icon border ids
     * @type {string[]}
     */
    this.profileIconBorderIds = data.profileIconBorderIds;

    /**
     * Avatar item ids
     * @type {string[]}
     */
    this.avatarItemIds = data.avatarItemIds;

    /**
     * Body paint ids
     * @type {string[]}
     */
    this.bodyPaintIds = data.bodyPaintIds;
  }
}

module.exports = Moonlight;
