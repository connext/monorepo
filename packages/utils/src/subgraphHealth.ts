import axios from "axios";

// TODO get from chainData
const GET_SUBGRAPH_HEALTH_URL = (name: string): string | undefined => {
  if (name.includes("connext.bwarelabs.com/subgraphs/name/connext")) {
    return "https://connext.bwarelabs.com/bsc/index-node/graphql";
  } else if (name.includes("api.thegraph.com/subgraphs/name/connext")) {
    return "https://api.thegraph.com/index-node/graphql";
  } else if (name.includes("subgraphs.connext.p2p.org/subgraphs/name/connext/nxtp-bsc")) {
    return "https://subgraphs.connext.p2p.org/nxtp-bsc-health-check";
  } else if (name.includes("subgraphs.connext.p2p.org/subgraphs/name/connext/nxtp-matic")) {
    return "https://subgraphs.connext.p2p.org/nxtp-matic-health-check";
  }
  return undefined;
};

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
 * @param url - url of the subgraph, e.g. "nxtp-bsc-v1-runtime"
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

const cache: { [url: string]: { record: SubgraphHealth; timestamp: number } } = {};
export const getSubgraphHealth = async (subgraphName: string, url: string): Promise<SubgraphHealth | undefined> => {
  const healthUrl = GET_SUBGRAPH_HEALTH_URL(url);
  if (!healthUrl) {
    return undefined;
  }

  // Use cache value if exist and within timeout
  if (cache[url]?.record && Date.now() - cache[url].timestamp < 5_000) {
    return cache[url].record;
  }

  const res = await axios({
    url: healthUrl,
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
    const record = {
      chainHeadBlock: parseInt(networkInfo.chainHeadBlock.number),
      latestBlock: parseInt(networkInfo.latestBlock.number),
      lastHealthyBlock: parseInt(networkInfo.lastHealthyBlock.number),
      network: networkInfo.network,
      fatalError: status.fatalError,
      health: status.health,
      synced: status.synced,
    };
    cache[url] = { timestamp: Date.now(), record };
    return record;
  }
  return undefined;
};
