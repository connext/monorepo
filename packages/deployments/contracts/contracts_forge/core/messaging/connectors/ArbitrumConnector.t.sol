// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Connector} from "../../../../contracts/core/messaging/connectors/Connector.sol";
import {ArbitrumL1Connector, ArbitrumL2Connector, ArbitrumL1AMB} from "../../../../contracts/core/messaging/connectors/ArbitrumConnector.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

import "forge-std/console.sol";

contract ArbitrumConnectorTest is ConnectorHelper, Connector {
  // ============ Storage ============
  uint256 _defaultGasPrice = 10 gwei;

  // ============ Test set up ============
  function setUp() public {
    // deploy
    _l1Connector = address(
      new ArbitrumL1Connector(
        _l1Domain,
        _l2Domain,
        _amb,
        _rootManager,
        address(0),
        _mirrorProcessGas,
        _processGas,
        _reserveGas,
        _defaultGasPrice
      )
    );

    _l2Connector = address(
      new ArbitrumL2Connector(
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

    // set mirror connector on l1
    ArbitrumL1Connector(_l1Connector).setMirrorConnector(_l2Connector);
  }

  // ============ Utils ============

  // ============ verifySender ============

  // ============ sendMessage ============
  function test_ArbitrumL1Connector__sendMessage_works() public {
    // data
    bytes memory _data = abi.encode(123123123);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, address(this));

    // should call send contract transaction
    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        ArbitrumL1AMB.sendContractTransaction.selector,
        _mirrorProcessGas,
        _defaultGasPrice,
        _l2Connector,
        0,
        _data
      )
    );

    ArbitrumL1Connector(_l1Connector).sendMessage(_data);
  }

  // ============ processMessage ============
}
