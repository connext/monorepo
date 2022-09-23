// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/crosschain/errors.sol";
import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";
import {OptimismHubConnector} from "../../../../contracts/messaging/connectors/optimism/OptimismHubConnector.sol";
import {IStateCommitmentChain, L2MessageInclusionProof, ChainBatchHeader, ChainInclusionProof} from "../../../../contracts/messaging/interfaces/ambs/optimism/IStateCommitmentChain.sol";
import {OptimismAmb} from "../../../../contracts/messaging/interfaces/ambs/optimism/OptimismAMB.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract OptimismHubConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============

  // ============ Test set up ============
  function setUp() public {
    _l2Connector = address(123321123);

    // deploy
    _l1Connector = address(
      new OptimismHubConnector(
        _l1Domain,
        _l2Domain,
        _amb,
        _rootManager,
        _l2Connector,
        _mirrorGas,
        _stateCommitmentChain
      )
    );
  }

  // ============ Utils ============
  function utils_setHubConnectorVerifyMocks(address _sender) public {
    // call to l2 bridge to get address
    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.xDomainMessageSender.selector), abi.encode(_sender));
  }

  function utils_setHubConnectorProcessMocks(address _sender) public {
    utils_setHubConnectorVerifyMocks(_sender);

    // call to root manager
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.setOutboundRoot.selector), abi.encode(true));
  }

  // ============ OptimismHubConnector.verifySender ============
  function test_OptimismHubConnector__verifySender_shouldWorkIfSenderExpected() public {
    address expected = address(234);
    utils_setHubConnectorVerifyMocks(expected);

    vm.prank(_amb);
    assertTrue(OptimismHubConnector(_l1Connector).verifySender(expected));
  }

  function test_OptimismHubConnector__verifySender_shouldWorkIfSenderNotExpected() public {
    address expected = address(234);
    address notExpected = address(123);
    utils_setHubConnectorVerifyMocks(notExpected);

    vm.prank(_amb);
    assertEq(OptimismHubConnector(_l1Connector).verifySender(expected), false);
  }

  function test_OptimismHubConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);

    vm.expectRevert(bytes("!bridge"));
    assertEq(OptimismHubConnector(_l1Connector).verifySender(expected), false);
  }

  // ============ OptimismHubConnector.sendMessage ============
  function test_OptimismHubConnector__sendMessage_works() public {
    bytes memory _data = abi.encode(bytes32(bytes("test")));

    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.sendMessage.selector), abi.encode());

    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _rootManager);

    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        OptimismAmb.sendMessage.selector,
        _l2Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        _mirrorGas
      )
    );

    vm.prank(_rootManager);
    OptimismHubConnector(_l1Connector).sendMessage(_data);
  }

  // ============ OptimismHubConnector.processMessage ============
  function test_OptimismHubConnector__processMessage_works() public {
    utils_setHubConnectorProcessMocks(_l2Connector);
    bytes memory _data = abi.encode(bytes32(bytes("test")));

    vm.prank(_amb);
    OptimismHubConnector(_l1Connector).processMessage(_data);
  }

  function test_OptimismHubConnector__processMessage_failsIfNot32Bytes() public {
    utils_setHubConnectorVerifyMocks(_l2Connector);

    bytes memory _data = abi.encode(bytes32("test"), 123123123);

    vm.expectRevert(bytes("!length"));

    vm.prank(_amb);
    OptimismHubConnector(_l1Connector).processMessage(_data);
  }

  // ============ OptimismHubConnector.processMessageFromRoot ============
  function test_OptimismHubConnector_processMessageFromRoot_works() public {
    address _target = _l1Connector;
    address _sender = _l2Connector;
    bytes memory _message = abi.encodePacked(bytes32(bytes("message")));
    uint256 _messageNonce = 1;
    bytes32[] memory mockSiblings = new bytes32[](2);
    mockSiblings[0] = bytes32(bytes("mockSibling1"));
    mockSiblings[1] = bytes32(bytes("mockSibling2"));

    L2MessageInclusionProof memory _proof = L2MessageInclusionProof({
      stateRoot: bytes32(bytes("mockStateRoot")),
      stateRootBatchHeader: ChainBatchHeader({
        batchIndex: 0,
        batchRoot: bytes32(bytes("batchRoot")),
        batchSize: 1,
        prevTotalElements: 1,
        extraData: bytes("extraData")
      }),
      stateRootProof: ChainInclusionProof({index: 0, siblings: mockSiblings}),
      stateTrieWitness: bytes("mockStateTrieWitness1"),
      storageTrieWitness: bytes("mockStorageTrieWitness")
    });

    bytes memory xDomainData = abi.encodeWithSignature(
      "relayMessage(address,address,bytes,uint256)",
      _target,
      _sender,
      _message,
      _messageNonce
    );

    // vm.mockCall(
    //   _stateCommitmentChain,
    //   abi.encodeWithSelector(IStateCommitmentChain.verifyStateCommitment.selector),
    //   abi.encode(true)
    // );

    vm.mockCall(
      _l1Connector,
      abi.encodeWithSelector(OptimismHubConnector.verifyXDomainMessage.selector),
      abi.encode(true)
    );

    bytes memory _calldata = abi.encodeWithSignature("call(bytes)", _message);

    vm.expectCall(_l1Connector, _calldata);

    OptimismHubConnector(_l1Connector).processMessageFromRoot(_target, _sender, _message, _messageNonce, _proof);
  }

  function test_OptimismHubConnector_processMessageFromRoot_failsIfNotMirrorConnector() public {
    utils_setHubConnectorVerifyMocks(_l2Connector);

    vm.expectRevert(bytes("!mirrorConnector"));

    vm.prank(_amb);

    // Invalid Arguments
    address _target = address(2121);
    address _sender;
    bytes memory _message;
    uint256 _messageNonce;
    L2MessageInclusionProof memory _proof;
    OptimismHubConnector(_l1Connector).processMessageFromRoot(_target, _sender, _message, _messageNonce, _proof);
  }

  function test_OptimismHubConnector_processMessageFromRoot_failsIfNotTarget() public {
    utils_setHubConnectorVerifyMocks(_l2Connector);

    vm.expectRevert(bytes("!this"));

    vm.prank(_amb);
    address _target;
    address _sender = _l2Connector;
    bytes memory _message;
    uint256 _messageNonce;
    L2MessageInclusionProof memory _proof;
    OptimismHubConnector(_l1Connector).processMessageFromRoot(_target, _sender, _message, _messageNonce, _proof);
  }

  function test_OptimismHubConnector_processMessageFromRoot_failsverifyXDomainMessage() public {
    utils_setHubConnectorVerifyMocks(_l2Connector);

    vm.expectRevert();

    vm.prank(_amb);

    address _target = _l1Connector;
    address _sender = _l2Connector;
    bytes memory _message;
    uint256 _messageNonce;
    L2MessageInclusionProof memory _proof;

    OptimismHubConnector(_l1Connector).processMessageFromRoot(_target, _sender, _message, _messageNonce, _proof);
  }
}
