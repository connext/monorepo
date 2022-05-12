import { Type, Static } from "@sinclair/typebox";

import { TAddress, TIntegerString } from ".";

// dear Jake, please stop changing this to enum
export const XTransferStatus = {
  Executed: "Executed",
  Reconciled: "Reconciled",
  Completed: "Completed",
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
  xcall: Type.Intersect([
    XTransferMethodCallSchema,
    Type.Object({
      // XCalled Event Data
      relayerFee: TIntegerString,
    }),
  ]),
});

export const XTransferDestinationSchema = Type.Object({
  chain: TIntegerString,

  // Destination Event Data.
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

export const XTransferCoreSchema = Type.Object({
  // Meta
  idx: Type.Optional(TIntegerString),
  transferId: Type.String(),
});

export const XTransferSchema = Type.Intersect([
  Type.Object({
    originDomain: Type.String(),
    destinationDomain: Type.Optional(Type.String()),

    // NOTE: Nonce is delivered by XCalled and Executed events, but not Reconciled event.
    nonce: Type.Optional(Type.Integer()),

    // Call Params
    // NOTE: CallParams is emitted by XCalled and Executed events, but not Reconciled event.
    xparams: Type.Optional(
      Type.Object({
        to: TAddress,
        callData: Type.String(),
        forceSlow: Type.Boolean(),
        receiveLocal: Type.Boolean(),
      }),
    ),
  }),
  XTransferCoreSchema,
  Type.Object({
    origin: Type.Optional(XTransferOriginSchema),
    destination: Type.Optional(XTransferDestinationSchema),
  }),
]);
export type XTransfer = Static<typeof XTransferSchema>;

export const OriginTransferSchema = Type.Intersect([
  Type.Object({
    originDomain: Type.String(),
    destinationDomain: Type.String(),
    nonce: Type.Integer(),
    xparams: Type.Object({
      to: TAddress,
      callData: Type.String(),
      forceSlow: Type.Boolean(),
      receiveLocal: Type.Boolean(),
    }),
  }),
  XTransferCoreSchema,
  Type.Object({
    origin: XTransferOriginSchema,
    destination: Type.Optional(XTransferDestinationSchema),
  }),
]);
export type OriginTransfer = Static<typeof OriginTransferSchema>;

export const DestinationTransferSchema = Type.Intersect([
  Type.Object({
    originDomain: Type.String(),
    // NOTE: Destination domain is not emitted by Reconciled event.
    destinationDomain: Type.Optional(Type.String()),
    nonce: Type.Optional(Type.Integer()),
    xparams: Type.Optional(
      Type.Object({
        to: TAddress,
        callData: Type.String(),
        forceSlow: Type.Boolean(),
        receiveLocal: Type.Boolean(),
      }),
    ),
  }),
  XTransferCoreSchema,
  Type.Object({
    origin: Type.Optional(XTransferOriginSchema),
    destination: XTransferDestinationSchema,
  }),
]);
export type DestinationTransfer = Static<typeof DestinationTransferSchema>;

export const CallParamsSchema = Type.Object({
  to: TAddress,
  callData: Type.String(),
  originDomain: Type.String(),
  destinationDomain: Type.String(),
  forceSlow: Type.Boolean(),
  receiveLocal: Type.Boolean(),
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

export const AssetSchema = Type.Object({
  local: TAddress,
  adoptedAsset: TAddress,
  canonicalId: Type.String(),
  canonicalDomain: Type.String(),
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
