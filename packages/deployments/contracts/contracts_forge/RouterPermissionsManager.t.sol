// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ForgeHelper.sol";

import "../contracts/Connext.sol";
import "../contracts/RouterPermissionsManager.sol";
import {RouterPermissionsManagerLogic} from "../contracts/lib/Connext/RouterPermissionsManagerLogic.sol";
import "../contracts/ProposedOwnableUpgradeable.sol";

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
    stdstore.target(address(connext)).sig(connext.routerRecipients.selector).with_key(_router).checked_write(
      _recipient
    );
  }

  function setProposedOwner(address _router, address _proposed) internal {
    stdstore.target(address(connext)).sig(connext.proposedRouterOwners.selector).with_key(_router).checked_write(
      _proposed
    );
  }

  function setProposedTimestamp(address _router, uint256 _timestamp) internal {
    stdstore.target(address(connext)).sig(connext.proposedRouterTimestamp.selector).with_key(_router).checked_write(
      _timestamp
    );
  }

  // ============ setupRouter ============

  //Fail if not called by owner
  function testSetupRouterOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(
      abi.encodeWithSelector(ProposedOwnableUpgradeable.ProposedOwnableUpgradeable__onlyOwner_notOwner.selector)
    );
    connext.setupRouter(address(1), address(0), address(0));
  }

  //Fail if adding address(0) as router
  function testSetupRouterZeroAddress() public {
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__setupRouter_routerEmpty.selector
      )
    );
    connext.setupRouter(address(0), address(0), address(0));
  }

  // Fail if adding a duplicate router
  function testSetupRouterAlreadyApproved() public {
    setApprovedRouter(address(1), true);
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__setupRouter_amountIsZero.selector
      )
    );
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
    vm.expectRevert(
      abi.encodeWithSelector(ProposedOwnableUpgradeable.ProposedOwnableUpgradeable__onlyOwner_notOwner.selector)
    );
    connext.removeRouter(address(1));
  }

  // Fail if removing address(0) as router
  function testRemoveRouterZeroAddress() public {
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__removeRouter_routerEmpty.selector
      )
    );
    connext.removeRouter(address(0));
  }

  // Fail if removing a non-existent router
  function testRemoveRouterNotApproved() public {
    setApprovedRouter(address(1), false);
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__removeRouter_notAdded.selector
      )
    );
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
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__onlyRouterOwner_notRouterOwner.selector
      )
    );
    connext.setRouterRecipient(_router, address(0));
  }

  //Fail if owner != address(0) && msg.sender != owner
  function testOnlyRouterOwnerFailedWithNoZeroOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(3));
    vm.prank(address(2));
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__onlyRouterOwner_notRouterOwner.selector
      )
    );
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
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__setRouterRecipient_notNewRecipient.selector
      )
    );
    connext.setRouterRecipient(_router, address(2));
  }

  // ============ proposeRouterOwner ============

  //Fail if propose current owner
  function testProposeRouterOwnerAlreadyOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(3));
    vm.prank(address(3));
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__proposeRouterOwner_notNewOwner.selector
      )
    );
    connext.proposeRouterOwner(_router, address(3));
  }

  //Fail if proposed owner is same as the previous proposed
  function testProposeRouterOwnerAlreadyProposed() public {
    address _router = address(1);
    setRouterOwner(_router, address(3));
    setProposedOwner(_router, address(2));
    vm.prank(address(3));
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__proposeRouterOwner_badRouter.selector
      )
    );
    connext.proposeRouterOwner(_router, address(2));
  }

  //Should work
  function testProposeRouterOwnerOk() public {
    address _router = address(1);
    setRouterOwner(_router, address(3));
    setProposedOwner(_router, address(0));
    vm.prank(address(3));
    connext.proposeRouterOwner(_router, address(2));
    assertEq(connext.proposedRouterOwners(_router), address(2));
  }

  // ============ acceptProposedRouterOwner ============

  //Fail if proposed == address(0) && (_owner != address(0) && msg.sender != router) || _owner != msg.sender
  function testOnlyProposedRouterOwnerFailedWithZeroOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(0));
    setProposedOwner(_router, address(0));
    vm.prank(address(2));
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__onlyProposedRouterOwner_notRouterOwner.selector
      )
    );
    connext.acceptProposedRouterOwner(_router);
  }

  //Fail if proposed == address(0) && (_owner != address(0) && msg.sender != router) || _owner != msg.sender
  function testOnlyProposedRouterOwnerFailedWithNoZeroOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(3));
    setProposedOwner(_router, address(0));
    vm.prank(address(2));
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic.RouterPermissionsManagerLogic__onlyProposedRouterOwner_notRouterOwner.selector
      )
    );
    connext.acceptProposedRouterOwner(_router);
  }

  //Fail if proposed != address(0) && msg.sender != _proposed
  function testOnlyProposedRouterOwnerFailedWithNoZeroProposed() public {
    address _router = address(1);
    setProposedOwner(_router, address(1));
    vm.prank(address(2));
    vm.expectRevert(
      abi.encodeWithSelector(
        RouterPermissionsManagerLogic
          .RouterPermissionsManagerLogic__onlyProposedRouterOwner_notProposedRouterOwner
          .selector
      )
    );
    connext.acceptProposedRouterOwner(_router);
  }

  //Should work if proposed == address(0)  && (_owner == address(0) && msg.sender == router) || _owner != msg.sender
  function testOnlyProposedRouterOwnerOkWithZeroOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(0));
    setProposedOwner(_router, address(0));
    setProposedTimestamp(_router, block.timestamp - 3600 * 24 * 8);
    vm.prank(_router);
    connext.acceptProposedRouterOwner(_router);
    assertEq(connext.routerOwners(_router), address(0));
  }

  //Should work if proposed == address(0)  &&  msg.sender == owner
  function testOnlyProposedOwnerOkWithNoZeroOwner() public {
    address _router = address(1);
    setRouterOwner(_router, address(3));
    setProposedTimestamp(_router, block.timestamp - 3600 * 24 * 8);
    vm.prank(address(3));
    connext.acceptProposedRouterOwner(_router);
    assertEq(connext.routerOwners(_router), address(0));
  }

  //Should work if proposed != address(0)  &&  msg.sender == _proposed
  function testOnlyProposedOwnerOkWithNoZeroProposed() public {
    address _router = address(1);
    setProposedOwner(_router, address(1));
    setProposedTimestamp(_router, block.timestamp - 3600 * 24 * 8);
    vm.prank(address(1));
    connext.acceptProposedRouterOwner(_router);
    assertEq(connext.routerOwners(_router), address(1));
  }
}
