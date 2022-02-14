const PlayerManager = require('../managers/PlayerManager');
const ClanManager = require('../managers/ClanManager');
const FriendManager = require('../managers/FriendManager');
const RoleManager = require('../managers/RoleManager');
const LeaderboardManager = require('../managers/LeaderboardManager');
const GameManager = require('../managers/GameManager');
const ClientPlayer = require('../structures/ClientPlayer');
const { CORE_API_URL, AUTH_API_URL } = require('../util/Constants');
const { getAuthenticationHeaders, getBodyHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Wolvesville client.
 */
class Client {
  constructor(options) {
    Object.defineProperty(this, 'refreshToken', { writable: true });
    this.players = new PlayerManager(this);
    this.friends = new FriendManager(this);
    this.clans = new ClanManager(this);
    this.roles = new RoleManager(this);
    this.leaderboards = new LeaderboardManager(this);
    this.games = new GameManager(this);
  }

  /**
   * Is client token expired.
   * @returns {Date}
   * @readonly
   */
  static get expired() {
    if(!this.refreshToken || typeof this.refreshToken !== 'string') {
      throw new Error('REFRESH_TOKEN_NOT_FOUND');
    }

    return new Date(this.lastTokenRefreshTimestamp).getTime() + 60 * 60 * 1000 < Date.now();
  }

  /**
   * Login.
   * @param {Object} credentials Credentials.
   * @param {string} credentials.email Email.
   * @param {string} credentials.password Password.
   * @returns {Client}
   */
  async login(credentials) {
    if(!credentials || typeof credentials !== 'object') throw new Error('INVALID_CREDENTIALS_FORMAT');

    const request = await fetch(`${AUTH_API_URL}/players/signInWithEmailAndPassword`, {
      method: 'POST',
      headers: getBodyHeaders(),
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const response = await request.json();

    if(response.message) throw new Error('INVALID_CREDENTIALS');
    this.token = response.idToken;
    this.refreshToken = response.refreshToken;
    this.lastTokenRefreshTimestamp = new Date().toISOString();
    this.upper = setInterval(() => this.tokenRefresh(), 55 * 60 * 1000);
    return this;
  }

  /**
   * Refresh client token.
   */
  async tokenRefresh() {
    if(!this.refreshToken || typeof this.refreshToken !== 'string') throw new Error('REFRESH_TOKEN_NOT_FOUND');

    const request = await fetch(`${AUTH_API_URL}/players/createIdToken`, {
      method: 'POST',
      headers: getBodyHeaders(),
      body: JSON.stringify({
        refreshToken: this.refreshToken
      })
    });
    const response = await request.json();

    if(response.code) throw new Error('INVALID_REFRESH_TOKEN');
    this.token = response.idToken;
  }

  /**
   * Destroy client.
   */
  destroy() {
    this.refreshToken = null;
    this.token = null;
    this.upper = clearInterval(this.upper);
  }

  /**
   * Fetch player associated to the client.
   * @returns {ClientPlayer}
   */
  async fetchPlayer() {
    const request = await fetch(`${CORE_API_URL}/players/me`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.token)
    });
    const response = await request.json();
    return new ClientPlayer(this, response);
  }

}

module.exports = Client;
