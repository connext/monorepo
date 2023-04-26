// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IPolygonZkEVMBridge} from "../../interfaces/ambs/polygonzk/IPolygonZkEVMBridge.sol";
import {IBridgeMessageReceiver} from "../../interfaces/ambs/polygonzk/IBridgeMessageReceiver.sol";

import {GasCap} from "../GasCap.sol";

abstract contract BasePolygonZk is IBridgeMessageReceiver {
  // ============ Internal Storage ============

  // Mirror Network id Mainnet: 0, Rollup: 1
  uint32 internal immutable MIRROR_NETWORK_ID;

  // ============ Constructor ============
  constructor(uint32 _mirrorNetworkId) {
    // set immutable propertioes
    MIRROR_NETWORK_ID = _mirrorNetworkId;
  }

  // ============ Public Fns ============

  // ============ Private fns ============

  // DO NOT override _processMessage, should revert from `Connector` class. All messages must use the _processMessageFrom function
  /**
   * @notice This function is used by the PolygonZkEVMBridge to handle incoming messages. Should store the latest
   * root generated on the l2 domain.
   */
  function _processMessageFrom(address sender, bytes memory _data) internal virtual;

  /**
   * @notice This function is called by the PolygonZkEVMBridge to handle incoming messages.
   * while handling claimMessage
   */
  function onMessageReceived(address originAddress, uint32 originNetwork, bytes memory data) external payable {
    require(originNetwork == MIRROR_NETWORK_ID, "!mirror network");

    // get the data (should be the outbound root)
    require(data.length == 32, "!length");

    _processMessageFrom(originAddress, data);
  }

  /**
   * @dev Sends `outboundRoot` to root manager on the mirror chain
   */
  function _sendMessage(
    address _amb,
    address _mirrorConnector,
    bytes memory _data,
    bytes memory _encodedData
  ) internal {
    // Should always be sending a merkle root
    require(_data.length == 32, "!data length");

    // Should not include any gas info
    require(_encodedData.length == 0, "!data length");

    IPolygonZkEVMBridge(_amb).bridgeMessage(
      MIRROR_NETWORK_ID,
      _mirrorConnector, // Target contract on destination
      true, // forceUpdateGlobalExitRoot = true Indicates if the new global exit root is updated or not
      _data // Call data for interaction
    );
  }
}
