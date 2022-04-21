// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "../ForgeHelper.sol";

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

  function setOriginSender() public returns (address) {
    originSender = IExecutor(msg.sender).originSender();
    return originSender;
  }

  function setOrigin() public returns (uint32) {
    origin = IExecutor(msg.sender).origin();
    return origin;
  }
}

contract ExecutorTest is ForgeHelper {
  // ============ Libraries ============

  using stdStorage for StdStorage;
  using TypedMemView for bytes29;
  using TypedMemView for bytes;

  // ============ Storage ============

  Executor executor;
  PropertyQuery query;

  address connext = address(this);
  address asset = address(1);
  address originSender = address(2);
  uint32 origin = uint32(1000);
  bytes32 transferId = keccak256(abi.encode(1));

  // ============ Test set up ============

  function setUp() public {
    executor = new Executor(connext);
    query = new PropertyQuery();
  }

  // ============ Utils ============

  // ============ getConnext ============

  // Should work
  function testGetConnext() public {
    address c = executor.getConnext();
    assertEq(c, connext);
  }

  // ============ originSender ============

  // Should fail if properties are not set
  function testOriginSenderRevertOnEmpty() public {
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
  function testOriginSender() public {
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
  function testOriginRevertOnEmpty() public {
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
  function testOrigin() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(PropertyQuery.setOrigin.selector, "");
    bytes memory property = LibCrossDomainProperty.formatDomainAndSenderBytes(origin, originSender);

    // send tx
    (bool success, ) = executor.execute(transferId, 0, payable(address(query)), NATIVE_ASSET, property, data);
    assertTrue(success);
    assertEq(query.origin(), origin);
  }

  // ============ execute ============

  // Fails if not called by connext

  // Should work with native asset

  // Should work with tokens

  // Should decrease allowance if external call fails & using tokens

  // Should not set properties if it is the default value from LibCrossDomainProperty

  // Should set properties if they are provided
}
