const Base = require('./Base');

class Inventory extends Base {
  constructor(client, data) {
    super(client);

    this.goldCount = data.silverCount;
    this.gemCount = data.gemCount;
    this.roseCount = data.roseCount;
    this.loyaltyTokenCount = data.loyaltyTokenCount;

    this.avatarItems = data.avatarItemIds;
    this.profileIcons = data.ownedProfileIcons;
    this.backgrounds = data.ownedBackgroundIds;
    this.loadingScreens = data.ownedLoadingScreenIds;
    this.lootboxes = data.lootBoxes;
    this.emojis = data.ownedEmojis;
    this.talismans = data.ownedTalismans;
  }
}

module.exports = Inventory;
