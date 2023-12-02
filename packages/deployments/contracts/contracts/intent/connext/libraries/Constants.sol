// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

library Constants {
  // ============= Initial Values =============

  /**
   * @notice Sets the initial lp fee at 5 bps
   */
  uint256 public constant INITIAL_LIQUIDITY_FEE_NUMERATOR = 9_995;

  /**
   * @notice Sets the initial max routers per transfer
   */
  uint256 public constant INITIAL_MAX_ROUTERS = 5;

  // ============= Unchangeable Values =============
  // ============= Facets

  /**
   * @notice Reentrancy modifier for diamond
   */
  uint256 internal constant NOT_ENTERED = 1;

  /**
   * @notice Reentrancy modifier for diamond
   */
  uint256 internal constant ENTERED = 2;

  /**
   * @notice Contains hash of empty bytes
   */
  bytes32 internal constant EMPTY_HASH = keccak256("");

  /**
   * @notice Denominator for BPS values
   */
  uint256 public constant BPS_FEE_DENOMINATOR = 10_000;

  /**
   * @notice Value for delay used on governance
   */
  uint256 public constant GOVERNANCE_DELAY = 7 days;

  /**
   * @notice Required gas amount to be leftover after passing in `gasleft` when
   * executing calldata (see `_executeCalldata` method).
   */
  uint256 public constant EXECUTE_CALLDATA_RESERVE_GAS = 10_000;

  // ============= ConnextPriceOracle
  /**
   * @notice Valid period for a price delivered by the price oracle
   */
  uint256 public constant ORACLE_VALID_PERIOD = 1 minutes;

  /**
   * @notice Valid wiggle room for future timestamps (3s) used by `setDirectPrice`
   */
  uint256 public constant FUTURE_TIME_BUFFER = 3;

  /**
   * @notice Defalt decimals values are normalized to
   */
  uint8 public constant DEFAULT_NORMALIZED_DECIMALS = uint8(18);

  /**
   * @notice Bytes of return data copied back when using `excessivelySafeCall`
   */
  uint16 public constant DEFAULT_COPY_BYTES = 256;

  /**
   * @notice Valid deadline extension used when swapping (1hr)
   */
  uint256 public constant DEFAULT_DEADLINE_EXTENSION = 3600;
}
