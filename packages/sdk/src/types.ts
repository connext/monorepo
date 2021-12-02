import {
  TChainId,
  TAddress,
  TIntegerString,
  TransactionDataSchema,
  PrepareParams,
  Logger,
  TransactionPreparedEvent,
  TransactionFulfilledEvent,
  TransactionCancelledEvent,
  CrosschainTransaction,
  UserNxtpNatsMessagingService,
  AuctionResponseSchema,
  ChainData,
} from "@connext/nxtp-utils";
import { Type, Static } from "@sinclair/typebox";
import { providers, Signer } from "ethers";

export const SdkBaseChainConfigSchema = Type.Record(
  Type.Number(),
  Type.Object({
    providers: Type.Union([
      Type.Array(Type.String()),
      Type.String(),
      Type.Array(
        Type.Object({ url: Type.String(), user: Type.Optional(Type.String()), password: Type.Optional(Type.String()) }),
      ),
    ]),
    transactionManagerAddress: Type.Optional(Type.String()),
    priceOracleAddress: Type.Optional(Type.String()),
    subgraph: Type.Optional(Type.String()),
    subgraphSyncBuffer: Type.Optional(Type.Number()),
  }),
);

export const LogLevelScehma = Type.Union([
  Type.Literal("fatal"),
  Type.Literal("error"),
  Type.Literal("warn"),
  Type.Literal("info"),
  Type.Literal("debug"),
  Type.Literal("trace"),
  Type.Literal("silent"),
]);

export const NetworkSchema = Type.Union([Type.Literal("local"), Type.Literal("testnet"), Type.Literal("mainnet")]);

// export const SdkBaseConfigSchema = Type.Object({
//   chainConfig: SdkBaseChainConfigParams,
//   signerAddress: Type.Promise(Type.String()),
//   signer: Type.Optional(Type.Any(Signer)),
//   messagingSigner: Type.Optional(Type.Any(Signer)),
//   logger: Type.Optional(Type.Any(Logger)),
//   network: Type.Optional(Type.Enum(NetworkEnum)),
//   natsUrl: Type.Optional(Type.String()),
//   authUrl: Type.Optional(Type.String()),
//   messaging: Type.Optional(Type.Any(UserNxtpNatsMessagingService)),
//   skipPolling: Type.Optional(Type.Boolean()),
// });

// export type SdkBaseConfigParams = Static<typeof SdkBaseConfigSchema>;
export type SdkBaseChainConfigParams = {
  [chainId: number]: {
    providers: string | string[] | { url: string; user?: string; password?: string }[];
    transactionManagerAddress?: string;
    priceOracleAddress?: string;
    subgraph?: string | string[];
    subgraphSyncBuffer?: number;
  };
};
export type SdkBaseConfigParams = {
  chainConfig: SdkBaseChainConfigParams;
  signerAddress: Promise<string>;
  signer?: Signer;
  messagingSigner?: Signer;
  logger?: Logger;
  network?: "testnet" | "mainnet" | "local";
  natsUrl?: string;
  authUrl?: string;
  messaging?: UserNxtpNatsMessagingService;
  skipPolling?: boolean;
  chainData?: Map<string, ChainData>;
};

export const CrossChainParamsSchema = Type.Object({
  sendingChainId: TChainId,
  sendingAssetId: TAddress,
  receivingChainId: TChainId,
  receivingAssetId: TAddress,
  receivingAddress: TAddress,
  amount: TIntegerString,
  callTo: Type.Optional(TAddress),
  callData: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]*$/)),
  encryptedCallData: Type.Optional(Type.String()),
  expiry: Type.Optional(Type.Number()),
  transactionId: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]{64}$/)),
  slippageTolerance: Type.Optional(Type.String()),
  dryRun: Type.Optional(Type.Boolean()),
  preferredRouters: Type.Optional(Type.Array(TAddress)),
  initiator: Type.Optional(TAddress),
  auctionWaitTimeMs: Type.Optional(Type.Number()),
  numAuctionResponsesQuorum: Type.Optional(Type.Number()),
});

export type CrossChainParams = Static<typeof CrossChainParamsSchema>;

export const GetTransferQuoteSchema = Type.Intersect([
  AuctionResponseSchema,
  Type.Object({ metaTxRelayerFee: TIntegerString }),
]);
export type GetTransferQuote = Static<typeof GetTransferQuoteSchema>;

export const AuctionBidParamsSchema = Type.Object({
  user: TAddress,
  router: TAddress,
  initiator: TAddress,
  sendingChainId: TChainId,
  sendingAssetId: TAddress,
  amount: TIntegerString,
  receivingChainId: TChainId,
  receivingAssetId: TAddress,
  amountReceived: TIntegerString,
  receivingAddress: TAddress,
  transactionId: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
  expiry: Type.Number(),
  callDataHash: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
  callTo: TAddress,
  encryptedCallData: Type.String(),
  sendingChainTxManagerAddress: TAddress,
  receivingChainTxManagerAddress: TAddress,
  bidExpiry: Type.Number(),
});

