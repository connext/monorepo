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
  transactingAsset: string;
  localAsset: string;

  // Prepared
  prepareCaller: string;
  prepareTransactingAmount: string;
  prepareLocalAmount: string;
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
