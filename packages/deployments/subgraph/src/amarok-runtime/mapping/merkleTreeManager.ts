import { BigInt } from "@graphprotocol/graph-ts";

import { LeafInserted } from "../../../generated/MerkleTreeManager/MerkleTreeManager";
import { OriginMessage, RootCount } from "../../../generated/schema";

export function handleLeafInserted(event: LeafInserted): void {
  // Dispatch(bytes32 leaf, uint256 index, bytes32 root, bytes message);
  let message = OriginMessage.load(event.params.leaf.toHexString());
  if (message == null) {
    message = new OriginMessage(event.params.leaf.toHexString());
  }

  message.leaf = event.params.leaf;
  // NOTE: Current leaf index is count - 1 since new leaf has already been inserted.
  message.index = event.params.count.minus(BigInt.fromI32(1));
  message.root = event.params.root;
  message.transactionHash = event.transaction.hash;
  message.blockNumber = event.block.number;

  let rootCount = RootCount.load(event.params.root.toHexString());
  if (rootCount == null) {
    rootCount = new RootCount(event.params.root.toHexString());
  }

  rootCount.count = event.params.count.minus(BigInt.fromI32(1));

  rootCount.save();
  message.save();
}
