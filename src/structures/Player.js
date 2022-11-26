'use strict';

const Avatar = require('./Avatar');
const BasePlayer = require('./BasePlayer');
const Clan = require('./Clan');
const OwnedProfileIcon = require('./OwnedProfileIcon');
const RoleCard = require('./RoleCard');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a player.
 * @extends {BasePlayer}
 */
class Player extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Player id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('username' in data) {
      /**
       * Player username
       * @type {?string}
       */
      this.username = data.username;
    } else {
      this.username ??= null;
    }

    if (data.personalMsg) {
      /**
       * Player personal message
       * @type {?string}
       */
      this.personalMessage = data.personalMsg;
    } else {
      this.personalMessage ??= null;
    }

    if ('level' in data) {
      /**
       * Player level
       * @type {?number}
       */
      this.level = data.level;
    } else {
      this.level ??= null;
    }

    if ('status' in data) {
      /**
       * Player status
       * @type {?number}
       */
      this.status = data.status;
    } else {
      this.status ??= null;
    }

    if ('receivedRosesCount' in data) {
      /**
       * Number of roses the player received
       * @type {?number}
       */
      this.receivedRosesCount = data.receivedRosesCount ?? 0;
    } else {
      this.receivedRosesCount ??= null;
    }

    if ('sentRosesCount' in data) {
      /**
       * Number of roses the player sent
       * @type {?number}
       */
      this.sentRosesCount = data.sentRosesCount ?? 0;
    } else {
      this.sentRosesCount ??= null;
    }

    if ('profileIconId' in data && 'profileIconColor' in data) {
      /**
       * Player profile icon
       * @type {?OwnedProfileIcon}
       */
      this.profileIcon = new OwnedProfileIcon(this.client, {
        id: data.profileIconId,
        color: data.profileIconColor,
      });
    } else {
      this.profileIcon ??= null;
    }

    if (data.clanId) {
      /**
       * Player's clan id
       * @type {?string}
       */
      this.clanId = data.clanId;
    } else {
      this.clanId ??= null;
    }

    if ('gameStats' in data) {
      /**
       * Player game stats
       * @type {?Object}
       */
      this.gameStats = data.gameStats;
    } else {
      this.gameStats ??= null;
    }

    if ('rankedSeasonSkill' in data && data.rankedSeasonSkill !== -1) {
      /**
       * Ranked season skill points
       * @type {?number}
       */
      this.seasonSkill = data.rankedSeasonSkill;
    } else {
      this.seasonSkill ??= null;
    }

    if ('rankedSeasonMaxSkill' in data && data.rankedSeasonMaxSkill !== -1) {
      /**
       * Ranked season skill points record
       * @type {?number}
       */
      this.skillRecord = data.rankedSeasonMaxSkill;
    } else {
      this.skillRecord ??= null;
    }

    if ('rankedSeasonBestRank' in data && data.rankedSeasonBestRank !== -1) {
      /**
       * Ranked final rank record
       * @type {?number}
       */
      this.rankRecord = data.rankedSeasonBestRank;
    } else {
      this.rankRecord ??= null;
    }

    if ('rankedSeasonPlayedCount' in data) {
      /**
       * Ranked season played count
       * @type {?number}
       */
      this.seasonPlayedCount = data.rankedSeasonPlayedCount;
    } else {
      this.seasonPlayedCount ??= null;
    }

    if ('lastOnline' in data) {
      /**
       * Player last online timestamp
       * @type {?number}
       */
      this.lastOnlineTimestamp = new Date(data.lastOnline).getTime();
    } else {
      this.lastOnlineTimestamp ??= null;
    }

    if ('avatars' in data) {
      /**
       * Player avatars
       * @type {?Avatar[]}
       */
      this.avatars = data.avatars.map(avatar => new Avatar(this.client, avatar));
    } else {
      this.avatars ??= null;
    }

    if ('badgeIds' in data) {
      /**
       * Player badge ids
       * @type {?string[]}
       */
      this.badgeIds = data.badgeIds;
    } else {
      this.badgeIds ??= null;
    }

    if ('roleCards' in data) {
      /**
       * Player role cards
       * @type {?RoleCard[]}
       */
      this.roleCards = data.roleCards.map(roleCard => new RoleCard(this.client, roleCard));
    } else {
      this.roleCards ??= null;
    }
  }

  /**
   * Fetch player clan.
   * @param {boolean} force Whether force fetching
   * @returns {Promise<Clan>}
   */
  fetchClan(force = true) {
    return this.client.clans.fetch(this.clanId, { force });
  }

  /**
   * Clan tag
   * @type {?string}
   * @readonly
   */
  get clanTag() {
    return this.clan.tag || null;
  }

  /**
   * Clan tag and username
   * @type {?string}
   * @readonly
   */
  get clanTagAndUsername() {
    return this.username ? (this.clanTag ? `${this.clanTag} | ${this.username}` : this.username) : null;
  }

  /**
   * Player badges
   * @type {?(Item[])}
   * @readonly
   */
  get badges() {
    return this.badgeIds ? this.badgeIds.map(item => this.client.items.resolve(item, ItemTypes.AVATAR_ITEM)) : null;
  }

  /**
   * Player's clan
   * @type {?Clan}
   * @readonly
   */
  get clan() {
    return this.clanId
      ? this.client.clans.cache.get(this.clanId) || new Clan(this.client, { id: this.clanId, tag: this.clanTag })
      : null;
  }

  /**
   * Whether the player is online
   * @type {?boolean}
   * @readonly
   */
  get online() {
    return this.lastOnlineTimestamp ? this.lastOnlineTimestamp + 10 * 60 * 1000 > Date.now() : null;
  }

  /**
   * Games played count
   * @type {?number}
   * @readonly
   */
  get gamesPlayedCount() {
    return this.gameStats
      ? this.gameStats.totalWinCount + this.gameStats.totalLoseCount + this.gameStats.totalTieCount
      : null;
  }
}

module.exports = Player;
