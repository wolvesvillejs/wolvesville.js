const BaseManager = require('./BaseManager');
const FriendList = require('../structures/FriendList');
const FriendPlayer = require('../structures/FriendPlayer');
const { getAuthenticationHeaders, getAuthenticationHeadersContainsBody } = require('../util/Headers');
const fetch = require('node-fetch');

class FriendsManager extends BaseManager {
  constructor(client) {
    super(client);
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

}

module.exports = FriendsManager;
