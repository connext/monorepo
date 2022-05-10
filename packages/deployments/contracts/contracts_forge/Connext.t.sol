// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "./ForgeHelper.sol";

// import "../contracts/nomad-xapps/contracts/connext/ConnextHandler.sol";

import {ITokenRegistry} from "../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {AssetLogic} from "../contracts/lib/Connext/AssetLogic.sol";
import {ProposedOwnableUpgradeable} from "../contracts/ProposedOwnableUpgradeable.sol";
import {TestERC20} from "../contracts/test/TestERC20.sol";
import {WETH} from "../contracts/test/TestWeth.sol";

import {MockHome} from "./RelayerFeeRouter.t.sol";
import {BaseConnextFacet} from "../contracts/diamond/facets/BaseConnextFacet.sol";

import {Connext} from "../contracts/diamond/Connext.sol";
import {DiamondCutFacet} from "../contracts/diamond/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../contracts/diamond/facets/DiamondLoupeFacet.sol";
import {DiamondInit} from "../contracts/diamond/upgradeInitializers/DiamondInit.sol";
import {AssetFacet} from "../contracts/diamond/facets/AssetFacet.sol";
import {BridgeFacet} from "../contracts/diamond/facets/BridgeFacet.sol";
import {NomadFacet} from "../contracts/diamond/facets/NomadFacet.sol";
import {OwnershipFacet} from "../contracts/diamond/facets/OwnershipFacet.sol";
import {ProposedOwnableFacet} from "../contracts/diamond/facets/ProposedOwnableFacet.sol";
import {RelayerFacet} from "../contracts/diamond/facets/RelayerFacet.sol";
import {RoutersFacet} from "../contracts/diamond/facets/RoutersFacet.sol";
import {ConnextMessage} from "../contracts/diamond/libraries/ConnextMessage.sol";
import {XCallArgs, CallParams} from "../contracts/diamond/libraries/LibConnextStorage.sol";

import {IDiamondCut} from "../contracts/diamond/interfaces/IDiamondCut.sol";

