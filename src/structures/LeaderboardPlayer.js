const BasePlayer = require('./BasePlayer');

/**
 * Represents a player in leaderboard.
 * @extends {Base}
 */
class LeaderboardPlayer extends BasePlayer {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = LeaderboardPlayer;
