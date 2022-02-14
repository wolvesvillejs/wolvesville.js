const LeaderboardPlayer = require('./LeaderboardPlayer');

class XPLeaderboardPlayer extends LeaderboardPlayer {
  constructor(client, data) {
    super(client);

    /**
     * Player id.
     * @type {string}
     */
    this.id = data.playerId;

    /**
     * Player username.
     * @type {string}
     */
    this.username = data.username;

    /**
     * Player leaderboard xp.
     * @type {number}
     */
    this.xp = data.xp;

    /**
     * Player leaderboard rank.
     * @type {number}
     */
    this.rank = data.rank;
  }
}

module.exports = XPLeaderboardPlayer;
