const Base = require('./Base');
const BattlePassReward = require('./BattlePassReward.js');

class BattlePass extends Base {
  constructor(client, data) {
    super(client);
    this.buyPrice = data.battlePassSeason.goldPrice;
    this.skipPrice = data.battlePassSeason.goldPricePerReward;
    this.xpRequiredPerTier = data.battlePassSeason.xpPerReward;
    this.season = data.battlePassSeason.number + 1;
    this.xp = data.battlePass.xp;
    this.claimed = data.battlePass.claimed;
    this.rewards = data.battlePassSeason.rewards.map(reward => {
      return new BattlePassReward(client, Object.assign(reward, {
        tier: data.battlePassSeason.rewards.indexOf(reward) + 1,
        claimed: data.battlePassSeason.rewards.indexOf(reward) + 1 <= this.tier ? true : false
      }));
    });
    this.duration = data.battlePassSeason.durationInDays;
    this.startTimestamp = new Date(data.battlePassSeason.startTime);
    this.endTimestamp = new Date(this.startTimestamp.getTime() + this.duration * 24 * 60 * 60 * 1000);
  }

  get tier() {
    return this.xp / this.xpRequiredPerTier | 0;
  }

  get progress() {
    return this.xp % this.xpRequiredPerTier;
  }

  get completed() {
    return this.xp === this.xpRequiredPerTier * 100;
  }

}

module.exports = BattlePass;
