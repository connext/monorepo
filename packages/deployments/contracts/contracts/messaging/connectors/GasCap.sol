// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ProposedOwnable} from "../../shared/ProposedOwnable.sol";

abstract contract GasCap is ProposedOwnable {
  // ============ Storage ============
  /**
   * @notice The gnosis amb requires destination gas to be specified on the origin.
   * The gas used will be passed in by the relayer to allow for real-time estimates,
   * but will be capped at the admin-set cap.
   */
  uint256 gasCap;

  // ============ Events ============

  /**
   * @notice Emitted when admin updates the gas cap
   * @param _previous The starting value
   * @param _updated The final value
   */
  event GasCapUpdated(uint256 _previous, uint256 _updated);

  // ============ Constructor ============
  constructor(uint256 _gasCap) {
    _setGasCap(_gasCap);
  }

  // ============ Admin Fns ============
  function setGasCap(uint256 _gasCap) public onlyOwner {
    _setGasCap(_gasCap);
  }

  // ============ Internal Fns ============

  /**
   * @notice Used (by admin) to update the gas cap
   * @param _gasCap The new value
   */
  function _setGasCap(uint256 _gasCap) internal {
    emit GasCapUpdated(gasCap, _gasCap);
    gasCap = _gasCap;
  }

  /**
   * @notice Used to get the gas to use. Will be the original value IFF it
   * is less than the cap
   * @param _gas The proposed gas value
   */
  function _getGas(uint256 _gas) internal view returns (uint256) {
    if (_gas > gasCap) {
      _gas = gasCap;
    }
    return _gas;
  }
}
