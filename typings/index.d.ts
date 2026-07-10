export abstract class BaseClient {
    public constructor(APIKey?: string);

    public readyTimestamp: number | null;

    public get readyAt(): Date | null;
    public get uptime(): number | null;

    public destroy(): void;
}

export class Client extends BaseClient {
    private constructor(APIKey?: string);

    public avatars: AvatarManager;
    public players: PlayerManager;
    public clans: ClanManager;
    public items: ItemManager;
    public itemSets: ItemSetManager;
    public itemCollections: ItemCollectionManager;
    public profileIcons: ProfileIconManager;
    public profileIconBorders: ProfileIconBorderManager;
    public emojis: EmojiManager;
    public emojiCollections: EmojiCollectionManager;
    public backgrounds: BackgroundManager;
    public badges: BadgeManager;
    public loadingScreens: LoadingScreenManager;
    public roles: RoleManager;
    public roleIcons: RoleIconManager;
    public roleCardPacks: RoleCardPackManager;
    public roses: RoseManager;
    public roseSkins: RoseSkinManager;
    public talismans: TalismanManager;
    public bodyPaints: BodyPaintManager;
    public bundles: BundleManager;
    public calendars: CalendarManager;
    public tags: TagManager;
    public baseRoleCardOffers: BaseRoleCardOfferManager;

    public fetchGameModes(locale?: string): Promise<Array<GameMode>>;
    public fetchBattlePassSeason(): Promise<BattlePassSeason>;
    public fetchBattlePassSeasonByNumber(seasonNumber: number): Promise<BattlePassSeason>;
    public fetchBattlePassChallenges(locale?: string): Promise<Array<BattlePassChallenge>>;
    public fetchBattlePassShop(): Promise<BattlePassCoinShop>;
    public fetchShop(): Promise<Array<LimitedCollectionOffer|LimitedItemCollectionOffer|AdvancedRoleCardOffer|LimitedOffer>>;
    public fetchQuests(): Promise<Array<ClanQuest>>;
    public fetchAnnouncements(): Promise<Announcements>;
    public fetchRankedSeason(): Promise<RankedSeasonInfo>;
    public fetchRankedHallOfFame(seasonNumber: number): Promise<SeasonWinners>;
    public fetchRankedLeaderboard(language?: string): Promise<Leaderboard>;
    public fetchPlayerHighscores(): Promise<HighScore>;
    public fetchEvents(): Promise<Array<Event>>;
    public fetchMoonlight(): Promise<Array<Moonlight>>;
    public redeemApiHat(): Promise<void>;
}

export class PlayerManager extends CacheManager {
    private constructor(client: Client);

    public fetch(player: PlayerResolvable, options?: {
        force: boolean
    }): Player;
    public resolve(player: PlayerResolvable): Object | null;
}

type PlayerResolvable = String | Object;

type Status = 'DEFAULT' | 'PLAY' | 'DND' | 'OFFLINE';

export class Player {
    public id: string;
    public username: string | null;
    public personalMessage: string | null;
    public profileImageURL: string | null;
    public profileBackgroundPrimaryColor: string | null;
    public profileBackgroundAccentColor: string | null;
    public level: number | null;
    public status: Status | null;
    public receivedRosesCount: number | null;
    public sentRosesCount: number | null;
    public profileIcon: OwnedProfileIcon | null;
    public clanId: string | null;
    public gameStats: object | null;
    public seasonSkill: number | null;
    public skillRecord: number | null;
    public rankRecord: number | null;
    public seasonPlayedCount: number | null;
    public lastOnlineTimestamp: number | null;
    public avatars: Avatar[] | null;
    public badgeIds: string[] | null;
    public roleCards: RoleCard[] | null;
    public favorites: Array<{ emojiId: string | null, roleId: string | null }> | null;
    public battlePassBadges: BattlePassBadge[] | null;
    public events: PlayerEventSummary[] | null;

    public fetchClan(force?: boolean): Promise<Clan>;
    public get clanTag(): String | null;
    public get clanTagAndUsername(): String | null;
    public get badges(): Item[] | null;
    public get clan(): Clan | null;
    public get online(): boolean | null;
    public get gamesPlayedCount(): number | null;
}

export class OwnedProfileIcon {}
export class Avatar {}
export class RoleCard {}
export class Clan {}
export class Item {}

export class AvatarManager {}
export class BadgeManager {}
export class BaseRoleCardOfferManager {}
export class BodyPaintManager {}
export class BundleManager {}
export class CalendarManager {}
export class ClanManager {}
export class ItemManager {}
export class ProfileIconBorderManager {}
export class RoleManager {}
export class RoseSkinManager {}
export class TagManager {}
export class ItemSetManager {}
export class ItemCollectionManager {}
export class ProfileIconManager {}
export class EmojiManager {}
export class EmojiCollectionManager {}
export class BackgroundManager {}
export class LoadingScreenManager {}
export class RoleIconManager {}
export class RoleCardPackManager {}
export class RoseManager {}
export class TalismanManager {}

export class GameMode {}
export class Announcements {}
export class BattlePassSeason {}
export class BattlePassChallenge {}
export class BattlePassCoinShop {}
export class BattlePassBadge {}
export class Badge {}
export class ClanQuest {}
export class Event {}
export class EventReward {}
export class HighScore {}
export class Leaderboard {}
export class LimitedCollectionOffer {}
export class LimitedItemCollectionOffer {}
export class AdvancedRoleCardOffer {}
export class LimitedOffer {}
export class Moonlight {}
export class PlayerEventSummary {}
export class RankedSeasonInfo {}
export class SeasonWinners {}

export class CacheManager {}