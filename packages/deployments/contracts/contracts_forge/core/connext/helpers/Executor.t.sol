// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../../../utils/ForgeHelper.sol";

import "../../../../contracts/test/TestERC20.sol";
import "../../../../lib/forge-std/src/console.sol";

import "../../../../contracts/core/connext/interfaces/IExecutor.sol";
import "../../../../contracts/core/connext/helpers/Executor.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

// Mock contract
contract MockStaking {
  uint256 public nonce = 0;
  mapping(address => uint256) public staked;

  function increaseNonce() public {
    nonce++;
  }

  function descreaseNonce() public {
    require(nonce > 0, "!underflow");
    nonce--;
  }

  function stake(address asset, uint256 amount) public payable {
    if (asset == address(0)) {
      require(msg.value == amount, "!mismatch");
    } else {
      IERC20(asset).transferFrom(msg.sender, address(this), amount);
    }

    staked[msg.sender] += amount;
  }
}

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

  receive() external payable {}
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
  MockStaking mockStaking;

  address connext = address(this);
  address originSender = address(2);
  address recovery = address(3);
  uint32 origin = uint32(1000);
  bytes32 transferId = keccak256(abi.encode(1));

  // ============ Test set up ============

  function setUp() public {
    executor = new Executor(connext);
    query = new PropertyQuery();
    asset = new TestERC20();
    mockStaking = new MockStaking();

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
      IExecutor.ExecutorArgs(
        transferId,
        0,
        payable(address(query)),
        payable(recovery),
        NATIVE_ASSET,
        LibCrossDomainProperty.EMPTY_BYTES,
        data
      )
    );
    assertTrue(!success);
  }

  // Should work
  function test_Executor__originSender_works() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(PropertyQuery.setOriginSender.selector, "");
    bytes memory property = LibCrossDomainProperty.formatDomainAndSenderBytes(origin, originSender);

    // send tx
    (bool success, ) = executor.execute(
      IExecutor.ExecutorArgs(transferId, 0, payable(address(query)), payable(recovery), NATIVE_ASSET, property, data)
    );
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
      IExecutor.ExecutorArgs(
        transferId,
        0,
        payable(address(query)),
        payable(recovery),
        NATIVE_ASSET,
        LibCrossDomainProperty.EMPTY_BYTES,
        data
      )
    );
    assertTrue(!success);
  }

  // Should work
  function test_Executor__origin_works() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(PropertyQuery.setOrigin.selector, "");
    bytes memory property = LibCrossDomainProperty.formatDomainAndSenderBytes(origin, originSender);

    // send tx
    (bool success, ) = executor.execute(
      IExecutor.ExecutorArgs(transferId, 0, payable(address(query)), payable(recovery), NATIVE_ASSET, property, data)
    );
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
    (bool success, ) = executor.execute(
      IExecutor.ExecutorArgs(
        transferId,
        amount,
        payable(address(query)),
        payable(recovery),
        address(asset),
        property,
        data
      )
    );
    assertTrue(success);
    assertEq(query.amt(), amount);
    assertEq(executor.amount(), 0);
  }

  // ============ execute ============

  // Fails if not called by connext
  function test_Executor__execute_revertIfNotConnext() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(PropertyQuery.setAmount.selector, "");
    bytes memory property = LibCrossDomainProperty.EMPTY_BYTES;

    // Get starting recovery balance
    uint256 initRecovery = asset.balanceOf(recovery);

    // send tx
    uint256 amount = 1200;
    vm.expectRevert(bytes("!connext"));
    vm.prank(address(12345));
    (bool success, ) = executor.execute(
      IExecutor.ExecutorArgs(
        transferId,
        amount,
        payable(address(12344321)),
        payable(recovery),
        address(asset),
        property,
        data
      )
    );
  }

  // Should gracefully handle failure of no code at to
  function test_Executor__execute_handlesNoCodeFailure() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(PropertyQuery.setAmount.selector, "");
    bytes memory property = LibCrossDomainProperty.EMPTY_BYTES;

    // Get starting recovery balance
    uint256 initRecovery = asset.balanceOf(recovery);

    // send tx
    uint256 amount = 1200;
    (bool success, ) = executor.execute(
      IExecutor.ExecutorArgs(
        transferId,
        amount,
        payable(address(12344321)),
        payable(recovery),
        address(asset),
        property,
        data
      )
    );
    assertTrue(!success);

    // should have transferred funds to recovery address
    assertEq(asset.balanceOf(recovery), initRecovery + amount);
  }

  // Should hande the case if excessivlySafeCall fails
  function test_Executor__execute_handlesExcessivelySafeCallFailure() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(MockStaking.descreaseNonce.selector, "");
    bytes memory property = LibCrossDomainProperty.EMPTY_BYTES;

    uint256 amount = 0;
    (bool success, ) = executor.execute(
      IExecutor.ExecutorArgs(
        transferId,
        amount,
        address(mockStaking),
        payable(recovery),
        address(asset),
        property,
        data
      )
    );

    assertTrue(!success);
  }

  // Should work with native asset
  function test_Executor__execute_worksWithNativeAsset() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(MockStaking.stake.selector, address(0), 100);
    bytes memory property = LibCrossDomainProperty.EMPTY_BYTES;

    uint256 amount = 100;
    (bool success, ) = executor.execute{value: 100}(
      IExecutor.ExecutorArgs(transferId, amount, address(mockStaking), payable(recovery), address(0), property, data)
    );

    assertTrue(success);
  }

  // Should revert if msg.value isn't equal to args.amount
  function test_Executor__execute_revertsIfNotEqual() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(MockStaking.stake.selector, address(0), 100);
    bytes memory property = LibCrossDomainProperty.EMPTY_BYTES;

    uint256 amount = 100;
    vm.expectRevert(bytes("!equal"));
    (bool success, ) = executor.execute{value: 99}(
      IExecutor.ExecutorArgs(transferId, amount, address(mockStaking), payable(recovery), address(0), property, data)
    );
  }

  // Should work with tokens
  function test_Executor__execute_worksWithToken() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(MockStaking.stake.selector, address(asset), 100);
    bytes memory property = LibCrossDomainProperty.EMPTY_BYTES;

    uint256 amount = 100;
    asset.mint(address(executor), amount);
    uint256 initBalance = asset.balanceOf(address(mockStaking));
    (bool success, ) = executor.execute{value: 100}(
      IExecutor.ExecutorArgs(
        transferId,
        amount,
        address(mockStaking),
        payable(recovery),
        address(asset),
        property,
        data
      )
    );

    assertTrue(success);
    assertEq(asset.balanceOf(address(mockStaking)), initBalance + amount);
  }

  // Should decrease allowance if external call fails & using tokens
  function test_Executor__execute_decreaseAllowanceIfExternalCallsFailsAndUsingTokens() public {
    // Get the calldata
    bytes memory data = abi.encodeWithSelector(MockStaking.descreaseNonce.selector, "");
    bytes memory property = LibCrossDomainProperty.EMPTY_BYTES;
    uint256 initAllowance = asset.allowance(address(executor), address(mockStaking));
    uint256 amount = 100;
    (bool success, ) = executor.execute(
      IExecutor.ExecutorArgs(
        transferId,
        amount,
        address(mockStaking),
        payable(recovery),
        address(asset),
        property,
        data
      )
    );
    assertTrue(!success);
    assertEq(asset.allowance(address(executor), address(mockStaking)), initAllowance);
  }
}
