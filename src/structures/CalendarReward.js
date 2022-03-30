const Base = require('./Base');

/**
 * Represents a calendar reward.
 * @extends {Base}
 */
class CalendarReward extends Base {
  constructor(client, data) {
    super(client);
    /**
     * Reward type.
     * @type {string}
     */
    this.type = data.type;

    /**
     * Reward amount.
     * @type {number}
     */
    if(data.amount > 1) {
      this.amount = data.amount;
    }

    if(['AVATAR_ITEM', 'EMOJI', 'LOADING_SCREEN', 'BACKGROUND'].includes(data.type)) {
      if(data.avatarItemIdMale) {
        /**
         * Male and female reward item ids.
         * @type {Object}
         */
        this.itemIds = {
          male: data.data.avatarItemIdMale,
          female: data.data.avatarItemIdFemale
        }
      } else {
        /**
         * Reward item id.
         * @type {string}
         */
        this.itemId = data.avatarItemId || data.emojiId || data.loadingScreenId || data.backgroundId;
      }
    }

    /**
     * Is reward claimed.
     * @type {boolean}
     */
    this.claimed = data.claimed;
  }
}

module.exports = CalendarReward;
