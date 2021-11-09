const Base = require('./Base');
const XPLeaderboardPlayer = require('./XPLeaderboardPlayer');
const LifetimeXPLeaderboardPlayer = require('./LifetimeXPLeaderboardPlayer');

class XPLeaderboard extends Base {
  constructor(client, data) {
    super(client);
    this.entries = Object.keys(data.ranks).map(index => {
      const player = data.ranks[index];
      const leaderboardPlayer = this.constructor.name !== 'LifetimeXPLeaderboard' ? XPLeaderboardPlayer : LifetimeXPLeaderboardPlayer;
      return new leaderboardPlayer(client, Object.assign(player, {
      	rank: parseInt(index) + 1
      }));
    });
  }
}

module.exports = XPLeaderboard;