export type AuctionBidParams = Static<typeof AuctionBidParamsSchema>;

export const ApproveSchema = Type.Object({
  sendingAssetId: TAddress,
  sendingChainId: TChainId,
  amount: TIntegerString,
  transactionId: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
});

export type ApproveParams = Static<typeof ApproveSchema>;

export const CancelSchema = Type.Object({
  txData: TransactionDataSchema,
  signature: Type.String(),
});

export type CancelParams = Static<typeof CancelSchema>;

export const NxtpSdkEvents = {
  SenderTokenApprovalSubmitted: "SenderTokenApprovalSubmitted",
  SenderTokenApprovalMined: "SenderTokenApprovalMined",
  SenderTransactionPrepareSubmitted: "SenderTransactionPrepareSubmitted",
  SenderTransactionPrepared: "SenderTransactionPrepared",
  SenderTransactionFulfilled: "SenderTransactionFulfilled",
  SenderTransactionCancelled: "SenderTransactionCancelled",
  ReceiverPrepareSigned: "ReceiverPrepareSigned",
  ReceiverTransactionPrepared: "ReceiverTransactionPrepared",
  ReceiverTransactionFulfilled: "ReceiverTransactionFulfilled",
  ReceiverTransactionCancelled: "ReceiverTransactionCancelled",
} as const;
export type NxtpSdkEvent = typeof NxtpSdkEvents[keyof typeof NxtpSdkEvents];

export type SenderTokenApprovalSubmittedPayload = {
  assetId: string;
  chainId: number;
  transactionResponse: providers.TransactionResponse;
};

export type SenderTokenApprovalMinedPayload = {
  assetId: string;
  chainId: number;
  transactionReceipt: providers.TransactionReceipt;
};

export type SenderTransactionPrepareSubmittedPayload = {
  prepareParams: PrepareParams;
  transactionResponse: providers.TransactionResponse;
};

export type ReceiverPrepareSignedPayload = {
  signature: string;
  signer: string;
  transactionId: string;
};

export type SdkEvent<T> = T & {
  transactionHash: string;
};

export type SenderTransactionPreparedPayload = SdkEvent<TransactionPreparedEvent>;
export type SenderTransactionFulfilledPayload = SdkEvent<TransactionFulfilledEvent>;
export type SenderTransactionCancelledPayload = SdkEvent<TransactionCancelledEvent>;
export type ReceiverTransactionPreparedPayload = SdkEvent<TransactionPreparedEvent>;
export type ReceiverTransactionFulfilledPayload = SdkEvent<TransactionFulfilledEvent>;
export type ReceiverTransactionCancelledPayload = SdkEvent<TransactionCancelledEvent>;

export interface NxtpSdkEventPayloads {
  [NxtpSdkEvents.SenderTokenApprovalSubmitted]: SenderTokenApprovalSubmittedPayload;
  [NxtpSdkEvents.SenderTokenApprovalMined]: SenderTokenApprovalMinedPayload;
  [NxtpSdkEvents.SenderTransactionPrepareSubmitted]: SenderTransactionPrepareSubmittedPayload;
  [NxtpSdkEvents.SenderTransactionPrepared]: SenderTransactionPreparedPayload;
  [NxtpSdkEvents.SenderTransactionFulfilled]: SenderTransactionFulfilledPayload;
  [NxtpSdkEvents.SenderTransactionCancelled]: SenderTransactionCancelledPayload;
  [NxtpSdkEvents.ReceiverPrepareSigned]: ReceiverPrepareSignedPayload;
  [NxtpSdkEvents.ReceiverTransactionPrepared]: ReceiverTransactionPreparedPayload;
  [NxtpSdkEvents.ReceiverTransactionFulfilled]: ReceiverTransactionFulfilledPayload;
  [NxtpSdkEvents.ReceiverTransactionCancelled]: ReceiverTransactionCancelledPayload;
}

export const HistoricalTransactionStatus = {
  FULFILLED: "FULFILLED",
  CANCELLED: "CANCELLED",
} as const;
export type THistoricalTransactionStatus = typeof HistoricalTransactionStatus[keyof typeof HistoricalTransactionStatus];

export type HistoricalTransaction = {
  status: THistoricalTransactionStatus;
  crosschainTx: CrosschainTransaction;
  preparedTimestamp: number;
  fulfilledTxHash?: string;
};

export type ActiveTransaction = {
  crosschainTx: CrosschainTransaction;
  status: NxtpSdkEvent;
  bidSignature: string;
  encodedBid: string;
  encryptedCallData: string;
  preparedTimestamp: number;
};

export type SubgraphSyncRecord = { synced: boolean; latestBlock: number; syncedBlock: number };
