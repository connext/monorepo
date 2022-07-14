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
