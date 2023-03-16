// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ConnextPoolLiquidity} from "../../../contracts/core/xreceivers/ConnextPoolLiquidity.sol";

import "../../utils/ForgeHelper.sol";

contract ConnextPoolLiquidityTest is ForgeHelper {
  // ============ Storage ============
  address constant MOCK_CONNEXT = address(999999);
  address MOCK_WRAPPER = address(888888);
  address constant MOCK_ERC20 = address(777777);
  address constant OWNER = address(666666);

  // Arguments in tested methods.
  address constant originSender = address(111111);
  address constant recipient = address(222222);

  // Unused arguments in tested methods.
  bytes32 constant transferId = bytes32("");
  uint32 constant origin = 123456;

  // Tested contract.
  ConnextPoolLiquidity connextPoolLiquidity;

  // ============ Test set up ============
  function setUp() public {
    vm.prank(OWNER);
    connextPoolLiquidity = new ConnextPoolLiquidity(MOCK_CONNEXT);
    assertEq(address(connextPoolLiquidity.connext()), MOCK_CONNEXT);

    vm.label(MOCK_CONNEXT, "Connext");
    vm.label(MOCK_WRAPPER, "Wrapper");
    vm.label(MOCK_ERC20, "ERC20");
    vm.label(OWNER, "owner");
    vm.label(originSender, "originSender");
    vm.label(recipient, "recipient");
    vm.label(address(connextPoolLiquidity), "ConnextPoolLiquidity");
  }

  // ============ ConnextPoolLiquidity.xReceive ============

  function test_ConnextPoolLiquidity__xReceive_revertsOnZeroAmount() public {
    uint256 amount = 0;
    address asset = MOCK_ERC20;
    bytes memory callData = abi.encode(recipient);

    vm.prank(MOCK_CONNEXT);
    vm.expectRevert("!amount");
    connextPoolLiquidity.xReceive(transferId, amount, asset, originSender, origin, callData);
  }

  function test_ConnextPoolLiquidity__xReceive_revertsOnZeroAddressRecipient() public {
    uint256 amount = 1;
    address zeroRecipient = address(0);
    address asset = MOCK_ERC20;
    bytes memory callData = abi.encode(zeroRecipient);

    vm.prank(MOCK_CONNEXT);
    vm.expectRevert("!recipient");
    connextPoolLiquidity.xReceive(transferId, amount, asset, originSender, origin, callData);
  }
}
