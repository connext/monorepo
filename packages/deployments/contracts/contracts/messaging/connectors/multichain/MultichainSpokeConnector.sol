// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Multichain} from "../../interfaces/ambs/Multichain.sol";

import {SpokeConnector} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

import {BaseMultichain} from "./BaseMultichain.sol";

contract MultichainSpokeConnector is SpokeConnector, BaseMultichain {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _mirrorChainId
  )
    SpokeConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas, _processGas, _reserveGas)
    BaseMultichain(_amb, _mirrorChainId)
  {}

  // ============ Private fns ============
  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessage(bytes memory _data) internal override(Connector, BaseMultichain) {
    // enforce this came from connector on l1
    require(_verifySender(mirrorConnector), "!l1Connector");
    // sanity check: data length
    require(_data.length == 32, "!length");
    // set the aggregate root for BSC + access control
    updateAggregateRoot(bytes32(_data));
  }

  function _sendMessage(bytes memory _data) internal override {
    _sendMessage(AMB, _data);
  }

  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }
}
