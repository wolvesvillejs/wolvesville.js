const Base = require('./Base');

/**
 * Represents a custom game host.
 * @extends {Base}
 */
class CustomGameHost extends Base {
  constructor(client, data) {
    super(client);
    this.username = data.username;
  }

  /**
   * Fetch the host.
   * @returns {Player|ClientPlayer}
   */
  async fetch() {
    return await this.client.players.fetchByUsername(this.username);
  }

}

module.exports = CustomGameHost;
