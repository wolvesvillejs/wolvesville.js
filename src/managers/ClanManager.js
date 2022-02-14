const BaseManager = require('./BaseManager');
const ClanSearcher = require('../structures/ClanSearcher');
const ClanLeaderboard = require('../structures/ClanLeaderboard');
const Clan = require('../structures/Clan');
const ClientClan = require('../structures/ClientClan');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class ClanManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async fetchByMemberId(id) {
    if(!id || typeof id !== 'string' || !Number.isInteger(id)) throw new Error('INVALID_CLAN_MEMBER_ID_FORMAT');
    const request = await fetch(`${this.client.options.http.api.core}/clans/byPlayer?playerId=${id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new Clan(this.client, response);
  }

  async #fetchMinimalByName(name) {
    if(!name || typeof name !== 'string') throw new Error('INVALID_CLAN_NAME_FORMAT');
    const request = await fetch(`${this.client.options.http.api.core}/clans/v2/search?name=${name}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    return await request.json();
  }

  async fetchByName(name) {
    const response = await this.#fetchMinimalByName(name);
    if(!response.find(c => c.name === name)) throw new Error('CLAN_NOT_FOUND');
    return await this.fetchById(response.find(clan => clan.name === name).id);
  }

  async fetchSeveralByName(name) {
    const response = await this.#fetchMinimalByName(name);
    return new ClanSearcher(this.client, response);
  }

  async fetchById(id) {
    if(!id || typeof id !== 'string') throw new Error('INVALID_CLAN_ID_FORMAT');
    const request = await fetch(`${this.client.options.http.api.core}/clans/${id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    if(request.status === 204) throw new Error('CLAN_NOT_FOUND');
    const response = await request.json();
    return new Clan(this.client, response);
  }

  async fetchOwn() {
    const request = await fetch(`${this.client.options.http.api.core}/clans/myClan`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    if(request.status === 204) throw new Error('NOT_IN_A_CLAN');
    const response = await request.json();
    return new ClientClan(this.client, response);
  }

  async fetchLeaderboard({ onlyOpen } = { onlyOpen: false }) {
    if(typeof onlyOpen !== 'boolean') throw new Error('OPTION_MUST_BE_A_BOOLEAN');
    const request = await fetch(`${this.client.options.http.api.core}/clans/v2/ranking?onlyOpen=${onlyOpen}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new ClanLeaderboard(this.client, response);
  }

}

module.exports = ClanManager;
