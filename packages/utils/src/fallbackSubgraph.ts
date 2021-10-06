import { jsonifyError } from "./error";
import { Logger } from "./logger";
import { createLoggingContext } from "./request";

export type SubgraphSyncRecord = {
  uri: string;
  synced: boolean;
  latestBlock: number;
  syncedBlock: number;
  lag: number;
};

type SdkLike = { GetBlockNumber: () => Promise<any> };

type Sdk<T extends SdkLike> = {
  client: T;
  record: SubgraphSyncRecord;
};

export class FallbackSubgraph<T extends SdkLike> {
  private readonly sdks: Sdk<T>[];

  private get synced(): Sdk<T>[] {
    return this.sdks.filter((sdk) => sdk.record.synced);
  }

  constructor(
    private readonly logger: Logger,
    private readonly chainId: number,
    // We use the URIs in sync records for reference in logging.
    sdks: { client: T; uri: string }[],
    // Subgraph is considered out of sync if it lags more than this many blocks behind the latest block.
    private readonly maxLag: number,
  ) {
    this.sdks = sdks.map(({ client, uri }) => ({
      client,
      record: {
        synced: false,
        latestBlock: 0,
        syncedBlock: 0,
        // Setting maxLag + 1 as default to ensure we don't use the subgraph in this current state
        // by virtue of this metric (sync() must be called first).
        lag: this.maxLag + 1,
        // Typically used for logging, distinguishing between which subgraph is which, so we can monitor
        // which ones are most in sync.
        uri: uri.replace("https://", "").split(".com")[0],
      },
    }));
  }

  public async useSynced<Q>(method: (client: T) => Promise<any>, minBlock?: number): Promise<Q> {
    const { methodContext } = createLoggingContext(this.sync.name);
    const synced = this.synced.sort((sdk) => sdk.record.lag).filter((sdk) => sdk.record.syncedBlock > (minBlock ?? 0));
    if (synced.length === 0) {
      throw new Error("No subgraphs available and in-sync!");
    }
    const errors: Error[] = [];
    // Starting with most in-sync, keep retrying the callback with each client.
    for (let i = 0; i < synced.length; i++) {
      const sdk = synced[i];
      try {
        return await method(sdk.client);
      } catch (e) {
        errors.push(e);
      }
    }
    this.logger.error(
      "Error calling method on subgraph client(s).",
      undefined,
      methodContext,
      jsonifyError(errors[0]),
      {
        chainId: this.chainId,
        otherErrors: errors.slice(1),
      },
    );
    throw errors[0];
  }

  public async sync(latestBlock: number): Promise<SubgraphSyncRecord[]> {
    const { methodContext } = createLoggingContext(this.sync.name);
    // Using a Promise.all here to ensure we do our GetBlockNumber queries in parallel.
    await Promise.all(
      this.sdks.map(async (sdk, index) => {
        const record = this.sdks[index].record;
        // We'll retry after an ENOTFOUND error up to 5 times.
        const errors: Error[] = [];
        for (let i = 0; i < 5; i++) {
          try {
            const { _meta } = await sdk.client.GetBlockNumber();
            const syncedBlock = _meta.block.number ?? 0;
            this.logger.debug("syncedBlock", undefined, methodContext, { syncedBlock });
            const synced = latestBlock - syncedBlock <= this.maxLag;
            this.sdks[index].record = {
              ...record,
              synced,
              latestBlock,
              syncedBlock,
              lag: latestBlock - syncedBlock,
            };
            return;
          } catch (e) {
            errors.push(e);
            if (e.errno !== "ENOTFOUND") {
              break;
            }
          }
        }
        this.sdks[index].record = {
          ...record,
          synced: false,
          latestBlock,
          lag: record.syncedBlock > 0 ? latestBlock - record.syncedBlock : record.lag,
        };
        this.logger.error(
          "Error getting block number with subgraph client.",
          undefined,
          methodContext,
          jsonifyError(errors[0]),
          {
            chainId: this.chainId,
            otherErrors: errors.slice(1),
          },
        );
      }),
    );
    return this.sdks.map((sdk) => sdk.record);
  }
}
