const XPLeaderboard = require('./XPLeaderboard');

class LifetimeXPLeaderboard extends XPLeaderboard {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = LifetimeXPLeaderboard;
