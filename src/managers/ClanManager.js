const BaseManager = require('./BaseManager');
const ClanQuerier = require('../structures/ClanQuerier');
const ClanLeaderboard = require('../structures/ClanLeaderboard');
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

    const params = '';

    if(onlyOpen && typeof onlyOpen !== 'boolean' || notFull && typeof notFull !== 'boolean') throw new Error('AN_OPTION_MUST_BE_A_BOOLEAN');
    if(typeof onlyOpen !== 'boolean' || typeof notFull !== 'boolean') throw new Error('AN_OPTION_MUST_BE_A_BOOLEAN');

    if(options.levelMax && options.levelMax >= 1 && options.levelMax <= 100) {
      params += `&minLevelMax=${options.levelMax}`;
    } else if(options.levelMax) {
      throw new Error('INVALID_OPTION_VALUE');
    }

    if(options.levelMin && options.levelMin >= 1 && options.levelMin <= 100) {
      params += `&minLevelMin=${options.levelMin}`;
    } else if(options.levelMin) {
      throw new Error('INVALID_OPTION_VALUE');
    }

    if(options.language && ['aq', 'ar', 'at', 'au', 'ax', 'az', 'be', 'bg', 'bh', 'bm', 'bn', 'br', 'bs', 'bw', 'by', 'ca', 'cd', 'cf', 'ch', 'ck', 'cl', 'cn', 'co', 'cr', 'cy', 'cz', 'de', 'dk', 'do', 'dz', 'ee', 'es', 'eu', 'fi', 'fj', 'fr', 'gb', 'gn', 'gr', 'gt', 'hk', 'hr', 'hu', 'id', 'ie', 'il', 'im', 'in', 'is', 'it', 'jm', 'jp', 'kh', 'kp', 'kr', 'kw', 'kz', 'la', 'lr', 'lt', 'lu', 'ma', 'md', 'mn', 'mx', 'my', 'nc', 'nl', 'no', 'np', 'nz', 'pa', 'pe', 'ph', 'pk', 'pl', 'ps', 'pt', 'py', 'ro', 'rs', 'ru', 'se', 'sg', 'si', 'sk', 'so', 'sr', 'sy', 'th', 'tr', 'tw', 'ua', 'ug', 'us', 'uy', 'va', 'vi', 'vn', 'ye', 'za', 'olympics', 'united-nations', 'wales', 'en', 'ms', 'cs'].includes(options.language)) {
      params += `&language=${options.language}`;
    } else if(options.language) {
      throw new Error('INVALID_OPTION_VALUE');
    }

    if(options.joinType && ['PUBLIC', 'JOIN_BY_REQUEST', 'PRIVATE'].includes(options.joinType)) {
      params += `&joinType=${options.joinType}`;
    } else if(options.joinType) {
      throw new Error('INVALID_OPTION_VALUE');
    }

    if(options.searchType) {
      params += `&searchType=${options.searchType}`;
    } else if(options.searchType) {
      throw new Error('INVALID_OPTION_VALUE');
    }

    if(options.sortBy && ['XP', 'CREATION_TIME', 'QUEST_HISTORY_COUNT', 'NAME', 'MIN_LEVEL'].includes(options.sortBy)) {
      params += `&sortBy=${options.sortBy}`;
    } else if(options.sortBy) {
      throw new Error('INVALID_OPTION_VALUE');
    }

    if(options.notFull && typeof options.notFull !== 'boolean') {
      params += `&notFull=true`;
    } else if(options.notFull) {
      throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
    }

    const request = await fetch(`${this.client.options.http.api.core}/clans/v2/ranking?onlyOpen=${options.onlyOpen || false}`), {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new ClanQuerier(this.client, response);
  }

}

module.exports = ClanManager;
