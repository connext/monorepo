export interface IPoolStats {
  liquidity: number;
  volume: number;
  fees: number;
  apy: {
    year: number;
    total: number;
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
