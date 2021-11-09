const Base = require('./Base');
const RankedLeaderboardPlayer = require('./RankedLeaderboardPlayer');

class RankedLeaderboard extends Base {
  constructor(client, data) {
    super(client);
    this.offset = data.offset;
    this.entries = Object.keys(data.seasonPlayerRanks).map(index => {
      const player = data.seasonPlayerRanks[index];
      return new RankedLeaderboardPlayer(client, Object.assign(player, {
      	rank: parseInt(index) + 1
      }));
    });
    this.unranked = data.unranked;
  }
}

module.exports = RankedLeaderboard;
