// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/crosschain/errors.sol";
import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";
import {OptimismHubConnector} from "../../../../contracts/messaging/connectors/optimism/OptimismHubConnector.sol";
import {OptimismAmb} from "../../../../contracts/messaging/interfaces/ambs/optimism/OptimismAmb.sol";
import {Types} from "../../../../contracts/messaging/connectors/optimism/lib/Types.sol";
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

  // ============ OptimismHubConnector.processMessage ============
  function test_OptimismHubConnector__processMessage_shouldWork() public {
    utils_setHubConnectorProcessMocks(_l2Connector);
    bytes32 data = bytes32(bytes("test"));
    bytes memory _data = abi.encode(data);

    vm.prank(_amb);

    vm.expectRevert(Connector.Connector__processMessage_notUsed.selector);

    OptimismHubConnector(_l1Connector).processMessage(_data);
  }

  // ============ OptimismHubConnector.processMessageFromRoot ============
  function test_OptimismHubConnector_processMessageFromRoot_works() public {
    address payable _target = payable(address(_l1Connector));
    address _sender = _l2Connector;
    uint256 _value = 0;
    uint256 _gasLimit = 0;
    uint256 _nonce = 104500;
    bytes32 _root = bytes32(0x27ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d757);
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _root);
    bytes memory _encodedData = Encoding.encodeCrossDomainMessageV1(
      _nonce,
      _sender,
      _target,
      _value,
      _gasLimit,
      _calldata
    );

    bytes32 _mockOutputRoot = bytes32(bytes("root"));
    uint128 _mockTimestamp = 1000;
    uint128 _mockOutputIndex = 0;

    // Ensure the provenWithdrawals call succeeds
    ProvenWithdrawal memory provenWithdrawal = ProvenWithdrawal({
      outputRoot: _mockOutputRoot,
      timestamp: _mockTimestamp,
      l2OutputIndex: _mockOutputIndex
    });
    Types.OutputProposal memory proposal = Types.OutputProposal({
      outputRoot: _mockOutputRoot,
      timestamp: _mockTimestamp,
      l2BlockNumber: 1234
    });

    vm.mockCall(
      _optimismPortal,
      abi.encodeWithSelector(IOptimismPortal.provenWithdrawals.selector),
      abi.encode(provenWithdrawal)
    );

    // Ensure
    vm.mockCall(
      _l2OutputOracle,
      abi.encodeWithSelector(bytes4(keccak256(bytes("startingTimestamp()")))),
      abi.encode(_mockTimestamp - 1)
    );

    vm.mockCall(_l2OutputOracle, abi.encodeWithSelector(IL2OutputOracle.getL2Output.selector), abi.encode(proposal));

    // Ensure the call to root manager succeeds
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector), abi.encode(true));

    // Check the call succeeds
    vm.expectCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _root));

    Types.WithdrawalTransaction memory _tx = Types.WithdrawalTransaction({
      nonce: _nonce,
      sender: PredeployAddresses.L2_CROSS_DOMAIN_MESSENGER,
      target: _target,
      value: _value,
      gasLimit: 100000000000,
      data: _encodedData
    });

    OptimismHubConnector(_target).processMessageFromRoot(_tx);
    assertTrue(OptimismHubConnector(_target).processed(_root));
  }
}
