import { InvariantTransactionData } from "@connext/nxtp-utils";
import { Signer, providers } from "ethers";

export type PrepareParams = Omit<InvariantTransactionData, "user" | "callData"> & {
  signer: Signer;
  amount: string;
  expiry: string;
  callData?: string;
};

export type HandleReceiverPrepareParams = {
  txData: InvariantTransactionData;
  receivingProvider: providers.JsonRpcProvider;
  relayerFee: string;
  signer: Signer;
};

export type HandleReceiverFulfillParam = {
  txData: InvariantTransactionData;
  receivingProvider: providers.JsonRpcProvider;
};
