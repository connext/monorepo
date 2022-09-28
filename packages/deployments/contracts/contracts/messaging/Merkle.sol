// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import {MerkleLib} from "./libraries/Merkle.sol";

/**
 * @title MerkleTreeManager
 * @notice Contains a Merkle tree instance and exposes read/write functions for the tree.
 */
contract MerkleTreeManager is Initializable {
  // ========== Custom Errors ===========

  error MerkleTreeManager__setArborist_zeroAddress();

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

  // ============ Upgrade Gap ============

  uint256[49] private __GAP; // gap for upgrade safety

  // ============ Modifiers ============

  modifier onlyArborist() {
    require(arborist == msg.sender, "!owner");
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
    MerkleLib.Tree memory _tree = tree;
    return _tree.root();
  }

  /**
   * @notice Returns the number of inserted leaves in the tree (current index).
   */
  function count() public view returns (uint256) {
    return tree.count;
  }

  // ======== Initializer =========
  function initialize() public initializer {
    __MerkleTreeManager_init();
  }

  /**
   * @dev Initializes MerkleTreeManager instance. Sets the msg.sender as the initial permissioned
   */
  function __MerkleTreeManager_init() internal onlyInitializing {
    __MerkleTreeManager_init_unchained();
  }

  function __MerkleTreeManager_init_unchained() internal onlyInitializing {
    arborist = msg.sender;
  }

  // ============ Admin Functions ==============

  /**
   * @notice Method for the current arborist to assign write permissions to a new arborist.
   * @param newArborist The new address to set as the current arborist.
   */
  function setArborist(address newArborist) public onlyArborist {
    if (newArborist == address(0)) revert MerkleTreeManager__setArborist_zeroAddress();
    arborist = newArborist;
  }

  // ========= Public Functions =========

  /**
   * @notice Inserts the given leaf into the tree.
   * @param leaf The leaf to be inserted into the tree.
   * @return _root Current root for convenience.
   * @return _count Current node count (i.e. number of indices) AFTER the insertion of the new leaf,
   * provided for convenience.
   */
  function insert(bytes32 leaf) public onlyArborist returns (bytes32 _root, uint256 _count) {
    // NOTE: Considerably more efficient to put this tree into memory, conduct operations,
    // then re-assign it to storage.
    MerkleLib.Tree memory _tree = tree;

    // Insert the new node.
    _tree = _tree.insert(leaf);

    // Get return details for convenience.
    _root = _tree.root();
    _count = _tree.count;

    // Write the newly updated tree to storage.
    tree = _tree;
  }
}
