const Base = require('./Base');
const RankedLeaderboardPlayer = require('./RankedLeaderboardPlayer');
const { Collection } = require('@discordjs/collection');

/**
 * Represents a ranked leaderboard.
 * @extends {Base}
 */
class RankedLeaderboard extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Leadeboard offset.
     * @type {number}
     */
    this.offset = data.offset;

    /**
     * Ranked leadeboard.
     * @type {number}
     */
    this.entries = new Collection();

    for (const index in Object.keys(data.seasonPlayerRanks)) {
      const player = data.seasonPlayerRanks[index];
      this.entries.set(
        index,
        new RankedLeaderboardPlayer(client, Object.assign(player, {
          rank: parseInt(index)
        }))
      )
    }

    this.unranked = data.unranked;
  }
}

module.exports = RankedLeaderboard;
