import axios from "axios";

// TODO: Make an actual error type for this?
type SubgraphHealthError = {
  message: string;
  block: number;
  handler: any;
};

export type SubgraphHealth = {
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
  url: string;
};

export const getSubgraphHealth = async (
  subgraphName: string,
  healthUrl: string,
): Promise<SubgraphHealth | undefined> => {
  const res = await axios.post(healthUrl, {
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
  if (res) {
    const result = res.data.data.indexingStatusForCurrentVersion;
    return {
      chainHeadBlock: result.chains[0].chainHeadBlock.number,
      latestBlock: result.chains[0].latestBlock.number,
      lastHealthyBlock: result.chains[0].lastHealthyBlock,
      network: result.chains[0].network,
      fatalError: result.fatalError,
      health: result.health,
      synced: result.synced,
      url: healthUrl,
    };
  }
  return undefined;
};
