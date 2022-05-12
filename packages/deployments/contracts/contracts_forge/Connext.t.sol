// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./ForgeHelper.sol";

import {ITokenRegistry} from "../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {AssetLogic} from "../contracts/lib/Connext/AssetLogic.sol";
import {ProposedOwnableUpgradeable} from "../contracts/ProposedOwnableUpgradeable.sol";
import {TestERC20} from "../contracts/test/TestERC20.sol";
import {WETH} from "../contracts/test/TestWeth.sol";

import {MockHome} from "./RelayerFeeRouter.t.sol";

import {Deployer} from "./utils/Deployer.sol";
import {IConnextFacets} from "./utils/IConnextFacets.sol";

import {BaseConnextFacet} from "../contracts/diamond/facets/BaseConnextFacet.sol";
import {BridgeFacet} from "../contracts/diamond/facets/BridgeFacet.sol";
import {RelayerFacet} from "../contracts/diamond/facets/RelayerFacet.sol";
import {RoutersFacet} from "../contracts/diamond/facets/RoutersFacet.sol";
import {AssetFacet} from "../contracts/diamond/facets/AssetFacet.sol";
import {NomadFacet} from "../contracts/diamond/facets/NomadFacet.sol";
import {XCallArgs, CallParams} from "../contracts/diamond/libraries/LibConnextStorage.sol";
import {IDiamondCut} from "../contracts/diamond/interfaces/IDiamondCut.sol";
import {ConnextMessage} from "../contracts/diamond/libraries/ConnextMessage.sol";
import {TestSetterFacet, getTestSetterFacetCut} from "./utils/TestSetterFacet.sol";

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

