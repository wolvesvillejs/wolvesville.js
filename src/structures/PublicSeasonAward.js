'use strict';

const Base = require('./Base');

/**
 * Represents a ranked season award tier.
 * @extends {Base}
 */
class PublicSeasonAward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Minimum rank to receive this award
     * @type {?number}
     */
    this.firstRank = data.firstRank ?? null;

    /**
     * Maximum rank to receive this award
     * @type {?number}
     */
    this.lastRank = data.lastRank ?? null;

    /**
     * Gold amount awarded
     * @type {?number}
     */
    this.gold = data.gold ?? null;

    /**
     * Item type awarded
     * @type {?string}
     */
    this.itemType = data.itemType ?? null;
  }
}

module.exports = PublicSeasonAward;
