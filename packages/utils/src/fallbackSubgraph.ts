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

type SdkLike = { GetBlockNumber: () => Promise<any> }

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
    sdks: { client: T; uri: string; }[],
    // Subgraph is considered out of sync if it lags more than this many blocks behind the latest block.
    private readonly maxLag: number,
  ) {
    this.sdks = sdks.map(({ client, uri }) => ({
      client,
      record: {
        synced: false,
        latestBlock: 0,
        syncedBlock: 0,
        lag: this.maxLag + 1,
        uri: uri.replace("https://", "").split(".com")[0],
      },
    }));
  }

  public getSynced(): T {
    const synced = this.synced;
    if (synced.length === 0) {
      throw new Error("No subgraphs available / in-sync!");
    }

    // Quickest way to, in one loop, get the most in-sync clients.
    let mostInSyncClients: T[] = [];
    let bestSync = this.maxLag + 1;
    for (let i = 0; i < synced.length; i++) {
      const sdk = synced[i];
      const difference = sdk.record.latestBlock - sdk.record.syncedBlock;
      if (difference < bestSync) {
        mostInSyncClients = [sdk.client];
        bestSync = difference;
      } else if (difference === bestSync) {
        mostInSyncClients.push(sdk.client);
      }
    }

    // Now we just return a random client out of the most in sync ones.
    return mostInSyncClients[Math.floor(Math.random() * mostInSyncClients.length)];
  }

  public async useSynced<Q>(method: (client: T) => Promise<any>): Promise<Q> {
    const { methodContext } = createLoggingContext(this.sync.name);
    const synced = this.synced.sort(sdk => sdk.record.latestBlock - sdk.record.syncedBlock);
    if (synced.length === 0) {
      throw new Error("No subgraphs available / in-sync!");
    }
    const errors: Error[] = [];
    // Starting with most in-sync, keep retrying the callback with each client.
    for (let i = 0; i < synced.length; i++) {
      try {
        return await method(synced[i].client);
      } catch (e) {
        errors.push(e);
      }
    }
    // TODO: Throw an error that holds all the errors that occurred?
    this.logger.error("Error calling method on subgraph client(s).", undefined, methodContext, jsonifyError(errors[0]), {
      chainId: this.chainId,
      otherErrors: errors.slice(1),
    });
    throw errors[0];
  }

  public async sync(latestBlock: number): Promise<SubgraphSyncRecord[]> {
    // Using a Promise.all here to ensure we do our GetBlockNumber queries in parallel.
    await Promise.all(this.sdks.map(async (sdk, index) => {
      try {
        const { _meta } = await sdk.client.GetBlockNumber();
        const syncedBlock = _meta.block.number ?? 0;
        const synced = latestBlock - syncedBlock <= this.maxLag;
        this.sdks[index].record = {
          ...this.sdks[index].record,
          synced,
          latestBlock,
          syncedBlock,
          lag: latestBlock - syncedBlock,
        };
      } catch (e) {
        const { methodContext } = createLoggingContext(this.sync.name);
        this.logger.error("Error getting block number with subgraph client.", undefined, methodContext, jsonifyError(e), {
          chainId: this.chainId,
        });
      }
    }));
    return this.sdks.map((sdk) => sdk.record);
  }
}
