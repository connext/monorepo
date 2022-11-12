// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {MerkleTreeManager} from "../../contracts/messaging/Merkle.sol";
import {MerkleLib} from "../../contracts/messaging/libraries/Merkle.sol";

import "../utils/ForgeHelper.sol";

contract MerkleTest is ForgeHelper {
  MerkleTreeManager public merkle;

  // ============ Test set up ============

  function setUp() public {
    merkle = new MerkleTreeManager();
    merkle.initialize(address(this));
  }

  // ============ Utils ============

  // Returns array of 32 zero hashes.
  function utils_zeroHashes() internal pure returns (bytes32[32] memory _zeroes) {
    _zeroes[0] = MerkleLib.Z_0;
    _zeroes[1] = MerkleLib.Z_1;
    _zeroes[2] = MerkleLib.Z_2;
    _zeroes[3] = MerkleLib.Z_3;
    _zeroes[4] = MerkleLib.Z_4;
    _zeroes[5] = MerkleLib.Z_5;
    _zeroes[6] = MerkleLib.Z_6;
    _zeroes[7] = MerkleLib.Z_7;
    _zeroes[8] = MerkleLib.Z_8;
    _zeroes[9] = MerkleLib.Z_9;
    _zeroes[10] = MerkleLib.Z_10;
    _zeroes[11] = MerkleLib.Z_11;
    _zeroes[12] = MerkleLib.Z_12;
    _zeroes[13] = MerkleLib.Z_13;
    _zeroes[14] = MerkleLib.Z_14;
    _zeroes[15] = MerkleLib.Z_15;
    _zeroes[16] = MerkleLib.Z_16;
    _zeroes[17] = MerkleLib.Z_17;
    _zeroes[18] = MerkleLib.Z_18;
    _zeroes[19] = MerkleLib.Z_19;
    _zeroes[20] = MerkleLib.Z_20;
    _zeroes[21] = MerkleLib.Z_21;
    _zeroes[22] = MerkleLib.Z_22;
    _zeroes[23] = MerkleLib.Z_23;
    _zeroes[24] = MerkleLib.Z_24;
    _zeroes[25] = MerkleLib.Z_25;
    _zeroes[26] = MerkleLib.Z_26;
    _zeroes[27] = MerkleLib.Z_27;
    _zeroes[28] = MerkleLib.Z_28;
    _zeroes[29] = MerkleLib.Z_29;
    _zeroes[30] = MerkleLib.Z_30;
    _zeroes[31] = MerkleLib.Z_31;
  }

  // ============ Testing scenarios ============

  function test_Merkle__zeroHashes_areCorrect() public {
    bytes32[32] memory zeroHashes = utils_zeroHashes();
    assertEq(zeroHashes[0], hex"0000000000000000000000000000000000000000000000000000000000000000");

    bytes32 current;
    for (uint256 i = 1; i < 32; i++) {
      current = keccak256(abi.encode(current, current));
      assertEq(current, zeroHashes[i]);
    }

    current = keccak256(abi.encode(current, current));
    assertEq(current, MerkleLib.Z_32);
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

  function test_Merkle__root_shouldWork() public {
    // NOTE: This is the expected root value of a tree with 1000 hashes inserted using the method below.
    // It was calculated outside of the code being tested here in order to ensure consistent behavior.
    bytes32 expectedRoot = hex"af0dbbe35d1ea81c18d219dbb33860712911171ee4abfc4a13f213009e22580c";

    bytes32 messageHash;
    for (uint256 i; i < 1000; i++) {
      messageHash = keccak256(abi.encode(i));
      merkle.insert(messageHash);
    }
    bytes32 root = merkle.root();
    assertEq(root, expectedRoot);
  }
}
