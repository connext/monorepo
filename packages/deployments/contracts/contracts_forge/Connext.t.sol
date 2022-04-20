// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "./ForgeHelper.sol";

import "../contracts/nomad-xapps/contracts/connext/ConnextHandler.sol";
import "../contracts/ProposedOwnableUpgradeable.sol";

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract ConnextTest is ForgeHelper {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  event MaxRoutersPerTransferUpdated(uint256 maxRouters, address caller);

  // ============ Storage ============

  ERC1967Proxy proxy;
  ConnextHandler connext;

  uint256 domain = 1;
  address bridgeRouter = address(1);
  address tokenRegistry = address(2);
  address wrapper = address(3);

  // ============ Test set up ============

  function setUp() public {
    connext = new ConnextHandler();

    proxy = new ERC1967Proxy(
      address(connext),
      abi.encodeWithSelector(ConnextHandler.initialize.selector, domain, payable(bridgeRouter), tokenRegistry, wrapper)
    );

    connext = ConnextHandler(payable(address(proxy)));
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
  function testSetMaxRoutersPerTransfer() public {
    require(connext.maxRoutersPerTransfer() != 10);

    connext.setMaxRoutersPerTransfer(10);
    assertEq(connext.maxRoutersPerTransfer(), 10);
  }

  // Fail if not called by owner
  function testSetMaxRoutersPerTransferOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(
      abi.encodeWithSelector(ProposedOwnableUpgradeable.ProposedOwnableUpgradeable__onlyOwner_notOwner.selector)
    );
    connext.setMaxRoutersPerTransfer(10);
  }

  // Fail maxRouters is 0
  function testSetMaxRoutersPerTransferZeroValue() public {
    vm.expectRevert(
      abi.encodeWithSelector(
        ConnextHandler.ConnextHandler__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer.selector
      )
    );
    connext.setMaxRoutersPerTransfer(0);
  }

  // Emits MaxRoutersPerTransferUpdated
  function testSetMaxRoutersPerTransferEvent() public {
    vm.expectEmit(true, true, true, true);
    emit MaxRoutersPerTransferUpdated(10, address(this));
    connext.setMaxRoutersPerTransfer(10);
  }
}
