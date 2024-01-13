// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/crosschain/errors.sol";
import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";
import {MetisHubConnector} from "../../../../contracts/messaging/connectors/metis/MetisHubConnector.sol";
import {OptimismAmb} from "../../../../contracts/messaging/interfaces/ambs/optimism/OptimismAmb.sol";
import {IStateCommitmentChain, ChainBatchHeader, ChainInclusionProof, L2MessageInclusionProof} from "../../../../contracts/messaging/interfaces/ambs/metis/IStateCommitmentChain.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

// prebedrock hub connector: 0x4a0126Ee88018393b1AD2455060Bc350eAd9908A
contract MetisHubConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============
  address _stateCommitmentChain;

  // ============ Test set up ============
  function setUp() public {
    // NOTE: sample value taken from:
    // https://blockscout.com/optimism/goerli/tx/0x440fda036d28eb547394a8689af90c5342a00a8ca2ab5117f2b85f54d1416ddd/logs
    _l2Connector = payable(address(0x15Fe056CbFd5ac3625d3987f3Db96Dc9fd09770A));

    _stateCommitmentChain = address(0x1236123523526);

    // deploy
    _l1Connector = payable(
      address(
        new MetisHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector, _stateCommitmentChain, _gasCap)
      )
    );
  }

  // ============ Utils ============
  function utils_setHubConnectorVerifyMocks(address _sender) public {
    // call to l2 bridge to get address
    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.xDomainMessageSender.selector), abi.encode(_sender));
  }

  function utils_setHubConnectorProcessMocks(address _sender) public {
    // set verify call for state commitment
    vm.mockCall(
      _stateCommitmentChain,
      abi.encodeWithSelector(IStateCommitmentChain.verifyStateCommitment.selector),
      abi.encode(true)
    );
  }

  // ============ MetisHubConnector.verifySender ============
  function test_MetisHubConnector__verifySender_shouldWorkIfSenderExpected() public {
    address expected = address(234);
    utils_setHubConnectorVerifyMocks(expected);

    vm.prank(_amb);
    assertTrue(MetisHubConnector(_l1Connector).verifySender(expected));
  }

  function test_MetisHubConnector__verifySender_shouldWorkIfSenderNotExpected() public {
    address expected = address(234);
    address notExpected = address(123);
    utils_setHubConnectorVerifyMocks(notExpected);

    vm.prank(_amb);
    assertEq(MetisHubConnector(_l1Connector).verifySender(expected), false);
  }

  function test_MetisHubConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);

    vm.expectRevert(bytes("!bridge"));
    assertEq(MetisHubConnector(_l1Connector).verifySender(expected), false);
  }

  // ============ MetisHubConnector.sendMessage ============
  function test_MetisHubConnector__sendMessage_works_fuzz(bytes32 data) public {
    bytes memory _data = abi.encodePacked(data);

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
    MetisHubConnector(_l1Connector).sendMessage(_data, _encodedData);
  }

  // ============ MetisHubConnector.processMessage ============
  function test_MetisHubConnector__processMessage_shouldRevert(bytes32 data) public {
    utils_setHubConnectorProcessMocks(_l2Connector);
    bytes memory _data = abi.encode(data);

    vm.prank(_amb);

    vm.expectRevert(Connector.Connector__processMessage_notUsed.selector);
    MetisHubConnector(_l1Connector).processMessage(_data);
  }

  //   // ============ MetisHubConnector.processMessageFromRoot ============
  //   function test_MetisHubConnector_processMessageFromRoot_works() public {
  //     // TODO: requires proof from metis sdk
  //   }
}
