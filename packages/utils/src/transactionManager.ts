// Used to include *all* info for both sending and receiving crosschain data
export type CrosschainTransaction = {
  invariant: InvariantTransactionData;
  sending: VariantTransactionData;
  receiving?: VariantTransactionData;
};

// Direct matching of Contract types.
export type InvariantTransactionData = {
  receivingChainTxManagerAddress: string;
  user: string;
  router: string;
  sendingAssetId: string;
  receivingAssetId: string;
  sendingChainFallback: string;
  callTo: string;
  receivingAddress: string;
  sendingChainId: number;
  receivingChainId: number;
  callDataHash: string;
  transactionId: string;
};

export type VariantTransactionData = {
  amount: string;
  expiry: number;
  preparedBlockNumber: number;
};
export type TransactionData = InvariantTransactionData & VariantTransactionData;

export type SignedCancelData = {
  invariantDigest: string;
  cancel: "cancel"; // just the string "cancel"
};

export type SignedFulfillData = {
  invariantDigest: string;
  relayerFee: string;
};

// Functions
export type PrepareParams = {
  txData: InvariantTransactionData;
  amount: string;
  expiry: number;
  encryptedCallData: string;
  encodedBid: string;
  bidSignature: string;
};

export type FulfillParams = {
  txData: TransactionData;
  relayerFee: string;
  signature: string;
  callData: string;
};

export type CancelParams = {
  txData: TransactionData;
  signature: string;
};

// Events
export type TransactionPreparedEvent = {
  txData: TransactionData;
  caller: string;
  encryptedCallData: string;
  encodedBid: string;
  bidSignature: string;
};

export type TransactionFulfilledEvent = {
  txData: TransactionData;
  signature: string;
  relayerFee: string;
  callData: string;
  caller: string;
};

export type TransactionCancelledEvent = {
  txData: TransactionData;
  relayerFee: string;
  caller: string;
};
