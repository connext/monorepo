/* eslint-disable prefer-const */
import { NewConnector, MessageProcessed } from "../../../generated/ScrollHubConnector/ScrollHubConnector";
import { ScrollConnectorMeta, RootMessageProcessed } from "../../../generated/schema";

const DEFAULT_SCROLL_HUB_CONNECTOR_META_ID = "SCROLL_HUB_CONNECTOR_META_ID";

/// MARK - SCROLL
export function handleScrollNewConnector(event: NewConnector): void {
  let meta = ScrollConnectorMeta.load(DEFAULT_SCROLL_HUB_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new ScrollConnectorMeta(DEFAULT_SCROLL_HUB_CONNECTOR_META_ID);
  }

  meta.spokeDomain = event.params.mirrorDomain;
  meta.hubDomain = event.params.domain;

  meta.amb = event.params.amb;
  meta.rootManager = event.params.rootManager;
  meta.mirrorConnector = event.params.mirrorConnector;

  meta.save();
}

export function handleScrollMessageProcessed(event: MessageProcessed): void {
  let meta = ScrollConnectorMeta.load(DEFAULT_SCROLL_HUB_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new ScrollConnectorMeta(DEFAULT_SCROLL_HUB_CONNECTOR_META_ID);
  }
  let message = RootMessageProcessed.load(`${event.params.data.toHexString()}-${meta.spokeDomain.toString()}`);
  if (message == null) {
    message = new RootMessageProcessed(`${event.params.data.toHexString()}-${meta.spokeDomain.toString()}`);
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
