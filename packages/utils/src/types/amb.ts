import { Type, Static } from "@sinclair/typebox";

export const XMessageSchema = Type.Object({
  leaf: Type.String(),
  originDomain: Type.String(),
  destinationDomain: Type.String(),
  transferId: Type.String(),
  origin: Type.Object({
    index: Type.Number({ minimum: 0 }),
    root: Type.String(),
    message: Type.String(),
  }),
  destination: Type.Optional(
    Type.Object({
      processed: Type.Boolean(),
      returnData: Type.String(),
    }),
  ),
});
export type XMessage = Static<typeof XMessageSchema>;

export const OriginMessageSchema = Type.Object({
  domain: Type.String(),
  transferId: Type.String(),
  destinationDomain: Type.String(),
  leaf: Type.String(),
  index: Type.Number({ minimum: 0 }),
  root: Type.String(),
  message: Type.String(),
});
export type OriginMessage = Static<typeof OriginMessageSchema>;

export const DestinationMessageSchema = Type.Object({
  domain: Type.String(),
  leaf: Type.String(),
  processed: Type.Boolean(),
  returnData: Type.String(),
});
export type DestinationMessage = Static<typeof DestinationMessageSchema>;

export const XRootMessageSchema = Type.Object({
  root: Type.String(),
  origin: Type.Object({
    index: Type.Number({ minimum: 0 }),
    root: Type.String(),
    message: Type.String(),
  }),
  hub: Type.Optional(
    Type.Object({
      transactionHash: Type.String(),
      returnData: Type.String(),
    }),
  ),
});

export const RootMessageSchema = Type.Object({
  root: Type.String(),
  chainId: Type.Number(),

  // MessageSent/MessageProcessed Transaction
  caller: Type.String(),
  transactionHash: Type.String(),
  logIndex: Type.Number(),
  transactionLogIndex: Type.Number(),
  timestamp: Type.Number(),
  gasPrice: Type.Number(),
  gasLimit: Type.Number(),
  blockNumber: Type.Number(),
});
export type RootMessage = Static<typeof RootMessageSchema>;
