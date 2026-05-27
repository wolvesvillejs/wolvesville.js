'use strict';

const Base = require('./Base');

/**
 * Represents a player's rank entry on a leaderboard.
 * @extends {Base}
 */
class PlayerRank extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Player id
     * @type {string}
     */
    this.playerId = data.playerId;

    /**
     * Player username
     * @type {string}
     */
    this.username = data.username;

    /**
     * Player XP
     * @type {number}
     */
    this.xp = data.xp;

    /**
     * Player's previous rank
     * @type {number}
     */
    this.oldRank = data.oldRank;
  }
}

module.exports = PlayerRank;
