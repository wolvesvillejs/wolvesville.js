const Base = require('./Base');

class BattlePassReward extends Base {
  constructor(client, data) {
    super(client);
    this.tier = data.tier;
    this.claimed = data.claimed;
    this.type = data.type;
    if(data.amount > 1) this.amount = data.amount;
    if(data.avatarItemId) this.avatarItemId = data.avatarItemId;
    else if(data.rosePackageId) this.rosePackageId = data.rosePackageId;
    else if(data.emojiId) this.emojiId = data.emojiId;
    else if(data.profileIconId) this.profileIconId = data.profileIconId;
  }
}

module.exports = BattlePassReward;
