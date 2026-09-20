'use strict';

/**
 * The player genders.
 * @typedef {string} Gender
 */
exports.Genders = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
};

/**
 * The clan member ranks.
 * @typedef {string} ClanRank
 */
exports.ClanRanks = {
  MEMBER: 'MEMBER',
  COLEADER: 'COLEADER',
  LEADER: 'LEADER',
};

/**
 * Item types.
 * @typedef {string} ItemType
 */
exports.ItemTypes = {
  GOLD: 'GOLD',
  ROSE_PACKAGE: 'ROSE',
  GEM: 'GEM',
  XP: 'XP',
  ROLE_CARD: 'ROLE_CARD',
  AVATAR_ITEM: 'AVATAR_ITEM',
  LOOT_BOX: 'LOOT_BOX',
  CARD_LOOT_BOX: 'CARD_LOOT_BOX',
  PROFILE_ICON: 'PROFILE_ICON',
  EMOJI: 'EMOJI',
  BACKGROUND: 'BACKGROUND',
  LOADING_SCREEN: 'LOADING_SCREEN',
  ROLE_CARD_ABILITY_EXCHANGE_VOUCHER: 'ROLE_CARD_ABILITY_EXCHANGE_VOUCHER',
  TALISMAN: 'TALISMAN',
  ITEM_SET: 'ITEM_SET',
  ROLE_ICON: 'ROLE_ICON',
  ITEM_COLLECTION: 'ITEM_COLLECTION',
  ROLE_CARD_PACK: 'ROLE_CARD_PACK',
  BATTLE_PASS_COIN: 'BATTLE_PASS_COIN',
  HONOR_BORDER: 'HONOR_BORDER',
  DAILY_CHALLENGE_SHUFFLE_VOUCHER: 'DAILY_CHALLENGE_SHUFFLE_VOUCHER',
  BODY_PAINT: 'BODY_PAINT',
};

/**
 * The player status.
 * @typedef {string} Status
 */
exports.Status = {
  DEFAULT: 'DEFAULT',
  PLAY: 'PLAY',
  DND: 'DND',
  OFFLINE: 'OFFLINE',
};

/**
 * The avatr item types.
 * @typedef {string} AvatarItemType
 */
exports.AvatarItemTypes = {
  HAT: 'HAT',
  HAIR: 'HAIR',
  EYES: 'EYES',
  GLASSES: 'GLASSES',
  MOUTH: 'MOUTH',
  MASK: 'MASK',
  BADGE: 'BADGE',
  GRAVESTONE: 'GRAVESTONE',
  // API enum values (preferred names)
  SHIRT: 'SHIRT',
  FRONT: 'FRONT',
  BACK: 'BACK',
  LEGS: 'LEGS',
  // Legacy aliases kept for backwards compatibility
  CLOTHES: 'SHIRT',
  FOREGROUND: 'FRONT',
};

/**
 * The events an item can originate from.
 * @typedef {string} AvatarItemEvent
 */
exports.AvatarItemEvents = {
  XMAS: 'XMAS',
  EASTER: 'EASTER',
  HALLOWEEN: 'HALLOWEEN',
  EARLY_BIRD: 'EARLY_BIRD',
  ST_PATRICK: 'ST_PATRICK',
  BATTLE_PASS: 'BATTLE_PASS',
  WHEEL: 'WHEEL',
  ITEMS_COLLECTION: 'ITEMS_COLLECTION',
  SOCCER: 'SOCCER',
  CALENDAR: 'CALENDAR',
  ROLE_CARDS: 'ROLE_CARDS',
  LEVEL_UP_CARD: 'LEVEL_UP_CARD',
  EMOJIS_COLLECTION: 'EMOJIS_COLLECTION',
  BUNDLE_OFFER: 'BUNDLE_OFFER',
  HONOR_REWARD: 'HONOR_REWARD',
  SUBSCRIPTION: 'SUBSCRIPTION',
  TWITCH: 'TWITCH',
  BLACK_FRIDAY: 'BLACK_FRIDAY',
  FOOTBALL26: 'FOOTBALL26',
};

/**
 * The item rarities.
 * @typedef {string} Rarity
 */
exports.Rarities = {
  COMMON: 'COMMON',
  RARE: 'RARE',
  EPIC: 'EPIC',
  LEGENDARY: 'LEGENDARY',
  MYTHICAL: 'MYTHICAL',
};

