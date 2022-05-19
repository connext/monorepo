// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {BaseConnextFacet} from "./BaseConnextFacet.sol";
import {IAavePool} from "../../interfaces/IAavePool.sol";
import {SafeERC20Upgradeable, IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

contract PortalFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error PortalFacet__setAavePortalFee_invalidFee();
  error PortalFacet__repayAavePortal_notApprovedForPortals();
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
    address _asset,
    uint256 _backingAmount,
    uint256 _feeAmount
  ) external {
    if (!s.routerPermissionInfo.approvedForPortalRouters[msg.sender])
      revert PortalFacet__repayAavePortal_notApprovedForPortals();

    uint256 totalAmount = _backingAmount + _feeAmount;
    uint256 routerBalance = s.routerBalances[msg.sender][_asset];

    if (routerBalance < totalAmount) revert PortalFacet__repayAavePortal_insufficientFunds();

    unchecked {
      s.routerBalances[msg.sender][_asset] = routerBalance - totalAmount;
    }

    SafeERC20Upgradeable.safeIncreaseAllowance(IERC20Upgradeable(_asset), s.aavePool, totalAmount);

    IAavePool(s.aavePool).backUnbacked(_asset, _backingAmount, _feeAmount);

    emit AavePortalRouterRepayment(msg.sender, _asset, _backingAmount, _feeAmount);
  }
}
