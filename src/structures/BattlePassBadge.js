'use strict';

const Base = require('./Base');

/**
 * Represents a battle pass badge earned by a player.
 * @extends {Base}
 */
class BattlePassBadge extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Battle pass season number
     * @type {number}
     */
    this.seasonNumber = data.seasonNumber;

    /**
     * Reached tier
     * @type {number}
     */
    this.tier = data.tier;

    /**
     * Total tier count of the season
     * @type {number}
     */
    this.totalTiers = data.totalTiers;

    /**
     * Badge image URL
     * @type {string}
     */
    this.imageURL = data.imageUrl;
  }
}

module.exports = BattlePassBadge;
