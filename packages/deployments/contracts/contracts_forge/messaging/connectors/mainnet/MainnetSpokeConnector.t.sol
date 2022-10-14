// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";
import {MainnetSpokeConnector} from "../../../../contracts/messaging/connectors/mainnet/MainnetSpokeConnector.sol";
import {SpokeConnector} from "../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/Merkle.sol";

import "../../../utils/ConnectorHelper.sol";

contract MainnetSpokeConnectorTest is ConnectorHelper {
  // ============ Events ============

  // ============ Storage ============
  bytes32 outboundRoot = bytes32("test");

  // ============ Test set up ============
  function setUp() public {
    _merkle = address(new MerkleTreeManager());

    _l2Connector = address(123321123);

    // deploy
    _l1Connector = address(
      new MainnetSpokeConnector(
        _l1Domain,
        _l2Domain,
        _amb,
        _rootManager,
        _l2Connector,
        _mirrorGas,
        _processGas,
        _reserveGas,
        0, // delay blocks
        _merkle,
        address(0) // watcher manager
      )
    );
  }

  // ============ Utils ============

  // ============ MainnetSpokeConnector.verifySender ============
  function test_MainnetSpokeConnector__verifySender_shouldWorkIfTrue() public {
    address expected = address(this);

    assertTrue(MainnetSpokeConnector(_l1Connector).verifySender(expected));
  }

  function test_MainnetSpokeConnector__verifySender_shouldWorkIfFalse() public {
    address expected = address(234);

    assertEq(MainnetSpokeConnector(_l1Connector).verifySender(expected), false);
  }

  // ============ MainnetSpokeConnector.sendMessage ============
  function test_MainnetSpokeConnector__sendMessage_fromRootManagerWorks() public {
    bytes memory _data = abi.encode(MainnetSpokeConnector(_l1Connector).outboundRoot());

    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    vm.prank(_rootManager);
    MainnetSpokeConnector(_l1Connector).sendMessage(_data);
  }

  function test_MainnetSpokeConnector__sendMessage_failsIfCallerNotRootManager() public {
    bytes memory _data = abi.encode(MainnetSpokeConnector(_l1Connector).outboundRoot());

    vm.expectRevert(bytes("!rootManager"));

    // called as NOT root manager
    MainnetSpokeConnector(_l1Connector).sendMessage(_data);
  }

  function test_MainnetSpokeConnector__sendMessage_failsIfNot32Bytes() public {
    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    // should revert because not 32 bytes
    vm.expectRevert(bytes("!length"));

    vm.prank(_rootManager);
    MainnetSpokeConnector(_l1Connector).sendMessage(_data);
  }

  function test_MainnetSpokeConnector_proveAndProcessWorks() public {
    vm.roll(10000);
    vm.prank(_rootManager);

    bytes memory testAggregateRootInBytes = abi.encode(
      0x9a79d01ebde5e1fc249412d04f2f108659475575113abae64d28cb83f9e8f942
    );
    bytes32 testAggregateRoot = 0x9a79d01ebde5e1fc249412d04f2f108659475575113abae64d28cb83f9e8f942;
    MainnetSpokeConnector(_l1Connector).sendMessage(testAggregateRootInBytes);
    bytes
      memory testMessage = hex"676f707400000000000000000000000085b1fff42d5ef320321535fcbef80ca14079f05c00000001676f657200000000000000000000000088277e28730f4645f72d397f4ace4862dc30347c676f65720000000000000000000000007ea6ea49b0b0ae9c5db7907d139d9cd3439862a1030000000000000000000000000000000000000000000000000214e8348c4f0000e0e4982f736f87fb28f22cfbc74d303209ed3ea52c2f75ebaa7da07db29d68dc";
    console.logBytes(testMessage);
    bytes32[32] memory testPath = [
      bytes32(0x0d06cd00ee50fc7bc43edc9965f01a97573268f44d9ddd799e2d480ec724e800),
      bytes32(0x1c95c4b8e57dc8c6e9b2795079bc68be94043ede9c1f3ca7da1003f20a9423c5),
      bytes32(0xb4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d30),
      bytes32(0x21ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba85),
      bytes32(0xe58769b32a1beaf1ea27375a44095a0d1fb664ce2dd358e7fcbfb78c26a19344),
      bytes32(0x0eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d),
      bytes32(0x887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a1968),
      bytes32(0xffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f83),
      bytes32(0x9867cc5f7f196b93bae1e27e6320742445d290f2263827498b54fec539f756af),
      bytes32(0xcefad4e508c098b9a7e1d8feb19955fb02ba9675585078710969d3440f5054e0),
      bytes32(0xf9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5),
      bytes32(0xf8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf892),
      bytes32(0x3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c),
      bytes32(0xc1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb),
      bytes32(0x5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8becc),
      bytes32(0xda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2),
      bytes32(0x2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f),
      bytes32(0xe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a),
      bytes32(0x5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0),
      bytes32(0xb46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0),
      bytes32(0xc65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2),
      bytes32(0xf4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd9),
      bytes32(0x5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e377),
      bytes32(0x4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652),
      bytes32(0xcdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef),
      bytes32(0x0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d),
      bytes32(0xb8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0),
      bytes32(0x838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e),
      bytes32(0x662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e),
      bytes32(0x388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322),
      bytes32(0x93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735),
      bytes32(0x8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9)
    ];
    uint256 testIndex = 1;

    bytes32[32] memory testAggregatePath = [
      bytes32(0x0000000000000000000000000000000000000000000000000000000000000000),
      bytes32(0xad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5),
      bytes32(0xb4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d30),
      bytes32(0x21ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba85),
      bytes32(0xe58769b32a1beaf1ea27375a44095a0d1fb664ce2dd358e7fcbfb78c26a19344),
      bytes32(0x0eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d),
      bytes32(0x887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a1968),
      bytes32(0xffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f83),
      bytes32(0x9867cc5f7f196b93bae1e27e6320742445d290f2263827498b54fec539f756af),
      bytes32(0xcefad4e508c098b9a7e1d8feb19955fb02ba9675585078710969d3440f5054e0),
      bytes32(0xf9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5),
      bytes32(0xf8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf892),
      bytes32(0x3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c),
      bytes32(0xc1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb),
      bytes32(0x5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8becc),
      bytes32(0xda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2),
      bytes32(0x2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f),
      bytes32(0xe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a),
      bytes32(0x5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0),
      bytes32(0xb46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0),
      bytes32(0xc65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2),
      bytes32(0xf4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd9),
      bytes32(0x5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e377),
      bytes32(0x4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652),
      bytes32(0xcdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef),
      bytes32(0x0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d),
      bytes32(0xb8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0),
      bytes32(0x838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e),
      bytes32(0x662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e),
      bytes32(0x388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322),
      bytes32(0x93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735),
      bytes32(0x8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9)
    ];
    SpokeConnector.Proof[] memory proofs = new SpokeConnector.Proof[](1);
    proofs[0] = SpokeConnector.Proof(testMessage, testPath, testIndex);
    MainnetSpokeConnector(_l1Connector).proveAndProcess(proofs, testAggregateRoot, testAggregatePath, testIndex);
  }
}
