const Base = require('./Base');

/**
 * Represents a ranked award.
 * @extends {Base}
 */
class RankedAward extends Base {
  constructor(client, data) {
    super(client);
    /**
     * Required rank.
     * @type {number}
     */
    this.requiredRank = data.lastRank;

    /**
     * Award type.
     * @type {?string}
     */
    this.type = data.itemType || null;
  }
}

module.exports = RankedAward;
