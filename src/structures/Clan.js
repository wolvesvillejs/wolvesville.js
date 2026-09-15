'use strict';

const { Collection } = require('@discordjs/collection');
const Base = require('./Base');
const ClanMember = require('./ClanMember');
const ClientClanMember = require('./ClientClanMember');
const OwnedClanIcon = require('./OwnedClanIcon');
const Player = require('./Player');
const Routes = require('../util/Routes');

/**
 * Represents a clan.
 * @extends {Base}
 */
class Clan extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Clan id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('name' in data) {
      /**
       * Clan name
       * @type {?string}
       */
      this.name = data.name;
    } else {
      this.name ??= null;
    }

    if (data.tag) {
      /**
       * Clan tag
       * @type {?string}
       */
      this.tag = data.tag;
    } else {
      this.tag ??= null;
    }

    if ('creationTime' in data) {
      /**
       * Clan created timestamp
       * @type {?number}
       */
      this.createdTimestamp = new Date(data.creationTime).getTime();
    } else {
      this.createdTimestamp ??= null;
    }

    if (data.description) {
      /**
       * Clan description
       * @type {?string}
       */
      this.description = data.description;
    } else {
      this.description ??= null;
    }

    if ('xp' in data) {
      /**
       * Clan xp
       * @type {?number}
       */
      this.xp = data.xp;
    } else {
      this.xp ??= null;
    }

    if ('language' in data) {
      /**
       * Clan language
       * @type {?string}
       */
      this.language = data.language.toLowerCase();
    } else {
      this.language ??= null;
    }

    if ('icon' in data && 'iconColor' in data) {
      /**
       * Clan icon
       * @type {?OwnedClanIcon}
       */
      this.icon = new OwnedClanIcon(this.client, {
        name: data.icon,
        color: data.iconColor,
      });
    } else {
      this.icon ??= null;
    }

    if ('joinType' in data) {
      /**
       * Clan join type
       * @type {?string}
       */
      this.joinType = data.joinType;
    } else {
      this.joinType ??= null;
    }

    if ('memberCount' in data) {
      /**
       * Clan member count
       * @type {?number}
       */
      this.memberCount = data.memberCount;
    } else {
      this.memberCount ??= null;
    }

    if ('leaderId' in data) {
      /**
       * Clan leader
       * @type {?string}
       */
      this.leaderId = data.leaderId;
    } else {
      this.leaderId ??= null;
    }

    if ('minLevel' in data) {
      /**
       * Clan required level to join
       * @type {?number}
       */
      this.requiredLevel = data.minLevel;
    } else {
      this.requiredLevel ??= null;
    }

    if ('questHistoryCount' in data) {
      /**
       * Clan started quest count
       * @type {?number}
       */
      this.startedQuestCount = data.questHistoryCount;
    } else {
      this.startedQuestCount ??= null;
    }
  }

  /**
   * Fetch the clan.
   * @param {boolean} force Whether force fetching
   * @returns {Clan|ClientClient}
   */
  fetch(force = true) {
    return this.client.clans.fetch(this, { force });
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
          Object.assign(member, { leaderId: this.leaderId }),
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
   * Leader of the clan
   * @type {?Player}
   * @readonly
   */
  get leader() {
    return this.leaderId
      ? this.client.players.cache.get(this.leaderId) || new Player(this.client, { id: this.leaderId })
      : null;
  }

  /**
   * Whether you can join the clan
   * @type {?boolean}
   * @readonly
   */
  get joinable() {
    return this.joinType && this.memberCount
      ? ['PUBLIC', 'JOIN_BY_REQUEST'].includes(this.joinType) && this.memberCount < 50
      : null;
  }
}

module.exports = Clan;
