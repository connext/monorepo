// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IConnectorManager} from "../contracts/messaging/interfaces/IConnectorManager.sol";

import {IConnext} from "../contracts/core/connext/interfaces/IConnext.sol";
import {ExecuteArgs} from "../contracts/core/connext/facets/BridgeFacet.sol";
import {DestinationTransferStatus} from "../contracts/core/connext/libraries/LibConnextStorage.sol";
import {LPToken} from "../contracts/core/connext/helpers/LPToken.sol";

import {TestERC20} from "../contracts/test/TestERC20.sol";

import "./utils/Mock.sol";
import "./utils/Deployer.sol";
import "./utils/ExecutionFlowTest.sol";

import "forge-std/console.sol";

contract ConnextTest is ExecutionFlowTest, Deployer {
  // ============ Test set up ============
  function setUp() public {
    // set all the constants
    // relayer fee vaults
    _originRelayerFee = address(4565646564);
    _destinationRelayerFee = address(11231231323);
    // domains
    _origin = 1111;
    _destination = 2221;
    _other = 3331;

    // Deploy all the contracts
    utils_deployFreshAssets();
    utils_deployMessaging();
    utils_deployConnext();
  }

  // ============ Utils ============

  function utils_deployMessaging() public {
    // Deploy mock home
    MockHome originHome = new MockHome(_origin);
    MockHome destinationHome = new MockHome(_destination);
    // Deploy origin IConnectorManager
    _originManager = new MockXAppConnectionManager(originHome);
    // Deploy destination IConnectorManager
    _destinationManager = new MockXAppConnectionManager(destinationHome);

    // set this to be a replica so we can call `handle` directly on routers
    MockXAppConnectionManager(address(_destinationManager)).enrollInbox(address(this));
    MockXAppConnectionManager(address(_originManager)).enrollInbox(address(this));
  }

  function utils_deployConnext() public {
    // deploy LP token
    string memory LP_TOKEN_NAME = "Test LP Token Name";
    string memory LP_TOKEN_SYMBOL = "TESTLP";

    // Origin
    LPToken _originLp = new LPToken();
    _originLp.initialize(LP_TOKEN_NAME, LP_TOKEN_SYMBOL);

    // Destination
    LPToken _destinationLp = new LPToken();
    _destinationLp.initialize(LP_TOKEN_NAME, LP_TOKEN_SYMBOL);

    // deploy connext
    address originConnext = deployConnext(_origin, address(_originManager), 7 days, address(_originLp));
    _originConnext = IConnext(originConnext);

    address destinationConnext = deployConnext(
      _destination,
      address(_destinationManager),
      7 days,
      address(_destinationLp)
    );
    _destinationConnext = IConnext(destinationConnext);

    // allowlist contract as router
    _originConnext.addRelayer(address(this));
    _destinationConnext.addRelayer(address(this));

    // set relayer fee router
    _originConnext.setRelayerFeeVault(_originRelayerFee);
    _destinationConnext.setRelayerFeeVault(_destinationRelayerFee);

    // enroll instances
    // set remote routers
    _originConnext.enrollRemoteRouter(_destination, TypeCasts.addressToBytes32(address(_destinationConnext)));
    _destinationConnext.enrollRemoteRouter(_origin, TypeCasts.addressToBytes32(address(_originConnext)));
  }

  function utils_setupAssets(uint32 canonicalDomain, bool localIsAdopted) public {
    bytes32 canonicalId = TypeCasts.addressToBytes32(_canonical);
    _canonicalDomain = canonicalDomain;
    _canonicalKey = keccak256(abi.encode(canonicalId, _canonicalDomain));

    uint256 originCap;
    uint256 destinationCap;
    if (_origin == canonicalDomain) {
      // The canonical domain is the origin, meaning any local
      // assets on the origin should be the canonical
      _originAdopted = _canonical;
      _originLocal = _canonical;
      originCap = 10_000 ether;
    } else if (_destination == canonicalDomain) {
      _destinationAdopted = _canonical;
      _destinationLocal = _canonical;
      destinationCap = 10_000 ether;
    } // otherwise, could be anything

    // Handle origin
    // Set up asset allowlist
    if (_origin == canonicalDomain) {
      console.log("setting up canonical asset on origin");
      _originConnext.setupAsset(TokenId(canonicalDomain, canonicalId), 18, "", "", address(0), address(0), originCap);
    } else {
      console.log("setting up asset on origin");
      _originConnext.setupAssetWithDeployedRepresentation(
        TokenId(canonicalDomain, canonicalId),
        _originLocal,
        localIsAdopted ? address(0) : _originAdopted,
        address(0)
      );
    }

    // Set up asset allowlist
    if (_destination == canonicalDomain) {
      console.log("setting up canonical asset on destination");
      _destinationConnext.setupAsset(
        TokenId(canonicalDomain, canonicalId),
        18,
        "",
        "",
        address(0),
        address(0),
        destinationCap
      );
    } else {
      console.log("setting up asset on destination");
      _destinationConnext.setupAssetWithDeployedRepresentation(
        TokenId(canonicalDomain, canonicalId),
        _destinationLocal,
        localIsAdopted ? address(0) : _destinationAdopted,
        address(0)
      );
    }

    if (localIsAdopted) {
      _originAdopted = _originLocal;
      _destinationAdopted = _destinationLocal;
    }

    // mint the asset
    uint256 toMint = 10_000 ether;
    TestERC20(_originLocal).mint(address(this), toMint);
    TestERC20(_destinationLocal).mint(address(this), toMint);
    TestERC20(_originAdopted).mint(address(this), toMint);
    TestERC20(_destinationAdopted).mint(address(this), toMint);
    TestERC20(_canonical).mint(address(this), toMint);

    // setup + fund the pools if needed
    console.log("_originLocal", _originLocal);
    console.log("_originAdopted", _originAdopted);
    if (_originLocal != _originAdopted) {
      console.log("setting up origin swap");
      utils_setupPool(_origin, _canonicalKey, 100 ether);
    }

    if (_destinationLocal != _destinationAdopted) {
      utils_setupPool(_destination, _canonicalKey, 100 ether);
    }
  }

  // ============ Testing scenarios ============
  // you should be able to create a 0-value transfer (even with asset being defined)
  function test_Connext__zeroValueTransferShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_origin, true);

    // 1. `xcall` on the origin
    TransferInfo memory params = utils_createTransferIdInformation(_destination, 0, 0);
    bytes32 transferId = utils_xcallAndAssert(params, _originLocal, 0, 0);

    // 2. call `execute` on the destination
    ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 1, 0);
    utils_executeAndAssert(execute, transferId, 0);

    // 3. call `handle` on the destination
    utils_reconcileAndAssert(params, transferId, execute.routers);
  }

  // call a 0-value transfer with address(0) as asset
  function test_Connext__zeroValueTransferWithEmptyAssetShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_origin, true);

    // 1. `xcall` on the origin
    TransferInfo memory params = utils_createTransferIdInformation(_destination, 0, 0);
    params.slippage = 0;
    params.canonicalId = bytes32("");
    params.canonicalDomain = uint32(0);
    bytes32 transferId = utils_xcallAndAssert(params, address(0), 0, 0);

    // 2. call `execute` on the destination
    ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 1, 10 ether);
    utils_executeAndAssert(execute, transferId, 0, 0, false);

    // 3. call `handle` on the destination
    utils_reconcileAndAssert(params, transferId, execute.routers);
  }

  // you should be able to bridge local/representative tokens (local == adopted)
  function test_Connext__bridgeFastLocalShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_origin, true);

    // 1. `xcall` on the origin
    uint256 amount = 1 ether;
    uint256 bridgedAmount = amount;
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, bridgedAmount);
    bytes32 transferId = utils_xcallAndAssert(params, _originLocal, amount, 0);

    // 2. call `execute` on the destination
    ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 2, 10 ether);
    utils_executeAndAssert(execute, transferId, utils_getFastTransferAmount(bridgedAmount));

    // 3. call `handle` on the destination
    utils_reconcileAndAssert(params, transferId, execute.routers);
  }

  // you should be able to bridge adopted tokens (local != adopted)
  function test_Connext__bridgeFastAdoptedShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_other, false);
    console.log("setup assets");

    // 1. `xcall` on the origin
    uint256 amount = 1 ether;
    uint256 bridgedAmount = _originConnext.calculateSwap(
      _canonicalKey,
      0, // local idx always 0
      1, // adopted idx always 1
      amount // no min
    );
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, bridgedAmount);
    bytes32 transferId = utils_xcallAndAssert(params, _originAdopted, amount, 0);

    // 2. call `execute` on the destination
    ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 1, bridgedAmount);
    uint256 bridgedOut = _destinationConnext.calculateSwap(
      _canonicalKey,
      1, // adopted idx always 1
      0, // local idx always 0
      utils_getFastTransferAmount(bridgedAmount)
    );
    utils_executeAndAssert(execute, transferId, bridgedOut);

    // 3. call `handle` on the destination
    utils_reconcileAndAssert(params, transferId, execute.routers);
  }

  // you should be able to bridge local asset on origin to adopted asset on destination
  function test_Connext__bridgeFastOriginLocalToDestinationAdoptedShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_other, false);

    // 1. `xcall` on the origin
    uint256 amount = 1 ether;
    uint256 bridgedAmount = amount;
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, bridgedAmount);
    bytes32 transferId = utils_xcallAndAssert(params, _originLocal, amount, 0);

    // 2. call `execute` on the destination
    ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 2, bridgedAmount);
    uint256 bridgedOut = _destinationConnext.calculateSwap(
      _canonicalKey,
      1, // adopted idx always 1
      0, // local idx always 0
      utils_getFastTransferAmount(bridgedAmount)
    );
    utils_executeAndAssert(execute, transferId, bridgedOut);

    // 3. call `handle` on the destination
    utils_reconcileAndAssert(params, transferId, execute.routers);
  }

  // you should be able to use the slow path
  function test_Connext__bridgeSlowLocalShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_other, true); // local is adopted

    // 1. `xcall` on the origin
    uint256 amount = 1 ether;
    uint256 bridgedAmount = amount;
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, bridgedAmount);
    bytes32 transferId = utils_xcallAndAssert(params, _originLocal, amount, 0);

    // create execute args
    ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 0, bridgedAmount);

    // 2. call `handle` on the destination
    utils_reconcileAndAssert(params, transferId, execute.routers);

    // 3. call `execute` on the destination
    utils_executeAndAssert(execute, transferId, bridgedAmount);
  }

  // you should be able to execute unpermissioned external call data
  function test_Connext__unpermissionedCallsWork() public {
    // 0. setup contracts
    utils_setupAssets(_origin, true);
    MockXApp callTo = new MockXApp();
    bytes memory callData = bytes("calling cool stuff");

    // 1. xcall
    uint256 amount = 1 ether;
    uint256 bridgedAmount = amount;
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, bridgedAmount);
    params.to = address(callTo);
    params.callData = callData;
    bytes32 transferId = utils_xcallAndAssert(params, _originLocal, amount, 0);

    // 2. call `execute` on the destination
    ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 2, bridgedAmount);
    utils_executeAndAssert(execute, transferId, utils_getFastTransferAmount(bridgedAmount));
    // NOTE: execute only passes if external call passes because of balance assertions on `to`
  }

  // you should be able to execute permissioned external call data
  function test_Connext__permissionedCallsWork() public {
    // 0. setup contracts
    utils_setupAssets(_origin, true);
    MockXApp callTo = new MockXApp();
    callTo.setPermissions(address(this), _origin);
    bytes memory callData = bytes("calling cool stuff");

    // 1. xcall
    uint256 amount = 1 ether;
    uint256 bridgedAmount = amount;
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, bridgedAmount);
    params.to = address(callTo);
    params.callData = callData;
    bytes32 transferId = utils_xcallAndAssert(params, _originLocal, amount, 0);

    // create execute args
    ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 0, bridgedAmount);

    // 2. call `handle` on the destination
    utils_reconcileAndAssert(params, transferId, execute.routers);

    // 3. call `execute` on the destination
    utils_executeAndAssert(execute, transferId, bridgedAmount);
    // NOTE: execute only passes if external call passes because of balance assertions on `to`
  }

  // you should be able to use a portal
  // function test_Connext__portalsShouldWork() public {
  //   // 0. deploy pool + setup contracts
  //   utils_setupAssets(_origin, false); // local != adopted
  //   MockPool aavePool = new MockPool(false);
  //   _destinationConnext.setAavePool(address(aavePool));
  //   _destinationConnext.setAavePortalFee(5);

  //   // 1. `xcall` on the origin
  //   TransferInfo memory params = utils_createTransferIdInformation(_destination);
  //   XCallArgs memory args = XCallArgs(utils_createUserTransferIdInformation(_destination), _originAdopted, 1 ether);
  //   bytes32 transferId = utils_xcallAndAssert(params, _originLocal, args.amount, 0);

  //   // 2. call `execute` on the destination
  //   ExecuteArgs memory execute = utils_createExecuteArgs(
  //     params,
  //     args.amount,
  //     _destinationLocal,
  //     1,
  //     transferId,
  //     args.amount,
  //     0
  //   );
  //   // allowlist routers for portal
  //   _destinationConnext.approveRouterForPortal(execute.routers[0]);
  //   assertTrue(_destinationConnext.getRouterApprovalForPortal(execute.routers[0]));
  //   utils_executeAndAssert(execute, transferId, utils_getFastTransferAmount(args.amount), 0, true);

  //   // 3. call `handle` on the destination
  //   utils_reconcileAndAssert(transferId, args.amount, args.params.to, execute.routers, params, 0, address(this));

  //   // 4. repay portal out of band
  //   IERC20(_destinationAdopted).approve(address(_destinationConnext), 100 ether);
  //   _destinationConnext.repayAavePortalFor(
  //     params,
  //     _destinationAdopted,
  //     address(this),
  //     execute.normalizedIn,
  //     execute.amount,
  //     0,
  //     _destinationConnext.getAavePortalDebt(transferId),
  //     _destinationConnext.getAavePortalFeeDebt(transferId)
  //   );
  //   assertEq(_destinationConnext.getAavePortalFeeDebt(transferId), 0);
  //   assertEq(_destinationConnext.getAavePortalDebt(transferId), 0);
  // }
}
