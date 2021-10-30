const Base = require('./Base');

class ClanQuestParticipant extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.playerId;
    this.username = data.username;
    this.xp = data.xp;
  }

  async fetch() {
    return await this.client.players.fetchById(this.id);
  }

}

module.exports = ClanQuestParticipant;
