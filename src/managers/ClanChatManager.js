const BaseManager = require('./BaseManager');
const ClanChatMessage = require('../structures/ClanChatMessage')
const { getAuthenticationHeaders, getAuthenticationHeadersContainsBody } = require('../util/Headers');
const fetch = require('node-fetch');

class ClanChatManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async sendMessage(content) {
    const request = await fetch('https://api-core.wolvesville.com/clans/chat', {
      method: 'POST',
      headers: getAuthenticationHeadersContainsBody(this.client.token),
      body: JSON.stringify({
        message: content
      })
    });
    const response = await request.json();
    return new ClanChatMessage(this.client, response[0]);
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
