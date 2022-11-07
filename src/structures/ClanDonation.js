'use strict';

const Base = require('./Base');
const ClanHistoryPlayer = require('./ClanHistoryPlayer');

/**
 * Represents a clan donation.
 * @extends {Base}
 */
class ClanDonation extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Gold amount
     * @type {number}
     */
    this.goldCount = data.gold;

    /**
     * Gem amount
     * @type {number}
     */
    this.gemCount = data.gems;

    /**
     * The player who made the donation
     * @type {ClanHistoryPlayer}
     */
    this.player = new ClanHistoryPlayer(client, data);
  }
}

module.exports = ClanDonation;
