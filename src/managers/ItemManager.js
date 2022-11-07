'use strict';

const { Collection } = require('@discordjs/collection');
const BaseManager = require('./BaseManager');
const CacheManager = require('./CacheManager');
const AdvancedRoleCardOffer = require('../structures/AdvancedRoleCardOffer');
const AvatarItem = require('../structures/AvatarItem');
const Background = require('../structures/Background');
const Emoji = require('../structures/Emoji');
const EmojiCollection = require('../structures/EmojiCollection');
const ItemCollection = require('../structures/ItemCollection');
const ItemSet = require('../structures/ItemSet');
const LoadingScreen = require('../structures/LoadingScreen');
const ProfileIcon = require('../structures/ProfileIcon');
const RoleIcon = require('../structures/RoleIcon');
const Rose = require('../structures/Rose');
const Talisman = require('../structures/Talisman');
const { ItemTypes } = require('../util/Constants');
const Routes = require('../util/Routes');

/**
 * Manages API methods for items.
 * @extends {BaseManager}
 */
class ItemManager extends BaseManager {
  constructor(client) {
    super(client);

    this.items = new CacheManager(this);
    this.itemSets = new CacheManager(this);
    this.itemCollections = new CacheManager(this);
    this.profileIcons = new CacheManager(this);
    this.emojis = new CacheManager(this);
    this.emojiCollections = new CacheManager(this);
    this.backgrounds = new CacheManager(this);
    this.loadingScreens = new CacheManager(this);
    this.roleIcons = new CacheManager(this);
    this.advancedRoleCardOffers = new CacheManager(this);
    this.roses = new CacheManager(this);
    this.talismans = new CacheManager(this);
  }

  /**
   * Fetch items.
   * @returns {Promise<AvatarItem[]>}
   */
  async fetchItems() {
    const response = await this.client.rest.get(Routes.AVATAR_ITEMS());

    const items = response.map(item => new AvatarItem(this.client, item));
    items.reduce((col, item) => col.set(item.id, this.items._add(item)), new Collection());

    return items;
  }

  async fetchItemSets() {
    const response = await this.client.rest.get(Routes.AVATAR_ITEM_SETS());

    const itemSets = response.map(item => new ItemSet(this.client, item));
    itemSets.reduce((col, item) => col.set(item.id, this.itemSets._add(item)), new Collection());

    return itemSets;
  }

  async fetchItemCollections() {
    const response = await this.client.rest.get(Routes.AVATAR_ITEM_COLLECTIONS());

    const itemCollections = response.map(item => new ItemCollection(this.client, item));
    itemCollections.reduce((col, item) => col.set(item.id, this.itemCollections._add(item)), new Collection());

    return itemCollections;
  }

  async fetchProfileIcons() {
    const response = await this.client.rest.get(Routes.PROFILE_ICONS());

    const profileIcons = response.map(item => new ProfileIcon(this.client, item));
    profileIcons.reduce((col, item) => col.set(item.id, this.profileIcons._add(item)), new Collection());

    return profileIcons;
  }

  async fetchEmojis() {
    const response = await this.client.rest.get(Routes.EMOJIS());

    const emojis = response.map(item => new Emoji(this.client, item));
    emojis.reduce((col, item) => col.set(item.id, this.emojis._add(item)), new Collection());

    return emojis;
  }

  async fetchEmojiCollections() {
    const response = await this.client.rest.get(Routes.EMOJI_COLLECTIONS());

    const emojiCollections = response.map(item => new EmojiCollection(this.client, item));
    emojiCollections.reduce((col, item) => col.set(item.id, this.emojiCollections._add(item)), new Collection());

    return emojiCollections;
  }

  async fetchBackgrounds() {
    const response = await this.client.rest.get(Routes.BACKGROUNDS());

    const backgrounds = response.map(item => new Background(this.client, item));
    backgrounds.reduce((col, item) => col.set(item.id, this.backgrounds._add(item)), new Collection());

    return backgrounds;
  }

  async fetchLoadingScreens() {
    const response = await this.client.rest.get(Routes.LOADING_SCREENS());

    const loadingScreens = response.map(item => new LoadingScreen(this.client, item));
    loadingScreens.reduce((col, item) => col.set(item.id, this.loadingScreens._add(item)), new Collection());

    return loadingScreens;
  }

  async fetchRoleIcons() {
    const response = await this.client.rest.get(Routes.ROLE_ICONS());

    const roleIcons = response.map(item => new RoleIcon(this.client, item));
    roleIcons.reduce((col, item) => col.set(item.id, this.roleIcons._add(item)), new Collection());

    return roleIcons;
  }

  async fetchAdvancedRoleCardOffers() {
    const response = await this.client.rest.get(Routes.ADVANCED_ROLE_CARD_OFFERS());

    const advancedRoleCardOffers = response.map(item => new AdvancedRoleCardOffer(this.client, item));
    advancedRoleCardOffers.reduce(
      (col, item) => col.set(item.id, this.advancedRoleCardOffers._add(item)),
      new Collection(),
    );

    return advancedRoleCardOffers;
  }

  async fetchRoses() {
    const response = await this.client.rest.get(Routes.ROSES());

    const roses = response.map(item => new Rose(this.client, item));
    roses.reduce((col, item) => col.set(item.id, this.roses._add(item)), new Collection());

    return roses;
  }

  async fetchTalismans() {
    const response = await this.client.rest.get(Routes.TALISMANS());

    const talismans = response.map(item => new Talisman(this.client, item));
    talismans.reduce((col, item) => col.set(item.id, this.talismans._add(item)), new Collection());

    return talismans;
  }

  /**
   * Resolve an item.
   * @param {Object|string} item Item object or id
   * @param {string} [type] Item type
   * @returns {?(AvatarItem|ItemSet|Background|LoadingScreen|ProfileIcon|Emoji|Talisman)}
   */
  resolve(item, type) {
    if (!item || !type) return null;
    if (typeof item === 'string') item = { id: item };

    switch (type) {
      case ItemTypes.AVATAR_ITEM:
        return this.items.cache.get(item.id) ?? new AvatarItem(this.client, item);
      case ItemTypes.ITEM_SET:
        return this.itemSets.cache.get(item.id) ?? new ItemSet(this.client, item);
      case ItemTypes.BACKGROUND:
        return this.backgrounds.cache.get(item.id) ?? new Background(this.client, item);
      case ItemTypes.LOADING_SCREEN:
        return this.loadingScreens.cache.get(item.id) ?? new LoadingScreen(this.client, item);
      case ItemTypes.PROFILE_ICON:
        return this.profileIcons.cache.get(item.id) ?? new ProfileIcon(this.client, item);
      case ItemTypes.EMOJI:
        return this.emojis.cache.get(item.id) ?? new Emoji(this.client, item);
      case ItemTypes.TALISMAN:
        return this.talismans.cache.get(item.id) ?? new Talisman(this.client, item);
      case ItemTypes.ROSE_PACKAGE:
        return this.roses.cache.get(item.id) ?? new Rose(this.client, item);
      case ItemTypes.ROLE_ICON:
        return this.roleIcons.cache.get(item.id) ?? new RoleIcon(this.client, item);
      case ItemTypes.ITEM_COLLECTION:
        return this.itemCollections.cache.get(item.id) ?? new ItemCollection(this.client, item);
      default:
        return null;
    }
  }
}

module.exports = ItemManager;
