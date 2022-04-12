const Base = require('./Base');
const BattlePassReward = require('./BattlePassReward.js');

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
     * @type {BattlePassReward[]}
     */
     this.rewards = data.battlePassSeason.rewards.map((_, tier) => {
       const reward = data.battlePassSeason.rewards[tier];
       return new BattlePassReward(client, Object.assign(reward, {
         tier: data.battlePassSeason.rewards.indexOf(reward),
         claimed: data.battlePassSeason.rewards.indexOf(reward) <= this.tier ? true : false
       }));
     });

     /**
      * Battle pass duration.
      * @type {number}
      */
    this.duration = data.battlePassSeason.durationInDays;

    /**
     * Battle pass start timestamp.
     * @type {number}
     */
    this.startTimestamp = new Date(data.battlePassSeason.startTime).getTime();

    /**
     * Battle pass end timestamp.
     * @type {number}
     */
    this.endTimestamp = new Date(this.startTimestamp + this.duration * 24 * 60 * 60 * 1000).getTime();
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
