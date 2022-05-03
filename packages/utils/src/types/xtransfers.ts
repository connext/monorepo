import { Type, Static } from "@sinclair/typebox";

import { TAddress, TIntegerString } from ".";

export enum XTransferStatus {
  Executed = "Executed",
  Reconciled = "Reconciled",
  Completed = "Completed",
}

export const XTransferMethodCallSchema = Type.Object({
  caller: TAddress,
  transactionHash: Type.String(),
  timestamp: Type.Number(),
  gasPrice: TIntegerString,
  gasLimit: TIntegerString,
  blockNumber: Type.Number(),
});

export const XTransferSchema = Type.Object({
  // Meta
  idx: Type.Optional(TIntegerString),
  transferId: Type.String(),
  nonce: Type.Integer(),

  // Call Params
  to: TAddress,
  callData: Type.String(),

  origin: Type.Object({
    domain: Type.String(),

    // Assets
    assets: Type.Optional(
      Type.Object({
        transactingAsset: Type.String(),
        transactingAmount: TIntegerString,
        bridgedAsset: Type.String(),
        bridgedAmount: TIntegerString,
      }),
    ),

    // XCall Transaction
    xcall: Type.Optional(
      Type.Intersect([
        XTransferMethodCallSchema,
        Type.Object({
          // XCall Event Data
          relayerFee: TIntegerString,
        }),
      ]),
    ),
  }),

  destination: Type.Object({
    domain: Type.String(),

    // Destination Event Data
    status: Type.Optional(Type.Enum(XTransferStatus)),

    // Assets
    assets: Type.Optional(
      Type.Object({
        transactingAsset: Type.String(),
        transactingAmount: TIntegerString,
        localAsset: Type.String(),
        localAmount: TIntegerString,
      }),
    ),

    // Execute Transaction
    execute: Type.Optional(
      Type.Intersect([
        XTransferMethodCallSchema,
        Type.Object({
          // Execute Event Data
          routers: Type.Optional(Type.Array(TAddress)),
          originSender: Type.Optional(TAddress),
        }),
      ]),
    ),

    // Reconcile Transaction
    reconcile: Type.Optional(XTransferMethodCallSchema),
  }),
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
  amount: TIntegerString,
  relayerFee: TIntegerString,
});

export type XCallArgs = Static<typeof XCallArgsSchema>;

export const ExecuteArgsSchema = Type.Object({
  params: CallParamsSchema,
  local: TAddress,
  routers: Type.Array(TAddress),
  routerSignatures: Type.Array(Type.String()),
  amount: TIntegerString,
  nonce: Type.Integer(),
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