/**
 * The clan ledger actions.
 * @typedef {string} ClanLedgerAction
 */
exports.ClanLedgerActions = {
  CREATE_CLAN: 'CREATE_CLAN',
  DONATE: 'DONATE',
  REVERT_DONATE: 'REVERT_DONATE',
  CLAN_ICON: 'CLAN_ICON',
  CLAN_QUEST: 'CLAN_QUEST',
  CLAN_QUEST_SHUFFLE: 'CLAN_QUEST_SHUFFLE',
  CLAN_QUEST_SKIP_WAIT: 'CLAN_QUEST_SKIP_WAIT',
  CLAN_QUEST_CLAIM_TIME: 'CLAN_QUEST_CLAIM_TIME',
};

/**
 * The clan actions.
 * @typedef {string} ClanAction
 */
exports.ClanActions = {
  BLACKLIST_ADDED: 'BLACKLIST_ADDED',
  BLACKLIST_REMOVED: 'BLACKLIST_REMOVED',
  JOIN_REQUEST_SENT_BY_CLAN: 'JOIN_REQUEST_SENT_BY_CLAN',
  JOIN_REQUEST_SENT_BY_EXTERNAL_PLAYER: 'JOIN_REQUEST_SENT_BY_EXTERNAL_PLAYER',
  JOIN_REQUEST_ACCEPTED: 'JOIN_REQUEST_ACCEPTED',
  JOIN_REQUEST_DECLINED_BY_CLAN: 'JOIN_REQUEST_DECLINED_BY_CLAN',
  JOIN_REQUEST_DECLINED_BY_EXTERNAL_PLAYER: 'JOIN_REQUEST_DECLINED_BY_EXTERNAL_PLAYER',
  JOIN_REQUEST_WITHDRAWN: 'JOIN_REQUEST_WITHDRAWN',
  LEADER_CHANGED: 'LEADER_CHANGED',
  CO_LEADER_PROMOTED: 'CO_LEADER_PROMOTED',
  CO_LEADER_DEMOTED: 'CO_LEADER_DEMOTED',
  CO_LEADER_RESIGNED: 'CO_LEADER_RESIGNED',
  PLAYER_LEFT: 'PLAYER_LEFT',
  PLAYER_KICKED: 'PLAYER_KICKED',
  PLAYER_JOINED: 'PLAYER_JOINED',
  PLAYER_QUEST_PARTICIPATION_ENABLED: 'PLAYER_QUEST_PARTICIPATION_ENABLED',
  PLAYER_QUEST_PARTICIPATION_DISABLED: 'PLAYER_QUEST_PARTICIPATION_DISABLED',
  ALL_QUEST_PARTICIPATION_ENABLED: 'ALL_QUEST_PARTICIPATION_ENABLED',
  ALL_QUEST_PARTICIPATION_DISABLED: 'ALL_QUEST_PARTICIPATION_DISABLED',
  FLAIR_EDITED: 'FLAIR_EDITED',
};

/**
 * The supported locales.
 * @typedef {string} Locale
 */
exports.LOCALES = {
  EN: 'en',
  AR: 'ar',
  AZ: 'az',
  BG: 'bg',
  BS: 'bs',
  CA: 'ca',
  CS: 'cs',
  DA: 'da',
  DE: 'de',
  DE_AT: 'de-at',
  EL: 'el',
  ES: 'es',
  ES_419: 'es-419',
  ET: 'et',
  FA: 'fa',
  FI: 'fi',
  FIL: 'fil',
  FR: 'fr',
  GL: 'gl',
  HE: 'he',
  HI: 'hi',
  HR: 'hr',
  HU: 'hu',
  ID: 'id',
  IT: 'it',
  JA: 'ja',
  KA: 'ka',
  KO: 'ko',
  LO: 'lo',
  LT: 'lt',
  MS: 'ms',
  NL: 'nl',
  NL_BE: 'nl-be',
  PL: 'pl',
  PT: 'pt',
  PT_BR: 'pt-br',
  RO: 'ro',
  RU: 'ru',
  SK: 'sk',
  SL: 'sl',
  SQ: 'sq',
  SR: 'sr',
  SR_CRYL: 'sr-cyrl',
  SV: 'sv',
  TH: 'th',
  TR: 'tr',
  UK: 'uk',
  VI: 'vi',
  ZH_CN: 'zh-cn',
  ZH_TW: 'zh-tw',
};
