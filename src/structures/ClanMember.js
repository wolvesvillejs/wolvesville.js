const Base = require('./Base');

/**
 * Represents a clan member.
 * @extends {Base}
 */
class ClanMember extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Member id.
     * @type {string}
     */
    this.id = data.playerId;

    /**
     * Member username.
     * @type {string}
     */
    this.username = data.username;

    /**
     * Member level.
     * @type {number}
     */
    this.level = data.level;

    /**
     * Member status.
     * @type {string}
     */
    this.status = data.playerStatus;

    /**
     * Member last online timestamp.
     * @type {string}
     */
    this.lastOnlineTimestamp = data.lastOnline;

    /**
     * Member profile icon.
     * @type {Object}
     */
    this.profileIcon = {
      id: data.profileIconId,
      color: data.profileIconColor
    }

    /**
     * Xp the player brought to the clan.
     * @type {number}
     */
    this.clanXp = data.xp;

    /**
     * Member status.
     * @type {string}
     */
    this.clanStatus = data.status;

    /**
     * Member rank.
     * @type {string}
     */
    this.rank = this.id === data.clan.leaderId ? 2 : data.coLeader ? 1 : 0;
  }

  /**
   * Fetch the member.
   * @returns {Promise<Player|ClientPlayer>}
   */
  async fetch() {
    return await this.client.players.fetchById(this.id);
  }

}

module.exports = ClanMember;
