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
  decimals: number[];
  lpTokenAddress: string;
  canonicalHash: string;
  address?: string;
}
