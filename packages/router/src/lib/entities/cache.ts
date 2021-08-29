import { BigNumber } from "ethers";

export type StoreOutstandingLiquidityParams = {
  assetId: string;
  chainId: number;
  amount: BigNumber;
  expiresInSeconds: number;
};

export type GetOutstandingLiquidityParams = { assetId: string; chainId: number };

export type RemoveOutstandingLiquidityParams = {
  assetId: string;
  chainId: number;
  amount: string;
};

export type Cache = {
  storeOutstandingLiquidity: (s: StoreOutstandingLiquidityParams) => Promise<void>;
  getOutstandingLiquidity: (g: GetOutstandingLiquidityParams) => Promise<BigNumber>;
  removeOutstandingLiquidity: (r: RemoveOutstandingLiquidityParams) => Promise<void>;
};
