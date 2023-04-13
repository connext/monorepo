// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {GnosisAmb} from "../../interfaces/ambs/GnosisAmb.sol";

import {GasCap} from "../GasCap.sol";

abstract contract GnosisBase is GasCap {
  // ============ Events ============
  event GasFloorUpdated(uint256 previous, uint256 updated);

  // ============ Storage ============
  uint256 public immutable MIRROR_CHAIN_ID;

  /**
   * @notice The minimum amount of gas required to send along with a message
   * @dev Within Gnosis AMB itself - more precisely MessageDelivery._sendMessage(),
   * there is additional validation that this value should be bigger than the constant
   * MIN_GAS_PER_CALL which is 100.
   */
  uint256 public floor;

  // ============ Constructor ============
  constructor(uint256 _gasCap, uint256 _mirrorChainId) GasCap(_gasCap) {
    MIRROR_CHAIN_ID = _mirrorChainId;
    // set to default floor of bridge initially
    floor = 100;
  }

  // ============ Admin fns ============
  /**
   * @notice Allows admin to update the minimum gas to be sent along with an AMB call
   * @param _floor The updated gas floor
   */
  function setGasFloor(uint256 _floor) external onlyOwner {
    require(_floor > 100, "<100");
    uint256 floorMem = floor;
    require(floorMem != _floor, "!change");
    emit GasFloorUpdated(floorMem, _floor);
    floor = _floor;
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

    // enforce floor
    require(_gas > floor, "<floor");
  }
}
