"use strict";

export abstract class BaseClient {
    private constructor(APIKey?: string);

    public readyTimestamp: number | null;

    public get readyAt(): Date | null;
    public get uptime(): number | null;

    public destroy(): void;
}