'use strict';

const Base = require('./Base');
const ClanQuestReward = require('./ClanQuestReward');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a clan quest.
 * @extends {Base}
 */
class ClanQuest extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Quest id
     * @type {string}
     */
    this.id = data.id;
    /**
     * Quest name
     * @type {string}
     */
    this.name = data.promoImageUrl.slice(`${client.rest.options.cdn.items}/promos/`.length, -4);

    /**
     * Quest type
     * @type {number}
     */
    this.type = data.purchasableWithGems ? ItemTypes.GEM : ItemTypes.GOLD;

    /**
     * Quest rewards
     * @type {ClanQuestReward[]}
     */
    this.rewards = data.rewards.map(reward => new ClanQuestReward(client, reward));

    Object.defineProperty(this, '_cdn', {
      imageURL: data.promoImageUrl,
    });
  }

  /**
   * Get quest image url
   * @returns {string}
   */
  imageURL() {
    return `${this.client.rest.options.cdn.items}/promos/${this.name}.jpg`;
  }
}

module.exports = ClanQuest;
