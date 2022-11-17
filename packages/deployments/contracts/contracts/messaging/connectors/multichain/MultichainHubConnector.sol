// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";

import {HubConnector, Connector} from "../HubConnector.sol";

import {BaseMultichain} from "./BaseMultichain.sol";

contract MultichainHubConnector is HubConnector, BaseMultichain {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorChainId,
    uint256 _gasCap
  )
    HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector)
    BaseMultichain(_amb, _mirrorChainId, _gasCap)
  {}

  // ============ Private fns ============
  /**
   * @dev Handles an incoming `outboundRoot`
   */
  function _processMessage(bytes memory _data) internal override(Connector, BaseMultichain) {
    // enforce this came from connector on l2
    require(_verifySender(mirrorConnector), "!l2Connector");
    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");
    // set the outbound root for BSC domain
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, bytes32(_data));
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    _sendMessage(AMB, mirrorConnector, _data, _encodedData);
  }

  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }
}
