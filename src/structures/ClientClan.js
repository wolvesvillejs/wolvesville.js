'use strict';

const { Collection } = require('@discordjs/collection');
const Clan = require('./Clan');
const ClanLedgerField = require('./ClanLedgerField');
const ClanLog = require('./ClanLog');
const ClanChatMessage = require('../structures/ClanChatMessage');
const Routes = require('../util/Routes');
const { isUUID } = require('../util/Util');
const ClanQuestManager = require('../managers/ClanQuestManager');

/**
 * Represents a client clan.
 * @extends {Clan}
 */
class ClientClan extends Clan {
  constructor(client, data) {
    super(client, data);

    /**
     * The quest manager of the clan
     * @type {PlayerManager}
     */
    this.quests = new ClanQuestManager(client, this);

    /**
     * Clan gold count
     * @type {number}
     */
    this.goldCount = data.gold ?? null;

    /**
     * Clan gem count
     * @type {number}
     */
    this.gemCount = data.gems ?? null;
  }

  /**
   * Activate/desactivate the member clan quests participation.
   * @param {string} memberId Member id
   * @param {boolean} participation Whether the member will participate
   * @returns {boolean}
   */
  async switchParticipation(memberId, participation) {
    if (!memberId || typeof memberId !== 'string' || !isUUID(memberId)) throw new Error('INVALID_MEMBER_ID_FORMAT');
    if (typeof participation !== 'boolean') throw new Error('PARTICIPATION_OPTION_MUST_BE_A_BOOLEAN');

    const response = await this.client.rest.put(Routes.CLANS_MEMBERS_MEMBER_PARTICIPATE_IN_QUESTS(this.id, memberId), {
      data: {
        participateInQuests: participation,
      },
    });

    if (response.code === 404) throw new Error('CLAN_MEMBER_NOT_FOUND');
    return response.participateInClanQuests;
  }

  /**
   * Fetch ledger.
   * @returns {Promise<Collection<string, ClanLedgerField>>}
   */
  async fetchLedger() {
    const response = await this.client.rest.get(Routes.CLANS_LEDGER(this.id));

    const data = response.map(field => new ClanLedgerField(this.client, field));
    return data.reduce((col, field) => col.set(field.id, field), new Collection());
  }

  /**
   * Fetch log.
   * @returns {Promise<ClanLog[]>}
   */
  async fetchLog() {
    const response = await this.client.rest.get(Routes.CLANS_LOGS(this.id));
    return response.map(log => new ClanLog(this.client, log));
  }

  /**
   * Fetch chat messages.
   * @param {number} timestamp Timestamp of messages around
   * @returns {Promise<ClanChatMessage[]>}
   */
  async fetchChatMessages(timestamp) {
    if (timestamp) {
      const date = new Date(timestamp);
      if (isNaN(timestamp) || timestamp !== date.getTime()) throw new Error('INVALID_TIMESTAMP');
      timestamp = date.toISOString();
    }

    const response = await this.client.rest.get(Routes.CLANS_CHAT(this.id), { query: { oldest: timestamp } });
    return response.map(message => new ClanChatMessage(this.client, message));
  }

  /**
   * Send chat message.
   * @param {string} content Message content
   */
  async sendMessage(content) {
    if (typeof content !== 'string') throw new Error('MESSAGE_CONTENT_MUST_BE_A_STRING');
    await this.client.rest.post(Routes.CLANS_CHAT(this.id), {
      data: {
        message: content,
      },
    });
  }
}

module.exports = ClientClan;
