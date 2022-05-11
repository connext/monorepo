// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../ForgeHelper.sol";

import "../../contracts/test/TestERC20.sol";

import "../../lib/forge-std/src/console.sol";

import "../../contracts/interpreters/Executor.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

// Helper to query properties via reentrancy
contract PropertyQuery is ForgeHelper {
  address public originSender;
  uint32 public origin;
  uint256 public amt;

  function setOriginSender() public returns (address) {
    originSender = IExecutor(msg.sender).originSender();
    return originSender;
  }

  function setOrigin() public returns (uint32) {
    origin = IExecutor(msg.sender).origin();
    return origin;
  }

  function setAmount() public payable returns (uint256) {
    amt = IExecutor(msg.sender).amount();
    return amt;
  }

  function receive() public payable {}
}

contract ExecutorTest is ForgeHelper {
  // ============ Libraries ============

  using stdStorage for StdStorage;
  using TypedMemView for bytes29;
  using TypedMemView for bytes;

  // ============ Storage ============

  Executor executor;
  PropertyQuery query;
  TestERC20 asset;

  address connext = address(this);
  address originSender = address(2);
  uint32 origin = uint32(1000);
  bytes32 transferId = keccak256(abi.encode(1));

  // ============ Test set up ============

  function setUp() public {
    executor = new Executor(connext);
    query = new PropertyQuery();
    asset = new TestERC20();

    // fund executor
    asset.mint(address(executor), 10 ether);
  }

  // ============ Utils ============

  // ============ getConnext ============

  // Should work
  function test_Executor__getConnext_works() public {
    address c = executor.getConnext();
    assertEq(c, connext);
  }

  // ============ originSender ============

  // Should fail if properties are not set
  function test_Executor__originSender_revertOnEmpty() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(PropertyQuery.setOriginSender.selector, "");
    // send tx
    (bool success, ) = executor.execute(
      transferId,
      0,
      payable(address(query)),
      NATIVE_ASSET,
      LibCrossDomainProperty.EMPTY_BYTES,
      data
    );
    assertTrue(!success);
  }

  // Should work
  function test_Executor__originSender_works() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(PropertyQuery.setOriginSender.selector, "");
    bytes memory property = LibCrossDomainProperty.formatDomainAndSenderBytes(origin, originSender);

    // send tx
    (bool success, ) = executor.execute(transferId, 0, payable(address(query)), NATIVE_ASSET, property, data);
    assertTrue(success);
    assertEq(query.originSender(), originSender);
  }

  // ============ origin ============

  // Should fail if properties are not set
  function test_Executor__origin_revertOnEmpty() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(PropertyQuery.setOrigin.selector, "");
    // send tx
    (bool success, ) = executor.execute(
      transferId,
      0,
      payable(address(query)),
      NATIVE_ASSET,
      LibCrossDomainProperty.EMPTY_BYTES,
      data
    );
    assertTrue(!success);
  }

  // Should work
  function test_Executor__origin_works() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(PropertyQuery.setOrigin.selector, "");
    bytes memory property = LibCrossDomainProperty.formatDomainAndSenderBytes(origin, originSender);

    // send tx
    (bool success, ) = executor.execute(transferId, 0, payable(address(query)), NATIVE_ASSET, property, data);
    assertTrue(success);
    assertEq(query.origin(), origin);
  }

  // ============ amount ============

  // Should work
  function test_Executor__amount_works() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(PropertyQuery.setAmount.selector, "");
    bytes memory property = LibCrossDomainProperty.EMPTY_BYTES;

    // send tx
    uint256 amount = 1200;
    (bool success, ) = executor.execute(transferId, amount, payable(address(query)), address(asset), property, data);
    assertTrue(success);
    assertEq(query.amt(), amount);
    assertEq(executor.amount(), 0);
  }

  // ============ execute ============

  // Fails if not called by connext

  // Should work with native asset

  // Should work with tokens

  // Should decrease allowance if external call fails & using tokens

  // Should not set properties if it is the default value from LibCrossDomainProperty

  // Should set properties if they are provided
}
