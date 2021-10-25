const BasePlayer = require('./BasePlayer');
const AvatarSlots = require('./AvatarSlots');
const ClanManager = require('../managers/ClanManager');
const Role = require('./Role');
const { getAuthenticationHeaders, getAuthenticationHeadersContainsBody } = require('../util/Headers');
const fetch = require('node-fetch');

class Player extends BasePlayer {
  constructor(client, data) {
    super(client);

    this.id = data.id;
    this.username = data.username;
    this.level = data.level;

    this.clanTag = data.clanTag || null;
    this.status = data.playerStatus;
    this.personalMessage = data.personalMsg;

    this.receivedRoses = data.receivedRoses || null;
    this.sentRoses = data.sentRoses || null;

    this.creationTimestamp = data.creationTime;
    this.lastOnlineTimestamp = data.lastOnline;

    this.equippedItems = {
      profileIcon: {
        id: data.equippedProfileIconId,
        color: data.equippedProfileIconColor,
      }
    }

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
    const request = await fetch(`https://api-core.wolvesville.com/inventory/slots/${this.id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new AvatarSlots(this.client, response);
  }

  async sendFriendRequest() {
    return await client.friends.add(this.id);
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
