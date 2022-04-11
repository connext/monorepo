// SPDX-License-Identifier: UNLICENSED
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

  // ============ Storage ============

  Connext connext;

  uint32 domain = 1;
  uint32 destinationDomain = 2;
  TestDummyBridgeRouter bridgeRouter;
  address tokenRegistry = address(2);
  WETH wrapper;
  address canonical = address(4);
  address local = address(5);
  TestERC20 originAdopted;
  address destinationAdopted = address(6);
  address stableSwap = address(7);

  // ============ Test set up ============

  function setUp() public {
    connext = new Connext();

    originAdopted = new TestERC20();
    bridgeRouter = new TestDummyBridgeRouter();
    wrapper = new WETH();

    connext.initialize(uint256(domain), payable(address(bridgeRouter)), tokenRegistry, address(wrapper));

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

  // Work if relayerFee is set to 0
  function testXCallWorksWithZeroRelayerFee() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0;
    address transactingAssetId = address(originAdopted);

    IConnext.CallParams memory callParams = IConnext.CallParams(to, bytes("0x"), domain, destinationDomain);
    IConnext.XCallArgs memory args = IConnext.XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(abi.encode(0, address(this), callParams));

    assertEq(connext.relayerFees(id), 0);

    connext.xcall{value: relayerFee}(args);

    assertEq(connext.relayerFees(id), 0);
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
}
