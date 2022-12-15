// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ProposedOwnableUpgradeable} from "../shared/ProposedOwnableUpgradeable.sol";
import {MerkleLib} from "./libraries/MerkleLib.sol";

/**
 * @title MerkleTreeManager
 * @notice Contains a Merkle tree instance and exposes read/write functions for the tree.
 * @dev On the hub domain there are two MerkleTreeManager contracts, one for the hub and one for the MainnetSpokeConnector.
 */
contract MerkleTreeManager is ProposedOwnableUpgradeable {
  // ========== Custom Errors ===========

  error MerkleTreeManager__setArborist_zeroAddress();
  error MerkleTreeManager__setArborist_alreadyArborist();

  // ============ Events ============

  event ArboristUpdated(address previous, address updated);

  event LeafInserted(bytes32 root, uint256 count, bytes32 leaf);

  event LeavesInserted(bytes32 root, uint256 count, bytes32[] leaves);

  // ============ Libraries ============

  using MerkleLib for MerkleLib.Tree;

  // ============ Public Storage ============

  /**
   * @notice Core data structure with which this contract is tasked with keeping custody.
   * Writable only by the designated arborist.
   */
  MerkleLib.Tree public tree;

  /**
   * @notice The arborist contract that has permission to write to this tree.
   * @dev This could be the root manager contract or a spoke connector contract, for example.
   */
  address public arborist;

  // ============ Modifiers ============

  modifier onlyArborist() {
    require(arborist == msg.sender, "!arborist");
    _;
  }

  // ============ Getters ============

  /**
   * @notice Returns the current branch.
   */
  function branch() public view returns (bytes32[32] memory) {
    return tree.branch;
  }

  /**
   * @notice Calculates and returns the current root.
   */
  function root() public view returns (bytes32) {
    return tree.root();
  }

  /**
   * @notice Returns the number of inserted leaves in the tree (current index).
   */
  function count() public view returns (uint256) {
    return tree.count;
  }

  /**
   * @notice Convenience getter: returns the root and count.
   */
  function rootAndCount() public view returns (bytes32, uint256) {
    return (tree.root(), tree.count);
  }

  // ======== Initializer =========

  function initialize(address _arborist) public initializer {
    __MerkleTreeManager_init(_arborist);
    __ProposedOwnable_init();
  }

  /**
   * @dev Initializes MerkleTreeManager instance. Sets the msg.sender as the initial permissioned
   */
  function __MerkleTreeManager_init(address _arborist) internal onlyInitializing {
    __MerkleTreeManager_init_unchained(_arborist);
  }

  function __MerkleTreeManager_init_unchained(address _arborist) internal onlyInitializing {
    arborist = _arborist;
  }

  // ============ Admin Functions ==============

  /**
   * @notice Method for the current arborist to assign write permissions to a new arborist.
   * @param newArborist The new address to set as the current arborist.
   */
  function setArborist(address newArborist) external onlyOwner {
    if (newArborist == address(0)) revert MerkleTreeManager__setArborist_zeroAddress();
    address current = arborist;
    if (current == newArborist) revert MerkleTreeManager__setArborist_alreadyArborist();

    // Emit updated event
    emit ArboristUpdated(current, newArborist);

    arborist = newArborist;
  }

  /**
   * @notice Remove ability to renounce ownership
   * @dev Renounce ownership should be impossible as long as there is a possibility the
   * arborist may change.
   */
  function renounceOwnership() public virtual override onlyOwner {}

  // ========= Public Functions =========

  /**
   * @notice Inserts the given leaves into the tree.
   * @param leaves The leaves to be inserted into the tree.
   * @return _root Current root for convenience.
   * @return _count Current node count (i.e. number of indices) AFTER the insertion of the new leaf,
   * provided for convenience.
   */
  function insert(bytes32[] memory leaves) public onlyArborist returns (bytes32 _root, uint256 _count) {
    // For > 1 leaf, considerably more efficient to put this tree into memory, conduct operations,
    // then re-assign it to storage - *especially* if we have multiple leaves to insert.
    MerkleLib.Tree memory _tree = tree;

    uint256 leafCount = leaves.length;
    for (uint256 i; i < leafCount; ) {
      // Insert the new node (using in-memory method).
      _tree = _tree.insert(leaves[i]);
      unchecked {
        ++i;
      }
    }
    // Write the newly updated tree to storage.
    tree = _tree;

    // Get return details for convenience.
    _count = _tree.count;
    // NOTE: Root calculation method currently reads from storage only.
    _root = tree.root();

    emit LeavesInserted(_root, _count, leaves);
  }

  /**
   * @notice Inserts the given leaf into the tree.
   * @param leaf The leaf to be inserted into the tree.
   * @return _root Current root for convenience.
   * @return _count Current node count (i.e. number of indices) AFTER the insertion of the new leaf,
   * provided for convenience.
   */
  function insert(bytes32 leaf) public onlyArborist returns (bytes32 _root, uint256 _count) {
    // Insert the new node.
    tree = tree.insert(leaf);
    _count = tree.count;
    _root = tree.root();

    emit LeafInserted(_root, _count, leaf);
  }

  // ============ Upgrade Gap ============
  uint256[48] private __GAP; // gap for upgrade safety
}
