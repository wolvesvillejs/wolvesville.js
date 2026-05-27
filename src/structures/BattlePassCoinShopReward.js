'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a battle pass coin shop reward.
 * @extends {Base}
 */
class BattlePassCoinShopReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Starting block index for this reward
     * @type {number}
     */
    this.startBlock = data.startBlock;

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
     * Associated avatar item id (if type is AVATAR_ITEM)
     * @type {?string}
     */
    this.avatarItemId = data.avatarItemId ?? null;

    /**
     * Cost in battle pass coins
     * @type {number}
     */
    this.costInBattlePassCoins = data.costInBattlePassCoins;
  }
}

module.exports = BattlePassCoinShopReward;
