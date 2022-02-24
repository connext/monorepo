import { Wallet, BigNumberish } from "ethers";
import { Logger } from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";

export type CallParams = {
  recipient: string;
  callTo: string;
  callData: string;
  originDomain: string;
  destinationDomain: string;
};

export type FulfillArgs = {
  params: CallParams;
  local: string;
  router: string;
  feePercentage: string;
  nonce: string;
  amount: string;
  relayerSignature: string;
};

export type Bid = {
  nxtpId: string;
  data: FulfillArgs;
};

export type SignedBid = {
  bid: Bid;
  signature: string;
};

export type Cache = {
  nxtpId: string;
  bid: SignedBid;
};
