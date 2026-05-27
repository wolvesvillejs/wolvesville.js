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

    // SharedAvatarPublic — image is nested under `avatar`
    if ('avatar' in data) {
      /**
       * Shared avatar ID (only present for SharedAvatarPublic responses)
       * @type {?string}
       */
      this.id = data.id ?? null;

      /**
       * Avatar width
       * @type {number}
       */
      this.width = data.avatar.width;

      /**
       * Avatar height
       * @type {number}
       */
      this.height = data.avatar.height;

      /**
       * Avatar item composition (only present for SharedAvatarPublic responses)
       * @type {?Object}
       */
      this.items = data.items ?? null;

      /**
       * Background ID (only present for PublicGetAvatarImage responses)
       * @type {null}
       */
      this.backgroundId = null;

      Object.defineProperty(this, '_cdn', { value: { imageURL: data.avatar.url } });
    } else {
      // PublicGetAvatarImage — image fields are on the root
      /**
       * Shared avatar ID (only present for PublicGetAvatarImage responses when set)
       * @type {?string}
       */
      this.id = data.sharedAvatarId ?? null;

      /**
       * Avatar width
       * @type {number}
       */
      this.width = data.width;

      /**
       * Avatar height
       * @type {number}
       */
      this.height = data.height;

      /**
       * Background ID (only present for PublicGetAvatarImage responses)
       * @type {?string}
       */
      this.backgroundId = data.backgroundId ?? null;

      /**
       * Avatar item composition
       * @type {null}
       */
      this.items = null;

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
