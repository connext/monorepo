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
  MerkleLib.Tree public tree;

  // ============ Public Functions ============

  /**
   * @notice Returns the number of inserted leaves in the tree (current index)
   */
  function count() public view returns (uint256) {
    return tree.count;
  }
}
