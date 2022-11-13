'use strict';

const CacheManager = require('./CacheManager');
const Background = require('../structures/Background');
const Emoji = require('../structures/Emoji');
const Item = require('../structures/Item');
const ItemCollection = require('../structures/ItemCollection');
const ItemSet = require('../structures/ItemSet');
const LoadingScreen = require('../structures/LoadingScreen');
const ProfileIcon = require('../structures/ProfileIcon');
const RoleCardPack = require('../structures/RoleCardPack');
const RoleIcon = require('../structures/RoleIcon');
const Rose = require('../structures/Rose');
const Talisman = require('../structures/Talisman');
const { ItemTypes } = require('../util/Constants');
const Routes = require('../util/Routes');

/**
 * Manages API methods for items.
 * @extends {CacheManager}
 */
class ItemManager extends CacheManager {
  /**
   * Fetch items.
   * @returns {Promise<Collection<string, Item>>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.AVATAR_ITEMS());
    response.map(item => this._add(new Item(this.client, item)));

    return this.cache;
  }

  /**
   * Resolve an item.
   * @param {Object|string} item Item object or id
   * @param {string} [type] Item type
   * @returns {?(Item|ItemSet|Background|LoadingScreen|ProfileIcon|
   * Emoji|Talisman|Rose|RoleIcon|ItemCollection|RoleCardPack)}
   */
  resolve(item, type) {
    if (!item || !type) return null;
    if (typeof item === 'string') item = { id: item };

    switch (type) {
      case ItemTypes.AVATAR_ITEM:
        return this.client.items.cache.get(item.id) ?? new Item(this.client, item);
      case ItemTypes.ITEM_SET:
        return this.client.itemSets.cache.get(item.id) ?? new ItemSet(this.client, item);
      case ItemTypes.BACKGROUND:
        return this.client.backgrounds.cache.get(item.id) ?? new Background(this.client, item);
      case ItemTypes.LOADING_SCREEN:
        return this.client.loadingScreens.cache.get(item.id) ?? new LoadingScreen(this.client, item);
      case ItemTypes.PROFILE_ICON:
        return this.client.profileIcons.cache.get(item.id) ?? new ProfileIcon(this.client, item);
      case ItemTypes.EMOJI:
        return this.client.emojis.cache.get(item.id) ?? new Emoji(this.client, item);
      case ItemTypes.TALISMAN:
        return this.client.talismans.cache.get(item.id) ?? new Talisman(this.client, item);
      case ItemTypes.ROSE_PACKAGE:
        return this.client.roses.cache.get(item.id) ?? new Rose(this.client, item);
      case ItemTypes.ROLE_ICON:
        return this.client.roleIcons.cache.get(item.id) ?? new RoleIcon(this.client, item);
      case ItemTypes.ITEM_COLLECTION:
        return this.client.itemCollections.cache.get(item.id) ?? new ItemCollection(this.client, item);
      case ItemTypes.ROLE_CARD_PACK:
        return this.client.itemCollections.cache.get(item.id) ?? new RoleCardPack(this.client, item);
      default:
        return null;
    }
  }
}

module.exports = ItemManager;
