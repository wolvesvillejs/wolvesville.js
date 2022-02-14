const Base = require('./Base');
const ClanQuestReward = require('./ClanQuestReward');
const { CDN_URL } = require('../util/Constants');

/**
 * Represents a clan quest.
 * @extends {Base}
 */
class ClanQuest extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Quest name.
     * @type {string}
     */
    this.name = data.imgName;

    /**
     * Quest id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Quest type.
     * @type {number}
     */
    this.type = data.isPurchasableWithGems ? 1 : 0;

    /**
     * Quest rewards.
     * @type {Array<ClanQuestReward>}
     */
    this.rewards = data.rewards.map(reward => new ClanQuestReward(client, reward));
  }

  /**
   * Quest image url.
   * @returns {string}
   * @readonly
   */
  get imageURL() {
    return `${CDN_URL}/promotions/${this.name}.jpg`;
  }

}

module.exports = ClanQuest;
