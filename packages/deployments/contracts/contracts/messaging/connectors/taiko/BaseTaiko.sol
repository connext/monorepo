// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import {Connector} from "../Connector.sol";
import {GasCap} from "../GasCap.sol";
import {IBridge} from "../../interfaces/ambs/taiko/IBridge.sol";

/**
 * @title BaseTaiko
 * @notice Base contract for Taiko Hub and Spoke Connectors
 */
abstract contract BaseTaiko is GasCap {
  /**
   * @notice Taiko Signal Service address
   */
  IBridge public immutable BRIDGE;

  /**
   * @notice The mirror chain id
   */
  uint256 public immutable MIRROR_CHAIN_ID;

  /**
   * @param _taikoBridge Taiko Signal Service address
   */
  constructor(address _taikoBridge, uint256 _mirrorChainId, uint256 _gasCap) GasCap(_gasCap) {
    BRIDGE = IBridge(_taikoBridge);
    MIRROR_CHAIN_ID = _mirrorChainId;
  }

  /**
   * @notice Sends a message to the mirror connector on the destination chain through the Taiko Bridge
   * @param _data The root
   * @param _mirrorConnector The mirror connector address on the destination chain
   */
  function _sendMessage(bytes memory _data, address _mirrorConnector) internal {
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    IBridge.Message memory _message = IBridge.Message({
      id: 0,
      from: address(this),
      srcChainId: block.chainid,
      destChainId: MIRROR_CHAIN_ID,
      user: msg.sender,
      to: _mirrorConnector,
      refundTo: _mirrorConnector,
      value: 0,
      fee: 0,
      gasLimit: gasCap,
      data: _calldata,
      memo: ""
    });
    BRIDGE.sendMessage(_message);
  }
}
