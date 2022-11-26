'use strict';

const BaseClient = require('./BaseClient');
const BackgroundManager = require('../managers/BackgroundManager');
const ClanManager = require('../managers/ClanManager');
const EmojiCollectionManager = require('../managers/EmojiCollectionManager');
const EmojiManager = require('../managers/EmojiManager');
const ItemCollectionManager = require('../managers/ItemCollectionManager');
const ItemManager = require('../managers/ItemManager');
const ItemSetManager = require('../managers/ItemSetManager');
const LoadingScreenManager = require('../managers/LoadingScreenManager');
const PlayerManager = require('../managers/PlayerManager');
const ProfileIconManager = require('../managers/ProfileIconManager');
const RoleCardPackManager = require('../managers/RoleCardPackManager');
const RoleIconManager = require('../managers/RoleIconManager');
const RoseManager = require('../managers/RoseManager');
const TalismanManager = require('../managers/TalismanManager');
const AdvancedRoleCardOffer = require('../structures/AdvancedRoleCardOffer');
const BattlePassChallenge = require('../structures/BattlePassChallenge');
const BattlePassSeason = require('../structures/BattlePassSeason');
const ClanQuest = require('../structures/ClanQuest');
const GameMode = require('../structures/GameMode');
const LimitedCollectionOffer = require('../structures/LimitedCollectionOffer');
const LimitedItemCollectionOffer = require('../structures/LimitedItemCollectionOffer');
const LimitedOffer = require('../structures/LimitedOffer');
const Routes = require('../util/Routes');

/**
 * Wolvesville client.
 * @extends {BaseClient}
 */
class Client extends BaseClient {
  /**
   * @param {?string} [APIKey] APIKey
   */
  constructor(APIKey) {
    super(APIKey);

    /**
     * The player manager of the client
     * @type {PlayerManager}
     */
    this.players = new PlayerManager(this);

    /**
     * The clan manager of the client
     * @type {ClanManager}
     */
    this.clans = new ClanManager(this);

    /**
     * The item manager of the client
     * @type {ItemManager}
     */
    this.items = new ItemManager(this);

    /**
     * The item set manager of the client
     * @type {ItemSetManager}
     */
    this.itemSets = new ItemSetManager(this);

    /**
     * The item collection manager of the client
     * @type {ItemCollectionManager}
     */
    this.itemCollections = new ItemCollectionManager(this);

    /**
     * The profile icon manager of the client
     * @type {ProfileIconManager}
     */
    this.profileIcons = new ProfileIconManager(this);

    /**
     * The emoji manager of the client
     * @type {EmojiManager}
     */
    this.emojis = new EmojiManager(this);

    /**
     * The emoji collection manager of the client
     * @type {EmojiCollectionManager}
     */
    this.emojiCollections = new EmojiCollectionManager(this);

    /**
     * The background manager of the client
     * @type {BackgroundManager}
     */
    this.backgrounds = new BackgroundManager(this);

    /**
     * The loading screen manager of the client
     * @type {LoadingScreenManager}
     */
    this.loadingScreens = new LoadingScreenManager(this);

    /**
     * The role icon manager of the client
     * @type {RoleIconManager}
     */
    this.roleIcons = new RoleIconManager(this);

    /**
     * The role card pack manager of the client
     * @type {RoleCardPackManager}
     */
    this.roleCardPacks = new RoleCardPackManager(this);

    /**
     * The rose manager of the client
     * @type {RoseManager}
     */
    this.roses = new RoseManager(this);

    /**
     * The talisman manager of the client
     * @type {TalismanManager}
     */
    this.talismans = new TalismanManager(this);
  }

  /**
   * Fetch game modes.
   * @returns {Promise<GameMode[]>}
   */
  async fetchGameModes() {
    const response = await this.rest.get(Routes.ROLE_ROTATIONS());
    const data = response.map(item => new GameMode(this, item));
    return data;
  }

  /**
   * Fetch battle pass season.
   * @returns {Promise<BattlePassSeason>}
   */
  async fetchBattlePassSeason() {
    const response = await this.rest.get(Routes.BATTLE_PASS_SEASON());

    return new BattlePassSeason(this, response);
  }

  /**
   * Fetch battle pass challenges.
   * @returns {Promise<BattlePassChallenge[]>}
   */
  async fetchBattlePassChallenges() {
    const response = await this.rest.get(Routes.BATTLE_PASS_CHALLENGES());

    const data = response.map(item => new BattlePassChallenge(this, item));
    return data;
  }

  /**
   * Fetch shop.
   * @returns {Promise<Array<LimitedCollectionOffer|LimitedItemCollectionOffer|AdvancedRoleCardOffer|LimitedOffer>>}
   */
  async fetchShop() {
    const response = await this.rest.get(Routes.ACTIVE_OFFERS());
    const data = response.map(item =>
      item.type.endsWith('OUTFITS')
        ? new LimitedCollectionOffer(this, item)
        : item.type === 'AVATAR_ITEMS'
        ? new LimitedItemCollectionOffer(this, item)
        : item.type === 'ADVANCED_ROLE_CARD'
        ? new AdvancedRoleCardOffer(this, item)
        : new LimitedOffer(this, item),
    );

    return data;
  }

  /**
   * Fetch all quests.
   * @returns {ClanQuest[]}
   */
  async fetchQuests() {
    const response = await this.client.rest.get(Routes.CLANS_QUESTS_ALL());
    return response.map(quest => new ClanQuest(this.client, quest));
  }
}

module.exports = Client;
