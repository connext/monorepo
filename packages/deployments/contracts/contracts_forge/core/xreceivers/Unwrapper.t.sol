// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Unwrapper, IWrapper} from "../../../contracts/core/xreceivers/Unwrapper.sol";
import {ProposedOwnable} from "../../../contracts/shared/ProposedOwnable.sol";

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
  address constant OWNER = address(666666);

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

    vm.prank(OWNER);
    unwrapper = new Unwrapper(MOCK_CONNEXT, MOCK_WRAPPER);
    assertEq(unwrapper.CONNEXT(), MOCK_CONNEXT);
    assertEq(address(unwrapper.WRAPPER()), MOCK_WRAPPER);

    vm.label(MOCK_CONNEXT, "Connext");
    vm.label(MOCK_WRAPPER, "Wrapper");
    vm.label(MOCK_ERC20, "ERC20");
    vm.label(OWNER, "owner");
    vm.label(originSender, "originSender");
    vm.label(recipient, "recipient");
    vm.label(address(unwrapper), "Unwrapper");
  }

  // ============ Utils ============
  function utils_setUpMockErc20(bool transferSuccess) internal {
    vm.mockCall(MOCK_ERC20, abi.encodeWithSelector(IERC20.transfer.selector), abi.encode(transferSuccess));
  }

  function utils_expectRecipientToReceive(
    address _recipient,
    address asset,
    uint256 amount
  ) internal {
    if (asset == address(0) || asset == MOCK_WRAPPER) {
      // Fund the target amount of ETH; our fake Wrapper contract certainly won't return any when we `withdraw`.
      vm.deal(address(unwrapper), amount);

      // vm.expectCall(_recipient, amount, abi.encode(""));

      vm.expectEmit(true, true, true, true);
      emit FundsDelivered(_recipient, address(0), amount);
    } else {
      vm.expectCall(asset, abi.encodeWithSelector(IERC20.transfer.selector, _recipient, amount));

      vm.expectEmit(true, true, true, true);
      emit FundsDelivered(_recipient, asset, amount);
    }
  }

  uint256 initialRecipientBalance;
  uint256 initialUnwrapperBalance;

  function utils_recordInitialBalances(address _recipient) internal {
    initialRecipientBalance = _recipient.balance;
    initialUnwrapperBalance = address(unwrapper).balance;
  }

  function utils_assertSentEthToRecipient(address _recipient, uint256 amount) internal {
    assertEq(
      _recipient.balance,
      initialRecipientBalance + amount,
      "recipient didn't receive ETH! did we record initial balances?"
    );

    require(
      initialUnwrapperBalance >= amount,
      "initial balance of unwrapper was less than amount... did we record initial balances?"
    );

    // Unwrapper should have been initially funded `amount` in ETH, and should have been debited all their ETH in most cases.
    assertEq(
      address(unwrapper).balance,
      initialUnwrapperBalance - amount,
      "unwrapper didn't send ETH! did we record initial balances?"
    );
  }

  // ============ Unwrapper.xReceive ============
  function test_Unwrapper__xReceive_works(uint256 amount) public {
    if (amount == 0) {
      return; // Skip 0 amount case.
    }

    address asset = MOCK_WRAPPER;
    bytes memory callData = abi.encode(recipient);

    utils_expectRecipientToReceive(recipient, asset, amount);
    utils_recordInitialBalances(recipient);

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callData);

    utils_assertSentEthToRecipient(recipient, amount);
  }

  function test_Unwrapper__xReceive_worksIfRecipientIsZero() public {
    address asset = MOCK_WRAPPER;
    uint256 amount = 10 ether;

    utils_expectRecipientToReceive(address(0), asset, amount);
    utils_recordInitialBalances(address(0));

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataNoRecipient);

    utils_assertSentEthToRecipient(address(0), amount);
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
    utils_expectRecipientToReceive(recipient, asset, amount);

    vm.prank(MOCK_CONNEXT);
    unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  }

  // function test_Unwrapper__xReceive_emitsEventIfNonWrapperAssetAndERC20TransferReverts() public {
  //   address asset = address(new RevertingERC20()); // xReceive will be getting a non-wrapper, reverting erc20 asset.
  //   uint256 amount = 10 ether;

  //   vm.expectEmit(true, true, true, true);
  //   emit WrongAsset(recipient, asset);

  //   vm.prank(MOCK_CONNEXT);
  //   unwrapper.xReceive(transferId, amount, asset, originSender, origin, callDataWithRecipient);
  // }

  // ============ Unwrapper.sweep ============
  function test_Unwrapper__sweep_shouldSendERC20ToRecipient(uint256 amount) public {
    if (amount == 0) {
      return; // Skip 0 amount case.
    }

    address asset = MOCK_ERC20;

    utils_expectRecipientToReceive(recipient, asset, amount);

    vm.prank(OWNER);
    unwrapper.sweep(recipient, asset, amount);
  }

  function test_Unwrapper__sweep_shouldSendEthToRecipient(uint256 amount) public {
    if (amount == 0) {
      return; // Skip 0 amount case.
    }

    address asset = address(0);

    utils_expectRecipientToReceive(recipient, asset, amount);
    utils_recordInitialBalances(recipient);

    vm.prank(OWNER);
    unwrapper.sweep(recipient, asset, amount);

    utils_assertSentEthToRecipient(recipient, amount);
  }

  function test_Unwrapper__sweep_failsIfNotOwner() public {
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    unwrapper.sweep(recipient, address(0), 10 ether);
  }

  // ============ Unwrapper.unwrapAndSweep ============
  function test_Unwrapper__unwrapAndSweep_works(uint256 amount) public {
    address asset = address(0);
    utils_expectRecipientToReceive(recipient, asset, amount);
    utils_recordInitialBalances(recipient);

    vm.prank(OWNER);
    unwrapper.unwrapAndSweep(recipient, amount);

    utils_assertSentEthToRecipient(recipient, amount);
  }

  function test_Unwrapper__unwrapAndSweep_failsIfNotOwner() public {
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    unwrapper.unwrapAndSweep(recipient, 10 ether);
  }
}
