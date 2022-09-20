// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

// import {RootManager} from "../../contracts/messaging/RootManager.sol";
import {SpokeConnector} from "../../../contracts/messaging/connectors/SpokeConnector.sol";
import {MerkleTreeManager} from "../../../contracts/messaging/Merkle.sol";
import {MerkleLib} from "../../../contracts/messaging/libraries/Merkle.sol";
import {Message} from "../../../contracts/messaging/libraries/Message.sol";

import {ForgeHelper} from "../../utils/ForgeHelper.sol";

import "forge-std/console.sol";

contract SpokeConnectorTest is ForgeHelper {
  using MerkleLib for MerkleLib.Tree;

  MerkleLib.Tree public tree;

  bytes public constant PROOF =
    hex"8cf5d7edba05af1e35911c8bc141cde83cf59b4d6ee7e13b890017549aced056f2852634adfe6d12a123f968db220ee077495c24f189375a8692b6e805543d4200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5b4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d3021ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba85e58769b32a1beaf1ea27375a44095a0d1fb664ce2dd358e7fcbfb78c26a193440eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a1968ffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f839867cc5f7f196b93bae1e27e6320742445d290f2263827498b54fec539f756afcefad4e508c098b9a7e1d8feb19955fb02ba9675585078710969d3440f5054e0f9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5f8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf8923490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99cc1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8beccda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d22733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981fe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0b46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0c65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2f4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd95a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e3774df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652cdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618db8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea32293237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d7358448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9";

  function test_tree() public {
    // Example insert.
    bytes32 _messageHash;
    {
      bytes32 sender = bytes32(uint256(uint160(vm.addr(1234))));
      bytes32 receiver = bytes32(uint256(uint160(address(5678))));
      uint32 nonce = 0;
      // format the message into packed bytes
      bytes memory _message = Message.formatMessage(
        1111, // origin domain
        sender,
        1, // nonce
        2222, // destination domain
        receiver,
        bytes("secret message!")
      );

      _messageHash = keccak256(_message);
      console.log("leaf");
      console.logBytes32(_messageHash);

      tree.insert(_messageHash);
    }

    bytes32 expectedRoot = tree.root();
    console.log("expected root");
    console.logBytes32(expectedRoot);
    // uint256 expectedIndex = tree.count - 1;
    // bytes32[32] memory branch = tree.branch;

    (bytes32 root, bytes32 leaf, uint256 index, bytes32[32] memory proof) = abi.decode(
      PROOF,
      (bytes32, bytes32, uint256, bytes32[32])
    );

    console.log("proof root");
    console.logBytes32(root);
    console.log("proof leaf");
    console.logBytes32(leaf);

    // Calculate the expected root based on the proof.
    bytes32 _calculatedRoot = MerkleLib.branchRoot(_messageHash, proof, index);
    console.log("calculated root");
    console.logBytes32(_calculatedRoot);

    // prove(bytes("secret message!"), branch, index);
  }
}
