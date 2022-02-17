import { BigNumber } from "ethers";
import { ParamType } from "ethers/lib/utils";

export type CachedBid = {
  assetId: string;
  chainId: number;
  amountReceived: BigNumber;
  expiry: number;
  transactionId: string;
  confirmed: boolean;
};

export type CachedTransaction = {
  transactionId: string;
  transaction: any; // must be updated with detailed types.
};
