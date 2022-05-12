// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {BaseConnextFacet} from "./BaseConnextFacet.sol";
import {IAavePool} from "../../interfaces/IAavePool.sol";
import {SafeERC20Upgradeable, IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

contract PortalFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error PortalFacet__approveRouterForPortal_notRouter();
  error PortalFacet__approveRouterForPortal_alreadyApproved();
  error PortalFacet__disapproveRouterForPortal_notApproved();
  error PortalFacet__setAavePortalFee_invalidFee();
  error PortalFacet__repayAavePortal_notApprovedForPortals();
  error PortalFacet__repayAavePortal_insufficientFunds();

  // ============ Events ============

  /**
   * @notice Emitted when a router is approved for Portal
   * @param router - The address of the approved router
   * @param caller - The account that called the function
   */
  event RouterApprovedForPortal(address router, address caller);

  /**
   * @notice Emitted when a router is disapproved for Portal
   * @param router - The address of the disapproved router
   * @param caller - The account that called the function
   */
  event RouterDisapprovedForPortal(address router, address caller);

  /**
   * @notice Emitted when a router executed a manual repayment to Aave Portal
   * @param router - The router that execute the repayment
   * @param asset - The asset that was repaid
   * @param amount - The amount that was repaid
   * @param fee - The fee amount that was repaid
   */
  event AavePortalRouterRepayment(address indexed router, address asset, uint256 amount, uint256 fee);

  // ============ Getters methods ==============

  /**
   * @notice Returns whether the router is approved for portals or not
   * @param _router The relevant router address
   */
  function getRouterApprovalForPortal(address _router) external view returns (bool) {
    return s.routerPermissionInfo.approvedForPortalRouters[_router];
  }

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
   * @notice Allow router to use Portals
   * @param _router - The router address to approve
   */
  function approveRouterForPortal(address _router) external onlyOwner {
    if (!s.routerPermissionInfo.approvedRouters[_router]) revert PortalFacet__approveRouterForPortal_notRouter();
    if (s.routerPermissionInfo.approvedForPortalRouters[_router])
      revert PortalFacet__approveRouterForPortal_alreadyApproved();

    s.routerPermissionInfo.approvedForPortalRouters[_router] = true;

    emit RouterApprovedForPortal(_router, msg.sender);
  }

  /**
   * @notice Remove router access to use Portals
   * @param _router - The router address to remove approval
   */
  function disapproveRouterForPortal(address _router) external onlyOwner {
    if (!s.routerPermissionInfo.approvedForPortalRouters[_router])
      revert PortalFacet__disapproveRouterForPortal_notApproved();

    s.routerPermissionInfo.approvedForPortalRouters[_router] = false;

    emit RouterDisapprovedForPortal(_router, msg.sender);
  }

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
