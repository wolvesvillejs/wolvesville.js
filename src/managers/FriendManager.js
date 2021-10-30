const BaseManager = require('./BaseManager');
const FriendList = require('../structures/FriendList');
const FriendPlayer = require('../structures/FriendPlayer');
const { CORE_API_URL } = require('../util/Constants');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class FriendsManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async fetch() {
    const request = await fetch(`${CORE_API_URL}/friends`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new FriendList(this.client, response);
  }

  async fetchRequests() {
    const request = await fetch(`${CORE_API_URL}/friendRequests/pending`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

}

module.exports = FriendsManager;
