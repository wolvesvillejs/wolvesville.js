const Base = require('./Base');
const BattlePassReward = require('./BattlePassReward.js');
const { Collection } = require('@discordjs/collection');

/**
 * Represents a battle pass.
 * @extends {Base}
 */
class BattlePass extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Battle pass price in gold.
     * @type {number}
     */
    this.buyPrice = data.battlePassSeason.goldPrice;

    /**
     * Battle pass price to skip tier.
     * @type {number}
     */
    this.skipPrice = data.battlePassSeason.goldPricePerReward;

    /**
     * Battle pass xp required to complete a tier.
     * @type {number}
     */
    this.xpRequiredPerTier = data.battlePassSeason.xpPerReward;

    /**
     * Battle pass season.
     * @type {number}
     */
    this.season = data.battlePassSeason.number + 1;

    /**
     * Xp done in battle pass.
     * @type {number}
     */
    this.xp = data.battlePass.xp;

    /**
     * Is battle pass claimed.
     * @type {boolean}
     */
    this.claimed = data.battlePass.claimed;

    /**
     * Battle pass rewards.
     * @type {Collection<string, BattlePassReward>}
     */
     this.rewards = new Collection();

     for (const index in data.battlePassSeason.rewards) {
       const reward = data.battlePassSeason.rewards[index];
       this.rewards.set(
         index,
         new BattlePassReward(client, Object.assign(reward, {
           tier: data.battlePassSeason.rewards.indexOf(reward),
           claimed: data.battlePassSeason.rewards.indexOf(reward) <= this.tier ? true : false
         }))
       );
     }

     /**
      * Battle pass duration.
      * @type {number}
      */
    this.duration = data.battlePassSeason.durationInDays;

    /**
     * Battle pass start timestamp.
     * @type {string}
     */
    this.startTimestamp = data.battlePassSeason.startTime;

    /**
     * Battle pass end timestamp.
     * @type {string}
     */
    this.endTimestamp = new Date(new Date(this.startTimestamp).getTime() + this.duration * 24 * 60 * 60 * 1000).toISOString();
  }

  /**
   * Battle pass tier.
   * @returns {number}
   * @readonly
   */
  get tier() {
    return this.xp / this.xpRequiredPerTier | 0;
  }

  /**
   * Battle pass tier xp.
   * @returns {number}
   * @readonly
   */
  get progress() {
    return this.xp % this.xpRequiredPerTier;
  }

  /**
   * Is battle pass completed.
   * @returns {boolean}
   * @readonly
   */
  get completed() {
    return this.xp === this.xpRequiredPerTier * 100;
  }

}

module.exports = BattlePass;
