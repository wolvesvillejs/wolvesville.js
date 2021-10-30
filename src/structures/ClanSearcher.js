const Base = require('./Base');
const Clan = require('./Clan');

class ClanSearcher extends Base {
  constructor(client, data) {
    super(client);
    this.entries = data.map(clan => new Clan(client, { clan }));
    this.foundCount = data.length;
  }
}

module.exports = ClanSearcher;
