'use strict';

const Base = require('./Base');

/**
 * Represents a base player.
 * @extends {Base}
 */
class BasePlayer extends Base {
  /**
   * Fetch the player.
   * @param {boolean} force Whether force fetching
   * @returns {Player}
   */
  fetch(force = true) {
    return this.client.players.fetch(this, { force });
  }
}

module.exports = BasePlayer;
