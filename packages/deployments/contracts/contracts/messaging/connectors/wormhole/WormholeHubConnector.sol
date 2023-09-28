// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {IWormholeReceiver} from "../../interfaces/ambs/wormhole/IWormholeReceiver.sol";

import {HubConnector, Connector} from "../HubConnector.sol";

import {BaseWormhole} from "./BaseWormhole.sol";

contract WormholeHubConnector is HubConnector, BaseWormhole, IWormholeReceiver {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _gasCap,
    uint16 _mirrorWormholeChainId
  )
    HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector)
    BaseWormhole(_gasCap, _mirrorWormholeChainId)
  {}

  // ============ Override Fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(mirrorConnector, _expected);
  }

  // ============ Public fns ============
  /**
   * @notice This function is called to receive messages through the wormhole relayer module
   * https://book.wormhole.com/technical/evm/relayer.html
   * @dev This is defined here instead of the `BaseWormhole` to avoid storing AMB values twice.
   */
  function receiveWormholeMessages(
    bytes memory _payload,
    bytes[] memory, // additionalVaas,
    bytes32 _sourceAddress,
    uint16 _sourceChain,
    bytes32 _deliveryHash
  ) public payable override {
    _wormholeSanityChecks(_sourceChain, AMB, _deliveryHash);

    _processMessageFrom(_fromWormholeFormat(_sourceAddress), _payload);
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
    _sendMessage(AMB, mirrorConnector, _data, _encodedData);
  }
}
