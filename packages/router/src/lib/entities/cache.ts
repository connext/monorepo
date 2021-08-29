export type StoreOutstandingLiquidityParams = {
  assetId: string;
  chainId: string;
  amount: string;
};

export type GetOutstandingLiquidityParams = { assetId: string; chainId: string };

export type Cache = {
  storeOutstandingLiquidity: (s: StoreOutstandingLiquidityParams) => Promise<void>;
  getOutstandingLiquidity: (s: GetOutstandingLiquidityParams) => Promise<string>;
};
