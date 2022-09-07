// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {LibArbitrumL1} from "@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL1.sol";

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {ArbitrumL1Amb} from "../../interfaces/ambs/ArbitrumL1Amb.sol";

import {HubConnector} from "../HubConnector.sol";

contract ArbitrumHubConnector is HubConnector {
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
    uint256 _mirrorGas,
    uint256 _defaultGasPrice
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas) {
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
    // Should always be dispatching the aggregate root
    require(_data.length == 32, "!length");
    // dispatch to l2
    ArbitrumL1Amb(AMB).sendContractTransaction(mirrorGas, defaultGasPrice, mirrorConnector, 0, _data);
  }

  function _processMessage(bytes memory _data) internal override {
    // only callable by mirror connector
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // update the root on the root manager
    IRootManager(ROOT_MANAGER).setOutboundRoot(MIRROR_DOMAIN, bytes32(_data));
  }
}
