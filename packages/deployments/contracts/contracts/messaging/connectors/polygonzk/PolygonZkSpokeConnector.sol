// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {SpokeConnector} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

import {BasePolygonZk} from "./BasePolygonZk.sol";

contract PolygonZkSpokeConnector is SpokeConnector, BasePolygonZk {
  // ============ Constructor ============
  constructor(
    ConstructorParams memory _baseSpokeParams,
    uint32 _mirrorNetworkId
  ) SpokeConnector(_baseSpokeParams) BasePolygonZk(_mirrorNetworkId) {}

  // ============ Admin fns ============

  // ============ Private fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    require(msg.sender == AMB, "!amb");
    return _expected == mirrorConnector;
  }

  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessageFrom(address sender, bytes memory message) internal override(BasePolygonZk) {
    require(_verifySender(sender), "!l2Connector");

    // set the aggregate root
    receiveAggregateRoot(bytes32(message));

    emit MessageProcessed(message, msg.sender);
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    _sendMessage(AMB, mirrorConnector, _data, _encodedData);
  }
}
