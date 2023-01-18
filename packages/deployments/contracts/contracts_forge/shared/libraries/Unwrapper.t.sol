// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Unwrapper, IWrapper} from "../../../contracts/shared/libraries/Unwrapper.sol";
import {Orphanage} from "../../../contracts/shared/libraries/Orphanage.sol";

import "../../utils/ForgeHelper.sol";
import "../../utils/Mock.sol";

contract UnwrapperTest is ForgeHelper {
  // ============ Events ============

  event UnwrappingFailed(address recipient, bytes reason);
  event SendUnwrappedFailed(address recipient, bytes reason);
  event TransferWrappedFailed(address recipient, bytes reason);
  event WrongAsset(address recipient, address asset, bytes reason);

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
  function test_Unwrapper__xReceive_works() public {
    address asset = MOCK_WRAPPER;
    uint256 amount = 10 ether;

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
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

  function test_Unwrapper__xReceive_emitsEventIfNonWrapperAssetAndERC20TransferFails() public {
    utils_setUpMockErc20(false);
    address asset = MOCK_ERC20; // xReceive will be getting a random non-wrapper erc20 asset.
    uint256 amount = 10 ether;

    vm.expectEmit(true, true, true, true);
    emit WrongAsset(recipient, asset, "wrong asset used for unwrap and fallback transfer failed");

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  }

  function test_Unwrapper__xReceive_emitsEventIfNonWrapperAssetAndERC20TransferReverts() public {
    address asset = address(new RevertingERC20()); // xReceive will be getting a non-wrapper, reverting erc20 asset.
    uint256 amount = 10 ether;

    vm.expectEmit(true, true, true, true);
    emit WrongAsset(recipient, asset, abi.encodeWithSignature("Error(string)", "test transfer error"));

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  }

  function test_Unwrapper__xReceive_orphansIfWithdrawRevertsAndTransferWETHReverts() public {
    address asset = address(new RevertingERC20()); // xReceive will be getting an asset that reverts on `withdraw` and `transfer`.
    unwrapper = new Unwrapper(MOCK_CONNEXT, asset); // set the asset as the target wrapper asset
    uint256 amount = 10 ether;

    vm.expectEmit(true, true, true, true);
    emit UnwrappingFailed(recipient, abi.encodeWithSignature("Error(string)", "test withdraw error"));
    emit TransferWrappedFailed(recipient, abi.encodeWithSignature("Error(string)", "test transfer error"));

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  }

  function test_Unwrapper__xReceive_orphansIfWithdrawRevertsAndTransferWETHFails() public {
    address asset = address(new RevertingERC20()); // xReceive will be getting an asset that reverts on `withdraw` and `transfer`.
    unwrapper = new Unwrapper(MOCK_CONNEXT, asset); // set the asset as the target wrapper asset
    uint256 amount = 10 ether;

    // Make the transfer fail, not revert
    vm.mockCall(asset, abi.encodeWithSelector(IWrapper.transfer.selector), abi.encode(false));

    vm.expectEmit(true, true, true, true);
    emit UnwrappingFailed(recipient, abi.encodeWithSignature("Error(string)", "test withdraw error"));
    emit TransferWrappedFailed(recipient, abi.encodeWithSignature("fallback transfer of wrapped asset failed"));

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  }

  function test_Unwrapper__xReceive_emitsEventifWithdrawSucceedsAndSendETHFails() public {
    address asset = MOCK_WRAPPER;
    uint256 amount = 10 ether;

    vm.expectEmit(true, true, true, true);
    emit SendUnwrappedFailed(recipient, "unwrap succeeded but sending unwrapped asset to recipient failed");

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  }
}
