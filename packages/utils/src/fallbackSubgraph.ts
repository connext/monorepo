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

/**
 * @classdesc A class that manages the sync status of multiple subgraphs as well as their corresponding SDKs.
 */
export class FallbackSubgraph<T extends SdkLike> {
  private readonly sdks: Sdk<T>[];

  /**
   * Returns boolean representing whether at least one available subgraph is in sync.
   */
  public get inSync(): boolean {
    return this.sdks.some((sdk) => sdk.record.synced);
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

  /**
   * Make an SDK request using the fallback subgraph wrapper.
   *
   * @param method - anonymous callback function that takes an SdkLike client and executes a subgraph sdk method.
   * @param syncRequired - whether it's required for the subgraphs to be in-sync for this call, or if we can tolerate
   *  them being out of sync.
   * @param minBlock - minimum block number for the subgraphs to be in-sync to for this call.
   * @returns A Promise of the generic type.
   * @throws Error if the subgraphs are out of sync (and syncRequired is true).
   */
  public async request<Q>(method: (client: T) => Promise<any>, syncRequired = true, minBlock?: number): Promise<Q> {
    const { methodContext } = createLoggingContext(this.request.name);
    // If subgraph sync is requied, we'll check that all subgraphs are in sync before making the request.
    if (syncRequired && !this.inSync) {
      throw new Error(`All subgraphs out of sync on chain ${this.chainId}; unable to handle request.`);
    }
    // Order the subgraphs by lag / how in-sync they are.
    const ordered = this.sdks
      .sort((sdk) => sdk.record.lag)
      .filter((sdk) => (sdk.record.syncedBlock > (minBlock ?? 0) && syncRequired ? sdk.record.synced : true));
    const errors: Error[] = [];
    // Starting with most in-sync, keep retrying the callback with each client.
    for (let i = 0; i < ordered.length; i++) {
      const sdk = ordered[i];
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

  /**
   * Check synchronized status of all subgraphs, and update metrics.
   *
   * @param latestBlock - current latest block number according to RPC providers.
   * @returns Subgraph sync records for each subgraph.
   */
  public async sync(latestBlock: number): Promise<SubgraphSyncRecord[]> {
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
      }),
    );
    return this.sdks.map((sdk) => sdk.record);
  }
}
