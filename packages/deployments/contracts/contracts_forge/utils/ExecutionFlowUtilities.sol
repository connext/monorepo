// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {TypeCasts} from "../../contracts/shared/libraries/TypeCasts.sol";
import {TokenId} from "../../contracts/core/connext/libraries/TokenId.sol";
import {DestinationTransferStatus, TransferInfo} from "../../contracts/core/connext/libraries/LibConnextStorage.sol";

import {IConnectorManager} from "../../contracts/messaging/interfaces/IConnectorManager.sol";
import {IConnext} from "../../contracts/core/connext/interfaces/IConnext.sol";

import {LPToken} from "../../contracts/core/connext/helpers/LPToken.sol";

import {ExecuteArgs} from "../../contracts/core/connext/facets/BridgeFacet.sol";

import {TestERC20} from "../../contracts/test/TestERC20.sol";

import "./Mock.sol";
import "./ForgeHelper.sol";
import "./Messaging.sol";

import "forge-std/console.sol";

/**
 * @notice This contract is used to test the execution of a transfer.
 * Needs Connext and messaging layer fully deployed, either via fork or via
 * mocks. Will test that `xcall` works, the proper events are emitted, balances
 * change as expected, etc.
 *
 * @dev Inheriting contracts should have setup functions that ensure the storage
 * values are properly set:
 */

// Holds all balances that are impacted by an xcall
struct XCallBalances {
  uint256 bridgeTransacting;
  uint256 bridgeLocal;
  uint256 bridgeNative;
  uint256 callerTransacting;
  uint256 callerNative;
}

// Holds all balances that are impacted by an execute
struct ExecuteBalances {
  uint256 bridgeLocal;
  uint256 bridgeReceiving; // local -or- adopted
  uint256[] liquidity;
  uint256 toReceiving; // local -or- adopted
}

// Holds all balances that are impacted by a reconcile
struct ReconcileBalances {
  uint256[] liquidity;
  uint256 portalDebt;
  uint256 portalFeeDebt;
}

