/* eslint-disable prefer-const */
import {
  NewConnector,
  AggregateRootReceived,
  MessageSent,
  SnapshotRootSaved,
  AggregateRootProposed as AggregateRootProposedEvent,
  ProposedRootFinalized as ProposedRootFinalizedEvent,
  SlowModeActivated,
  OptimisticModeActivated,
} from "../../../generated/SpokeConnector/SpokeConnector";
import {
  AggregateRoot,
  RootMessageSent,
  ConnectorMeta,
  RootCount,
  SnapshotRoot,
  SpokeConnectorMode,
  AggregateRootProposed,
  ProposedRootFinalized,
} from "../../../generated/schema";

const DEFAULT_CONNECTOR_META_ID = "CONNECTOR_META_ID";
const CONNECTOR_MODE_ID = "CONNECTOR_MODE_ID";
const OPTIMISTIC_MODE = "OPTIMISTIC_MODE";
const SLOW_MODE = "SLOW_MODE";

/// MARK - Connector

export function handleMessageSent(event: MessageSent): void {
  let meta = ConnectorMeta.load(DEFAULT_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new ConnectorMeta(DEFAULT_CONNECTOR_META_ID);
  }

  let message = RootMessageSent.load(`${event.params.data.toHexString()}-${meta.spokeDomain!.toString()}`);
  if (message == null) {
    message = new RootMessageSent(`${event.params.data.toHexString()}-${meta.spokeDomain!.toString()}`);
  }

  message.spokeDomain = meta.spokeDomain;
  message.hubDomain = meta.hubDomain;

  message.root = event.params.data;

  let rootCount = RootCount.load(event.params.data.toHexString());
  if (rootCount == null) {
    rootCount = new RootCount(event.params.data.toHexString());
  }

  message.count = rootCount.count;

  message.caller = event.transaction.from;
  message.transactionHash = event.transaction.hash;
  message.timestamp = event.block.timestamp;
  message.gasPrice = event.transaction.gasPrice;
  message.gasLimit = event.transaction.gasLimit;
  message.blockNumber = event.block.number;
  message.save();
}

export function handleNewConnector(event: NewConnector): void {
  let meta = ConnectorMeta.load(DEFAULT_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new ConnectorMeta(DEFAULT_CONNECTOR_META_ID);
  }

  meta.spokeDomain = event.params.domain;
  meta.hubDomain = event.params.mirrorDomain;

  meta.amb = event.params.amb;
  meta.rootManager = event.params.rootManager;
  meta.mirrorConnector = event.params.mirrorConnector;

  meta.save();
}

export function handleAggregateRootReceived(event: AggregateRootReceived): void {
  let aggregateRoot = AggregateRoot.load(event.params.root.toHexString());
  if (aggregateRoot == null) {
    aggregateRoot = new AggregateRoot(event.params.root.toHexString());
  }

  aggregateRoot.root = event.params.root;
  aggregateRoot.blockNumber = event.block.number;
  aggregateRoot.save();
}

export function handleSnapshotRootSaved(event: SnapshotRootSaved): void {
  let meta = ConnectorMeta.load(DEFAULT_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new ConnectorMeta(DEFAULT_CONNECTOR_META_ID);
  }

  let message = SnapshotRoot.load(`${event.params.snapshotId}`);
  if (message == null) {
    message = new SnapshotRoot(`${event.params.snapshotId}`);
  }

  message.spokeDomain = meta.spokeDomain;

  message.root = event.params.root;

  message.count = event.params.count;

  message.timestamp = event.block.timestamp;
  message.blockNumber = event.block.number;
  message.save();
}
export function handleSlowModeActivated(event: SlowModeActivated): void {
  let instance = SpokeConnectorMode.load(CONNECTOR_MODE_ID);
  if (instance == null) {
    instance = new SpokeConnectorMode(CONNECTOR_MODE_ID);
  }

  instance.mode = SLOW_MODE;

  instance.save();
}

export function handleOptimisticModeActivated(event: OptimisticModeActivated): void {
  let instance = SpokeConnectorMode.load(CONNECTOR_MODE_ID);
  if (instance == null) {
    instance = new SpokeConnectorMode(CONNECTOR_MODE_ID);
  }

  instance.mode = OPTIMISTIC_MODE;

  instance.save();
}

export function handleAggregateRootProposed(event: AggregateRootProposedEvent): void {
  const key = event.params.aggregateRoot.toHexString();
  let instance = AggregateRootProposed.load(key);
  if (instance == null) {
    instance = new AggregateRootProposed(key);
  }
  instance.aggregateRoot = event.params.aggregateRoot;
  instance.rootTimestamp = event.params.rootTimestamp;
  instance.endOfDispute = event.params.endOfDispute;
  instance.domain = event.params.domain;

  instance.save();
}

export function handleProposedRootFinalized(event: ProposedRootFinalizedEvent): void {
  const key = event.params.aggregateRoot.toHexString();
  let instance = ProposedRootFinalized.load(key);
  if (instance == null) {
    instance = new ProposedRootFinalized(key);
  }
  instance.aggregateRoot = event.params.aggregateRoot;

  instance.save();
}
