const BaseClient = require('./BaseClient');
const PlayerManager = require('../managers/PlayerManager');
const ClanManager = require('../managers/ClanManager');
const FriendManager = require('../managers/FriendManager');
const RoleManager = require('../managers/RoleManager');
const LeaderboardManager = require('../managers/LeaderboardManager');
const GameManager = require('../managers/GameManager');
const ClientPlayer = require('../structures/ClientPlayer');
const { getAuthenticationHeaders, getBodyHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Wolvesville client.
 */
class Client extends BaseClient {
  /**
   * @param {ClientOptions} options Options for the client
   */
  constructor(options) {
    super(options);

    Object.defineProperty(this, 'refreshToken', { writable: true });

    /**
     * The player manager of the client.
     * @type {PlayerManager}
     */
    this.players = new PlayerManager(this);

    /**
     * The friend manager of the client.
     * @type {FriendManager}
     */
    this.friends = new FriendManager(this);

    /**
     * The clan manager of the client.
     * @type {ClanManager}
     */
    this.clans = new ClanManager(this);

    /**
     * The role manager of the client.
     * @type {RoleManager}
     */
    this.roles = new RoleManager(this);

    /**
     * The leaderboard manager of the client.
     * @type {LeaderboardManager}
     */
    this.leaderboards = new LeaderboardManager(this);

    /**
     * The game manager of the client.
     * @type {GameManager}
     */
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
   * @param {Object} credentials Credentials
   * @param {string} credentials.email Email
   * @param {string} credentials.password Password
   * @returns {Client}
   */
  async login(credentials) {

    if(process.env.WOLVESVILLE_EMAIL && process.env.WOLVESVILLE_PASSWORD) {
      credentials = {
        email: process.env.WOLVESVILLE_EMAIL,
        password: process.env.WOLVESVILLE_PASSWORD
      }
    }

    if(!credentials || typeof credentials !== 'object') throw new Error('INVALID_CREDENTIALS_FORMAT');
    const request = await fetch(`${this.options.http.api.auth}/players/signInWithEmailAndPassword`, {
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
    this.upper = setInterval(() => this.tokenRefresh(), this.options.tokenRefreshInterval);
    return this;
  }

  /**
   * Refresh client token.
   */
  async tokenRefresh() {
    if(!this.refreshToken || typeof this.refreshToken !== 'string') throw new Error('REFRESH_TOKEN_NOT_FOUND');

    const request = await fetch(`${this.options.http.api.auth}/players/createIdToken`, {
      method: 'POST',
      headers: getBodyHeaders(),
      body: JSON.stringify({
        refreshToken: this.refreshToken
      })
    });
    const response = await request.json();

    if(response.code) throw new Error('INVALID_REFRESH_TOKEN');
    this.token = response.idToken;
    this.lastTokenRefreshTimestamp = new Date().toISOString();
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
   * @param {Object} [options={}] Options
   * @returns {ClientPlayer}
   */
  async fetchPlayer(options = {}) {

    if(!options.force) {
      const existing = this.players.cache.find(player => player.own);
      if(existing) return existing;
    }

    const request = await fetch(`${this.options.http.api.core}/players/me`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.token)
    });
    const response = await request.json();

    const data = new ClientPlayer(this, response);
    return this.players._add(data);
  }

}

module.exports = Client;
