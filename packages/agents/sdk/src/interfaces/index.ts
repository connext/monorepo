export interface IPoolStats {
  liquidity: string;
  volume: string;
  fees: string;
  apy: {
    week: string;
    month: string;
    year: string;
    total: string;
  };
}

export interface IPoolData {
  domainId: string;
  name: string;
  symbol: string;
  tokens: string[];
  tokenIndices: Map<string, number>;
  decimals: number[];
  lpTokenAddress: string;
  canonicalHash: string;
  address?: string;
}

export type AssetData = {
  local: string;
  adopted: string;
  canonical_id: string;
  canonical_domain: string;
  domain: string;
  key: string;
  id: string;
};
