// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../utils/ExecutionFlowUtilities.sol";
import "../utils/MotherForker.sol";

import "forge-std/console.sol";

contract ExecutionUpgradeTest is ExecutionFlowUtilities, MotherForker {
  // TODO: Test upgraded forked deployment of Connext here to make sure fast and slow paths are working!

  // ============ Storage ==================
  bool deployedAssets = false;
  uint32 public immutable MAINNET_DOMAIN = 6648936;

  // ============ Setup ==================
  function setUp() public {
    // setup the fork networks
    utils_setupForkingEnv();
    // apply proposed upgrade to all diamonds
    utils_upgradeDiamonds();
  }

  // ============ Utils ==================
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

    // Only setup assets once so that the fork
    if (!deployedAssets) {
      utils_deployFreshAssets();
      // make assets persistent (available on both forks)
      vm.makePersistent(_canonical);
      vm.makePersistent(_originLocal);
      vm.makePersistent(_originAdopted);
      vm.makePersistent(_destinationLocal);
      vm.makePersistent(_destinationAdopted);

      deployedAssets = true;
    }

    // setup the origin assets with the canonical domain as mainnet
    // domain and the adopted != local
    utils_setupOriginAssets(MAINNET_DOMAIN, false);

    // add this contract as an approved relayer
    vm.prank(_originConnext.owner());
    _originConnext.addRelayer(address(this));
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

    // Only setup assets once so that the fork
    if (!deployedAssets) {
      utils_deployFreshAssets();
      // make assets persistent (available on all forks)
      vm.makePersistent(_canonical);
      vm.makePersistent(_originLocal);
      vm.makePersistent(_originAdopted);
      vm.makePersistent(_destinationLocal);
      vm.makePersistent(_destinationAdopted);

      deployedAssets = true;
    }

    // setup the origin assets with the canonical domain as mainnet
    // domain and the adopted != local
    utils_setupDestinationAssets(MAINNET_DOMAIN, false);

    // add this contract as an approved relayer
    vm.prank(_destinationConnext.owner());
    _destinationConnext.addRelayer(address(this));
  }

  // ============ Tests ==================

  function test_ExecutionUpgrade__fastPathWithSwap() public {
    // TODO: test with each of the domains as origin and as destination
    // select the fork

    // select the origin and destination chains
    uint256 originChain = FORKED_CHAIN_IDS[0];
    uint256 destinationChain = FORKED_CHAIN_IDS[1];

    // prime the origin fork
    utils_primeOriginFork(originChain);
    // prime the destination fork
    utils_primeDestinationFork(destinationChain);

    // select origin chain fork
    utils_selectFork(originChain);

    // set test constants
    uint256 amountIn = 1 ether;
    uint256 bridgedAmount = _originConnext.calculateSwap(
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
    uint256 bridgedOut = _destinationConnext.calculateSwap(
      _canonicalKey,
      1, // adopted idx always 1
      0, // local idx always 0
      utils_getFastTransferAmount(bridgedAmount)
    );

    // 2. execute
    ExecuteArgs memory execute = utils_createExecuteArgs(params, transferId, 1, 10 ether);
    utils_executeAndAssert(execute, transferId, bridgedOut);

    // 3. reconcile
    utils_reconcileAndAssert(params, transferId, execute.routers);
  }

  function test_slowPathWithSwap() public {}
}
