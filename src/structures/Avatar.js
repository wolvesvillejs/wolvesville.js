'use strict';

const Base = require('./Base');

/**
 * Represents an avatar.
 *
 * When returned by {@link AvatarManager#fetch} or {@link AvatarManager#createSharedAvatar}
 * this wraps a `SharedAvatarPublic` response (contains `id` and `items`).
 * When stored on a {@link Player#avatars} this wraps a `PublicGetAvatarImage` response
 * (contains `backgroundId` and optionally `sharedAvatarId`).
 * @extends {Base}
 */
class Avatar extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Shared avatar ID (present for SharedAvatarPublic; sharedAvatarId for PublicGetAvatarImage)
     * @type {?string}
     */
    this.id = null;

    /**
     * Avatar width in pixels
     * @type {?number}
     */
    this.width = null;

    /**
     * Avatar height in pixels
     * @type {?number}
     */
    this.height = null;

    /**
     * Background ID (only present for PublicGetAvatarImage responses)
     * @type {?string}
     */
    this.backgroundId = null;

    /**
     * Avatar item composition (only present for SharedAvatarPublic responses)
     * @type {?Object}
     */
    this.items = null;

    // SharedAvatarPublic — image is nested under `avatar`
    if ('avatar' in data) {
      this.id = data.id ?? null;
      this.width = data.avatar.width;
      this.height = data.avatar.height;
      this.items = data.items ?? null;
      Object.defineProperty(this, '_cdn', { value: { imageURL: data.avatar.url } });
    } else {
      // PublicGetAvatarImage — image fields are on the root
      this.id = data.sharedAvatarId ?? null;
      this.width = data.width;
      this.height = data.height;
      this.backgroundId = data.backgroundId ?? null;
      Object.defineProperty(this, '_cdn', { value: { imageURL: data.url } });
    }
  }

  /**
   * Get avatar image URL.
   * @returns {string}
   */
  imageURL() {
    return this._cdn.imageURL;
  }
}

module.exports = Avatar;
