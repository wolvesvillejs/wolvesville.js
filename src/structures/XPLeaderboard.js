const Base = require('./Base');
const XPLeaderboardPlayer = require('./XPLeaderboardPlayer');
const LifetimeXPLeaderboardPlayer = require('./LifetimeXPLeaderboardPlayer');
const { Collection } = require('@discordjs/collection');

/**
 * Represents an xp leaderboard.
 * @extends {Base}
 */
class XPLeaderboard extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Xp leadeboard.
     * @type {number}
     */
    this.entries = new Collection();

    for (const index in Object.keys(data.ranks)) {
      const player = data.ranks[index];
      const leaderboardPlayer = this.constructor.name !== 'LifetimeXPLeaderboard' ? XPLeaderboardPlayer : LifetimeXPLeaderboardPlayer;
      this.entries.set(
        index,
        new leaderboardPlayer(client, Object.assign(player, {
          rank: parseInt(index)
        }))
      )
    }
  }
}

module.exports = XPLeaderboard;
