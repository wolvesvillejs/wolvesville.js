'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a battle pass challenge.
 * @extends {Base}
 */
class BattlePassChallenge extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Challenge id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Challenge type (currency or item type of the reward)
     * @type {string}
     */
    this.type = data.rewardInGold
      ? ItemTypes.GOLD
      : data.rewardAvatarItemId
        ? ItemTypes.AVATAR_ITEM
        : ItemTypes.ROLE_ICON;

    /**
     * Challenge description
     * @type {string}
     */
    this.description = data.description;

    /**
     * Challenge target count to complete
     * @type {number}
     */
    this.target = data.target;

    /**
     * Challenge reward (gold amount, or resolved item)
     * @type {number|Item}
     */
    this.reward =
      data.rewardInGold ||
      client.items.resolve(data.rewardAvatarItemId, ItemTypes.AVATAR_ITEM) ||
      client.items.resolve(data.rewardRoleIconId, ItemTypes.ROLE_ICON);

    /**
     * Challenge duration in days
     * @type {number}
     */
    this.duration = data.durationInDays;

    /**
     * Challenge start timestamp
     * @type {number}
     */
    this.startTimestamp = new Date(data.startTime).getTime();

    Object.defineProperty(this, '_cdn', {
      value: { iconURL: data.iconUrl },
    });
  }
}

module.exports = BattlePassChallenge;
