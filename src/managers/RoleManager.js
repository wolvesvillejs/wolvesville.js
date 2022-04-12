const BaseManager = require('./BaseManager');
const RoleRotation = require('../structures/RoleRotation.js');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class RoleManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async fetchCurrentQuickGames() {
    const request = await fetch(`${this.client.options.http.api.core}/roleRotation/quickGames/roles`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async fetchCurrentRankedGames() {
    const request = await fetch(`${this.client.options.http.api.core}/roleRotation/ranked/en`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return Object.keys(response).map(r => new RoleRotation(this.client, response[r].roleRotations));
  }

  async fetchCustomGame() {
    const request = await fetch(`${this.client.options.http.api.core}/customGames/roles`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

}

module.exports = RoleManager;
