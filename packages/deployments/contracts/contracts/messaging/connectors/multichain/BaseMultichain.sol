// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Multichain} from "../../interfaces/ambs/Multichain.sol";

import {GasCap} from "../GasCap.sol";

abstract contract BaseMultichain is GasCap {
  // ============ Internal Storage ============
  address internal immutable EXECUTOR; // Is != amb, used only to retrieve sender context

  // Mirror chain id
  uint256 internal immutable MIRROR_CHAIN_ID;

  // ============ Constructor ============
  constructor(
    address _amb,
    uint256 _mirrorChainId,
    uint256 _gasCap // max fee on destination chain
  ) GasCap(_gasCap) {
    // sanity checks
    require(_mirrorChainId != 0, "!mirrorChainId");

    // set immutable propertioes
    EXECUTOR = Multichain(_amb).executor();
    require(EXECUTOR != address(0), "!executor");
    MIRROR_CHAIN_ID = _mirrorChainId;
  }

  // ============ Public Fns ============
  function anyExecute(bytes memory _data) external returns (bool success, bytes memory result) {
    _processMessage(_data);
  }

  // ============ Private fns ============
  /**
   * @notice This function is used by the AMBs to handle incoming messages. Should store the latest
   * root generated on the l2 domain.
   */
  function _processMessage(bytes memory _data) internal virtual;

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

    // Get the max fee supplied
    uint256 supplied = _getGas(msg.value); // fee paid on origin chain, up to cap
    // NOTE: fee will always be <= msg.value

    // Get the min fees
    uint256 required = Multichain(_amb).calcSrcFees(
      "", // app id
      MIRROR_CHAIN_ID, // destination chain
      32 // data length: selector + root
    );
    // Should have at least the min fees
    require(required < supplied + 1, "!fees");

    Multichain(_amb).anyCall{value: supplied}(
      _mirrorConnector, // Target contract on destination
      _data, // Call data for interaction
      address(0), // fallback address on origin chain
      MIRROR_CHAIN_ID,
      2 // fees paid on source chain
    );
  }

  function _verifySender(address _amb, address _expected) internal view returns (bool) {
    require(msg.sender == EXECUTOR, "!executor");

    (address from, uint256 fromChainId, ) = Multichain(EXECUTOR).context();
    return from == _expected && fromChainId == MIRROR_CHAIN_ID;
  }
}
