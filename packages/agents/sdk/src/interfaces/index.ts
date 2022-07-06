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
  tokens: string[]; // [0] is adopted, [1] is representation
  decimals: number[];
  lpTokenAddress: string;
  address?: string;
}
