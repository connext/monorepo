/* eslint-disable prefer-const */
import {
  NewConnector,
  Dispatch,
  AggregateRootsUpdated,
  MessageSent,
  MessageProcessed,
} from "../../../generated/SpokeConnector/SpokeConnector";
import { OriginMessage, AggregateRoot, RootMessageSent, ConnectorMeta } from "../../../generated/schema";

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

  message.save();
}

export function handleAggregateRootUpdated(event: AggregateRootsUpdated): void {
  let aggregateRoot = AggregateRoot.load(event.params.current.toHexString());
  if (aggregateRoot == null) {
    aggregateRoot = new AggregateRoot(event.params.current.toHexString());
  }

  aggregateRoot.root = event.params.current;
  aggregateRoot.save();
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
  message.caller = event.params.caller;
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
