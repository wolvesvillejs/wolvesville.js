const XPLeaderboard = require('./XPLeaderboard');

/**
 * Represents daily xp leaderboard.
 * @extends {XPLeaderboard}
 */
class DailyXPLeaderboard extends XPLeaderboard {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = DailyXPLeaderboard;
