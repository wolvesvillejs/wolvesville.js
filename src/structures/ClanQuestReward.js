const Base = require('./Base');

class ClanQuestReward extends Base {
  constructor(client, data) {
    super(client);
    this.type = data.type;
    if(data.amount > 1) this.amount = data.amount;
    if(data.avatarItemId) this.avatarItemId = data.avatarItemId;
  }
}

module.exports = ClanQuestReward;
