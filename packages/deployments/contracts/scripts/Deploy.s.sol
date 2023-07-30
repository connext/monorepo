// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";
import {Test} from "forge-std/Test.sol";
import {console2 as console} from "forge-std/console2.sol";
import {stdJson} from "forge-std/StdJson.sol";

import {Deployer} from "./Deployer.sol";
import {DeployConfig} from "./DeployConfig.s.sol";

import {TestERC20} from "../contracts/test/TestERC20.sol";
import {WatcherManager} from "../contracts/messaging/WatcherManager.sol";
import {MerkleTreeManager} from "../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../contracts/messaging/RootManager.sol";

/// @title Deploy
/// @notice Script used to deploy a bedrock system. The entire system is deployed within the `run` function.
///         To add a new contract to the system, add a public function that deploys that individual contract.
///         Then add a call to that function inside of `run`. Be sure to call the `save` function after each
///         deployment so that hardhat-deploy style artifacts can be generated using a call to `sync()`.
contract Deploy is Deployer {
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

    deployTestERC20();

    // Deploy hub connector if hub
    if (cfg.hubChainId() == block.chainid) {
      address watcherManager = deployWatcherManager();
      address merkleTreeManagerForRoot = deployMerkleTreeManager(true);

      uint256 delayBlocks = 100;
      address rootManager = deployRootManager(delayBlocks, watcherManager, merkleTreeManagerForRoot);
      address merkleTreeManagerSpoke = deployMerkleTreeManager(false);

      // Deploy MainnetSpokeConnector
      //address mainnetSpokeConnector = deploySpokeConnector();
    }
  }

  /// @notice Modifier that wraps a function in broadcasting.
  modifier broadcast() {
    vm.startBroadcast();
    _;
    vm.stopBroadcast();
  }

  function deployTestERC20() public broadcast returns (address) {
    TestERC20 erc20 = new TestERC20("Test", "Test");
    save("TestERC20", address(erc20));
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
    string memory name = isForRoot ? "MerkleTreeManagerRoot" : "MerkleTreeManagerSpoke";
    // Deploy implementation
    MerkleTreeManager merkleTreeManagerImpl = new MerkleTreeManager();
    save(name, address(merkleTreeManagerImpl));
    console.log("MerkleTreeManagerRoot Implementation deployed at %s", address(merkleTreeManagerImpl));

    // Deploy beacon
    address beacon = deployBeacon(merkleTreeManagerImpl);
    string memory beaconName = string(abi.encodePacked(name, "UpgradeBeacon"));
    save(beaconName, beacon);
    console.log("%s deployed at %s", beaconName, address(beacon));

    // Deplpy beacon proxy
    bytes memory initData = abi.encodeCall(MerkleTreeManager.initialize, (address(0)));
    address beaconProxy = deployBeaconProxy(beacon, initData);
    string memory beaconProxyName = string(abi.encodePacked(name, "UpgradeBeaconProxy"));
    save(beaconProxyName, beaconProxy);
    console.log("%s deployed at %s", beaconProxyName, address(beaconProxy));
    return beaconProxy;
  }

  /// @notice Deploy RootManager of hub connector
  function deployRootManager(
    uint256 delayBlocks,
    address watcherManager,
    address merkleTreeManagerForRoot
  ) public broadcast returns (address) {
    RootManager rootManager = new RootManager(delayBlocks, watcherManager, merkleTreeManagerForRoot);

    save("RootManager", address(rootManager));
    console.log("RootManager deployed at %s", address(rootManager));
    return address(rootManager);
  }

  /// @notice Deploy Spoke Connector
  //   function deploySpokeConnector(
  //     uint256 delayBlocks,
  //     address watcherManager,
  //     address merkleTreeManagerForRoot
  //   ) public broadcast returns (address) {
  //     RootManager rootManager = new RootManager(delayBlocks, watcherManager, merkleTreeManagerForRoot);

  //     save("RootManager", address(rootManager));
  //     console.log("RootManager deployed at %s", address(rootManager));
  //     return address(rootManager);
  //   }
}
