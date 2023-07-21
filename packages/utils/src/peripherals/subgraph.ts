import { axiosPost } from "../helpers";
import { jsonifyError } from "../types";

export type SubgraphQueryMetaParams = {
  maxBlockNumber: number;
  latestNonce: number;
  destinationDomains?: string[];
  orderDirection?: "asc" | "desc";
  limit?: number;
};

export type SubgraphQueryByTimestampMetaParams = {
  maxBlockNumber?: number;
  fromTimestamp: number;
  destinationDomains?: string[];
  orderDirection?: "asc" | "desc";
  limit?: number;
};

export type SubgraphQueryByTransferIDsMetaParams = {
  maxBlockNumber: number;
  transferIDs: string[];
};

/**
 * Retrieves the latest synced blockNumber from the subgraph endpoint
 * @param url - The subgraph endpoint
 */
export const getLatestBlockNumber = async (url: string): Promise<number> => {
  try {
    const result = await axiosPost(url, {
      query: `
    {
      _meta {
        block {
          number
        }
      }}
    `,
    });
    return Number(result.data.data._meta.block.number);
  } catch (error: unknown) {
    console.error(`Error in getLatestBlockNumber, error: ${jsonifyError(error as Error).toString()}`);
    return 0;
  }
};
