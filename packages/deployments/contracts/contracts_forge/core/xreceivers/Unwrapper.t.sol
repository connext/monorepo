// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Unwrapper, IWrapper} from "../../../contracts/core/xreceivers/Unwrapper.sol";

import "../../utils/ForgeHelper.sol";
import "../../utils/Mock.sol";

contract UnwrapperTest is ForgeHelper {
  // ============ Events ============
  event FundsDelivered(address recipient, address asset, uint256 amount);
  event WrongAsset(address recipient, address asset);

  // ============ Storage ============
  address constant MOCK_CONNEXT = address(999999);
  address constant MOCK_WRAPPER = address(888888);
  address constant MOCK_ERC20 = address(777777);

  // Arguments in tested methods.
  address constant originSender = address(111111);
  address constant recipient = address(222222);
  bytes constant callDataWithRecipient = abi.encode(recipient);
  bytes constant callDataNoRecipient = abi.encode(address(0));

  // Unused arguments in tested methods.
  bytes32 constant transferId = bytes32("");
  uint32 constant origin = 123456;

  // Tested contract.
  Unwrapper unwrapper;

  // ============ Test set up ============
  function setUp() public {
    vm.mockCall(MOCK_WRAPPER, abi.encodeWithSelector(IWrapper.withdraw.selector), abi.encode());
    vm.mockCall(MOCK_WRAPPER, abi.encodeWithSelector(IWrapper.transfer.selector), abi.encode(true));

    utils_setUpMockErc20(true); // Default transferSuccess = true.

    unwrapper = new Unwrapper(MOCK_CONNEXT, MOCK_WRAPPER);
    assertEq(unwrapper.CONNEXT(), MOCK_CONNEXT);
    assertEq(address(unwrapper.WRAPPER()), MOCK_WRAPPER);

    vm.label(MOCK_CONNEXT, "Connext");
    vm.label(MOCK_WRAPPER, "Wrapper");
    vm.label(MOCK_ERC20, "ERC20");
    vm.label(originSender, "originSender");
    vm.label(recipient, "recipient");
    vm.label(address(unwrapper), "Unwrapper");
  }

  // ============ Utils ============
  function utils_setUpMockErc20(bool transferSuccess) internal {
    vm.mockCall(MOCK_ERC20, abi.encodeWithSelector(IERC20.transfer.selector), abi.encode(transferSuccess));
  }

  // ============ Unwrapper.xReceive ============
  function test_Unwrapper__xReceive_works(uint256 amount, address recipient) public {
    address asset = MOCK_WRAPPER;
    bytes memory callData = abi.encode(recipient);

    vm.expectEmit(true, true, true, true);
    emit FundsDelivered(recipient, asset, amount);

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callData);
  }

  function test_Unwrapper__xReceive_worksIfRecipientIsZero() public {
    address asset = MOCK_WRAPPER;
    uint256 amount = 10 ether;

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataNoRecipient);
  }

  function test_Unwrapper__xReceive_failsIfNotConnext() public {
    address asset = MOCK_WRAPPER;
    uint256 amount = 10 ether;

    vm.expectRevert("unwrap: !connext");
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  }

  function test_Unwrapper__xReceive_failsIfZeroAmount() public {
    address asset = MOCK_WRAPPER;
    uint256 amount = 0;

    vm.expectRevert("unwrap: !amount");
    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  }

  function test_Unwrapper__xReceive_transfersIfNonWrapperAsset() public {
    address asset = MOCK_ERC20; // xReceive will be getting a random non-wrapper erc20 asset.
    uint256 amount = 10 ether;

    // Should transfer the non-wrapper ERC20 to the intended recipient!
    vm.expectCall(MOCK_ERC20, abi.encodeWithSelector(IERC20.transfer.selector, recipient, amount));

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  }

  function test_Unwrapper__xReceive_emitsEventIfNonWrapperAssetAndERC20TransferReverts() public {
    address asset = address(new RevertingERC20()); // xReceive will be getting a non-wrapper, reverting erc20 asset.
    uint256 amount = 10 ether;

    vm.expectEmit(true, true, true, true);
    emit WrongAsset(recipient, asset);

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  }
}
