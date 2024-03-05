// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Conductor} from "../../contracts/messaging/Conductor.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";

import "../utils/ConnectorHelper.sol";

contract Helper {
  uint256 public callCount;

  function executeCalldata(address addr, uint256 amt) public {
    console.log("Helper.executeCalldata", addr, amt);
    callCount++;
  }

  function fail() public pure {
    revert("fail");
  }
}

contract ConductorTest is ForgeHelper {
  // ============ Storage ============
  Helper helper;
  Conductor conductor;

  // ============ Events ============

  event BypassAdded(address target, bytes4 selector);
  event BypassRemoved(address target, bytes4 selector);
  event Queued(bytes32 indexed key, uint256 elapse, bytes[] transactions);
  event Dequeued(bytes32 indexed key, bytes[] transactions);
  event Executed(bytes32 indexed key, bytes[] transactions);

  // ============ Setup ============
  function setUp() public {
    helper = new Helper();

    conductor = new Conductor(address(this));
  }

  // ============ Utils ============
  function formatHelperTransaction(address to, uint256 amount) internal view returns (bytes memory) {
    bytes memory data = abi.encodeWithSignature("executeCalldata(address,uint256)", to, amount);
    return abi.encode(Conductor.Transaction(address(helper), 0, data));
  }

  function formatAddBypassTransaction(address target, bytes4 selector) internal view returns (bytes memory) {
    bytes memory data = abi.encodeWithSignature("addBypass(address,bytes4)", target, selector);
    return abi.encode(Conductor.Transaction(address(conductor), 0, data));
  }

  function formatRemoveBypassTransaction(address target, bytes4 selector) internal view returns (bytes memory) {
    bytes memory data = abi.encodeWithSignature("removeBypass(address,bytes4)", target, selector);
    return abi.encode(Conductor.Transaction(address(conductor), 0, data));
  }

  function formatFailingTransaction() internal view returns (bytes memory) {
    bytes memory data = abi.encodeWithSignature("fail()");
    return abi.encode(Conductor.Transaction(address(helper), 0, data));
  }

  function utils_addBypass(address _target, bytes4 _selector) internal returns (bytes32) {
    bytes[] memory transactions = new bytes[](1);
    transactions[0] = formatAddBypassTransaction(_target, _selector);
    bytes32 proposalKey = utils_queue(transactions);

    vm.warp(conductor.proposals(proposalKey) + 100);

    vm.expectEmit(true, true, true, true);
    emit BypassAdded(_target, _selector);

    vm.expectEmit(true, true, true, true);
    emit Executed(proposalKey, transactions);

    conductor.execute(transactions);

    bytes32 key = keccak256(abi.encodePacked(_target, _selector));
    assertTrue(conductor.bypassDelay(key));
    return key;
  }

  function utils_queue(bytes[] memory transactions) internal returns (bytes32) {
    bytes32 key = keccak256(abi.encode(transactions));
    uint256 elapse = block.timestamp + conductor.delay();

    vm.expectEmit(true, true, true, true);
    emit Queued(key, elapse, transactions);

    conductor.queue(transactions);
    assertEq(conductor.proposals(key), elapse);
    return key;
  }

  function utils_queueAndExecute(bytes[] memory transactions) internal {
    bytes32 key = utils_queue(transactions);

    vm.warp(conductor.proposals(key) + 100);

    vm.expectEmit(true, true, true, true);
    emit Executed(key, transactions);

    conductor.execute(transactions);
    assertEq(conductor.proposals(key), 0);
  }

  // ============ addBypass ============
  function test_Conductor__addBypass_failsIfConductor() public {
    vm.expectRevert(Conductor.Conductor_addBypass__cannotBypassConductor.selector);
    vm.prank(address(conductor));
    conductor.addBypass(address(conductor), Helper.executeCalldata.selector);
  }

  function test_Conductor__addBypass_shouldWork() public {
    utils_addBypass(address(helper), Helper.executeCalldata.selector);
  }

  // ============ removeBypass ============
  function test_Conductor__removeBypass_shouldWork() public {
    bytes32 key = utils_addBypass(address(helper), Helper.executeCalldata.selector);

    bytes[] memory transactions = new bytes[](1);
    transactions[0] = formatRemoveBypassTransaction(address(helper), Helper.executeCalldata.selector);
    bytes32 proposalKey = utils_queue(transactions);

    vm.warp(conductor.proposals(proposalKey) + 100);

    vm.expectEmit(true, true, true, true);
    emit BypassRemoved(address(helper), Helper.executeCalldata.selector);

    vm.expectEmit(true, true, true, true);
    emit Executed(proposalKey, transactions);

    conductor.execute(transactions);
    assertFalse(conductor.bypassDelay(key));
  }

  // ============ queue ============
  function test_Conductor__queue_failsIfQueued() public {
    bytes[] memory transactions = new bytes[](1);
    transactions[0] = formatHelperTransaction(address(this), 100);
    bytes32 key = utils_queue(transactions);

    vm.expectRevert(abi.encodeWithSelector(Conductor.Conductor_queue__alreadyQueued.selector, key));
    conductor.queue(transactions);
  }

  function test_Conductor__queue_shouldWork() public {
    bytes[] memory transactions = new bytes[](1);
    transactions[0] = formatHelperTransaction(address(this), 100);
    utils_queue(transactions);
  }

  // ============ dequeue ============
  function test_Conductor__dequeue_failsIfNotQueued() public {
    bytes[] memory transactions = new bytes[](1);
    vm.expectRevert(
      abi.encodeWithSelector(Conductor.Conductor_dequeue__notQueued.selector, keccak256(abi.encode(transactions)))
    );
    conductor.dequeue(transactions);
  }

  function test_Conductor__dequeue_shouldWork() public {
    bytes[] memory transactions = new bytes[](1);
    transactions[0] = formatHelperTransaction(address(this), 100);
    bytes32 key = utils_queue(transactions);

    vm.expectEmit(true, true, true, true);
    emit Dequeued(key, transactions);
    conductor.dequeue(transactions);
    assertEq(conductor.proposals(key), 0);
  }

  // ============ execute ============
  function test_Conductor__execute_failIfNotElapsed() public {
    bytes[] memory transactions = new bytes[](1);
    transactions[0] = formatHelperTransaction(address(this), 100);

    utils_queue(transactions);
    vm.expectRevert(
      abi.encodePacked(Conductor.Conductor_execute__notElapsed.selector, keccak256(abi.encode(transactions)))
    );
    conductor.execute(transactions);
  }

  function test_Conductor__execute_failIfOneFails() public {
    bytes[] memory transactions = new bytes[](3);
    transactions[0] = formatHelperTransaction(address(this), 100);
    transactions[1] = formatFailingTransaction();
    transactions[2] = formatHelperTransaction(address(this), 100);

    bytes32 key = utils_queue(transactions);
    vm.warp(conductor.proposals(key) + 100);

    vm.expectRevert(Conductor.Conductor_execute__callFailed.selector);
    conductor.execute(transactions);
    assertEq(helper.callCount(), 0);
  }

  function test_Conductor__execute_shouldWorkWithMultipleTxs() public {
    bytes[] memory transactions = new bytes[](2);
    transactions[0] = formatHelperTransaction(address(this), 100);
    transactions[1] = formatHelperTransaction(address(this), 100);

    utils_queueAndExecute(transactions);
    assertEq(helper.callCount(), 2);
  }

  function test_Conductor__execute_shouldWork() public {
    bytes[] memory transactions = new bytes[](1);
    transactions[0] = formatHelperTransaction(address(this), 100);

    utils_queueAndExecute(transactions);
    assertEq(helper.callCount(), 1);
  }

  // ============ executeWithBypass ============
  function test_Conductor__executeWithBypass_failIfNotAllowed() public {
    bytes[] memory transactions = new bytes[](1);
    transactions[0] = formatHelperTransaction(address(this), 100);

    vm.expectRevert(
      abi.encodeWithSelector(
        Conductor.Conductor_execute__cannotBypass.selector,
        Helper.executeCalldata.selector,
        address(helper)
      )
    );
    conductor.executeWithBypass(transactions);
  }

  function test_Conductor__executeWithBypass_shouldWork() public {
    bytes[] memory transactions = new bytes[](1);
    transactions[0] = formatHelperTransaction(address(this), 100);

    utils_addBypass(address(helper), Helper.executeCalldata.selector);

    utils_queueAndExecute(transactions);
    assertEq(helper.callCount(), 1);
  }
}
