// SPDX-License-Identifier: UNLICENSED
import "./ForgeHelper.sol";

import "../contracts/Connext.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract ConnextTest is ForgeHelper {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  // ============ Storage ============

  Connext connext;

  uint256 domain = 1;
  address bridgeRouter = address(1);
  address tokenRegistry = address(2);
  address wrapper = address(3);

  // ============ Test set up ============

  function setUp() public {
    connext = new Connext();
    connext.initialize(domain, payable(bridgeRouter), tokenRegistry, wrapper);
  }

  // ============ Utils ============
  // https://github.com/brockelmore/forge-std
  // specifically here with overriding mappings: https://github.com/brockelmore/forge-std/blob/99107e3e39f27339d224575756d4548c08639bc0/src/test/StdStorage.t.sol#L189-L192
  function setApprovedRouter(address _router, bool _approved) internal {
    uint256 writeVal = _approved ? 1 : 0;
    stdstore.target(address(connext)).sig(connext.approvedRouters.selector).with_key(_router).checked_write(writeVal);
  }

  function setApprovedAsset(address _asset, bool _approved) internal {
    uint256 writeVal = _approved ? 1 : 0;
    stdstore.target(address(connext)).sig(connext.approvedAssets.selector).with_key(_asset).checked_write(writeVal);
  }

  // ============ addRouter ============

  // Fail if not called by owner
  function testAddRouterOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("#OO:029"));
    connext.addRouter(address(1));
  }

  // Fail if adding address(0) as router
  function testAddRouterZeroAddress() public {
    vm.expectRevert(bytes("#AR:001"));
    connext.addRouter(address(0));
  }

  // Fail if adding a duplicate router
  function testAddRouterAlreadyApproved() public {
    setApprovedRouter(address(1), true);
    vm.expectRevert(bytes("#AR:032"));
    connext.addRouter(address(1));
  }

  // Should work
  function testAddRouter() public {
    connext.addRouter(address(1));
    assertTrue(connext.approvedRouters(address(1)));
  }

  // ============ removeRouter ============

  // Fail if not called by owner
  function testRemoveRouterOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("#OO:029"));
    connext.removeRouter(address(1));
  }

  // Fail if removing address(0) as router
  function testRemoveRouterZeroAddress() public {
    vm.expectRevert(bytes("#RR:001"));
    connext.removeRouter(address(0));
  }

  // Fail if removing a non-existent router
  function testAddRouterNotApproved() public {
    setApprovedRouter(address(1), false);
    vm.expectRevert(bytes("#RR:033"));
    connext.removeRouter(address(1));
  }

  // Should work
  function testRemoveRouter() public {
    setApprovedRouter(address(1), true);
    connext.removeRouter(address(1));
    assertTrue(!connext.approvedRouters(address(1)));
  }
}
