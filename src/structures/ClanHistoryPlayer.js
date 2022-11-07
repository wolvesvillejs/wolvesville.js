'use strict';

const BasePlayer = require('./BasePlayer');

/**
 * Represents a clan history player.
 * @extends {BasePlayer}
 */
class ClanHistoryPlayer extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Player id
     * @type {string}
     */
    this.id = data.playerId;
  }
}

module.exports = ClanHistoryPlayer;
