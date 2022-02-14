const Base = require('./Base');

/**
 * Represents a daily reward.
 * @extends {Base}
 */
class DailyReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward day.
     * @type {number}
     */
    this.day = data.day;

    /**
     * Reward type.
     * @type {string}
     */
    this.type = data.type;

    /**
     * Reward day.
     * @type {number}
     */
    if(this.type === 'AVATAR_ITEM') {
      /**
       * Item id.
       * @type {?string}
       */
      this.itemId = data.avatarItemId;
    } else {
      /**
       * Reward amount.
       * @type {?number}
       */
      this.amount = data.amount;
    }

    if(this.type === 'TALISMAN') {
      /**
       * Is an unknown talisman.
       * @type {?boolean}
       */
      this.unknown = data.unknown;
    }

    if(data.canBeClaimedDate) {
      /**
       * Reward claim timestamp.
       * @type {string}
       */
      this.claimTimestamp = data.canBeClaimedDate;
    }

    /**
     * Is the reward claimed.
     * @type {boolean}
     */
    this.claimed = data.claimed;
  }
}

module.exports = DailyReward;
