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
     * Challenge type
     * @type {string}
     */
    this.type = data.rewardInGold ? ItemTypes.GOLD : ItemTypes.ROLE_ICON;

    /**
     * Challenge description
     * @type {string}
     */
    this.description = data.description;

    /**
     * Challenge reward
     * @type {number}
     */
    this.reward = data.rewardInGold || client.items.resolve(data.rewardRoleIconId, ItemTypes.ROLE_ICON);

    /**
     * Challenge duration in days
     * @type {number}
     */
    this.duration = data.durationInDays;

    Object.defineProperty(this, '_cdn', {
      iconURL: data.iconUrl,
    });
  }
}

module.exports = BattlePassChallenge;
