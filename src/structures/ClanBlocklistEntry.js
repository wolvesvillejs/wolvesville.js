'use strict';

const Base = require('./Base');

/**
 * Represents a clan blocklist entry.
 * @extends {Base}
 */
class ClanBlocklistEntry extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Blocked player id
     * @type {string}
     */
    this.playerId = data.playerId;

    /**
     * Blocked player username
     * @type {string}
     */
    this.username = data.playerUsername;

    /**
     * Timestamp when the player was blocked
     * @type {number}
     */
    this.createdTimestamp = new Date(data.creationTime).getTime();
  }
}

module.exports = ClanBlocklistEntry;
