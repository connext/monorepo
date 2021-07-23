// Direct matching of Contract types.
// TODO: why doesnt Typechain have these as their exported types??

export type InvariantTransactionData = {
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
  shares: string;
  expiry: number;
  preparedBlockNumber: number;
};
export type TransactionData = InvariantTransactionData & VariantTransactionData;

export type SignedCancelData = {
  invariantDigest: string;
  relayerFee: string;
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
  relayerFee: string;
  signature: string;
};

// Events
export type TransactionPreparedEvent = {
  txData: TransactionData;
  amount: string;
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
