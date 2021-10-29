const Base = require('./Base');
const ClanQuest = require('./ClanQuest');
const { CDN_URL } = require('../util/Constants');

class AvailableClanQuests extends Base {
  constructor(client, data) {
    super(client);
    this.quests = data.quests.map(quest => new ClanQuest(client, quest));
    this.baseGoldPrice = data.baseGolPrice;
    this.baseGemPrice = data.baseGemPrice;
    this.baseGoldPriceShuffleQuests = data.baseGoldPriceShuffleQuests;
    this.baseGoldPriceSkipQuestWait = data.baseGoldPriceSkipQuestWait;
    this.memberGemPrice = data.memberGemPrice;
    this.memberGoldPrice = data.memberGoldPrice;
    this.memberGoldPriceShuffleQuests = data.memberGoldPriceShuffleQuests;
    this.memberGoldPriceSkipQuestWait = data.memberGoldPriceSkipQuestWait;
    this.endTime = new Date(data.endTime);
  }

}

module.exports = AvailableClanQuests;
