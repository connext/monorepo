/* eslint-disable prefer-const */
import { Address, Bytes } from "@graphprotocol/graph-ts";

import {
  RootPropagated as RootPropagatedEvent,
  RootReceived as RootReceivedEvent,
  ConnectorAdded as ConnectorAddedEvent,
  ConnectorRemoved as ConnectorRemovedEvent,
} from "../../../generated/RootManager/RootManager";
import { RootPropagated, RootAggregated, RootManagerMeta } from "../../../generated/schema";

const ROOT_MANAGER_META_ID = "ROOT_MANAGER_META_ID";

/// MARK - ROOT MANAGER
// TODO: Needed?
export function handleRootReceived(event: RootReceivedEvent): void {
  let instance = RootAggregated.load(event.params.receivedRoot.toHexString());
  if (instance == null) {
    instance = new RootAggregated(event.params.receivedRoot.toHexString());
  }

  instance.domain = event.params.domain;
  instance.receivedRoot = event.params.receivedRoot;
  instance.index = event.params.queueIndex;

  instance.save();
}

export function handleRootPropagated(event: RootPropagatedEvent): void {
  const key = event.params.aggregateRoot.toHexString();
  // Create the RootPropagated entity: this is used to track aggregate roots / propagated
  // snapshots for the sake of proof generation off-chain.
  let instance = RootPropagated.load(key);
  // This should ALWAYS be null. Sending the same agg root twice is not possible in current
  // construction.
  if (instance == null) {
    instance = new RootPropagated(key);
  }
  instance.aggregate = event.params.aggregateRoot;
  instance.domainsHash = event.params.domainsHash;
  instance.count = event.params.count;

  instance.save();
}

export function handleConnectorAdded(event: ConnectorAddedEvent): void {
  let instance = RootManagerMeta.load(ROOT_MANAGER_META_ID);
  if (instance == null) {
    instance = new RootManagerMeta(ROOT_MANAGER_META_ID);
  }
  instance.domains = event.params.domains;
  instance.connectors = event.params.connectors.map<Bytes>((c: Address): Bytes => Bytes.fromHexString(c.toHexString()));

  instance.save();
}

export function handleConnectorRemoved(event: ConnectorRemovedEvent): void {
  let instance = RootManagerMeta.load(ROOT_MANAGER_META_ID);
  if (instance == null) {
    instance = new RootManagerMeta(ROOT_MANAGER_META_ID);
  }
  instance.domains = event.params.domains;
  instance.connectors = event.params.connectors.map<Bytes>((c: Address): Bytes => Bytes.fromHexString(c.toHexString()));

  instance.save();
}
