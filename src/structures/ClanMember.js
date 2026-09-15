'use strict';

const BasePlayer = require('./BasePlayer');
const OwnedProfileIcon = require('./OwnedProfileIcon');
const { ClanRanks } = require('../util/Constants');

/**
 * Represents a clan member.
 * @extends {BasePlayer}
 */
class ClanMember extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Member id
     * @type {string}
     */
    this.id = data.playerId;

    /**
     * Member username
     * @type {string}
     */
    this.username = data.username;

    /**
     * Member level
     * @type {number}
     */
    this.level = data.level;

    /**
     * Member status
     * @type {string}
     */
    this.status = data.playerStatus;

    /**
     * Member profile icon
     * @type {OwnedProfileIcon}
     */
    this.profileIcon = data.profileIconId
      ? new OwnedProfileIcon(this.client, {
          id: data.profileIconId,
          color: data.profileIconColor,
        })
      : null;

    /**
     * Xp the player brought to the clan
     * @type {number}
     */
    this.clanXp = data.xp;

    /**
     * Member status
     * @type {string}
     */
    this.clanStatus = data.status;

    /**
     * Member rank
     * @type {string}
     */
    this.rank = this.id === data.leaderId ? ClanRanks.LEADER : data.isCoLeader ? ClanRanks.COLEADER : ClanRanks.MEMBER;

    /**
     * Member last online timestamp
     * @type {number}
     */
    this.lastOnlineTimestamp = new Date(data.lastOnline).getTime();

    /**
     * Member account creation timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.creationTime).getTime();

    /**
     * Member flair
     * @type {?string}
     */
    this.flair = data.flair ?? null;

    /**
     * Profile icon color mode
     * @type {?string}
     */
    this.profileIconColorMode = data.profileIconColorMode ?? null;

    /**
     * Profile icon gradient primary color
     * @type {?string}
     */
    this.profileIconGradientPrimary = data.profileIconGradientPrimary ?? null;

    /**
     * Profile icon gradient accent color
     * @type {?string}
     */
    this.profileIconGradientAccent = data.profileIconGradientAccent ?? null;

    /**
     * Profile icon gradient direction
     * @type {?string}
     */
    this.profileIconGradientDirection = data.profileIconGradientDirection ?? null;
  }
}

module.exports = ClanMember;
