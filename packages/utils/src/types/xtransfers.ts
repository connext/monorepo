import { Type, Static } from "@sinclair/typebox";

import { TAddress, TIntegerString } from ".";

// dear Jake, please stop changing this to enum
export const XTransferStatus = {
  XCalled: "XCalled",
  Executed: "Executed",
  Reconciled: "Reconciled",
  CompletedFast: "CompletedFast",
  CompletedSlow: "CompletedSlow",
} as const;
export type XTransferStatus = typeof XTransferStatus[keyof typeof XTransferStatus];

export const XTransferMethodCallSchema = Type.Object({
  caller: TAddress,
  transactionHash: Type.String(),
  timestamp: Type.Number(),
  gasPrice: TIntegerString,
  gasLimit: TIntegerString,
  blockNumber: Type.Number(),
});

export const XTransferOriginSchema = Type.Object({
  chain: TIntegerString,

  // Event Data
  messageHash: Type.String(),

  // Assets
  assets: Type.Object({
    transacting: Type.Object({
      asset: Type.String(),
      amount: TIntegerString,
    }),
    bridged: Type.Object({
      asset: Type.String(),
      amount: TIntegerString,
    }),
  }),

  // XCall Transaction
  xcall: Type.Intersect([XTransferMethodCallSchema]),
});

export const XTransferDestinationSchema = Type.Object({
  chain: TIntegerString,

  // Event Data
  status: Type.Enum(XTransferStatus),
  // Both Executed and Reconciled events emit `routers`.
  routers: Type.Array(TAddress),

  // Assets
  assets: Type.Object({
    // Transacting assets only come from Executed event.
    transacting: Type.Optional(
      Type.Object({
        asset: Type.String(),
        amount: TIntegerString,
      }),
    ),
    // Local asset comes from Reconciled and Executed events.
    local: Type.Object({
      asset: Type.String(),
      amount: TIntegerString,
    }),
  }),

  // Execute Transaction
  execute: Type.Optional(
    Type.Intersect([
      XTransferMethodCallSchema,
      Type.Object({
        // Executed Event Data
        originSender: Type.Optional(TAddress),
      }),
    ]),
  ),

  // Reconcile Transaction
  reconcile: Type.Optional(XTransferMethodCallSchema),
});

export const TransferIdInformationSchema = Type.Object({
  originDomain: Type.String(),
  destinationDomain: Type.String(),
  canonicalDomain: Type.String(),
  to: TAddress,
  delegate: TAddress,
  receiveLocal: Type.Boolean(),
  callData: Type.String(),
  slippage: TIntegerString,
  originSender: TAddress,
  bridgedAmt: Type.String(),
  normalizedIn: TIntegerString,
  nonce: Type.Number(),
  canonicalId: Type.String(),
});

export const XTransferSchema = Type.Intersect([
  Type.Object({
    transferId: Type.String(),

    // Call Params
    // NOTE: TransferInfo is emitted by XCalled and Executed events, but not Reconciled event.
    xparams: TransferIdInformationSchema,
  }),
  Type.Object({
    origin: Type.Optional(XTransferOriginSchema),
    destination: Type.Optional(XTransferDestinationSchema),
  }),
]);
export type XTransfer = Static<typeof XTransferSchema>;

export const OriginTransferSchema = Type.Intersect([
  Type.Object({
    transferId: Type.String(),
    xparams: TransferIdInformationSchema,
  }),
  Type.Object({
    origin: XTransferOriginSchema,
    destination: Type.Optional(XTransferDestinationSchema),
  }),
]);
export type OriginTransfer = Static<typeof OriginTransferSchema>;

export const DestinationTransferSchema = Type.Intersect([
  Type.Object({
    transferId: Type.String(),
    xparams: Type.Object({
      originDomain: Type.String(),
      destinationDomain: Type.String(),
      canonicalDomain: Type.String(),
      to: TAddress,
      delegate: TAddress,
      receiveLocal: Type.Boolean(),
      callData: Type.String(),
      slippage: TIntegerString,
      originSender: TAddress,
      bridgedAmt: Type.String(),
      normalizedIn: TIntegerString,
      nonce: Type.Optional(Type.Number()),
      canonicalId: Type.String(),
    }),
  }),
  Type.Object({
    origin: Type.Optional(XTransferOriginSchema),
    destination: XTransferDestinationSchema,
  }),
]);
export type DestinationTransfer = Static<typeof DestinationTransferSchema>;

export type TransferInfo = Static<typeof TransferIdInformationSchema>;

export const XCallArgsSchema = Type.Object({
  destination: Type.String(),
  to: TAddress,
  asset: TAddress,
  delegate: TAddress,
  amount: TIntegerString,
  slippage: TIntegerString,
  callData: Type.String(),
});

export type XCallArgs = Static<typeof XCallArgsSchema>;

export const ExecuteArgsSchema = Type.Object({
  params: TransferIdInformationSchema,
  routers: Type.Array(TAddress),
  routerSignatures: Type.Array(Type.String()),
  sequencer: TAddress,
  sequencerSignature: Type.String(),
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

export const AssetSchema = Type.Object({
  id: TAddress,
  key: Type.String(),
  adoptedAsset: TAddress,
  canonicalId: Type.String(),
  canonicalDomain: Type.String(),
  localAsset: TAddress,
  blockNumber: Type.String(),
});
export type Asset = Static<typeof AssetSchema>;

export const AssetBalanceSchema = Type.Intersect([
  AssetSchema,
  Type.Object({
    balance: TIntegerString,
    domain: Type.String(),
  }),
]);
export type AssetBalance = Static<typeof AssetBalanceSchema>;

export const RouterBalanceSchema = Type.Object({ router: TAddress, assets: Type.Array(AssetBalanceSchema) });
export type RouterBalance = Static<typeof RouterBalanceSchema>;
