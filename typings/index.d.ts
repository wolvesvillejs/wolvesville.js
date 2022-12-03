export abstract class BaseClient {
    public constructor(APIKey?: string);

    public readyTimestamp: number | null;

    public get readyAt(): Date | null;
    public get uptime(): number | null;

    public destroy(): void;
}

export class Client extends BaseClient {
    private constructor(APIKey?: string);

    public players: PlayerManager;
    public clans: ClanManager;
    public items: ItemManager;
    public itemSets: ItemSetManager;
    public itemCollections: ItemCollectionManager;
    public profileIcons: ProfileIconManager;
    public emojis: EmojiManager;
    public emojiCollections: EmojiCollectionManager;
    public backgrounds: BackgroundManager;
    public loadingScreens: LoadingScreenManager;
    public roleIcons: RoleIconManager;
    public roleCardPacks: RoleCardPackManager;
    public roses: RoseManager;
    public talismans: TalismanManager;

    public fetchGameModes(): Promise<Array<GameMode>>;
    public fetchBattlePassSeason(): Promise<BattlePassSeason>;
    public fetchBattlePassChallenges(): Promise<Array<BattlePassChallenge>>;
    public fetchShop(): Promise<Array<LimitedCollectionOffer|LimitedItemCollectionOffer|AdvancedRoleCardOffer|LimitedOffer>>;
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

export class ClanManager {}
export class ItemManager {}
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
export class BattlePassSeason {}
export class BattlePassChallenge {}
export class LimitedCollectionOffer {}
export class LimitedItemCollectionOffer {}
export class AdvancedRoleCardOffer {}
export class LimitedOffer {}

export class CacheManager {}