'use strict';

const Base = require('./Base');

/**
 * Represents an event reward.
 * @extends {Base}
 */
class EventReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward type
     * @type {string}
     */
    this.type = data.type;

    /**
     * Reward display category
     * @type {string}
     */
    this.displayCategory = data.displayCategory;

    /**
     * Avatar item id
     * @type {?string}
     */
    this.avatarItemId = data.avatarItemId ?? null;

    /**
     * Role icon id
     * @type {?string}
     */
    this.roleIconId = data.roleIconId ?? null;

    /**
     * Emoji id
     * @type {?string}
     */
    this.emojiId = data.emojiId ?? null;

    /**
     * Background id
     * @type {?string}
     */
    this.backgroundId = data.backgroundId ?? null;

    /**
     * Loading screen id
     * @type {?string}
     */
    this.loadingScreenId = data.loadingScreenId ?? null;

    /**
     * Role id
     * @type {?string}
     */
    this.roleId = data.roleId ?? null;
  }
}

module.exports = EventReward;
