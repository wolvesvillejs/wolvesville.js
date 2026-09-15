'use strict';

const Base = require('./Base');
const BattlePassCoinShopReward = require('./BattlePassCoinShopReward');

/**
 * Represents the battle pass coin shop.
 * @extends {Base}
 */
class BattlePassCoinShop extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Shop start timestamp
     * @type {number}
     */
    this.startTimestamp = new Date(data.startTime).getTime();

    /**
     * Shop duration in days
     * @type {number}
     */
    this.durationInDays = data.durationInDays;

    /**
     * Available rewards in the shop
     * @type {BattlePassCoinShopReward[]}
     */
    this.rewards = data.rewards.map(r => new BattlePassCoinShopReward(client, r));
  }
}

module.exports = BattlePassCoinShop;
