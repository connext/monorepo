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
