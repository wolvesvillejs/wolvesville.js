const CacheManager = require('./CacheManager');
const Friend = require('../structures/Friend');
const { Collection } = require('@discordjs/collection');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Manages API methods for Friends.
 * @extends {BaseManager}
 */
class FriendManager extends CacheManager {
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
      const data = new Friend(this.client, friend)
      fetchedFriends.set(friend.id, this._add(data));
    }

    return fetchedFriends;
  }

}

module.exports = FriendManager;
