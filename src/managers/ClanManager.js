const BaseManager = require('./BaseManager');
const ClanQuerier = require('../structures/ClanQuerier');
const Clan = require('../structures/Clan');
const ClientClan = require('../structures/ClientClan');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Manages API methods for Clans.
 * @extends {BaseManager}
 */
class ClanManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  /**
   * Fetch clan by player id.
   * @returns {Clan}
   */
  async fetchByPlayerId(id) {
    if(!id || typeof id !== 'string' || !Number.isInteger(id)) throw new Error('INVALID_CLAN_PLAYER_ID_FORMAT');
    const request = await fetch(`${this.client.options.http.api.core}/clans/byPlayer?playerId=${id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new Clan(this.client, response);
  }

  /**
   * Fetch clan by id.
   * @returns {Clan}
   */
  async fetchById(id) {
    if(!id || typeof id !== 'string') throw new Error('INVALID_CLAN_ID_FORMAT');
    const request = await fetch(`${this.client.options.http.api.core}/clans/${id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    if(request.status === 204) throw new Error('CLAN_NOT_FOUND');
    const response = await request.json();
    return new Clan(this.client, response);
  }

  /**
   * Fetch client player clan.
   * @returns {ClientClan}
   */
  async fetchOwn() {
    const request = await fetch(`${this.client.options.http.api.core}/clans/myClan`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    if(request.status === 204) throw new Error('NOT_IN_A_CLAN');
    const response = await request.json();
    return new ClientClan(this.client, response);
  }

  /**
   * Options for {@link Client#query}.
   * @typedef {Object} ClanQueryingOptions
   * @property {string} searchType What to query
   * @property {number} levelMin Minimum required level of clans
   * @property {number} levelMax Maximum required level of clans
   * @property {string} language Clans language
   * @property {string} joinType Clans join type
   * @property {boolean} notFull Whether to query only non-full clans
   */

  /**
   * Query clans.
   * @param {string} name Clan name to query
   * @param {ClanQueryingOptions} options Query options
   * @param {string} sorting Query order
   * @returns {ClanQuerier}
   */
  async query(name, options = {}, sorting) {

    var params = '';

    if(name && typeof name !== 'string') throw new Error('OPTION_VALUE_MUST_BE_A_STRING');
    params += `?name=${name || ''}`;

    if(options.searchType) {
      if(typeof options.searchType !== 'string') throw new Error('OPTION_VALUE_MUST_BE_A_STRING');
      if(['exactName', 'tag'].includes(options.searchType)) throw new Error('INVALID_OPTION_VALUE');
      params += `&searchType=${options.searchType}`;
    }

    if(options.levelMin) {
      if(typeof options.levelMin !== 'number') throw new Error('OPTION_VALUE_MUST_BE_A_NUMBER');
      if(options.levelMin < 1 || options.levelMin > 100) throw new Error('OPTION_VALUE_OUT_OF_RANGE');
      if(options.levelMax && options.levelMin > options.levelMax) throw new Error('INVALID_OPTION_VALUES');
      params += `&minLevelMin=${options.levelMin}`;
    }

    if(options.levelMax) {
      if(typeof options.levelMax !== 'number') throw new Error('OPTION_VALUE_MUST_BE_A_NUMBER');
      if(options.levelMax < 1 || options.levelMax > 100) throw new Error('OPTION_VALUE_OUT_OF_RANGE');
      if(options.levelMin && options.levelMin > options.levelMax) throw new Error('INVALID_OPTION_VALUES');
      params += `&minLevelMax=${options.levelMax}`;
    }

    if(options.language) {
      if(!['aq', 'ar', 'at', 'au', 'ax', 'az', 'be', 'bg', 'bh', 'bm', 'bn',
        'br', 'bs', 'bw', 'by', 'ca', 'cd', 'cf', 'ch', 'ck', 'cl', 'cn', 'co',
        'cr', 'cy', 'cz', 'de', 'dk', 'do', 'dz', 'ee', 'es', 'eu', 'fi', 'fj',
        'fr', 'gb', 'gn', 'gr', 'gt', 'hk', 'hr', 'hu', 'id', 'ie', 'il', 'im',
        'in', 'is', 'it', 'jm', 'jp', 'kh', 'kp', 'kr', 'kw', 'kz', 'la', 'lr',
        'lt', 'lu', 'ma', 'md', 'mn', 'mx', 'my', 'nc', 'nl', 'no', 'np', 'nz',
        'pa', 'pe', 'ph', 'pk', 'pl', 'ps', 'pt', 'py', 'ro', 'rs', 'ru', 'se',
        'sg', 'si', 'sk', 'so', 'sr', 'sy', 'th', 'tr', 'tw', 'ua', 'ug', 'us',
        'uy', 'va', 'vi', 'vn', 'ye', 'za', 'olympics', 'united-nations',
        'wales', 'en', 'ms', 'cs'].includes(options.language)) throw new Error('INVALID_OPTION_VALUE');
      params += `&language=${options.language.toUpperCase()}`;
    }

    if(options.joinType) {
      if(!['PUBLIC', 'JOIN_BY_REQUEST', 'PRIVATE'].includes(options.joinType)) throw new Error('INVALID_OPTION_VALUE');
      params += `&joinType=${options.joinType}`;
    }

    if(options.notFull) {
      if(typeof options.notFull !== 'boolean') throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
      params += `&notFull=${options.notFull}`;
    }

    if(sorting) {
      if(!['XP', 'CREATION_TIME', 'QUEST_HISTORY_COUNT', 'NAME', 'MIN_LEVEL'].includes(sorting)) throw new Error('INVALID_OPTION_VALUE');
      params += `&sortBy=${sorting}`;
    }

    const request = await fetch(`${this.client.options.http.api.core}/clans/v2/searchAdvanced${params}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new ClanQuerier(this.client, response);
  }

}

module.exports = ClanManager;
