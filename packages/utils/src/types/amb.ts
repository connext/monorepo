import { Type, Static } from "@sinclair/typebox";

import { TIntegerString } from "./primitives";

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

export const RootMessageSchema = Type.Object({
  id: Type.String(),
  spokeDomain: Type.String(),
  hubDomain: Type.String(),
  root: Type.String(),
  caller: Type.String(),
  transactionHash: Type.String(),
  timestamp: Type.Number(),
  gasPrice: TIntegerString,
  gasLimit: TIntegerString,
  blockNumber: Type.Number(),
  processed: Type.Boolean(),
  count: Type.Number({ minimum: 0 }),
});
export type RootMessage = Static<typeof RootMessageSchema>;

export const AggregatedRootSchema = Type.Object({
  id: Type.String(),
  domain: Type.String(),
  receivedRoot: Type.String(),
  index: Type.Number({ minimum: 0 }),
});
export type AggregatedRoot = Static<typeof AggregatedRootSchema>;

export const PropagatedRootSchema = Type.Object({
  id: Type.String(),
  aggregate: Type.String(),
  domainsHash: Type.String(),
  count: Type.Number({ minimum: 0 }),
});
export type PropagatedRoot = Static<typeof PropagatedRootSchema>;

export const ConnectorMetaSchema = Type.Object({
  id: Type.String(),
  spokeDomain: Type.String(),
  hubDomain: Type.String(),
  rootManager: Type.String(),
  mirrorConnector: Type.String(),
  amb: Type.String(),
});
export type ConnectorMeta = Static<typeof ConnectorMetaSchema>;

export const RootManagerMetaSchema = Type.Object({
  id: Type.String(),
  connectors: Type.Array(Type.String()),
  domains: Type.Array(Type.String()),
});
export type RootManagerMeta = Static<typeof RootManagerMetaSchema>;

export const ReceivedAggregateRootSchema = Type.Object({
  id: Type.String(),
  root: Type.String(),
  domain: Type.String(),
  blockNumber: Type.Number(),
});
export type ReceivedAggregateRoot = Static<typeof ReceivedAggregateRootSchema>;
