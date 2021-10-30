const Clan = require('./Clan');
const ClanChatManager = require('../managers/ClanChatManager');
const AvailableClanQuests = require('./AvailableClanQuests');
const ActiveClanQuest = require('./ActiveClanQuest');
const { CORE_API_URL } = require('../util/Constants');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class ClientClan extends Clan {
  constructor(client, data) {
    super(client, data);
    this.goldCount = data.clan.gold;
    this.gemCount = data.clan.gems;

    this.chat = new ClanChatManager(client);
  }

  async fetchActiveQuest() {
    const request = await fetch(`${CORE_API_URL}/clanQuests/active`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    if(request.status === 204) return null;

    const response = await request.json();
    return new ActiveClanQuest(this.client, response);
  }

  async fetchAvailableQuests() {
    const request = await fetch(`${CORE_API_URL}/clanQuests/available`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new AvailableClanQuests(this.client, response);
  }

}

module.exports = ClientClan;
