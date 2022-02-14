const BaseManager = require('./BaseManager');
const Player = require('../structures/Player');
const ClientPlayer = require('../structures/ClientPlayer');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class PlayerManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async #fetchMinimalByUsername(username) {
    const request = await fetch(`${this.client.options.http.api.core}/players/search?username=${username}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    if(!response.length) throw new Error('PLAYER_NOT_FOUND');
    return response[0];
  }

  async fetchByUsername(username) {
    const response = await this.#fetchMinimalByUsername(username);
    return await this.fetchById(response.id);
  }

  async fetchById(id) {
    const request = await fetch(`${this.client.options.http.api.core}/players/${id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    if(request.status === 204) throw new Error('PLAYER_NOT_FOUND');
    const response = await request.json();
    return response.xpTotal ? new ClientPlayer(this.client, response) : new Player(this.client, response);
  }

}

module.exports = PlayerManager;
