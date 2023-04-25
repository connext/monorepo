// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../../utils/ForgeHelper.sol";
import "../../../../contracts/core/connext/helpers/RelayerProxyHub.sol";

contract RelayerProxyHubTest is ForgeHelper {
  // ============ Events ============
  event RootManagerChanged(address rootManager, address oldRootManager);
  event PropagateCooldownChanged(uint256 propagateCooldown, uint256 oldPropagateCooldown);
  event HubConnectorChanged(address hubConnector, address oldHubConnector, uint32 chain);

  // ============ Storage ============
  address _connext = address(12312);
  address _spokeConnector = address(12321222);
  address _gelatoRelayer = address(123444412);
  address _feeCollector = address(12335555);
  address _keep3r = address(12335556);
  address _rootManager = address(12312);
  uint256 _propagateCooldown = 12321222;
  address _hubConnector = address(123444412);
  uint32 _chain = 123;

  RelayerProxyHub proxy;

  // ============ Setup ============
  function setUp() public {
    utils_deployAndAssert();
  }

  // ============ Utils ============
  function utils_deployAndAssert() public {
    vm.expectEmit(true, true, true, true);
    emit RootManagerChanged(_rootManager, address(0));

    vm.expectEmit(true, true, true, true);
    emit PropagateCooldownChanged(_propagateCooldown, 0);

    vm.expectEmit(true, true, true, true);
    emit HubConnectorChanged(_hubConnector, address(0), _chain);

    address[] memory connectors = new address[](1);
    connectors[0] = _hubConnector;
    uint32[] memory chains = new uint32[](1);
    chains[0] = _chain;

    proxy = new RelayerProxyHub(
      _connext,
      _spokeConnector,
      _gelatoRelayer,
      _feeCollector,
      _keep3r,
      _rootManager,
      _propagateCooldown,
      connectors,
      chains
    );
  }

  // ============ Tests ============
  function test_RelayerProxyHub__propagateKeep3r_works() public {
    assertEq(address(proxy.rootManager()), _rootManager);
  }
}
