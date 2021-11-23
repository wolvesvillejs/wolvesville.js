const Base = require('./Base');
const DailyReward = require('./DailyReward');

class DailyRewards extends Base {
  constructor(client, data) {
    super(client);
    this.offset = data.offset + 1;
    this.active = !data.recentGameWinRequired;
    this.rewards = data.rewards.map(reward => {
      return new DailyReward(client, Object.assign(reward, {
        day: this.offset + data.rewards.indexOf(reward) + 1
      }));
    });
  }

  get next() {
    return this.rewards.find(reward => reward.claimTimestamp);
  }

  get available() {
    return this.active && Date.now() > this.next.claimTimestamp;
  }

}

module.exports = DailyRewards;