contract ConnextTest is ForgeHelper, Deployer {
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

  // ============ Storage ============
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

  TestSetterFacet testSetterFacet;
  IConnextFacets connext;

  // ============ Test set up ============

  function deployMocks() internal {
    relayerFeeRouter = new MockRelayerFeeRouter();
    originAdopted = new TestERC20();
    wrapper = new WETH();
    home = address(new MockHome());
  }

  function setUp() public {
    deployMocks();
    deployConnext(uint256(domain), xAppConnectionManager, tokenRegistry, address(wrapper), address(relayerFeeRouter));

    // TestSetterFacetCut
    testSetterFacet = new TestSetterFacet();
    IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);
    facetCuts[0] = getTestSetterFacetCut(address(testSetterFacet));
    IDiamondCut(address(connextDiamondProxy)).diamondCut(facetCuts, address(0), "");

    // Setup asset
    IConnextFacets(address(connextDiamondProxy)).setupAsset(
      ConnextMessage.TokenId(domain, bytes32(abi.encodePacked(canonical))),
      address(originAdopted),
      stableSwap
    );

    // Setup asset wrapper
    IConnextFacets(address(connextDiamondProxy)).setupAsset(
      ConnextMessage.TokenId(domain, bytes32(abi.encodePacked(address(wrapper)))),
      address(wrapper),
      stableSwap
    );

    IConnextFacets(address(connextDiamondProxy)).enrollRemoteRouter(destinationDomain, remote);

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

    connext = IConnextFacets(address(connextDiamondProxy));
  }

  // ============ setMaxRouters ============

  // Should work
  function test_ConnextHandler__setMaxRouters_works() public {
    require(IConnextFacets(address(connextDiamondProxy)).maxRoutersPerTransfer() != 10);

    vm.expectEmit(true, true, true, true);
    emit MaxRoutersPerTransferUpdated(10, address(this));

    IConnextFacets(address(connextDiamondProxy)).setMaxRoutersPerTransfer(10);
    assertEq(IConnextFacets(address(connextDiamondProxy)).maxRoutersPerTransfer(), 10);
  }

  // Fail if not called by owner
  function test_ConnextHandler__setMaxRouters_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert(abi.encodeWithSelector(BaseConnextFacet.BaseConnextFacet__onlyOwner_notOwner.selector));
    IConnextFacets(address(connextDiamondProxy)).setMaxRoutersPerTransfer(10);
  }

  // Fail maxRouters is 0
  function test_ConnextHandler__setMaxRouters_failsIfEmpty() public {
    vm.expectRevert(
      abi.encodeWithSelector(RoutersFacet.RoutersFacet__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer.selector)
    );
    IConnextFacets(address(connextDiamondProxy)).setMaxRoutersPerTransfer(0);
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

    IConnextFacets(address(connextDiamondProxy)).initiateClaim(uint32(1), kakaroto, transactionIds);
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

    IConnextFacets(address(connextDiamondProxy)).initiateClaim(uint32(domain), kakaroto, transactionIds);
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

    IConnextFacets(address(connextDiamondProxy)).claim(kakaroto, transactionIds);
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

    IConnextFacets(address(connextDiamondProxy)).claim(kakaroto, transactionIds);

    assertEq(kakaroto.balance, balanceBefore + aaaFee + bbbFee);
    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(bytes32("AAA")), 0);
    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(bytes32("BBB")), 0);
  }

  // ============ xCall ============

  // Update relayerFees mapping
  function test_ConnextHandler__xcall_increasesRelayerFees() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(to, bytes("0x"), domain, destinationDomain);
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(id), 0);

    IConnextFacets(address(connextDiamondProxy)).xcall{value: relayerFee}(args);

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(id), relayerFee);
  }

  // Emit relayerFees in XCalled event
  function test_ConnextHandler__xcall_emitsRelayerFeeInXCalled() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(to, bytes(""), domain, destinationDomain);
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    // TODO Correctly calculate the message
    // Harcoded the message from the emitted event since here we are only testing that relayerFee is included
    bytes
      memory message = hex"00000001000000000000000000000000c94cf1a6d4b8a25e424b3ed8792eed1f1b95b86e030000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000020b4b2eeb4ea213a5e7d1e1d2a3a1a437fbe7c8b3490898b0474b0fe66dda70aca0184c1e32ae98daca86416c9ece9d32771270d0b1ef32fb55bf30918e8cc7b";

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
    IConnextFacets(address(connextDiamondProxy)).xcall{value: relayerFee}(args);
  }

  // Works if relayerFee is set to 0
  function test_ConnextHandler__xcall_zeroRelayerFeeWorks() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(to, bytes("0x"), domain, destinationDomain);
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(id), 0);

    IConnextFacets(address(connextDiamondProxy)).xcall{value: relayerFee}(args);

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(id), 0);
  }

  // Correctly account for relayerFee in token transfer
  function test_ConnextHandler__xcall_considersRelayerFeeValueInTokenTransfer() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(to, bytes("0x"), domain, destinationDomain);
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    IConnextFacets(address(connextDiamondProxy)).xcall{value: relayerFee}(args);

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(id), relayerFee);
  }

  // Correctly account for relayerFee in native transfer
  function test_ConnextHandler__xcall_considersRelayerFeeValueInNativeTransfer() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(0);

    CallParams memory callParams = CallParams(to, bytes("0x"), domain, destinationDomain);
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(wrapper)), domain, amount)
    );

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(wrapper))
    );

    IConnextFacets(address(connextDiamondProxy)).xcall{value: amount + relayerFee}(args);

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(id), relayerFee);
  }

  // Fail if relayerFee in param and value does not match in token transfer
  function test_ConnextHandler__xcall_failsIfDifferentRelayerFeeValueAndParamInTokenTransfer() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(to, bytes("0x"), domain, destinationDomain);
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_ethWithErcTransfer.selector));
    IConnextFacets(address(connextDiamondProxy)).xcall{value: 0}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_ethWithErcTransfer.selector));
    IConnextFacets(address(connextDiamondProxy)).xcall{value: relayerFee - 1}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_ethWithErcTransfer.selector));
    IConnextFacets(address(connextDiamondProxy)).xcall{value: relayerFee + 1}(args);
  }

  // Fail if relayerFee in param and value does not match in native transfer
  function test_ConnextHandler__xcall_failsIfDifferentRelayerFeeValueAndParamInNativeTransfer() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(0);

    CallParams memory callParams = CallParams(to, bytes("0x"), domain, destinationDomain);
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(wrapper))
    );

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    IConnextFacets(address(connextDiamondProxy)).xcall{value: amount}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    IConnextFacets(address(connextDiamondProxy)).xcall{value: amount + relayerFee - 1}(args);

    vm.expectRevert(abi.encodeWithSelector(AssetLogic.AssetLogic__handleIncomingAsset_notAmount.selector));
    IConnextFacets(address(connextDiamondProxy)).xcall{value: amount + relayerFee + 1}(args);
  }

  // ============ bumpTransfer ============

  // Increases relayerFees set by xcall
  function test_ConnextHandler__bumpTransfer_increasesXCallRelayerFees() public {
    address to = address(100);
    uint256 amount = 1 ether;
    uint256 relayerFee = 0.01 ether;
    address transactingAssetId = address(originAdopted);

    CallParams memory callParams = CallParams(to, bytes(""), domain, destinationDomain);
    XCallArgs memory args = XCallArgs(callParams, transactingAssetId, amount, relayerFee);

    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(id), 0);

    IConnextFacets(address(connextDiamondProxy)).xcall{value: relayerFee}(args);

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(id), relayerFee);

    uint256 relayerFeeBump = 0.3 ether;
    IConnextFacets(address(connextDiamondProxy)).bumpTransfer{value: relayerFeeBump}(id);

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(id), relayerFee + relayerFeeBump);
  }

  // Increases relayerFees for the transfer
  function test_ConnextHandler__bumpTransfer_increasesRelayerFees() public {
    bytes32 transferId = bytes32("0x123");

    uint256 initialFee = 0.01 ether;
    TestSetterFacet(address(connextDiamondProxy)).setTestRelayerFees(transferId, initialFee);

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(transferId), initialFee);

    uint256 amount1 = 1 ether;
    IConnextFacets(address(connextDiamondProxy)).bumpTransfer{value: amount1}(transferId);

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(transferId), initialFee + amount1);

    uint256 amount2 = 2 ether;
    IConnextFacets(address(connextDiamondProxy)).bumpTransfer{value: amount2}(transferId);

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(transferId), initialFee + amount1 + amount2);
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
    IConnextFacets(address(connextDiamondProxy)).bumpTransfer{value: bump1}(transferId);

    vm.expectEmit(true, false, false, true);
    emit TransferRelayerFeesUpdated(transferId, initialFee + bump1 + bump2, address(this));
    IConnextFacets(address(connextDiamondProxy)).bumpTransfer{value: bump2}(transferId);
  }

  // Fail if zero value
  function test_ConnextHandler__bumpTransfer_failsIfZeroValue() public {
    bytes32 transferId = bytes32("0x123");

    uint256 initialFee = 0.01 ether;
    TestSetterFacet(address(connextDiamondProxy)).setTestRelayerFees(transferId, initialFee);

    vm.expectRevert(abi.encodeWithSelector(BridgeFacet.BridgeFacet__bumpTransfer_valueIsZero.selector));
    IConnextFacets(address(connextDiamondProxy)).bumpTransfer{value: 0}(transferId);
  }

  // Works if initial relayerFees is zero
  function test_ConnextHandler__bumpTransfer_initialFeeZeroWorks() public {
    bytes32 transferId = bytes32("0x123");

    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(transferId), 0);

    uint256 newFee = 0.01 ether;
    IConnextFacets(address(connextDiamondProxy)).bumpTransfer{value: newFee}(transferId);
    assertEq(IConnextFacets(address(connextDiamondProxy)).relayerFees(transferId), newFee);
  }
}
