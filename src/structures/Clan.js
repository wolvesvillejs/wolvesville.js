const Base = require('./Base');
const ClanMember = require('./ClanMember');
const ClientClanMember = require('./ClientClanMember');
const { Collection } = require('@discordjs/collection');

/**
 * Represents a clan.
 */
class Clan extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Clan id.
     * @type {string}
     */
    this.id = data.clan.id;

    /**
     * Clan name.
     * @type {string}
     */
    this.name = data.clan.name;

    /**
     * Clan tag.
     * @type {?string}
     */
    this.tag = data.clan.tag || null;

    /**
     * Clan created timestamp.
     * @type {string}
     */
    this.createdTimestamp = data.clan.creationTime;

    /**
     * Clan description.
     * @type {string}
     */
    this.description = data.clan.description;

    /**
     * Clan xp.
     * @type {number}
     */
    this.xp = data.clan.xp;

    /**
     * Clan language.
     * @type {string}
     */
    this.locale = data.clan.language;

    /**
     * Clan icon.
     * @type {string}
     */
    this.icon = {
      name: data.clan.icon,
      color: data.clan.iconColor
    }

    /**
     * Clan join type.
     * @type {string}
     */
    this.joinType = data.clan.joinType;

    /**
     * Clan member count.
     * @type {number}
     */
    this.memberCount = data.clan.memberCount;

    /**
     * Clan required level to join.
     * @type {number}
     */
    this.requiredLevel = data.clan.minLevel;

    /**
     * Clan started quest count.
     * @type {number}
     */
    this.startedQuestCount = data.clan.questHistoryCount;

    /**
     * Clan members.
     * @type {Collection<string, ClanMember|ClientClanMember>}
     */
    this.members = new Collection();

    for (const member of data.members.values()) {
      member.clan = data.clan;
      this.members.set(
        member.playerId,
        this.constructor.name === 'Clan'
          ? new ClanMember(client, member)
          : new ClientClanMember(client, member)
      );
    }
  }

  /**
   * Clan coleaders.
   * @type {Collection<string, ClanMember|ClientClanMember>}
   * @readonly
   */
  get coleaders() {
    return this.members.filter(member => member.rank === 1);
  }

  /**
   * Clan leader.
   * @type {ClanMember|ClientClanMember}
   * @readonly
   */
  get leader() {
    return this.members.find(member => member.rank === 2);
  }

}

module.exports = Clan;
