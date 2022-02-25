import { Wallet, BigNumberish } from "ethers";
import { Logger } from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";
import { SignedBid } from "@connext/nxtp-utils";

export type Cache = {
  nxtpId: string;
  bid: SignedBid;
};
