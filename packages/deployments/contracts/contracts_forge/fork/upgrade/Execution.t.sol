// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import "../../utils/ExecutionFlowUtilities.sol";
import "../../utils/MotherForker.sol";

import "forge-std/console.sol";

contract ExecutionUpgradeTest is ExecutionFlowUtilities, MotherForker {
  // ============ Libraries ============
  using stdJson for string;
  using Strings for string;
  using Strings for uint256;

  // ============ Storage ==================
  mapping(uint256 => address[2]) deployedAssets; // [local, adopted]
  uint32 public immutable MAINNET_HUB_DOMAIN = 6648936;
  uint32 public immutable MAINNET_HUB_CHAIN = 1;
  uint32 public immutable TESTNET_HUB_DOMAIN = 1735353714;
  uint32 public immutable TESTNET_HUB_CHAIN = 5;

  uint32 public HUB_DOMAIN;
  uint32 public HUB_CHAIN;

  // ============ Setup ==================
  function setUp() public {
    // setup the fork networks
    utils_setupForkingEnv();
    // apply proposed upgrade to all diamonds
    utils_upgradeDiamonds();
    // set the hub domain and chain
    if (forkRpcsByChain[MAINNET_HUB_CHAIN].equal("")) {
      HUB_DOMAIN = TESTNET_HUB_DOMAIN;
      HUB_CHAIN = TESTNET_HUB_CHAIN;
    } else {
      HUB_DOMAIN = MAINNET_HUB_CHAIN;
      HUB_CHAIN = MAINNET_HUB_DOMAIN;
    }
  }

  // ============ Utils ==================
  function utils_primeCanonicalFork() internal {
    // deploy canonical on hub
    utils_selectFork(HUB_CHAIN);
    _canonical = address(new TestERC20("Test Token", "TEST"));
    _canonicalDomain = HUB_DOMAIN;
    _canonicalKey = TypeCasts.addressToBytes32(_canonical);
  }

  function utils_primeOriginFork(uint256 chainId) internal {
    // activate the fork
    uint256 forkId = utils_selectFork(chainId);

    // set the connext value
    _originConnext = IConnext(forkInfo[forkId].connext);
    // set the origin manager
    _originManager = IConnectorManager(_originConnext.xAppConnectionManager());
    // set the relayer fee vault
    _originRelayerFee = _originConnext.relayerFeeVault();
    // set the origin domain
    _origin = uint32(_originConnext.domain());

    _originLocal = address(new TestERC20("Test Token", "TEST"));
    _originAdopted = address(new TestERC20("Test Token", "TEST"));

    // setup the origin assets with the canonical domain as mainnet
    // domain and the adopted != local
    utils_setupOriginAssets(_canonicalDomain, false, 0);

    // add this contract as an approved relayer
    if (!_originConnext.approvedRelayers(address(this))) {
      vm.prank(_originConnext.owner());
      _originConnext.addRelayer(address(this));
    }
  }

  function utils_primeDestinationFork(uint256 chainId) internal {
    // activate the fork
    uint256 forkId = utils_selectFork(chainId);

    // set the connext value
    _destinationConnext = IConnext(forkInfo[forkId].connext);
    // set the destination manager
    _destinationManager = IConnectorManager(_destinationConnext.xAppConnectionManager());
    // set the relayer fee vault
    _destinationRelayerFee = _destinationConnext.relayerFeeVault();
    // set the destination domain
    _destination = uint32(_destinationConnext.domain());

    _destinationLocal = address(new TestERC20("Test Token", "TEST"));
    _destinationAdopted = address(new TestERC20("Test Token", "TEST"));

    // setup the origin assets with the canonical domain as mainnet
    // domain and the adopted != local
    utils_setupDestinationAssets(_canonicalDomain, false, 0);

    // add this contract as an approved relayer
    if (!_destinationConnext.approvedRelayers(address(this))) {
      vm.prank(_destinationConnext.owner());
      _destinationConnext.addRelayer(address(this));
    }
  }

  // ============ Tests ==================
  function test_ExecutionUpgrade__fastPathWithSwap() public {
    uint256 numChains = NETWORK_IDS.length;
    // set test constants
    uint256 amountIn = 0.05 ether;
    for (uint256 i; i < numChains; i++) {
      uint256 originChain = NETWORK_IDS[i];

      // console.log("");
      // console.log("");
      // console.log("======================================");
      // console.log("performing xcalls with origin:", originChain);
      // console.log("======================================");

      for (uint256 j; j < numChains; j++) {
        utils_primeCanonicalFork();
        // ignore cases where destination chain == origin chain
        if (i == j) continue;
        uint256 destinationChain = NETWORK_IDS[j];
        // console.log("");
        // console.log("======================================", destinationChain);
        // prime the origin fork
        utils_primeOriginFork(originChain);

        // prime the destination fork
        utils_primeDestinationFork(destinationChain);

        // console.log("configured assets:");
        // console.log("_originLocal:", _originLocal);
        // console.log("_originAdopted:", _originAdopted);
        // console.log("_destinationLocal:", _destinationLocal);
        // console.log("_destinationAdopted:", _destinationAdopted);
        // console.log("_canonical", _canonical);

        // select origin chain fork
        utils_selectFork(originChain);

        uint256 bridgedAmount = originChain == HUB_CHAIN
          ? amountIn
          : _originConnext.calculateSwap(
            _canonicalKey,
            0, // local idx always 0
            1, // adopted idx always 1
            amountIn // no min
          );
        uint256 relayerFee = 0.0001 ether;

        // 1. xcall
        TransferInfo memory params = utils_createTransferIdInformation(_destination, amountIn, bridgedAmount);
        bytes32 transferId = utils_xcallAndAssert(params, _originAdopted, amountIn, relayerFee);

        // select the destination fork and execute
        utils_selectFork(destinationChain);

        // calculate the amount received
        uint256 bridgedOut = destinationChain == HUB_CHAIN
          ? utils_getFastTransferAmount(bridgedAmount)
          : _destinationConnext.calculateSwap(
            _canonicalKey,
            1, // adopted idx always 1
            0, // local idx always 0
            utils_getFastTransferAmount(bridgedAmount)
          );

        // 2. execute
        ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 1, 5 ether);
        utils_executeAndAssert(execute, transferId, bridgedOut);

        // 3. reconcile
        utils_reconcileAndAssert(params, transferId, execute.routers);
      }
    }
  }

  function test_ExecutionUpgrade__slowPathWithSwap() public {
    uint256 numChains = NETWORK_IDS.length;
    // set test constants
    uint256 amountIn = 0.05 ether;
    for (uint256 i; i < numChains; i++) {
      uint256 originChain = NETWORK_IDS[i];

      // console.log("");
      // console.log("");
      // console.log("======================================");
      // console.log("performing xcalls with origin:", originChain);
      // console.log("======================================");

      for (uint256 j; j < numChains; j++) {
        utils_primeCanonicalFork();
        // ignore cases where destination chain == origin chain
        if (i == j) continue;
        uint256 destinationChain = NETWORK_IDS[j];
        // console.log("");
        // console.log("======================================", destinationChain);
        // prime the origin fork
        utils_primeOriginFork(originChain);

        // prime the destination fork
        utils_primeDestinationFork(destinationChain);

        // console.log("configured assets:");
        // console.log("_originLocal:", _originLocal);
        // console.log("_originAdopted:", _originAdopted);
        // console.log("_destinationLocal:", _destinationLocal);
        // console.log("_destinationAdopted:", _destinationAdopted);
        // console.log("_canonical", _canonical);

        // select origin chain fork
        utils_selectFork(originChain);

        uint256 bridgedAmount = originChain == HUB_CHAIN
          ? amountIn
          : _originConnext.calculateSwap(
            _canonicalKey,
            0, // local idx always 0
            1, // adopted idx always 1
            amountIn // no min
          );
        uint256 relayerFee = 0;

        // 1. xcall
        TransferInfo memory params = utils_createTransferIdInformation(_destination, amountIn, bridgedAmount);
        bytes32 transferId = utils_xcallAndAssert(params, _originAdopted, amountIn, relayerFee);

        // select the destination fork and execute
        utils_selectFork(destinationChain);

        // calculate the amount received
        uint256 bridgedOut = destinationChain == HUB_CHAIN
          ? bridgedAmount
          : _destinationConnext.calculateSwap(
            _canonicalKey,
            1, // adopted idx always 1
            0, // local idx always 0
            bridgedAmount
          );

        // 2. reconcile
        ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 0, 0);
        utils_reconcileAndAssert(params, transferId, execute.routers);

        // 3. execute
        utils_executeAndAssert(execute, transferId, bridgedOut);
      }
    }
  }
}
