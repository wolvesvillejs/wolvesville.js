'use strict';

const Base = require('./Base');

/**
 * Represents a ranked season winner.
 * @extends {Base}
 */
class SeasonWinner extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Player id
     * @type {string}
     */
    this.playerId = data.playerId;

    /**
     * Player name
     * @type {string}
     */
    this.playerName = data.playerName;

    /**
     * Player's equipped avatar image URL
     * @type {?string}
     */
    this.equippedAvatarURL = data.equippedAvatar?.url ?? null;
  }
}

module.exports = SeasonWinner;
