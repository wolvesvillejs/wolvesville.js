'use strict';

const Base = require('./Base');

/**
 * Represents a player entry in the ranked leaderboard.
 * @extends {Base}
 */
class RankedLeaderboardPlayer extends Base {
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
     * Player skill points
     * @type {number}
     */
    this.skill = data.skill;
  }
}

module.exports = RankedLeaderboardPlayer;
