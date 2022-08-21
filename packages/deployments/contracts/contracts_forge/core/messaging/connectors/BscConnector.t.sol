// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Connector} from "../../../../contracts/core/messaging/connectors/Connector.sol";
import {BSCL1Connector, BSCL2Connector, MultichainCall} from "../../../../contracts/core/messaging/connectors/BSCConnector.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract BscConnectorTest is ConnectorHelper {
  // ============ Storage ============
  address _executor = address(bytes20(keccak256("_executor")));

  // ============ Test set up ============
  function setUp() public {
    // Mock the call to retrieve the executor in the base BSC constructor
    vm.etch(_amb, new bytes(0x69));
    vm.mockCall(_amb, abi.encodeCall(MultichainCall.executor, ()), abi.encode(_executor));

    // Get the n+1 deployment address
    address _futureL2address = addressFrom(address(this), vm.getNonce(address(this)) + 1);

    // Deploy
    _l1Connector = address(
      new BSCL1Connector(
        _l1Domain,
        _l2Domain,
        _amb,
        _rootManager,
        _futureL2address,
        _mirrorProcessGas,
        _processGas,
        _reserveGas
      )
    );

    _l2Connector = address(
      new BSCL2Connector(
        _l2Domain,
        _l1Domain,
        _amb,
        _rootManager,
        _l1Connector,
        _mirrorProcessGas,
        _processGas,
        _reserveGas
      )
    );

    // Sanity check
    require(_futureL2address == _l2Connector, "BSCConnector Test Setup fail: l2Connector address mispredicted");
  }

  // ============ Utils ============
  // set mirror
  // add sender
  // remove sender

  // ============ verifySender ============
  // return true if sender and executor are amb and correct executor
  // return false if wrong executor
  // reverse if sender != amb

  // ============ sendMessage ============
  function test_BSCL1_sendMessage_sendMessageAndEmitEvent() public {}

  function test_BSCL2_sendMessage_sendMessageAndEmitEvent() public {}

  // test_BSCL1 revert if sender != root manager
  // id L2?

  // ============ processMessage ============

  // L1&L2 process message and set root
  // L1&L2 revert if sender != _amb
  // L1&L2 revert if msg length != 32
}
