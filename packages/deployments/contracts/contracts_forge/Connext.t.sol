// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ForgeHelper.sol";

import "../contracts/Connext.sol";
import "../contracts/ProposedOwnableUpgradeable.sol";
import "../contracts/test/TestERC20.sol";
import "../contracts/test/TestWeth.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

contract TestDummyBridgeRouter {
  function send(
    address _token,
    uint256 _amount,
    uint32 _destination,
    bytes32 _recipient,
    bool _enableFast,
    bytes32 _externalHash
  ) external {}
}

contract ConnextTest is ForgeHelper {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  event MaxRoutersPerTransferUpdated(uint256 maxRouters, address caller);
  event InitiatedClaim(uint32 indexed domain, address indexed recipient, address caller, bytes32[] transferIds);
  event Claimed(address indexed recipient, uint256 total, bytes32[] transferIds);
  event XCalled(
    bytes32 indexed transferId,
    address indexed to,
    IConnext.CallParams params,
    address transactingAsset,
    address localAsset,
    uint256 transactingAmount,
    uint256 localAmount,
    uint256 relayerFee,
    uint256 nonce,
    address caller
  );
  event TransferRelayerFeesUpdated(bytes32 indexed transferId, uint256 relayerFee, address caller);

  // ============ Storage ============

  Connext connext;

  uint32 domain = 1;
  uint32 destinationDomain = 2;
  TestDummyBridgeRouter bridgeRouter;
  address tokenRegistry = address(2);
  address kakaroto = address(4);

  MockRelayerFeeRouter relayerFeeRouter;
  WETH wrapper;
  address canonical = address(4);
  address local = address(5);
  TestERC20 originAdopted;
  address destinationAdopted = address(6);
  address stableSwap = address(7);

  // ============ Test set up ============

  function setUp() public {
    relayerFeeRouter = new MockRelayerFeeRouter();
    connext = new Connext();

    originAdopted = new TestERC20();
    bridgeRouter = new TestDummyBridgeRouter();
    wrapper = new WETH();

    connext.initialize(
      uint256(domain),
      payable(address(bridgeRouter)),
      tokenRegistry,
      address(wrapper),
      address(relayerFeeRouter)
    );

    // Setup asset
    connext.setupAsset(
      BridgeMessage.TokenId(domain, bytes32(abi.encodePacked(canonical))),
      address(originAdopted),
      stableSwap
    );

    // Setup asset wrapper
    connext.setupAsset(
      BridgeMessage.TokenId(domain, bytes32(abi.encodePacked(address(wrapper)))),
      address(wrapper),
      stableSwap
    );

    // Mocks
    vm.mockCall(address(originAdopted), abi.encodeWithSelector(IERC20.balanceOf.selector), abi.encode(0));
    vm.mockCall(address(originAdopted), abi.encodeWithSelector(IERC20.transferFrom.selector), abi.encode(true));
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(originAdopted))
    );
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

    vm.expectEmit(true, true, true, true);
    emit InitiatedClaim(uint32(domain), kakaroto, kakaroto, transactionIds);

    connext.initiateClaim(uint32(domain), kakaroto, transactionIds);
  }

  // ============ claim ============

  // Fail if the caller isn't RelayerFeeRouter
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

    vm.expectEmit(true, true, true, true);
    emit Claimed(kakaroto, aaaFee + bbbFee, transactionIds);

    connext.claim(kakaroto, transactionIds);

    assertEq(kakaroto.balance, balanceBefore + aaaFee + bbbFee);
    assertEq(connext.relayerFees(bytes32("AAA")), 0);
    assertEq(connext.relayerFees(bytes32("BBB")), 0);
  }

  // ============ xCall ============

  // Update relayerFees mapping
  function testXCallIncreasesRelayerFees() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    IConnext.CallParams memory callParams = IConnext.CallParams(to, bytes("0x"), domain, destinationDomain);
    IConnext.XCallArgs memory args = IConnext.XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(abi.encode(0, address(this), callParams));

    assertEq(connext.relayerFees(id), 0);

    connext.xcall{value: relayerFee}(args);

    assertEq(connext.relayerFees(id), relayerFee);
  }

  // Emit relayerFees in XCalled event
  function testXCallEmitsRelayerFee() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    IConnext.CallParams memory callParams = IConnext.CallParams(to, bytes("0x"), domain, destinationDomain);
    IConnext.XCallArgs memory args = IConnext.XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    vm.expectEmit(false, false, false, true);
    emit XCalled(
      bytes32("0x"),
      to,
      callParams,
      address(originAdopted),
      address(originAdopted),
      0,
      0,
      relayerFee,
      0,
      address(this)
    );
    connext.xcall{value: relayerFee}(args);
  }

  // Fail if relayerFee is set to 0
  function testXCallZeroRelayerFeeRevert() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0;
    address transactingAssetId = address(originAdopted);

    IConnext.CallParams memory callParams = IConnext.CallParams(to, bytes("0x"), domain, destinationDomain);
    IConnext.XCallArgs memory args = IConnext.XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    vm.expectRevert(abi.encodeWithSelector(Connext.Connext__xcall_relayerFeeIsZero.selector));
    connext.xcall{value: relayerFee}(args);
  }

  // Correctly account for relayerFee in token transfer
  function testXCallConsidersRelayerFeeValueInTokenTransfer() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    IConnext.CallParams memory callParams = IConnext.CallParams(to, bytes("0x"), domain, destinationDomain);
    IConnext.XCallArgs memory args = IConnext.XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(abi.encode(0, address(this), callParams));

    connext.xcall{value: relayerFee}(args);

    assertEq(connext.relayerFees(id), relayerFee);
  }

  // Correctly account for relayerFee in native transfer
  function testXCallConsidersRelayerFeeValueInNativeTransfer() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(0);

    IConnext.CallParams memory callParams = IConnext.CallParams(to, bytes("0x"), domain, destinationDomain);
    IConnext.XCallArgs memory args = IConnext.XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(abi.encode(0, address(this), callParams));

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(wrapper))
    );

    connext.xcall{value: amount + relayerFee}(args);

    assertEq(connext.relayerFees(id), relayerFee);
  }

  // Fail if relayerFee in param and value does not match in token transfer
  function testXCallConsidersRelayerFeeValueInTokenTransferRevert() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    IConnext.CallParams memory callParams = IConnext.CallParams(to, bytes("0x"), domain, destinationDomain);
    IConnext.XCallArgs memory args = IConnext.XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__transferAssetToContract_ethWithErcTransfer.selector));
    connext.xcall{value: 0}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__transferAssetToContract_ethWithErcTransfer.selector));
    connext.xcall{value: relayerFee - 1}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__transferAssetToContract_ethWithErcTransfer.selector));
    connext.xcall{value: relayerFee + 1}(args);
  }

  // Fail if relayerFee in param and value does not match in native transfer
  function testXCallConsidersRelayerFeeValueInNativeTransferRevert() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(0);

    IConnext.CallParams memory callParams = IConnext.CallParams(to, bytes("0x"), domain, destinationDomain);
    IConnext.XCallArgs memory args = IConnext.XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(wrapper))
    );

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__transferAssetToContract_notAmount.selector));
    connext.xcall{value: amount}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__transferAssetToContract_notAmount.selector));
    connext.xcall{value: amount + relayerFee - 1}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__transferAssetToContract_notAmount.selector));
    connext.xcall{value: amount + relayerFee + 1}(args);
  }

  // ============ bumpTransfer ============

  // Increases relayerFees set by xcall
  function testBumpTransferIncreasesXCallRelayerFees() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    IConnext.CallParams memory callParams = IConnext.CallParams(to, bytes("0x"), domain, destinationDomain);
    IConnext.XCallArgs memory args = IConnext.XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(abi.encode(0, address(this), callParams));

    assertEq(connext.relayerFees(id), 0);

    connext.xcall{value: relayerFee}(args);

    assertEq(connext.relayerFees(id), relayerFee);

    uint256 relayerFeeBump = 0.3 ether;
    connext.bumpTransfer{value: relayerFeeBump}(id);

    assertEq(connext.relayerFees(id), relayerFee + relayerFeeBump);
  }

  // Increases relayerFees for the transfer
  function testBumpTransferIncreasesRelayerFees() public {
    bytes32 transferId = bytes32("0x123");

    uint256 initialFee = 0.01 ether;
    setRelayerFees(transferId, initialFee);

    assertEq(connext.relayerFees(transferId), initialFee);

    uint256 amount1 = 1 ether;
    connext.bumpTransfer{value: amount1}(transferId);

    assertEq(connext.relayerFees(transferId), initialFee + amount1);

    uint256 amount2 = 2 ether;
    connext.bumpTransfer{value: amount2}(transferId);

    assertEq(connext.relayerFees(transferId), initialFee + amount1 + amount2);
  }

  // Emits TransferRelayerFeesUpdated with updated relayerFees
  function testBumpTransferEmitsEvent() public {
    bytes32 transferId = bytes32("0x123");

    uint256 initialFee = 0.01 ether;
    setRelayerFees(transferId, initialFee);

    uint256 bump1 = 1 ether;
    uint256 bump2 = 2 ether;

    vm.expectEmit(true, false, false, true);
    emit TransferRelayerFeesUpdated(transferId, initialFee + bump1, address(this));
    connext.bumpTransfer{value: bump1}(transferId);

    vm.expectEmit(true, false, false, true);
    emit TransferRelayerFeesUpdated(transferId, initialFee + bump1 + bump2, address(this));
    connext.bumpTransfer{value: bump2}(transferId);
  }

  // Fail if zero value
  function testBumpTransferZeroValueRevert() public {
    bytes32 transferId = bytes32("0x123");

    uint256 initialFee = 0.01 ether;
    setRelayerFees(transferId, initialFee);

    vm.expectRevert(abi.encodeWithSelector(Connext.Connext__bumpTransfer_valueIsZero.selector));
    connext.bumpTransfer{value: 0}(transferId);
  }

  // Fail if invalid transfer
  function testBumpTransferInvalidTransferRevert() public {
    bytes32 transferId = bytes32("0x123");

    vm.expectRevert(abi.encodeWithSelector(Connext.Connext__bumpTransfer_invalidTransfer.selector));
    connext.bumpTransfer{value: 100}(transferId);
  }
}
