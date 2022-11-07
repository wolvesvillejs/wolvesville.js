'use strict';

const BaseClient = require('./BaseClient');
const ClanManager = require('../managers/ClanManager');
const ItemManager = require('../managers/ItemManager');
const PlayerManager = require('../managers/PlayerManager');
const BattlePassChallenge = require('../structures/BattlePassChallenge');
const BattlePassSeason = require('../structures/BattlePassSeason');
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
   * @param {ClientOptions} options Options for the client
   */
  constructor(options) {
    super(options);

    Object.defineProperty(this, 'refreshToken', { writable: true });

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
  }

  /**
   * Fetch game modes.
   * @returns {Promise<GameMode[]>}
   */
  async fetchGameModes() {
    const response = await this.rest.get(Routes.ROLE_ROTATIONS());
    const gameModes = response.map(gameMode => new GameMode(this, gameMode));
    return gameModes;
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

    const challenges = response.map(challenge => new BattlePassChallenge(this, challenge));
    return challenges;
  }

  /**
   * Fetch active offers.
   * @returns {Promise<Array<LimitedCollectionOffer|LimitedItemCollectionOffer|LimitedOffer>>}
   */
  async fetchActiveOffers() {
    const response = await this.rest.get(Routes.ACTIVE_OFFERS());
    return response.map(offer =>
      offer.type.endsWith('OUTFITS')
        ? new LimitedCollectionOffer(this, offer)
        : offer.type === 'AVATAR_ITEMS'
        ? new LimitedItemCollectionOffer(this, offer)
        : new LimitedOffer(this, offer),
    );
  }
}

module.exports = Client;
