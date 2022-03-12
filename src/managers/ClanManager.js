const BaseManager = require('./BaseManager');
const ClanQuerier = require('../structures/ClanQuerier');
const Clan = require('../structures/Clan');
const ClientClan = require('../structures/ClientClan');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class ClanManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  /**
   * Fetch clan by member id.
   * @returns {Clan}
   */
  async fetchByMemberId(id) {
    if(!id || typeof id !== 'string' || !Number.isInteger(id)) throw new Error('INVALID_CLAN_MEMBER_ID_FORMAT');
    const request = await fetch(`${this.client.options.http.api.core}/clans/byPlayer?playerId=${id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new Clan(this.client, response);
  }

  async #fetchMinimalByName(name) {
    if(!name || typeof name !== 'string') throw new Error('INVALID_CLAN_NAME_FORMAT');
    const request = await fetch(`${this.client.options.http.api.core}/clans/v2/search?name=${name}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    return await request.json();
  }

  /**
   * Fetch clan by name.
   * @returns {Clan}
   */
  async fetchByName(name) {
    const response = await this.#fetchMinimalByName(name);
    if(!response.find(c => c.name === name)) throw new Error('CLAN_NOT_FOUND');
    return await this.fetchById(response.find(clan => clan.name === name).id);
  }

  async fetchSeveralByName(name) {
    const response = await this.#fetchMinimalByName(name);
    return new ClanQuerier(this.client, response);
  }

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
   * @returns {Clan}
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
   * Query clans.
   * @returns {ClanQuerier}
   */
  async query(options) {

    var params = '';

    if(options.name) {
      if(typeof options.name !== 'string') throw new Error('OPTION_VALUE_MUST_BE_A_STRING');
      params += `?name=${options.name || ''}`;
    }

    if(options.levelMax) {
      if(options.levelMax < 1 || options.levelMax > 100) throw new Error('OPTION_VALUE_OUT_OF_RANGE');
      if(options.levelMin && options.levelMin > options.levelMax) throw new Error('INVALID_OPTION_VALUES');
      params += `&minLevelMax=${options.levelMax}`;
    }

    if(options.levelMin) {
      if(options.levelMin < 1 || options.levelMin > 100) throw new Error('OPTION_VALUE_OUT_OF_RANGE');
      if(options.levelMax && options.levelMin > options.levelMax) throw new Error('INVALID_OPTION_VALUES');
      params += `&minLevelMax=${options.levelMin}`;
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
      params += `&language=${options.language}`;
    }

    if(options.joinType) {
      if(!['PUBLIC', 'JOIN_BY_REQUEST', 'PRIVATE'].includes(options.joinType)) throw new Error('INVALID_OPTION_VALUE');
      params += `&joinType=${options.joinType}`;
    }

    if(options.sortBy) {
      if(!['XP', 'CREATION_TIME', 'QUEST_HISTORY_COUNT', 'NAME', 'MIN_LEVEL'].includes(options.sortBy)) throw new Error('INVALID_OPTION_VALUE');
      params += `&sortBy=${options.sortBy}`;
    }

    if(options.notFull) {
      if(typeof options.notFull !== 'boolean') throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
      params += `&notFull=${options.notFull}`;
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
