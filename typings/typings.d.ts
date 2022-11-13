export class BaseClient {
    private constructor(options?: ClientOptions);

    public options: ClientOptions;
    public destroy(): void;
}

export class Options extends null {
    private constructor();
    public static createDefault(): ClientOptions;
}

export interface ClientOptions {}