export abstract class BaseClient {
    private constructor(options?: ClientOptions);

    public options: ClientOptions;
    public readyTimestamp: ?number;

    readonly get readyAt(): ?Date;
    readonly get uptime(): ?number;

    public login(APIKey: ?string): void;
    public destroy(): void;
}

export class Options extends null {
    private constructor();
    public static createDefault(): ClientOptions;
}

export interface ClientOptions {}