// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20, Address, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

import {AmplificationUtils, SwapUtils} from "../libraries/AmplificationUtils.sol";
import {Constants} from "../libraries/Constants.sol";

import {LPToken} from "../helpers/LPToken.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

/**
 * @title SwapAdminFacet
 * @notice Contract module which exposes only-admin controls for the StableSwapFacet
 * contract.
 *
 * @dev This module is used through inheritance. It will make available the
 * modifier `onlyOwner`, which can be applied to your functions to restrict
 * their use to the owner.
 */
contract SwapAdminFacet is BaseConnextFacet {
  using SafeERC20 for IERC20;
  using SwapUtils for SwapUtils.Swap;
  using AmplificationUtils for SwapUtils.Swap;

  // ========== Custom Errors ===========
  error SwapAdminFacet__initializeSwap_alreadyInitialized();
  error SwapAdminFacet__initializeSwap_invalidPooledTokens();
  error SwapAdminFacet__initializeSwap_decimalsMismatch();
  error SwapAdminFacet__initializeSwap_duplicateTokens();
  error SwapAdminFacet__initializeSwap_zeroTokenAddress();
  error SwapAdminFacet__initializeSwap_tokenDecimalsExceedMax();
  error SwapAdminFacet__initializeSwap_aExceedMax();
  error SwapAdminFacet__initializeSwap_feeExceedMax();
  error SwapAdminFacet__initializeSwap_adminFeeExceedMax();
  error SwapAdminFacet__initializeSwap_failedInitLpTokenClone();
  error SwapAdminFacet__updateLpTokenTarget_invalidNewAddress();
  error SwapAdminFacet__removeSwap_notInitialized();
  error SwapAdminFacet__removeSwap_notDisabledPool();
  error SwapAdminFacet__removeSwap_delayNotElapsed();
  error SwapAdminFacet__disableSwap_notInitialized();
  error SwapAdminFacet__disableSwap_alreadyDisabled();

  // ============ Properties ============

  // ============ Events ============

  /**
   * @notice Emitted when the owner calls `initializeSwap`
   * @param key - Identifier for asset
   * @param swap - The swap that was initialized
   * @param caller - The caller of the function
   */
  event SwapInitialized(bytes32 indexed key, SwapUtils.Swap swap, address caller);

  /**
   * @notice Emitted when the owner calls `removeSwap`
   * @param key - Identifier for asset
   * @param caller - The caller of the function
   */
  event SwapRemoved(bytes32 indexed key, address caller);

  /**
   * @notice Emitted when the owner calls `disableSwap`
   * @param key - Identifier for asset
   * @param caller - The caller of the function
   */
  event SwapDisabled(bytes32 indexed key, address caller);

  /**
   * @notice Emitted when the owner withdraws admin fees
   * @param key - Identifier for asset
   * @param caller - The caller of the function
   */
  event AdminFeesWithdrawn(bytes32 indexed key, address caller);

  /**
   * @notice Emitted when the owner sets admin fees
   * @param key - Identifier for asset
   * @param newAdminFee - The updated fee
   * @param caller - The caller of the function
   */
  event AdminFeesSet(bytes32 indexed key, uint256 newAdminFee, address caller);

  /**
   * @notice Emitted when the owner sets swap fees
   * @param key - Identifier for asset
   * @param newSwapFee - The updated fee
   * @param caller - The caller of the function
   */
  event SwapFeesSet(bytes32 indexed key, uint256 newSwapFee, address caller);

  /**
   * @notice Emitted when the owner starts ramping up or down the A parameter
   * @param key - Identifier for asset
   * @param futureA - The final A value after ramp
   * @param futureTime - The time A should reach the final value
   * @param caller - The caller of the function
   */
  event RampAStarted(bytes32 indexed key, uint256 futureA, uint256 futureTime, address caller);

  /**
   * @notice Emitted when the owner stops ramping up or down the A parameter
   * @param key - Identifier for asset
   * @param caller - The caller of the function
   */
  event RampAStopped(bytes32 indexed key, address caller);

  /**
   * @notice Emitted when the owner update lpTokenTargetAddress
   * @param oldAddress - The old lpTokenTargetAddress
   * @param newAddress - Updated address
   * @param caller - The caller of the function
   */
  event LPTokenTargetUpdated(address oldAddress, address newAddress, address caller);

  // ============ External: Getters ============
  /**
   * @notice Returns the lp target token address
   * @return address
   */
  function lpTokenTargetAddress() public view returns (address) {
    return s.lpTokenTargetAddress;
  }

  /**
   * @notice Return if the pool is disabled
   * @param key Hash of the canonical id + domain
   * @return disabled flag
   */
  function isDisabled(bytes32 key) external view returns (bool) {
    return s.swapStorages[key].disabled;
  }

  /*** StableSwap ADMIN FUNCTIONS ***/
  /**
   * @notice Initializes this Swap contract with the given parameters.
   * This will also clone a LPToken contract that represents users'
   * LP positions. The owner of LPToken will be this contract - which means
   * only this contract is allowed to mint/burn tokens.
   *
   * @dev The swap can only be updated after initialization via `rampA`. This means
   * if this value is incorrectly set, it will take some time to reach the
   * correct value.
   *
   * @param _key the hash of the canonical id and domain for token
   * @param _pooledTokens an array of ERC20s this pool will accept.
   * length of this array should be in 2 ~ 16
   * @param decimals the decimals to use for each pooled token,
   * eg 8 for WBTC. Cannot be larger than POOL_PRECISION_DECIMALS(18)
   * Only fixed decimal tokens are allowed.
   * @param lpTokenName the long-form name of the token to be deployed
   * @param lpTokenSymbol the short symbol for the token to be deployed
   * @param _a the amplification coefficient * n ** (n - 1). See the
   * StableSwap paper for details
   * @param _fee default swap fee to be initialized with
   * @param _adminFee default adminFee to be initialized with
   */
  function initializeSwap(
    bytes32 _key,
    IERC20[] memory _pooledTokens,
    uint8[] memory decimals,
    string memory lpTokenName,
    string memory lpTokenSymbol,
    uint256 _a,
    uint256 _fee,
    uint256 _adminFee
  ) external onlyOwnerOrAdmin {
    if (s.swapStorages[_key].pooledTokens.length != 0) revert SwapAdminFacet__initializeSwap_alreadyInitialized();

    // Check _pooledTokens and precisions parameter
    if (
      _pooledTokens.length < Constants.MINIMUM_POOLED_TOKENS || _pooledTokens.length > Constants.MAXIMUM_POOLED_TOKENS
    ) {
      revert SwapAdminFacet__initializeSwap_invalidPooledTokens();
    }

    uint256 numPooledTokens = _pooledTokens.length;

    if (numPooledTokens != decimals.length) revert SwapAdminFacet__initializeSwap_decimalsMismatch();

    uint256[] memory precisionMultipliers = new uint256[](decimals.length);

    for (uint256 i; i < numPooledTokens; ) {
      if (i != 0) {
        // Check if index is already used. Check if 0th element is a duplicate.
        if (s.tokenIndexes[_key][address(_pooledTokens[i])] != 0 || _pooledTokens[0] == _pooledTokens[i])
          revert SwapAdminFacet__initializeSwap_duplicateTokens();
      }
      if (address(_pooledTokens[i]) == address(0)) revert SwapAdminFacet__initializeSwap_zeroTokenAddress();

      if (decimals[i] > Constants.POOL_PRECISION_DECIMALS)
        revert SwapAdminFacet__initializeSwap_tokenDecimalsExceedMax();

      precisionMultipliers[i] = 10**uint256(Constants.POOL_PRECISION_DECIMALS - decimals[i]);
      // NOTE: safe to cast to uint8 as the numPooledTokens is that type and the loop ceiling
      s.tokenIndexes[_key][address(_pooledTokens[i])] = uint8(i);

      unchecked {
        ++i;
      }
    }

    // Check _a, _fee, _adminFee, _withdrawFee parameters
    if (_a > Constants.MAX_A - 1) revert SwapAdminFacet__initializeSwap_aExceedMax();
    if (_fee > Constants.MAX_SWAP_FEE - 1) revert SwapAdminFacet__initializeSwap_feeExceedMax();
    if (_adminFee > Constants.MAX_ADMIN_FEE - 1) revert SwapAdminFacet__initializeSwap_adminFeeExceedMax();

    // Initialize a LPToken contract
    LPToken lpToken = LPToken(Clones.clone(s.lpTokenTargetAddress));
    if (!lpToken.initialize(lpTokenName, lpTokenSymbol)) revert SwapAdminFacet__initializeSwap_failedInitLpTokenClone();

    // Initialize swapStorage struct
    SwapUtils.Swap memory entry = SwapUtils.Swap({
      key: _key,
      initialA: _a * Constants.A_PRECISION,
      futureA: _a * Constants.A_PRECISION,
      swapFee: _fee,
      adminFee: _adminFee,
      lpToken: lpToken,
      pooledTokens: _pooledTokens,
      tokenPrecisionMultipliers: precisionMultipliers,
      balances: new uint256[](_pooledTokens.length),
      adminFees: new uint256[](_pooledTokens.length),
      initialATime: 0,
      futureATime: 0,
      disabled: false,
      removeTime: 0
    });
    s.swapStorages[_key] = entry;
    emit SwapInitialized(_key, entry, msg.sender);
  }

  /**
   * @notice disable swap for key
   *
   * @param _key the hash of the canonical id and domain for token
   */
  function disableSwap(bytes32 _key) external onlyOwnerOrAdmin {
    uint256 numPooledTokens = s.swapStorages[_key].pooledTokens.length;

    if (numPooledTokens == 0) revert SwapAdminFacet__disableSwap_notInitialized();
    if (s.swapStorages[_key].disabled) revert SwapAdminFacet__disableSwap_alreadyDisabled();

    s.swapStorages[_key].disabled = true;
    s.swapStorages[_key].removeTime = block.timestamp + Constants.REMOVE_DELAY;

    emit SwapDisabled(_key, msg.sender);
  }

  /**
   * @notice remove Swap Struct for key
   *
   * @param _key the hash of the canonical id and domain for token
   */
  function removeSwap(bytes32 _key) external onlyOwnerOrAdmin {
    uint256 numPooledTokens = s.swapStorages[_key].pooledTokens.length;
    if (numPooledTokens == 0) revert SwapAdminFacet__removeSwap_notInitialized();

    if (!s.swapStorages[_key].disabled) revert SwapAdminFacet__removeSwap_notDisabledPool();
    if (s.swapStorages[_key].removeTime > block.timestamp) revert SwapAdminFacet__removeSwap_delayNotElapsed();

    for (uint256 i; i < numPooledTokens; ) {
      IERC20 pooledToken = s.swapStorages[_key].pooledTokens[i];
      if (s.swapStorages[_key].balances[i] > 0) {
        // if there is not removed balance, transfer to admin wallet.
        pooledToken.safeTransfer(msg.sender, s.swapStorages[_key].balances[i]);
      }

      delete s.tokenIndexes[_key][address(pooledToken)];

      unchecked {
        ++i;
      }
    }

    _withdrawAdminFees(_key, msg.sender);

    delete s.swapStorages[_key];

    emit SwapRemoved(_key, msg.sender);
  }

  /**
   * @notice Withdraw all admin fees to the contract owner
   * @param key Hash of the canonical domain and id
   */
  function withdrawSwapAdminFees(bytes32 key) external onlyOwnerOrAdmin nonReentrant {
    _withdrawAdminFees(key, msg.sender);
  }

  /**
   * @notice Withdraws all admin fees for pool at key to provided address and emits event
   * @param _key Hash of the canonical domain and id
   * @param _to Recipient of fees
   */
  function _withdrawAdminFees(bytes32 _key, address _to) internal {
    s.swapStorages[_key].withdrawAdminFees(_to);
    emit AdminFeesWithdrawn(_key, _to);
  }

  /**
   * @notice Update the admin fee. Admin fee takes portion of the swap fee.
   * @param key Hash of the canonical domain and id
   * @param newAdminFee new admin fee to be applied on future transactions
   */
  function setSwapAdminFee(bytes32 key, uint256 newAdminFee) external onlyOwnerOrAdmin {
    s.swapStorages[key].setAdminFee(newAdminFee);
    emit AdminFeesSet(key, newAdminFee, msg.sender);
  }

  /**
   * @notice Update the swap fee to be applied on swaps
   * @param key Hash of the canonical domain and id
   * @param newSwapFee new swap fee to be applied on future transactions
   */
  function setSwapFee(bytes32 key, uint256 newSwapFee) external onlyOwnerOrAdmin {
    s.swapStorages[key].setSwapFee(newSwapFee);
    emit SwapFeesSet(key, newSwapFee, msg.sender);
  }

  /**
   * @notice Start ramping up or down A parameter towards given futureA and futureTime
   * Checks if the change is too rapid, and commits the new A value only when it falls under
   * the limit range.
   * @param key Hash of the canonical domain and id
   * @param futureA the new A to ramp towards
   * @param futureTime timestamp when the new A should be reached
   */
  function rampA(
    bytes32 key,
    uint256 futureA,
    uint256 futureTime
  ) external onlyOwnerOrAdmin {
    s.swapStorages[key].rampA(futureA, futureTime);
    emit RampAStarted(key, futureA, futureTime, msg.sender);
  }

  /**
   * @notice Stop ramping A immediately. Reverts if ramp A is already stopped.
   * @param key Hash of the canonical domain and id
   */
  function stopRampA(bytes32 key) external onlyOwnerOrAdmin {
    s.swapStorages[key].stopRampA();
    emit RampAStopped(key, msg.sender);
  }

  /**
   * @notice Update lpTokenTargetAddress
   * @param newAddress New lpTokenTargetAddress
   */
  function updateLpTokenTarget(address newAddress) external onlyOwnerOrAdmin {
    if (!Address.isContract(newAddress)) revert SwapAdminFacet__updateLpTokenTarget_invalidNewAddress();
    emit LPTokenTargetUpdated(s.lpTokenTargetAddress, newAddress, msg.sender);
    s.lpTokenTargetAddress = newAddress;
  }
}
