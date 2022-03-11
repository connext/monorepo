export enum CrossChainTxStatus {
  Prepared = "Prepared",
  Fulfilled = "Fulfilled",
  Reconciled = "Reconciled",
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
  fulfillTimestamp: number;
  fulfillGasPrice: string;
  fulfillGasLimit: string;
  fulfillBlockNumber: number;

  // Reconciled
  externalCallHash: string;
  reconciledTransactionHash: string;
  reconciledTimestamp: number;
  reconciledGasPrice: string;
  reconciledGasLimit: string;
  reconciledBlockNumber: number;
};

export type ExternalCall = {
  recipient: string;
  callTo: string;
  callData: string;
};

export type FulfilledTransaction = {
  router: string;
  amount: string;
  externalHash: string;
};

export type ReconciledTransaction = {
  externalHash: string;
  local: string;
  amount: string;
  recipient: string;
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
  local: string;
  router: string;
  feePercentage: string;
  nonce: string;
  amount: string;
  relayerSignature: string;
};

export enum BidStatus {
  Pending = "Pending",
  Sent = "Sent",
}

export type Bid = {
  transactionId: string;
  data: FulfillArgs;
};

export type SignedBid = {
  bid: Bid;
  signature: string;
};

export type StoredBid = {
  payload: Bid;
  status: BidStatus;
  lastUpdate: number;
};
