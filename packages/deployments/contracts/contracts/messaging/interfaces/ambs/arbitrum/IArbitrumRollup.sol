pragma solidity 0.8.15;

// modified from: https://github.com/OffchainLabs/nitro/blob/master/contracts/src/rollup/Node.sol
struct Node {
  // Hash of the state of the chain as of this node
  bytes32 stateHash;
  // Hash of the data that can be challenged
  bytes32 challengeHash;
  // Hash of the data that will be committed if this node is confirmed
  bytes32 confirmData;
  // Index of the node previous to this one
  uint64 prevNum;
  // Deadline at which this node can be confirmed
  uint64 deadlineBlock;
  // Deadline at which a child of this node can be confirmed
  uint64 noChildConfirmedBeforeBlock;
  // Number of stakers staked on this node. This includes real stakers and zombies
  uint64 stakerCount;
  // Number of stakers staked on a child node. This includes real stakers and zombies
  uint64 childStakerCount;
  // This value starts at zero and is set to a value when the first child is created. After that it is constant until the node is destroyed or the owner destroys pending nodes
  uint64 firstChildBlock;
  // The number of the latest child of this node to be created
  uint64 latestChildNumber;
  // The block number when this node was created
  uint64 createdAtBlock;
  // A hash of all the data needed to determine this node's validity, to protect against reorgs
  bytes32 nodeHash;
}

// modified from: https://github.com/OffchainLabs/nitro/blob/master/contracts/src/rollup/IRollupCore.sol
interface IArbitrumRollup {
  /**
   * @notice Get the Node for the given index.
   */
  function getNode(uint64 nodeNum) external view returns (Node memory);
}
