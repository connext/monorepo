import { Logger } from "./logger";
import { createLoggingContext } from "./request";

export type SubgraphSyncRecord = {
  synced: boolean;
  latestBlock: number;
  syncedBlock: number;
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

  private get outOfSync(): Sdk<T>[] {
    return this.sdks.filter((sdk) => !sdk.record.synced);
  }

  constructor(
    private readonly logger: Logger,
    private readonly chainId: number,
    sdks: T[],
    // Subgraph is considered out of sync if it is more than this many blocks behind the latest block.
    private readonly subgraphSyncBuffer: number,
  ) {
    this.sdks = sdks.map((client) => ({
      client,
      record: {
        synced: false,
        latestBlock: 0,
        syncedBlock: 0,
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
    let bestSync = this.subgraphSyncBuffer + 1;
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

  public async sync(realBlockNumber: number): Promise<SubgraphSyncRecord[]> {
    const { methodContext } = createLoggingContext(this.sync.name);
    this.logger.debug("Getting sync records.", undefined, methodContext, {
      chainId: this.chainId,
    });
    for (let i = 0; i < this.sdks.length; i++) {
      const { _meta } = await this.sdks[i].client.GetBlockNumber();
      const subgraphBlockNumber = _meta.block.number ?? 0;
      const synced = realBlockNumber - subgraphBlockNumber <= this.subgraphSyncBuffer;
      this.sdks[i].record = {
        synced,
        latestBlock: realBlockNumber,
        syncedBlock: subgraphBlockNumber,
      };
    }
    const outOfSyncRecords = this.outOfSync;
    if (outOfSyncRecords.length > 0) {
      this.logger.warn("Subgraph client(s) out of sync.", undefined, methodContext, {
        chainId: this.chainId,
        allOutOfSync: outOfSyncRecords.length === this.sdks.length,
        outOfSyncRecords: outOfSyncRecords.map((sdk) => ({
          latestBlock: sdk.record.latestBlock,
          syncedBlock: sdk.record.syncedBlock,
        })),
      });
    }
    return this.sdks.map((sdk) => sdk.record);
  }
}
