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
   * Required fields: shirtId and bodyPaintId
   * Optional fields: hairId, glassesId, hatId, gravestoneId, frontId, backId, eyesId, badgeId, maskId, mouthId
   * @param {Object} items Object containing avatar item IDs
   * @param {string} items.shirtId Required shirt item ID
   * @param {string} items.bodyPaintId Required body paint item ID
   * @param {?string} [items.hairId] Optional hair item ID
   * @param {?string} [items.glassesId] Optional glasses item ID
   * @param {?string} [items.hatId] Optional hat item ID
   * @param {?string} [items.gravestoneId] Optional gravestone item ID
   * @param {?string} [items.frontId] Optional front item ID
   * @param {?string} [items.backId] Optional back item ID
   * @param {?string} [items.eyesId] Optional eyes item ID
   * @param {?string} [items.badgeId] Optional badge item ID
   * @param {?string} [items.maskId] Optional mask item ID
   * @param {?string} [items.mouthId] Optional mouth item ID
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
