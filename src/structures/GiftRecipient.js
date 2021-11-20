const Base = require('./Base');

class GiftRecipient extends Base {
  constructor(client, data) {
    super(client, data);
    this.username = data.recipientUsername;
  }

  async fetch() {
    return this.client.players.fetchByUsername(this.username);
  }

}

module.exports = GiftRecipient;
