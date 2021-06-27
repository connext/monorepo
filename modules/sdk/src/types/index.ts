import { InvariantTransactionData } from "@connext/nxtp-utils";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Signer } from "ethers";

export type PrepareParams = Omit<InvariantTransactionData, "user" | "callData"> & {
  signer: Signer;
  sendingProvider: JsonRpcProvider;
  amount: string;
  expiry: string;
  callData?: string;
};

export type HandleReceiverPrepareParams = {
  txData: InvariantTransactionData;
  receivingProvider: JsonRpcProvider;
  relayerFee: string;
  signer: Signer;
};

export type HandleReceiverFulfillParam = {
  txData: InvariantTransactionData;
  receivingProvider: JsonRpcProvider;
};
