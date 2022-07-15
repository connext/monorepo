// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";

import {XAppConnectionManager} from "../../../nomad-core/contracts/XAppConnectionManager.sol";

import {AssetLogic} from "../libraries/AssetLogic.sol";

import {IAavePool} from "../interfaces/IAavePool.sol";
import {IBridgeRouter} from "../interfaces/IBridgeRouter.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

/**
 * @title NomadFacet
 * @notice This is the facet that holds all the functionality needed for nomad to reconcile
 * the transfer
 *
 */
contract NomadFacet is BaseConnextFacet {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // ========== Custom Errors ===========
  error NomadFacet__reconcile_invalidAction();
  error NomadFacet__reconcile_alreadyReconciled();
  error NomadFacet__reconcile_noPortalRouter();
  error NomadFacet__setBridgeRouter_invalidBridge();

  // ============ Events ============

  /**
   * @notice Emitted when executed a Portal repayment
   * @param transferId - The unique identifier of the crosschain transaction
   * @param asset - The asset that was repaid
   * @param amount - The amount that was repaid
   * @param fee - The fee amount that was repaid
   */
  event AavePortalRepayment(bytes32 indexed transferId, address asset, uint256 amount, uint256 fee);

  /**
   * @notice Emitted when there is no enough assets to repay or the repayment failed
   * @param transferId - The unique identifier of the crosschain transaction
   * @param asset - The asset that in which the debt is nominated
   * @param amount - The amount that is pending to be repaid
   * @param fee - The fee amount that is pending to be repaid
   */
  event AavePortalRepaymentDebt(bytes32 indexed transferId, address asset, uint256 amount, uint256 fee);

  /**
   * @notice Emitted when `reconciled` is called by the bridge on the destination domain
   * @param transferId - The unique identifier of the crosschain transaction
   * @param routers - The CallParams.recipient provided, created as indexed parameter
   * @param asset - The asset that was provided by the bridge
   * @param amount - The amount that was provided by the bridge
   * @param caller - The account that called the function
   */
  event Reconciled(bytes32 indexed transferId, address[] routers, address asset, uint256 amount, address caller);

  /**
   * @notice Emitted when the bridgeRouter variable is updated
   * @param oldBridgeRouter - The bridgeRouter old value
   * @param newBridgeRouter - The bridgeRouter new value
   * @param caller - The account that called the function
   */
  event BridgeRouterUpdated(address oldBridgeRouter, address newBridgeRouter, address caller);

  // ============ Getters ============

  /**
   * @notice Returns the stored bridge router reference
   */
  function bridgeRouter() external view returns (IBridgeRouter) {
    return s.bridgeRouter;
  }

  // ============ Admin functions ============

  /**
   * @notice Updates the bridge router
   * @param _bridgeRouter The new bridge router address
   */
  function setBridgeRouter(address _bridgeRouter) external onlyOwner {
    address old = address(s.bridgeRouter);
    if (old == _bridgeRouter) {
      revert NomadFacet__setBridgeRouter_invalidBridge();
    }
    s.bridgeRouter = IBridgeRouter(_bridgeRouter);
    emit BridgeRouterUpdated(old, _bridgeRouter, msg.sender);
  }

  // ============ External functions ============

  /**
   * @notice Called via `handle` on Nomad BridgeRouter. Will either (a) credit the router(s) if fast liquidity was provided (i.e. `execute`
   * has already occurred) or (b) make funds available for execution, updating state to mark the transfer as having
   * been reconciled (i.e. verified).
   *
   * @dev The output asset will be the one registered under the canonical token ID in the TokenRegistry. If the output
   * asset is an adopted token, the bridged nomad counterpart (i.e. the local asset) will be minted then swapped via
   * the configured AMM to the adopted token. If the target output is the canonical token (i.e. this domain is the
   * canonical domain for the token), then we will release custody of the appropriate amount of that canonical token
   * (tokens which were previously deposited into this bridge via outgoing `xcall`s). If the target adopted token
   * is also the local nomad asset (which would be minted here), then no swap is necessary.
   *
   * @dev Should be interface compatible with interface defined here:
   * https://github.com/nomad-xyz/monorepo/blob/main/packages/contracts-bridge/contracts/interfaces/IBridgeHook.sol
   *
   * @param _tokenAddress - The canonical identifier of the token
   * @param _localToken - The address of the token representation on this domain, or the canonical
   * address if you are on the canonical domain
   * @param _amount - The amount bridged
   * @param _extraData - The extra data passed with the transfer on `sendToHook` (in this case transferId)
   */
  function onReceive(
    uint32, // _origin, not used
    uint32, // _tokenDomain, not used
    bytes32 _tokenAddress, // of canonical token?
    address _localToken,
    uint256 _amount,
    bytes memory _extraData
  ) external onlyBridgeRouter {
    bytes32 transferId = bytes32(_extraData);
    // Ensure the transaction has not already been handled (i.e. previously reconciled).
    if (s.reconciledTransfers[transferId]) {
      revert NomadFacet__reconcile_alreadyReconciled();
    }

    // Mark the transfer as reconciled.
    s.reconciledTransfers[transferId] = true;

    // If the transfer was executed using fast-liquidity provided by routers, then this value would be set
    // to the participating routers.
    // NOTE: If the transfer was not executed using fast-liquidity, then the funds will be reserved for
    // execution (i.e. funds will be delivered to the transfer's recipient in a subsequent `execute` call).
    address[] memory routers = s.routedTransfers[transferId];

    // If fast transfer was made using portal liquidity, we need to repay
    // NOTE: routers can repay any-amount out-of-band using the `repayAavePortal` method
    // or by interacting with the aave contracts directly
    uint256 portalTransferAmount = s.portalDebt[transferId] + s.portalFeeDebt[transferId];

    uint256 toDistribute = _amount;
    uint256 pathLen = routers.length;
    if (portalTransferAmount != 0) {
      // ensure a router took on credit risk
      if (pathLen != 1) revert NomadFacet__reconcile_noPortalRouter();
      toDistribute = _reconcileProcessPortal(_tokenAddress, _amount, _localToken, transferId);
    }

    if (pathLen != 0) {
      // fast liquidity path
      // Credit each router that provided liquidity their due 'share' of the asset.
      uint256 routerAmt = toDistribute / pathLen;
      for (uint256 i; i < pathLen; ) {
        s.routerBalances[routers[i]][_localToken] += routerAmt;
        unchecked {
          ++i;
        }
      }
    }

    emit Reconciled(transferId, routers, _localToken, _amount, msg.sender);
  }

  // ============ Internal functions ============

  /**
   * @notice Repays to Aave Portal if the transfer was executed with fast path using Portal liquidity
   * @param _amount - The amount passed through bridge
   * @param _local - The local  asset
   * @param _transferId - The transfer identifier
   * @return The amount to distribute amongst the routers after repayment
   */
  function _reconcileProcessPortal(
    bytes32 _canonicalId,
    uint256 _amount,
    address _local,
    bytes32 _transferId
  ) private returns (uint256) {
    // When repaying a portal, should use available liquidity if there is not enough balance from
    // the bridge. First, calculate the amount to be repaid in adopted asset then swap for exactly
    // that amount. This prevents having to swap excess (i.e. from positive amm slippage) from debt
    // repayment back into local asset to credit routers

    // Calculates the amount to be repaid to the portal in adopted asset
    (uint256 totalRepayAmount, uint256 backUnbackedAmount, uint256 portalFee) = _calculatePortalRepayment(
      _canonicalId,
      _amount,
      _transferId,
      _local
    );

    // Update the debt amounts before swapping
    s.portalDebt[_transferId] -= backUnbackedAmount;
    s.portalFeeDebt[_transferId] -= portalFee;

    // Swap for exact `totalRepayAmount` of adopted asset to repay aave, with a maximum of the minted amount
    // as the slippage ceiling
    // amountIn is the amount that was actually taken to perform the swap (i.e. amount of local asset swapped)
    // NOTE: this function can revert if the slippage ceiling is hit. Using the low-level calls helps us
    // handle the case where slippage was hit
    (bool swapSuccess, uint256 amountIn, address adopted) = AssetLogic.swapFromLocalAssetIfNeededForExactOut(
      _canonicalId,
      _local,
      totalRepayAmount,
      _amount
    );
    if (!swapSuccess) {
      // Reset values
      s.portalDebt[_transferId] += backUnbackedAmount;
      s.portalFeeDebt[_transferId] += portalFee;
      // Emit debt event of full portal value and exit
      emit AavePortalRepaymentDebt(_transferId, adopted, s.portalDebt[_transferId], s.portalFeeDebt[_transferId]);
      return (_amount);
    }

    // Edge case with some tokens: Example USDT in ETH Mainnet, after the backUnbacked call there could be a remaining allowance if not the whole amount is pulled by aave.
    // Later, if we try to increase the allowance it will fail. USDT demands if allowance is not 0, it has to be set to 0 first.
    // Example: https://github.com/aave/aave-v3-periphery/blob/ca184e5278bcbc10d28c3dbbc604041d7cfac50b/contracts/adapters/paraswap/ParaSwapRepayAdapter.sol#L138-L140
    SafeERC20.safeApprove(IERC20(adopted), s.aavePool, 0);
    SafeERC20.safeIncreaseAllowance(IERC20(adopted), s.aavePool, totalRepayAmount);

    (bool success, ) = s.aavePool.call(
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, adopted, backUnbackedAmount, portalFee)
    );

    if (success) {
      emit AavePortalRepayment(_transferId, adopted, backUnbackedAmount, portalFee);
    } else {
      // Reset values
      s.portalDebt[_transferId] += backUnbackedAmount;
      s.portalFeeDebt[_transferId] += portalFee;

      // Decrease the allowance
      SafeERC20.safeDecreaseAllowance(IERC20(adopted), s.aavePool, totalRepayAmount);

      // Update the amount repaid to 0, so the amount is credited to the router
      amountIn = 0;
      emit AavePortalRepaymentDebt(_transferId, adopted, s.portalDebt[_transferId], s.portalFeeDebt[_transferId]);
    }

    // NOTE: Aave accounts a global unbacked variable per asset for all, not by address/bridge.
    // Someone can repay more than it should, so then a the moment of calling backUnbacked()
    // aave can pull a smaller amount than backUnbackedAmount. So there will be an extra amount of assets that needs to be assigned
    // See https://github.com/aave/aave-v3-core/blob/feb3f20885c73025f40cc272b59e7eacfaa02fe4/contracts/protocol/libraries/logic/BridgeLogic.sol#L121
    // If we wanted to handle this difference, we should check the balance before and after calling
    // `backUnbacked` and credit the difference to the router

    // Calculate the amount to distribute to the router. There are cases (i.e. positive slippage)
    // where router has gained extra because of the AMM, these funds should be distributed.
    // Because we are using the `_amount` as the maximum amount in, the `amountIn` should always be
    // <= _amount (i.e. this will be +ive)
    return (_amount - amountIn);
  }

  /**
   * @notice Calculates the amount to be repaid to Aave Portal in adopted asset. If there is no enough amount to repay
   * the unbacked and the fee, it will partially repay prioritizing the unbacked amount.
   * @dev Assumes the fee is proportional to the unbackedAmount.
   * @param _localAmount - The available balance for a repayment
   * @param _transferId - The unique identifier of the crosschain transaction
   * @param _local - The address of the adopted asset that needs to be backed
   * @return The total amount to be repaid
   * @return The unbacked amount to be backed
   * @return The fee amount to be paid
   */
  function _calculatePortalRepayment(
    bytes32 _canonicalId,
    uint256 _localAmount,
    bytes32 _transferId,
    address _local
  )
    internal
    returns (
      uint256,
      uint256,
      uint256
    )
  {
    uint256 portalFee = s.portalFeeDebt[_transferId];
    uint256 backUnbackedAmount = s.portalDebt[_transferId];
    uint256 totalRepayAmount = backUnbackedAmount + portalFee;
    // see how much of local asset you would have available post-swap
    (uint256 availableAmount, address adopted) = AssetLogic.calculateSwapFromLocalAssetIfNeeded(
      _canonicalId,
      _local,
      _localAmount
    );

    // If not enough funds to repay the transfer + fees
    // try to repay as much as unbacked as possible
    if (totalRepayAmount > availableAmount) {
      uint256 backUnbackedDebt = backUnbackedAmount;
      uint256 portalFeeDebt = portalFee;

      if (availableAmount > backUnbackedAmount) {
        // Repay the whole transfer and a partial amount of fees
        unchecked {
          portalFee = availableAmount - backUnbackedAmount;
        }

        backUnbackedDebt = 0;
        portalFeeDebt -= portalFee;
      } else {
        // Repay a partial amount of the transfer and no fees
        backUnbackedAmount = availableAmount;
        portalFee = 0;

        backUnbackedDebt -= backUnbackedAmount;
      }

      totalRepayAmount = backUnbackedAmount + portalFee;

      emit AavePortalRepaymentDebt(_transferId, adopted, backUnbackedDebt, portalFeeDebt);
    }

    return (totalRepayAmount, backUnbackedAmount, portalFee);
  }
}
