'use strict';

const { Collection } = require('@discordjs/collection');
const Base = require('./Base');
const ClanMember = require('./ClanMember');
const ClientClanMember = require('./ClientClanMember');
const OwnedClanIcon = require('./OwnedClanIcon');
const Routes = require('../util/Routes');

/**
 * Represents a clan.
 * @extends {Base}
 */
class Clan extends Base {
  constructor(client, data) {
    super(client, data);

    /**
     * Clan id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Clan name
     * @type {string}
     */
    this.name = data.name;

    /**
     * Clan tag
     * @type {?string}
     */
    this.tag = data.tag ?? null;

    /**
     * Clan created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.creationTime).getTime();

    /**
     * Clan description
     * @type {?string}
     */
    this.description = data.description ?? null;

    /**
     * Clan xp
     * @type {number}
     */
    this.xp = data.xp;

    /**
     * Clan language
     * @type {string}
     */
    this.language = data.language.toLowerCase();

    /**
     * Clan icon
     * @type {string}
     */
    this.icon = new OwnedClanIcon(client, {
      name: data.icon,
      color: data.iconColor,
    });

    /**
     * Clan join type
     * @type {string}
     */
    this.joinType = data.joinType;

    /**
     * Clan member count
     * @type {number}
     */
    this.memberCount = data.memberCount;

    /**
     * Clan leader
     * @type {Object}
     */
    this.leader = { id: data.leaderId };

    /**
     * Clan required level to join
     * @type {number}
     */
    this.requiredLevel = data.minLevel;

    /**
     * Clan started quest count
     * @type {number}
     */
    this.startedQuestCount = data.questHistoryCount;
  }

  /**
   * Fetch the clan.
   * @returns {Clan}
   */
  fetch() {
    return this.client.clans.fetchById(this.id);
  }

  /**
   * Fetch clan members.
   * @returns {Collection<string, ClanMember|ClientClanMember>}
   */
  async fetchMembers() {
    const response = await this.client.rest.get(Routes.CLANS_MEMBERS(this.id));

    const members = response.map(
      member =>
        new (response[0].participateInClanQuests ? ClientClanMember : ClanMember)(
          this.client,
          Object.assign(member, { leaderId: this.leader.id }),
        ),
    );
    return members.reduce((col, member) => col.set(member.id, member), new Collection());
  }

  /**
   * Fetch clan member.
   * @param {string} memberId Member id
   * @returns {Collection<string, ClanMember|ClientClanMember>}
   */
  async fetchMember(memberId) {
    const response = await this.client.rest.get(Routes.CLANS_MEMBERS_MEMBER(this.id, memberId));

    return response.participateInClanQuests
      ? new ClientClanMember(this.client, response)
      : new ClanMember(this.client, response);
  }

  /**
   * Whether you can join the clan
   * @type {?boolean}
   * @readonly
   */
  get joinable() {
    return ['PUBLIC', 'JOIN_BY_REQUEST'].includes(this.joinType) && this.memberCount < 50;
  }
}

module.exports = Clan;
