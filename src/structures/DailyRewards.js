const Base = require('./Base');
const DailyReward = require('./DailyReward');
const { Collection } = require('@discordjs/collection');

/**
 * Represents daily rewards.
 * @extends {Base}
 */
class DailyRewards extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Daily rewards offset.
     * @type {number}
     */
    this.offset = data.offset;

    /**
     * Are daily rewards active.
     * @type {boolean}
     */
    this.active = !data.recentGameWinRequired;

    /**
     * Daily rewards claim timestamp.
     * @type {string}
     */
    this.claimTimestamp = data.rewards.find(reward => reward.canBeClaimedDate).canBeClaimedDate;

    /**
     * Daily rewards.
     * @type {Collection<DailyReward>}
     */
    this.rewards = new Collection();

    for (const reward of data.rewards) {
      reward.day = this.offset + data.rewards.indexOf(reward);
      this.rewards.set(reward.day.toString(), new DailyReward(client, reward));
    }
  }

  /**
   * Next daily reward.
   * @returns {DailyReward}
   * @readonly
   */
  get next() {
    return this.rewards.find(reward => reward.claimed === false);
  }

  /**
   * Is next daily reward claimable.
   * @returns {boolean}
   * @readonly
   */
  get available() {
    return this.active && Date.now() > this.claimTimestamp;
  }

}

module.exports = DailyRewards;
