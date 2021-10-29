const Clan = require('./Clan');
const ClanChatManager = require('../managers/ClanChatManager');
const AvailableClanQuests = require('./AvailableClanQuests');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class ClientClan extends Clan {
  constructor(client, data) {
    super(client, data);
    this.goldCount = data.clan.gold;
    this.gemCount = data.clan.gems;

    this.chat = new ClanChatManager(client);
  }

  async fetchAvailableQuests() {
    const request = await fetch('https://api-core.wolvesville.com/clanQuests/available', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new AvailableClanQuests(this.client, response);
  }

}

module.exports = ClientClan;
