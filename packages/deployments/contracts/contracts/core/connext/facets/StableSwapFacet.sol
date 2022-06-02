// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";
import {AmplificationUtils, SwapUtils} from "../libraries/AmplificationUtils.sol";
import {LPToken} from "../helpers/LPToken.sol";

/**
 * @title Swap - A StableSwap implementation in solidity.
 * @notice This contract is responsible for custody of closely pegged assets (eg. group of stablecoins)
 * and automatic market making system. Users become an LP (Liquidity Provider) by depositing their tokens
 * in desired ratios for an exchange of the pool token that represents their share of the pool.
 * Users can burn pool tokens and withdraw their share of token(s).
 *
 * Each time a swap between the pooled tokens happens, a set fee incurs which effectively gets
 * distributed to the LPs.
 *
 * In case of emergencies, admin can pause additional deposits, swaps, or single-asset withdraws - which
 * stops the ratio of the tokens in the pool from changing.
 * Users can always withdraw their tokens via multi-asset withdraws.
 *
 * @dev Most of the logic is stored as a library `SwapUtils` for the sake of reducing contract's
 * deployment size.
 */

contract StableSwapFacet is BaseConnextFacet {
  using SwapUtils for SwapUtils.Swap;
  using AmplificationUtils for SwapUtils.Swap;

  // ========== Custom Errors ===========
  error StableSwapFacet__deadlineCheck_deadlineNotMet();
  error StableSwapFacet__initializeSwap_alreadyInitialized();
  error StableSwapFacet__initializeSwap_invalidPooledTokens();
  error StableSwapFacet__initializeSwap_decimalsMismatch();
  error StableSwapFacet__initializeSwap_duplicateTokens();
  error StableSwapFacet__initializeSwap_zeroTokenAddress();
  error StableSwapFacet__initializeSwap_tokenDecimalsExceedMax();
  error StableSwapFacet__initializeSwap_aExceedMax();
  error StableSwapFacet__initializeSwap_feeExceedMax();
  error StableSwapFacet__initializeSwap_adminFeeExceedMax();
  error StableSwapFacet__initializeSwap_failedInitLpTokenClone();
  error StableSwapFacet__getSwapToken_outOfRange();
  error StableSwapFacet__getSwapTokenIndex_notExist();
  error StableSwapFacet__getSwapTokenBalance_indexOutOfRange();

  // ============ Properties ============

  // ============ Modifiers ============

  /**
   * @notice Modifier to check deadline against current timestamp
   * @param deadline latest timestamp to accept this transaction
   */
  modifier deadlineCheck(uint256 deadline) {
    if (block.timestamp > deadline) revert StableSwapFacet__deadlineCheck_deadlineNotMet();
    _;
  }

  // ============ View Functions ============
  /**
   * @notice Return Stable swap storage
   * @param canonicalId the canonical token id
   * @return SwapUtils.Swap
   */
  function getSwapStorage(bytes32 canonicalId) external view returns (SwapUtils.Swap memory) {
    return s.swapStorages[canonicalId];
  }

  /**
   * @notice Return LP token for canonical Id
   * @param canonicalId the canonical token id
   * @return LPToken
   */
  function getSwapLPToken(bytes32 canonicalId) external view returns (address) {
    return address(s.swapStorages[canonicalId].lpToken);
  }

  /**
   * @notice Return A, the amplification coefficient * n * (n - 1)
   * @dev See the StableSwap paper for details
   * @param canonicalId the canonical token id
   * @return A parameter
   */
  function getSwapA(bytes32 canonicalId) external view returns (uint256) {
    return s.swapStorages[canonicalId].getA();
  }

  /**
   * @notice Return A in its raw precision form
   * @dev See the StableSwap paper for details
   * @param canonicalId the canonical token id
   * @return A parameter in its raw precision form
   */
  function getSwapAPrecise(bytes32 canonicalId) external view returns (uint256) {
    return s.swapStorages[canonicalId].getAPrecise();
  }

  /**
   * @notice Return address of the pooled token at given index. Reverts if tokenIndex is out of range.
   * @param canonicalId the canonical token id
   * @param index the index of the token
   * @return address of the token at given index
   */
  function getSwapToken(bytes32 canonicalId, uint8 index) public view returns (IERC20) {
    if (index >= s.swapStorages[canonicalId].pooledTokens.length) revert StableSwapFacet__getSwapToken_outOfRange();
    return s.swapStorages[canonicalId].pooledTokens[index];
  }

  /**
   * @notice Return the index of the given token address. Reverts if no matching
   * token is found.
   * @param canonicalId the canonical token id
   * @param tokenAddress address of the token
   * @return the index of the given token address
   */
  function getSwapTokenIndex(bytes32 canonicalId, address tokenAddress) public view returns (uint8) {
    uint8 index = s.tokenIndexes[canonicalId][tokenAddress];
    if (address(getSwapToken(canonicalId, index)) != tokenAddress) revert StableSwapFacet__getSwapTokenIndex_notExist();
    return index;
  }

  /**
   * @notice Return current balance of the pooled token at given index
   * @param canonicalId the canonical token id
   * @param index the index of the token
   * @return current balance of the pooled token at given index with token's native precision
   */
  function getSwapTokenBalance(bytes32 canonicalId, uint8 index) external view returns (uint256) {
    if (index >= s.swapStorages[canonicalId].balances.length)
      revert StableSwapFacet__getSwapTokenBalance_indexOutOfRange();
    return s.swapStorages[canonicalId].balances[index];
  }

  /**
   * @notice Get the virtual price, to help calculate profit
   * @param canonicalId the canonical token id
   * @return the virtual price, scaled to the POOL_PRECISION_DECIMALS
   */
  function getSwapVirtualPrice(bytes32 canonicalId) external view returns (uint256) {
    return s.swapStorages[canonicalId].getVirtualPrice();
  }

  /**
   * @notice Calculate amount of tokens you receive on swap
   * @param canonicalId the canonical token id
   * @param tokenIndexFrom the token the user wants to sell
   * @param tokenIndexTo the token the user wants to buy
   * @param dx the amount of tokens the user wants to sell. If the token charges
   * a fee on transfers, use the amount that gets transferred after the fee.
   * @return amount of tokens the user will receive
   */
  function calculateSwap(
    bytes32 canonicalId,
    uint8 tokenIndexFrom,
    uint8 tokenIndexTo,
    uint256 dx
  ) external view returns (uint256) {
    return s.swapStorages[canonicalId].calculateSwap(tokenIndexFrom, tokenIndexTo, dx);
  }

  /**
   * @notice A simple method to calculate prices from deposits or
   * withdrawals, excluding fees but including slippage. This is
   * helpful as an input into the various "min" parameters on calls
   * to fight front-running
   *
   * @dev This shouldn't be used outside frontends for user estimates.
   *
   * @param canonicalId the canonical token id
   * @param amounts an array of token amounts to deposit or withdrawal,
   * corresponding to pooledTokens. The amount should be in each
   * pooled token's native precision. If a token charges a fee on transfers,
   * use the amount that gets transferred after the fee.
   * @param deposit whether this is a deposit or a withdrawal
   * @return token amount the user will receive
   */
  function calculateSwapTokenAmount(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    bool deposit
  ) external view returns (uint256) {
    return s.swapStorages[canonicalId].calculateTokenAmount(amounts, deposit);
  }

  /**
   * @notice A simple method to calculate amount of each underlying
   * tokens that is returned upon burning given amount of LP tokens
   * @param canonicalId the canonical token id
   * @param amount the amount of LP tokens that would be burned on withdrawal
   * @return array of token balances that the user will receive
   */
  function calculateRemoveSwapLiquidity(bytes32 canonicalId, uint256 amount) external view returns (uint256[] memory) {
    return s.swapStorages[canonicalId].calculateRemoveLiquidity(amount);
  }

  /**
   * @notice Calculate the amount of underlying token available to withdraw
   * when withdrawing via only single token
   * @param canonicalId the canonical token id
   * @param tokenAmount the amount of LP token to burn
   * @param tokenIndex index of which token will be withdrawn
   * @return availableTokenAmount calculated amount of underlying token
   * available to withdraw
   */
  function calculateRemoveSwapLiquidityOneToken(
    bytes32 canonicalId,
    uint256 tokenAmount,
    uint8 tokenIndex
  ) external view returns (uint256 availableTokenAmount) {
    return s.swapStorages[canonicalId].calculateWithdrawOneToken(tokenAmount, tokenIndex);
  }

  /**
   * @notice This function reads the accumulated amount of admin fees of the token with given index
   * @param canonicalId the canonical token id
   * @param index Index of the pooled token
   * @return admin's token balance in the token's precision
   */
  function getSwapAdminBalance(bytes32 canonicalId, uint256 index) external view returns (uint256) {
    return s.swapStorages[canonicalId].getAdminBalance(index);
  }

  /*** STATE MODIFYING FUNCTIONS ***/

  /**
   * @notice Swap two tokens using this pool
   * @param canonicalId the canonical token id
   * @param tokenIndexFrom the token the user wants to swap from
   * @param tokenIndexTo the token the user wants to swap to
   * @param dx the amount of tokens the user wants to swap from
   * @param minDy the min amount the user would like to receive, or revert.
   * @param deadline latest timestamp to accept this transaction
   */
  function swap(
    bytes32 canonicalId,
    uint8 tokenIndexFrom,
    uint8 tokenIndexTo,
    uint256 dx,
    uint256 minDy,
    uint256 deadline
  ) external nonReentrant deadlineCheck(deadline) returns (uint256) {
    return s.swapStorages[canonicalId].swap(tokenIndexFrom, tokenIndexTo, dx, minDy);
  }

  /**
   * @notice Swap two tokens using this pool
   * @param canonicalId the canonical token id
   * @param assetIn the token the user wants to swap from
   * @param assetOut the token the user wants to swap to
   * @param amountIn the amount of tokens the user wants to swap from
   */
  function swapExact(
    bytes32 canonicalId,
    uint256 amountIn,
    address assetIn,
    address assetOut,
    uint256 minAmountOut,
    uint256 deadline
  ) external payable nonReentrant deadlineCheck(deadline) returns (uint256) {
    return
      s.swapStorages[canonicalId].swap(
        getSwapTokenIndex(canonicalId, assetIn),
        getSwapTokenIndex(canonicalId, assetOut),
        amountIn,
        minAmountOut
      );
  }

  /**
   * @notice Add liquidity to the pool with the given amounts of tokens
   * @param canonicalId the canonical token id
   * @param amounts the amounts of each token to add, in their native precision
   * @param minToMint the minimum LP tokens adding this amount of liquidity
   * should mint, otherwise revert. Handy for front-running mitigation
   * @param deadline latest timestamp to accept this transaction
   * @return amount of LP token user minted and received
   */
  function addSwapLiquidity(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    uint256 minToMint,
    uint256 deadline
  ) external nonReentrant deadlineCheck(deadline) returns (uint256) {
    return s.swapStorages[canonicalId].addLiquidity(amounts, minToMint);
  }

  /**
   * @notice Burn LP tokens to remove liquidity from the pool. Withdraw fee that decays linearly
   * over period of 4 weeks since last deposit will apply.
   * @dev Liquidity can always be removed, even when the pool is paused.
   * @param canonicalId the canonical token id
   * @param amount the amount of LP tokens to burn
   * @param minAmounts the minimum amounts of each token in the pool
   *        acceptable for this burn. Useful as a front-running mitigation
   * @param deadline latest timestamp to accept this transaction
   * @return amounts of tokens user received
   */
  function removeSwapLiquidity(
    bytes32 canonicalId,
    uint256 amount,
    uint256[] calldata minAmounts,
    uint256 deadline
  ) external nonReentrant deadlineCheck(deadline) returns (uint256[] memory) {
    return s.swapStorages[canonicalId].removeLiquidity(amount, minAmounts);
  }

  /**
   * @notice Remove liquidity from the pool all in one token. Withdraw fee that decays linearly
   * over period of 4 weeks since last deposit will apply.
   * @param canonicalId the canonical token id
   * @param tokenAmount the amount of the token you want to receive
   * @param tokenIndex the index of the token you want to receive
   * @param minAmount the minimum amount to withdraw, otherwise revert
   * @param deadline latest timestamp to accept this transaction
   * @return amount of chosen token user received
   */
  function removeSwapLiquidityOneToken(
    bytes32 canonicalId,
    uint256 tokenAmount,
    uint8 tokenIndex,
    uint256 minAmount,
    uint256 deadline
  ) external nonReentrant deadlineCheck(deadline) returns (uint256) {
    return s.swapStorages[canonicalId].removeLiquidityOneToken(tokenAmount, tokenIndex, minAmount);
  }

  /**
   * @notice Remove liquidity from the pool, weighted differently than the
   * pool's current balances. Withdraw fee that decays linearly
   * over period of 4 weeks since last deposit will apply.
   * @param canonicalId the canonical token id
   * @param amounts how much of each token to withdraw
   * @param maxBurnAmount the max LP token provider is willing to pay to
   * remove liquidity. Useful as a front-running mitigation.
   * @param deadline latest timestamp to accept this transaction
   * @return amount of LP tokens burned
   */
  function removeSwapLiquidityImbalance(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    uint256 maxBurnAmount,
    uint256 deadline
  ) external nonReentrant deadlineCheck(deadline) returns (uint256) {
    return s.swapStorages[canonicalId].removeLiquidityImbalance(amounts, maxBurnAmount);
  }

  /*** ADMIN FUNCTIONS ***/
  /**
   * @notice Initializes this Swap contract with the given parameters.
   * This will also clone a LPToken contract that represents users'
   * LP positions. The owner of LPToken will be this contract - which means
   * only this contract is allowed to mint/burn tokens.
   *
   * @param _canonicalId the canonical token id
   * @param _pooledTokens an array of ERC20s this pool will accept
   * @param decimals the decimals to use for each pooled token,
   * eg 8 for WBTC. Cannot be larger than POOL_PRECISION_DECIMALS
   * @param lpTokenName the long-form name of the token to be deployed
   * @param lpTokenSymbol the short symbol for the token to be deployed
   * @param _a the amplification coefficient * n * (n - 1). See the
   * StableSwap paper for details
   * @param _fee default swap fee to be initialized with
   * @param _adminFee default adminFee to be initialized with
   * @param lpTokenTargetAddress the address of an existing LPToken contract to use as a target
   */
  function initializeSwap(
    bytes32 _canonicalId,
    IERC20[] memory _pooledTokens,
    uint8[] memory decimals,
    string memory lpTokenName,
    string memory lpTokenSymbol,
    uint256 _a,
    uint256 _fee,
    uint256 _adminFee,
    address lpTokenTargetAddress
  ) external onlyOwner {
    if (s.swapStorages[_canonicalId].pooledTokens.length != 0)
      revert StableSwapFacet__initializeSwap_alreadyInitialized();

    // Check _pooledTokens and precisions parameter
    if (_pooledTokens.length <= 1 || _pooledTokens.length > 32)
      revert StableSwapFacet__initializeSwap_invalidPooledTokens();

    if (_pooledTokens.length != decimals.length) revert StableSwapFacet__initializeSwap_decimalsMismatch();

    uint256[] memory precisionMultipliers = new uint256[](decimals.length);

    for (uint8 i = 0; i < _pooledTokens.length; i++) {
      if (i > 0) {
        // Check if index is already used. Check if 0th element is a duplicate.
        if (s.tokenIndexes[_canonicalId][address(_pooledTokens[i])] != 0 || _pooledTokens[0] == _pooledTokens[i])
          revert StableSwapFacet__initializeSwap_duplicateTokens();
      }
      if (address(_pooledTokens[i]) == address(0)) revert StableSwapFacet__initializeSwap_zeroTokenAddress();

      if (decimals[i] > SwapUtils.POOL_PRECISION_DECIMALS)
        revert StableSwapFacet__initializeSwap_tokenDecimalsExceedMax();

      precisionMultipliers[i] = 10**uint256(SwapUtils.POOL_PRECISION_DECIMALS - decimals[i]);
      s.tokenIndexes[_canonicalId][address(_pooledTokens[i])] = i;
    }

    // Check _a, _fee, _adminFee, _withdrawFee parameters
    if (_a >= AmplificationUtils.MAX_A) revert StableSwapFacet__initializeSwap_aExceedMax();
    if (_fee >= SwapUtils.MAX_SWAP_FEE) revert StableSwapFacet__initializeSwap_feeExceedMax();
    if (_adminFee >= SwapUtils.MAX_ADMIN_FEE) revert StableSwapFacet__initializeSwap_adminFeeExceedMax();

    // Initialize a LPToken contract
    LPToken lpToken = LPToken(Clones.clone(lpTokenTargetAddress));
    if (!lpToken.initialize(lpTokenName, lpTokenSymbol))
      revert StableSwapFacet__initializeSwap_failedInitLpTokenClone();

    // Initialize swapStorage struct
    s.swapStorages[_canonicalId] = SwapUtils.Swap({
      initialA: _a * AmplificationUtils.A_PRECISION,
      futureA: _a * AmplificationUtils.A_PRECISION,
      swapFee: _fee,
      adminFee: _adminFee,
      lpToken: lpToken,
      pooledTokens: _pooledTokens,
      tokenPrecisionMultipliers: precisionMultipliers,
      balances: new uint256[](_pooledTokens.length),
      initialATime: 0,
      futureATime: 0
    });
  }

  /**
   * @notice Withdraw all admin fees to the contract owner
   * @param canonicalId the canonical token id
   */
  function withdrawSwapAdminFees(bytes32 canonicalId) external onlyOwner {
    s.swapStorages[canonicalId].withdrawAdminFees(msg.sender);
  }

  /**
   * @notice Update the admin fee. Admin fee takes portion of the swap fee.
   * @param canonicalId the canonical token id
   * @param newAdminFee new admin fee to be applied on future transactions
   */
  function setSwapAdminFee(bytes32 canonicalId, uint256 newAdminFee) external onlyOwner {
    s.swapStorages[canonicalId].setAdminFee(newAdminFee);
  }

  /**
   * @notice Update the swap fee to be applied on swaps
   * @param canonicalId the canonical token id
   * @param newSwapFee new swap fee to be applied on future transactions
   */
  function setSwapFee(bytes32 canonicalId, uint256 newSwapFee) external onlyOwner {
    s.swapStorages[canonicalId].setSwapFee(newSwapFee);
  }

  /**
   * @notice Start ramping up or down A parameter towards given futureA and futureTime
   * Checks if the change is too rapid, and commits the new A value only when it falls under
   * the limit range.
   * @param canonicalId the canonical token id
   * @param futureA the new A to ramp towards
   * @param futureTime timestamp when the new A should be reached
   */
  function rampA(
    bytes32 canonicalId,
    uint256 futureA,
    uint256 futureTime
  ) external onlyOwner {
    s.swapStorages[canonicalId].rampA(futureA, futureTime);
  }

  /**
   * @notice Stop ramping A immediately. Reverts if ramp A is already stopped.
   * @param canonicalId the canonical token id
   */
  function stopRampA(bytes32 canonicalId) external onlyOwner {
    s.swapStorages[canonicalId].stopRampA();
  }
}
