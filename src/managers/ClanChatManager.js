const BaseManager = require('./BaseManager');
const ClanChatMessage = require('../structures/ClanChatMessage')
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class ClanChatManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async fetchMessages() {
    const request = await fetch(`https://api-core.wolvesville.com/clans/chat/v2`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

}

module.exports = ClanChatManager;
