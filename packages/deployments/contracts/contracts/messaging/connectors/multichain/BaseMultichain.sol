// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Multichain} from "../../interfaces/ambs/Multichain.sol";

abstract contract BaseMultichain {
  // ============ Internal Storage ============
  address internal immutable EXECUTOR; // Is != amb, used only to retrieve sender context

  // Mirror chain id
  uint256 internal immutable MIRROR_CHAIN_ID;

  // ============ Constructor ============
  constructor(address _amb, uint256 _mirrorChainId) {
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
  function _sendMessage(address _amb, bytes memory _data) internal {
    Multichain(_amb).anyCall(
      _amb, // Same address on every chain, using AMB as it is immutable
      _data,
      address(0), // fallback address on origin chain
      MIRROR_CHAIN_ID,
      0 // fee paid on origin chain
    );
  }

  function _verifySender(address _amb, address _expected) internal view returns (bool) {
    require(msg.sender == _amb, "!bridge");

    (address from, uint256 fromChainId, ) = Multichain(EXECUTOR).context();
    return from == _expected && fromChainId == MIRROR_CHAIN_ID;
  }
}
