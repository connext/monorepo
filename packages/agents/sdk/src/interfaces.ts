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
  chainId: number;
  domainId: string;
  name: string;
  symbol: string;
  address: string;
  assets: string[];
  lpTokenAddress: string;
}
