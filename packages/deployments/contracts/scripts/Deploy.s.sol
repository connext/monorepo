// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";
import {Test} from "forge-std/Test.sol";
import {console2 as console} from "forge-std/console2.sol";
import {stdJson} from "forge-std/StdJson.sol";

import {Deployer} from "./Deployer.sol";
import {ProxyDeployer} from "./ProxyDeployer.sol";
import {DiamondDeployer} from "./DiamondDeployer.sol";

import {DeployConfig} from "./DeployConfig.s.sol";

import {TestERC20} from "../contracts/test/TestERC20.sol";
import {WatcherManager} from "../contracts/messaging/WatcherManager.sol";
import {MerkleTreeManager} from "../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../contracts/messaging/RootManager.sol";
import {SpokeConnector} from "../contracts/messaging/connectors/SpokeConnector.sol";
import {AdminHubConnector} from "../contracts/messaging/connectors/admin/AdminHubConnector.sol";
import {AdminSpokeConnector} from "../contracts/messaging/connectors/admin/AdminSpokeConnector.sol";
import {RelayerProxyHub} from "../contracts/core/connext/helpers/RelayerProxyHub.sol";
import {RelayerProxy} from "../contracts/core/connext/helpers/RelayerProxy.sol";
import {LPToken} from "../contracts/core/connext/helpers/LPToken.sol";
import {MultiSend} from "../contracts/shared/libraries/Multisend.sol";

