/* eslint-disable prefer-const */
import { Address, Bytes } from "@graphprotocol/graph-ts";

import {
  RootPropagated as RootPropagatedEvent,
  RootReceived as RootReceivedEvent,
  ConnectorAdded as ConnectorAddedEvent,
  ConnectorRemoved as ConnectorRemovedEvent,
  AggregateRootProposed as AggregateRootProposedEvent,
  ProposedRootFinalized as ProposedRootFinalizedEvent,
  OptimisticRootPropagated as OptimisticRootPropagatedEvent,
  SlowModeActivated as SlowModeActivatedEvent,
  OptimisticModeActivated as OptimisticModeActivatedEvent,
} from "../../../generated/RootManager/RootManager";
import {
  RootPropagated,
  RootAggregated,
  RootManagerMeta,
  RootManagerMode,
  OptimisticRootProposed,
  OptimisticRootFinalized,
  OptimisticRootPropagated,
} from "../../../generated/schema";

const ROOT_MANAGER_META_ID = "ROOT_MANAGER_META_ID";
const ROOT_MANAGER_MODE_ID = "ROOT_MANAGER_MODE_ID";
const OPTIMISTIC_MODE = "OPTIMISTIC_MODE";
const SLOW_MODE = "SLOW_MODE";

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

export function handleAggregateRootProposed(event: AggregateRootProposedEvent): void {
  let snapshot = OptimisticRootProposed.load(event.params.snapshotId.toHexString());
  if (snapshot == null) {
    snapshot = new OptimisticRootProposed(event.params.snapshotId.toHexString());
  }

  snapshot.disputeCliff = event.params.endOfDispute;
  snapshot.aggregateRoot = event.params.aggregateRoot;
  snapshot.snapshotsRoots = event.params.snapshotsRoots;
  snapshot.domains = event.params.domains;
  snapshot.baseAggregateRoot = event.params.baseRoot;

  snapshot.save();
}

export function handleProposedRootFinalized(event: ProposedRootFinalizedEvent): void {
  let snapshot = OptimisticRootFinalized.load(event.params.aggregateRoot.toHexString());
  if (snapshot == null) {
    snapshot = new OptimisticRootFinalized(event.params.aggregateRoot.toHexString());
  }

  snapshot.aggregateRoot = event.params.aggregateRoot;
  snapshot.timestamp = event.block.timestamp;

  snapshot.save();
}

export function handleOptimisticRootPropagated(event: OptimisticRootPropagatedEvent): void {
  let snapshot = OptimisticRootPropagated.load(event.params.aggregateRoot.toHexString());
  if (snapshot == null) {
    snapshot = new OptimisticRootPropagated(event.params.aggregateRoot.toHexString());
  }

  snapshot.aggregateRoot = event.params.aggregateRoot;
  snapshot.domainsHash = event.params.domainsHash;
  snapshot.timestamp = event.block.timestamp;

  snapshot.save();
}

export function handleSlowModeActivated(event: SlowModeActivatedEvent): void {
  let instance = RootManagerMode.load(ROOT_MANAGER_MODE_ID);
  if (instance == null) {
    instance = new RootManagerMode(ROOT_MANAGER_MODE_ID);
  }

  instance.mode = SLOW_MODE;

  instance.save();
}

export function handleOptimisticModeActivated(event: OptimisticModeActivatedEvent): void {
  let instance = RootManagerMode.load(ROOT_MANAGER_MODE_ID);
  if (instance == null) {
    instance = new RootManagerMode(ROOT_MANAGER_MODE_ID);
  }

  instance.mode = OPTIMISTIC_MODE;

  instance.save();
}
