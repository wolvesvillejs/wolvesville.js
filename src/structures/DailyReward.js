const Base = require('./Base');

class DailyReward extends Base {
  constructor(client, data) {
    super(client);
    this.day = data.day;
    this.type = data.type;
    if(this.type === 'AVATAR_ITEM') {
      this.avatarItemId = data.avatarItemId;
    } else {
      this.amount = data.amount;
    }
    if(this.type === 'TALISMAN') {
      this.unknown = data.unknown;
    }
    if(data.canBeClaimedDate) {
      this.claimTimestamp = data.canBeClaimedDate;
    }
    this.claimed = data.claimed;
  }
}

module.exports = DailyReward;
