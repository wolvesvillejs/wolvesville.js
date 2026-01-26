'use strict';

const BaseManager = require('./BaseManager');
const Avatar = require('../structures/Avatar');
const Routes = require('../util/Routes');

/**
 * Manages API methods for avatars.
 * @extends {BaseManager}
 */
class AvatarManager extends BaseManager {
  /**
   * Fetch shared avatar ID for a player.
   * @param {string} playerId Player ID
   * @param {number} slotNumber Avatar slot number
   * @returns {Promise<string>}
   */
  async fetchSharedAvatarId(playerId, slotNumber) {
    if (!playerId) throw new Error('PLAYER_ID_REQUIRED');
    if (typeof slotNumber !== 'number') throw new Error('SLOT_NUMBER_MUST_BE_A_NUMBER');

    const response = await this.client.rest.get(Routes.AVATARS_SHARED_ID(playerId, slotNumber));
    return response;
  }

  /**
   * Fetch avatar by ID.
   * @param {string} avatarId Avatar ID
   * @returns {Promise<Avatar>}
   */
  async fetch(avatarId) {
    if (!avatarId) throw new Error('AVATAR_ID_REQUIRED');

    const response = await this.client.rest.get(Routes.AVATARS(avatarId));
    return new Avatar(this.client, response);
  }

  /**
   * Create a shared avatar by specifying item IDs.
   * @param {Object} items Object containing avatar item IDs
   * @returns {Promise<Avatar>}
   */
  async createSharedAvatar(items) {
    if (!items || typeof items !== 'object') throw new Error('ITEMS_MUST_BE_AN_OBJECT');
    if (!items.shirtId) throw new Error('SHIRT_ID_REQUIRED');
    if (!items.bodyPaintId) throw new Error('BODY_PAINT_ID_REQUIRED');

    const response = await this.client.rest.post(Routes.AVATARS_SHARED_CREATE(), {
      data: items,
    });
    return new Avatar(this.client, response);
  }
}

module.exports = AvatarManager;
