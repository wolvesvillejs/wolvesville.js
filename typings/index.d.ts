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

    fetch(player: PlayerResolvable, options?: {
        force: boolean
    });
    resolve(player: PlayerResolvable): Object;
}

type PlayerResolvable = String | Object;

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