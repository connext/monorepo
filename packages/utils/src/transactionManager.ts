// Direct matching of Contract types.
// TODO: why doesnt Typechain have these as their exported types??

export type InvariantTransactionData = {
  user: string;
  router: string;
  sendingAssetId: string;
  receivingAssetId: string;
  receivingAddress: string;
  sendingChainId: number;
  receivingChainId: number;
  callData: string;
  transactionId: string;
};

export type TransactionData = InvariantTransactionData & {
  amount: string;
  expiry: string;
  blockNumber: number;
};

// Functions
export type PrepareParams = {
  txData: InvariantTransactionData;
  amount: string;
  expiry: string;
  encodedBid: string;
  bidSignature: string;
};

export type FulfillParams = {
  txData: TransactionData;
  relayerFee: string;
  signature: string;
};

// Events
export type TransactionPreparedEvent = {
  txData: TransactionData;
  caller: string;
  encodedBid: string;
  bidSignature: string;
};

export type TransactionFulfilledEvent = {
  txData: TransactionData;
  signature: string;
  relayerFee: string;
  caller: string;
};

export type TransactionCancelledEvent = {
  txData: TransactionData;
  caller: string;
};

export const TransactionManagerEvents = {
  TransactionPrepared: "TransactionPrepared",
  TransactionFulfilled: "TransactionFulfilled",
  TransactionCancelled: "TransactionCancelled",
} as const;
export type TransactionManagerEvent = typeof TransactionManagerEvents[keyof typeof TransactionManagerEvents];
export interface TransactionManagerEventPayloads {
  [TransactionManagerEvents.TransactionPrepared]: TransactionPreparedEvent;
  [TransactionManagerEvents.TransactionFulfilled]: TransactionFulfilledEvent;
  [TransactionManagerEvents.TransactionCancelled]: TransactionCancelledEvent;
}
