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

  event MaxRoutersUpdated(uint256 maxRouters, address caller);

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

  function setRouterOwner(address _router, address _owner) internal {
    stdstore.target(address(connext)).sig(connext.routerOwners.selector).with_key(_router).checked_write(_owner);
  }

  function setRouterRecipient(address _router, address _recipient) internal {
    stdstore.target(address(connext)).sig(connext.routerRecipients.selector).with_key(_router).checked_write(
      _recipient
    );
  }

  // ============ setMaxRouters ============

  // Should work
  function testSetMaxRouters() public {
    require(connext.maxRouters() != 10);

    connext.setMaxRouters(10);
    assertEq(connext.maxRouters(), 10);
  }

  // Fail if not called by owner
  function testSetMaxRoutersOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("#OO:029"));
    connext.setMaxRouters(10);
  }

  // Fail maxRouters is 0
  function testSetMaxRoutersZeroValue() public {
    vm.expectRevert(bytes("invalid maxRouters"));
    connext.setMaxRouters(0);
  }

  // Emits MaxRoutersUpdated
  function testSetMaxRoutersEvent() public {
    vm.expectEmit(true,true,true,true);
    emit MaxRoutersUpdated(10, address(this));
    connext.setMaxRouters(10);
  }
}
