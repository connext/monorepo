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
