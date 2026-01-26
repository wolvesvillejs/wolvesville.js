'use strict';

const BaseClient = require('./BaseClient');
const AvatarManager = require('../managers/AvatarManager');
const BackgroundManager = require('../managers/BackgroundManager');
const BaseRoleCardOfferManager = require('../managers/BaseRoleCardOfferManager');
const BodyPaintManager = require('../managers/BodyPaintManager');
const BundleManager = require('../managers/BundleManager');
const CalendarManager = require('../managers/CalendarManager');
const ClanManager = require('../managers/ClanManager');
const EmojiCollectionManager = require('../managers/EmojiCollectionManager');
const EmojiManager = require('../managers/EmojiManager');
const ItemCollectionManager = require('../managers/ItemCollectionManager');
const ItemManager = require('../managers/ItemManager');
const ItemSetManager = require('../managers/ItemSetManager');
const LoadingScreenManager = require('../managers/LoadingScreenManager');
const PlayerManager = require('../managers/PlayerManager');
const ProfileIconManager = require('../managers/ProfileIconManager');
const ProfileIconBorderManager = require('../managers/ProfileIconBorderManager');
const RoleManager = require('../managers/RoleManager');
const RoleCardPackManager = require('../managers/RoleCardPackManager');
const RoleIconManager = require('../managers/RoleIconManager');
const RoseManager = require('../managers/RoseManager');
const RoseSkinManager = require('../managers/RoseSkinManager');
const TagManager = require('../managers/TagManager');
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
     * The avatar manager of the client
     * @type {AvatarManager}
     */
    this.avatars = new AvatarManager(this);

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
     * The roles manager of the client
     * @type {RoleManager}
     */
    this.roles = new RoleManager(this);

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
     * The rose skin manager of the client
     * @type {RoseSkinManager}
     */
    this.roseSkins = new RoseSkinManager(this);

    /**
     * The talisman manager of the client
     * @type {TalismanManager}
     */
    this.talismans = new TalismanManager(this);

    /**
     * The body paint manager of the client
     * @type {BodyPaintManager}
     */
    this.bodyPaints = new BodyPaintManager(this);

    /**
     * The bundle manager of the client
     * @type {BundleManager}
     */
    this.bundles = new BundleManager(this);

    /**
     * The calendar manager of the client
     * @type {CalendarManager}
     */
    this.calendars = new CalendarManager(this);

    /**
     * The tag manager of the client
     * @type {TagManager}
     */
    this.tags = new TagManager(this);

    /**
     * The profile icon border manager of the client
     * @type {ProfileIconBorderManager}
     */
    this.profileIconBorders = new ProfileIconBorderManager(this);

    /**
     * The base role card offer manager of the client
     * @type {BaseRoleCardOfferManager}
     */
    this.baseRoleCardOffers = new BaseRoleCardOfferManager(this);
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
    const response = await this.rest.get(Routes.CLANS_QUESTS_ALL());
    return response.map(quest => new ClanQuest(this, quest));
  }

  /**
   * Fetch announcements (general announcements, changelogs, and Discord events).
   * @returns {Promise<Object>}
   */
  async fetchAnnouncements() {
    const response = await this.rest.get(Routes.ANNOUNCEMENTS());
    return response;
  }

  /**
   * Fetch battle pass shop.
   * @returns {Promise<Object>}
   */
  async fetchBattlePassShop() {
    const response = await this.rest.get(Routes.BATTLE_PASS_SHOP());
    return response;
  }

  /**
   * Fetch ranked season.
   * @returns {Promise<Object>}
   */
  async fetchRankedSeason() {
    const response = await this.rest.get(Routes.RANKED_SEASON());
    return response;
  }

  /**
   * Fetch ranked hall of fame for a specific season.
   * @param {number} seasonNumber Season number
   * @returns {Promise<Object>}
   */
  async fetchRankedHallOfFame(seasonNumber) {
    if (typeof seasonNumber !== 'number') throw new Error('SEASON_NUMBER_MUST_BE_A_NUMBER');
    const response = await this.rest.get(Routes.RANKED_HALL_OF_FAME(seasonNumber));
    return response;
  }

  /**
   * Fetch ranked leaderboard.
   * @param {?string} [language] Optional 2-letter language code to filter by
   * @returns {Promise<Object>}
   */
  async fetchRankedLeaderboard(language) {
    const options = language ? { query: { language } } : {};
    const response = await this.rest.get(Routes.RANKED_LEADERBOARD(), options);
    return response;
  }

  /**
   * Fetch player highscores.
   * @returns {Promise<Object>}
   */
  async fetchPlayerHighscores() {
    const response = await this.rest.get(Routes.PLAYER_HIGHSCORES());
    return response;
  }
}

module.exports = Client;
