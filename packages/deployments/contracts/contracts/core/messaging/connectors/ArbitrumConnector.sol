// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../interfaces/IRootManager.sol";

import {Connector} from "./Connector.sol";

interface ArbitrumL1AMB {
  function sendContractTransaction() external payable;
}

interface ArbitrumL2AMB {
  // Send a transaction to L1
  function sendTxToL1(address destAddr, bytes calldata calldataForL1) external payable;
}

contract ArbitrumL1Connector is Connector {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorProcessGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorProcessGas, _processGas, _reserveGas)
  {}

  // ============ Private fns ============

  function _verifySender(address _expected) internal override returns (bool) {
    require(msg.sender == AMB, "!amb");
    return AddressAliasHelper.undoL1ToL2Alias(msg.sender) == _expected;
  }

  function _sendMessage(bytes memory _data) internal override {
    arbInbox.sendContractTransaction(defaultGasLimit, defaultGasPrice, l2BridgeAddress, 0, _calldata);
    emit MessageSent(_data, msg.sender);
  }

  function _processMessage(address _sender, bytes memory _data) internal override {
    // only callable by mirror connector
    _verifySender(mirrorConnector);
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // update the root on the root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(mirrorDomain, bytes32(_data));
  }
}

contract ArbitrumL2Connector is Connector {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorProcessGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorProcessGas, _processGas, _reserveGas)
  {}

  // ============ Private fns ============

  function _verifySender(address _expected) internal override returns (bool) {
    require(msg.sender == AMB, "!amb");
    return AddressAliasHelper.applyL1ToL2Alias(msg.sender) == _expected;
  }

  function _sendMessage(bytes memory _data) internal override {
    ArbitrumL2AMB(AMB).sendTxToL1(mirrorConnector, _data);
    emit MessageSent(_data, msg.sender);
  }

  function _processMessage(address _sender, bytes memory _data) internal override {
    // only callable by mirror connector
    _verifySender(mirrorConnector);
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // update the aggregate root on the domain
    update(bytes32(_data));
  }
}
