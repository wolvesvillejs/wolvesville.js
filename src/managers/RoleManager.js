const BaseManager = require('./BaseManager');
const RoleRotation = require('../structures/RoleRotation.js');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class RoleManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async fetchCurrentQuickGames() {
    const request = await fetch('https://api-core.wolvesville.com/roleRotation/quickGames/roles', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async fetchCurrentRankedGames() {
    const request = await fetch('https://api-core.wolvesville.com/roleRotation/ranked/en', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return Object.keys(response).map(r => new RoleRotation(this.client, response[r].roleRotations));
  }

  async fetchCustomGame() {
    const request = await fetch('https://api-core.wolvesville.com/customGames/roles', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async fetchOwnedInCustomGames() {
    const request = await fetch('https://api-core.wolvesville.com/customGames/ownRoles', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

}

module.exports = RoleManager;
