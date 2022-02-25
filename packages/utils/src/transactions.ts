export enum CrossChainTxStatus {
  Prepared = "Prepared",
  Fulfilled = "Fulfilled",
  Reconcilced = "Reconciled",
}

export type CrossChainTx = {
  // Meta
  originDomain: string;
  destinationDomain: string;
  status: CrossChainTxStatus;

  // Transfer Data
  nonce: number;
  transactionId: string;
  recipient: string;
  router: string;

  // Prepared
  prepareCaller: string;
  prepareTransactingAmount: string;
  prepareLocalAmount: string;
  prepareTransactingAsset: string;
  prepareLocalAsset: string;
  callTo: string;
  callData: string;

  // TransactionPrepared
  prepareTransactionHash: string;
  prepareTimestamp: number;
  prepareGasPrice: string;
  prepareGasLimit: string;
  prepareBlockNumber: number;

  // Fulfill
  fulfillCaller: string;
  fulfillTransactingAmount: string;
  fulfillLocalAmount: string;
  fulfillTransactingAsset: string;
  fulfillLocalAsset: string;

  // TransactionFulfilled
  fulfillTransactionHash: string;
  fulfillTimestamp: string;
  fulfillGasPrice: string;
  fulfillGasLimit: string;
  fulfillBlockNumber: number;

  // Reconciled
  externalCallHash: string;
  reconciledTransactionHash: string;
  reconciledTimestamp: string;
  reconciledGasPrice: string;
  reconciledGasLimit: string;
  reconciledBlockNumber: number;
};

export type CallParams = {
  recipient: string;
  callTo: string;
  callData: string;
  originDomain: string;
  destinationDomain: string;
};

export type FulfillArgs = {
  params: CallParams;
  transactionId: string;
  local: string;
  router: string;
  feePercentage: string;
  amount: string;
  relayerSignature: string;
};

export type Bid = {
  transactionId: string;
  data: FulfillArgs;
};

export type SignedBid = {
  bid: Bid;
  signature: string;
};
