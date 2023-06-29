// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";

import {HubConnector, Connector} from "../HubConnector.sol";

import {BaseWormhole} from "./BaseWormhole.sol";

contract WormholeHubConnector is HubConnector, BaseWormhole {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _gasCap,
    uint16 _mirrorChainId
  )
    HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector)
    BaseWormhole(_amb, _gasCap, _mirrorChainId)
  {}

  // ============ Override Fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(mirrorConnector, _expected);
  }

  // ============ Private fns ============
  /**
   * @dev Handles an incoming `outboundRoot`
   */
  function _processMessageFrom(address _sender, bytes memory _data) internal override(BaseWormhole) {
    // enforce this came from connector on l2
    require(_verifySender(_sender), "!l2Connector");

    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");

    // set the outbound root for BSC domain
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, bytes32(_data));

    emit MessageProcessed(_data, msg.sender);
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    _sendMessage(mirrorConnector, owner(), _data, _encodedData);
  }
}
