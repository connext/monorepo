import { Type, Static } from "@sinclair/typebox";

import { TAddress, TBytes32, TIntegerString } from "./primitives";

export const XTransferStatus = {
  XCalled: "XCalled",
  Executed: "Executed",
  Reconciled: "Reconciled",
  CompletedFast: "CompletedFast",
  CompletedSlow: "CompletedSlow",
} as const;
export type XTransferStatus = (typeof XTransferStatus)[keyof typeof XTransferStatus];

export const XTransferErrorStatus = {
  LowSlippage: "LowSlippage",
  LowRelayerFee: "LowRelayerFee",
  ExecutionError: "ExecutionError",
  NoBidsReceived: "NoBidsReceived",
} as const;
export type XTransferErrorStatus = (typeof XTransferErrorStatus)[keyof typeof XTransferErrorStatus];

export const XTransferMessageStatus = {
  XCalled: "XCalled",
  SpokeRootSent: "SpokeRootSent",
  SpokeRootArrivedOnHub: "SpokeRootArrivedOnHub",
  AggregateRootPropagated: "AggregateRootPropagated",
  AggregatedRootArrivedOnSpokeDomain: "AggregatedRootArrivedOnSpokeDomain",
  Processed: "Processed",
} as const;
export type XTransferMessageStatus = (typeof XTransferMessageStatus)[keyof typeof XTransferMessageStatus];

export const XTransferMethodCallSchema = Type.Object({
  caller: TAddress,
  transactionHash: Type.String(),
  timestamp: Type.Number(),
  gasPrice: TIntegerString,
  gasLimit: TIntegerString,
  blockNumber: Type.Number(),
  txOrigin: Type.Optional(TAddress),
  txNonce: Type.Number(),
});

export const XTransferOriginSchema = Type.Object({
  chain: TIntegerString,

  // Event Data
  messageHash: Type.String(),

  // Failure reason
  errorStatus: Type.Optional(Type.Enum(XTransferErrorStatus)),

  // message status
  messageStatus: Type.Optional(Type.Enum(XTransferMessageStatus)),

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

  relayerFees: Type.Record(Type.String(), TIntegerString),

  // XCall Transaction
  xcall: Type.Omit(XTransferMethodCallSchema, ["txNonce"]),
});

export const XTransferDestinationSchema = Type.Object({
  chain: TIntegerString,

  // Event Data
  status: Type.Enum(XTransferStatus),
  // Both Executed and Reconciled events emit `routers`.
  routers: Type.Array(TAddress),

  updatedSlippage: Type.Optional(TIntegerString),

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
      slippage: Type.Optional(TIntegerString),
      originSender: TAddress,
      bridgedAmt: Type.String(),
      normalizedIn: TIntegerString,
      amount: TIntegerString,
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
  relayerFee: Type.Optional(Type.String()),
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
  decimal: TIntegerString,
  adoptedDecimal: TIntegerString,
  adoptedAsset: TAddress,
  canonicalId: Type.String(),
  canonicalDomain: Type.String(),
  localAsset: TAddress,
  blockNumber: Type.String(),
  domain: Type.String(),
});
export type Asset = Static<typeof AssetSchema>;

export const AssetBalanceSchema = Type.Intersect([
  AssetSchema,
  Type.Object({
    balance: TIntegerString,
    locked: TIntegerString,
    supplied: TIntegerString,
    removed: TIntegerString,
    feesEarned: TIntegerString,
  }),
]);
export type AssetBalance = Static<typeof AssetBalanceSchema>;

export const AssetPriceSchema = Type.Object({
  canonicalId: Type.String(),
  canonicalDomain: Type.String(),
  timestamp: Type.Number(),
  price: Type.Number(),
});
export type AssetPrice = Static<typeof AssetPriceSchema>;

export const RouterBalanceSchema = Type.Object({ router: TAddress, assets: Type.Array(AssetBalanceSchema) });
export type RouterBalance = Static<typeof RouterBalanceSchema>;

export const BidStatusSchema = Type.Object({
  timestamp: Type.String(),
  attempts: Type.Number(),
});

// BidStatus type - used for tracking transfer bid status by routers.
export type BidStatus = Static<typeof BidStatusSchema>;

export const RelayerFeesIncreaseSchema = Type.Object({
  id: Type.String(),
  transferId: TBytes32,
  increase: TIntegerString,
  asset: TAddress,
  domain: Type.String(),
  timestamp: TIntegerString,
});
export type RelayerFeesIncrease = Static<typeof RelayerFeesIncreaseSchema>;

export const SlippageUpdateSchema = Type.Object({
  id: Type.String(),
  transferId: TBytes32,
  slippage: TIntegerString,
  domain: Type.String(),
  timestamp: Type.Number(),
});
export type SlippageUpdate = Static<typeof SlippageUpdateSchema>;

export const RouterDailyTVLSchema = Type.Object({
  id: Type.String(),
  asset: TAddress,
  router: TAddress,
  domain: Type.String(),
  timestamp: Type.Number(),
  balance: TIntegerString,
});
export type RouterDailyTVL = Static<typeof RouterDailyTVLSchema>;
