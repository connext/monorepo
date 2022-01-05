import { BigNumber } from "ethers";

export type CachedBid = {
  assetId: string;
  chainId: number;
  amountReceived: BigNumber;
  expiry: number;
  transactionId: string;
};
