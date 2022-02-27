const BaseClan = require('./BaseClan');

class QueriedClan extends BaseClan {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = QueriedClan;
