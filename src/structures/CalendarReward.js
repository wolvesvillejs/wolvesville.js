'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a calendar reward.
 * @extends {Base}
 */
class CalendarReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward type
     * @type {string}
     */
    this.type = ItemTypes[data.type] ?? data.type;

    /**
     * Reward amount
     * @type {number}
     */
    this.amount = data.amount;

    /**
     * Avatar item id (gender-neutral)
     * @type {?string}
     */
    this.avatarItemId = data.avatarItemId ?? null;

    /**
     * Avatar item id for male gender
     * @type {?string}
     */
    this.avatarItemIdMale = data.avatarItemIdMale ?? null;

    /**
     * Avatar item id for female gender
     * @type {?string}
     */
    this.avatarItemIdFemale = data.avatarItemIdFemale ?? null;

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
     * Emoji id
     * @type {?string}
     */
    this.emojiId = data.emojiId ?? null;

    /**
     * Rose package id
     * @type {?string}
     */
    this.rosePackageId = data.rosePackageId ?? null;

    /**
     * Role icon id
     * @type {?string}
     */
    this.roleIconId = data.roleIconId ?? null;

    /**
     * Body paint id
     * @type {?string}
     */
    this.bodyPaintId = data.bodyPaintId ?? null;
  }
}

module.exports = CalendarReward;
