const BaseManager = require('./BaseManager');
const CustomGame = require('../structures/CustomGame');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class GameManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async fetchCustom(locale) {
    if(!locale || typeof locale !== 'string') throw new Error('INVALID_LOCALE_FORMAT');
    if(!['en', 'de', 'fr', 'tr', 'pt', 'th', 'nl', 'es', 'ru', 'vi', 'it', 'ms' ,'ro', 'cs'].includes(locale)) throw new Error('INCORRECT_LOCALE');
    const request = await fetch(`https://api-game.wolvesville.com/api/public/game/custom?language=${locale}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.openGames.map(game => new CustomGame(this.client, game));
  }

}

module.exports = GameManager;
