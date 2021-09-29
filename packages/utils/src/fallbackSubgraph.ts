import { Logger } from "./logger";
import { createLoggingContext } from "./request";

export type Sdk<T> = {
  client: T;
  synced: boolean;
  latestBlock: number;
  syncedBlock: number;
};

export class FallbackSubgraph<T extends { GetBlockNumber: () => Promise<any>; }> {
  private readonly sdks: Sdk<T>[];

  private get synced(): Sdk<T>[] {
    return this.sdks.filter((sdk) => sdk.synced);
  }

  private get outOfSync(): Sdk<T>[] {
    return this.sdks.filter((sdk) => !sdk.synced);
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
      synced: false,
      latestBlock: 0,
      syncedBlock: 0,
    }));
  }

  public getSynced(): T {
    const synced = this.synced;
    if (synced.length === 0) {
      throw new Error("No subgraphs available / in-sync!");
    }
    // Get a random client to ensure we are varying which subgraph client we're using.
    return synced[Math.floor(Math.random() * synced.length)].client;
  }

  public async sync(realBlockNumber: number) {
    const { methodContext } = createLoggingContext(this.sync.name);
    this.logger.debug("Getting sync records.", undefined, methodContext, {
      chainId: this.chainId,
    });
    for (let i = 0; i < this.sdks.length; i++) {
      const { _meta } = await this.sdks[i].client.GetBlockNumber();
      const subgraphBlockNumber = _meta.block.number ?? 0;
      if (realBlockNumber - subgraphBlockNumber > this.subgraphSyncBuffer) {
        this.sdks[i].synced = false;
      } else {
        this.sdks[i].synced = true;
      }
      this.sdks[i].latestBlock = realBlockNumber;
      this.sdks[i].syncedBlock = subgraphBlockNumber;
    }
    const outOfSyncRecords = this.outOfSync;
    if (outOfSyncRecords.length > 0) {
      this.logger.warn("Subgraph client(s) out of sync.", undefined, methodContext, {
        chainId: this.chainId,
        allOutOfSync: outOfSyncRecords.length === this.sdks.length,
        outOfSyncRecords: outOfSyncRecords.map((sdk) => ({
          latestBlock: sdk.latestBlock,
          syncedBlock: sdk.syncedBlock,
        })),
      });
    }
  }
}
