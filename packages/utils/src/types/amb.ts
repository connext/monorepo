import { Type, Static } from "@sinclair/typebox";

import { TBytes32, TIntegerString } from "./primitives";

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
  sentTimestamp: Type.Optional(Type.Number()),
  sentTaskId: Type.Optional(TBytes32),
  relayerType: Type.Optional(Type.String()),
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

export const RootManagerModeSchema = Type.Object({
  id: Type.String(),
  mode: Type.String(),
});
export type RootManagerMode = Static<typeof RootManagerModeSchema>;
export type SpokeConnectorMode = Static<typeof RootManagerModeSchema>;

export const ReceivedAggregateRootSchema = Type.Object({
  id: Type.String(),
  root: Type.String(),
  domain: Type.String(),
  blockNumber: Type.Number(),
});
export type ReceivedAggregateRoot = Static<typeof ReceivedAggregateRootSchema>;

export const RootMessageStatusSchema = Type.Object({
  processedCount: Type.Number(),
  unprocessedCount: Type.Number(),
  aggregatedCount: Type.Number(),
  lastAggregatedRoot: Type.Optional(Type.String()),
});
export type RootMessageStatus = Static<typeof RootMessageStatusSchema>;

export const SnapshotSchema = Type.Object({
  id: Type.String(),
  aggregateRoot: Type.String(),
  baseAggregateRoot: Type.String(),
  roots: Type.Array(Type.String()),
  domains: Type.Array(Type.String()),
  endOfDispute: Type.Number(),
  processed: Type.Optional(Type.Boolean()),
  status: Type.Optional(Type.String()),
  proposedTimestamp: Type.Number(),
  propagateTimestamp: Type.Optional(Type.Number()),
  finalizedTimestamp: Type.Optional(Type.Number()),
  propagateTaskId: Type.Optional(TBytes32),
  relayerType: Type.Optional(Type.String()),
});
export type Snapshot = Static<typeof SnapshotSchema>;

export const ModeType = {
  SlowMode: "SLOW_MODE",
  OptimisticMode: "OPTIMISTIC_MODE",
} as const;
export type Mode = (typeof ModeType)[keyof typeof ModeType];

export const OptimisticRootProposedSchema = Type.Object({
  id: Type.String(),
  endOfDispute: Type.Number(),
  aggregateRoot: Type.String(),
  snapshotsRoots: Type.Array(Type.String()),
  domains: Type.Array(Type.Number()),
  baseAggregateRoot: Type.String(),
});
export type OptimisticRootProposed = Static<typeof OptimisticRootProposedSchema>;

export const SnapshotRootSchema = Type.Object({
  id: Type.String(),
  spokeDomain: Type.Number(),
  root: Type.String(),
  count: Type.Number(),
  timestamp: Type.Optional(Type.Number()),
  blockNumber: Type.Optional(Type.Number()),
});
export type SnapshotRoot = Static<typeof SnapshotRootSchema>;

export const OptimisticRootFinalizedSchema = Type.Object({
  id: Type.String(),
  aggregateRoot: Type.String(),
  timestamp: Type.Number(),
});
export type OptimisticRootFinalized = Static<typeof OptimisticRootFinalizedSchema>;

export const OptimisticRootPropagatedSchema = Type.Object({
  id: Type.String(),
  aggregateRoot: Type.String(),
  domainsHash: Type.String(),
  timestamp: Type.Number(),
});
export type OptimisticRootPropagated = Static<typeof OptimisticRootPropagatedSchema>;

export const SpokeOptimisticRootSchema = Type.Object({
  id: Type.String(),
  aggregateRoot: Type.String(),
  rootTimestamp: Type.Number(),
  endOfDispute: Type.Number(),
  domain: Type.String(),
  processed: Type.Optional(Type.Boolean()),
  status: Type.Optional(Type.String()),
  proposeTimestamp: Type.Optional(Type.Number()),
  proposeTaskId: Type.Optional(TBytes32),
  relayerType: Type.Optional(Type.String()),
});
export type SpokeOptimisticRoot = Static<typeof SpokeOptimisticRootSchema>;
