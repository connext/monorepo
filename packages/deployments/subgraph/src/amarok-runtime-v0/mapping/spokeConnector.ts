/* eslint-disable prefer-const */
import {
  NewConnector,
  AggregateRootReceived,
  MessageSent,
  SnapshotRootSaved,
} from "../../../generated/SpokeConnector/SpokeConnector";
import { AggregateRoot, RootMessageSent, ConnectorMeta, RootCount, SnapshotRoot } from "../../../generated/schema";

const DEFAULT_CONNECTOR_META_ID = "CONNECTOR_META_ID";

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

  let message = SnapshotRoot.load(`${event.params.snapshotId.toHexString()}-${meta.spokeDomain!.toString()}`);
  if (message == null) {
    message = new SnapshotRoot(`${event.params.snapshotId.toHexString()}-${meta.spokeDomain!.toString()}`);
  }

  message.spokeDomain = meta.spokeDomain;

  message.root = event.params.root;

  message.count = event.params.count;

  message.timestamp = event.block.timestamp;
  message.blockNumber = event.block.number;
  message.save();
}
