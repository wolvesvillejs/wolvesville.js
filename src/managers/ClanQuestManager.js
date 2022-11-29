'use strict';

const { Collection } = require('@discordjs/collection');
const CacheManager = require('./CacheManager');
const AchievedClanQuest = require('../structures/AchievedClanQuest');
const ActiveClanQuest = require('../structures/ActiveClanQuest');
const AvailableClanQuest = require('../structures/AvailableClanQuest');
const Routes = require('../util/Routes');
const { isUUID } = require('../util/Util');

/**
 * Manages API methods for clan quests.
 * @extends {CacheManager}
 */
class ClanQuestManager extends CacheManager {
  constructor(client, data) {
    super(client);

    Object.defineProperty(this, 'clan', { value: data });
  }

  /**
   * Fetch available quests.
   * @returns {Promise<AvailableClanQuest[]>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.CLANS_QUESTS_AVAILABLE(this.clan.id));

    const data = response.map(item => new AvailableClanQuest(this.client, item, this.clan));
    return data.reduce((col, item) => col.set(item.id, this._add(item)), new Collection());
  }

  /**
   * Fetch active quests.
   * @returns {Promise<ActiveClanQuest>}
   */
  async fetchActive() {
    const response = await this.client.rest.get(Routes.CLANS_QUESTS_ACTIVE(this.clan.id));
    if (response.code === 204) throw new Error('NO_ACTIVE_CLAN_QUEST');

    return new ActiveClanQuest(this.client, response, this.clan);
  }

  /**
   * Fetch achieved quests.
   * @returns {Promise<AchievedClanQuest[]>}
   */
  async fetchHistory() {
    const response = await this.client.rest.get(Routes.CLANS_QUESTS_HISTORY(this.clan.id));
    return response.map(quest => new AchievedClanQuest(this.client, quest));
  }

  /**
   * Claim a quest.
   * <warn>Using this method will spend clan gold/gems!</warn>
   * @param {string} questId Quest id
   * @returns {void}
   */
  async claim(questId) {
    if (!questId || typeof questId !== 'string' || !isUUID(questId)) throw new Error('INVALID_QUEST_ID_FORMAT');
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_CLAIM(this.clan.id), {
      data: {
        questId,
      },
    });
    if (response === 404) throw new Error('QUEST_CANNOT_BE_CLAIMED');
  }

  /**
   * Suffle quests.
   * <warn>Using this method will spend clan gold!</warn>
   * @returns {void}
   */
  async shuffle() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_SHUFFLE(this.clan.id));
    if (response === 404) throw new Error('QUESTS_CANNOT_BE_SHUFFLED');
  }

  /**
   * Skip active quest waiting time.
   * <warn>Using this method will spend clan gold!</warn>
   * @returns {void}
   */
  async skipActiveQuestWaitingTime() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_ACTIVE_SKIP_WAITING_TIME(this.clan.id));
    if (response === 404) throw new Error('QUEST_TIME_CANNOT_BE_SKIPPED');
  }

  /**
   * Claim additional time for the active quest.
   * <warn>Using this method will spend clan gold!</warn>
   * @returns {void}
   */
  async claimActiveQuestExtraTime() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_ACTIVE_CLAIM_TIME(this.clan.id));
    if (response === 404) throw new Error('QUEST_EXTRA_TIME_CANNOT_BE_CLAIMED');
  }

  /**
   * Cancel active quest.
   * @returns {void}
   */
  async cancelActiveQuest() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_ACTIVE_CANCEL(this.clan.id));
    if (response === 404) throw new Error('ACTIVE_QUEST_CANNOT_BE_CANCELED');
  }
}

module.exports = ClanQuestManager;
