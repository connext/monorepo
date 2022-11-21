// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
 * @title MerkleLib
 * @author Illusory Systems Inc.
 * @notice An incremental merkle tree modeled on the eth2 deposit contract.
 **/
library MerkleLib {
  // ========== Custom Errors ===========

  error MerkleLib__insert_treeIsFull();

  // ============ Constants =============

  uint256 internal constant TREE_DEPTH = 32;
  uint256 internal constant MAX_LEAVES = 2**TREE_DEPTH - 1;

  /**
   * @dev Z_i represent the hash values at different heights for a binary tree with leaf values equal to `0`.
   * (e.g. Z_1 is the keccak256 hash of (0x0, 0x0), Z_2 is the keccak256 hash of (Z_1, Z_1), etc...)
   * Z_0 is the bottom of the 33-layer tree, Z_32 is the top (i.e. root).
   * Used to shortcut calculation in root calculation methods below.
   */
  bytes32 internal constant Z_0 = hex"0000000000000000000000000000000000000000000000000000000000000000";
  bytes32 internal constant Z_1 = hex"ad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5";
  bytes32 internal constant Z_2 = hex"b4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d30";
  bytes32 internal constant Z_3 = hex"21ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba85";
  bytes32 internal constant Z_4 = hex"e58769b32a1beaf1ea27375a44095a0d1fb664ce2dd358e7fcbfb78c26a19344";
  bytes32 internal constant Z_5 = hex"0eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d";
  bytes32 internal constant Z_6 = hex"887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a1968";
  bytes32 internal constant Z_7 = hex"ffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f83";
  bytes32 internal constant Z_8 = hex"9867cc5f7f196b93bae1e27e6320742445d290f2263827498b54fec539f756af";
  bytes32 internal constant Z_9 = hex"cefad4e508c098b9a7e1d8feb19955fb02ba9675585078710969d3440f5054e0";
  bytes32 internal constant Z_10 = hex"f9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5";
  bytes32 internal constant Z_11 = hex"f8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf892";
  bytes32 internal constant Z_12 = hex"3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c";
  bytes32 internal constant Z_13 = hex"c1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb";
  bytes32 internal constant Z_14 = hex"5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8becc";
  bytes32 internal constant Z_15 = hex"da7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2";
  bytes32 internal constant Z_16 = hex"2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f";
  bytes32 internal constant Z_17 = hex"e1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a";
  bytes32 internal constant Z_18 = hex"5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0";
  bytes32 internal constant Z_19 = hex"b46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0";
  bytes32 internal constant Z_20 = hex"c65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2";
  bytes32 internal constant Z_21 = hex"f4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd9";
  bytes32 internal constant Z_22 = hex"5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e377";
  bytes32 internal constant Z_23 = hex"4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652";
  bytes32 internal constant Z_24 = hex"cdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef";
  bytes32 internal constant Z_25 = hex"0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d";
  bytes32 internal constant Z_26 = hex"b8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0";
  bytes32 internal constant Z_27 = hex"838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e";
  bytes32 internal constant Z_28 = hex"662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e";
  bytes32 internal constant Z_29 = hex"388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322";
  bytes32 internal constant Z_30 = hex"93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735";
  bytes32 internal constant Z_31 = hex"8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9";
  bytes32 internal constant Z_32 = hex"27ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d757";

  // ============= Structs ==============

  /**
   * @notice Struct representing incremental merkle tree. Contains current
   * branch and the number of inserted leaves in the tree.
   **/
  struct Tree {
    bytes32[TREE_DEPTH] branch;
    uint256 count;
  }

  // ========= Write Methods =========

  /**
   * @notice Inserts a given node (leaf) into merkle tree. Operates on an in-memory tree and
   * returns an updated version of that tree.
   * @dev Reverts if the tree is already full.
   * @param node Element to insert into tree.
   * @return Tree Updated tree.
   **/
  function insert(Tree memory tree, bytes32 node) internal pure returns (Tree memory) {
    // Update tree.count to increase the current count by 1 since we'll be including a new node.
    uint256 size = ++tree.count;
    if (size > MAX_LEAVES) revert MerkleLib__insert_treeIsFull();

    // Loop starting at 0, ending when we've finished inserting the node (i.e. hashing it) into
    // the active branch. Each loop we cut size in half, hashing the inserted node up the active
    // branch along the way.
    for (uint256 i; i < TREE_DEPTH; ) {
      // Check if the current size is odd; if so, we set this index in the branch to be the node.
      if ((size & 1) == 1) {
        // If i > 0, then this node will be a hash of the original node with every layer up
        // until layer `i`.
        tree.branch[i] = node;
        return tree;
      }
      // If the size is not yet odd, we hash the current index in the tree branch with the node.
      node = keccak256(abi.encodePacked(tree.branch[i], node));
      size >>= 1; // Cut size in half (statement equivalent to: `size /= 2`).

      unchecked {
        ++i;
      }
    }
    // As the loop should always end prematurely with the `return` statement, this code should
    // be unreachable. We revert here just to be safe.
    revert MerkleLib__insert_treeIsFull();
  }

  // ========= Read Methods =========

  /**
   * @notice Calculates and returns tree's current root.
   * @return _current bytes32 root.
   **/
  function root(Tree storage tree) internal view returns (bytes32 _current) {
    uint256 _index = tree.count;

    if (_index == 0) {
      return Z_32;
    }

    uint256 i;
    assembly {
      let TREE_SLOT := tree.slot

      for {

      } true {

      } {
        for {

        } true {

        } {
          if and(_index, 1) {
            mstore(0, sload(TREE_SLOT))
            mstore(0x20, Z_0)
            _current := keccak256(0, 0x40)
            break
          }

          if and(_index, shl(1, 1)) {
            mstore(0, sload(add(TREE_SLOT, 1)))
            mstore(0x20, Z_1)
            _current := keccak256(0, 0x40)
            i := 1
            break
          }

          if and(_index, shl(2, 1)) {
            mstore(0, sload(add(TREE_SLOT, 2)))
            mstore(0x20, Z_2)
            _current := keccak256(0, 0x40)
            i := 2
            break
          }

          if and(_index, shl(3, 1)) {
            mstore(0, sload(add(TREE_SLOT, 3)))
            mstore(0x20, Z_3)
            _current := keccak256(0, 0x40)
            i := 3
            break
          }

          if and(_index, shl(4, 1)) {
            mstore(0, sload(add(TREE_SLOT, 4)))
            mstore(0x20, Z_4)
            _current := keccak256(0, 0x40)
            i := 4
            break
          }

          if and(_index, shl(5, 1)) {
            mstore(0, sload(add(TREE_SLOT, 5)))
            mstore(0x20, Z_5)
            _current := keccak256(0, 0x40)
            i := 5
            break
          }

          if and(_index, shl(6, 1)) {
            mstore(0, sload(add(TREE_SLOT, 6)))
            mstore(0x20, Z_6)
            _current := keccak256(0, 0x40)
            i := 6
            break
          }

          if and(_index, shl(7, 1)) {
            mstore(0, sload(add(TREE_SLOT, 7)))
            mstore(0x20, Z_7)
            _current := keccak256(0, 0x40)
            i := 7
            break
          }

          if and(_index, shl(8, 1)) {
            mstore(0, sload(add(TREE_SLOT, 8)))
            mstore(0x20, Z_8)
            _current := keccak256(0, 0x40)
            i := 8
            break
          }

          if and(_index, shl(9, 1)) {
            mstore(0, sload(add(TREE_SLOT, 9)))
            mstore(0x20, Z_9)
            _current := keccak256(0, 0x40)
            i := 9
            break
          }

          if and(_index, shl(10, 1)) {
            mstore(0, sload(add(TREE_SLOT, 10)))
            mstore(0x20, Z_10)
            _current := keccak256(0, 0x40)
            i := 10
            break
          }

          if and(_index, shl(11, 1)) {
            mstore(0, sload(add(TREE_SLOT, 11)))
            mstore(0x20, Z_11)
            _current := keccak256(0, 0x40)
            i := 11
            break
          }

          if and(_index, shl(12, 1)) {
            mstore(0, sload(add(TREE_SLOT, 12)))
            mstore(0x20, Z_12)
            _current := keccak256(0, 0x40)
            i := 12
            break
          }

          if and(_index, shl(13, 1)) {
            mstore(0, sload(add(TREE_SLOT, 13)))
            mstore(0x20, Z_13)
            _current := keccak256(0, 0x40)
            i := 13
            break
          }

          if and(_index, shl(14, 1)) {
            mstore(0, sload(add(TREE_SLOT, 14)))
            mstore(0x20, Z_14)
            _current := keccak256(0, 0x40)
            i := 14
            break
          }

          if and(_index, shl(15, 1)) {
            mstore(0, sload(add(TREE_SLOT, 15)))
            mstore(0x20, Z_15)
            _current := keccak256(0, 0x40)
            i := 15
            break
          }

          if and(_index, shl(16, 1)) {
            mstore(0, sload(add(TREE_SLOT, 16)))
            mstore(0x20, Z_16)
            _current := keccak256(0, 0x40)
            i := 16
            break
          }

          if and(_index, shl(17, 1)) {
            mstore(0, sload(add(TREE_SLOT, 17)))
            mstore(0x20, Z_17)
            _current := keccak256(0, 0x40)
            i := 17
            break
          }

          if and(_index, shl(18, 1)) {
            mstore(0, sload(add(TREE_SLOT, 18)))
            mstore(0x20, Z_18)
            _current := keccak256(0, 0x40)
            i := 18
            break
          }

          if and(_index, shl(19, 1)) {
            mstore(0, sload(add(TREE_SLOT, 19)))
            mstore(0x20, Z_19)
            _current := keccak256(0, 0x40)
            i := 19
            break
          }

          if and(_index, shl(20, 1)) {
            mstore(0, sload(add(TREE_SLOT, 20)))
            mstore(0x20, Z_20)
            _current := keccak256(0, 0x40)
            i := 20
            break
          }

          if and(_index, shl(21, 1)) {
            mstore(0, sload(add(TREE_SLOT, 21)))
            mstore(0x20, Z_21)
            _current := keccak256(0, 0x40)
            i := 21
            break
          }

          if and(_index, shl(22, 1)) {
            mstore(0, sload(add(TREE_SLOT, 22)))
            mstore(0x20, Z_22)
            _current := keccak256(0, 0x40)
            i := 22
            break
          }

          if and(_index, shl(23, 1)) {
            mstore(0, sload(add(TREE_SLOT, 23)))
            mstore(0x20, Z_23)
            _current := keccak256(0, 0x40)
            i := 23
            break
          }

          if and(_index, shl(24, 1)) {
            mstore(0, sload(add(TREE_SLOT, 24)))
            mstore(0x20, Z_24)
            _current := keccak256(0, 0x40)
            i := 24
            break
          }

          if and(_index, shl(25, 1)) {
            mstore(0, sload(add(TREE_SLOT, 25)))
            mstore(0x20, Z_25)
            _current := keccak256(0, 0x40)
            i := 25
            break
          }

          if and(_index, shl(26, 1)) {
            mstore(0, sload(add(TREE_SLOT, 26)))
            mstore(0x20, Z_26)
            _current := keccak256(0, 0x40)
            i := 26
            break
          }

          if and(_index, shl(27, 1)) {
            mstore(0, sload(add(TREE_SLOT, 27)))
            mstore(0x20, Z_27)
            _current := keccak256(0, 0x40)
            i := 27
            break
          }

          if and(_index, shl(28, 1)) {
            mstore(0, sload(add(TREE_SLOT, 28)))
            mstore(0x20, Z_28)
            _current := keccak256(0, 0x40)
            i := 28
            break
          }

          if and(_index, shl(29, 1)) {
            mstore(0, sload(add(TREE_SLOT, 29)))
            mstore(0x20, Z_29)
            _current := keccak256(0, 0x40)
            i := 29
            break
          }

          if and(_index, shl(30, 1)) {
            mstore(0, sload(add(TREE_SLOT, 30)))
            mstore(0x20, Z_30)
            _current := keccak256(0, 0x40)
            i := 30
            break
          }

          if and(_index, shl(31, 1)) {
            mstore(0, sload(add(TREE_SLOT, 31)))
            mstore(0x20, Z_31)
            _current := keccak256(0, 0x40)
            i := 31
            break
          }

          _current := Z_32
          i := 32
          break
        }

        if gt(i, 30) {
          break
        }

        {
          if lt(i, 1) {
            switch and(_index, shl(1, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_1)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 1)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 2) {
            switch and(_index, shl(2, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_2)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 2)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 3) {
            switch and(_index, shl(3, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_3)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 3)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 4) {
            switch and(_index, shl(4, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_4)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 4)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 5) {
            switch and(_index, shl(5, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_5)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 5)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 6) {
            switch and(_index, shl(6, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_6)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 6)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 7) {
            switch and(_index, shl(7, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_7)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 7)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 8) {
            switch and(_index, shl(8, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_8)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 8)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 9) {
            switch and(_index, shl(9, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_9)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 9)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 10) {
            switch and(_index, shl(10, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_10)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 10)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 11) {
            switch and(_index, shl(11, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_11)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 11)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 12) {
            switch and(_index, shl(12, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_12)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 12)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 13) {
            switch and(_index, shl(13, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_13)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 13)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 14) {
            switch and(_index, shl(14, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_14)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 14)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 15) {
            switch and(_index, shl(15, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_15)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 15)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 16) {
            switch and(_index, shl(16, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_16)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 16)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 17) {
            switch and(_index, shl(17, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_17)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 17)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 18) {
            switch and(_index, shl(18, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_18)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 18)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 19) {
            switch and(_index, shl(19, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_19)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 19)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 20) {
            switch and(_index, shl(20, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_20)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 20)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 21) {
            switch and(_index, shl(21, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_21)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 21)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 22) {
            switch and(_index, shl(22, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_22)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 22)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 23) {
            switch and(_index, shl(23, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_23)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 23)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 24) {
            switch and(_index, shl(24, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_24)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 24)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 25) {
            switch and(_index, shl(25, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_25)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 25)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 26) {
            switch and(_index, shl(26, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_26)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 26)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 27) {
            switch and(_index, shl(27, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_27)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 27)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 28) {
            switch and(_index, shl(28, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_28)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 28)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 29) {
            switch and(_index, shl(29, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_29)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 29)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 30) {
            switch and(_index, shl(30, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_30)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 30)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }

          if lt(i, 31) {
            switch and(_index, shl(31, 1))
            case 0 {
              mstore(0, _current)
              mstore(0x20, Z_31)
            }
            default {
              mstore(0, sload(add(TREE_SLOT, 31)))
              mstore(0x20, _current)
            }

            _current := keccak256(0, 0x40)
          }
        }

        break
      }
    }
  }

  /**
   * @notice Calculates and returns the merkle root for the given leaf `_item`,
   * a merkle branch, and the index of `_item` in the tree.
   * @param _item Merkle leaf
   * @param _branch Merkle proof
   * @param _index Index of `_item` in tree
   * @return _current Calculated merkle root
   **/
  function branchRoot(
    bytes32 _item,
    bytes32[TREE_DEPTH] memory _branch,
    uint256 _index
  ) internal pure returns (bytes32 _current) {
    assembly {
      _current := _item
      let BRANCH_DATA_OFFSET := _branch
      let f

      f := shl(5, and(_index, 1))
      mstore(f, _current)
      mstore(sub(0x20, f), mload(BRANCH_DATA_OFFSET))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(1, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 1))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(2, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 2))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(3, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 3))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(4, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 4))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(5, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 5))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(6, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 6))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(7, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 7))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(8, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 8))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(9, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 9))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(10, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 10))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(11, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 11))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(12, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 12))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(13, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 13))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(14, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 14))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(15, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 15))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(16, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 16))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(17, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 17))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(18, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 18))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(19, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 19))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(20, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 20))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(21, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 21))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(22, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 22))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(23, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 23))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(24, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 24))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(25, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 25))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(26, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 26))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(27, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 27))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(28, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 28))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(29, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 29))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(30, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 30))))
      _current := keccak256(0, 0x40)

      f := shl(5, iszero(and(_index, shl(31, 1))))
      mstore(sub(0x20, f), _current)
      mstore(f, mload(add(BRANCH_DATA_OFFSET, shl(5, 31))))
      _current := keccak256(0, 0x40)
    }
  }
}
