const Base = require('./Base');

class LeaderboardPlayer extends Base {
  constructor(client, data) {
    super(client);
  }

  async fetch() {
    return this.client.players.fetchById(this.id);
  }

}

module.exports = LeaderboardPlayer;
