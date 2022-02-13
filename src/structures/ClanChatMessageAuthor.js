const Base = require('./Base');

/**
 * Clan chat message author.
 */
class ClanChatMessageAuthor extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Message author id.
     * @type {string}
     */
    this.id = data.id;
  }

  async fetch() {
    return await this.client.players.fetchById(this.id);
  }

}

module.exports = ClanChatMessageAuthor;
