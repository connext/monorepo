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

  /**
   * @notice Sets the initial max routers per transfer
   */
  uint16 public constant INITIAL_AAVE_REFERRAL_CODE = 0;

  // =============

  // ============= Unchangeable Values =============
  // TODO:
  // - _NOT_ENTERED
  // - _ENTERED
  // - EMPTY_HASH

  // ============= Facets

  /**
   * @notice Denominator for BPS values
   */
  uint256 public constant BPS_FEE_DENOMINATOR = 10_000;

  /**
   * @notice Value for delay used on governance
   */
  uint256 public constant GOVERNANCE_DELAY = 7 days;

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

  // ============= Swaps

  /**
   * @notice the precision all pools tokens will be converted to
   * @dev stored here to keep easily in sync between `SwapUtils` and `SwapUtilsExternal`
   */
  uint256 public constant MINIMUM_POOLED_TOKENS = 2;
  uint256 public constant MAXIMUM_POOLED_TOKENS = 32;

  /**
   * @notice the precision all pools tokens will be converted to
   * @dev stored here to keep easily in sync between `SwapUtils` and `SwapUtilsExternal`
   */
  uint8 public constant POOL_PRECISION_DECIMALS = 18;

  /**
   * @notice the denominator used to calculate admin and LP fees. For example, an
   * LP fee might be something like tradeAmount.mul(fee).div(FEE_DENOMINATOR)
   * @dev stored here to keep easily in sync between `SwapUtils` and `SwapUtilsExternal`
   */
  uint256 public constant FEE_DENOMINATOR = 1e10;

  /**
   * @notice Max swap fee is 1% or 100bps of each swap
   * @dev stored here to keep easily in sync between `SwapUtils` and `SwapUtilsExternal`
   */
  uint256 public constant MAX_SWAP_FEE = 1e8;

  /**
   * @notice Max adminFee is 100% of the swapFee. adminFee does not add additional fee on top of swapFee.
   * Instead it takes a certain % of the swapFee. Therefore it has no impact on the
   * users but only on the earnings of LPs
   * @dev stored here to keep easily in sync between `SwapUtils` and `SwapUtilsExternal`
   */
  uint256 public constant MAX_ADMIN_FEE = 1e10;

  /**
   * @notice constant value used as max loop limit
   * @dev stored here to keep easily in sync between `SwapUtils` and `SwapUtilsExternal`
   */
  uint256 public constant MAX_LOOP_LIMIT = 256;

  /**
   * @notice constant values used in ramping A calculations
   * @dev stored here to keep easily in sync between `SwapUtils` and `SwapUtilsExternal`
   */
  uint256 public constant A_PRECISION = 100;
  uint256 public constant MAX_A = 10**6;
  uint256 public constant MAX_A_CHANGE = 2;
  uint256 public constant MIN_RAMP_TIME = 14 days;
  uint256 public constant MIN_RAMP_DELAY = 1 days;

  // ============= StableSwap
}
