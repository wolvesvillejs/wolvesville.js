'use strict';

module.exports = {
  // Announcements
  ANNOUNCEMENTS: () => '/announcements',

  // Roles
  ROLES: () => '/roles', 

  // Items
  AVATAR_ITEMS: () => '/items/avatarItems',
  AVATAR_ITEM_SETS: () => '/items/avatarItemSets',
  AVATAR_ITEM_COLLECTIONS: () => '/items/avatarItemCollections',
  BODY_PAINTS: () => '/items/bodyPaints',
  BUNDLES: () => '/items/bundles',
  CALENDARS: () => '/items/calendars',
  TAGS: () => '/items/tags',
  PROFILE_ICONS: () => '/items/profileIcons',
  PROFILE_ICON_BORDERS: () => '/items/profileIconBorders',
  EMOJIS: () => '/items/emojis',
  EMOJI_COLLECTIONS: () => '/items/emojiCollections',
  BACKGROUNDS: () => '/items/backgrounds',
  LOADING_SCREENS: () => '/items/loadingScreens',
  ROLE_ICONS: () => '/items/roleIcons',
  ADVANCED_ROLE_CARD_OFFERS: () => '/items/advancedRoleCardOffers',
  BASE_ROLE_CARD_OFFERS: () => '/items/baseRoleCardOffers',
  ROSES: () => '/items/roses',
  ROSE_SKINS: () => '/items/roseSkins',
  TALISMANS: () => '/items/talismans',
  REDEEM_API_HAT: () => '/items/redeemApiHat',

  // Avatars
  AVATARS: avatarId => `/avatars/${avatarId}`,
  AVATARS_SHARED_ID: (playerId, slotNumber) => `/avatars/sharedAvatarId/${playerId}/${slotNumber}`,
  AVATARS_SHARED_CREATE: () => '/avatars/sharedAvatar',

  // Role Rotations
  ROLE_ROTATIONS: () => '/roleRotations',

  // Battle Pass
  BATTLE_PASS_SEASON: () => '/battlePass/season',
  BATTLE_PASS_CHALLENGES: () => '/battlePass/challenges',
  BATTLE_PASS_SHOP: () => '/battlePass/shop',

  // Ranked
  RANKED_SEASON: () => '/ranked/season',
  RANKED_HALL_OF_FAME: seasonNumber => `/ranked/hallOfFame/${seasonNumber}`,
  RANKED_LEADERBOARD: () => '/ranked/leaderboard',

  // Shop
  ACTIVE_OFFERS: () => '/shop/activeOffers',

  // Players
  PLAYER: playerId => `/players/${playerId}`,
  PLAYER_BY_USERNAME: () => `/players/search`,
  PLAYER_HIGHSCORES: () => '/players/highscores',

  // Clans
  CLANS_SEARCH_BY_NAME: () => `/clans/search`,
  CLANS_INFO: clanId => `/clans/${clanId}/info`,
  CLANS_MEMBERS: clanId => `/clans/${clanId}/members`,
  CLANS_MEMBERS_DETAILED: clanId => `/clans/${clanId}/members/detailed`,
  CLANS_MEMBERS_MEMBER: (clanId, memberId) => `/clans/${clanId}/members/${memberId}`,
  CLANS_MEMBERS_MEMBER_DETAILED: (clanId, memberId) => `/clans/${clanId}/members/${memberId}/detailed`,
  CLANS_MEMBERS_MEMBER_FLAIR: (clanId, memberId) => `/clans/${clanId}/members/${memberId}/flair`,
  CLANS_MEMBERS_MEMBER_PARTICIPATE_IN_QUESTS: (clanId, memberId) =>
    `/clans/${clanId}/members/${memberId}/participateInQuests`,
  CLANS_MEMBERS_ALL_PARTICIPATE_IN_QUESTS: clanId => `/clans/${clanId}/members/all/participateInQuests`,
  CLANS_MEMBERS_MEMBER_KICK: (clanId, memberId) => `/clans/${clanId}/members/${memberId}/kick`,
  CLANS_MEMBERS_MEMBER_BLOCK: (clanId, memberId) => `/clans/${clanId}/members/${memberId}/block`,
  CLANS_MEMBERS_MEMBER_UNBLOCK: (clanId, memberId) => `/clans/${clanId}/members/${memberId}/unblock`,
  CLANS_CHAT: clanId => `/clans/${clanId}/chat`,
  CLANS_ANNOUNCEMENTS: clanId => `/clans/${clanId}/announcements`,
  CLANS_LEDGER: clanId => `/clans/${clanId}/ledger`,
  CLANS_LOGS: clanId => `/clans/${clanId}/logs`,
  CLANS_BLOCKLIST: clanId => `/clans/${clanId}/blocklist`,
  CLANS_QUESTS_AVAILABLE: clanId => `/clans/${clanId}/quests/available`,
  CLANS_QUESTS_VOTES: clanId => `/clans/${clanId}/quests/votes`,
  CLANS_QUESTS_SHUFFLE: clanId => `/clans/${clanId}/quests/available/shuffle`,
  CLANS_QUESTS_CLAIM: clanId => `/clans/${clanId}/quests/claim`,
  CLANS_QUESTS_ACTIVE: clanId => `/clans/${clanId}/quests/active`,
  CLANS_QUESTS_ACTIVE_SKIP_WAITING_TIME: clanId => `/clans/${clanId}/quests/active/skipWaitingTime`,
  CLANS_QUESTS_ACTIVE_CLAIM_TIME: clanId => `/clans/${clanId}/quests/active/claimTime`,
  CLANS_QUESTS_ACTIVE_CANCEL: clanId => `/clans/${clanId}/quests/active/cancel`,
  CLANS_QUESTS_HISTORY: clanId => `/clans/${clanId}/quests/history`,
  CLANS_QUESTS_ALL: () => `/clans/quests/all`,
  CLANS_AUTHORIZED: () => `/clans/authorized`,
};
