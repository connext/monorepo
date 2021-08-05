import { CrosschainTransaction, TransactionData } from "@connext/nxtp-utils";
import { GraphQLClient } from "graphql-request";

import { getContext } from "../..";
import { ContractReaderNotAvailableForChain } from "../../errors/contractReader";
import { getSdk, Sdk, TransactionStatus as SdkTransactionStatus } from "../../graphqlsdk";

import { getActiveTransactions, getTransactionForChain } from "./subgraph";

export type ContractReader = {
  getActiveTransactions: () => Promise<ActiveTransaction[]>;
  getTransactionForChain: (
    transactionId: string,
    user: string,
    chainId: number,
  ) => Promise<SingleChainTransaction | undefined>;
};

export enum TransactionStatus {
  SenderPrepared,
  SenderFulfilled,
  SenderCancelled,
  ReceiverPrepared,
  ReceiverFulfilled,
  ReceiverCancelled,
}

export type ActiveTransaction = {
  status: TransactionStatus;
  crosschainTx: CrosschainTransaction;
  encryptedCallData: string;
  encodedBid: string;
  bidSignature: string;
  signature?: string; // only there when fulfilled or cancelled
  relayerFee?: string; // only there when fulfilled or cancelled
};

export type SingleChainTransaction = {
  status: SdkTransactionStatus;
  txData: TransactionData;
  encryptedCallData: string;
  encodedBid: string;
  bidSignature: string;
  signature?: string; // only there when fulfilled or cancelled
  relayerFee?: string; // only there when fulfilled or cancelled
};

const sdks: Record<number, Sdk> = {};

export const getSdks = (): Record<number, Sdk> => {
  if (Object.keys(sdks).length === 0) {
    throw new ContractReaderNotAvailableForChain(0);
  }
  return sdks;
};

export const subgraphContractReader = (): ContractReader => {
  const { config } = getContext();
  Object.entries(config.chainConfig).forEach(([chainId, { subgraph }]) => {
    const client = new GraphQLClient(subgraph);
    sdks[parseInt(chainId)] = getSdk(client);
  });

  return {
    getActiveTransactions,
    getTransactionForChain,
  };
};
