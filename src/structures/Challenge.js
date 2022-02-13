const Base = require('./Base');

/**
 * Represents a challenge.
 */
class Challenge extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Challenge description.
     * @type {string}
     */
    this.description = data.description;

    /**
     * Challenge target.
     * @type {string}
     */
    this.target = data.challengeTarget;

    /**
     * Challenge progress.
     * @type {number}
     */
    this.progress = data.challengeProgress;

    /**
     * Challenge reward.
     * @type {Object}
     */
    this.reward = {
      type: data.rewardInXp ? 0 : 1,
      amount: data.rewardInGems || data.rewardInXp
    }
  }

  /**
   * Is challenge completed.
   * @returns {boolean}
   * @readonly
   */
  get completed() {
    return this.progress === this.target ? true : false;
  }

}

module.exports = Challenge;
