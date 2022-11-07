'use strict';

const Base = require('./Base');
const BattlePassReward = require('./BattlePassReward.js');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a battle pass season.
 * @extends {Base}
 */
class BattlePassSeason extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Battle pass season
     * @type {number}
     */
    this.season = data.number + 1;

    /**
     * Battle pass xp required to complete a tier
     * @type {number}
     */
    this.tierXpRequired = data.xpPerReward;

    /**
     * Battle pass rewards
     * @type {BattlePassReward[]}
     */
    this.rewards = data.rewards.map(
      (reward, tier) =>
        new BattlePassReward(
          client,
          Object.assign(reward, {
            tier,
          }),
        ),
    );

    /**
     * Battle pass price in gold
     * @type {number}
     */
    this.price = data.goldPrice;

    /**
     * Battle pass price to skip tier in gold
     * @type {number}
     */
    this.goldSkipPrice = data.goldPricePerReward;

    /**
     * Battle pass price to skip tier in gems
     * @type {number}
     */
    this.gemSkipPrice = data.gemPricePerReward;

    /**
     * Season duration
     * @type {number}
     */
    this.duration = data.durationInDays;

    /**
     * Season start timestamp
     * @type {number}
     */
    this.startTimestamp = new Date(data.startTime).getTime();

    /**
     * Season end timestamp
     * @type {number}
     */
    this.endTimestamp = new Date(this.startTimestamp + this.duration * 24 * 60 * 60 * 1000).getTime();

    /**
     * Season background
     * @type {Background}
     */
    this.background = client.items.resolve(data.seasonBackgroundId, ItemTypes.BACKGROUND);

    Object.defineProperty(this, '_cdn', {
      iconURL: data.iconUrl,
    });
  }

  /**
   * Battle pass tier
   * @type {number}
   * @readonly
   */
  get tier() {
    return (this.xp / this.tierXpRequired) | 0;
  }

  /**
   * Battle pass tier xp
   * @type {number}
   * @readonly
   */
  get progress() {
    return this.xp % this.tierXpRequired;
  }

  /**
   * Whether battle pass completed
   * @type {boolean}
   * @readonly
   */
  get completed() {
    return this.xp === this.tierXpRequired * 100;
  }
}

module.exports = BattlePassSeason;
