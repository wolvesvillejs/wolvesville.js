const Gift = require('./Gift');
const GiftRecipient = require('./GiftRecipient');

class SentGift extends Gift {
  constructor(client, data) {
    super(client, data);
    this.recipient = new GiftRecipient(client, data);
  }
}

module.exports = SentGift;
