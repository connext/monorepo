export type SubgraphQueryMetaParams = {
  maxBlockNumber: number;
  latestNonce: number;
  destinationDomains?: string[];
  orderDirection?: "asc" | "desc";
};

export type SubgraphQueryByTimestampMetaParams = {
  maxBlockNumber: number;
  fromTimestamp: number;
  destinationDomains?: string[];
  orderDirection?: "asc" | "desc";
};

export type SubgraphQueryByTransferIDsMetaParams = {
  maxBlockNumber: number;
  transferIDs: string[];
};
