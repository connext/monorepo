// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./utils/ForgeHelper.sol";
import {MockHome, MockRelayerFeeRouter, MockPromiseRouter, MockCallback, TestSetterFacet} from "./utils/Mock.sol";
import {Deployer} from "./utils/Deployer.sol";

import {TestERC20} from "../contracts/test/TestERC20.sol";
import {WETH} from "../contracts/test/TestWeth.sol";

import {ProposedOwnableUpgradeable} from "../contracts/core/shared/ProposedOwnable.sol";

import {IConnextHandler} from "../contracts/core/connext/interfaces/IConnextHandler.sol";
import {ITokenRegistry} from "../contracts/core/connext/interfaces/ITokenRegistry.sol";
import {ISponsorVault} from "../contracts/core/connext/interfaces/ISponsorVault.sol";
import {AssetLogic} from "../contracts/core/connext/libraries/AssetLogic.sol";
import {BaseConnextFacet} from "../contracts/core/connext/facets/BaseConnextFacet.sol";
import {BridgeFacet} from "../contracts/core/connext/facets/BridgeFacet.sol";
import {RelayerFacet} from "../contracts/core/connext/facets/RelayerFacet.sol";
import {RoutersFacet} from "../contracts/core/connext/facets/RoutersFacet.sol";
import {AssetFacet} from "../contracts/core/connext/facets/AssetFacet.sol";
import {NomadFacet} from "../contracts/core/connext/facets/NomadFacet.sol";
import {XCallArgs, CallParams} from "../contracts/core/connext/libraries/LibConnextStorage.sol";
import {IDiamondCut} from "../contracts/core/connext/interfaces/IDiamondCut.sol";
import {ConnextMessage} from "../contracts/core/connext/libraries/ConnextMessage.sol";

