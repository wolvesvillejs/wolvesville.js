const Clan = require('./Clan');
const ClanChatManager = require('../managers/ClanChatManager');
const { getAuthenticationHeaders, getAuthenticationHeadersContainsBody } = require('../util/Headers');
const fetch = require('node-fetch');

class ClientClan extends Clan {
  constructor(client, data) {
    super(client, data);
    this.goldCount = data.clan.gold;
    this.gemCount = data.clan.gems;

    this.chat = new ClanChatManager(client);
  }
}

module.exports = ClientClan;
