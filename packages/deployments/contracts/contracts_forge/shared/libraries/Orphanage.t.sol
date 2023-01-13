// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Orphanage} from "../../../contracts/shared/libraries/Orphanage.sol";

import "../../utils/ForgeHelper.sol";
import "../../utils/Mock.sol";

contract OrphanageTest is Orphanage, ForgeHelper {
  // ============ Storage ============
  address constant MOCK_ERC20 = address(777777);

  // ============ Utils ============
  function utils_setUpMockErc20() public {
    vm.mockCall(MOCK_ERC20, abi.encodeWithSelector(IERC20.transfer.selector), abi.encode(true));
  }

  // ============ Orphanage.checkOrphans ============
  function test_Orphanage__checkOrphans_checkNativeWorks() public {
    address parent = address(123);
    uint256 amount = 10 ether;

    orphanedNativeTokens[parent] = amount;
    vm.prank(parent);
    uint256 result = this.checkOrphans(address(0));
    assertEq(result, amount);
  }

  function test_Orphanage__checkOrphans_checkErc20Works() public {
    address parent = address(123);
    uint256 amount = 10 ether;

    orphanedTokens[parent][MOCK_ERC20] = amount;
    vm.prank(parent);
    uint256 result = this.checkOrphans(MOCK_ERC20);
    assertEq(result, amount);
  }

  function test_Orphanage__checkOrphans_nativeStartsEmpty(address parent) public {
    vm.prank(parent);
    // Native orphaned tokens should NOT be pre-populated for any address.
    uint256 result = this.checkOrphans(address(0));
    assertEq(result, 0);
  }

  function test_Orphanage__checkOrphans_erc20sStartEmpty(address parent, address token) public {
    vm.prank(parent);
    // ERC20 orphaned tokens should NOT be pre-populated for any address.
    uint256 result = this.checkOrphans(MOCK_ERC20);
    assertEq(result, 0);
  }

  // ============ Orphanage.saveOrphans ============
  function test_Orphanage__saveOrphans_nativeWorks() public {
    address parent = address(123);
    uint256 amount = 10 ether;

    orphanedNativeTokens[parent] = amount;

    vm.expectEmit(true, true, true, true);
    emit SavedOrphans(address(0), amount, parent);

    vm.prank(parent);
    this.saveOrphans(address(0));

    // Orphans should have been transferred to the parent address.
    assertEq(parent.balance, amount);
    assertEq(orphanedNativeTokens[parent], 0);
  }

  function test_Orphanage__saveOrphans_erc20Works() public {
    utils_setUpMockErc20();

    address parent = address(123);
    uint256 amount = 10 ether;

    orphanedTokens[parent][MOCK_ERC20] = amount;

    vm.expectEmit(true, true, true, true);
    emit SavedOrphans(MOCK_ERC20, amount, parent);

    // Should call ERC20.transfer.
    vm.expectCall(MOCK_ERC20, abi.encodeWithSelector(IERC20.transfer.selector, parent, amount));

    vm.prank(parent);
    this.saveOrphans(MOCK_ERC20);

    assertEq(orphanedTokens[parent][MOCK_ERC20], 0);
  }

  function test_Orphanage__saveOrphans_nativeFailsIfAccountEmpty() public {
    address parent = address(123);
    uint256 amount = 10 ether;

    vm.expectRevert("orphanage: !orphans");
    vm.prank(parent);
    this.saveOrphans(address(0));
  }

  function test_Orphanage__saveOrphans_erc20FailsIfAccountEmpty() public {
    address parent = address(123);
    uint256 amount = 10 ether;

    vm.expectRevert("orphanage: !orphans");
    vm.prank(parent);
    this.saveOrphans(MOCK_ERC20);
  }

  // function test_Orphanage__saveOrphans_nativeFailsIfNotSent() public {
  //   address parent = address(123);
  //   uint256 amount = 10 ether;

  //   vm.expectRevert("orphanage: !sent");
  //   vm.prank(parent);
  //   this.saveOrphans(address(0));
  // }

  // ============ Orphanage.orphan ============
  function test_Orphanage__orphan_nativeWorks() public {
    address parent = address(123);
    uint256 firstAmount = 9.3 ether;
    bytes memory reason = bytes("voldemort");

    vm.expectEmit(true, true, true, true);
    emit OrphanedNativeTokens(firstAmount, parent, reason);

    orphan(address(0), firstAmount, parent, reason);
    assertEq(orphanedNativeTokens[parent], firstAmount);

    // Should add a second amount if we orphan twice for the same parent!
    uint256 secondAmount = 4.6 ether;

    vm.expectEmit(true, true, true, true);
    emit OrphanedNativeTokens(secondAmount, parent, reason);

    orphan(address(0), secondAmount, parent, reason);
    // Should have added the amounts:
    assertEq(orphanedNativeTokens[parent], firstAmount + secondAmount);
  }

  function test_Orphanage__orphan_erc20Works() public {
    address parent = address(123);
    uint256 firstAmount = 4.2 ether;
    bytes memory reason = bytes("a series of unfortunate events");

    vm.expectEmit(true, true, true, true);
    emit OrphanedTokens(MOCK_ERC20, firstAmount, parent, reason);

    orphan(MOCK_ERC20, firstAmount, parent, reason);
    assertEq(orphanedTokens[parent][MOCK_ERC20], firstAmount);

    // Should add a second amount if we orphan twice for the same parent/token!
    uint256 secondAmount = 1.7 ether;

    vm.expectEmit(true, true, true, true);
    emit OrphanedTokens(MOCK_ERC20, secondAmount, parent, reason);

    orphan(MOCK_ERC20, secondAmount, parent, reason);
    // Should have added the amounts:
    assertEq(orphanedTokens[parent][MOCK_ERC20], firstAmount + secondAmount);
  }

  function test_Orphanage__orphan_failsIfZeroAmount() public {
    address parent = address(123);
    bytes memory reason = bytes("red room");

    vm.expectRevert("orphanage: !orphans");
    orphan(address(0), 0, parent, reason);
  }

  function test_Orphanage__orphan_failsIfNoParent() public {
    address parent = address(0); // Parent address does not exist.
    bytes memory reason = bytes("batman");

    vm.expectRevert("orphanage: !parent");
    orphan(address(0), 10 ether, parent, reason);
  }
}
