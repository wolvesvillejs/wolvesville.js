const CacheManager = require('./CacheManager');
const Player = require('../structures/Player');
const ClientPlayer = require('../structures/ClientPlayer');
const { isUUID } = require('../util/Util');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Manages API methods for Players.
 * @extends {BaseManager}
 */
class PlayerManager extends CacheManager {
  constructor(client) {
    super(client);
  }

  /**
   * Fetch few information from a player by its username.
   * @param {string} username Player username
   * @returns {Promise<Object>}
   * @private
   */
  async #fetchMinimalByUsername(username) {
    const request = await fetch(`${this.client.options.http.api.core}/players/search?username=${username}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    if(!response.length) throw new Error('PLAYER_NOT_FOUND');
    return response[0];
  }

  /**
   * Fetch a player by its username.
   * @param {string} username Player username
   * @param {Object} [options={}] Options
   * @returns {Promise<Player|ClientPlayer>}
   */
  async fetchByUsername(username, options = {}) {

    if(!options.force) {
      const existing = this.cache.find(player => player.username === username);
      if(existing) return existing;
    }

    if(!username || typeof username !== 'string') throw new Error('INVALID_PLAYER_USERNAME_FORMAT');
    if(username.length < 3) throw new Error('PLAYER_USERNAME_TOO_SHORT');
    const response = await this.#fetchMinimalByUsername(username);
    return await this.fetchById(response.id);
  }

  /**
   * Fetch a player by its username.
   * @param {string} id Player id
   * @param {Object} [options={}] Options
   * @returns {Promise<Player|ClientPlayer>}
   */
  async fetchById(id, options = {}) {

    if(!options.force) {
      const existing = this.cache.get(id);
      if(existing) return existing;
    }

    if(!id || typeof id !== 'string' || !isUUID(id)) throw new Error('INVALID_PLAYER_ID_FORMAT');
    const request = await fetch(`${this.client.options.http.api.core}/players/${id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    if(request.status === 204) throw new Error('PLAYER_NOT_FOUND');
    const response = await request.json();

    const data = response.xpTotal ? new ClientPlayer(this.client, response) : new Player(this.client, response);
    return this._add(data);
  }

}

module.exports = PlayerManager;
