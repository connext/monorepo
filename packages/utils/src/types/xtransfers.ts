import { Type, Static } from "@sinclair/typebox";

import { TAddress, TDecimalString, TIntegerString } from ".";

export enum XTransferStatus {
  XCalled = "XCalled",
  Executed = "Executed",
  Reconciled = "Reconciled",
  Failed = "Failed",
}

export const XTransferMethodCallSchema = Type.Object({
  caller: TAddress,
  transferringAmount: TIntegerString,
  localAmount: TIntegerString,
  transferringAsset: TAddress,
  localAsset: TAddress,
  transactionHash: Type.String(),
  timestamp: Type.Number(),
  gasPrice: TIntegerString,
  gasLimit: TIntegerString,
  blockNumber: Type.Number(),
});

export const XTransferSchema = Type.Object({
  // Meta
  originDomain: Type.String(),
  destinationDomain: Type.String(),
  status: Type.Enum(XTransferStatus),

  // Transfer Data
  to: TAddress,
  transferId: Type.String(),
  callTo: Type.String(),
  callData: Type.String(),
  idx: Type.Optional(TIntegerString),
  nonce: Type.Integer(),
  router: Type.Optional(TAddress),

  // XCalled
  xcall: Type.Optional(XTransferMethodCallSchema),

  // Executed
  execute: Type.Optional(XTransferMethodCallSchema),

  // Reconciled
  reconcile: Type.Optional(XTransferMethodCallSchema),
});
export type XTransfer = Static<typeof XTransferSchema>;

export const CallParamsSchema = Type.Object({
  to: TAddress,
  callData: Type.String(),
  originDomain: Type.String(),
  destinationDomain: Type.String(),
});

export type CallParams = Static<typeof CallParamsSchema>;

export const XCallArgsSchema = Type.Object({
  params: CallParamsSchema,
  transactingAssetId: Type.String(),
  amount: TDecimalString,
});

export type XCallArgs = Static<typeof XCallArgsSchema>;

export const ExecuteArgsSchema = Type.Object({
  params: CallParamsSchema,
  local: TAddress,
  routers: Type.Array(TAddress),
  feePercentage: TDecimalString,
  amount: TDecimalString,
  nonce: Type.Integer(),
  relayerSignature: Type.String(),
  originSender: TAddress,
});

export type ExecuteArgs = Static<typeof ExecuteArgsSchema>;

export type ExternalCall = {
  to: string;
  callData: string;
};

export type ReconciledTransaction = {
  externalHash: string;
  local: string;
  amount: string;
  recipient: string;
};
