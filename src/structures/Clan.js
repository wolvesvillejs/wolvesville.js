const Base = require('./Base');
const ClanMember = require('./ClanMember');
const ClientClanMember = require('./ClientClanMember');

class Clan extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.clan.id;
    this.name = data.clan.name;
    this.tag = data.clan.tag || null;
    this.creationTimestamp = data.clan.creationTime;
    this.description = data.clan.description;
    this.xp = data.clan.xp;
    this.locale = data.clan.language;
    this.icon = {
      name: data.clan.icon,
      color: data.clan.iconColor
    }
    this.joinType = data.clan.joinType;
    this.leader = {
      id: data.clan.leaderId
    }
    this.memberCount = data.clan.memberCount
    this.requiredLevel = data.clan.minLevel;
    this.startedQuestCount = data.clan.questHistoryCount;

    if(data.members) this.members = data.members.map(member => {
      return this.constructor.name === 'Clan'
        ? new ClanMember(client, member)
        : new ClientClanMember(client, member);
    });
  }
}

module.exports = Clan;
