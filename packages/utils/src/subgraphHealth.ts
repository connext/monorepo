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
 * @returns SubgraphHealth object with the following fields:
 * - chainHeadBlock: the latest block number of the chain head
 * - latestBlock: the latest block number of the subgraph
 * - lastHealthyBlock: the latest block number of the subgraph that was healthy
 * - network: the name of the network the subgraph is synced to
 * - fatalError: if the subgraph is in a failed state, this will contain the error
 * - health: the health of the subgraph, one of:
 *   - "healthy": subgraph syncing normally
 *   - "unhealthy": subgraph syncing but with errors
 *   - "failed": subgraph halted due to errors
 * - synced: whether the subgraph is synced to the network
 */
export const getSubgraphHealth = async (subgraphName: string): Promise<SubgraphHealth | undefined> => {
  const res = await axios({
    url: SUBGRAPH_HEALTH_URL,
    method: "post",
    data: {
      query: `{
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
    }`,
    },
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
  if (res && res.data && res.data.data && res.data.data.indexingStatusForCurrentVersion) {
    const status = res.data.data.indexingStatusForCurrentVersion;
    const networkInfo = status.chains[0];
    return {
      chainHeadBlock: parseInt(networkInfo.chainHeadBlock.number),
      latestBlock: parseInt(networkInfo.latestBlock.number),
      lastHealthyBlock: parseInt(networkInfo.lastHealthyBlock.number),
      network: networkInfo.network,
      fatalError: status.fatalError,
      health: status.health,
      synced: status.synced,
    };
  }
  return undefined;
};
