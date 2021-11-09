const XPLeaderboardPlayer = require('./XPLeaderboardPlayer');

class LifetimeXPLeaderboardPlayer extends XPLeaderboardPlayer {
  constructor(client, data) {
    super(client, data);
    this.oldRank = data.oldRank + 1;
  }
}

module.exports = LifetimeXPLeaderboardPlayer;
