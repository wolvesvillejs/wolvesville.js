const Player = require('./Player');
const Inventory = require('./Inventory');
const EquippedItems = require('./EquippedItems');
const AvatarSlots = require('./AvatarSlots');
const ClientClan = require('./ClientClan');
const { getAuthenticationHeaders, getAuthenticationHeadersContainsBody } = require('../util/Headers');
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

  async rename(username) {
    if(typeof username !== 'string' || username.length > 14 || !username.match(/^[a-z0-9_]+$/i)) throw new Error('INVALID_USERNAME_FORMAT');
    if(username === this.username) throw new Error('ALREADY_OWNED_USERNAME');
    const request = await fetch('https://api-core.wolvesville.com/players/self', {
      method: 'PUT',
      headers: getAuthenticationHeadersContainsBody(this.client.token),
      body: JSON.stringify({ username, gender: this.gender })
    });
    const response = await request.json();
    if(response.message === 'registration/username-duplicate') throw new Error('USERNAME_ALREADY_TAKEN');
    this.username = response.username;
  }

  async genderTransition(gender) {
    if(typeof gender !== 'string' || !['MALE', 'FEMALE'].includes(gender)) throw new Error('INVALID_GENDER_FORMAT');
    const request = await fetch('https://api-core.wolvesville.com/players/self', {
      method: 'PUT',
      headers: getAuthenticationHeadersContainsBody(this.client.token),
      body: JSON.stringify({ gender })
    });
    const response = await request.json();
    this.gender = response.gender;
    return gender;
  }

  async readAnnouncements() {
    const request = await fetch('https://api-core.wolvesville.com/announcements', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async fetchEquippedItems() {
    const request = await fetch('https://api-core.wolvesville.com/equippedItems', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new EquippedItems(this.client, response);
  }

  async fetchInventory() {
    const request = await fetch('https://api-core.wolvesville.com/inventory', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new Inventory(this.client, response);
  }

  async acceptClanInvitation(id) {
    if(typeof id !== 'string') throw new Error('INVALID_CLAN_ID_FORMAT');
    const request = await fetch(`https://api-core.wolvesville.com/clans/${id}/acceptInvitation`, {
      method: 'POST',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    if(response.message === 'Player already in a clan ') throw new Error('ALREADY_IN_A_CLAN');
    if(response.message === 'There is no invitation for this clan ') throw new Error('NO_RECEIVED_INVITATION_FROM_THIS_CLAN');
    return new ClientClan(this.client, response);
  }

  async fetchClanInvitations() {
    const request = await fetch('https://api-core.wolvesville.com/clans/openRequests', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async buyCustomGames() {
    const request = await fetch('https://api-core.wolvesville.com/customGames/claimWithGold', {
      method: 'POST',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    if(response.message === 'You already own this') throw new Error('ALREADY_OWNED');
    if(response.message === 'Not enough gold') throw new Error('NOT_ENOUGH_GOLD');
  }

  async fetchOwnAvatarSlots() {
    const request = await fetch('https://api-core.wolvesville.com/inventory/slots', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new AvatarSlots(this.client, response);
  }

  async buyAvatarSlot() {
    const slots = await this.fetchAvatarSlots();
    if(slots.ownedSlotCount === 12) throw new Error('ALL_SLOTS_ALREADY_OWNED');
    const request = await fetch('https://api-core.wolvesville.com/inventory/slots', {
      method: 'POST',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    if(response.message === 'Not enough roses') throw new Error('NOT_ENOUGH_ROSES');
  }

  async scheduleAccountDeletion() {
    await fetch('https://api-core.wolvesville.com/players/self/delete', {
      method: 'PUT',
      headers: getAuthenticationHeaders(this.client.token)
    });
  }

  async cancelScheduledAccountDeletion() {
    if(!this.deletionTimestamp) throw new Error('UNSCHEDULED_ACCOUNT_DELETION');
    await fetch('https://api-core.wolvesville.com/players/self/delete', {
      method: 'DELETE',
      headers: getAuthenticationHeaders(this.client.token)
    });
  }

  async hideBadges(badgesHidden) {
    if(typeof badgesHidden !== 'boolean') throw new Error('OPTION_MUST_BE_A_BOOLEAN');
    await fetch(`https://api-core.wolvesville.com/players/hideBadges?hide=${badgesHidden}`, {
      method: 'PUT',
      headers: getAuthenticationHeaders(this.client.token)
    });
    this.badgesHidden = badgesHidden;
  }

  async hideClanTag(clanTagHidden) {
    if(typeof clanTagHidden !== 'boolean') throw new Error('OPTION_MUST_BE_A_BOOLEAN');
    await fetch(`https://api-core.wolvesville.com/players/hideClanTag?hide=${clanTagHidden}`, {
      method: 'PUT',
      headers: getAuthenticationHeaders(this.client.token)
    });
    this.clanTagHidden = clanTagHidden;
  }

  async toggleClanInvitations(clanInvitationsDisabled) {
    if(typeof clanInvitationsDisabled !== 'boolean') throw new Error('OPTION_MUST_BE_A_BOOLEAN');
    await fetch(`https://api-core.wolvesville.com/players/noClanInvite?noClanInvite=${clanInvitationsDisabled}`, {
      method: 'PUT',
      headers: getAuthenticationHeaders(this.client.token)
    });
    this.clanInvitationsDisabled = clanInvitationsDisabled;
  }

  async updateLocale(locale) {
    if(typeof locale !== 'string') throw new Error('INVALID_LOCALE_FORMAT');
    await fetch('https://api-core.wolvesville.com/players/me/locale', {
      method: 'PUT',
      headers: getAuthenticationHeadersContainsBody(this.client.token),
      body: JSON.stringify({ locale })
    });
  }

  async fetchFriendInvitationRewards() {
    const request = await fetch('https://api-core.wolvesville.com/players/friendInvitationRewards', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async updatePersonalMessage(text) {
    if(typeof text !== 'string') throw new Error('INVALID_PERSONAL_MESSAGE_FORMAT');
    const request = await fetch('https://api-core.wolvesville.com/vouchers/redeem', {
      method: 'GET',
      headers: getAuthenticationHeadersContainsBody(this.client.token),
      body: JSON.stringify({
        msg: text
      })
    });
    const response = await request.json();
    return response;
  }

  async redeemVoucher(code) {
    if(typeof code !== 'string' || !username.match(/^[a-z0-9]+$/i)) throw new Error('INVALID_VOUCHER_CODE_FORMAT');
    const request = await fetch('https://api-core.wolvesville.com/vouchers/redeem', {
      method: 'GET',
      headers: getAuthenticationHeadersContainsBody(this.client.token),
      body: JSON.stringify({ code })
    });
    const response = await request.json();
    return response;
  }

  async updateStatus(status) {
    await fetch(`https://api-core.wolvesville.com/players/status?status=${status}`, {
      method: 'PUT',
      headers: getAuthenticationHeaders(this.client.token)
    });
  }

  async fetchDailyRewards() {
    const request = await fetch('https://api-core.wolvesville.com/dailyRewards', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  async fetchGoldenSpinRewards() {
    const request = await fetch('https://api-core.wolvesville.com/rewards/goldenWheelItems', {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

}

module.exports = ClientPlayer;
