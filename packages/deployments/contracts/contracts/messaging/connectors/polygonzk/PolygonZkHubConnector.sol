// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";

import {HubConnector, Connector} from "../HubConnector.sol";

import {BasePolygonZk} from "./BasePolygonZk.sol";

contract PolygonZkHubConnector is HubConnector, BasePolygonZk {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint32 _mirrorNetworkId
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) BasePolygonZk(_mirrorNetworkId) {}

  // ============ Private fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    require(msg.sender == AMB, "!amb");
    return _expected == mirrorConnector;
  }

  /**
   * @dev Handles an incoming `outboundRoot`
   */
  function _processMessageFrom(address sender, bytes memory message) internal override(BasePolygonZk) {
    require(_verifySender(sender), "!l2Connector");

    // set the outbound root for mirror domain
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, bytes32(message));

    emit MessageProcessed(message, msg.sender);
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    _sendMessage(AMB, mirrorConnector, _data, _encodedData);
  }
}