contract TestSetterFacet is BaseConnextFacet {
  function setTestRelayerFees(bytes32 _transferId, uint256 _fee) external {
    s.relayerFees[_transferId] = _fee;
  }

  function setTestTransferRelayer(bytes32 _transferId, address _relayer) external {
    s.transferRelayer[_transferId] = _relayer;
  }
}

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

  // ============ Storage ============

  /////
  Connext connextDiamondProxy;
  DiamondCutFacet diamondCutFacet;
  DiamondLoupeFacet diamondLoupeFacet;
  DiamondInit diamondInit;
  AssetFacet assetFacet;
  BridgeFacet bridgeFacet;
  NomadFacet nomadFacet;
  OwnershipFacet ownershipFacet;
  ProposedOwnableFacet proposedOwnableFacet;
  RelayerFacet relayerFacet;
  RoutersFacet routersFacet;
  TestSetterFacet testSetterFacet;
  ////

  // ERC1967Proxy proxy;
  // ConnextHandler connextImpl;
  // ConnextHandler connext;

  uint32 domain = 1;
  uint32 destinationDomain = 2;
  address internal xAppConnectionManager = address(1);
  address internal home;
  address tokenRegistry = address(2);
  address kakaroto = address(3);
  bytes32 internal remote = "remote";

  MockRelayerFeeRouter relayerFeeRouter;
  WETH wrapper;
  address canonical = address(4);
  TestERC20 originAdopted;
  address stableSwap = address(5);

  // ============ Test set up ============

  function getDiamondCutFacetCut(address _diamondCutFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory diamondCutFacetSelectors = new bytes4[](1);
    diamondCutFacetSelectors[0] = DiamondCutFacet.diamondCut.selector;
    return IDiamondCut.FacetCut({
      facetAddress: _diamondCutFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: diamondCutFacetSelectors
    });
  }

  function getDiamondLoupeFacetCut(address _diamondLoupeFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory diamondLoupeFacetSelectors = new bytes4[](5);
    diamondLoupeFacetSelectors[0] = DiamondLoupeFacet.facets.selector;
    diamondLoupeFacetSelectors[1] = DiamondLoupeFacet.facetFunctionSelectors.selector;
    diamondLoupeFacetSelectors[2] = DiamondLoupeFacet.facetAddresses.selector;
    diamondLoupeFacetSelectors[3] = DiamondLoupeFacet.facetAddress.selector;
    diamondLoupeFacetSelectors[4] = DiamondLoupeFacet.supportsInterface.selector;
    return IDiamondCut.FacetCut({
      facetAddress: _diamondLoupeFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: diamondLoupeFacetSelectors
    });
  }

  function getAssetFacetCut(address _assetFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory assetFacetSelectors = new bytes4[](7);
    assetFacetSelectors[0] = AssetFacet.canonicalToAdopted.selector;
    assetFacetSelectors[1] = AssetFacet.adoptedToCanonical.selector;
    assetFacetSelectors[2] = AssetFacet.approvedAssets.selector;
    assetFacetSelectors[3] = AssetFacet.adoptedToLocalPools.selector;
    assetFacetSelectors[4] = AssetFacet.setupAsset.selector;
    assetFacetSelectors[5] = AssetFacet.addStableSwapPool.selector;
    assetFacetSelectors[6] = AssetFacet.removeAssetId.selector;
    return IDiamondCut.FacetCut({
      facetAddress: _assetFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: assetFacetSelectors
    });
  }

  function getBridgeFacetCut(address _bridgeFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory bridgeFacetSelectors = new bytes4[](12);
    bridgeFacetSelectors[0] = BridgeFacet.relayerFees.selector;
    bridgeFacetSelectors[1] = BridgeFacet.routedTransfers.selector;
    bridgeFacetSelectors[2] = BridgeFacet.reconciledTransfers.selector;
    bridgeFacetSelectors[3] = BridgeFacet.tokenRegistry.selector;
    bridgeFacetSelectors[4] = BridgeFacet.domain.selector;
    bridgeFacetSelectors[5] = BridgeFacet.executor.selector;
    bridgeFacetSelectors[6] = BridgeFacet.nonce.selector;
    bridgeFacetSelectors[7] = BridgeFacet.wrapper.selector;
    bridgeFacetSelectors[8] = BridgeFacet.xcall.selector;
    bridgeFacetSelectors[9] = BridgeFacet.handle.selector;
    bridgeFacetSelectors[10] = BridgeFacet.execute.selector;
    bridgeFacetSelectors[11] = BridgeFacet.bumpTransfer.selector;
    return IDiamondCut.FacetCut({
      facetAddress: _bridgeFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: bridgeFacetSelectors
    });
  }

  function getNomadFacetCut(address _nomadFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory nomadFacetSelectors = new bytes4[](4);
    nomadFacetSelectors[0] = NomadFacet.xAppConnectionManager.selector;
    nomadFacetSelectors[1] = NomadFacet.remotes.selector;
    nomadFacetSelectors[2] = NomadFacet.setXAppConnectionManager.selector;
    nomadFacetSelectors[3] = NomadFacet.enrollRemoteRouter.selector;
    return IDiamondCut.FacetCut({
      facetAddress: _nomadFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: nomadFacetSelectors
    });
  }

  function getOwnershipFacetCut(address _ownershipFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory ownershipFacetSelectors = new bytes4[](2);
    ownershipFacetSelectors[0] = OwnershipFacet.transferOwnership.selector;
    ownershipFacetSelectors[1] = OwnershipFacet.owner.selector;
    return IDiamondCut.FacetCut({
      facetAddress: _ownershipFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: ownershipFacetSelectors
    });
  }

  function getProposedOwnableFacetCut(address _proposedOwnableFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory proposedOwnableFacetSelectors = new bytes4[](14);
    proposedOwnableFacetSelectors[0] = ProposedOwnableFacet.proposedOwnableOwner.selector;
    proposedOwnableFacetSelectors[1] = ProposedOwnableFacet.proposed.selector;
    proposedOwnableFacetSelectors[2] = ProposedOwnableFacet.proposedTimestamp.selector;
    proposedOwnableFacetSelectors[3] = ProposedOwnableFacet.routerOwnershipTimestamp.selector;
    proposedOwnableFacetSelectors[4] = ProposedOwnableFacet.assetOwnershipTimestamp.selector;
    proposedOwnableFacetSelectors[5] = ProposedOwnableFacet.delay.selector;
    proposedOwnableFacetSelectors[6] = ProposedOwnableFacet.proposeRouterOwnershipRenunciation.selector;
    proposedOwnableFacetSelectors[7] = ProposedOwnableFacet.renounceRouterOwnership.selector;
    proposedOwnableFacetSelectors[8] = ProposedOwnableFacet.proposeAssetOwnershipRenunciation.selector;
    proposedOwnableFacetSelectors[9] = ProposedOwnableFacet.renounceAssetOwnership.selector;
    proposedOwnableFacetSelectors[10] = ProposedOwnableFacet.renounced.selector;
    proposedOwnableFacetSelectors[11] = ProposedOwnableFacet.proposeNewOwner.selector;
    proposedOwnableFacetSelectors[12] = ProposedOwnableFacet.renounceOwnership.selector;
    proposedOwnableFacetSelectors[13] = ProposedOwnableFacet.acceptProposedOwner.selector;
    return IDiamondCut.FacetCut({
      facetAddress: _proposedOwnableFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: proposedOwnableFacetSelectors
    });
  }

  function getRelayerFacetCut(address _relayerFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory relayerFacetSelectors = new bytes4[](9);
    relayerFacetSelectors[0] = RelayerFacet.transferRelayer.selector;
    relayerFacetSelectors[1] = RelayerFacet.approvedRelayers.selector;
    relayerFacetSelectors[2] = RelayerFacet.relayerFeeRouter.selector;
    relayerFacetSelectors[3] = RelayerFacet.LIQUIDITY_FEE_NUMERATOR.selector;
    relayerFacetSelectors[4] = RelayerFacet.LIQUIDITY_FEE_DENOMINATOR.selector;
    relayerFacetSelectors[5] = RelayerFacet.addRelayer.selector;
    relayerFacetSelectors[6] = RelayerFacet.removeRelayer.selector;
    relayerFacetSelectors[7] = RelayerFacet.initiateClaim.selector;
    relayerFacetSelectors[8] = RelayerFacet.claim.selector;
    return IDiamondCut.FacetCut({
      facetAddress: _relayerFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: relayerFacetSelectors
    });
  }

  function getRoutersFacetCut(address _routersFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory routersFacetSelectors = new bytes4[](16);
    routersFacetSelectors[0] = RoutersFacet.getRouterApproval.selector;
    routersFacetSelectors[1] = RoutersFacet.getRouterRecipient.selector;
    routersFacetSelectors[2] = RoutersFacet.getRouterOwner.selector;
    routersFacetSelectors[3] = RoutersFacet.getProposedRouterOwner.selector;
    routersFacetSelectors[4] = RoutersFacet.getProposedRouterOwnerTimestamp.selector;
    routersFacetSelectors[5] = RoutersFacet.maxRoutersPerTransfer.selector;
    routersFacetSelectors[6] = RoutersFacet.routerBalances.selector;
    routersFacetSelectors[7] = RoutersFacet.setRouterRecipient.selector;
    routersFacetSelectors[8] = RoutersFacet.proposeRouterOwner.selector;
    routersFacetSelectors[9] = RoutersFacet.acceptProposedRouterOwner.selector;
    routersFacetSelectors[10] = RoutersFacet.setupRouter.selector;
    routersFacetSelectors[11] = RoutersFacet.removeRouter.selector;
    routersFacetSelectors[12] = RoutersFacet.setMaxRoutersPerTransfer.selector;
    routersFacetSelectors[13] = RoutersFacet.addLiquidityFor.selector;
    routersFacetSelectors[14] = RoutersFacet.addLiquidity.selector;
    routersFacetSelectors[15] = RoutersFacet.removeLiquidity.selector;
    return IDiamondCut.FacetCut({
      facetAddress: _routersFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: routersFacetSelectors
    });
  }

  function getTestSetterFacetCut(address _testSetterFacetFacet) internal returns (IDiamondCut.FacetCut memory) {
    bytes4[] memory testSetterFacetSelectors = new bytes4[](2);
    testSetterFacetSelectors[0] = TestSetterFacet.setTestRelayerFees.selector;
    testSetterFacetSelectors[1] = TestSetterFacet.setTestTransferRelayer.selector;
    return IDiamondCut.FacetCut({
      facetAddress: _testSetterFacetFacet,
      action: IDiamondCut.FacetCutAction.Add,
      functionSelectors: testSetterFacetSelectors
    });
  }

  function deployFacets() internal {
    diamondCutFacet = new DiamondCutFacet();
    diamondLoupeFacet = new DiamondLoupeFacet();
    diamondInit = new DiamondInit();
    assetFacet = new AssetFacet();
    bridgeFacet = new BridgeFacet();
    nomadFacet = new NomadFacet();
    ownershipFacet = new OwnershipFacet();
    proposedOwnableFacet = new ProposedOwnableFacet();
    relayerFacet = new RelayerFacet();
    routersFacet = new RoutersFacet();
    testSetterFacet = new TestSetterFacet();
  }

  function deployMocks() internal {
    relayerFeeRouter = new MockRelayerFeeRouter();
    originAdopted = new TestERC20();
    wrapper = new WETH();
    home = address(new MockHome());
  }

  function getFacetCuts() internal returns (IDiamondCut.FacetCut[] memory) {
    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](10);
    facetCuts[0] = getDiamondCutFacetCut(address(diamondCutFacet));
    facetCuts[1] = getDiamondLoupeFacetCut(address(diamondLoupeFacet));
    facetCuts[2] = getAssetFacetCut(address(assetFacet));
    facetCuts[3] = getBridgeFacetCut(address(bridgeFacet));
    facetCuts[4] = getNomadFacetCut(address(nomadFacet));
    facetCuts[5] = getOwnershipFacetCut(address(ownershipFacet));
    facetCuts[6] = getProposedOwnableFacetCut(address(proposedOwnableFacet));
    facetCuts[7] = getRelayerFacetCut(address(relayerFacet));
    facetCuts[8] = getRoutersFacetCut(address(routersFacet));
    facetCuts[9] = getTestSetterFacetCut(address(testSetterFacet));

    return facetCuts;
  }

  function deployConnext(bytes memory initCallData) internal {
    connextDiamondProxy = new Connext(address(this), getFacetCuts(), address(diamondInit), initCallData);
  }

  function setUp() public {
    deployMocks();

    // ////
    deployFacets();


    bytes memory initCallData = abi.encodeWithSelector(
      DiamondInit.init.selector,
      uint256(domain),
      xAppConnectionManager,
      tokenRegistry,
      address(wrapper),
      address(relayerFeeRouter)
    );
    deployConnext(initCallData);

    ////

    // Setup asset
    AssetFacet(address(connextDiamondProxy)).setupAsset(
      ConnextMessage.TokenId(domain, bytes32(abi.encodePacked(canonical))),
      address(originAdopted),
      stableSwap
    );

    // Setup asset wrapper
    AssetFacet(address(connextDiamondProxy)).setupAsset(
      ConnextMessage.TokenId(domain, bytes32(abi.encodePacked(address(wrapper)))),
      address(wrapper),
      stableSwap
    );

    NomadFacet(address(connextDiamondProxy)).enrollRemoteRouter(destinationDomain, remote);

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
  }


  // ============ setMaxRouters ============

  // Should work
  function test_ConnextHandler__setMaxRouters_works() public {
    require(RoutersFacet(address(connextDiamondProxy)).maxRoutersPerTransfer() != 10);

    vm.expectEmit(true, true, true, true);
    emit MaxRoutersPerTransferUpdated(10, address(this));

    RoutersFacet(address(connextDiamondProxy)).setMaxRoutersPerTransfer(10);
    assertEq(RoutersFacet(address(connextDiamondProxy)).maxRoutersPerTransfer(), 10);
  }

  // Fail if not called by owner
  function test_ConnextHandler__setMaxRouters_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert(
      abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector)
    );
    RoutersFacet(address(connextDiamondProxy)).setMaxRoutersPerTransfer(10);
  }

  // Fail maxRouters is 0
  function test_ConnextHandler__setMaxRouters_failsIfEmpty() public {
    vm.expectRevert(
      abi.encodeWithSelector(RoutersFacet.RoutersFacet__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer.selector)
    );
    RoutersFacet(address(connextDiamondProxy)).setMaxRoutersPerTransfer(0);
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

    RelayerFacet(address(connextDiamondProxy)).initiateClaim(uint32(1), kakaroto, transactionIds);
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

    RelayerFacet(address(connextDiamondProxy)).initiateClaim(uint32(domain), kakaroto, transactionIds);
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

    RelayerFacet(address(connextDiamondProxy)).claim(kakaroto, transactionIds);
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

    RelayerFacet(address(connextDiamondProxy)).claim(kakaroto, transactionIds);

    assertEq(kakaroto.balance, balanceBefore + aaaFee + bbbFee);
    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(bytes32("AAA")), 0);
    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(bytes32("BBB")), 0);
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
      destinationDomain
    );
    XCallArgs memory args = XCallArgs(
      callParams,
      transactingAssetId,
      amount,
      relayerFee
    );

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(id), 0);

    BridgeFacet(address(connextDiamondProxy)).xcall{value: relayerFee}(args);

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(id), relayerFee);
  }

  // Emit relayerFees in XCalled event
  function test_ConnextHandler__xcall_emitsRelayerFeeInXCalled() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(to, bytes(""), domain, destinationDomain);
    XCallArgs memory args = XCallArgs(
      callParams,
      transactingAssetId,
      amount,
      relayerFee
    );

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    // TODO Correctly calculate the message
    // Harcoded the message from the emitted event since here we are only testing that relayerFee is included
    bytes
      memory message = hex"00000001000000000000000000000000185a4dc360ce69bdccee33b3784b0282f7961aea030000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000020b4b2eeb4ea213a5e7d1e1d2a3a1a437fbe7c8b3490898b0474b0fe66dda70a384aa4a452fb11f5c2575694a185e6b4af0965fbe54a2cab5b602800728879ad";

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
    BridgeFacet(address(connextDiamondProxy)).xcall{value: relayerFee}(args);
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
      destinationDomain
    );
    XCallArgs memory args = XCallArgs(
      callParams,
      transactingAssetId,
      amount,
      relayerFee
    );

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(id), 0);

    BridgeFacet(address(connextDiamondProxy)).xcall{value: relayerFee}(args);

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(id), 0);
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
      destinationDomain
    );
    XCallArgs memory args = XCallArgs(
      callParams,
      transactingAssetId,
      amount,
      relayerFee
    );

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    BridgeFacet(address(connextDiamondProxy)).xcall{value: relayerFee}(args);

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(id), relayerFee);
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
      destinationDomain
    );
    XCallArgs memory args = XCallArgs(
      callParams,
      transactingAssetId,
      amount,
      relayerFee
    );

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(wrapper)), domain, amount)
    );

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(wrapper))
    );

    BridgeFacet(address(connextDiamondProxy)).xcall{value: amount + relayerFee}(args);

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(id), relayerFee);
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
      destinationDomain
    );
    XCallArgs memory args = XCallArgs(
      callParams,
      transactingAssetId,
      amount,
      relayerFee
    );

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_ethWithErcTransfer.selector));
    BridgeFacet(address(connextDiamondProxy)).xcall{value: 0}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_ethWithErcTransfer.selector));
    BridgeFacet(address(connextDiamondProxy)).xcall{value: relayerFee - 1}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_ethWithErcTransfer.selector));
    BridgeFacet(address(connextDiamondProxy)).xcall{value: relayerFee + 1}(args);
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
      destinationDomain
    );
    XCallArgs memory args = XCallArgs(
      callParams,
      transactingAssetId,
      amount,
      relayerFee
    );

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(wrapper))
    );

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    BridgeFacet(address(connextDiamondProxy)).xcall{value: amount}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    BridgeFacet(address(connextDiamondProxy)).xcall{value: amount + relayerFee - 1}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    BridgeFacet(address(connextDiamondProxy)).xcall{value: amount + relayerFee + 1}(args);
  }

  // ============ bumpTransfer ============

  // Increases relayerFees set by xcall
  function test_ConnextHandler__bumpTransfer_increasesXCallRelayerFees() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(to, bytes(""), domain, destinationDomain);
    XCallArgs memory args = XCallArgs(
      callParams,
      transactingAssetId,
      amount,
      relayerFee
    );

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(id), 0);

    BridgeFacet(address(connextDiamondProxy)).xcall{value: relayerFee}(args);

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(id), relayerFee);

    uint256 relayerFeeBump = 0.3 ether;
    BridgeFacet(address(connextDiamondProxy)).bumpTransfer{value: relayerFeeBump}(id);

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(id), relayerFee + relayerFeeBump);
  }

  // Increases relayerFees for the transfer
  function test_ConnextHandler__bumpTransfer_increasesRelayerFees() public {
    bytes32 transferId = bytes32("0x123");

    uint256 initialFee = 0.01 ether;
    TestSetterFacet(address(connextDiamondProxy)).setTestRelayerFees(transferId, initialFee);

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(transferId), initialFee);

    uint256 amount1 = 1 ether;
    BridgeFacet(address(connextDiamondProxy)).bumpTransfer{value: amount1}(transferId);

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(transferId), initialFee + amount1);

    uint256 amount2 = 2 ether;
    BridgeFacet(address(connextDiamondProxy)).bumpTransfer{value: amount2}(transferId);

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(transferId), initialFee + amount1 + amount2);
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
    BridgeFacet(address(connextDiamondProxy)).bumpTransfer{value: bump1}(transferId);

    vm.expectEmit(true, false, false, true);
    emit TransferRelayerFeesUpdated(transferId, initialFee + bump1 + bump2, address(this));
    BridgeFacet(address(connextDiamondProxy)).bumpTransfer{value: bump2}(transferId);
  }

  // Fail if zero value
  function test_ConnextHandler__bumpTransfer_failsIfZeroValue() public {
    bytes32 transferId = bytes32("0x123");

    uint256 initialFee = 0.01 ether;
    TestSetterFacet(address(connextDiamondProxy)).setTestRelayerFees(transferId, initialFee);

    vm.expectRevert(abi.encodeWithSelector(BridgeFacet.BridgeFacet__bumpTransfer_valueIsZero.selector));
    BridgeFacet(address(connextDiamondProxy)).bumpTransfer{value: 0}(transferId);
  }

  // Works if initial relayerFees is zero
  function test_ConnextHandler__bumpTransfer_initialFeeZeroWorks() public {
    bytes32 transferId = bytes32("0x123");

    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(transferId), 0);

    uint256 newFee = 0.01 ether;
    BridgeFacet(address(connextDiamondProxy)).bumpTransfer{value: newFee}(transferId);
    assertEq(BridgeFacet(address(connextDiamondProxy)).relayerFees(transferId), newFee);
  }
}
