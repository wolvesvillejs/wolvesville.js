const XPLeaderboard = require('./XPLeaderboard');

/**
 * Represents a weekly xp leaderboard.
 * @extends {XPLeaderboard}
 */
class WeeklyXPLeaderboard extends XPLeaderboard {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = WeeklyXPLeaderboard;
