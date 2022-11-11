// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {MerkleTreeManager} from "../../contracts/messaging/MerkleTreeManager.sol";
import {MerkleLib} from "../../contracts/messaging/libraries/MerkleLib.sol";

import "../utils/ForgeHelper.sol";

contract MerkleTreeManagerTest is ForgeHelper {
  MerkleTreeManager public merkle;

  function setUp() public {
    merkle = new MerkleTreeManager();
    merkle.initialize(address(this));
  }

  function test_Merkle__insert_shouldUpdateCount() public {
    bytes32 _messageHash;
    uint256 _count;
    for (uint256 i = 0; i < 10; i++) {
      _messageHash = keccak256(abi.encode(i));
      (, _count) = merkle.insert(_messageHash);
      assertEq(_count - 1, i);
    }
  }
}
