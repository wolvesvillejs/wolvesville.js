const Clan = require('./Clan');
const ClanChatManager = require('../managers/ClanChatManager');
const AvailableClanQuests = require('./AvailableClanQuests');
const ActiveClanQuest = require('./ActiveClanQuest');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Represents a client clan.
 * @extends {Clan}
 */
class ClientClan extends Clan {
  constructor(client, data) {
    super(client, data);

    /**
     * Clan gold count.
     * @type {string}
     */
    this.goldCount = data.clan.gold;

    /**
     * Clan gem count.
     * @type {string}
     */
    this.gemCount = data.clan.gems;

    /**
     * Clan chat.
     * @type {string}
     */
    this.chat = new ClanChatManager(client);
  }

  /**
   * Active quests.
   * @returns {Promise<ActiveClanQuest>}
   */
  async fetchActiveQuest() {
    const request = await fetch(`${this.client.options.http.api.core}/clanQuests/active`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    if(request.status === 204) return null;

    const response = await request.json();
    return new ActiveClanQuest(this.client, response);
  }

  /**
   * Available quests.
   * @returns {Promise<AvailableClanQuests>}
   */
  async fetchAvailableQuests() {
    const request = await fetch(`${this.client.options.http.api.core}/clanQuests/available`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new AvailableClanQuests(this.client, response);
  }

}

module.exports = ClientClan;
