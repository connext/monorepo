// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {SafeERC20Upgradeable, IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

import {IAavePool} from "../interfaces/IAavePool.sol";

import {AssetLogic} from "../libraries/AssetLogic.sol";
import {ConnextMessage} from "../libraries/ConnextMessage.sol";

contract PortalFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error PortalFacet__setAavePortalFee_invalidFee();
  error PortalFacet__repayAavePortal_insufficientFunds();
  error PortalFacet__repayAavePortal_swapFailed();
  error PortalFacet__repayAavePortalFor_notSupportedAsset();
  error PortalFacet__repayAavePortalFor_zeroAmount();

  // ============ Events ============

  /**
   * @notice Emitted when a router executed a manual repayment to Aave Portal
   * @param router - The router that execute the repayment
   * @param asset - The asset that was repaid
   * @param amount - The amount that was repaid
   * @param fee - The fee amount that was repaid
   */
  event AavePortalRouterRepayment(address indexed router, address asset, uint256 amount, uint256 fee);

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
    if (_aavePortalFeeNumerator > s.LIQUIDITY_FEE_DENOMINATOR) revert PortalFacet__setAavePortalFee_invalidFee();

    s.aavePortalFeeNumerator = _aavePortalFeeNumerator;
  }

  /**
   * @notice Used by routers to perform a manual repayment to Aave Portals to cover any outstanding debt
   * @dev The router must be approved for portal and with enough liquidity, and must be the caller of this
   * function
   * @param _local The local asset (what router stores liquidity in)
   * @param _backingAmount The principle to be paid (in adopted asset)
   * @param _feeAmount The fee to be paid (in adopted asset)
   * @param _maxIn The max value of the local asset to swap for the _backingAmount of adopted asset
   */
  function repayAavePortal(
    address _local,
    uint256 _backingAmount,
    uint256 _feeAmount,
    uint256 _maxIn,
    bytes32 _transferId
  ) external {
    uint256 totalAmount = _backingAmount + _feeAmount; // in adopted
    uint256 routerBalance = s.routerBalances[msg.sender][_local]; // in local

    // Sanity check: has that much to spend
    if (routerBalance < _maxIn) revert PortalFacet__repayAavePortal_insufficientFunds();

    // Need to swap into adopted asset or asset that was backing the loan
    // The router will always be holding collateral in the local asset while the loaned asset
    // is the adopted asset

    // Swap for exact `totalRepayAmount` of adopted asset to repay aave
    (, bytes32 id) = s.tokenRegistry.getTokenId(_local);
    (bool success, uint256 amountIn, address adopted) = AssetLogic.swapFromLocalAssetIfNeededForExactOut(
      id,
      _local,
      totalAmount,
      _maxIn
    );

    if (!success) revert PortalFacet__repayAavePortal_swapFailed();

    // decrement router balances
    s.routerBalances[msg.sender][_local] -= amountIn;

    // back loan
    _backLoan(adopted, _backingAmount, _feeAmount, _transferId);
  }

  /**
   * @notice This allows anyone to repay the portal in the adopted asset for a given router
   * and transfer
   * @dev Should always be paying in the backing asset for the aave loan
   * @param _adopted Address of the adopted asset (asset backing the loan)
   * @param _backingAmount Amount of principle to repay
   * @param _feeAmount Amount of fees to repay
   * @param _transferId Corresponding transfer id for the fees
   */
  function repayAavePortalFor(
    address _adopted,
    uint256 _backingAmount,
    uint256 _feeAmount,
    bytes32 _transferId
  ) external payable {
    address adopted = _adopted == address(0) ? address(s.wrapper) : _adopted;
    // Ensure the asset is whitelisted
    ConnextMessage.TokenId memory canonical = s.adoptedToCanonical[adopted];
    if (canonical.id == bytes32(0)) {
      revert PortalFacet__repayAavePortalFor_notSupportedAsset();
    }

    // Transfer funds to the contract
    uint256 total = _backingAmount + _feeAmount;
    if (total == 0) revert PortalFacet__repayAavePortalFor_zeroAmount();

    (, uint256 amount) = AssetLogic.handleIncomingAsset(_adopted, total, 0);

    // If this was a fee on transfer token, reduce the total
    if (amount < total) {
      uint256 missing;
      unchecked {
        missing = total - amount;
      }
      if (missing < _feeAmount) {
        // Debit fee amount
        unchecked {
          _feeAmount -= missing;
        }
      } else {
        // Debit backing amount
        unchecked {
          missing -= _feeAmount;
        }
        _feeAmount = 0;
        _backingAmount -= missing;
      }
    }

    // No need to swap because this is the adopted asset. Simply
    // repay the loan
    _backLoan(adopted, _backingAmount, _feeAmount, _transferId);
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
    SafeERC20Upgradeable.safeIncreaseAllowance(IERC20Upgradeable(_asset), s.aavePool, _backing + _fee);

    // back loan
    IAavePool(s.aavePool).backUnbacked(_asset, _backing, _fee);

    // emit event
    emit AavePortalRouterRepayment(msg.sender, _asset, _backing, _fee);
  }
}
