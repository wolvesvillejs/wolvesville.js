'use strict';

const Base = require('./Base');
const { ClanActions } = require('../util/Constants');
const Player = require('./Player');

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
     * @type {Player}
     */
    this.executor = new Player(client, {
      id: data.playerId,
      username: data.playerUsername,
    });

    /**
     * Log target player
     * @type {Player}
     */
    this.target = data.targetPlayerId
      ? new Player(client, {
          id: data.targetPlayerId,
          username: data.targetPlayerUsername,
        })
      : this.executor;

    /**
     * Log created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.creationTime).getTime();

    /**
     * Log comment
     * @type {?string}
     */
    this.comment = data.comment ?? null;
  }
}

module.exports = ClanLog;
