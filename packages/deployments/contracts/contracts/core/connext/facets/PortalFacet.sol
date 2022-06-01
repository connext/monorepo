// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {BaseConnextFacet} from "./BaseConnextFacet.sol";
import {IAavePool} from "../interfaces/IAavePool.sol";
import {AssetLogic} from "../libraries/AssetLogic.sol";
import {SafeERC20Upgradeable, IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

contract PortalFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error PortalFacet__setAavePortalFee_invalidFee();
  error PortalFacet__repayAavePortal_insufficientFunds();

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

  function getAavePortalsTransfers(bytes32 _transferId) external view returns (uint256) {
    return s.aavePortalsTransfers[_transferId];
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
   * @dev The router must be approved for Portal and with enough liquidity
   */
  function repayAavePortal(
    address _local,
    uint256 _backingAmount,
    uint256 _feeAmount
  ) external {
    uint256 totalAmount = _backingAmount + _feeAmount; // in adopted
    uint256 routerBalance = s.routerBalances[msg.sender][_local]; // in local

    // Need to swap into adopted asset or asset that was backing the loan
    // The router will always be holding collateral in the local asset while the loaned asset
    // is the adopted asset
    (uint256 balanceInAdopted, address adopted) = AssetLogic.calculateSwapFromLocalAssetIfNeeded(_local, routerBalance);

    if (balanceInAdopted < totalAmount) revert PortalFacet__repayAavePortal_insufficientFunds();

    // Swap for exact `totalRepayAmount` of adopted asset to repay aave
    (uint256 amountIn, ) = AssetLogic.swapFromLocalAssetIfNeededForExactOut(_local, totalAmount);

    // decrement router balances
    unchecked {
      s.routerBalances[msg.sender][_local] = routerBalance - amountIn;
    }

    // back loan
    SafeERC20Upgradeable.safeIncreaseAllowance(IERC20Upgradeable(adopted), s.aavePool, totalAmount);

    IAavePool(s.aavePool).backUnbacked(adopted, _backingAmount, _feeAmount);

    emit AavePortalRouterRepayment(msg.sender, adopted, _backingAmount, _feeAmount);
  }
}
