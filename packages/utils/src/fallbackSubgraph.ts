import { NxtpError } from "./error";

export type SubgraphSyncRecord = {
  uri: string;
  synced: boolean;
  latestBlock: number;
  syncedBlock: number;
  lag: number;
};

type SdkLike = { GetBlockNumber: () => Promise<any> };

type CallMetric = {
  timestamp: number;
  execTime: number;
  success: boolean;
};

type Sdk<T extends SdkLike> = {
  client: T;
  record: SubgraphSyncRecord;
  priority: number;
  metrics: {
    calls: CallMetric[];
    cps: number;
    reliability: number;
    avgExecTime: number;
  };
};

/**
 * @classdesc A class that manages the sync status of multiple subgraphs as well as their corresponding SDKs.
 */
export class FallbackSubgraph<T extends SdkLike> {
  // Target maximum calls per second. Subgraphs can be called more than this per second, but it's
  // considered not preferable.
  private static MAX_CPS = 10;
  // Target number of samples in the call metrics for each subgraph call.
  private static readonly METRIC_WINDOW = 100;

  private readonly sdks: Sdk<T>[];

  /**
   * Returns boolean representing whether at least one available subgraph is in sync.
   */
  public get inSync(): boolean {
    return this.sdks.some((sdk) => sdk.record.synced);
  }

  /**
   * Returns boolean indicating whether we've synchronized the subgraphs at all (indicating
   * whether the records are in fact representative).
   */
  public get hasSynced(): boolean {
    return this.sdks.some((sdk) => sdk.record.syncedBlock !== -1 && sdk.record.latestBlock !== -1);
  }

  public get records(): SubgraphSyncRecord[] {
    return this.getOrderedSdks().map((sdk) => sdk.record);
  }

  /**
   *
   * @param chainId - Chain ID of the subgraphs.
   * @param sdks - SDK clients along with corresponding URIs used for each subgraph.
   * @param maxLag - Maximum lag value a subgraph can have before it's considered out of sync.
   * @param stallTimeout - the ms we wait until considering a subgraph RPC call to be a timeout.
   */
  constructor(
    private readonly chainId: number,
    // We use the URIs in sync records for reference in logging.
    sdks: { client: T; uri: string }[],
    private readonly maxLag: number,
    private readonly stallTimeout = 10_000,
  ) {
    this.sdks = sdks.map(({ client, uri }) => ({
      client,
      record: {
        synced: false,
        latestBlock: -1,
        syncedBlock: -1,
        // Setting maxLag + 1 as default to ensure we don't use the subgraph in this current state
        // by virtue of this metric (sync() must be called first).
        lag: this.maxLag + 1,
        // Typically used for logging, distinguishing between which subgraph is which, so we can monitor
        // which ones are most in sync.
        uri: uri.replace("https://", "").split(".com")[0],
      },
      priority: 0,
      metrics: {
        calls: [],
        cps: 0,
        reliability: 0,
        avgExecTime: 0,
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
  public async request<Q>(method: (client: T) => Promise<Q>, syncRequired = false, minBlock?: number): Promise<Q> {
    // If subgraph sync is requied, we'll check that all subgraphs are in sync before making the request.
    if (syncRequired && !this.inSync) {
      throw new Error(`All subgraphs out of sync on chain ${this.chainId}; unable to handle request.`);
    }
    const ordered = this.getOrderedSdks(syncRequired, minBlock);
    const errors: Error[] = [];
    // Try each SDK client in order of priority.
    for (const sdk of ordered) {
      try {
        return await Promise.race([
          new Promise<Q>(async (resolve, reject) => {
            const startTime = Date.now();
            let success = false;
            try {
              const result = await method(sdk.client);
              success = true;
              resolve(result);
            } catch (e) {
              reject(e);
            } finally {
              sdk.metrics.calls.push({
                timestamp: startTime,
                // Exec time is measured in seconds.
                execTime: (Date.now() - startTime) / 1000,
                success,
              });
            }
          }),
          new Promise<Q>((_, reject) =>
            setTimeout(() => reject(new NxtpError("Timeout")), this.stallTimeout),
          ),
        ]);
      } catch (e) {
        errors.push(e);
      }
    }
    throw new NxtpError("Unable to handle request", { errors });
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
    return this.records;
  }

  private getOrderedSdks(syncRequired = false, minBlock = 0): Sdk<T>[] {
    const sdks = this.sdks.filter((sdk) =>
      sdk.record.syncedBlock > minBlock && syncRequired ? sdk.record.synced : true,
    );
    // Compile metrics.
    sdks.forEach((sdk) => {
      // Get the last N calls (we will replace the calls property with the return value below).
      const calls = sdk.metrics.calls.slice(-FallbackSubgraph.METRIC_WINDOW);
      // Average calls per second over the window.
      const windowStart = calls[0]?.timestamp ?? 0;
      const windowEnd = calls[calls.length - 1]?.timestamp ?? 0;
      const cps = calls.length / (windowEnd - windowStart);
      // Average execution time for each call.
      const avgExecTime = calls.reduce((sum, call) => sum + call.execTime, 0) / calls.length;
      // Reliability is the ratio of successful calls to total calls.
      const reliability = calls.filter((call) => call.success).length / calls.length;
      sdk.metrics = {
        calls,
        cps,
        avgExecTime,
        reliability,
      };
    });
    // Order the subgraphs based on these metrics:
    // 1. Lag, which is the difference between the latest block and the subgraph's latest block.
    // 2. CPS, which is the number of calls per second the subgraph has been making (averaged over last N calls).
    // 3. Reliability, which is how often RPC calls to that subgraph are successful / total calls out of last N calls.
    // 4. Average execution time, which is the average execution time of the last N calls.
    sdks.forEach((sdk) => {
      sdk.priority =
        sdk.record.lag - sdk.metrics.cps / FallbackSubgraph.MAX_CPS - sdk.metrics.reliability + sdk.metrics.avgExecTime;
    });
    return this.sdks.sort((sdk) => sdk.priority);
  }
}
