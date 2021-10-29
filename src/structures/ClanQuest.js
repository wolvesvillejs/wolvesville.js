const Base = require('./Base');
const ClanQuestReward = require('./ClanQuestReward');
const { CDN_URL } = require('../util/Constants');

class ClanQuest extends Base {
  constructor(client, data) {
    super(client);
    this.name = data.imgName;
    this.id = data.id;
    this.type = data.isPurchasableWithGems ? 1 : 0;
    this.rewards = data.rewards.map(reward => new ClanQuestReward(client, reward));
  }

  get imageURL() {
    return `${CDN_URL}/promotions/${this.name}.jpg`;
  }

}

module.exports = ClanQuest;
