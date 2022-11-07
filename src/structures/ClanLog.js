'use strict';

const Base = require('./Base');
const ClanLogPlayer = require('./ClanLogPlayer');
const { ClanActions } = require('../util/Constants');

/**
 * Represents a clan log.
 * @extends {Base}
 */
class ClanLog extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Log action
     * @type {string}
     */
    this.action = ClanActions[data.action];

    /**
     * Log executor
     * @type {string}
     */
    this.executor = new ClanLogPlayer(client, {
      id: data.playerId,
      username: data.playerUsername,
    });

    /**
     * Log target player
     * @type {ClanLogPlayer}
     */
    this.target = data.targetPlayerId
      ? new ClanLogPlayer(client, {
          id: data.targetPlayerId,
          username: data.targetPlayerUsername,
        })
      : this.executor;

    /**
     * Log created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.creationTime).getTime();

    this.comment = data.comment ?? null;
  }
}

module.exports = ClanLog;
