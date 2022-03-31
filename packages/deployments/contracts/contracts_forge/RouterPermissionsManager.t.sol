// SPDX-License-Identifier: UNLICENSED
import "./ForgeHelper.sol";

import "../contracts/Connext.sol";

contract RouterPermissionsManagerTest is ForgeHelper {
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

  function setRouterOwner(address _router, address _owner) internal {
    stdstore.target(address(connext)).sig(connext.routerOwners.selector).with_key(_router).checked_write(_owner);
  }

  function setRouterRecipient(address _router, address _recipient) internal {
    stdstore.target(address(connext)).sig(connext.routerRecipients.selector).with_key(_router).checked_write(_recipient);
  }

  function setProposedOwner(address _router, address _proposed) internal {
    stdstore.target(address(connext)).sig(connext.proposedRouterOwners.selector).with_key(_router).checked_write(_proposed);
  }

  // ============ setupRouter ============

  //Fail if not called by owner
  function testSetupRouterOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("#OO:029"));
    connext.setupRouter(address(1), address(0), address(0));
  }

  //Fail if adding address(0) as router
  function testSetupRouterZeroAddress() public {
    vm.expectRevert(bytes("#SR:001"));
    connext.setupRouter(address(0), address(0), address(0));
  }

  // Fail if adding a duplicate router
  function testSetupRouterAlreadyApproved() public {
    setApprovedRouter(address(1), true);
    vm.expectRevert(bytes("#SR:002"));
    connext.setupRouter(address(1), address(0), address(0));
  }

  // Should work
  function testSetupRouter() public {
    connext.setupRouter(address(1), address(2), address(3));
    assertTrue(connext.approvedRouters(address(1)));
    assertEq(connext.routerOwners(address(1)), address(2));
    assertEq(connext.routerRecipients(address(1)), address(3));
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

  // ============ setRouterRecipient ============

  //Fail if owner == address(0) && msg.sender != router
  function testOnlyRouterOwnerFailedWithZeroOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(0));
    vm.prank(address(2));
    vm.expectRevert(bytes("!router_owner"));   
    connext.setRouterRecipient(_router, address(0));
  }

  //Fail if owner != address(0) && msg.sender != owner
  function testOnlyRouterOwnerFailedWithNoZeroOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(3));
    vm.prank(address(2));
    vm.expectRevert(bytes("!router_owner")); 
    connext.setRouterRecipient(_router, address(0));
  }

  //Should work if owner == address(0)  && msg.sender == router
  function testOnlyRouterOwnerOkWithZeroOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(0));
    vm.prank(_router); 
    connext.setRouterRecipient(_router, address(2));  
    assertEq(connext.routerRecipients(_router), address(2));
  }

  //Should work if  msg.sender == owner
  function testOnlyRouterOwnerOkWithNoZeroOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(3));
    vm.prank(address(3));
    connext.setRouterRecipient(_router, address(2));  
    assertEq(connext.routerRecipients(_router), address(2));
  }

  //Fail if setting a duplicate recipient
  function testSetRouterRecipientAlreadySet() public {
    address _router = address(1);
    setRouterOwner(_router, address(3));
    setRouterRecipient(_router, address(2));
    vm.prank(address(3));
    vm.expectRevert(bytes("#SR:103")); 
    connext.setRouterRecipient(_router, address(2));
  }

  // ============ proposeRouterOwner ============

  //Fail if propose current owner
  function testProposeRouterOwnerAlreadOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(3));
    vm.prank(address(3));
    vm.expectRevert(bytes("!diff")); 
    connext.proposeRouterOwner(_router, address(3));
  }
}
