const Base = require('./Base');

/**
 * Represents a gift recipient.
 * @extends {Base}
 */
class GiftRecipient extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Recipient username.
     * @type {string}
     */
    this.username = data.recipientUsername;
  }

  /**
   * Fetch the recipient.
   * @returns {Player}
   */
  async fetch() {
    return this.client.players.fetchByUsername(this.username);
  }

}

module.exports = GiftRecipient;
