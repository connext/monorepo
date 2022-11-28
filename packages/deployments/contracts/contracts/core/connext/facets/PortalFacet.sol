// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

import {IAavePool} from "../interfaces/IAavePool.sol";

import {AssetLogic} from "../libraries/AssetLogic.sol";
import {Constants} from "../libraries/Constants.sol";
import {TransferInfo} from "../libraries/LibConnextStorage.sol";

contract PortalFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error PortalFacet__setAavePortalFee_invalidFee();
  error PortalFacet__repayAavePortal_assetNotApproved();
  error PortalFacet__repayAavePortal_insufficientFunds();
  error PortalFacet__repayAavePortalFor_zeroAmount();
  error PortalFacet__repayAavePortalFor_invalidAsset();

  // ============ Events ============

  /**
   * @notice Emitted `setAavePool` is updated
   * @param updated - The updated address
   * @param caller - The account that called the function
   */
  event AavePoolUpdated(address updated, address caller);

  /**
   * @notice Emitted `setAavePortalFee` is updated
   * @param updated - The updated fee numerator
   * @param caller - The account that called the function
   */
  event AavePortalFeeUpdated(uint256 updated, address caller);

  /**
   * @notice Emitted when a repayment on an Aave portal loan is made
   * @param transferId - The transfer debt that was repaid
   * @param asset - The asset that was repaid
   * @param amount - The amount that was repaid
   * @param fee - The fee amount that was repaid
   */
  event AavePortalRepayment(bytes32 indexed transferId, address asset, uint256 amount, uint256 fee, address caller);

  // ============ Getters methods ==============

  function getAavePortalDebt(bytes32 _transferId) external view returns (uint256) {
    return s.portalDebt[_transferId];
  }

  function getAavePortalFeeDebt(bytes32 _transferId) external view returns (uint256) {
    return s.portalFeeDebt[_transferId];
  }

  function aavePool() external view returns (address) {
    return s.aavePool;
  }

  function aavePortalFee() external view returns (uint256) {
    return s.aavePortalFeeNumerator;
  }

  // ============ External functions ============

  /**
   * @notice Sets the Aave Pool contract address.
   * @dev Allows to set the aavePool to address zero to disable Aave Portal if needed
   * @param _aavePool The address of the Aave Pool contract
   */
  function setAavePool(address _aavePool) external onlyOwnerOrAdmin {
    s.aavePool = _aavePool;
    emit AavePoolUpdated(_aavePool, msg.sender);
  }

  /**
   * @notice Sets the Aave Portal fee numerator
   * @param _aavePortalFeeNumerator The new value for the Aave Portal fee numerator
   */
  function setAavePortalFee(uint256 _aavePortalFeeNumerator) external onlyOwnerOrAdmin {
    if (_aavePortalFeeNumerator > Constants.BPS_FEE_DENOMINATOR) revert PortalFacet__setAavePortalFee_invalidFee();

    s.aavePortalFeeNumerator = _aavePortalFeeNumerator;
    emit AavePortalFeeUpdated(_aavePortalFeeNumerator, msg.sender);
  }

  /**
   * @notice Used by routers to perform a manual repayment to Aave Portals to cover any outstanding debt
   * @dev The router must be approved for portal and with enough liquidity, and must be the caller of this
   * function. If the asset is not whitelisted, must use the `repayAavePortalFor` function.
   * @param _params TransferInfo associated with the transfer
   * @param _backingAmount The principle to be paid (in adopted asset)
   * @param _feeAmount The fee to be paid (in adopted asset)
   * @param _maxIn The max value of the local asset to swap for the _backingAmount of adopted asset
   */
  function repayAavePortal(
    TransferInfo calldata _params,
    uint256 _backingAmount,
    uint256 _feeAmount,
    uint256 _maxIn
  ) external nonReentrant {
    bytes32 key = AssetLogic.calculateCanonicalHash(_params.canonicalId, _params.canonicalDomain);

    // Ensure the asset is approved
    if (!s.tokenConfigs[key].approval) {
      revert PortalFacet__repayAavePortal_assetNotApproved();
    }

    address local = _getLocalAsset(key, _params.canonicalId, _params.canonicalDomain);

    uint256 routerBalance = s.routerBalances[msg.sender][local];
    // Sanity check: has that much to spend
    if (routerBalance < _maxIn) revert PortalFacet__repayAavePortal_insufficientFunds();

    // Here, generate the transfer id. This allows us to ensure the `_local` asset
    // is the correct one associated with the transfer. Otherwise, anyone could pay back
    // the loan with the incorrect asset and remove the ability to transfer here. If the
    // `_local` asset is incorrectly supplied, the generated transferId will also be
    // incorrect, and the _backLoan call (which manipulates the debt stored) will fail.
    // Another option is to store the asset associated with the transfer on `execute`, but
    // this would make an already expensive call even more so.
    bytes32 transferId = _calculateTransferId(_params);

    // Need to swap into adopted asset or asset that was backing the loan
    // The router will always be holding collateral in the local asset while the loaned asset
    // is the adopted asset

    // Swap for exact `totalRepayAmount` of adopted asset to repay aave
    (uint256 amountDebited, address assetLoaned) = AssetLogic.swapFromLocalAssetIfNeededForExactOut(
      key,
      local,
      _backingAmount + _feeAmount,
      _maxIn
    );

    // decrement router balances
    s.routerBalances[msg.sender][local] = routerBalance - amountDebited;

    // back loan
    _backLoan(assetLoaned, _backingAmount, _feeAmount, transferId);
  }

  /**
   * @notice This allows anyone to repay the portal in the adopted asset for a given router
   * and transfer
   *
   * @dev Should always be paying in the backing asset for the aave loan. NOTE: This will *NOT*
   * work if an asset is removed.
   *
   * @param _params TransferInfo associated with the transfer
   * @param _portalAsset The asset you borrowed (adopted asset)
   * @param _backingAmount Amount of principle to repay
   * @param _feeAmount Amount of fees to repay
   */
  function repayAavePortalFor(
    TransferInfo calldata _params,
    address _portalAsset,
    uint256 _backingAmount,
    uint256 _feeAmount
  ) external payable nonReentrant {
    // Get the adopted address
    // NOTE: using storage directly because if `_getAdoptedAsset` is used, will revert if
    // the asset is not whitelisted (and this fn should work if asset is removed)
    address adopted = s
      .tokenConfigs[AssetLogic.calculateCanonicalHash(_params.canonicalId, _params.canonicalDomain)]
      .adopted;

    // Verify asset
    // NOTE: if asset is removed, `adopted` will be `address(0)`, so you cannot verify the asset
    // but should still allow for portal loans to be repaid.
    if (adopted != address(0) && _portalAsset != adopted) {
      revert PortalFacet__repayAavePortalFor_invalidAsset();
    }

    // Here, generate the transfer id. This allows us to ensure the `_adopted` asset
    // is the correct one associated with the transfer. Otherwise, anyone could pay back
    // the loan with the incorrect asset and remove the ability to transfer here. If the
    // `_adopted` asset is incorrectly supplied, the generated transferId will also be
    // incorrect, and the _backLoan call (which manipulates the debt stored) will fail.
    // Another option is to store the asset associated with the transfer on `execute`, but
    // this would make an already expensive call even more so.
    bytes32 transferId = _calculateTransferId(_params);

    // Transfer funds to the contract
    uint256 total = _backingAmount + _feeAmount;
    if (total == 0) revert PortalFacet__repayAavePortalFor_zeroAmount();

    AssetLogic.handleIncomingAsset(adopted, total);

    // No need to swap because this is the adopted asset. Simply
    // repay the loan
    _backLoan(adopted, _backingAmount, _feeAmount, transferId);
  }

  // ============ Internal functions ============

  /**
   * @notice Calls backUnbacked on the aave contracts
   * @dev Assumes funds in adopted asset are already on contract
   * @param _asset Address of the adopted asset (asset backing the loan)
   * @param _backing Amount of principle to repay
   * @param _fee Amount of fees to repay
   * @param _transferId Corresponding transfer id for the fees
   */
  function _backLoan(
    address _asset,
    uint256 _backing,
    uint256 _fee,
    bytes32 _transferId
  ) internal {
    // reduce debt
    s.portalDebt[_transferId] -= _backing;
    s.portalFeeDebt[_transferId] -= _fee;

    address aPool = s.aavePool;

    // increase allowance
    SafeERC20.safeApprove(IERC20(_asset), aPool, 0);
    SafeERC20.safeIncreaseAllowance(IERC20(_asset), aPool, _backing + _fee);

    // back loan
    IAavePool(aPool).backUnbacked(_asset, _backing, _fee);

    // emit event
    emit AavePortalRepayment(_transferId, _asset, _backing, _fee, msg.sender);
  }
}
