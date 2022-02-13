const Base = require('./Base');

/**
 * Represents a battle pass reward.
 */
class BattlePassReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward tier.
     * @type {number}
     */
    this.tier = data.tier;

    /**
     * Is reward claimed.
     * @type {boolean}
     */
    this.claimed = data.claimed;

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

    if(data.avatarItemId || data.rosePackageId || data.emojiId || data.profileIconId) {
      /**
       * Reward item id.
       * @type {string}
       */
      this.itemId = data.avatarItemId || data.rosePackageId || data.emojiId || data.profileIconId;
    }
  }
}

module.exports = BattlePassReward;
