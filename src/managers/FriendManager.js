const BaseManager = require('./BaseManager');
const FriendList = require('../structures/FriendList');
const FriendPlayer = require('../structures/FriendPlayer');
const { getAuthenticationHeaders, getAuthenticationHeadersContainsBody } = require('../util/Headers');
const fetch = require('node-fetch');

class FriendsManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async add(id) {
    const request = await fetch('https://api-core.wolvesville.com/friendRequests', {
      method: 'POST',
      headers: getAuthenticationHeadersContainsBody(this.client.token),
      body: {
        targetPlayerId: id
      }
    });
    const response = await request.json();
    return response;
  }

  async fetch() {
    const request = await fetch('https://api-core.wolvesville.com/friends', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new FriendList(this.client, response);
  }

  async fetchRequests() {
    const request = await fetch('https://api-core.wolvesville.com/friendRequests/pending', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async acceptAllRequests() {
    await fetch('https://api-core.wolvesville.com/friendRequests/accept/all', {
      method: 'POST',
      headers: getAuthenticationHeaders(this.client.token)
    });
  }

  async declineAllRequests() {
    await fetch('https://api-core.wolvesville.com/friendRequests/decline/all', {
      method: 'POST',
      headers: getAuthenticationHeaders(this.client.token)
    });
  }

}

module.exports = FriendsManager;
