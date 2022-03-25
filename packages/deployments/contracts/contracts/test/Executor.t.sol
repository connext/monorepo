// SPDX-License-Identifier: UNLICENSED
import "./ForgeHelper.sol";

import "../Connext.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

// Helper to query properties via reentrancy
contract PropertyQuery is ForgeHelper {
  function getOriginSender() public returns (address) {
    return IExecutor(msg.sender).originSender();
  }

  function getOrigin() public returns (uint32) {
    return IExecutor(msg.sender).origin();
  }
}

contract ExecutorTest is ForgeHelper {

  // ============ Libraries ============

  using stdStorage for StdStorage;
  using TypedMemView for bytes29;

  // ============ Storage ============

  Executor executor;
  PropertyQuery query;

  address connext = address(this);
  address asset = address(1);
  bytes32 transferId = bytes32(1);


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

  // Should work

  // ============ origin ============

  // Should fail if properties are not set
  
  // Should work

  // ============ execute ============

  // Fails if not called by connext

  // Should work with native asset
  function testExecuteNativeAsset() public {
    // executor.execute(transferId, 0, address(query), NATIVE_ASSET, LibCrossDomainProperties.DEFAULT_VALUE, bytes(0));
  }

  // Should work with tokens

  // Should decrease allowance if external call fails & using tokens

  // Should not set properties if it is the default value from LibCrossDomainProperty

  // Should set properties if they are provided

}