const PlayerManager = require('../managers/PlayerManager');
const ClanManager = require('../managers/ClanManager');
const FriendManager = require('../managers/FriendManager');
const RoleManager = require('../managers/RoleManager');
const LeaderboardManager = require('../managers/LeaderboardManager');
const ClientPlayer = require('../structures/ClientPlayer');
const { FIREBASE_APP_API_KEY, CORE_API_URL } = require('../util/Constants');
const { getFirebaseHeaders, getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class Client {
  constructor(options) {
    Object.defineProperty(this, 'refreshToken', { writable: true });
    this.upper = setInterval(this.tokenRefresh, 55 * 60 * 1000);
    this.players = new PlayerManager(this);
    this.friends = new FriendManager(this);
    this.clans = new ClanManager(this);
    this.roles = new RoleManager(this);
    this.leaderboards = new LeaderboardManager(this);
  }

  static get expired() {
    if(!this.refreshToken || typeof this.refreshToken !== 'string') {
      throw new Error('REFRESH_TOKEN_NOT_FOUND');
    }

    return new Date(this.lastTokenRefreshTimestamp).getTime() + 60 * 60 * 1000 < Date.now();
  }

  async login(credentials) {
    if(!credentials || typeof credentials !== 'object') throw new Error('INVALID_CREDENTIALS_FORMAT');

    const request = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_APP_API_KEY}`, {
      method: 'POST',
      headers: getFirebaseHeaders(),
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        returnSecureToken: true
      })
    });
    const response = await request.json();

    if(response.error) throw new Error(response.error.message);
    this.refreshToken = response.refreshToken;
    this.lastTokenRefreshTimestamp = new Date(Date.now()).toISOString();
    await this.tokenRefresh();
    return this;
  }

  async tokenRefresh() {
    if(!this.refreshToken || typeof this.refreshToken !== 'string') throw new Error('REFRESH_TOKEN_NOT_FOUND');

    const request = await fetch(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_APP_API_KEY}`, {
      method: 'POST',
      headers: getFirebaseHeaders(),
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken
      })
    });
    const response = await request.json();

    if(response.error) throw new Error(response.error.message);
    this.token = response.access_token;
  }

  destroy() {
    this.refreshToken = null;
    this.token = null;
    clearInterval(this.upper);
  }

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
