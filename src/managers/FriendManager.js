const BaseManager = require('./BaseManager');
const Friend = require('../structures/Friend');
const { Collection } = require('@discordjs/collection');
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

    const fetchedFriends = new Collection();

    for (const friend of response) {
      fetchedFriends.set(friend.id, new Friend(this.client, friend));
    }

    return fetchedFriends;
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
