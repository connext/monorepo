/* eslint-disable prefer-const */
import { RootPropagated as RootPropagatedEvent } from "../../../generated/RootManager/RootManager";
import { RootPropagated, AggregatedMessageRoot } from "../../../generated/schema";

/// MARK - ROOT MANAGER
// TODO: Needed?
// export function handleRootAggregated(event: RootAggregatedEvent): void {
//   let instance = RootAggregated.load(event.params.index.toString());
//   if (instance == null) {
//     instance = new RootAggregated(event.params.index.toString());
//   }

//   instance.domain = event.params.domain;
//   instance.receivedRoot = event.params.receivedRoot;
//   instance.index = event.params.index;

//   instance.save();
// }

export function handleRootPropagated(event: RootPropagatedEvent): void {
  const numMessageRootsAggregated = event.params.aggregatedMessageRoots.length;
  // Pre-count = the number of nodes in the tree *before* we inserted these message root nodes.
  const aggregateTreePreCount = event.params.count - numMessageRootsAggregated;
  for (let i = 0; i < numMessageRootsAggregated; i++) {
    const leaf = event.params.aggregatedMessageRoots[i].toHexString();
    // Index of insertion for each leaf will be (whatever the aggregate tree count was before
    // insertion of all these message roots) + index in the array of message roots.
    const index = aggregateTreePreCount + i;

    let instance = AggregatedMessageRoot.load(index); // Should ALWAYS be null.
    if (instance == null) {
      instance = new AggregatedMessageRoot(index);
    } else {
      // If the instance was already defined, then that would mean this index has been used
      // before in the aggregate tree! This block should be unreachable.
      throw new Error(`Index ${index} already used for AggregatedMessageRoot!`);
    }
    instance.index = index;
    instance.leaf = leaf;
    instance.save();
  }

  // Create the RootPropagated entity: this is used to track aggregate roots / propagated
  // snapshots for the sake of proof generation off-chain.
  const key = event.params.aggregate.toHexString();
  // This should ALWAYS be null. Sending the same agg root twice is not possible in current
  // construction.
  let instance = RootPropagated.load(key);
  if (instance == null) {
    instance = new RootPropagated(key);
  }
  instance.aggregate = event.params.aggregate;
  instance.domains = event.params.domains;
  instance.count = event.params.count;

  instance.save();
}
