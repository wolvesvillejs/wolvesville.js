const BaseManager = require('./BaseManager');
const ClanChatMessage = require('../structures/ClanChatMessage');
const { CORE_API_URL } = require('../util/Constants');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Manages API methods for ClanChatMessages.
 */
class ClanChatManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  /**
   * Obtains one or multiple messages.
   * @returns {Array<ClanChatMessage>}
   */
  async fetchMessages() {
    const request = await fetch(`${CORE_API_URL}/clans/chat/v2`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.map(message => new ClanChatMessage(this.client, message));
  }

}

module.exports = ClanChatManager;
