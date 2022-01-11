import axios, { AxiosResponse } from "axios";
import { request } from "graphql-request";

import { NxtpError } from "./error";

const SUBGRAPH_INFO_ENDPOINT = "https://subgraph-ts-worker.connext.workers.dev/";

export type SubgraphSyncRecord = {
  name: string;
  synced: boolean;
  latestBlock: number;
  syncedBlock: number;
  lag: number;
  error?: any;
};

type SubgraphSdk = { GetBlockNumber: () => Promise<any> };

type CallMetric = {
  timestamp: number;
  execTime: number;
  success: boolean;
};

type Subgraph<T extends SubgraphSdk> = {
  url: string;
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

// Return types for subgraph health endpoint.
type SubgraphHealthError = {
  message: string;
  block: number;
  handler: any;
};

type SubgraphHealth = {
  chainHeadBlock: number;
  latestBlock: number;
  lastHealthyBlock: number | undefined;
  network: string;
  fatalError: SubgraphHealthError | undefined;
  health:
    | "healthy" // Subgraph syncing normally
    | "unhealthy" // Subgraph syncing but with errors
    | "failed"; // Subgraph halted due to errors
  synced: boolean;
};

// TODO: Would be cool if we could pass in like, 1/4 * maxLag * blockLengthMs (and get the blockLengthMs from chain reader, which determines that value on init)
const SYNC_CACHE_TTL = 5_000;

/**
 * @classdesc A class that manages the sync status of multiple subgraphs as well as their corresponding SDKs.
 */
export class FallbackSubgraph<T extends SubgraphSdk> {
  // Target maximum calls per second. Subgraphs can be called more than this per second, but it's
  // considered not preferable.
  private static MAX_CPS = 10;
  // Target number of samples in the call metrics for each subgraph call.
  private static readonly METRIC_WINDOW = 100;

  private readonly subgraphs: Map<string, Subgraph<T>> = new Map();

  private latestSync = 0;

  /**
   * Returns boolean representing whether at least one available subgraph is in sync.
   */
  public get inSync(): boolean {
    return Object.values(this.subgraphs).some((subgraph) => subgraph.record.synced);
  }

  /**
   * Returns boolean indicating whether we've synchronized the subgraphs at all (indicating
   * whether the records are in fact representative).
   */
  public get hasSynced(): boolean {
    return Object.values(this.subgraphs).some(
      (subgraph) => subgraph.record.syncedBlock !== -1 && subgraph.record.latestBlock !== -1,
    );
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
    private readonly generateClient: (url: string) => T,
    private readonly maxLag: number,
    private readonly stallTimeout = 10_000,
  ) {
    this.sync();
  }

  /**
   * Raw string query method.
   *
   * @param query - GraphQL query string.
   *
   * @returns any, whatever the expected GraphQL response is.
   */
  public async query(query: string): Promise<any> {
    return this.request((_, url) => {
      return request(url, query);
    }, false);
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
  public async request<Q>(method: (client: T, url: string) => Promise<Q>, syncRequired = false): Promise<Q> {
    // If subgraph sync is requied, we'll check that all subgraphs are in sync before making the request.
    if (syncRequired && !this.inSync) {
      throw new Error(`All subgraphs out of sync on chain ${this.chainId}; unable to handle request.`);
    }
    const orderedSubgraphs = this.getOrderedSdks();
    const errors: Error[] = [];
    // Try each SDK client in order of priority.
    for (const subgraph of orderedSubgraphs) {
      try {
        return await Promise.race([
          new Promise<Q>(async (resolve, reject) => {
            const startTime = Date.now();
            let success = false;
            try {
              const result = await method(subgraph.client, subgraph.url);
              success = true;
              resolve(result);
            } catch (e) {
              reject(e);
            } finally {
              subgraph.metrics.calls.push({
                timestamp: startTime,
                // Exec time is measured in seconds.
                execTime: (Date.now() - startTime) / 1000,
                success,
              });
            }
          }),
          new Promise<Q>((_, reject) => setTimeout(() => reject(new NxtpError("Timeout")), this.stallTimeout)),
        ]);
      } catch (e: any) {
        errors.push(e);
      }
    }
    throw new NxtpError("Unable to handle request", { errors });
  }

  // TODO: Need a serialized thread lock for this activity so sync() is not called (and run) twice concurrently.
  /**
   * Check synchronized status of all subgraphs, and update metrics.
   *
   * @returns Subgraph sync records for each subgraph.
   */
  public async sync(): Promise<SubgraphSyncRecord[]> {
    // If the latest sync was within SYNC_CACHE_TTL, do not requery
    if (Date.now() - this.latestSync < SYNC_CACHE_TTL) {
      return this.records;
    }

    // Target this chain's endpoint.
    const endPointUrl = SUBGRAPH_INFO_ENDPOINT.concat(`?chainId=${this.chainId}`);
    const response: AxiosResponse<string> = await axios.get(endPointUrl);

    if (!response || !response.data || response.data.length === 0) {
      throw new NxtpError("Received bad response; make sure your key file is configured correctly.", {
        response,
      });
    }

    // Parse the response, handle each subgraph in the response.
    const subgraphs = JSON.parse(response.data) as SubgraphHealth[];
    subgraphs.forEach((info: any) => {
      // If we don't have this subgraph mapped, create a new one to work with.
      const subgraph: Subgraph<T> = this.subgraphs.get(info.url) ?? this.createSubgraph(info.url);
      const lag = info.latestBlock && info.syncedBlock ? info.latestBlock - info.syncedBlock : undefined;
      const synced: boolean = lag ? lag <= this.maxLag : info.synced ? info.synced : false;
      // Update the record accordingly.
      subgraph.record = {
        ...subgraph.record,
        synced,
        latestBlock: info.latestBlock,
        syncedBlock: info.syncedBlock ?? subgraph.record.syncedBlock,
        // Want to avoid a lag value of -1, which happens due to asyncronous reporting of latest
        // block vs synced block.
        lag: Math.max(0, lag ?? this.maxLag),
        error: info.fatalError,
      };
      this.subgraphs.set(info.url, subgraph);
    });

    this.latestSync = Date.now();
    return this.records;
  }

  private getOrderedSdks(): Subgraph<T>[] {
    // Order the subgraphs based on these metrics:
    // 1. Lag, which is the difference between the latest block and the subgraph's latest block.
    // 2. CPS, which is the number of calls per second the subgraph has been making (averaged over last N calls).
    // 3. Reliability, which is how often RPC calls to that subgraph are successful / total calls out of last N calls.
    // 4. Average execution time, which is the average execution time of the last N calls.
    this.subgraphs.forEach((subgraph) => {
      // Get the last N calls (we will replace the calls property with the return value below).
      const calls = subgraph.metrics.calls.slice(-FallbackSubgraph.METRIC_WINDOW);
      // Average calls per second over the window.
      const tsWindowStart = calls[0]?.timestamp ?? 0;
      const tsWindowEnd = calls[calls.length - 1]?.timestamp ?? 0;
      const tsWindow = tsWindowEnd - tsWindowStart;
      // Timestamp window must be >= 1 second for sufficient sample size.
      const cps = tsWindow >= 1 ? calls.length / tsWindow : 0;
      // Average execution time for each call.
      const avgExecTime = calls.reduce((sum, call) => sum + call.execTime, 0) / calls.length;
      // Reliability is the ratio of successful calls to total calls.
      const reliability = calls.filter((call) => call.success).length / calls.length;
      subgraph.metrics = {
        calls,
        cps,
        avgExecTime,
        reliability,
      };
      subgraph.priority =
        subgraph.record.lag -
        subgraph.metrics.cps / FallbackSubgraph.MAX_CPS -
        subgraph.metrics.reliability +
        subgraph.metrics.avgExecTime;
    });

    // Always start with the in sync subgraphs and then concat the out of sync subgraphs.
    // Metrics should only come in to play to sort subgraph call order within each group (i.e. we should never prioritize
    // an out-of-sync subgraph over a synced one).
    return Object.values(this.subgraphs)
      .filter((subgraph) => subgraph.record.synced)
      .sort((subgraphA, subgraphB) => subgraphA.priority - subgraphB.priority)
      .concat(Object.values(this.subgraphs).filter((subgraph) => !subgraph.record.synced))
      .sort((subgraphA, subgraphB) => subgraphA.priority - subgraphB.priority);
  }

  private createSubgraph(url: string): Subgraph<T> {
    const getSubgraphName = (url: string) => {
      const split = url.split("/");
      return split[split.length - 1];
    };
    return {
      url,
      client: this.generateClient(url),
      record: {
        name: getSubgraphName(url),
        synced: true,
        latestBlock: -1,
        syncedBlock: -1,
        lag: 0,
        error: undefined,
      },
      priority: 0,
      metrics: {
        calls: [],
        cps: 0,
        reliability: 0,
        avgExecTime: 0,
      },
    };
  }
}
