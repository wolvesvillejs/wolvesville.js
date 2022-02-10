const Base = require('./Base');

class CustomGameHost extends Base {
  constructor(client, data) {
    super(client);
    this.username = data.username;
  }

  async fetch() {
    return await this.client.players.fetchByUsername(this.username);
  }

}

module.exports = CustomGameHost;
