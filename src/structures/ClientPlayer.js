const Player = require('./Player');
const Inventory = require('./Inventory');
const EquippedItems = require('./EquippedItems');
const AvatarSlots = require('./AvatarSlots');
const ClientClan = require('./ClientClan');
const Challenge = require('./Challenge');
const BattlePass = require('./BattlePass');
const SentGift = require('./SentGift');
const ReceivedGift = require('./ReceivedGift');
const { CORE_API_URL } = require('../util/Constants');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class ClientPlayer extends Player {
  constructor(client, data) {
    super(client, data);
    this.xp = data.xpTotal;
    this.xpUntilNextLevel = data.xpUntilNextLevel;
    this.gender = data.gender || null;
    this.equippedItems.background = {
      id: data.equippedBackgroundId
    }
    this.equippedItems.loadingScreen = {
      id: data.equippedLoadingScreenId
    }
    this.banishmentsCount = data.bannedCount;
    this.lastBanishment = {
      expirationTimestamp: data.bannedUntilTime,
      reason: data.banReason,
      message: data.banReasonMsg
    }
    this.ads = {
      lastWatchedTimestamp: data.lastVideoAdWatched,
      watchedAdsCount: data.watchedVideoAdsCount,
      watchedTodayCount: data.adRewardCount
    }
    this.options.clanInvitationsDisabled = data.noClanInvite;
    this.options.badgesHidden = data.hideBadges;
    if(data.deletionTime) {
      this.deletionTimestamp = data.deletionTime;
    }
  }

  static get levelTiers() {
    return [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130,
    140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270,
    280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410,
    420, 500, 600, 700, 800, 900, 1000];
  }

  async readAnnouncements() {
    const request = await fetch(`${CORE_API_URL}/announcements`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async fetchEquippedItems() {
    const request = await fetch(`${CORE_API_URL}/equippedItems`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new EquippedItems(this.client, response);
  }

  async fetchInventory() {
    const request = await fetch(`${CORE_API_URL}/inventory`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new Inventory(this.client, response);
  }

  async fetchClanInvitations() {
    const request = await fetch(`${CORE_API_URL}/clans/openRequests`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async fetchOwnAvatarSlots() {
    const request = await fetch(`${CORE_API_URL}/inventory/slots`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new AvatarSlots(this.client, response);
  }

  async fetchFriendInvitationRewards() {
    const request = await fetch(`${CORE_API_URL}/players/friendInvitationRewards`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async fetchDailyRewards() {
    const request = await fetch(`${CORE_API_URL}/dailyRewards`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async fetchGoldenSpinRewards() {
    const request = await fetch(`${CORE_API_URL}/rewards/goldenWheelItems`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async fetchChallenges() {
    const request = await fetch(`${CORE_API_URL}/challenges/v2`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return {
      daily: response.dailyChallengeProgresses.map(challenge => new Challenge(this.client, challenge)),
      weekly: response.weeklyChallengeProgresses.map(challenge => new Challenge(this.client, challenge))
    }
  }

  async fetchBattlePass() {
    const request = await fetch(`${CORE_API_URL}/battlePass/seasonAndBattlePass`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new BattlePass(this.client, response);
  }

  async fetchSentGifts() {
    const request = await fetch(`${CORE_API_URL}/billing/gifts/sent`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.map(gift => new SentGift(this.client, gift));
  }

  async fetchReceivedGifts() {
    const request = await fetch(`${CORE_API_URL}/billing/gifts/received`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.map(gift => new ReceivedGift(this.client, gift));
  }

}

module.exports = ClientPlayer;
