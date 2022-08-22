// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {LibArbitrumL1} from "@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL1.sol";
import {LibArbitrumL2} from "@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL2.sol";

import {IRootManager} from "../interfaces/IRootManager.sol";

import {Connector} from "./Connector.sol";

interface ArbitrumL1AMB {
  function sendContractTransaction(
    uint256 maxGas,
    uint256 gasPriceBid,
    address destAddr,
    uint256 amount,
    bytes memory data
  ) external payable returns (uint256);
}

interface ArbitrumL2AMB {
  // Send a transaction to L1
  function sendTxToL1(address destAddr, bytes calldata calldataForL1) external payable;
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

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == LibArbitrumL2.crossChainSender(AMB);
  }

  function _sendMessage(bytes memory _data) internal override {
    ArbitrumL2AMB(AMB).sendTxToL1(mirrorConnector, _data);
  }

  function _processMessage(bytes memory _data) internal override {
    // only callable by mirror connector
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // update the aggregate root on the domain
    update(bytes32(_data));
  }
}

contract ArbitrumL1Connector is Connector {
  uint256 public defaultGasPrice;

  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorProcessGas,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _defaultGasPrice
  )
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorProcessGas, _processGas, _reserveGas)
  {
    defaultGasPrice = _defaultGasPrice;
  }

  // ============ Admin fns ============

  function setDefaultGasPrice(uint256 _defaultGasPrice) external onlyOwner {
    emit DefaultGasPriceUpdated(defaultGasPrice, _defaultGasPrice);
    defaultGasPrice = _defaultGasPrice;
  }

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == LibArbitrumL1.crossChainSender(AMB);
  }

  function _sendMessage(bytes memory _data) internal override {
    ArbitrumL1AMB(AMB).sendContractTransaction(mirrorProcessGas, defaultGasPrice, mirrorConnector, 0, _data);
  }

  function _processMessage(bytes memory _data) internal override {
    // only callable by mirror connector
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // update the root on the root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(mirrorDomain, bytes32(_data));
  }
}
