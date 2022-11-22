// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {GnosisAmb} from "../../interfaces/ambs/GnosisAmb.sol";

import {GasCap} from "../GasCap.sol";

abstract contract GnosisBase is GasCap {
  // ============ Storage ============
  uint256 public immutable MIRROR_CHAIN_ID;

  // ============ Constructor ============
  constructor(uint256 _gasCap, uint256 _mirrorChainId) GasCap(_gasCap) {
    MIRROR_CHAIN_ID = _mirrorChainId;
  }

  // ============ Private fns ============

  /**
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(
    address _amb,
    address _expected,
    uint256 _sourceChain
  ) internal view returns (bool) {
    require(msg.sender == _amb, "!bridge");
    require(_sourceChain == MIRROR_CHAIN_ID, "!source");
    return GnosisAmb(_amb).messageSender() == _expected;
  }

  /**
   * @notice Using Gnosis AMB, the gas is provided to `sendMessage` as an encoded uint
   */
  function _getGasFromEncoded(bytes memory _encodedData) internal view returns (uint256 _gas) {
    // Should include gssas info in specialized calldata
    require(_encodedData.length == 32, "!data length");

    // Get the gas, if it is more than the cap use the cap
    _gas = _getGas(abi.decode(_encodedData, (uint256)));
  }
}
