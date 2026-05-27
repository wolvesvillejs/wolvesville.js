'use strict';

const Base = require('./Base');
const PlayerRank = require('./PlayerRank');

/**
 * Represents the player highscores leaderboards.
 * @extends {Base}
 */
class HighScore extends Base {
  constructor(client, data) {
    super(client);

    /**
     * All-time top players
     * @type {PlayerRank[]}
     */
    this.allTime = data.allTime.map(r => new PlayerRank(client, r));

    /**
     * Monthly top players
     * @type {PlayerRank[]}
     */
    this.monthly = data.monthly.map(r => new PlayerRank(client, r));

    /**
     * Weekly top players
     * @type {PlayerRank[]}
     */
    this.weekly = data.weekly.map(r => new PlayerRank(client, r));

    /**
     * Daily top players
     * @type {PlayerRank[]}
     */
    this.daily = data.daily.map(r => new PlayerRank(client, r));
  }
}

module.exports = HighScore;
