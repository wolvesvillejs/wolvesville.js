const BasePlayer = require('./BasePlayer');
const AvatarSlot = require('./AvatarSlot');
const ClanManager = require('../managers/ClanManager');
const Role = require('./Role');
const { Collection } = require('@discordjs/collection');
const { CORE_API_URL } = require('../util/Constants');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Represents a player.
 * @extends {BasePlayer}
 */
class Player extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Player id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Player username.
     * @type {string}
     */
    this.username = data.username;

    /**
     * Player level.
     * @type {number}
     */
    this.level = data.level;

    /**
     * Player clan tag.
     * @type {?string}
     */
    this.clanTag = data.clanTag || null;

    /**
     * Player status.
     * @type {string}
     */
    this.status = data.playerStatus;

    /**
     * Player personal message.
     * @type {string}
     */
    this.personalMessage = data.personalMsg;

    /**
     * Number of roses the player received.
     * @type {number}
     */
    this.receivedRoses = data.receivedRoses || 0;

    /**
     * Number of roses the player sent.
     * @type {number}
     */
    this.sentRoses = data.sentRoses || 0;

    /**
     * Player creation timestamp.
     * @type {string}
     */
    this.creationTimestamp = data.creationTime;

    /**
     * Player last online timestamp.
     * @type {string}
     */
    this.lastOnlineTimestamp = data.lastOnline;

    /**
     * Player equipped items.
     * @type {Object}
     */
    this.equippedItems = {
      profileIcon: {
        id: data.equippedProfileIconId,
        color: data.equippedProfileIconColor,
      }
    }

    /**
     * Player stats.
     * @type {Object}
     */
    this.stats = {
      finishedGameCount: data.playerStats.finishedGamesCount,
      gamesSurvivedCount: data.playerStats.gamesSurvivedCount,
      gamesKilledCount: data.playerStats.gamesKilledCount,
      gamesExitedCount: data.playerStats.exitGameAfterDeathCount,
      fledGameCount: data.playerStats.exitGameBySuicideCount,
      minutesPlayedInGame: data.playerStats.totalPlayTimeInMinutes,
      roles: Object.keys(data.playerStats.roleStats).map(roleId => {
        const role = new Role(client, { id: roleId });
        role.loseCount = data.playerStats.roleStats[roleId].loseCount;
        role.winCount = data.playerStats.roleStats[roleId].winCount;
        return role;
      }),
      ranked: {
        seasonSkill: data.seasonSkill,
        seasonSkillRecord: data.seasonMaxSkill,
        seasonFinalRankRecord: data.seasonBestRank,
        seasonPlayedCount: data.seasonPlayedCount
      }
    }

    /**
     * Player options.
     * @type {Object}
     */
    this.options = {
      clanTagHidden: data.hideClanTag,
      clanChatNotificationsDisabled: data.notificationsDisabledClanChat,
      clanActionNotificationsDisabled: data.notificationsDisabledClanActions
    }
  }

  async fetch() {
    return await this.client.players.fetchById(this.id);
  }

  async fetchClan() {
    return this.constructor.name !== 'ClientPlayer'
      ? await this.client.clans.fetchByUsername(this.username)
      : await this.client.clans.fetchOwn();
  }

  async fetchAvatarSlots() {
    const request = await fetch(`${CORE_API_URL}/inventory/slots/${this.id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();

    const fetchedAvatarSlots = new Collection();

    for (const avatarSlot of response.values()) {
      fetchedAvatarSlots.set(
        avatarSlot.slot,
        new AvatarSlot(this.client, avatarSlot)
      );
    }

    return fetchedAvatarSlots;
  }

  async fetchBadges() {
    const request = await fetch(`${CORE_API_URL}/players/${this.id}/badgeIdsV2`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.ids.length > 0 ? response.ids : null;
  }

  get clanTagAndUsername() {
    return this.clanTag ? this.clanTag + '|' + this.username : this.username;
  }

  get wonGameCount() {
    return Object.values(this.stats.roles).reduce((t, n) => t + n.winCount, 0);
  }

  get lostGameCount() {
    return Object.values(this.stats.roles).reduce((t, n) => t + n.loseCount, 0);
  }

  get gamesPlayedCount() {
    return this.wonGameCount + this.lostGameCount + this.stats.fledGameCount;
  }

}

module.exports = Player;
