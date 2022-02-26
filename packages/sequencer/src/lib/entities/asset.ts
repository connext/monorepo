export type Asset = {
  chainId: number;
  assetId: string;
};

export type SwapPool = {
  name: string;
  assets: Asset[];
};