/// @title Deploy
/// @notice Script used to deploy connext contracts. The entire system is deployed within the `run` function.
///         To add a new contract to the system, add a public function that deploys that individual contract.
///         Then add a call to that function inside of `run`. Be sure to call the `save` function after each
///         deployment so that hardhat-deploy style artifacts can be generated using a call to `sync()`.
contract Deploy is Deployer, ProxyDeployer, DiamondDeployer {
  DeployConfig cfg;

  /// @notice The name of the script, used to ensure the right deploy artifacts
  ///         are used.
  function name() public pure override returns (string memory) {
    return "Deploy";
  }

  function setUp() public override {
    super.setUp();

    string memory path = string.concat(vm.projectRoot(), "/scripts/deploy-config/", deploymentContext, ".json");
    cfg = new DeployConfig(path);

    console.log("Deploying from %s", deployScript);
    console.log("Deployment context: %s", deploymentContext);
  }

  /// @notice Deploy all of the contracts
  function run() public {
    console.log("Deploying Contracts...");

    console.log("Deploying Messaging Layer...");

    uint256 chainId = uint256(block.chainid);

    // Deploy hub connector if hub
    if (cfg.hubChainId() == chainId) {
      deployWatcherManager();
      deployMerkleTreeManager(true);

      deployRootManager();
      deployMerkleTreeManager(false);

      // Deploy MainnetSpokeConnector
      deploySpokeConnector(
        "MainnetSpokeConnector",
        uint32(cfg.domain()),
        uint32(cfg.domain()),
        address(cfg.getMessagingConfig(chainId).hubAmb),
        mustGetAddress("RootManager"),
        address(0),
        cfg.getMessagingConfig(chainId).processGas,
        cfg.getMessagingConfig(chainId).reserveGas,
        cfg.getMessagingConfig(chainId).delayBlocks,
        mustGetAddress("MerkleTreeManagerSpokeUpgradeBeaconProxy"),
        mustGetAddress("WatcherManager"),
        cfg.getMessagingConfig(chainId).minDisputeBlocks,
        cfg.getMessagingConfig(chainId).disputeBlocks
      );

      // Deploy Hub connectors
      for (uint256 i = 0; i < cfg.chainsLength(); i++) {
        uint256 id = cfg.getChainIdFromIndex(i);
        if (id != cfg.hubChainId()) {
          deployHubConnector(
            string.concat(cfg.getMessagingConfig(id).prefix, "HubConnector"),
            uint32(cfg.domain()),
            uint32(cfg.getMessagingConfig(id).domain),
            mustGetAddress("RootManager")
          );
        }
      }
    } else {
      deployWatcherManager();
      deployMerkleTreeManager(false);

      // Deploy SpokeConnector
      deploySpokeConnector(
        string.concat(cfg.getMessagingConfig(chainId).prefix, "SpokeConnector"),
        uint32(cfg.domain()),
        uint32(cfg.getMessagingConfig(cfg.hubChainId()).domain),
        address(cfg.getMessagingConfig(chainId).spokeAmb),
        address(1), //mustGetAddress("RootManager"),
        address(0),
        cfg.getMessagingConfig(chainId).processGas,
        cfg.getMessagingConfig(chainId).reserveGas,
        cfg.getMessagingConfig(chainId).delayBlocks,
        mustGetAddress("MerkleTreeManagerSpokeUpgradeBeaconProxy"),
        mustGetAddress("WatcherManager"),
        cfg.getMessagingConfig(chainId).minDisputeBlocks,
        cfg.getMessagingConfig(chainId).disputeBlocks
      );
    }

    // Deploy Connext Diamond proxy
    console.log("Deploying Connext Diamond...");
    deployLPToken();
    deployConnextDiamond();

    // Deploy Relayer Proxy Contract
    if (cfg.hubChainId() == chainId) {
      deployRelayerProxyHub();
    } else {
      deployRelayerProxy();
    }

    // Deploy Utils contracts
    deployMultiSend();
    deployTestERC20();
    deployTestAdopted();
  }

  /// @notice Modifier that wraps a function in broadcasting.
  modifier broadcast() {
    vm.startBroadcast();
    _;
    vm.stopBroadcast();
  }

  function deployTestERC20() public broadcast returns (address) {
    TestERC20 erc20 = new TestERC20("Test Token", "Test");
    save("TestERC20", address(erc20));
    return address(erc20);
  }

  function deployTestAdopted() public broadcast returns (address) {
    TestERC20 erc20 = new TestERC20("Test Adopted Token", "Test");
    save("TestAdopted", address(erc20));
    return address(erc20);
  }

  /// @notice Deploy WatcherManager of connector
  function deployWatcherManager() public broadcast returns (address) {
    WatcherManager watcherManager = new WatcherManager();

    save("WatcherManager", address(watcherManager));
    console.log("WatcherManager deployed at %s", address(watcherManager));
    return address(watcherManager);
  }

  /// @notice Deploy MerkleTreeManager for RootManager or SpokeConnector
  function deployMerkleTreeManager(bool isForRoot) public broadcast returns (address) {
    string memory contractName = isForRoot ? "MerkleTreeManagerRoot" : "MerkleTreeManagerSpoke";
    // Deploy implementation
    MerkleTreeManager merkleTreeManagerImpl = new MerkleTreeManager();
    save(contractName, address(merkleTreeManagerImpl));
    console.log("MerkleTreeManagerRoot Implementation deployed at %s", address(merkleTreeManagerImpl));

    // Deploy beacon
    address beacon = deployBeacon(address(merkleTreeManagerImpl));
    string memory beaconName = string(abi.encodePacked(contractName, "UpgradeableBeacon"));
    save(beaconName, beacon);
    console.log("%s deployed at %s", beaconName, address(beacon));

    // Deplpy beacon proxy
    bytes memory initData = abi.encodeCall(MerkleTreeManager.initialize, (address(0)));
    address beaconProxy = deployBeaconProxy(beacon, initData);
    string memory beaconProxyName = string(abi.encodePacked(contractName, "UpgradeBeaconProxy"));
    save(beaconProxyName, beaconProxy);
    console.log("%s deployed at %s", beaconProxyName, address(beaconProxy));
    return beaconProxy;
  }

  /// @notice Deploy RootManager of hub connector
  function deployRootManager() public broadcast returns (address) {
    address watcherManager = mustGetAddress("WatcherManager");
    address merkleTreeManagerForRoot = mustGetAddress("MerkleTreeManagerRootUpgradeBeaconProxy");
    RootManager rootManager = new RootManager(100, watcherManager, merkleTreeManagerForRoot, 100, 100);

    save("RootManager", address(rootManager));
    console.log("RootManager deployed at %s", address(rootManager));
    return address(rootManager);
  }

  /// @notice Deploy Spoke Connector
  function deploySpokeConnector(
    string memory _connectorName,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager,
    uint256 _minDisputeBlocks,
    uint256 _disputeBlocks
  ) public broadcast returns (address) {
    SpokeConnector.ConstructorParams memory _baseParams = SpokeConnector.ConstructorParams({
      domain: _domain,
      mirrorDomain: _mirrorDomain,
      amb: _amb,
      rootManager: _rootManager,
      mirrorConnector: _mirrorConnector,
      processGas: _processGas,
      reserveGas: _reserveGas,
      delayBlocks: _delayBlocks,
      merkle: _merkle,
      watcherManager: _watcherManager,
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });

    AdminSpokeConnector adminConnector = new AdminSpokeConnector(_baseParams);

    save(_connectorName, address(adminConnector));
    console.log("%s deployed at %s", _connectorName, address(adminConnector));
    return address(adminConnector);
  }

  /// @notice Deploy Admin Hub Connector
  function deployHubConnector(
    string memory _connectorName,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _rootManager
  ) public broadcast returns (address) {
    AdminHubConnector adminConnector = new AdminHubConnector(
      _domain,
      _mirrorDomain,
      address(0),
      _rootManager,
      address(0)
    );

    save(_connectorName, address(adminConnector));
    console.log("%s deployed at %s", _connectorName, address(adminConnector));
    return address(adminConnector);
  }

  /// @notice Deploy Stable swap LP Token Contract
  function deployLPToken() public broadcast returns (address) {
    LPToken lp = new LPToken();
    save("LPToken", address(lp));
    return address(lp);
  }

  /// @notice Deploy Connext Diamond Proxy Contract
  function deployConnextDiamond() public broadcast returns (address) {
    return
      deployDiamond(
        cfg.domain(),
        mustGetAddress(string.concat(cfg.getMessagingConfig(uint256(block.chainid)).prefix, "SpokeConnector")),
        0,
        mustGetAddress("LPToken")
      );
  }

  /// @notice Deploy MultiSend contract
  function deployMultiSend() public broadcast returns (address) {
    MultiSend multisend = new MultiSend();
    save("MultiSend", address(multisend));
    return address(multisend);
  }

  /// @notice Deploy Relayer Proxy Hub
  function deployRelayerProxyHub() public broadcast returns (address) {
    uint256 length = cfg.chainsLength();
    uint32[] memory chainIds = new uint32[](length - 1);
    address[] memory connectors = new address[](length - 1);
    uint256 index;
    for (uint256 i = 0; i < cfg.chainsLength(); i++) {
      uint256 id = cfg.getChainIdFromIndex(i);
      if (id != cfg.hubChainId()) {
        chainIds[index] = uint32(id);
        connectors[index] = mustGetAddress(string.concat(cfg.getMessagingConfig(id).prefix, "HubConnector"));
        index++;
      }
    }

    RelayerProxyHub.HubConstructorParams memory _baseParams = RelayerProxyHub.HubConstructorParams({
      connext: mustGetAddress("Connext_DiamondProxy"),
      spokeConnector: mustGetAddress("MainnetSpokeConnector"),
      gelatoRelayer: address(0),
      feeCollector: address(0),
      keep3r: address(0),
      rootManager: mustGetAddress("RootManager"),
      autonolas: address(0),
      propagateCooldown: 0,
      finalizeCooldown: 0,
      proposeAggregateRootCooldown: 0,
      hubConnectors: connectors,
      hubConnectorChains: chainIds
    });

    RelayerProxyHub proxy = new RelayerProxyHub(_baseParams);
    save("RelayerProxyHub", address(proxy));
    return address(proxy);
  }

  /// @notice Deploy Relayer Proxy
  function deployRelayerProxy() public broadcast returns (address) {
    RelayerProxy.ConstructorParams memory _baseParams = RelayerProxy.ConstructorParams({
      connext: mustGetAddress("Connext_DiamondProxy"),
      spokeConnector: mustGetAddress(string.concat(cfg.getMessagingConfig(block.chainid).prefix, "SpokeConnector")),
      gelatoRelayer: address(0),
      feeCollector: address(0),
      keep3r: address(0),
      proposeAggregateRootCooldown: 0,
      finalizeCooldown: 0
    });
    RelayerProxy proxy = new RelayerProxy(_baseParams);
    save("RelayerProxy", address(proxy));
    return address(proxy);
  }
}
