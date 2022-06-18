// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import {XAppConnectionManager} from "../contracts/nomad-core/contracts/XAppConnectionManager.sol";
import {TypeCasts} from "../contracts/nomad-core/libs/TypeCasts.sol";

import {IConnextHandler} from "../contracts/core/connext/interfaces/IConnextHandler.sol";
import {ITokenRegistry} from "../contracts/core/connext/interfaces/ITokenRegistry.sol";

import "../contracts/core/connext/facets/BridgeFacet.sol";

import {TokenRegistry} from "../contracts/core/connext/helpers/TokenRegistry.sol";
import {LPToken} from "../contracts/core/connext/helpers/LPToken.sol";

import {PromiseRouter} from "../contracts/core/promise/PromiseRouter.sol";

import {RelayerFeeRouter} from "../contracts/core/relayer-fee/RelayerFeeRouter.sol";

import {TestERC20} from "../contracts/test/TestERC20.sol";
import {WETH} from "../contracts/test/TestWeth.sol";

import "./utils/ForgeHelper.sol";
import "./utils/Mock.sol";
import "./utils/Deployer.sol";

struct XCalledEventArgs {
  address transactingAssetId;
  uint256 amount;
  uint256 bridgedAmt;
  address bridged;
}

// Holds all balances that are impacted by an xcall
struct XCallBalances {
  uint256 bridgeTransacting;
  uint256 bridgeLocal;
  uint256 bridgeNative;
  uint256 callerTransacting;
  uint256 callerNative;
}

