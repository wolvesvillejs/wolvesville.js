const XPLeaderboard = require('./XPLeaderboard');

/**
 * Monthly xp leaderboard.
 * @extends {XPLeaderboardPlayer}
 */
class MonthlyXPLeaderboard extends XPLeaderboard {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = MonthlyXPLeaderboard;
