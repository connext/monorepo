/* eslint-disable prefer-const */
import {
  NewConnector,
  Dispatch,
  AggregateRootReceived,
  MessageSent,
  Process,
} from "../../../generated/SpokeConnector/SpokeConnector";
import {
  OriginMessage,
  AggregateRoot,
  RootMessageSent,
  ConnectorMeta,
  RootCount,
  DestinationMessage,
} from "../../../generated/schema";

const DEFAULT_CONNECTOR_META_ID = "CONNECTOR_META_ID";

/// MARK - Connector
export function handleDispatch(event: Dispatch): void {
  // Dispatch(bytes32 leaf, uint256 index, bytes32 root, bytes message);
  let message = OriginMessage.load(event.params.leaf.toHexString());
  if (message == null) {
    message = new OriginMessage(event.params.leaf.toHexString());
  }

  message.leaf = event.params.leaf;
  message.index = event.params.index;
  message.root = event.params.root;
  message.message = event.params.message;
  message.transactionHash = event.transaction.hash;
  message.blockNumber = event.block.number;

  let rootCount = RootCount.load(event.params.root.toHexString());
  if (rootCount == null) {
    rootCount = new RootCount(event.params.root.toHexString());
  }

  rootCount.count = event.params.index;

  rootCount.save();
  message.save();
}

export function handleMessageSent(event: MessageSent): void {
  let message = RootMessageSent.load(event.params.data.toHexString());
  if (message == null) {
    message = new RootMessageSent(event.params.data.toHexString());
  }

  let meta = ConnectorMeta.load(DEFAULT_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new ConnectorMeta(DEFAULT_CONNECTOR_META_ID);
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
  aggregateRoot.save();
}

export function handleProcess(event: Process): void {
  // Process(bytes32 leaf, bool success, bytes returnData);
  let message = DestinationMessage.load(event.params.leaf.toHexString());
  if (message == null) {
    message = new DestinationMessage(event.params.leaf.toHexString());
  }

  message.leaf = event.params.leaf;
  message.success = event.params.success;
  message.returnData = event.params.returnData;

  message.transactionHash = event.transaction.hash;
  message.processed = true; // always true, todo: remove from schema

  message.blockNumber = event.block.number;
  message.save();
}
