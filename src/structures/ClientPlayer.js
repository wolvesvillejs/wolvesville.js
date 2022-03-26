const Player = require('./Player');
const Inventory = require('./Inventory');
const EquippedItems = require('./EquippedItems');
const DailyRewards = require('./DailyRewards');
const ClientClan = require('./ClientClan');
const Challenge = require('./Challenge');
const BattlePass = require('./BattlePass');
const SentGift = require('./SentGift');
const ReceivedGift = require('./ReceivedGift');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Represents a client player.
 * @extends {Player}
 */
class ClientPlayer extends Player {
  constructor(client, data) {
    super(client, data);

    /**
     * Player xp.
     * @type {number}
     */
    this.xp = data.xpTotal;

    /**
     * Xp required to level up.
     * @type {number}
     */
    this.requiredXp = data.xpUntilNextLevel;

    /**
     * Player gender.
     * @type {number}
     */
    this.gender = data.gender === 'MALE' ? 2
      : data.gender === 'FEMALE' ? 1
      : 0;

    this.equippedItems.background = {
      id: data.equippedBackgroundId
    }
    this.equippedItems.loadingScreen = {
      id: data.equippedLoadingScreenId
    }

    /**
     * Number of times player was banned.
     * @type {number}
     */
    this.banCount = data.bannedCount;

    /**
     * Player last ban.
     * @type {Object}
     */
    this.lastBan = data.bannedUntilTime ? {
      expirationTimestamp: data.bannedUntilTime,
      reason: data.banReason,
      message: data.banReasonMsg
    } : null;

    /**
     * Ads details.
     * @type {Object}
     */
    this.ads = {
      lastWatchedTimestamp: data.lastVideoAdWatched,
      watchedCount: data.watchedVideoAdsCount,
      watchedTodayCount: data.adRewardCount
    }

    /**
     * Is receiving clan invites disabled.
     * @type {boolean}
     */
    this.options.clanInvitationsDisabled = data.noClanInvite;

    /**
     * Are badges hidden to other players.
     * @type {boolean}
     */
    this.options.badgesHidden = data.hideBadges;

    /**
     * Are role cards hidden to other players.
     * @type {boolean}
     */
    this.options.roleCardsHidden = data.roleCardsArePublic;

    if(data.deletionTime) {
      /**
       * Player deletion timestamp.
       * @type {string}
       */
      this.deletionTimestamp = data.deletionTime;
    }
  }

  /**
   * Level tiers.
   * @returns {Array<number>}
   * @readonly
   */
  static get levelTiers() {
    return [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130,
    140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270,
    280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410,
    420, 500, 600, 700, 800, 900, 1000];
  }

  /**
   * Developer announcements.
   * @returns {Array}
   */
  async fetchAnnouncements() {
    const request = await fetch(`${this.client.options.http.api.core}/announcements`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  /**
   * Equipped items.
   * @returns {EquippedItems}
   */
  async fetchEquippedItems() {
    const request = await fetch(`${this.client.options.http.api.core}/equippedItems`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new EquippedItems(this.client, response);
  }

  /**
   * Inventory.
   * @returns {Inventory}
   */
  async fetchInventory() {
    const request = await fetch(`${this.client.options.http.api.core}/inventory`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new Inventory(this.client, response);
  }

  /**
   * Clan invitations.
   * @returns {Array}
   */
  async fetchClanInvitations() {
    const request = await fetch(`${this.client.options.http.api.core}/clans/openRequests`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  /**
   * Friend invitation rewards.
   * @returns {Array}
   */
  async fetchFriendInvitationRewards() {
    const request = await fetch(`${this.client.options.http.api.core}/players/friendInvitationRewards`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  /**
   * Daily rewards.
   * @returns {DailyRewards}
   */
  async fetchDailyRewards() {
    const request = await fetch(`${this.client.options.http.api.core}/dailyRewards`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new DailyRewards(this.client, response);
  }

  /**
   * Golden spin rewards.
   * @returns {Array<Object>}
   */
  async fetchGoldenSpinRewards() {
    const request = await fetch(`${this.client.options.http.api.core}/rewards/goldenWheelItems`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  /**
   * Challenges.
   * @returns {Object<Array>}
   */
  async fetchChallenges() {
    const request = await fetch(`${this.client.options.http.api.core}/challenges/v2`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return {
      daily: response.dailyChallengeProgresses.map(challenge => new Challenge(this.client, challenge)),
      weekly: response.weeklyChallengeProgresses.map(challenge => new Challenge(this.client, challenge))
    }
  }

  /**
   * Battle pass.
   * @returns {BattlePass}
   */
  async fetchBattlePass() {
    const request = await fetch(`${this.client.options.http.api.core}/battlePass/seasonAndBattlePass`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new BattlePass(this.client, response);
  }

  /**
   * Sent gifts.
   * @returns {Array<SentGift>}
   */
  async fetchSentGifts() {
    const request = await fetch(`${this.client.options.http.api.core}/billing/gifts/sent`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.map(gift => new SentGift(this.client, gift));
  }

  /**
   * Received gifts.
   * @returns {Array<ReceivedGift>}
   */
  async fetchReceivedGifts() {
    const request = await fetch(`${this.client.options.http.api.core}/billing/gifts/received`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.map(gift => new ReceivedGift(this.client, gift));
  }

  /**
   * Fetch friend requests.
   * @returns {Object}
   */
  async fetchFriendRequests() {
    const request = await fetch(`${this.client.options.http.api.core}/friendRequests/pending`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

}

module.exports = ClientPlayer;
