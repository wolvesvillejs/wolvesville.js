const Base = require('./Base');
const QueriedClan = require('./QueriedClan');
const { Collection } = require('@discordjs/collection');

class ClanSearcher extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Clans.
     * @type {Collection<string, Clan>}
     */
    this.clans = new Collection();

    for (const clan of data) {
      this.clans.set(
        clan.id,
        new QueriedClan(client, { clan })
      );
    }
  }
}

module.exports = ClanSearcher;
