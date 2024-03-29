'use strict';

const Base = require('./Base');
const Player = require('./Player');
const { ItemTypes, ClanLedgerActions } = require('../util/Constants');

/**
 * Represents a clan ledger field.
 * @extends {Base}
 */
class ClanLedgerField extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Field id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Field type
     * @type {string}
     */
    this.type = data.gold ? ItemTypes.GOLD : ItemTypes.GEM;

    /**
     * Field amount
     * @type {number}
     */
    this.amount = data.gold || data.gems;

    /**
     * Field action
     * @type {string}
     */
    this.action = ClanLedgerActions[data.type];

    /**
     * Field creation timestamp
     * @type {Player}
     */
    this.player = new Player(client, Object.defineProperty(data, 'username', { value: data.playerUsername }));

    /**
     * Field created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.creationTime).getTime();
  }
}

module.exports = ClanLedgerField;
