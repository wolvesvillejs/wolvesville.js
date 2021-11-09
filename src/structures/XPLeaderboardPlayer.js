const LeaderboardPlayer = require('./LeaderboardPlayer');

class XPLeaderboardPlayer extends LeaderboardPlayer {
  constructor(client, data) {
    super(client);
    this.id = data.playerId;
    this.username = data.username;
    this.xp = data.xp;
    this.rank = data.rank;
  }
}

module.exports = XPLeaderboardPlayer;
