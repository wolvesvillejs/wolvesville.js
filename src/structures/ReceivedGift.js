const Gift = require('./Gift');
const GiftSender = require('./GiftSender');

class ReceivedGift extends Gift {
  constructor(client, data) {
    super(client, data);
    this.sender = new GiftSender(client, data);
  }
}

module.exports = ReceivedGift;