contract ConnextTest is ForgeHelper, Deployer {
  // ============ Events ============
  event XCalled(
    bytes32 indexed transferId,
    XCallArgs xcallArgs,
    XCalledEventArgs args,
    uint256 nonce,
    bytes message,
    address caller
  );

  // ============ Storage ============
  // ============ Config
  uint32 _origin = 1111;
  uint32 _destination = 2221;
  uint32 _other = 3331;

  // ============ Assets
  address _canonical;
  uint32 _canonicalDomain;

  address _originWrapper;
  address _originLocal;
  address _originAdopted;
  address _originLp; // deployed IFF pool init-d

  address _destinationWrapper;
  address _destinationLocal;
  address _destinationAdopted;
  address _destinationLp; // deployed IFF pool init-d

  // ============ XAppConnectionManager
  XAppConnectionManager _originManager;
  XAppConnectionManager _destinationManager;

  // ============ TokenRegistry
  TokenRegistry _originRegistry;
  TokenRegistry _destinationRegistry;

  // ============ Promise router
  PromiseRouter _originPromise;
  PromiseRouter _destinationPromise;

  // ============ Relayer fee router
  RelayerFeeRouter _originRelayerFee;
  RelayerFeeRouter _destinationRelayerFee;

  // ============ Connext
  IConnextHandler _originConnext;
  IConnextHandler _destinationConnext;

  // ============ Test set up ============
  function setUp() public {
    // Deploy all the contracts
    utils_deployAssets();
    utils_deployNomad();
    utils_deployConnext();
  }

  // ============ Utils ============

  function utils_deployAssets() public {
    // deploy wrappers
    _canonical = address(new TestERC20());
    _originWrapper = address(new WETH());
    _originLocal = address(new TestERC20());
    _originAdopted = address(new TestERC20());
    _destinationWrapper = address(new WETH());
    _destinationLocal = address(new TestERC20());
    _destinationAdopted = address(new TestERC20());
  }

  function utils_deployNomad() public {
    // Deploy mock home
    MockHome home = new MockHome();
    // Deploy origin XAppConnectionManager
    _originManager = new XAppConnectionManager();
    // Deploy destination XAppConnectionManager
    _destinationManager = new XAppConnectionManager();
    // set homes
    _originManager.setHome(address(home));
    _destinationManager.setHome(address(home));

    // Deploy token beacon
    address beacon = address(new TestERC20());

    // Deploy TokenRegistry implementation
    TokenRegistry registryImp = new TokenRegistry();
    // Deploy origin TokenRegistry
    ERC1967Proxy originProxy = new ERC1967Proxy(
      address(registryImp),
      abi.encodeWithSelector(TokenRegistry.initialize.selector, beacon, address(_originManager))
    );
    _originRegistry = TokenRegistry(address(originProxy));
    // Deploy destination TokenRegistry
    ERC1967Proxy destinationProxy = new ERC1967Proxy(
      address(registryImp),
      abi.encodeWithSelector(TokenRegistry.initialize.selector, beacon, address(_destinationManager))
    );
    _destinationRegistry = TokenRegistry(address(destinationProxy));
    // set local domains
    _originRegistry.setLocalDomain(_origin);
    _destinationRegistry.setLocalDomain(_destination);
  }

  function utils_deployPromiseRouter() public {
    // Deploy promise router (origin + destination)
    PromiseRouter promiseRouterImpl = new PromiseRouter();

    ERC1967Proxy originProxy = new ERC1967Proxy(
      address(promiseRouterImpl),
      abi.encodeWithSelector(PromiseRouter.initialize.selector, address(_originManager))
    );
    _originPromise = PromiseRouter(payable(address(originProxy)));

    ERC1967Proxy destinationProxy = new ERC1967Proxy(
      address(promiseRouterImpl),
      abi.encodeWithSelector(PromiseRouter.initialize.selector, _destinationManager)
    );
    _destinationPromise = PromiseRouter(payable(address(destinationProxy)));
  }

  function utils_deployRelayerFeeRouter() public {
    // Deploy promise router (origin + destination)
    RelayerFeeRouter impl = new RelayerFeeRouter();

    ERC1967Proxy originProxy = new ERC1967Proxy(
      address(impl),
      abi.encodeWithSelector(RelayerFeeRouter.initialize.selector, address(_originManager))
    );
    _originRelayerFee = RelayerFeeRouter(payable(address(originProxy)));

    ERC1967Proxy destinationProxy = new ERC1967Proxy(
      address(impl),
      abi.encodeWithSelector(PromiseRouter.initialize.selector, _destinationManager)
    );
    _destinationRelayerFee = RelayerFeeRouter(payable(address(destinationProxy)));
  }

  function utils_deployConnext() public {
    // deploy promise router
    utils_deployPromiseRouter();
    // deploy relayer fee router
    utils_deployRelayerFeeRouter();

    // deploy connext
    address originConnext = deployConnext(
      _origin,
      address(_originManager),
      address(_originRegistry),
      _originWrapper,
      address(_originRelayerFee),
      payable(address(_originPromise))
    );
    _originConnext = IConnextHandler(originConnext);

    address destinationConnext = deployConnext(
      _destination,
      address(_destinationManager),
      address(_destinationRegistry),
      _destinationWrapper,
      address(_destinationRelayerFee),
      payable(address(_destinationPromise))
    );
    _destinationConnext = IConnextHandler(destinationConnext);

    // enroll remotes
    _originConnext.enrollRemoteRouter(_destination, TypeCasts.addressToBytes32(address(_destinationConnext)));
    _destinationConnext.enrollRemoteRouter(_origin, TypeCasts.addressToBytes32(address(_originConnext)));
  }

  function utils_setupAssets(uint32 canonicalDomain, bool localIsAdopted) public {
    bytes32 canonicalId = TypeCasts.addressToBytes32(_canonical);
    _canonicalDomain = canonicalDomain;

    if (_origin == canonicalDomain) {
      // The canonical domain is the origin, meaning any local
      // assets on the origin should be the canonical
      _originLocal = _canonical;
      _originAdopted = _canonical;
    } else if (_destination == canonicalDomain) {
      _destinationLocal = _canonical;
      _destinationAdopted = _canonical;
    } // otherwise, could be anything

    // Handle origin
    if (_origin != canonicalDomain) {
      _originRegistry.enrollCustom(canonicalDomain, canonicalId, _originLocal);
    }
    // Setup asset whitelist
    _originConnext.setupAsset(
      ConnextMessage.TokenId(canonicalDomain, canonicalId),
      localIsAdopted ? _originLocal : _originAdopted,
      address(0)
    );

    // Handle destination
    if (_destination != canonicalDomain) {
      _destinationRegistry.enrollCustom(canonicalDomain, canonicalId, _destinationLocal);
    }
    // Setup asset whitelist
    _destinationConnext.setupAsset(
      ConnextMessage.TokenId(canonicalDomain, canonicalId),
      localIsAdopted ? _destinationLocal : _destinationAdopted,
      address(0)
    );

    // mint the asset
    uint256 toMint = 10_000 ether;
    TestERC20(_originLocal).mint(address(this), toMint);
    TestERC20(_destinationLocal).mint(address(this), toMint);
    TestERC20(_originAdopted).mint(address(this), toMint);
    TestERC20(_destinationAdopted).mint(address(this), toMint);
    TestERC20(_canonical).mint(address(this), toMint);

    // setup + fund the pools if needed
    if (_originLocal != _originAdopted) {
      utils_setupPool(_origin, canonicalId, 100 ether);
    }

    if (_destinationLocal != _destinationAdopted) {
      utils_setupPool(_destination, canonicalId, 100 ether);
    }
  }

  // NOTE: we are *always* assuming local asset is the adopted asset. anything
  // related to swaps can be tested more easily using ERC20s
  function utils_setupNative(uint32 canonicalDomain) public {
    // Configure canonical / local asset information for the canonical domain
    if (_origin == canonicalDomain) {
      // The canonical domain is the origin, meaning any local
      // assets on the origin should be the canonical
      _canonical = _originWrapper;
      _originLocal = _originWrapper;
    } else if (_destination == canonicalDomain) {
      _canonical = _destinationWrapper;
      _destinationLocal = _destinationWrapper;
    } else {
      require(false, "implement native with non-canonical transfers");
    }

    // Setup adopted assets (origin / destination == wrapper always)
    _destinationAdopted = _destinationWrapper;
    _originAdopted = _originWrapper;

    // Get canonical information
    bytes32 canonicalId = TypeCasts.addressToBytes32(_canonical);
    _canonicalDomain = canonicalDomain;

    // Handle origin
    if (_origin != canonicalDomain) {
      _originRegistry.enrollCustom(canonicalDomain, canonicalId, _originLocal);
    }
    // Setup asset whitelist
    _originConnext.setupAsset(ConnextMessage.TokenId(canonicalDomain, canonicalId), _originAdopted, address(0));

    // Handle destination
    if (_destination != canonicalDomain) {
      _destinationRegistry.enrollCustom(canonicalDomain, canonicalId, _destinationLocal);
    }
    // Setup asset whitelist
    _destinationConnext.setupAsset(
      ConnextMessage.TokenId(canonicalDomain, canonicalId),
      _destinationAdopted,
      address(0)
    );

    // mint the asset
    // NOTE: in the TestWeth implementation, the TestERC20 amount is inherited, meaning we
    // can arbitrarily mint WETH
    uint256 toMint = 10_000 ether;
    TestERC20(_originLocal).mint(address(this), toMint);
    TestERC20(_destinationLocal).mint(address(this), toMint);
    TestERC20(_originAdopted).mint(address(this), toMint);
    TestERC20(_destinationAdopted).mint(address(this), toMint);
    TestERC20(_canonical).mint(address(this), toMint);
  }

  function utils_setupPool(
    uint32 domain,
    bytes32 canonicalId,
    uint256 amount
  ) public {
    bool isOrigin = domain == _origin;
    // get tokens
    IERC20[] memory pooledTokens = new IERC20[](2);
    pooledTokens[0] = IERC20(isOrigin ? _originLocal : _destinationLocal);
    pooledTokens[1] = IERC20(isOrigin ? _originAdopted : _destinationAdopted);

    // get decimals
    uint8[] memory decimals = new uint8[](2);
    decimals[0] = 18;
    decimals[1] = 18;

    IConnextHandler connext = isOrigin ? _originConnext : _destinationConnext;

    string memory LP_TOKEN_NAME = "Test LP Token Name";
    string memory LP_TOKEN_SYMBOL = "TESTLP";
    {
      // deploy LP token
      LPToken token = new LPToken();
      // initialize
      token.initialize(LP_TOKEN_NAME, LP_TOKEN_SYMBOL);
      if (isOrigin) {
        _originLp = address(token);
      } else {
        _destinationLp = address(token);
      }
    }

    {
      // initialize pool
      connext.initializeSwap(
        canonicalId, // canonical
        pooledTokens, // pooled
        decimals, // decimals
        LP_TOKEN_NAME, // lp token name
        LP_TOKEN_SYMBOL, // lp token symbol
        50, // initialAValue
        0, // fee
        0, // admin fee
        isOrigin ? _originLp : _destinationLp // lp token address
      );

      if (amount == 0) {
        return;
      }

      // fund the pool
      uint256[] memory amounts = new uint256[](2);
      amounts[0] = amount;
      amounts[1] = amount;

      pooledTokens[0].approve(address(connext), amount);
      pooledTokens[1].approve(address(connext), amount);

      connext.addSwapLiquidity(canonicalId, amounts, 0, block.timestamp + 60);
      assertTrue(connext.getSwapVirtualPrice(canonicalId) != 0);
    }
  }

  function utils_createCallParams(uint32 destination) public returns (CallParams memory) {
    bool sendToDest = destination == _destination;
    return
      CallParams(
        address(1111), // to
        bytes(""), // callData
        sendToDest ? _origin : _destination, // origin domain
        destination, // dest domain
        address(2222), // agent
        address(3333), // recovery
        address(0), // callback
        0, // callbackFee
        0, // relayerFee
        false, // forceSlow
        false, // receiveLocal
        9900 // slippage tol
      );
  }

  function utils_getXCallBalances(address transacting, address bridge) public returns (XCallBalances memory) {
    bool isDestination = bridge == address(_destinationConnext);
    return
      XCallBalances(
        IERC20(transacting != address(0) ? transacting : isDestination ? _destinationWrapper : _originWrapper)
          .balanceOf(bridge), // bridge transacting balance (what will sit there)
        IERC20(isDestination ? _destinationLocal : _originLocal).balanceOf(bridge), // bridge local balance
        bridge.balance, // bridge native balance
        transacting == address(0) || transacting == _originWrapper || transacting == _destinationWrapper
          ? address(this).balance
          : IERC20(transacting).balanceOf(address(this)), // caller transacting balance
        address(this).balance
      );
  }

  function utils_xcallAndAssert(XCallArgs memory _args, XCalledEventArgs memory _event) public {
    // Approve the bridge
    if (_args.transactingAssetId != address(0)) {
      IERC20(_args.transactingAssetId).approve(address(_originConnext), _args.amount);
    }
    // Get initial balances
    XCallBalances memory initial = utils_getXCallBalances(_event.transactingAssetId, address(_originConnext));
    console.log("got initial balances");

    // Expect an event
    uint256 nonce = 0;
    bytes32 canonicalId = TypeCasts.addressToBytes32(_canonical);
    bytes32 transferId = keccak256(
      abi.encode(nonce, _args.params, address(this), canonicalId, _canonicalDomain, _event.bridgedAmt)
    );
    bytes memory message = ConnextMessage.formatMessage(
      ConnextMessage.formatTokenId(_canonicalDomain, canonicalId),
      ConnextMessage.formatTransfer(
        TypeCasts.addressToBytes32(_args.params.to),
        _event.bridgedAmt,
        TestERC20(_event.bridged).detailsHash(),
        transferId
      )
    );
    vm.expectEmit(true, true, true, true);
    emit XCalled(transferId, _args, _event, nonce, message, address(this));

    // Make call
    console.log("------ xcall");
    uint256 transactingNative = _args.transactingAssetId == address(0) ? _args.amount : 0;
    _originConnext.xcall{value: _args.params.relayerFee + _args.params.callbackFee + transactingNative}(_args);

    // Check balances
    XCallBalances memory end = utils_getXCallBalances(_event.transactingAssetId, address(_originConnext));
    console.log("------ xcall done, checking balances..");
    assertEq(
      end.bridgeTransacting,
      _args.transactingAssetId == _originLocal
        ? initial.bridgeTransacting // will be burnt
        : initial.bridgeTransacting + _args.amount // custodied or swapped
    );
    console.log("bridge transacting");
    assertEq(
      end.bridgeLocal,
      // local is either custodied (canonical) or burned (representative) after swap
      // but if you transfer *in* the local asset, the balance of the contract doesnt change
      _event.bridged == _canonical ? initial.bridgeLocal + _args.amount : _args.transactingAssetId == _event.bridged
        ? initial.bridgeLocal
        : initial.bridgeLocal - _event.bridgedAmt
    );
    console.log("bridge local");
    assertEq(end.bridgeNative, initial.bridgeNative + _args.params.relayerFee);
    console.log("bridge native");
    assertEq(end.callerTransacting, initial.callerTransacting - _args.amount);
    console.log("caller transacting");
    assertEq(
      end.callerNative,
      initial.callerNative - _args.params.relayerFee - _args.params.callbackFee - transactingNative
    );
    console.log("caller native");
  }

  // ============ Testing scenarions ============
  // you should be able to bridge tokens (local == adopted)
  function test_Connext__bridgingTokensShouldWorkFastNoSwap() public {
    /// 0. setup contracts
    utils_setupAssets(_origin, true);

    // 1. `xcall` on the origin
    XCallArgs memory args = XCallArgs(utils_createCallParams(_destination), _originLocal, 1 ether);
    XCalledEventArgs memory eventArgs = XCalledEventArgs(
      _originLocal, // transacting
      args.amount, // amount in
      args.amount, // amount bridged
      _originLocal // asset bridged
    );
    utils_xcallAndAssert(args, eventArgs);

    // 2. call `execute` on the destination
    // 3. call `handle` on the destination
  }

  // you should be able to bridge tokens (local != adopted)
  function test_Connext__bridgingTokensShouldWorkFastWithSwap() public {
    /// 0. setup contracts
    utils_setupAssets(_other, false);

    // 1. `xcall` on the origin
    XCallArgs memory args = XCallArgs(utils_createCallParams(_destination), _originAdopted, 1 ether);
    uint256 expected = _originConnext.calculateSwap(
      TypeCasts.addressToBytes32(_canonical),
      0, // local idx always 0
      1, // adopted idx always 1
      args.amount // no min
    );
    console.log("expecting to bridge", expected);
    XCalledEventArgs memory eventArgs = XCalledEventArgs(
      _originAdopted, // transacting
      args.amount, // amount in
      expected, // amount bridged
      _originLocal // asset bridged
    );
    utils_xcallAndAssert(args, eventArgs);

    // 2. call `execute` on the destination
    // 3. call `handle` on the destination
  }

  // you should be able to bridge eth
  function test_Connext__bridgingNativeShouldWork() public {
    /// 0. setup contracts
    utils_setupNative(_origin);

    // 1. `xcall` on the origin
    XCallArgs memory args = XCallArgs(utils_createCallParams(_destination), address(0), 1 ether);
    XCalledEventArgs memory eventArgs = XCalledEventArgs(
      address(_originWrapper), // transacting
      args.amount, // amount in
      args.amount, // amount bridged
      _originWrapper // asset bridged
    );
    utils_xcallAndAssert(args, eventArgs);

    // 2. call `execute` on the destination
    // 3. call `handle` on the destination
  }

  // you should be able to bridge local asset (local != adopted)
  function test_Connext__bridgingTokensShouldWorkFastWithLocalAndSwap() public {
    /// 0. setup contracts
    utils_setupAssets(_other, false);

    // 1. `xcall` on the origin
    XCallArgs memory args = XCallArgs(utils_createCallParams(_destination), _originLocal, 1 ether);
    XCalledEventArgs memory eventArgs = XCalledEventArgs(
      _originLocal, // transacting
      args.amount, // amount in
      args.amount, // amount bridged
      _originLocal // asset bridged
    );
    utils_xcallAndAssert(args, eventArgs);

    // 2. call `execute` on the destination
    // 3. call `handle` on the destination
  }

  // you should be able to execute unpermissioned external call data

  // you should be able to execute permissioned external call data

  // you should be able to use a callback

  // you should be able to use a sponsor vault

  // you should be able to use a portal

  // you should be able to claim relayer fees

  // you should be able to bumpd relayer fees
}
