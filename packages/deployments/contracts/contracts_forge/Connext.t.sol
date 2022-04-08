// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ForgeHelper.sol";

import "../contracts/Connext.sol";
import "../contracts/ProposedOwnableUpgradeable.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract MockRelayerFeeRouter {
  function send(
    uint32 _domain,
    address _recipient,
    bytes32[] calldata _transactionIds
  ) external {
    1 == 1;
  }
}

contract ConnextTest is ForgeHelper {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  event MaxRoutersPerTransferUpdated(uint256 maxRouters, address caller);

  // ============ Storage ============

  Connext connext;

  uint256 domain = 1;
  address bridgeRouter = address(1);
  address tokenRegistry = address(2);
  address wrapper = address(3);
  address kakaroto = address(4);

  MockRelayerFeeRouter relayerFeeRouter;

  // ============ Test set up ============

  function setUp() public {
    relayerFeeRouter = new MockRelayerFeeRouter();
    connext = new Connext();
    connext.initialize(domain, payable(bridgeRouter), tokenRegistry, wrapper, address(relayerFeeRouter));
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

  function setRelayerFees(bytes32 _transferId, uint256 _fee) internal {
    stdstore.target(address(connext)).sig(connext.relayerFees.selector).with_key(_transferId).checked_write(_fee);
  }

  function setTransferRelayer(bytes32 _transferId, address _relayer) internal {
    stdstore.target(address(connext)).sig(connext.transferRelayer.selector).with_key(_transferId).checked_write(
      _relayer
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
      abi.encodeWithSelector(Connext.Connext__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer.selector)
    );
    connext.setMaxRoutersPerTransfer(0);
  }

  // Emits MaxRoutersPerTransferUpdated
  function testSetMaxRoutersPerTransferEvent() public {
    vm.expectEmit(true, true, true, true);
    emit MaxRoutersPerTransferUpdated(10, address(this));
    connext.setMaxRoutersPerTransfer(10);
  }

  // ============ initiateClaim ============

  // Fail if any of the transaction id was not executed by relayer
  function testInitiateClaimNotRelayer() public {
    bytes32[] memory transactionIds = new bytes32[](2);
    transactionIds[0] = "AAA";
    transactionIds[1] = "BBB";

    setTransferRelayer("AAA", kakaroto);
    vm.prank(kakaroto);

    vm.expectRevert(
      abi.encodeWithSelector(ConnextUtils.ConnextUtils__initiateClaim_notRelayer.selector, bytes32("BBB"))
    );

    connext.initiateClaim(uint32(1), kakaroto, transactionIds);
  }

  // Should work
  function testInitiateClaim() public {
    bytes32[] memory transactionIds = new bytes32[](2);
    transactionIds[0] = "AAA";
    transactionIds[1] = "BBB";

    setTransferRelayer(bytes32("AAA"), kakaroto);
    setTransferRelayer(bytes32("BBB"), kakaroto);
    vm.prank(kakaroto);

    vm.expectCall(
      address(relayerFeeRouter),
      abi.encodeWithSelector(MockRelayerFeeRouter.send.selector, uint32(domain), kakaroto, transactionIds)
    );

    connext.initiateClaim(uint32(domain), kakaroto, transactionIds);
  }

  // ============ claim ============

  // Fail if if the caller isn't RelayerFeeRouter
  function testClaimOnlyRelayerFeeRouter() public {
    bytes32[] memory transactionIds = new bytes32[](2);
    transactionIds[0] = "AAA";
    transactionIds[1] = "BBB";

    vm.prank(address(20));
    vm.expectRevert(abi.encodeWithSelector(Connext.Connext__onlyRelayerFeeRouter_notRelayerFeeRouter.selector));

    connext.claim(kakaroto, transactionIds);
  }

  // Should work
  function testClaim() public {
    bytes32[] memory transactionIds = new bytes32[](2);
    transactionIds[0] = "AAA";
    transactionIds[1] = "BBB";

    uint256 aaaFee = 123;
    uint256 bbbFee = 456;

    setRelayerFees(bytes32("AAA"), aaaFee);
    setRelayerFees(bytes32("BBB"), bbbFee);

    address(connext).call{value: (aaaFee + bbbFee)}("");

    vm.prank(address(relayerFeeRouter));

    uint256 balanceBefore = kakaroto.balance;

    connext.claim(kakaroto, transactionIds);

    assertEq(kakaroto.balance, balanceBefore + aaaFee + bbbFee);
  }
}
