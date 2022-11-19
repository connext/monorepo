// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../../utils/ForgeHelper.sol";
import "../../../../contracts/core/connext/helpers/RelayerProxy.sol";

contract RelayerProxyTest is ForgeHelper {
  // ============ Events ============
  event FundsReceived(uint256 amount, uint256 balance);

  event FundsDeducted(uint256 amount, uint256 balance);

  event RelayerAdded(address relayer);

  event RelayerRemoved(address relayer);

  event Setup(address connext, address spokeConnector);
  event ConnextChanged(address updated, address previous);
  event SpokeConnectorChanged(address updated, address previous);
  event RelayerChanged(address updated, address previous);

  // ============ Storage ============
  address _connext = address(12312);
  address _spokeConnector = address(12321222);
  address _gelatoRelayer = address(123444412);

  RelayerProxy proxy;

  // ============ Setup ============
  function setUp() public {
    utils_deployAndAssert();
  }

  function utils_deployAndAssert() public {
    vm.expectEmit(true, true, true, true);
    emit RelayerChanged(_gelatoRelayer, address(0));

    vm.expectEmit(true, true, true, true);
    emit SpokeConnectorChanged(_spokeConnector, address(0));

    vm.expectEmit(true, true, true, true);
    emit ConnextChanged(_connext, address(0));

    vm.expectEmit(true, true, true, true);
    emit RelayerAdded(_gelatoRelayer);

    proxy = new RelayerProxy(_connext, _spokeConnector, _gelatoRelayer);
  }

  function test_RelayerProxy__deploy_works() public {
    utils_deployAndAssert();
  }
}
