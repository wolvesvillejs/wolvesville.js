const XPLeaderboard = require('./XPLeaderboard');

/**
 * Lifetime xp leaderboard.
 * @extends {XPLeaderboard}
 */
class LifetimeXPLeaderboard extends XPLeaderboard {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = LifetimeXPLeaderboard;
