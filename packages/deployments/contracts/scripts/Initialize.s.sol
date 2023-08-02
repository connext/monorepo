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
import {AdminHubConnector} from "../contracts/messaging/connectors/admin/AdminHubConnector.sol";
import {AdminSpokeConnector} from "../contracts/messaging/connectors/admin/AdminSpokeConnector.sol";
import {RelayerProxyHub} from "../contracts/core/connext/helpers/RelayerProxyHub.sol";
import {RelayerProxy} from "../contracts/core/connext/helpers/RelayerProxy.sol";
import {LPToken} from "../contracts/core/connext/helpers/LPToken.sol";
import {MultiSend} from "../contracts/shared/libraries/Multisend.sol";

/// @title Initialize
/// @notice Script used to initialize connext system. The entire system is initialized within the `run` function.
///         Be sure to call after all contract deployed by Deploy!
contract Initialize is Deployer {
  DeployConfig cfg;

  /// @notice The name of the script, used to ensure the right deploy artifacts
  ///         are used.
  function name() public pure override returns (string memory) {
    return "Initialize";
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
    console.log("Initializing Contracts...");
  }

  /// @notice Modifier that wraps a function in broadcasting.
  modifier broadcast() {
    vm.startBroadcast();
    _;
    vm.stopBroadcast();
  }
}
