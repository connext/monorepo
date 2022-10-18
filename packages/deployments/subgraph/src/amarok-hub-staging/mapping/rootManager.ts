/* eslint-disable prefer-const */
import {
  RootAggregated as RootAggregatedEvent,
  RootPropagated as RootPropagatedEvent,
} from "../../../generated/RootManager/RootManager";
import { RootAggregated, RootPropagated } from "../../../generated/schema";

/// MARK - ROOT MANAGER
export function handleRootAggregated(event: RootAggregatedEvent): void {
  let instance = RootAggregated.load(event.params.receivedRoot.toHexString());
  if (instance == null) {
    instance = new RootAggregated(event.params.receivedRoot.toHexString());
  }

  instance.domain = event.params.domain;
  instance.receivedRoot = event.params.receivedRoot;
  instance.index = event.params.index;

  instance.save();
}

export function handleRootPropagated(event: RootPropagatedEvent): void {
  let instance = RootPropagated.load(event.params.aggregate.toHexString());
  if (instance == null) {
    instance = new RootPropagated(event.params.aggregate.toHexString());
  }
  instance.aggregate = event.params.aggregate;
  instance.domains = event.params.domains;
  instance.count = event.params.count;

  instance.save();
}
