const Base = require('./Base');

/**
 * Represents a gift sender.
 * @extends {Base}
 */
class GiftSender extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Sender username.
     * @type {string}
     */
    this.username = data.senderUsername;
  }

  /**
   * Fetch the sender.
   * @returns {Player}
   */
  async fetch() {
    return this.client.players.fetchByUsername(this.username);
  }

}

module.exports = GiftSender;
