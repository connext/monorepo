// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {OptimismAmb} from "../../interfaces/ambs/OptimismAmb.sol";

import {SpokeConnector} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

import {BaseOptimism} from "./BaseOptimism.sol";

contract OptimismSpokeConnector is SpokeConnector, BaseOptimism {
  // ============ Constructor ============
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
    BaseOptimism()
  {}

  // ============ Override Fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }

  /**
   * @dev Sends `outboundRoot` to root manager on l1
   */
  function _sendMessage(bytes memory _data) internal override {
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    OptimismAmb(AMB).sendMessage(mirrorConnector, _calldata, uint32(mirrorGas));
  }

  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessage(bytes memory _data) internal override {
    // enforce this came from connector on l2
    require(_verifySender(mirrorConnector), "!l1Connector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // set the aggregate root
    updateAggregateRoot(bytes32(_data));
  }
}
