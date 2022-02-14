const Base = require('./Base');

/**
 * Leaderboard player.
 * @extends {Base}
 */
class LeaderboardPlayer extends Base {
  constructor(client, data) {
    super(client);
  }

  /**
   * Fetch the player.
   * @returns {Player|ClientPlayer}
   */
  async fetch() {
    return this.client.players.fetchById(this.id);
  }

}

module.exports = LeaderboardPlayer;
