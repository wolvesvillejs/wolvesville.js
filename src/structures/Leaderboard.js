'use strict';

const Base = require('./Base');
const RankedLeaderboardPlayer = require('./RankedLeaderboardPlayer');

/**
 * Represents the ranked leaderboard.
 * @extends {Base}
 */
class Leaderboard extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Top ranked players
     * @type {RankedLeaderboardPlayer[]}
     */
    this.ranksTop = data.ranksTop.map(p => new RankedLeaderboardPlayer(client, p));

    /**
     * The requesting player's rank entries
     * @type {RankedLeaderboardPlayer[]}
     */
    this.ranksPlayer = data.ranksPlayer.map(p => new RankedLeaderboardPlayer(client, p));
  }
}

module.exports = Leaderboard;
