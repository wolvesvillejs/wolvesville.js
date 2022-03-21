const BaseManager = require('./BaseManager');
const Friend = require('../structures/Friend');
const { Collection } = require('@discordjs/collection');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Manages API methods for Friends.
 * @extends {BaseManager}
 */
class FriendManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  /**
   * Fetch friends.
   * @returns {Collection<string, Friend>}
   */
  async fetch() {
    const request = await fetch(`${this.client.options.http.api.core}/friends`, {
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

  /**
   * Fetch friend requests.
   * @returns {Object}
   */
  async fetchRequests() {
    const request = await fetch(`${this.client.options.http.api.core}/friendRequests/pending`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

}

module.exports = FriendManager;
