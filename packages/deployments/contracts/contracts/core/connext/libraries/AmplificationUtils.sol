// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {SwapUtils} from "./SwapUtils.sol";
import {Constants} from "./Constants.sol";

/**
 * @title AmplificationUtils library
 * @notice A library to calculate and ramp the A parameter of a given `SwapUtils.Swap` struct.
 * This library assumes the struct is fully validated.
 */
library AmplificationUtils {
  event RampA(uint256 oldA, uint256 newA, uint256 initialTime, uint256 futureTime);
  event StopRampA(uint256 currentA, uint256 time);

  /**
   * @notice Return A, the amplification coefficient * n ** (n - 1)
   * @dev See the StableSwap paper for details
   * @param self Swap struct to read from
   * @return A parameter
   */
  function getA(SwapUtils.Swap storage self) internal view returns (uint256) {
    return _getAPrecise(self) / Constants.A_PRECISION;
  }

  /**
   * @notice Return A in its raw precision
   * @dev See the StableSwap paper for details
   * @param self Swap struct to read from
   * @return A parameter in its raw precision form
   */
  function getAPrecise(SwapUtils.Swap storage self) internal view returns (uint256) {
    return _getAPrecise(self);
  }

  /**
   * @notice Return A in its raw precision
   * @dev See the StableSwap paper for details
   * @param self Swap struct to read from
   * @return currentA A parameter in its raw precision form
   */
  function _getAPrecise(SwapUtils.Swap storage self) internal view returns (uint256 currentA) {
    uint256 t1 = self.futureATime; // time when ramp is finished
    currentA = self.futureA; // final A value when ramp is finished
    uint256 a0 = self.initialA; // initial A value when ramp is started

    if (a0 != currentA && block.timestamp < t1) {
      uint256 t0 = self.initialATime; // time when ramp is started
      assembly {
        currentA := div(add(mul(a0, sub(t1, timestamp())), mul(currentA, sub(timestamp(), t0))), sub(t1, t0))
      }
    }
  }

  /**
   * @notice Start ramping up or down A parameter towards given futureA_ and futureTime_
   * Checks if the change is too rapid, and commits the new A value only when it falls under
   * the limit range.
   * @param self Swap struct to update
   * @param futureA_ the new A to ramp towards
   * @param futureTime_ timestamp when the new A should be reached
   */
  function rampA(
    SwapUtils.Swap storage self,
    uint256 futureA_,
    uint256 futureTime_
  ) internal {
    require(block.timestamp >= self.initialATime + Constants.MIN_RAMP_DELAY, "Wait 1 day before starting ramp");
    require(futureTime_ >= block.timestamp + Constants.MIN_RAMP_TIME, "Insufficient ramp time");
    require(futureA_ != 0 && futureA_ < Constants.MAX_A, "futureA_ must be > 0 and < MAX_A");

    uint256 initialAPrecise = _getAPrecise(self);
    uint256 futureAPrecise = futureA_ * Constants.A_PRECISION;
    require(initialAPrecise != futureAPrecise, "!valid ramp");

    if (futureAPrecise < initialAPrecise) {
      require(futureAPrecise * Constants.MAX_A_CHANGE >= initialAPrecise, "futureA_ is too small");
    } else {
      require(futureAPrecise <= initialAPrecise * Constants.MAX_A_CHANGE, "futureA_ is too large");
    }

    self.initialA = initialAPrecise;
    self.futureA = futureAPrecise;
    self.initialATime = block.timestamp;
    self.futureATime = futureTime_;

    emit RampA(initialAPrecise, futureAPrecise, block.timestamp, futureTime_);
  }

  /**
   * @notice Stops ramping A immediately. Once this function is called, rampA()
   * cannot be called for another 24 hours
   * @param self Swap struct to update
   */
  function stopRampA(SwapUtils.Swap storage self) internal {
    require(self.futureATime > block.timestamp, "Ramp is already stopped");

    uint256 currentA = _getAPrecise(self);
    self.initialA = currentA;
    self.futureA = currentA;
    self.initialATime = block.timestamp;
    self.futureATime = block.timestamp;

    emit StopRampA(currentA, block.timestamp);
  }
}
