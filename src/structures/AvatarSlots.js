const Base = require('./Base');
const AvatarSlot = require('./AvatarSlot');

class AvatarSlots extends Base {
  constructor(client, data) {
    super(client);
    this.entries = data.map(entry => new AvatarSlot(client, entry));
    this.ownedSlotCount = data.length;
  }
}

module.exports = AvatarSlots;
