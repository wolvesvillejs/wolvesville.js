'use strict';

module.exports = {
  AVATAR_ITEMS: () => '/items/avatarItems',
  AVATAR_ITEM_SETS: () => '/items/avatarItemSets',
  AVATAR_ITEM_COLLECTIONS: () => '/items/avatarItemCollections',
  PROFILE_ICONS: () => '/items/profileIcons',
  EMOJIS: () => '/items/emojis',
  EMOJI_COLLECTIONS: () => '/items/emojiCollections',
  BACKGROUNDS: () => '/items/backgrounds',
  LOADING_SCREENS: () => '/items/loadingScreens',
  ROLE_ICONS: () => '/items/roleIcons',
  ADVANCED_ROLE_CARD_OFFERS: () => '/items/advancedRoleCardOffers',
  ROSES: () => '/items/roses',
  TALISMANS: () => '/items/talismans',

  ROLE_ROTATIONS: () => '/roleRotations',

  BATTLE_PASS_SEASON: () => '/battlePass/season',
  BATTLE_PASS_CHALLENGES: () => '/battlePass/challenges',

  ACTIVE_OFFERS: () => '/shop/activeOffers',

  PLAYER: playerId => `/players/${playerId}`,
  PLAYER_BY_USERNAME: playerUsername => `/players/search?username=${playerUsername}`,

  CLANS_SEARCH_BY_NAME: clanName => `/clans/search?name=${clanName}`,
  CLANS_INFO: clanId => `/clans/${clanId}/info`,
  CLANS_MEMBERS: clanId => `/clans/${clanId}/members`,
  CLANS_MEMBERS_MEMBER: (clanId, memberId) => `/clans/${clanId}/members/${memberId}`,
  CLANS_MEMBERS_MEMBER_PARTICIPATE_IN_QUESTS: (clanId, memberId) =>
    `/clans/${clanId}/members/${memberId}/participateInQuests`,
  CLANS_CHAT: clanId => `/clans/${clanId}/chat`,
  CLANS_LEDGER: clanId => `/clans/${clanId}/ledger`,
  CLANS_LOGS: clanId => `/clans/${clanId}/logs`,
  CLANS_QUESTS_AVAILABLE: clanId => `/clans/${clanId}/quests/available`,
  CLANS_QUESTS_SHUFFLE: clanId => `/clans/${clanId}/quests/shuffle`,
  CLANS_QUESTS_CLAIM: clanId => `/clans/${clanId}/quests/claim`,
  CLANS_QUESTS_ACTIVE: clanId => `/clans/${clanId}/quests/active`,
  CLANS_QUESTS_ACTIVE_SKIP_WAITING_TIME: clanId => `/clans/${clanId}/quests/active/skipWaitingTime`,
  CLANS_QUESTS_ACTIVE_CLAIM_TIME: clanId => `/clans/${clanId}/quests/active/claimTime`,
  CLANS_QUESTS_ACTIVE_CANCEL: clanId => `/clans/${clanId}/quests/active/cancel`,
  CLANS_QUESTS_HISTORY: clanId => `/clans/${clanId}/quests/history`,
  CLANS_QUESTS_ALL: () => `/clans/quests/all`,
  CLANS_AUTHORIZED: () => `/clans/authorized`,
};
