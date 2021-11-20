const Base = require('./Base');

class GiftSender extends Base {
  constructor(client, data) {
    super(client, data);
    this.username = data.senderUsername;
  }

  async fetch() {
    return this.client.players.fetchByUsername(this.username);
  }

}

module.exports = GiftSender;
