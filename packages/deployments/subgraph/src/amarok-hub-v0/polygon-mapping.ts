/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

import { NewConnector, MessageProcessed } from "../../generated/PolygonHubConnector/PolygonHubConnector";

import { PolygonConnectorMeta, RootMessageProcessed } from "../../generated/schema";

const DEFAULT_POLYGON_HUB_CONNECTOR_META_ID = "POLYGON_HUB_CONNECTOR_META_ID";

/// MARK - POLYGON
export function handlePolygonNewConnector(event: NewConnector): void {
  let meta = PolygonConnectorMeta.load(DEFAULT_POLYGON_HUB_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new PolygonConnectorMeta(DEFAULT_POLYGON_HUB_CONNECTOR_META_ID);
  }

  meta.spokeDomain = event.params.domain;
  meta.hubDomain = event.params.mirrorDomain;

  meta.amb = event.params.amb;
  meta.rootManager = event.params.rootManager;
  meta.mirrorConnector = event.params.mirrorConnector;

  meta.save();
}

export function handlePolygonMessageProcessed(event: MessageProcessed): void {
  let message = RootMessageProcessed.load(event.params.data.toHexString());
  if (message == null) {
    message = new RootMessageProcessed(event.params.data.toHexString());
  }

  let meta = PolygonConnectorMeta.load(DEFAULT_POLYGON_HUB_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new PolygonConnectorMeta(DEFAULT_POLYGON_HUB_CONNECTOR_META_ID);
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
