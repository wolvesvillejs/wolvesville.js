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
     * Player at the origin of the transaction
     * @type {?Player}
     */
    this.player = data.playerId ? new Player(client, { id: data.playerId, username: data.playerUsername }) : null;

    /**
     * Bot id at the origin of the transaction
     * @type {?string}
     */
    this.playerBotId = data.playerBotId ?? null;

    /**
     * Username of the bot owner
     * @type {?string}
     */
    this.playerBotOwnerUsername = data.playerBotOwnerUsername ?? null;

    /**
     * Field created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.creationTime).getTime();

    /**
     * Associated clan quest id (if action is CLAN_QUEST)
     * @type {?string}
     */
    this.clanQuestId = data.clanQuestId ?? null;

    /**
     * Field comment
     * @type {?string}
     */
    this.comment = data.comment ?? null;
  }
}

module.exports = ClanLedgerField;
