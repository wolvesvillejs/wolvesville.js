const XPLeaderboardPlayer = require('./XPLeaderboardPlayer');

/**
 * Lifetime xp leaderboard player.
 * @extends {XPLeaderboardPlayer}
 */
class LifetimeXPLeaderboardPlayer extends XPLeaderboardPlayer {
  constructor(client, data) {
    super(client, data);

    /**
     * Old player rank in leaderboard.
     * @type {number}
     */
    this.oldRank = data.oldRank;
  }
}

module.exports = LifetimeXPLeaderboardPlayer;
