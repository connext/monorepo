// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {ProposedOwnableUpgradeable} from "./ProposedOwnableUpgradeable.sol";
import {AmplificationUtils, SwapUtils} from "./lib/StableSwap/AmplificationUtils.sol";
import {LPToken} from "./lib/StableSwap/LPToken.sol";
import {IConnextStableSwap} from "./interfaces/IConnextStableSwap.sol";

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
abstract contract ConnextStableSwap is IConnextStableSwap, ReentrancyGuardUpgradeable, ProposedOwnableUpgradeable {
  using SafeERC20 for IERC20;
  using SwapUtils for SwapUtils.Swap;
  using AmplificationUtils for SwapUtils.Swap;

  error ConnextStableSwap__deadlineCheck_deadlineNotMet();
  error ConnextStableSwap__poolCheck_notConfigured();
  error ConnextStableSwap__poolCheck_alreadyInitialized();
  error ConnextStableSwap__initializeSwap_invalidPooledTokens();
  error ConnextStableSwap__initializeSwap_decimalsMismatch();
  error ConnextStableSwap__initializeSwap_duplicateTokens();
  error ConnextStableSwap__initializeSwap_zeroTokenAddress();
  error ConnextStableSwap__initializeSwap_tokenDecimalsExceedMax();
  error ConnextStableSwap__initializeSwap_aExceedMax();
  error ConnextStableSwap__initializeSwap_feeExceedMax();
  error ConnextStableSwap__initializeSwap_adminFeeExceedMax();
  error ConnextStableSwap__initializeSwap_failedInitLpTokenClone();
  error ConnextStableSwap__getToken_outOfRange();
  error ConnextStableSwap__getTokenIndex_notExist();
  error ConnextStableSwap__getTokenBalance_indexOutOfRange();

  /**
   * @notice Mapping holding the AMM storages for swapping in and out of local assets
   * @dev Swaps for an adopted asset <> nomad local asset (i.e. POS USDC <> madUSDC on polygon)
   * Struct storing data responsible for automatic market maker functionalities. In order to
   * access this data, this contract uses SwapUtils library. For more details, see SwapUtils.sol
   */
  mapping(bytes32 => SwapUtils.Swap) public swapStorages;

  /**
   * @notice Maps token address to an index in the pool. Used to prevent duplicate tokens in the pool.
   * @dev getTokenIndex function also relies on this mapping to retrieve token index.
   */
  mapping(bytes32 => mapping(address => uint8)) private tokenIndexes;

  /**
   * @dev Initializes the contract setting the deployer as the initial
   */
  function __ConnextStableSwap_init() internal onlyInitializing {
    __ProposedOwnable_init();

    __ConnextStableSwap_init_unchained();
  }

  function __ConnextStableSwap_init_unchained() internal onlyInitializing {}

  /*** MODIFIERS ***/

  /**
   * @notice Modifier to check deadline against current timestamp
   * @param deadline latest timestamp to accept this transaction
   */
  modifier deadlineCheck(uint256 deadline) {
    if (block.timestamp > deadline) revert ConnextStableSwap__deadlineCheck_deadlineNotMet();
    _;
  }

  /**
   * @notice Modifier to check if the pool config is valid
   * @param canonicalId the canonical token id to check if pool is valid
   */
  modifier poolCheck(bytes32 canonicalId) {
    if (swapStorages[canonicalId].pooledTokens.length == 0) revert ConnextStableSwap__poolCheck_notConfigured();
    _;
  }

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
  function _initializeSwap(
    bytes32 _canonicalId,
    IERC20[] memory _pooledTokens,
    uint8[] memory decimals,
    string memory lpTokenName,
    string memory lpTokenSymbol,
    uint256 _a,
    uint256 _fee,
    uint256 _adminFee,
    address lpTokenTargetAddress
  ) internal {
    if (swapStorages[_canonicalId].pooledTokens.length != 0) revert ConnextStableSwap__poolCheck_alreadyInitialized();

    // Check _pooledTokens and precisions parameter
    if (_pooledTokens.length <= 1 || _pooledTokens.length > 32)
      revert ConnextStableSwap__initializeSwap_invalidPooledTokens();

    if (_pooledTokens.length != decimals.length) revert ConnextStableSwap__initializeSwap_decimalsMismatch();

    uint256[] memory precisionMultipliers = new uint256[](decimals.length);

    for (uint8 i = 0; i < _pooledTokens.length; i++) {
      if (i > 0) {
        // Check if index is already used. Check if 0th element is a duplicate.
        if (tokenIndexes[_canonicalId][address(_pooledTokens[i])] != 0 || _pooledTokens[0] == _pooledTokens[i])
          revert ConnextStableSwap__initializeSwap_duplicateTokens();
      }
      if (address(_pooledTokens[i]) == address(0)) revert ConnextStableSwap__initializeSwap_zeroTokenAddress();

      if (decimals[i] > SwapUtils.POOL_PRECISION_DECIMALS)
        revert ConnextStableSwap__initializeSwap_tokenDecimalsExceedMax();

      precisionMultipliers[i] = 10**uint256(SwapUtils.POOL_PRECISION_DECIMALS - decimals[i]);
      tokenIndexes[_canonicalId][address(_pooledTokens[i])] = i;
    }

    // Check _a, _fee, _adminFee, _withdrawFee parameters
    if (_a >= AmplificationUtils.MAX_A) revert ConnextStableSwap__initializeSwap_aExceedMax();
    if (_fee >= SwapUtils.MAX_SWAP_FEE) revert ConnextStableSwap__initializeSwap_feeExceedMax();
    if (_adminFee >= SwapUtils.MAX_ADMIN_FEE) revert ConnextStableSwap__initializeSwap_adminFeeExceedMax();

    // Initialize a LPToken contract
    LPToken lpToken = LPToken(Clones.clone(lpTokenTargetAddress));
    if (!lpToken.initialize(lpTokenName, lpTokenSymbol))
      revert ConnextStableSwap__initializeSwap_failedInitLpTokenClone();

    // Initialize swapStorage struct
    swapStorages[_canonicalId] = SwapUtils.Swap({
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

  /*** VIEW FUNCTIONS ***/

  /**
   * @notice Return A, the amplification coefficient * n * (n - 1)
   * @dev See the StableSwap paper for details
   * @param canonicalId the canonical token id
   * @return A parameter
   */
  function getA(bytes32 canonicalId) external view override returns (uint256) {
    return swapStorages[canonicalId].getA();
  }

  /**
   * @notice Return A in its raw precision form
   * @dev See the StableSwap paper for details
   * @param canonicalId the canonical token id
   * @return A parameter in its raw precision form
   */
  function getAPrecise(bytes32 canonicalId) external view returns (uint256) {
    return swapStorages[canonicalId].getAPrecise();
  }

  /**
   * @notice Return address of the pooled token at given index. Reverts if tokenIndex is out of range.
   * @param canonicalId the canonical token id
   * @param index the index of the token
   * @return address of the token at given index
   */
  function getToken(bytes32 canonicalId, uint8 index) public view override returns (IERC20) {
    SwapUtils.Swap memory swapStorage = swapStorages[canonicalId];
    if (index < swapStorage.pooledTokens.length) revert ConnextStableSwap__getToken_outOfRange();
    return swapStorage.pooledTokens[index];
  }

  /**
   * @notice Return the index of the given token address. Reverts if no matching
   * token is found.
   * @param canonicalId the canonical token id
   * @param tokenAddress address of the token
   * @return the index of the given token address
   */
  function getTokenIndex(bytes32 canonicalId, address tokenAddress) public view override returns (uint8) {
    uint8 index = tokenIndexes[canonicalId][tokenAddress];
    if (address(getToken(canonicalId, index)) != tokenAddress) revert ConnextStableSwap__getTokenIndex_notExist();
    return index;
  }

  /**
   * @notice Return current balance of the pooled token at given index
   * @param canonicalId the canonical token id
   * @param index the index of the token
   * @return current balance of the pooled token at given index with token's native precision
   */
  function getTokenBalance(bytes32 canonicalId, uint8 index) external view override returns (uint256) {
    SwapUtils.Swap memory swapStorage = swapStorages[canonicalId];
    if (index >= swapStorage.pooledTokens.length) revert ConnextStableSwap__getTokenBalance_indexOutOfRange();
    return swapStorage.balances[index];
  }

  /**
   * @notice Get the virtual price, to help calculate profit
   * @param canonicalId the canonical token id
   * @return the virtual price, scaled to the POOL_PRECISION_DECIMALS
   */
  function getVirtualPrice(bytes32 canonicalId) external view override returns (uint256) {
    return swapStorages[canonicalId].getVirtualPrice();
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
  ) external view override returns (uint256) {
    return swapStorages[canonicalId].calculateSwap(tokenIndexFrom, tokenIndexTo, dx);
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
  function calculateTokenAmount(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    bool deposit
  ) external view override returns (uint256) {
    return swapStorages[canonicalId].calculateTokenAmount(amounts, deposit);
  }

  /**
   * @notice A simple method to calculate amount of each underlying
   * tokens that is returned upon burning given amount of LP tokens
   * @param canonicalId the canonical token id
   * @param amount the amount of LP tokens that would be burned on withdrawal
   * @return array of token balances that the user will receive
   */
  function calculateRemoveLiquidity(bytes32 canonicalId, uint256 amount)
    external
    view
    override
    returns (uint256[] memory)
  {
    return swapStorages[canonicalId].calculateRemoveLiquidity(amount);
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
  function calculateRemoveLiquidityOneToken(
    bytes32 canonicalId,
    uint256 tokenAmount,
    uint8 tokenIndex
  ) external view override returns (uint256 availableTokenAmount) {
    return swapStorages[canonicalId].calculateWithdrawOneToken(tokenAmount, tokenIndex);
  }

  /**
   * @notice This function reads the accumulated amount of admin fees of the token with given index
   * @param canonicalId the canonical token id
   * @param index Index of the pooled token
   * @return admin's token balance in the token's precision
   */
  function getAdminBalance(bytes32 canonicalId, uint256 index) external view returns (uint256) {
    return swapStorages[canonicalId].getAdminBalance(index);
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
  ) external override nonReentrant deadlineCheck(deadline) returns (uint256) {
    return swapStorages[canonicalId].swap(tokenIndexFrom, tokenIndexTo, dx, minDy);
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
    address assetOut
  ) external payable override nonReentrant returns (uint256) {
    uint8 tokenIndexFrom = getTokenIndex(canonicalId, assetIn);
    uint8 tokenIndexTo = getTokenIndex(canonicalId, assetOut);
    return swapStorages[canonicalId].swap(tokenIndexFrom, tokenIndexTo, amountIn, 0);
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
  function addLiquidity(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    uint256 minToMint,
    uint256 deadline
  ) external override nonReentrant deadlineCheck(deadline) returns (uint256) {
    return swapStorages[canonicalId].addLiquidity(amounts, minToMint);
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
  function removeLiquidity(
    bytes32 canonicalId,
    uint256 amount,
    uint256[] calldata minAmounts,
    uint256 deadline
  ) external override nonReentrant deadlineCheck(deadline) returns (uint256[] memory) {
    return swapStorages[canonicalId].removeLiquidity(amount, minAmounts);
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
  function removeLiquidityOneToken(
    bytes32 canonicalId,
    uint256 tokenAmount,
    uint8 tokenIndex,
    uint256 minAmount,
    uint256 deadline
  ) external override nonReentrant deadlineCheck(deadline) returns (uint256) {
    return swapStorages[canonicalId].removeLiquidityOneToken(tokenAmount, tokenIndex, minAmount);
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
  function removeLiquidityImbalance(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    uint256 maxBurnAmount,
    uint256 deadline
  ) external override nonReentrant deadlineCheck(deadline) returns (uint256) {
    return swapStorages[canonicalId].removeLiquidityImbalance(amounts, maxBurnAmount);
  }

  /*** ADMIN FUNCTIONS ***/

  /**
   * @notice Withdraw all admin fees to the contract owner
   * @param canonicalId the canonical token id
   */
  function _withdrawAdminFees(bytes32 canonicalId) internal {
    swapStorages[canonicalId].withdrawAdminFees(owner());
  }

  /**
   * @notice Update the admin fee. Admin fee takes portion of the swap fee.
   * @param canonicalId the canonical token id
   * @param newAdminFee new admin fee to be applied on future transactions
   */
  function _setAdminFee(bytes32 canonicalId, uint256 newAdminFee) internal {
    swapStorages[canonicalId].setAdminFee(newAdminFee);
  }

  /**
   * @notice Update the swap fee to be applied on swaps
   * @param canonicalId the canonical token id
   * @param newSwapFee new swap fee to be applied on future transactions
   */
  function _setSwapFee(bytes32 canonicalId, uint256 newSwapFee) internal {
    swapStorages[canonicalId].setSwapFee(newSwapFee);
  }

  /**
   * @notice Start ramping up or down A parameter towards given futureA and futureTime
   * Checks if the change is too rapid, and commits the new A value only when it falls under
   * the limit range.
   * @param canonicalId the canonical token id
   * @param futureA the new A to ramp towards
   * @param futureTime timestamp when the new A should be reached
   */
  function _rampA(
    bytes32 canonicalId,
    uint256 futureA,
    uint256 futureTime
  ) internal {
    swapStorages[canonicalId].rampA(futureA, futureTime);
  }

  /**
   * @notice Stop ramping A immediately. Reverts if ramp A is already stopped.
   * @param canonicalId the canonical token id
   */
  function _stopRampA(bytes32 canonicalId) internal {
    swapStorages[canonicalId].stopRampA();
  }
}
