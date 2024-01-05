import { BigInt, Bytes } from "@graphprotocol/graph-ts";

import { LeavesInserted } from "../../../generated/MerkleTreeManager/MerkleTreeManager";
import { AggregatedMessageRoot, RootAggregated } from "../../../generated/schema";

export function handleLeavesInserted(event: LeavesInserted): void {
  const key = event.params.root.toHexString();
  const numRootsAggregated = event.params.leaves.length;
  const preCount = event.params.count.minus(BigInt.fromI32(numRootsAggregated));

  for (let i = 0; i < numRootsAggregated; i++) {
    const leaf = event.params.leaves[i].toHexString();
    const index = preCount.plus(BigInt.fromI32(i));

    let instance = AggregatedMessageRoot.load(`${key}-${index}`); // Should ALWAYS be null.
    if (instance == null) {
      instance = new AggregatedMessageRoot(`${key}-${index}`);
    }

    const rootAggregatedInstance = RootAggregated.load(leaf);
    if (rootAggregatedInstance != null) {
      instance.domain = rootAggregatedInstance.domain;
    }
    instance.index = index;
    instance.receivedRoot = Bytes.fromHexString(leaf);
    instance.blockNumber = event.block.number;
    instance.save();
  }
}
