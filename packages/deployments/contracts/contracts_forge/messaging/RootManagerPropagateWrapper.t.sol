// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {RootManagerPropagateWrapper} from "../../contracts/messaging/RootManagerPropagateWrapper.sol";
import {RootManager} from "../../contracts/messaging/RootManager.sol";

import "../utils/ConnectorHelper.sol";

contract RootManagerPropagateWrapperTest is ForgeHelper {
  // ============ Errors ============
  error ProposedOwnable__onlyOwner_notOwner();

  // ============ Events ============
  event FundsReceived(uint256 amount, uint256 balance);

  event FundsDeducted(uint256 amount, uint256 balance);

  event RootManagerChanged(address rootManager, address oldRootManager);

  // ============ Storage ============
  RootManagerPropagateWrapper rootManagerWrapper;

  address payable rootManager = payable(address(2));

  function setUp() public {
    vm.expectEmit(true, true, true, true);
    emit RootManagerChanged(rootManager, address(0));
    rootManagerWrapper = new RootManagerPropagateWrapper(rootManager);

    vm.expectEmit(true, true, true, true);
    emit FundsReceived(0.1 ether, 0.1 ether);

    address alice = address(1);
    vm.deal(alice, 1 ether);
    vm.prank(alice);
    payable(address(rootManagerWrapper)).transfer(0.1 ether);
  }

  // ============ RootManagerPropagateWrapper.setRootManager ============
  function test_RootManagerPropagateWrapper__setRootManager_shouldFailIfNotOwner(address caller) public {
    address owner = rootManagerWrapper.owner();
    if (caller == owner) {
      return;
    }

    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);
    vm.prank(caller);
    rootManagerWrapper.setRootManager(address(42));
  }

  function test_RootManagerPropagateWrapper_setRootManager__shouldWork() public {
    vm.expectEmit(true, true, true, true);
    emit RootManagerChanged(address(42), rootManager);

    address owner = rootManagerWrapper.owner();
    vm.prank(owner);
    rootManagerWrapper.setRootManager(address(42));
  }

  // ============ RootManagerPropagateWrapper.fallback ============
  function test_RootManagerPropagateWrapper_propagate__shouldWork() public {
    address[] memory _connectors = new address[](3);
    uint256[] memory _fees = new uint256[](3);
    bytes[] memory _encodedData = new bytes[](3);

    _connectors[0] = address(1000);
    _fees[0] = 0.04 ether;
    _encodedData[0] = abi.encode("hello");

    _connectors[1] = address(1001);
    _fees[1] = 0.05 ether;
    _encodedData[1] = bytes(abi.encode("world"));

    _connectors[2] = address(1002);
    _fees[2] = 0;
    _encodedData[2] = bytes("");

    vm.expectEmit(true, true, true, true);
    emit FundsDeducted(0.09 ether, 0.01 ether);

    emit log_named_address("rootManager", address(rootManagerWrapper.rootManager()));

    vm.mockCall(
      address(rootManager),
      0.09 ether,
      abi.encodeWithSelector(RootManager(rootManager).propagate.selector),
      abi.encode()
    );

    vm.expectCall(
      address(rootManager),
      0.09 ether,
      abi.encodeWithSelector(RootManager(rootManager).propagate.selector, _connectors, _fees, _encodedData)
    );

    rootManagerWrapper.propagate(_connectors, _fees, _encodedData);
  }
}
