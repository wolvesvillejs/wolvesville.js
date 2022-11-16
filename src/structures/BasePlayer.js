'use strict';

const Base = require('./Base');

/**
 * Represents a base player.
 * @extends {Base}
 */
class BasePlayer extends Base {
  /**
   * Fetch the player.
   * @returns {Player}
   */
  fetch() {
    return this.client.players.fetch(this);
  }
}

module.exports = BasePlayer;
