'use strict';

const { Collection } = require('@discordjs/collection');
const AchievedClanQuest = require('./AchievedClanQuest');
const ActiveClanQuest = require('./ActiveClanQuest');
const Clan = require('./Clan');
const ClanLedgerField = require('./ClanLedgerField');
const ClanLog = require('./ClanLog');
const ClanQuest = require('./ClanQuest');
const ClanChatMessage = require('../structures/ClanChatMessage');
const Routes = require('../util/Routes');
const { isUUID } = require('../util/Util');

/**
 * Represents a client clan.
 * @extends {Clan}
 */
class ClientClan extends Clan {
  constructor(client, data) {
    super(client, data);

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
   * Fetch active quests.
   * @returns {Promise<ActiveClanQuest>}
   */
  async fetchActiveQuest() {
    const response = await this.client.rest.get(Routes.CLANS_QUESTS_ACTIVE(this.id));
    if (response.code === 204) throw new Error('NO_ACTIVE_CLAN_QUEST');

    return new ActiveClanQuest(this.client, response);
  }

  /**
   * Fetch available quests.
   * @returns {Promise<ClanQuest[]>}
   */
  async fetchAvailableQuests() {
    const quests = await this.client.rest.get(Routes.CLANS_QUESTS_AVAILABLE(this.id));
    return quests.map(quest => new ClanQuest(this.client, quest));
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

  /**
   * Fetch quest history.
   * @returns {Promise<AchievedClanQuest[]>}
   */
  async fetchQuestHistory() {
    const response = await this.client.rest.get(Routes.CLANS_QUESTS_HISTORY(this.id));
    return response.map(quest => new AchievedClanQuest(this.client, quest));
  }

  /**
   * Suffle quests.
   */
  async shuffleQuests() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_SHUFFLE(this.id));
    if (response === 404) throw new Error('QUESTS_CANNOT_BE_SHUFFLED');
  }

  /**
   * Claim a quest.
   * @param {string} questId Quest id
   * @returns {Promise<AchievedClanQuest[]>}
   */
  async claimQuest(questId) {
    if (!questId || typeof questId !== 'string' || !isUUID(questId)) throw new Error('INVALID_QUEST_ID_FORMAT');
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_CLAIM(this.id), {
      data: {
        questId,
      },
    });
    if (response === 404) throw new Error('QUEST_CANNOT_BE_CLAIMED');
  }

  /**
   * Skip quest waiting time.
   */
  async skipQuestWaitingTime() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_ACTIVE_SKIP_WAITING_TIME(this.id));
    if (response === 404) throw new Error('QUEST_TIME_CANNOT_BE_SKIPPED');
  }

  /**
   * Claim additional time for the active quest.
   */
  async claimQuestExtraTime() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_ACTIVE_CLAIM_TIME(this.id));
    if (response === 404) throw new Error('QUEST_EXTRA_TIME_CANNOT_BE_CLAIMED');
  }

  /**
   * Cancel active quest.
   */
  async cancelActiveQuest() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_ACTIVE_CANCEL(this.id));
    if (response === 404) throw new Error('ACTIVE_QUEST_CANNOT_BE_CANCELED');
  }

  /**
   * Cancel active quest.
   */
  async fetchQuests() {
    const response = await this.client.rest.get(Routes.CLANS_QUESTS_ALL());
    return response.map(quest => new ClanQuest(this.client, quest));
  }
}

module.exports = ClientClan;
