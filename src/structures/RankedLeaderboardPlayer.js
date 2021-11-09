const LeaderboardPlayer = require('./LeaderboardPlayer');

class RankedLeaderboardPlayer extends LeaderboardPlayer {
  constructor(client, data) {
    super(client);
    this.id = data.playerId;
    this.username = data.username;
    this.skillPoints = data.skill;
    this.rank = data.rank;
  }
}

module.exports = RankedLeaderboardPlayer;
