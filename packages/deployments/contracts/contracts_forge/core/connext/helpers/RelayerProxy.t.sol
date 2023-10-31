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

  event ConnextChanged(address updated, address previous);
  event SpokeConnectorChanged(address updated, address previous);
  event RelayerChanged(address updated, address previous);
  event FeeCollectorChanged(address updated, address previous);

  // ============ Storage ============
  address _connext = address(12312);
  address _spokeConnector = address(12321222);
  address _gelatoRelayer = address(123444412);
  address _feeCollector = address(12335555);
  address _keep3r = address(12335556);
  uint256 _proposeAggregateRootCooldown = 1000;

  RelayerProxy proxy;

  // ============ Setup ============
  function setUp() public {
    utils_deployAndAssert();
  }

  function utils_deployAndAssert() public {
    vm.expectEmit(true, true, true, true);
    emit ConnextChanged(_connext, address(0));

    vm.expectEmit(true, true, true, true);
    emit SpokeConnectorChanged(_spokeConnector, address(0));

    vm.expectEmit(true, true, true, true);
    emit FeeCollectorChanged(_feeCollector, address(0));

    vm.expectEmit(true, true, true, true);
    emit RelayerAdded(_gelatoRelayer);

    RelayerProxy.ConstructorParams memory _constructorParams = RelayerProxy.ConstructorParams({
      connext: _connext,
      spokeConnector: _spokeConnector,
      gelatoRelayer: _gelatoRelayer,
      feeCollector: _feeCollector,
      keep3r: _keep3r,
      proposeAggregateRootCooldown: _proposeAggregateRootCooldown
    });

    proxy = new RelayerProxy(_constructorParams);
  }

  function test_RelayerProxy__deploy_works() public {
    assertEq(address(proxy.connext()), _connext);
    assertEq(address(proxy.spokeConnector()), _spokeConnector);
    assertEq(proxy.gelatoRelayer(), _gelatoRelayer);
    assertEq(proxy.feeCollector(), _feeCollector);
  }
}
