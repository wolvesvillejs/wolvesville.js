'use strict';

const { Collection } = require('@discordjs/collection');
const Clan = require('./Clan');
const ClanLedgerField = require('./ClanLedgerField');
const ClanLog = require('./ClanLog');
const ClanChatManager = require('../managers/ClanChatManager');
const ClanQuestManager = require('../managers/ClanQuestManager');
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
     * The quest manager of the clan
     * @type {ClanQuestManager}
     */
    this.quests = new ClanQuestManager(client, this);

    /**
     * The chat manager of the clan
     * @type {ClanChatManager}
     */
    this.chat = new ClanChatManager(client, this);

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
   * Fetch detailed members list.
   * @returns {Promise<Array>}
   */
  async fetchMembersDetailed() {
    const response = await this.client.rest.get(Routes.CLANS_MEMBERS_DETAILED(this.id));
    return response;
  }

  /**
   * Fetch detailed member info.
   * @param {string} memberId Member ID
   * @returns {Promise<Object>}
   */
  async fetchMemberDetailed(memberId) {
    if (!memberId || typeof memberId !== 'string' || !isUUID(memberId)) throw new Error('INVALID_MEMBER_ID_FORMAT');
    const response = await this.client.rest.get(Routes.CLANS_MEMBERS_MEMBER_DETAILED(this.id, memberId));
    if (response.code === 404) throw new Error('CLAN_MEMBER_NOT_FOUND');
    return response;
  }

  /**
   * Update member flair.
   * @param {string} memberId Member ID
   * @param {string} flair Flair text
   * @returns {Promise<Object>}
   */
  async updateMemberFlair(memberId, flair) {
    if (!memberId || typeof memberId !== 'string' || !isUUID(memberId)) throw new Error('INVALID_MEMBER_ID_FORMAT');
    if (typeof flair !== 'string') throw new Error('FLAIR_MUST_BE_A_STRING');

    const response = await this.client.rest.put(Routes.CLANS_MEMBERS_MEMBER_FLAIR(this.id, memberId), {
      data: { flair },
    });

    if (response.code === 404) throw new Error('CLAN_MEMBER_NOT_FOUND');
    return response;
  }

  /**
   * Update all members quest participation.
   * @param {boolean} participation Whether members will participate
   * @returns {Promise<Array>}
   */
  async switchAllParticipation(participation) {
    if (typeof participation !== 'boolean') throw new Error('PARTICIPATION_OPTION_MUST_BE_A_BOOLEAN');

    const response = await this.client.rest.put(Routes.CLANS_MEMBERS_ALL_PARTICIPATE_IN_QUESTS(this.id), {
      data: {
        participateInQuests: participation,
      },
    });

    return response;
  }

  /**
   * Kick a member from the clan or reject join request.
   * @param {string} memberId Member ID
   * @param {?string} [reason] Optional reason for kick
   * @returns {Promise<void>}
   */
  async kickMember(memberId, reason) {
    if (!memberId || typeof memberId !== 'string' || !isUUID(memberId)) throw new Error('INVALID_MEMBER_ID_FORMAT');

    const data = reason ? { reason } : {};
    await this.client.rest.post(Routes.CLANS_MEMBERS_MEMBER_KICK(this.id, memberId), { data });
  }

  /**
   * Block a player from the clan.
   * @param {string} memberId Member ID
   * @returns {Promise<void>}
   */
  async blockMember(memberId) {
    if (!memberId || typeof memberId !== 'string' || !isUUID(memberId)) throw new Error('INVALID_MEMBER_ID_FORMAT');

    await this.client.rest.post(Routes.CLANS_MEMBERS_MEMBER_BLOCK(this.id, memberId));
  }

  /**
   * Unblock a player from the clan.
   * @param {string} memberId Member ID
   * @returns {Promise<void>}
   */
  async unblockMember(memberId) {
    if (!memberId || typeof memberId !== 'string' || !isUUID(memberId)) throw new Error('INVALID_MEMBER_ID_FORMAT');

    await this.client.rest.post(Routes.CLANS_MEMBERS_MEMBER_UNBLOCK(this.id, memberId));
  }

  /**
   * Fetch clan blocklist.
   * @returns {Promise<Array>}
   */
  async fetchBlocklist() {
    const response = await this.client.rest.get(Routes.CLANS_BLOCKLIST(this.id));
    return response;
  }

  /**
   * Fetch quest votes.
   * @returns {Promise<Object>}
   */
  async fetchQuestVotes() {
    const response = await this.client.rest.get(Routes.CLANS_QUESTS_VOTES(this.id));
    return response;
  }
}

module.exports = ClientClan;
