'use strict';

const CacheManager = require('./CacheManager');
const Player = require('../structures/Player');
const Routes = require('../util/Routes');
const { isUUID } = require('../util/Util');

/**
 * Manages API methods for Players.
 * @extends {BaseManager}
 */
class PlayerManager extends CacheManager {
  /**
   * Data that resolves to give a Player object.
   * @typedef {string|Object|Player|ClanChatMessageAuthor|ClanMember|ClientClanMember
   * |ClanHistoryPlayer|ClanLedgerFieldPlayer|ClanQuestParticipant} PlayerResolvable
   */

  /**
   * Fetch a player by their id or username.
   * @param {PlayerResolvable} player The player to fetch
   * @param {Object} [options={}] Options
   * @returns {Promise<Player>}
   */
  async fetch(player, options = {}) {
    player = this.resolve(player);

    if (!options.force) {
      const existing = player.id ? this.cache.get(player) : this.cache.find(item => item === player);
      if (existing) return existing;
    }

    const response = player.id
      ? await this.client.rest.get(Routes.PLAYER(player.id))
      : await this.client.rest.get(Routes.PLAYER_BY_USERNAME(), { query: player });
    if (response.code === 404) throw new Error('PLAYER_NOT_FOUND');

    const data = new Player(this.client, response);
    return this._add(data);
  }

  /**
   * Resolves a {@link UserResolvable} to an object that contains a player id or username.
   * @param {PlayerResolvable} player The PlayerResolvable to identify
   * @returns {Object}
   */
  resolve(player) {
    if (typeof player === 'object') {
      if ('id' in player) {
        if (typeof player.id !== 'string' || !isUUID(player.id)) throw new Error('INVALID_PLAYER_ID_FORMAT');
      } else if ('username' in player) {
        if (typeof player.username !== 'string') throw new Error('INVALID_PLAYER_USERNAME_FORMAT');
      }
    } else if (typeof player === 'string') {
      player = isUUID(player) ? { id: player } : { username: player };
    }

    if ('username' in player && player.username.length < 3) throw new Error('PLAYER_USERNAME_TOO_SHORT');

    return player;
  }
}

module.exports = PlayerManager;
