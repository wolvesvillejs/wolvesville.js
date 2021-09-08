const Base = require('./Base');

class ClanChatMessage extends Base {
  constructor(client, data) {
    super(client);

    this.author = {
      id: data.playerId
    }
    this.content = data.msg;
    this.sendTimestamp = data.date;
    this.system = data.isSystem;
  }
}

module.exports = ClanChatMessage;
