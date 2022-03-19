const Base = require('./Base');

/**
 * Represents a base player.
 * @extends {Base}
 */
class BasePlayer extends Base {
  constructor(client) {
    super(client);
  }

  /**
   * Fetch the player.
   * @returns {Player|ClientPlayer}
   */
  async fetch() {
    if(this.id) {
      return await this.client.players.fetchById(this.id);
    } else if(this.username) {
      return await this.client.players.fetchByUsername(this.username);
    } else {
      throw new Error('PLAYER_NOT_FOUND');
    }
  }

}

module.exports = BasePlayer;
