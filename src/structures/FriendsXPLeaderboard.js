const XPLeaderboard = require('./XPLeaderboard');

/**
 * Represents a friends xp leaderboard.
 * @extends {XPLeaderboard}
 */
class FriendsXPLeaderboard extends XPLeaderboard {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = FriendsXPLeaderboard;
