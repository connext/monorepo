// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/crosschain/errors.sol";
import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";
import {OptimismHubConnector} from "../../../../contracts/messaging/connectors/optimism/OptimismHubConnector.sol";
import {OptimismAmb} from "../../../../contracts/messaging/interfaces/ambs/optimism/OptimismAmb.sol";
import {Types} from "../../../../contracts/messaging/connectors/optimism/lib/Types.sol";
import {PredeployAddresses} from "../../../../contracts/messaging/connectors/optimism/lib/PredeployAddresses.sol";
import {IOptimismPortal} from "../../../../contracts/messaging/interfaces/ambs/optimism/IOptimismPortal.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract OptimismHubConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============
  address _optimismPortal;
  address _l2OutputOracle;

  // ============ Test set up ============
  function setUp() public {
    // NOTE: sample value taken from:
    // https://blockscout.com/optimism/goerli/tx/0x440fda036d28eb547394a8689af90c5342a00a8ca2ab5117f2b85f54d1416ddd/logs
    _l2Connector = payable(address(0x15Fe056CbFd5ac3625d3987f3Db96Dc9fd09770A));

    _optimismPortal = address(new MockOptimismPortal());
    _l2OutputOracle = address(0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0);

    // deploy
    _l1Connector = payable(
      address(
        new OptimismHubConnector(
          _l1Domain,
          _l2Domain,
          _amb,
          _rootManager,
          _l2Connector,
          _optimismPortal,
          _l2OutputOracle,
          _gasCap
        )
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
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector), abi.encode(true));
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
    // encoded data
    bytes memory _encodedData = abi.encode(_gasCap);

    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.sendMessage.selector), abi.encode());

    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _encodedData, _rootManager);

    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        OptimismAmb.sendMessage.selector,
        _l2Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        _gasCap
      )
    );

    vm.prank(_rootManager);
    OptimismHubConnector(_l1Connector).sendMessage(_data, _encodedData);
  }

  function test_OptimismHubConnector__sendMessage_works_fuzz(bytes32 data) public {
    bytes memory _data = abi.encode(data);

    // encoded data
    bytes memory _encodedData = abi.encode(_gasCap);

    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.sendMessage.selector), abi.encode());

    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _encodedData, _rootManager);

    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        OptimismAmb.sendMessage.selector,
        _l2Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        _gasCap
      )
    );

    vm.prank(_rootManager);
    OptimismHubConnector(_l1Connector).sendMessage(_data, _encodedData);
  }

  // // ============ OptimismHubConnector.processMessage ============
  function test_OptimismHubConnector__processMessage_shouldWork() public {
    utils_setHubConnectorProcessMocks(_l2Connector);
    bytes32 data = bytes32(bytes("test"));
    bytes memory _data = abi.encode(data);

    vm.prank(_amb);

    vm.expectEmit(true, true, true, true);
    emit MessageProcessed(_data, _amb);

    OptimismHubConnector(_l1Connector).processMessage(_data);
  }

  // // ============ OptimismHubConnector.processMessageFromRoot ============
  function test_OptimismHubConnector__processMessageFromRoot_failsIfNotL2_CROSS_DOMAIN_MESSENGER() public {
    bytes memory _message = abi.encodeWithSelector(Connector.processMessage.selector, bytes32(bytes("test")));
    Types.WithdrawalTransaction memory _tx = Types.WithdrawalTransaction({
      nonce: 1,
      sender: address(0),
      target: address(_l1Connector),
      value: 0,
      gasLimit: 21000,
      data: _message
    });

    vm.expectRevert(bytes("!l2sender"));
    OptimismHubConnector(_l1Connector).processMessageFromRoot(_tx);
  }

  function test_OptimismHubConnector__processMessageFromRoot_failsIfNotTarget() public {
    bytes memory _message = abi.encodeWithSelector(Connector.processMessage.selector, bytes32(bytes("test")));
    Types.WithdrawalTransaction memory _tx = Types.WithdrawalTransaction({
      nonce: 1,
      sender: PredeployAddresses.L2_CROSS_DOMAIN_MESSENGER,
      target: address(0),
      value: 0,
      gasLimit: 21000,
      data: _message
    });

    vm.expectRevert(bytes("!this"));
    OptimismHubConnector(_l1Connector).processMessageFromRoot(_tx);
  }

  function test_OptimismHubConnector_processMessageFromRoot_works() public {
    // NOTE: _target is taken from the sample message
    address payable _target = payable(address(0));
    // set the target to have the code at the contract we want to test so the proof works
    vm.etch(_target, _l1Connector.code);
    address _sender = _l2Connector;
    // set the mirror connector on the appropriate target storage slot
    vm.store(_target, bytes32(uint256(3)), bytes32(abi.encode(_sender)));
    // set the commitment chain to the appropriate target storage slot
    vm.store(_target, bytes32(uint256(5)), bytes32(abi.encode(_stateCommitmentChain)));
    // NOTE: sample values taken from:
    // https://blockscout.com/optimism/goerli/tx/0x440fda036d28eb547394a8689af90c5342a00a8ca2ab5117f2b85f54d1416ddd/logs
    bytes32 _root = bytes32(0x27ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d757);
    bytes memory _message = bytes(
      hex"4ff746f60000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002027ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d757"
    );
    uint256 _messageNonce = 104500;

    // // Ensure the _verifyStateRootProof call succeeds
    // vm.mockCall(
    //   _stateCommitmentChain,
    //   abi.encodeWithSelector(IStateCommitmentChain.verifyStateCommitment.selector),
    //   abi.encode(true)
    // );

    // Ensure the call to root manager succeeds
    // vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector), abi.encode(true));

    // // Check the call succeeds
    // vm.expectCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _root));

    // Will be called in _verifyXDomainMessage
    // vm.mockCall(_optimismPortal, abi.encodeWithSelector(IOptimismPortal.aggregate.selector), abi.encode(true));

    Types.WithdrawalTransaction memory _tx = Types.WithdrawalTransaction({
      nonce: _messageNonce,
      sender: _sender,
      target: _target,
      value: 0,
      gasLimit: 100000000000,
      data: _message
    });

    OptimismHubConnector(_target).processMessageFromRoot(_tx);
    assertTrue(OptimismHubConnector(_target).processed(_root));
  }

  // function test_OptimismHubConnector_processMessageFromRoot_failsIfStateRootUnverified() public {
  //   utils_setHubConnectorVerifyMocks(_l2Connector);

  //   address _target = _l1Connector;
  //   address _sender = _l2Connector;
  //   bytes memory _message;
  //   uint256 _messageNonce;
  //   L2MessageInclusionProof memory _proof;

  //   // Ensure the _verifyStateRootProof call fails
  //   vm.mockCall(
  //     _stateCommitmentChain,
  //     abi.encodeWithSelector(IStateCommitmentChain.verifyStateCommitment.selector),
  //     abi.encode(false)
  //   );

  //   vm.expectRevert("!proof");
  //   OptimismHubConnector(_l1Connector).processMessageFromRoot(_target, _sender, _message, _messageNonce, _proof);
  // }
}
