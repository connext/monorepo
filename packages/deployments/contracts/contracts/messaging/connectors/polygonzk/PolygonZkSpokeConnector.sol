// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {SpokeConnector} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

import {BasePolygonZk} from "./BasePolygonZk.sol";

contract PolygonZkSpokeConnector is SpokeConnector, BasePolygonZk {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager,
    uint32 _mirrorNetworkId
  )
    SpokeConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    )
    BasePolygonZk(_mirrorNetworkId)
  {}

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
