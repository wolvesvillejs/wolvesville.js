const Base = require('./Base');

/**
 * Represents an inventory.
 * @extends {Base}
 */
class Inventory extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Gold count.
     * @type {number}
     */
    this.goldCount = data.silverCount;

    /**
     * Gem count.
     * @type {number}
     */
    this.gemCount = data.gemCount;

    /**
     * Rose count.
     * @type {number}
     */
    this.roseCount = data.roseCount;

    /**
     * Loyalty token count.
     * @type {number}
     */
    this.loyaltyTokenCount = data.loyaltyTokenCount;

    /**
     * Avatar items.
     * @type {Array}
     */
    this.avatarItems = data.avatarItemIds;

    /**
     * Profile icons.
     * @type {Array}
     */
    this.profileIcons = data.ownedProfileIcons;

    /**
     * Backgrounds.
     * @type {Array}
     */
    this.backgrounds = data.ownedBackgroundIds;

    /**
     * Loading screens.
     * @type {Array}
     */
    this.loadingScreens = data.ownedLoadingScreenIds;

    /**
     * Lootboxes.
     * @type {Array}
     */
    this.lootboxes = data.lootBoxes;

    /**
     * Emojis.
     * @type {Array}
     */
    this.emojis = data.ownedEmojis;

    /**
     * Taslismans.
     * @type {Array}
     */
    this.talismans = data.ownedTalismans;
  }
}

module.exports = Inventory;
