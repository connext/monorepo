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
import "./utils/ExecutionFlowUtilities.sol";

import "forge-std/console.sol";

contract ConnextTest is ExecutionFlowUtilities, Deployer {
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

    // enroll replicas on manager to call `handle` directly
    MockXAppConnectionManager(address(_destinationManager)).enrollInbox(address(_destinationManager));
    MockXAppConnectionManager(address(_originManager)).enrollInbox(address(_originManager));
  }

  // ============ Testing scenarios ============
  // you should be able to create a 0-value transfer (even with asset being defined)
  function test_Connext__zeroValueTransferShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_origin, true);

    // perform test
    TransferInfo memory params = utils_createTransferIdInformation(_destination, 0, 0);
    utils_performFastExecutionTest(params, _originLocal, 0, 0, 0, 1, 0);
  }

  // call a 0-value transfer with address(0) as asset
  function test_Connext__zeroValueTransferWithEmptyAssetShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_origin, true);

    // generate params
    TransferInfo memory params = utils_createTransferIdInformation(_destination, 0, 0);
    params.slippage = 0;
    params.canonicalId = bytes32("");
    params.canonicalDomain = uint32(0);
    // perform test
    utils_performFastExecutionTest(params, address(0), 0, 0, 0, 1, 0);
  }

  // you should be able to bridge local/representative tokens (local == adopted)
  function test_Connext__bridgeFastLocalShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_origin, true);

    // generate params
    uint256 amount = 1 ether;
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, amount);

    // perform test
    utils_performFastExecutionTest(params, _originLocal, 0, amount, utils_getFastTransferAmount(amount), 2, 10 ether);
  }

  // you should be able to bridge adopted tokens (local != adopted)
  function test_Connext__bridgeFastAdoptedShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_other, false);

    // generate transfer params
    uint256 amount = 1 ether;
    uint256 bridgedAmount = _originConnext.calculateSwap(
      _canonicalKey,
      0, // local idx always 0
      1, // adopted idx always 1
      amount // no min
    );

    // get expected amount out
    uint256 bridgedOut = _destinationConnext.calculateSwap(
      _canonicalKey,
      1, // adopted idx always 1
      0, // local idx always 0
      utils_getFastTransferAmount(bridgedAmount)
    );

    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, bridgedAmount);
    utils_performFastExecutionTest(params, _originAdopted, 0, amount, bridgedOut, 1, bridgedAmount);
  }

  // you should be able to bridge local asset on origin to adopted asset on destination
  function test_Connext__bridgeFastOriginLocalToDestinationAdoptedShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_other, false);

    // generate transfer params
    uint256 amount = 1 ether;
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, amount);

    // get bridged out amount
    uint256 bridgedOut = _destinationConnext.calculateSwap(
      _canonicalKey,
      1, // adopted idx always 1
      0, // local idx always 0
      utils_getFastTransferAmount(amount)
    );

    // perform test
    utils_performFastExecutionTest(params, _originLocal, 0, amount, bridgedOut, 2, amount);
  }

  // you should be able to use the slow path
  function test_Connext__bridgeSlowLocalShouldWork() public {
    // 0. setup contracts
    utils_setupAssets(_other, true); // local is adopted

    // generate transfer params
    uint256 amount = 1 ether;
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, amount);

    // perform test
    utils_performSlowExecutionTest(params, _originLocal, 0, amount, amount, 0, amount);
  }

  // you should be able to execute unpermissioned external call data
  function test_Connext__unpermissionedCallsWork() public {
    // 0. setup contracts
    utils_setupAssets(_origin, true);
    MockXApp callTo = new MockXApp();
    bytes memory callData = bytes("calling cool stuff");

    // generate transfer params
    uint256 amount = 1 ether;
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, amount);
    params.to = address(callTo);
    params.callData = callData;

    // perform test
    utils_performFastExecutionTest(params, _originLocal, 0, amount, utils_getFastTransferAmount(amount), 2, amount);
  }

  // you should be able to execute permissioned external call data
  function test_Connext__permissionedCallsWork() public {
    // 0. setup contracts
    utils_setupAssets(_origin, true);
    MockXApp callTo = new MockXApp();
    callTo.setPermissions(address(this), _origin);
    bytes memory callData = bytes("calling cool stuff");

    // generate transfer params
    uint256 amount = 1 ether;
    TransferInfo memory params = utils_createTransferIdInformation(_destination, amount, amount);
    params.to = address(callTo);
    params.callData = callData;

    // perform the test
    utils_performSlowExecutionTest(params, _originLocal, 0, amount, amount, 0, amount);
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
