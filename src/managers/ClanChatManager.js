const BaseManager = require('./BaseManager');
const ClanChatMessage = require('../structures/ClanChatMessage');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Manages API methods for ClanChatMessages.
 * @extends {BaseManager}
 */
class ClanChatManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  /**
   * Obtains one or multiple messages.
   * @param {string} timestamp Date of messages around
   * @returns {Promise<ClanChatMessage[]>}
   */
  async fetchMessages(timestamp) {

    if(timestamp) {
      const date = new Date(timestamp);
      if(isNaN(date) || timestamp !== date.toISOString()) throw new Error('INVALID_TIMESTAMP');
    }

    const request = await fetch(`${this.client.options.http.api.core}/clans/chat/v2${timestamp ? `?oldest=${timestamp}` : ''}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.map(message => new ClanChatMessage(this.client, message));
  }

}

module.exports = ClanChatManager;
