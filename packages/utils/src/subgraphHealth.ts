import axios from "axios";

const SUBGRAPH_HEALTH_URL = "https://api.thegraph.com/index-node/graphql";

// TODO: Make an actual error type for this?
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

/**
 *
 * @param subgraphName - name of the subgraph, e.g. "nxtp-bsc-v1-runtime"
 *
 * @returns
 */
export const getSubgraphHealth = async (subgraphName: string): Promise<SubgraphHealth | undefined> => {
  const query = `{
    indexingStatusForCurrentVersion(subgraphName: "connext/${subgraphName}") {
      health
      synced
      fatalError {
        message
        block {
          number
        }
        handler
      }
      chains {
        network
        chainHeadBlock {
          number
        }
        latestBlock {
          number
        }
        lastHealthyBlock {
          number
        }
      }
    }
  }`;
  const data = JSON.stringify({ query });
  const res = await axios.post(SUBGRAPH_HEALTH_URL, {
    data,
    headers: { Accept: "application/json; charset=utf-8", "Content-Type": "application/json; chatset=utf-8" },
  });
  /**
   * Example res:
   * {
   *   data: {
   *     indexingStatusForCurrentVersion: {
   *       chains: [
   *         {
   *           chainHeadBlock: {
   *             number: "12956365",
   *           },
   *           lastHealthyBlock: undefined,
   *           latestBlock: { hash: "55ef6848b4dd98c6323f2bb1707ed56458c50ed07dab83a836d956425e3776d0", number: "12956202" },
   *           network: "bsc",
   *         },
   *       ],
   *       fatalError: None,
   *       health: "healthy",
   *       synced: true,
   *     },
   *   },
   * }
   */
  if (res && res.data && res.data.indexingStatusForCurrentVersion && res.data.indexingStatusForCurrentVersion) {
    const status = res.data.indexingStatusForCurrentVersion;
    const networkInfo = status.chains[0];
    return {
      chainHeadBlock: networkInfo.chainHeadBlock,
      latestBlock: networkInfo.latestBlock,
      lastHealthyBlock: networkInfo.lastHealthyBlock,
      network: networkInfo.network,
      fatalError: status.fatalError,
      health: status.health,
      synced: status.synced,
    };
  }
  return undefined;
};
