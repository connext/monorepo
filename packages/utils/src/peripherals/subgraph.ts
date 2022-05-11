import axios from "axios";
import { Type, Static } from "@sinclair/typebox";

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

export type SubgraphQueryMetaParams = {
  maxBlockNumber: number;
  latestNonce: number;
  destinationDomains?: string[];
};

const MIN_SUBGRAPH_MAX_LAG = 25;
export const SubgraphReaderChainConfigSchema = Type.Object({
  analytics: Type.Array(
    Type.Object({
      query: Type.String(),
      health: Type.String(),
    }),
  ), // Analytics subgraph uri(s).
  runtime: Type.Array(
    Type.Object({
      query: Type.String(),
      health: Type.String(),
    }),
  ), // Runtime subgraph uri(s).
  maxLag: Type.Integer({ minimum: MIN_SUBGRAPH_MAX_LAG }), // If subgraph is out of sync by this number, will not process actions.
});

export const SubgraphReaderConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), SubgraphReaderChainConfigSchema),
});

export type SubgraphReaderConfig = Static<typeof SubgraphReaderConfigSchema>;

export const getSubgraphName = (url: string) => {
  const split = url.split("/");
  return split[split.length - 1];
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
