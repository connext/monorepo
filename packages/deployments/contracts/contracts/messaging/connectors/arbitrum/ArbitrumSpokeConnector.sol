// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {LibArbitrumL2} from "@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL2.sol";

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {ArbitrumL2Amb} from "../../interfaces/ambs/ArbitrumL2Amb.sol";

import {SpokeConnector} from "../SpokeConnector.sol";

contract ArbitrumSpokeConnector is SpokeConnector {
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    SpokeConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas, _processGas, _reserveGas)
  {}

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == LibArbitrumL2.crossChainSender(AMB);
  }

  function _sendMessage(bytes memory _data) internal override {
    ArbitrumL2Amb(AMB).sendTxToL1(mirrorConnector, _data);
  }

  function _processMessage(bytes memory _data) internal override {
    // only callable by mirror connector
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // update the aggregate root on the domain
    updateAggregateRoot(bytes32(_data));
  }
}