contract ExecutionFlowUtilities is ForgeHelper {
  // ============ Events ============
  event XCalled(
    bytes32 indexed transferId,
    uint256 indexed nonce,
    bytes32 indexed messageHash,
    TransferInfo params,
    address asset,
    uint256 amount,
    address local,
    bytes messageBody
  );

  event Executed(
    bytes32 indexed transferId,
    address indexed to,
    address indexed asset,
    ExecuteArgs args,
    address local,
    uint256 amount,
    address caller
  );

  event TransferRelayerFeesIncreased(bytes32 indexed transferId, uint256 increase, address asset, address caller);

  event Reconciled(
    bytes32 indexed transferId,
    uint32 indexed originDomain,
    address indexed local,
    address[] routers,
    uint256 amount,
    address caller
  );

  // ============ Storage ============
  uint256 immutable MIN_BALANCE = 100 ether;
  // ============ Constants
  // ============ Config
  uint32 _origin;
  uint32 _destination;
  uint32 _other; // TODO: remove?

  // ============ Assets
  address _canonical;
  uint32 _canonicalDomain;
  bytes32 _canonicalKey;

  address _originLocal;
  address _originAdopted;
  address _originLp; // deployed IFF pool init-d

  address _destinationLocal;
  address _destinationAdopted;
  address _destinationLp; // deployed IFF pool init-d

  // ============ IConnectorManager
  IConnectorManager _originManager;
  IConnectorManager _destinationManager;

  // ============ Relayer fee vaults
  address _originRelayerFee;
  address _destinationRelayerFee;

  // ============ Connext
  IConnext _originConnext;
  IConnext _destinationConnext;

  // ============ Payable ============
  receive() external payable {}

  // ============ Setup helpers ============

  // Use if testing enrolling fresh assets
  function utils_deployFreshAssets() internal {
    // deploy tokens
    _canonical = address(new TestERC20("Test Token", "TEST"));
    _originLocal = address(new TestERC20("Test Token", "TEST"));
    _originAdopted = address(new TestERC20("Test Token", "TEST"));
    _destinationLocal = address(new TestERC20("Test Token", "TEST"));
    _destinationAdopted = address(new TestERC20("Test Token", "TEST"));
  }

  // Used to initialize swap pools. Must be called after connext is deployed
  // and after assets are stored
  function utils_setupPool(uint32 domain, bytes32 canonicalKey, uint256 amount) internal {
    // assert assets are set
    bool isOrigin = domain == _origin;
    address local = isOrigin ? _originLocal : _destinationLocal;
    address adopted = isOrigin ? _originAdopted : _destinationAdopted;
    address connext = isOrigin ? address(_originConnext) : address(_destinationConnext);
    assertTrue(local != address(0), "local not set");
    assertTrue(adopted != address(0), "adopted not set");
    // assert connext instances are set
    assertTrue(connext != address(0), "connext not set");

    // begin setup

    // get tokens
    IERC20[] memory pooledTokens = new IERC20[](2);
    pooledTokens[0] = IERC20(local);
    pooledTokens[1] = IERC20(adopted);

    // get decimals
    uint8[] memory decimals = new uint8[](2);
    decimals[0] = 18;
    decimals[1] = 18;

    {
      string memory LP_TOKEN_NAME = "Test LP Token Name";
      string memory LP_TOKEN_SYMBOL = "TESTLP";

      // initialize pool
      vm.prank(IConnext(connext).owner());
      IConnext(connext).initializeSwap(
        canonicalKey, // canonicalkey
        pooledTokens, // pooled
        decimals, // decimals
        LP_TOKEN_NAME, // lp token name
        LP_TOKEN_SYMBOL, // lp token symbol
        50, // initialAValue
        0, // fee
        0
      );

      if (amount == 0) {
        return;
      }

      // fund the pool
      uint256[] memory amounts = new uint256[](2);
      amounts[0] = amount;
      amounts[1] = amount;

      pooledTokens[0].approve(connext, amount);
      pooledTokens[1].approve(connext, amount);

      IConnext(connext).addSwapLiquidity(canonicalKey, amounts, 0, block.timestamp + 60);
      assertTrue(IConnext(connext).getSwapVirtualPrice(canonicalKey) != 0);
    }
  }

  function utils_mintIfNeeded(TestERC20 asset, address mintTo) internal {
    if (asset.balanceOf(mintTo) < MIN_BALANCE) {
      asset.mint(mintTo, 10_000 ether);
    }
  }

  function utils_mintIfNeeded(TestERC20 asset) internal {
    utils_mintIfNeeded(asset, address(this));
  }

  // Used to enroll assets, setup the pools, mint assets. Should generally be called IF there
  // are freshly deployed assets being used in tests. Used in fork tests
  function utils_setupOriginAssets(uint32 canonicalDomain, bool localIsAdopted, uint256 cap) internal {
    bytes32 canonicalId = TypeCasts.addressToBytes32(_canonical);
    _canonicalDomain = canonicalDomain;
    _canonicalKey = keccak256(abi.encode(canonicalId, _canonicalDomain));

    if (_origin == canonicalDomain) {
      // The canonical domain is the origin, meaning any local
      // assets on the origin should be the canonical
      _originAdopted = _canonical;
      _originLocal = _canonical;
    } else {
      // otherwise, could be anything but cap should always be 0
      cap = 0;
    }

    if (localIsAdopted) {
      _originAdopted = _originLocal;
    }

    // mint the asset
    utils_mintIfNeeded(TestERC20(_originLocal));
    utils_mintIfNeeded(TestERC20(_originAdopted));

    // Set up asset allowlist
    vm.prank(_originConnext.owner());
    if (_origin == canonicalDomain) {
      _originConnext.setupAsset(TokenId(canonicalDomain, canonicalId), 18, "", "", address(0), address(0), cap);
    } else {
      _originConnext.setupAssetWithDeployedRepresentation(
        TokenId(canonicalDomain, canonicalId),
        _originLocal,
        localIsAdopted ? address(0) : _originAdopted,
        address(0)
      );
    }

    // setup + fund the pools if needed
    if (_originLocal != _originAdopted) {
      utils_setupPool(_origin, _canonicalKey, 100 ether);
    }
  }

  // Used to enroll assets, setup the pools, mint assets. Should generally be called IF there
  // are freshly deployed assets being used in tests. Used in fork tests
  function utils_setupDestinationAssets(uint32 canonicalDomain, bool localIsAdopted, uint256 cap) internal {
    bytes32 canonicalId = TypeCasts.addressToBytes32(_canonical);
    _canonicalDomain = canonicalDomain;
    _canonicalKey = keccak256(abi.encode(canonicalId, _canonicalDomain));

    if (_destination == canonicalDomain) {
      _destinationAdopted = _canonical;
      _destinationLocal = _canonical;
    } else {
      // otherwise, could be anything but cap should always be 0
      cap = 0;
    }

    if (localIsAdopted) {
      _destinationAdopted = _destinationLocal;
    }

    // mint the asset
    utils_mintIfNeeded(TestERC20(_destinationLocal));
    utils_mintIfNeeded(TestERC20(_destinationAdopted));

    if (_destination == canonicalDomain) {
      // on canonical destination domain, make sure the asset is custodied
      utils_mintIfNeeded(TestERC20(_destinationLocal), address(_destinationConnext));
      vm.prank(_destinationConnext.owner());
      _destinationConnext.setupAsset(TokenId(canonicalDomain, canonicalId), 18, "", "", address(0), address(0), cap);
    } else {
      vm.prank(_destinationConnext.owner());
      _destinationConnext.setupAssetWithDeployedRepresentation(
        TokenId(canonicalDomain, canonicalId),
        _destinationLocal,
        localIsAdopted ? address(0) : _destinationAdopted,
        address(0)
      );
    }

    // setup pool if needed
    if (_destinationLocal != _destinationAdopted) {
      utils_setupPool(_destination, _canonicalKey, 100 ether);
    }
  }

  // Combines both setup assets into a single call when running integration tests that are not
  // on forks
  function utils_setupAssets(uint32 canonicalDomain, bool localIsAdopted) internal {
    utils_setupOriginAssets(canonicalDomain, localIsAdopted, 10_000 ether);
    utils_setupDestinationAssets(canonicalDomain, localIsAdopted, 10_000 ether);
  }

  // Used to generate transfer info struct.
  function utils_createTransferIdInformation(
    uint32 destination,
    uint256 amount,
    uint256 bridgedAmount
  ) internal view returns (TransferInfo memory) {
    bool sendToDest = destination == _destination;
    bytes32 canonicalId = TypeCasts.addressToBytes32(_canonical);
    return
      TransferInfo({
        originDomain: sendToDest ? _origin : _destination,
        destinationDomain: destination,
        canonicalDomain: _canonicalDomain,
        to: address(1111),
        delegate: address(2222),
        receiveLocal: false,
        callData: bytes(""),
        slippage: 1000,
        // These items would normally be replaced in the nested internal _xcall,
        // but will be defined as the "expected values" for the purpose of getting
        // the expected transfer ID.
        originSender: address(this),
        bridgedAmt: bridgedAmount,
        normalizedIn: amount,
        nonce: _originConnext.nonce(),
        canonicalId: canonicalId
      });
  }

  // ============ XCall helpers ============
  function utils_getXCallBalances(address transacting, address bridge) internal returns (XCallBalances memory) {
    // assert assets are set
    assertTrue(_originLocal != address(0), "origin local not set");
    assertTrue(_destinationLocal != address(0), "destination local not set");
    assertTrue(address(_destinationConnext) != address(0), "destination connext not set");
    bool isDestination = bridge == address(_destinationConnext);
    return
      XCallBalances(
        transacting == address(0) ? bridge.balance : IERC20(transacting).balanceOf(bridge), // bridge transacting balance (what will sit there)
        IERC20(isDestination ? _destinationLocal : _originLocal).balanceOf(bridge), // bridge local balance
        bridge.balance, // bridge native balance
        transacting == address(0) ? address(this).balance : IERC20(transacting).balanceOf(address(this)), // caller transacting balance
        address(this).balance
      );
  }

  function utils_xcallAndAssert(
    TransferInfo memory params,
    address asset, // input asset
    uint256 amount, // input amount
    uint256 relayerFee
  ) internal returns (bytes32) {
    XCallBalances memory initial;
    if (asset != address(0)) {
      // Approve the bridge to spend the input tokens.
      IERC20(asset).approve(address(_originConnext), amount);
      // Get initial balances if applicable.
      initial = utils_getXCallBalances(asset, address(_originConnext));
    }

    {
      // Expect a Transfer fee event.
      if (relayerFee > 0) {
        vm.expectEmit(true, true, true, true);
        emit TransferRelayerFeesIncreased(keccak256(abi.encode(params)), relayerFee, address(0), address(this));
      }
    }

    {
      // Expect an XCalled event.
      bytes memory messageBody = MessagingUtils.formatDispatchedTransferMessage(
        params,
        address(_originConnext),
        address(_destinationConnext),
        IOutbox(address(IConnectorManager(address(_originManager)).home())).nonces(params.destinationDomain)
      );
      bytes32 messageHash = keccak256(messageBody);
      vm.expectEmit(true, true, true, true);
      emit XCalled(
        keccak256(abi.encode(params)),
        params.nonce,
        messageHash,
        params,
        asset,
        amount,
        (params.canonicalId == bytes32("") && params.canonicalDomain == uint32(0)) ? address(0) : _originLocal,
        messageBody
      );
    }

    bytes32 ret;
    {
      // Make call.
      ret = _originConnext.xcall{value: relayerFee}(
        params.destinationDomain,
        params.to,
        asset,
        params.delegate,
        amount,
        params.slippage,
        params.callData
      );
      // Compare returned transfer ID to expected transfer ID from expected call params.
      assertEq(ret, keccak256(abi.encode(params)), "returned transfer id != expected");
    }

    // Check balances if applicable.
    if (asset != address(0)) {
      XCallBalances memory end = utils_getXCallBalances(asset, address(_originConnext));

      // FIXME:
      // TODO: do we need these assertions? they were there for the original separated bridge router but i dont know if they make sense anymore
      // assertEq(
      //   end.bridgeTransacting,
      //   asset == _originLocal
      //     ? initial.bridgeTransacting // will be transferred
      //     : initial.bridgeTransacting + amount // will be swapped
      // );
      // assertEq(
      //   end.bridgeLocal,
      //   // on xcall, local will be (1) transferred (or swapped) in, (2) sent to the bridge router
      //   // meaning the balance should only change by the amount swapped
      //   asset == _originLocal ? initial.bridgeLocal : initial.bridgeLocal - params.bridgedAmt
      // );
      assertEq(
        end.bridgeNative,
        IConnext(_originConnext).relayerFeeVault() == address(_originConnext)
          ? initial.bridgeNative + relayerFee
          : initial.bridgeNative,
        "invalid bridge native asset balance"
      );
      assertEq(end.callerTransacting, initial.callerTransacting - amount, "invalid caller transacting amount");
      assertEq(end.callerNative, initial.callerNative - relayerFee, "invalid caller native asset balance");
    }

    return ret;
  }

  // ============ Execute helpers ============

  function utils_createRouters(
    uint256 num,
    bytes32 transferId,
    uint256 liquidity
  ) internal returns (address[] memory, bytes[] memory) {
    // Ensure config set properly
    assertTrue(_destinationLocal != address(0), "destination local not set");
    assertTrue(address(_destinationConnext) != address(0), "destination connext not set");

    if (num == 0) {
      address[] memory routers;
      bytes[] memory signatures;
      return (routers, signatures);
    }
    address[] memory routers = new address[](num);
    bytes[] memory signatures = new bytes[](num);

    bytes32 toSign = ECDSA.toEthSignedMessageHash(keccak256(abi.encode(transferId, num)));

    // setup liquidity
    if (liquidity != 0) {
      IERC20(_destinationLocal).approve(address(_destinationConnext), liquidity * num);
    }
    for (uint256 i; i < num; ) {
      routers[i] = vm.addr(777 + i);
      (uint8 v, bytes32 r, bytes32 _s) = vm.sign(777 + i, toSign);
      signatures[i] = abi.encodePacked(r, _s, v);

      // allowlist all routers
      if (!_destinationConnext.getRouterApproval(routers[i])) {
        vm.prank(_destinationConnext.owner());
        _destinationConnext.approveRouter(routers[i]);
        vm.prank(routers[i]);
        _destinationConnext.initializeRouter(address(0), address(0));
      }

      // add liquidity for all routers
      if (liquidity != 0) {
        _destinationConnext.addRouterLiquidityFor(liquidity, _destinationLocal, routers[i]);
      }

      unchecked {
        ++i;
      }
    }

    return (routers, signatures);
  }

  function utils_createSequencer(
    bytes32 transferId,
    address[] memory routers
  ) internal returns (address, bytes memory) {
    assertTrue(address(_originConnext) != address(0), "origin connext not set");
    assertTrue(address(_destinationConnext) != address(0), "destination connext not set");
    uint256 key = 0xA11CE;
    address sequencer = vm.addr(key);
    if (!_destinationConnext.approvedSequencers(sequencer)) {
      vm.prank(_destinationConnext.owner());
      _destinationConnext.addSequencer(sequencer);
    }

    bytes32 preImage = keccak256(abi.encode(transferId, routers));
    bytes32 toSign = ECDSA.toEthSignedMessageHash(preImage);
    (uint8 v, bytes32 r, bytes32 _s) = vm.sign(key, toSign);
    return (sequencer, abi.encodePacked(r, _s, v));
  }

  function utils_createExecuteArgs(
    TransferInfo memory params,
    bytes32 transferId,
    uint256 pathLen,
    uint256 liquidity
  ) internal returns (ExecuteArgs memory) {
    (address[] memory routers, bytes[] memory routerSignatures) = utils_createRouters(pathLen, transferId, liquidity);
    (address sequencer, bytes memory sequencerSignature) = utils_createSequencer(transferId, routers);
    return
      ExecuteArgs(
        params, // TransferInfo
        routers, // routers
        routerSignatures, // router signatures
        sequencer, // sequencer
        sequencerSignature // sequencer signatures
      );
  }

  function utils_createExecuteArgs(TransferInfo memory params, uint256 pathLen) internal returns (ExecuteArgs memory) {
    bytes32 transferId = keccak256(abi.encode(params));
    return utils_createExecuteArgs(params, transferId, pathLen, 20 ether);
  }

  function utils_getFastTransferAmount(uint256 amount) internal pure returns (uint256) {
    return (amount * 9995) / 10000;
  }

  function utils_getExecuteBalances(
    address local,
    address receiving,
    address bridge,
    address recipient,
    address[] memory routers
  ) internal returns (ExecuteBalances memory) {
    assertTrue(address(_destinationConnext) != address(0), "destination connext not set");
    uint256[] memory routerBalances = new uint256[](routers.length);
    for (uint256 i; i < routers.length; ) {
      routerBalances[i] = _destinationConnext.routerBalances(routers[i], local);
      unchecked {
        ++i;
      }
    }
    return
      ExecuteBalances(
        local == address(0) ? bridge.balance : IERC20(local).balanceOf(bridge), // bridge local
        IERC20(receiving).balanceOf(bridge), // bridge receiving
        routerBalances, // router liquidity
        IERC20(receiving).balanceOf(recipient) // to receive
      );
  }

  function utils_executeAndAssert(
    ExecuteArgs memory args,
    bytes32 transferId,
    uint256 bridgeOut,
    uint256 vaultOut,
    bool usesPortals
  ) internal {
    assertTrue(address(_destinationConnext) != address(0), "destination connext not set");
    assertTrue(address(_destinationLocal) != address(0), "destination local not set");

    address receiving = args.params.canonicalDomain == 0 ? address(0) : args.params.receiveLocal
      ? _destinationLocal
      : _destinationAdopted;

    // Get initial balances, if applicable.
    bool zeroAmountTransfer = args.params.bridgedAmt == 0;
    ExecuteBalances memory initial;
    if (!zeroAmountTransfer) {
      initial = utils_getExecuteBalances(
        _destinationLocal,
        receiving,
        address(_destinationConnext),
        args.params.to,
        args.routers
      );
    }

    // Expect an event.
    vm.expectEmit(true, true, true, true);
    emit Executed(
      transferId,
      args.params.to,
      receiving,
      args,
      args.params.canonicalId == bytes32("") && args.params.canonicalDomain == uint32(0)
        ? address(0)
        : _destinationLocal,
      bridgeOut + vaultOut,
      address(this)
    );

    // Execute on the bridge.
    _destinationConnext.execute(args);

    uint256 pathLen = args.routers.length;
    bool isFast = pathLen != 0;
    // Assert updated balances, if applicable.
    if (zeroAmountTransfer) {
      return;
    }
    ExecuteBalances memory end = utils_getExecuteBalances(
      _destinationLocal,
      receiving,
      address(_destinationConnext),
      args.params.to,
      args.routers
    );

    // You are using internal swaps, so the amount of the local asset on the bridge
    // should *not* change iff you are using adopted assets. However, the router liquidity
    // and bridge adopted balance should drop
    if (!args.params.receiveLocal && _destinationLocal != _destinationAdopted) {
      assertEq(end.bridgeLocal, initial.bridgeLocal);
    } // else, local checked in receiving
    assertEq(end.bridgeReceiving, usesPortals ? initial.bridgeReceiving : initial.bridgeReceiving - bridgeOut);

    // router loses the liquidity it provides (local)
    uint256 debited = isFast ? (utils_getFastTransferAmount(args.params.bridgedAmt)) / pathLen : 0;
    address[] memory stored = _destinationConnext.routedTransfers(transferId);
    if (isFast) {
      for (uint256 i; i <= pathLen - 1; i++) {
        assertEq(stored[i], args.routers[i]);
        assertEq(end.liquidity[i], usesPortals ? initial.liquidity[i] : initial.liquidity[i] - debited);
      }

      uint256 sweep = isFast ? debited + (args.params.bridgedAmt % pathLen) : 0;
      assertEq(stored[pathLen - 1], args.routers[pathLen - 1]);
      assertEq(
        end.liquidity[pathLen - 1],
        usesPortals ? initial.liquidity[pathLen - 1] : initial.liquidity[pathLen - 1] - sweep
      );
    } else {
      assertEq(stored.length, 0);
    }

    // recipient gains (adopted/specified)
    assertEq(end.toReceiving, initial.toReceiving + bridgeOut + vaultOut);

    // status updated
    assertEq(
      uint256(_destinationConnext.transferStatus(transferId)),
      isFast ? uint256(DestinationTransferStatus.Executed) : uint256(DestinationTransferStatus.Completed)
    );

    if (!usesPortals) {
      return;
    }
    assertEq(_destinationConnext.getAavePortalDebt(transferId), bridgeOut);
    assertEq(
      _destinationConnext.getAavePortalFeeDebt(transferId),
      (bridgeOut * _destinationConnext.aavePortalFee()) / 10000
    );
  }

  // Shortcut: no vault or portals.
  function utils_executeAndAssert(ExecuteArgs memory args, bytes32 transferId, uint256 bridgeOut) internal {
    utils_executeAndAssert(args, transferId, bridgeOut, 0, false);
  }

  // ============ Reconcile helpers ============
  function utils_getReconcileBalances(
    bytes32 transferId,
    address[] memory routers
  ) internal returns (ReconcileBalances memory) {
    assertTrue(address(_destinationConnext) != address(0), "destination connext not set");
    uint256[] memory initLiquidity = new uint256[](routers.length);
    for (uint256 i; i < routers.length; i++) {
      initLiquidity[i] = _destinationConnext.routerBalances(routers[i], _destinationLocal);
    }
    return
      ReconcileBalances(
        initLiquidity,
        _destinationConnext.getAavePortalDebt(transferId),
        _destinationConnext.getAavePortalFeeDebt(transferId)
      );
  }

  function utils_reconcileAndAssert(TransferInfo memory params, bytes32 transferId, address[] memory routers) internal {
    assertTrue(address(_destinationConnext) != address(0), "destination connext not set");
    assertTrue(address(_destinationLocal) != address(0), "destination local not set");

    uint256 bridgedAmt = params.bridgedAmt;
    // NOTE: the bridge router handles the minting and custodying of assets. as far
    // as connext is concerned, the funds will *always* be transferred to the contract
    // when `reconcile` is called. Mint funds to the contract to mock
    // TestERC20(_destinationLocal).mint(address(_destinationConnext), bridgedAmt);

    // Get initial bridge balance and router liquidity
    ReconcileBalances memory initial = utils_getReconcileBalances(transferId, routers);

    // Get message
    bytes memory message = MessagingUtils.formatTransferMessage(params);

    // expect emit
    vm.expectEmit(true, true, true, true);
    emit Reconciled(
      transferId,
      _origin,
      params.canonicalId == bytes32("") && params.canonicalDomain == uint32(0) ? address(0) : _destinationLocal,
      routers,
      bridgedAmt,
      address(_destinationManager)
    );

    vm.prank(address(_destinationManager));
    _destinationConnext.handle(_origin, 0, TypeCasts.addressToBytes32(address(_originConnext)), message);

    ReconcileBalances memory end = utils_getReconcileBalances(transferId, routers);
    // assert router liquidity balance
    bool isFast = routers.length != 0;
    uint256 credited = isFast ? bridgedAmt / routers.length : 0;
    for (uint256 i; i < routers.length; i++) {
      assertEq(end.liquidity[i], initial.liquidity[i] + credited);
    }

    // assert portal balance didnt change during reconcile call
    assertEq(end.portalDebt, initial.portalDebt);
    assertEq(end.portalFeeDebt, initial.portalFeeDebt);
    // assert transfer marked as reconciled
    DestinationTransferStatus expected = isFast
      ? DestinationTransferStatus.Completed
      : DestinationTransferStatus.Reconciled;
    assertTrue(_destinationConnext.transferStatus(transferId) == expected);
  }

  // ============ Test logic helpers ============
  // Performs a fast transfer without any portals
  function utils_performFastExecutionTest(
    TransferInfo memory params,
    address transactingAsset,
    uint256 relayerFee,
    uint256 amount, // amount sent in
    uint256 amountReceived, // amount received on destination
    uint256 pathLen,
    uint256 routerLiquidity
  ) internal {
    // 1. `xcall` on the origin
    bytes32 transferId = utils_xcallAndAssert(params, transactingAsset, amount, relayerFee);

    // 2. call `execute` on the destination
    ExecuteArgs memory execute = utils_createExecuteArgs(
      params,
      transferId,
      pathLen,
      routerLiquidity // liquidity router has at start
    );
    utils_executeAndAssert(execute, transferId, amountReceived);

    // 3. call `handle` on the destination
    utils_reconcileAndAssert(params, transferId, execute.routers);
  }

  // Performs a slow transfer
  function utils_performSlowExecutionTest(
    TransferInfo memory params,
    address transactingAsset,
    uint256 relayerFee,
    uint256 amount, // amount sent in
    uint256 amountReceived, // amount received on destination
    uint256 pathLen,
    uint256 routerLiquidity
  ) internal {
    // 1. `xcall` on the origin
    bytes32 transferId = utils_xcallAndAssert(params, transactingAsset, amount, relayerFee);

    // create execute args
    ExecuteArgs memory execute = utils_createExecuteArgs(
      params,
      transferId,
      pathLen,
      routerLiquidity // liquidity router has at start
    );

    // 2. reconcile on the destination
    utils_reconcileAndAssert(params, transferId, execute.routers);

    // 3. execute
    utils_executeAndAssert(execute, transferId, amountReceived);
  }
}
