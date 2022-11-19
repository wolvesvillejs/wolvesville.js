'use strict';

const Avatar = require('./Avatar');
const BasePlayer = require('./BasePlayer');
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

    /**
     * Player username
     * @type {string}
     */
    this.username = data.username;

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
     * Clan
     * @type {?Object}
     */
    this.clan = { id: data.clanId, tag: data.clanTag } || null;

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
     * Player badges
     * @type {AvatarItem[]}
     */
    this.badges = data.badgeIds.map(badgeId => this.client.items.resolve(badgeId, ItemTypes.AVATAR_ITEM));

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
    return this.client.clans.fetch(this.clan);
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
