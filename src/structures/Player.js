'use strict';

const Avatar = require('./Avatar');
const BasePlayer = require('./BasePlayer');
const OwnedProfileIcon = require('./OwnedProfileIcon');
const RoleCard = require('./RoleCard');
const { ItemTypes } = require('../util/Constants');
const Clan = require('./Clan');

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

    /**
     * Player username
     * @type {string}
     */
    this.username = data.username;

    /**
     * Clan tag
     * @type {?string}
     */
    this.clanTag = data.clanTag || null;

    /**
     * Player personal message
     * @type {?string}
     */
    this.personalMessage = data.personalMsg || null;

    /**
     * Player level
     * @type {number}
     */
    this.level = data.level;

    /**
     * Player status
     * @type {string}
     */
    this.status = data.status;

    /**
     * Number of roses the player received
     * @type {number}
     */
    this.receivedRoses = data.receivedRoses ?? 0;

    /**
     * Number of roses the player sent
     * @type {number}
     */
    this.sentRoses = data.sentRoses ?? 0;

    /**
     * Player profile icon
     * @type {?OwnedProfileIcon}
     */
    this.profileIcon = !data.profileIconId
      ? null
      : this.client.profileIcons.cache.size
      ? new OwnedProfileIcon(
          this.client,
          Object.assign(this.client.profileIcons.cache.get(data.profileIconId), {
            color: data.profileIconColor,
          }),
        )
      : new OwnedProfileIcon(this.client, {
          id: data.profileIconId,
          color: data.profileIconColor,
        });

    this.gameStats = data.gameStats;

    /**
     * Clan id
     * @type {?string}
     */
    this.clanId = data.clanId || null;

    /**
     * Ranked season skill points
     * @type {?number}
     */
    this.seasonSkill = data.rankedSeasonSkill !== -1 ? data.rankedSeasonSkill : null;

    /**
     * Ranked season skill points record
     * @type {?number}
     */
    this.skillRecord = data.rankedSeasonMaxSkill !== -1 ? data.rankedSeasonMaxSkill : null;

    /**
     * Ranked final rank record
     * @type {?number}
     */
    this.rankRecord = data.rankedSeasonBestRank !== -1 ? data.rankedSeasonBestRank : null;

    /**
     * Ranked season played count
     * @type {number}
     */
    this.seasonPlayedCount = data.rankedSeasonPlayedCount;

    /**
     * Player last online timestamp
     * @type {number}
     */
    this.lastOnlineTimestamp = new Date(data.lastOnline).getTime();

    /**
     * Player avatars
     * @type {Avatar[]}
     */
    this.avatars = data.avatars.map(avatar => new Avatar(client, avatar));

    /**
     * Player badge ids
     * @type {Array}
     */
    this.badgeIds = data.badgeIds;

    /**
     * Player role cards
     * @type {RoleCard[]}
     */
    this.roleCards = data.roleCards.map(roleCard => new RoleCard(this.client, roleCard));
  }

  /**
   * Fetch player clan.
   * @returns {Promise<Clan>}
   */
  fetchClan() {
    return this.client.clans.fetch(this.clanId);
  }

  /**
   * Clan tag and username
   * @type {string}
   * @readonly
   */
  get clanTagAndUsername() {
    return this.clan.tag ? `${this.clan.tag} | ${this.username}` : this.username;
  }

  /**
   * Player badges
   * @type {Item[]}
   */
  get badges() {
    return this.badgeIds.map(item => this.client.items.resolve(item, ItemTypes.AVATAR_ITEM));
  }

  /**
   * Player's clan
   * @type {?Clan}
   * @readonly
   */
  get clan() {
    return this.clanId
      ? (this.client.clans.cache.get(this.clanId) || new Clan(this.client, { id: this.clanId, tag: this.clanTag }))
      : null;
  }

  /**
   * Whether the player is online
   * @type {boolean}
   * @readonly
   */
  get online() {
    return this.lastOnlineTimestamp + 10 * 60 * 1000 > Date.now();
  }

  /**
   * Games played count
   * @type {number}
   * @readonly
   */
  get gamesPlayedCount() {
    return this.stats.wonGameCount + this.stats.lostGameCount + this.stats.fledGameCount;
  }
}

module.exports = Player;