import {PromiseRouter} from "../contracts/core/promise/PromiseRouter.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract ConnextHandlerTest is ForgeHelper, Deployer {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  // ============ Events ============
  event MaxRoutersPerTransferUpdated(uint256 maxRouters, address caller);
  event InitiatedClaim(uint32 indexed domain, address indexed recipient, address caller, bytes32[] transferIds);
  event Claimed(address indexed recipient, uint256 total, bytes32[] transferIds);
  event XCalled(
    bytes32 indexed transferId,
    XCallArgs xcallArgs,
    BridgeFacet.XCalledEventArgs args,
    uint256 nonce,
    bytes message,
    address caller
  );
  event TransferRelayerFeesUpdated(bytes32 indexed transferId, uint256 relayerFee, address caller);
  event SponsorVaultUpdated(address oldSponsorVault, address newSponsorVault, address caller);

  // ============ Storage ============
  uint32 domain = 1;
  uint32 destinationDomain = 2;
  address internal xAppConnectionManager = address(1);
  address internal home;
  address tokenRegistry = address(2);
  address kakaroto = address(3);
  bytes32 internal remote = "remote";

  IConnextHandler connextHandler;
  MockRelayerFeeRouter relayerFeeRouter;
  MockPromiseRouter promiseRouter;
  MockCallback callback;
  WETH wrapper;
  address canonical = address(4);
  TestERC20 originAdopted;
  address stableSwap = address(5);

  // ============ Test set up ============

  function deployMocks() internal {
    relayerFeeRouter = new MockRelayerFeeRouter();
    originAdopted = new TestERC20();
    wrapper = new WETH();
    home = address(new MockHome());
    promiseRouter = new MockPromiseRouter();
    callback = new MockCallback();
  }

  function setUp() public {
    deployMocks();
    deployConnext(
      uint256(domain),
      xAppConnectionManager,
      tokenRegistry,
      address(wrapper),
      address(relayerFeeRouter),
      payable(promiseRouter)
    );

    connextHandler = IConnextHandler(address(connextDiamondProxy));
    // Setup asset
    connextHandler.setupAsset(
      ConnextMessage.TokenId(domain, bytes32(abi.encodePacked(canonical))),
      address(originAdopted),
      stableSwap
    );

    // Setup asset wrapper
    connextHandler.setupAsset(
      ConnextMessage.TokenId(domain, bytes32(abi.encodePacked(address(wrapper)))),
      address(wrapper),
      stableSwap
    );

    connextHandler.enrollRemoteRouter(destinationDomain, remote);

    // Mocks
    vm.mockCall(address(originAdopted), abi.encodeWithSelector(IERC20.balanceOf.selector), abi.encode(0));
    vm.mockCall(address(originAdopted), abi.encodeWithSelector(IERC20.transferFrom.selector), abi.encode(true));
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(originAdopted))
    );
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.isLocalOrigin.selector),
      abi.encode(bool(true))
    );
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(domain, bytes32(uint256(uint160(address(originAdopted)))))
    );
    vm.mockCall(xAppConnectionManager, abi.encodeWithSignature("home()"), abi.encode(home));
    vm.mockCall(address(promiseRouter), abi.encodeWithSignature("connext()"), abi.encode(address(connextDiamondProxy)));
  }

  // ============ setMaxRouters ============

  // Should work
  function test_ConnextHandler__setMaxRouters_works() public {
    require(connextHandler.maxRoutersPerTransfer() != 10);

    vm.expectEmit(true, true, true, true);
    emit MaxRoutersPerTransferUpdated(10, address(this));

    connextHandler.setMaxRoutersPerTransfer(10);
    assertEq(connextHandler.maxRoutersPerTransfer(), 10);
  }

  // Fail if not called by owner
  function test_ConnextHandler__setMaxRouters_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    connextHandler.setMaxRoutersPerTransfer(10);
  }

  // Fail maxRouters is 0
  function test_ConnextHandler__setMaxRouters_failsIfEmpty() public {
    vm.expectRevert(
      abi.encodeWithSelector(RoutersFacet.RoutersFacet__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer.selector)
    );
    connextHandler.setMaxRoutersPerTransfer(0);
  }

  // ============ setSponsorVault ============

  function test_ConnextHandler__setSponsorVault_worksAddingNewSponsorVault(address _newSponsorVault) public {
    vm.assume(_newSponsorVault != address(0));

    vm.expectEmit(true, true, true, true);
    emit SponsorVaultUpdated(address(0), _newSponsorVault, address(this));

    connextHandler.setSponsorVault(_newSponsorVault);
    assertEq(address(connextHandler.sponsorVault()), _newSponsorVault);
  }

  function test_ConnextHandler__setSponsorVault_worksRemovingSponsorVault(address _currentSponsorVault) public {
    vm.assume(_currentSponsorVault != address(0));

    TestSetterFacet(address(connextDiamondProxy)).setTestSponsorVault(_currentSponsorVault);
    assertEq(address(connextHandler.sponsorVault()), _currentSponsorVault);

    vm.expectEmit(true, true, true, true);
    emit SponsorVaultUpdated(_currentSponsorVault, address(0), address(this));

    connextHandler.setSponsorVault(address(0));
    assertEq(address(connextHandler.sponsorVault()), address(0));
  }

  function test_ConnextHandler__setSponsorVault_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    connextHandler.setSponsorVault(address(1));
  }

  function test_ConnextHandler__setSponsorVault_failsIfAddingSameSponsorVault(address _currentSponsorVault) public {
    TestSetterFacet(address(connextDiamondProxy)).setTestSponsorVault(_currentSponsorVault);
    assertEq(address(connextHandler.sponsorVault()), _currentSponsorVault);

    vm.expectRevert(abi.encodeWithSelector(BridgeFacet.BridgeFacet__setSponsorVault_invalidSponsorVault.selector));

    connextHandler.setSponsorVault(_currentSponsorVault);
  }

  // ============ initiateClaim ============

  // Fail if any of the transaction id was not executed by relayer
  function test_ConnextHandler__initiateClaim_failsIfTransferNotRelayedByCaller() public {
    bytes32[] memory transactionIds = new bytes32[](2);
    transactionIds[0] = "AAA";
    transactionIds[1] = "BBB";

    TestSetterFacet(address(connextDiamondProxy)).setTestTransferRelayer("AAA", kakaroto);
    vm.prank(kakaroto);

    vm.expectRevert(
      abi.encodeWithSelector(RelayerFacet.RelayerFacet__initiateClaim_notRelayer.selector, bytes32("BBB"))
    );

    connextHandler.initiateClaim(uint32(1), kakaroto, transactionIds);
  }

  // Should work
  function test_ConnextHandler__initiateClaim_works() public {
    bytes32[] memory transactionIds = new bytes32[](2);
    transactionIds[0] = "AAA";
    transactionIds[1] = "BBB";

    TestSetterFacet(address(connextDiamondProxy)).setTestTransferRelayer(bytes32("AAA"), kakaroto);
    TestSetterFacet(address(connextDiamondProxy)).setTestTransferRelayer(bytes32("BBB"), kakaroto);
    vm.prank(kakaroto);

    vm.expectCall(
      address(relayerFeeRouter),
      abi.encodeWithSelector(MockRelayerFeeRouter.send.selector, uint32(domain), kakaroto, transactionIds)
    );

    vm.expectEmit(true, true, true, true);
    emit InitiatedClaim(uint32(domain), kakaroto, kakaroto, transactionIds);

    connextHandler.initiateClaim(uint32(domain), kakaroto, transactionIds);
  }

  // ============ claim ============

  // Fail if the caller isn't RelayerFeeRouter
  function test_ConnextHandler__claim_failsIfNotRelayerFeeRouter() public {
    bytes32[] memory transactionIds = new bytes32[](2);
    transactionIds[0] = "AAA";
    transactionIds[1] = "BBB";

    vm.prank(address(20));
    vm.expectRevert(
      abi.encodeWithSelector(RelayerFacet.RelayerFacet__onlyRelayerFeeRouter_notRelayerFeeRouter.selector)
    );

    connextHandler.claim(kakaroto, transactionIds);
  }

  // Should work
  function test_ConnextHandler__claim_works() public {
    bytes32[] memory transactionIds = new bytes32[](2);
    transactionIds[0] = "AAA";
    transactionIds[1] = "BBB";

    uint256 aaaFee = 123;
    uint256 bbbFee = 456;

    TestSetterFacet(address(connextDiamondProxy)).setTestRelayerFees(bytes32("AAA"), aaaFee);
    TestSetterFacet(address(connextDiamondProxy)).setTestRelayerFees(bytes32("BBB"), bbbFee);

    address(connextDiamondProxy).call{value: (aaaFee + bbbFee)}("");

    vm.prank(address(relayerFeeRouter));

    uint256 balanceBefore = kakaroto.balance;

    vm.expectEmit(true, true, true, true);
    emit Claimed(kakaroto, aaaFee + bbbFee, transactionIds);

    connextHandler.claim(kakaroto, transactionIds);

    assertEq(kakaroto.balance, balanceBefore + aaaFee + bbbFee);
    assertEq(connextHandler.relayerFees(bytes32("AAA")), 0);
    assertEq(connextHandler.relayerFees(bytes32("BBB")), 0);
  }

  // ============ xCall ============

  // Update relayerFees mapping
  function test_ConnextHandler__xcall_increasesRelayerFees() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(
      to,
      bytes("0x"),
      domain,
      destinationDomain,
      to,
      address(0),
      0,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    assertEq(connextHandler.relayerFees(id), 0);

    connextHandler.xcall{value: relayerFee}(args);

    assertEq(connextHandler.relayerFees(id), relayerFee);
  }

  // Emit relayerFees in XCalled event
  function test_ConnextHandler__xcall_emitsRelayerFeeInXCalled() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(
      to,
      bytes(""),
      domain,
      destinationDomain,
      to,
      address(0),
      0,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    // TODO Correctly calculate the message
    // Harcoded the message from the emitted event since here we are only testing that relayerFee is included
    bytes
      memory message = hex"00000001000000000000000000000000185a4dc360ce69bdccee33b3784b0282f7961aea030000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000020b4b2eeb4ea213a5e7d1e1d2a3a1a437fbe7c8b3490898b0474b0fe66dda70ad61794aecac5d0f4ed6bde473107a4beda948af71d3d89b8a1572e2b7b6bd389";

    // NOTE: the `amount` and `bridgedAmt` are 0 because `.balanceOf` of the origin asset returns
    // 0 always via setup function
    BridgeFacet.XCalledEventArgs memory eventArg = BridgeFacet.XCalledEventArgs({
      transactingAssetId: address(originAdopted),
      amount: 0,
      bridgedAmt: 0,
      bridged: address(originAdopted)
    });

    vm.expectEmit(true, true, true, true);
    emit XCalled(id, args, eventArg, 0, message, address(this));
    connextHandler.xcall{value: relayerFee}(args);
  }

  // Works if relayerFee is set to 0
  function test_ConnextHandler__xcall_zeroRelayerFeeWorks() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(
      to,
      bytes("0x"),
      domain,
      destinationDomain,
      to,
      address(0),
      0,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    assertEq(connextHandler.relayerFees(id), 0);

    connextHandler.xcall{value: relayerFee}(args);

    assertEq(connextHandler.relayerFees(id), 0);
  }

  // Correctly account for relayerFee in token transfer
  function test_ConnextHandler__xcall_considersRelayerFeeValueInTokenTransfer() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(
      to,
      bytes("0x"),
      domain,
      destinationDomain,
      to,
      address(0),
      0,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    connextHandler.xcall{value: relayerFee}(args);

    assertEq(connextHandler.relayerFees(id), relayerFee);
  }

  // Correctly account for relayerFee in native transfer
  function test_ConnextHandler__xcall_considersRelayerFeeValueInNativeTransfer() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(0);

    CallParams memory callParams = CallParams(
      to,
      bytes("0x"),
      domain,
      destinationDomain,
      to,
      address(0),
      0,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(wrapper)), domain, amount)
    );

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(wrapper))
    );

    connextHandler.xcall{value: amount + relayerFee}(args);

    assertEq(connextHandler.relayerFees(id), relayerFee);
  }

  // Fail if relayerFee in param and value does not match in token transfer
  function test_ConnextHandler__xcall_failsIfDifferentRelayerFeeValueAndParamInTokenTransfer() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(
      to,
      bytes("0x"),
      domain,
      destinationDomain,
      to,
      address(0),
      0,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_ethWithErcTransfer.selector));
    connextHandler.xcall{value: 0}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_ethWithErcTransfer.selector));
    connextHandler.xcall{value: relayerFee - 1}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_ethWithErcTransfer.selector));
    connextHandler.xcall{value: relayerFee + 1}(args);
  }

  // Fail if relayerFee in param and value does not match in native transfer
  function test_ConnextHandler__xcall_failsIfDifferentRelayerFeeValueAndParamInNativeTransfer() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(0);

    CallParams memory callParams = CallParams(
      to,
      bytes("0x"),
      domain,
      destinationDomain,
      to,
      address(0),
      0,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(wrapper))
    );

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    connextHandler.xcall{value: amount}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    connextHandler.xcall{value: amount + relayerFee - 1}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    connextHandler.xcall{value: amount + relayerFee + 1}(args);
  }

  // Fail if callbackFee in param and value does not match in native transfer
  function test_ConnextHandler__xcall_failsIfDifferentCallbackFeeValueAndParamInNativeTransfer() public {
    address to = address(100);
    address callbackAddr = address(callback);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    uint256 callbackFee = 0.02 ether;
    address transactingAssetId = address(0);

    CallParams memory callParams = CallParams(
      to,
      bytes("0x"),
      domain,
      destinationDomain,
      to,
      callbackAddr,
      callbackFee,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(wrapper))
    );

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    connextHandler.xcall{value: amount}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    connextHandler.xcall{value: amount + relayerFee + callbackFee - 1}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    connextHandler.xcall{value: amount + relayerFee + callbackFee + 1}(args);
  }

  // Fail if callback address is not contract and callback fee is not zero
  function test_ConnextHandler__xcall_failsIfNonZeroCallbackFeeForNonContractCallback() public {
    address to = address(100);
    address callbackAddr = address(0);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    uint256 callbackFee = 0.02 ether;
    address transactingAssetId = address(0);

    CallParams memory callParams = CallParams(
      to,
      bytes("0x"),
      domain,
      destinationDomain,
      to,
      callbackAddr,
      callbackFee,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(wrapper))
    );

    vm.expectRevert(abi.encodeWithSelector(BridgeFacet.BridgeFacet__xcall_nonZeroCallbackFeeForCallback.selector));
    connextHandler.xcall{value: amount + relayerFee + callbackFee}(args);
  }

  // Should work with callback address and callback fee
  function test_ConnextHandler__xcall_callbackFeeInitWorks() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    uint256 callbackFee = 0.01 ether;
    address callbackAddr = address(callback);
    address transactingAssetId = address(originAdopted);
    address payable promiseRouterAddr = payable(connextHandler.promiseRouter());

    vm.prank(promiseRouter.owner());
    promiseRouter.setConnext(address(connextDiamondProxy));

    CallParams memory callParams = CallParams(
      to,
      bytes(""),
      domain,
      destinationDomain,
      to,
      callbackAddr,
      callbackFee,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    uint256 beforePromiseRouterBalance = promiseRouterAddr.balance;

    assertEq(beforePromiseRouterBalance, 0);

    vm.expectCall(promiseRouterAddr, abi.encodeWithSelector(PromiseRouter.initCallbackFee.selector, id));

    connextHandler.xcall{value: relayerFee + callbackFee}(args);

    assertEq(promiseRouterAddr.balance, callbackFee);
  }

  // ============ bumpTransfer ============

  // Increases relayerFees set by xcall
  function test_ConnextHandler__bumpTransfer_increasesXCallRelayerFees() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(
      to,
      bytes(""),
      domain,
      destinationDomain,
      to,
      address(0),
      0,
      false,
      false
    );
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    assertEq(connextHandler.relayerFees(id), 0);

    connextHandler.xcall{value: relayerFee}(args);

    assertEq(connextHandler.relayerFees(id), relayerFee);

    uint256 relayerFeeBump = 0.3 ether;
    connextHandler.bumpTransfer{value: relayerFeeBump}(id);

    assertEq(connextHandler.relayerFees(id), relayerFee + relayerFeeBump);
  }

  // Increases relayerFees for the transfer
  function test_ConnextHandler__bumpTransfer_increasesRelayerFees() public {
    bytes32 transferId = bytes32("0x123");

    uint256 initialFee = 0.01 ether;
    TestSetterFacet(address(connextDiamondProxy)).setTestRelayerFees(transferId, initialFee);

    assertEq(connextHandler.relayerFees(transferId), initialFee);

    uint256 amount1 = 1 ether;
    connextHandler.bumpTransfer{value: amount1}(transferId);

    assertEq(connextHandler.relayerFees(transferId), initialFee + amount1);

    uint256 amount2 = 2 ether;
    connextHandler.bumpTransfer{value: amount2}(transferId);

    assertEq(connextHandler.relayerFees(transferId), initialFee + amount1 + amount2);
  }

  // Emits TransferRelayerFeesUpdated with updated relayerFees
  function test_ConnextHandler__bumpTransfer_emitsEvent() public {
    bytes32 transferId = bytes32("0x123");

    uint256 initialFee = 0.01 ether;
    TestSetterFacet(address(connextDiamondProxy)).setTestRelayerFees(transferId, initialFee);

    uint256 bump1 = 1 ether;
    uint256 bump2 = 2 ether;

    vm.expectEmit(true, false, false, true);
    emit TransferRelayerFeesUpdated(transferId, initialFee + bump1, address(this));
    connextHandler.bumpTransfer{value: bump1}(transferId);

    vm.expectEmit(true, false, false, true);
    emit TransferRelayerFeesUpdated(transferId, initialFee + bump1 + bump2, address(this));
    connextHandler.bumpTransfer{value: bump2}(transferId);
  }

  // Fail if zero value
  function test_ConnextHandler__bumpTransfer_failsIfZeroValue() public {
    bytes32 transferId = bytes32("0x123");

    uint256 initialFee = 0.01 ether;
    TestSetterFacet(address(connextDiamondProxy)).setTestRelayerFees(transferId, initialFee);

    vm.expectRevert(abi.encodeWithSelector(BridgeFacet.BridgeFacet__bumpTransfer_valueIsZero.selector));
    connextHandler.bumpTransfer{value: 0}(transferId);
  }

  // Works if initial relayerFees is zero
  function test_ConnextHandler__bumpTransfer_initialFeeZeroWorks() public {
    bytes32 transferId = bytes32("0x123");

    assertEq(connextHandler.relayerFees(transferId), 0);

    uint256 newFee = 0.01 ether;
    connextHandler.bumpTransfer{value: newFee}(transferId);
    assertEq(connextHandler.relayerFees(transferId), newFee);
  }
}
