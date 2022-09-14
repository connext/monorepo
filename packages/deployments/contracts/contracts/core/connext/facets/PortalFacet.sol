// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {SafeERC20Upgradeable, IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

import {IAavePool} from "../interfaces/IAavePool.sol";

import {AssetLogic} from "../libraries/AssetLogic.sol";
import {TokenId, CallParams, TransferIdGenerationInformation} from "../libraries/LibConnextStorage.sol";

contract PortalFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error PortalFacet__setAavePortalFee_invalidFee();
  error PortalFacet__repayAavePortal_insufficientFunds();
  error PortalFacet__repayAavePortal_swapFailed();
  error PortalFacet__repayAavePortalFor_notSupportedAsset();
  error PortalFacet__repayAavePortalFor_zeroAmount();

  // ============ Events ============

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
  function setAavePool(address _aavePool) external onlyOwner {
    s.aavePool = _aavePool;
  }

  /**
   * @notice Sets the Aave Portal fee numerator
   * @param _aavePortalFeeNumerator The new value for the Aave Portal fee numerator
   */
  function setAavePortalFee(uint256 _aavePortalFeeNumerator) external onlyOwner {
    if (_aavePortalFeeNumerator > BPS_FEE_DENOMINATOR) revert PortalFacet__setAavePortalFee_invalidFee();

    s.aavePortalFeeNumerator = _aavePortalFeeNumerator;
  }

  /**
   * @notice Used by routers to perform a manual repayment to Aave Portals to cover any outstanding debt
   * @dev The router must be approved for portal and with enough liquidity, and must be the caller of this
   * function
   * @param _backingAmount The principle to be paid (in adopted asset)
   * @param _feeAmount The fee to be paid (in adopted asset)
   * @param _maxIn The max value of the local asset to swap for the _backingAmount of adopted asset
   */
  function repayAavePortal(
    CallParams calldata _params,
    TransferIdGenerationInformation calldata _idInfo,
    uint256 _backingAmount,
    uint256 _feeAmount,
    uint256 _maxIn
  ) external nonReentrant {
    address local = s.tokenRegistry.getLocalAddress(_idInfo.canonicalDomain, _idInfo.canonicalId);

    // Sanity check: has that much to spend
    if (s.routerBalances[msg.sender][local] < _maxIn) revert PortalFacet__repayAavePortal_insufficientFunds();

    // Here, generate the transfer id. This allows us to ensure the `_local` asset
    // is the correct one associated with the transfer. Otherwise, anyone could pay back
    // the loan with the incorrect asset and remove the ability to transfer here. If the
    // `_local` asset is incorrectly supplied, the generated transferId will also be
    // incorrect, and the _backLoan call (which manipulates the debt stored) will fail.
    // Another option is to store the asset associated with the transfer on `execute`, but
    // this would make an already expensive call even more so.
    bytes32 transferId = _calculateTransferId(
      _params,
      _idInfo.normalizedIn,
      _idInfo.bridgedAmt,
      _idInfo.nonce,
      _idInfo.canonicalId,
      _idInfo.canonicalDomain,
      _idInfo.originSender
    );

    // Need to swap into adopted asset or asset that was backing the loan
    // The router will always be holding collateral in the local asset while the loaned asset
    // is the adopted asset

    // Swap for exact `totalRepayAmount` of adopted asset to repay aave
    (bool success, uint256 amountDebited, address assetLoaned) = AssetLogic.swapFromLocalAssetIfNeededForExactOut(
      _calculateCanonicalHash(_idInfo.canonicalId, _idInfo.canonicalDomain),
      local,
      _backingAmount + _feeAmount,
      _maxIn
    );

    if (!success) revert PortalFacet__repayAavePortal_swapFailed();

    // decrement router balances
    s.routerBalances[msg.sender][local] -= amountDebited;

    // back loan
    _backLoan(assetLoaned, _backingAmount, _feeAmount, transferId);
  }

  /**
   * @notice This allows anyone to repay the portal in the adopted asset for a given router
   * and transfer
   *
   * @dev Should always be paying in the backing asset for the aave loan
   *
   * @param _params CallParams associated with the transfer
   * @param _adopted Address of the adopted asset (asset backing the loan)
   * @param _originSender Original msg.sender of xcall on origin chain
   * @param _normalizedIn - The amount the user sent in on `xcall`, normalized to 18 decimals
   * @param _bridgedAmt Amount bridged during transfer
   * @param _nonce The nonce for the transfer
   * @param _backingAmount Amount of principle to repay
   * @param _feeAmount Amount of fees to repay
   */
  function repayAavePortalFor(
    CallParams calldata _params,
    address _adopted,
    address _originSender,
    uint256 _normalizedIn,
    uint256 _bridgedAmt,
    uint256 _nonce,
    uint256 _backingAmount,
    uint256 _feeAmount
  ) external payable nonReentrant {
    // Ensure the asset is whitelisted
    TokenId memory canonical = s.adoptedToCanonical[_adopted];
    if (canonical.id == bytes32(0)) {
      revert PortalFacet__repayAavePortalFor_notSupportedAsset();
    }

    // Here, generate the transfer id. This allows us to ensure the `_adopted` asset
    // is the correct one associated with the transfer. Otherwise, anyone could pay back
    // the loan with the incorrect asset and remove the ability to transfer here. If the
    // `_adopted` asset is incorrectly supplied, the generated transferId will also be
    // incorrect, and the _backLoan call (which manipulates the debt stored) will fail.
    // Another option is to store the asset associated with the transfer on `execute`, but
    // this would make an already expensive call even more so.
    bytes32 transferId = _calculateTransferId(
      _params,
      _normalizedIn,
      _bridgedAmt,
      _nonce,
      canonical.id,
      canonical.domain,
      _originSender
    );

    // Transfer funds to the contract
    uint256 total = _backingAmount + _feeAmount;
    if (total == 0) revert PortalFacet__repayAavePortalFor_zeroAmount();

    AssetLogic.handleIncomingAsset(_adopted, total);

    // No need to swap because this is the adopted asset. Simply
    // repay the loan
    _backLoan(_adopted, _backingAmount, _feeAmount, transferId);
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

    // increase allowance
    SafeERC20Upgradeable.safeApprove(IERC20Upgradeable(_asset), s.aavePool, 0);
    SafeERC20Upgradeable.safeIncreaseAllowance(IERC20Upgradeable(_asset), s.aavePool, _backing + _fee);

    // back loan
    IAavePool(s.aavePool).backUnbacked(_asset, _backing, _fee);

    // emit event
    emit AavePortalRepayment(_transferId, _asset, _backing, _fee, msg.sender);
  }
}
