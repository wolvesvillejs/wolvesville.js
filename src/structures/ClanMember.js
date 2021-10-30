const Base = require('./Base');

class ClanMember extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.playerId;
    this.username = data.username;
    this.level = data.level;
    this.status = data.playerStatus;
    this.lastOnlineTimestamp = data.lastOnline;

    this.profileIcon = {
      id: data.profileIconId,
      color: data.profileIconColor
    }

    this.clanXp = data.xp;
    this.clanStatus = data.status;
    this.joinMessage = data.joinMessage || null;
    this.questParticipant = data.participateInClanQuests;
    this.coLeader = data.coLeader;
  }

  async fetch() {
    return await this.client.players.fetchById(this.id);
  }

}

module.exports = ClanMember;
