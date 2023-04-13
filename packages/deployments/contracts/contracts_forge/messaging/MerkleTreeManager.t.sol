// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {MerkleTreeManager} from "../../contracts/messaging/MerkleTreeManager.sol";
import {MerkleLib} from "../../contracts/messaging/libraries/MerkleLib.sol";

import "../utils/ForgeHelper.sol";

contract MerkleTreeManagerTest is ForgeHelper {
  MerkleTreeManager public merkle;

  event ArboristUpdated(address previous, address updated);

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
    bytes32 leaf;
    uint256 count;
    for (uint256 i; i < 10; i++) {
      leaf = keccak256(abi.encode(i));
      (, count) = merkle.insert(leaf);
      assertEq(count - 1, i);
    }
  }

  function test_Merkle__root_shouldWork() public {
    // NOTE: This is the expected root value of a tree with 1000 hashes inserted using the method below.
    // It was calculated outside of the code being tested here in order to ensure consistent behavior.
    bytes32 expectedRoot = hex"af0dbbe35d1ea81c18d219dbb33860712911171ee4abfc4a13f213009e22580c";

    bytes32 leaf;
    for (uint256 i; i < 1000; i++) {
      leaf = keccak256(abi.encode(i));
      merkle.insert(leaf);
    }
    bytes32 root = merkle.root();
    assertEq(root, expectedRoot);
  }

  function test_Merkle__root_emptyRootValid() public {
    assertEq(merkle.root(), MerkleLib.Z_32);
  }

  function test_Merkle__branchRoot_shouldWork() public {
    // NOTE: Following sample branch was generated outside the code being tested here in order
    // to enforce consistent/expected behavior:
    // The following leaf, index, and branch (proof) should result in this expected root.
    bytes32 expectedRoot = hex"313d09fa506d908e499f982b2f36d31dfe8f55cf5b604e96ee0b7823becfac6e";
    bytes32 leaf = hex"c98148260b72a096264f7fe953ec94ca9f1139407ba1d7f850d3c82fd01b10ab";
    uint256 index = 573;
    bytes32[32] memory branch = [
      bytes32(hex"23c18f8d2de39087df146ebf4e875ce363a212557683bbfe6906c4decc50d089"),
      bytes32(hex"5b9362c5490d97cac09343b5990736eb69e5c5ae86e9c2138e202af58fa33bea"),
      bytes32(hex"108ac4cbea0e196607583fe4919f575cb508f9efd919b0b8dfa4156cfcc05e60"),
      bytes32(hex"f1a0a937ed31215d0d55b1b50b4087a234098b540cae718de489e378d23d6fcf"),
      bytes32(hex"c2340c0195f630111ba6e6b337641d4c104d53c46200c25fc61eacfb9c032ec2"),
      bytes32(hex"66563cb38f7b43050976dd586df5a306bd20daf73c0c148521a7e439be7bf2ff"),
      bytes32(hex"1605f3992bd41d1123207fa1000bb9a4f722c15f5c224b9ed5cb085411ee5b36"),
      bytes32(hex"ea8d0c60c7cfc387cf3510908485e958f486fac243e304083decad06302226d6"),
      bytes32(hex"3da96acb985916b44fe588e1f1e9df816258ef3559d1fbad33e69059fd65aedc"),
      bytes32(hex"242e829dbfc623373cbbb193e665038a2b3f9bc298452d8d107df3d252115b1a"),
      bytes32(hex"f9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5"),
      bytes32(hex"f8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf892"),
      bytes32(hex"3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c"),
      bytes32(hex"c1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb"),
      bytes32(hex"5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8becc"),
      bytes32(hex"da7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2"),
      bytes32(hex"2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f"),
      bytes32(hex"e1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a"),
      bytes32(hex"5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0"),
      bytes32(hex"b46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0"),
      bytes32(hex"c65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2"),
      bytes32(hex"f4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd9"),
      bytes32(hex"5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e377"),
      bytes32(hex"4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652"),
      bytes32(hex"cdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef"),
      bytes32(hex"0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d"),
      bytes32(hex"b8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0"),
      bytes32(hex"838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e"),
      bytes32(hex"662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e"),
      bytes32(hex"388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322"),
      bytes32(hex"93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735"),
      bytes32(hex"8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9")
    ];

    bytes32 root = MerkleLib.branchRoot(leaf, branch, index);
    assertEq(root, expectedRoot);
  }

  // ========= setArborist =========

  function test_Merkle__setArborist_shouldWork() public {
    vm.expectEmit(true, true, true, true);
    emit ArboristUpdated(address(this), address(1));

    merkle.setArborist(address(1));
  }

  // ========= incrementNonce =========

  function test_Merkle__incrementNonce_works() public {
    uint32 domain = uint32(1);
    uint32 returned = merkle.incrementNonce(domain);
    assertEq(returned, 0);
    assertEq(merkle.nonces(domain), returned + 1);
  }

  // ========= markAsProven =========

  function test_Merkle__markAsProven_failsIfNotArborist() public {
    vm.expectRevert("!arborist");
    vm.prank(address(1231));
    merkle.markAsProven(bytes32(bytes("123123")));
  }

  function test_Merkle__markAsProven_failsIfBadStatus() public {
    bytes32 leaf = bytes32(bytes("123123"));
    merkle.markAsProven(leaf);
    vm.expectRevert("!empty");
    merkle.markAsProven(leaf);
  }

  function test_Merkle__markAsProven_works() public {
    bytes32 leaf = bytes32(bytes("123123"));
    merkle.markAsProven(leaf);
    assertTrue(merkle.leaves(leaf) == MerkleTreeManager.LeafStatus.Proven);
  }

  // ========= markAsProcessed =========

  function test_Merkle__markAsProcessed_failsIfBadStatus() public {
    bytes32 leaf = bytes32(bytes("123123"));
    vm.expectRevert("!proven");
    merkle.markAsProcessed(leaf);
  }

  function test_Merkle__markAsProcessed_works() public {
    bytes32 leaf = bytes32(bytes("123123"));
    merkle.markAsProven(leaf);
    merkle.markAsProcessed(leaf);
    assertTrue(merkle.leaves(leaf) == MerkleTreeManager.LeafStatus.Processed);
  }
}
