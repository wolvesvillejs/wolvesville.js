const Base = require('./Base');

class BasePlayer extends Base {
  constructor(client) {
    super(client);
  }

  get online() {
    return new Date(this.lastOnlineTimestamp).getTime() + 10 * 60 * 1000 > Date.now();
  }

}

module.exports = BasePlayer;
