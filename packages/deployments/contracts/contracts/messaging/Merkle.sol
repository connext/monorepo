// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

// ============ Internal Imports ============
import {MerkleLib} from "./libraries/Merkle.sol";

/**
 * @title MerkleTreeManager
 * @author Illusory Systems Inc.
 * @notice Contains a Merkle tree instance and
 * exposes view functions for the tree.
 */
contract MerkleTreeManager {
  // ============ Libraries ============

  using MerkleLib for MerkleLib.Tree;

  // ============ Public Storage ============

  /**
   * @notice Core data structure with which this contract is tasked with keeping custody.
   * Writable only by the designated connector.
   */
  MerkleLib.Tree public tree;

  /**
   * @notice The connector contract that has permission to write to this tree.
   */
  address public connector;

  // ============ Modifiers ============

  modifier onlyConnector() {
    require(connector == msg.sender, "!connector");
    _;
  }

  // ============ Getters ============

  /**
   * @notice Returns the current root.
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

  // ============ Constructor ============

  /**
   * @notice Creates a new MerkleTreeManager instance. Sets the msg.sender as the initial permissioned
   * connector contract.
   */
  constructor() {
    connector = msg.sender;
  }

  // ============ Admin Functions ==============

  /**
   * @notice Method for the current connector to assign write permissions to a new connector.
   * @param newConnector The new address to set as the current connector.
   */
  function setConnector(address newConnector) public onlyConnector {
    connector = newConnector;
  }

  // ========= Public Functions =========

  /**
   * @notice Inserts the given leaf into the tree.
   * @param leaf The leaf to be inserted into the tree.
   * @return _root Current root for convenience.
   * @return _count Current node count (i.e. number of indices) AFTER the insertion of the new leaf,
   * provided for convenience.
   */
  function insert(bytes32 leaf) public onlyConnector returns (bytes32 _root, uint256 _count) {
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
