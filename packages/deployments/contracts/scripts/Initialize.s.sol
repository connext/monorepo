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
import {IConnext} from "../contracts/core/connext/interfaces/IConnext.sol";
import {TypeCasts} from "../contracts/shared/libraries/TypeCasts.sol";

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

    initMessaging();
  }

  /// @notice Modifier that wraps a function in broadcasting.
  modifier broadcast() {
    vm.startBroadcast();
    _;
    vm.stopBroadcast();
  }

  /// @notice Initialize Messaging Contracts
  function initMessaging() public broadcast {
    IConnext connext = IConnext(getConnextContractAddress(block.chainid));
    uint256 chainId = block.chainid;
    address spokeConnector = mustGetAddress(string.concat(cfg.getMessagingConfig(chainId).prefix, "SpokeConnector"));

    // ENROLLING HANDLERS
    console.log("enrolling handlers...");
    for (uint256 i = 0; i < cfg.chainsLength(); i++) {
      uint256 id = cfg.getChainIdFromIndex(i);
      if (id != chainId) {
        address remoteConnext = getConnextContractAddress(id);
        uint32 remoteDomain = getDomainFromChainId(id);
        updateIfNeeded(
          address(connext),
          abi.encodeWithSignature("remote(uint32)", remoteDomain),
          remoteConnext,
          abi.encodeWithSignature(
            "enrollRemoteRouter(uint32,bytes32)",
            remoteDomain,
            TypeCasts.addressToBytes32(remoteConnext)
          )
        );
      }
    }

    // ENROLLING RELAYER FEE VAULT
    console.log("enrolling relayer fee vaults...");
    updateIfNeeded(
      address(connext),
      abi.encodeWithSignature("relayerFeeVault()"),
      cfg.getAgentRelayerFeeVault(chainId),
      abi.encodeWithSignature("setRelayerFeeVault(address)", cfg.getAgentRelayerFeeVault(chainId))
    );

    // CONFIGURE RELAYER PROXY
    if (cfg.hubChainId() == chainId) {
      address payable relayerProxy = mustGetAddress("RelayerProxyHub");
      console.log("set connext to relayer proxy...");
      updateIfNeeded(
        relayerProxy,
        abi.encodeWithSignature("connext()"),
        address(connext),
        abi.encodeWithSignature("setConnext(address)", address(connext))
      );

      console.log("set spokeConnector to relayer proxy...");
      updateIfNeeded(
        relayerProxy,
        abi.encodeWithSignature("spokeConnector()"),
        address(spokeConnector),
        abi.encodeWithSignature("setSpokeConnector(address)", address(spokeConnector))
      );

      console.log("set root mananger to relayer proxy...");
      updateIfNeeded(
        relayerProxy,
        abi.encodeWithSignature("rootManager()"),
        mustGetAddress("RootManager"),
        abi.encodeWithSignature("setRootManager(address)", mustGetAddress("RootManager"))
      );
    } else {
      address payable relayerProxy = mustGetAddress("RelayerProxy");
      console.log("set connext to relayer proxy...");
      updateIfNeeded(
        relayerProxy,
        abi.encodeWithSignature("connext()"),
        address(connext),
        abi.encodeWithSignature("setConnext(address)", address(connext))
      );

      console.log("set spoke connector to relayer proxy...");
      updateIfNeeded(
        relayerProxy,
        abi.encodeWithSignature("spokeConnector()"),
        address(spokeConnector),
        abi.encodeWithSignature("setSpokeConnector(address)", address(spokeConnector))
      );
    }
  }

  function getConnextContractAddress(uint256 chainId) public returns (address) {
    return mustGetAddress("Connext_DiamondProxy", getContextFromChainId(chainId));
  }

  function getContextFromChainId(uint256 chainId) public returns (string memory context) {
    return cfg.getMessagingConfig(chainId).name;
  }

  function getDomainFromChainId(uint256 chainId) public returns (uint32) {
    return uint32(cfg.getMessagingConfig(chainId).domain);
  }

  function updateIfNeeded(address addr, bytes memory read, uint256 desired, bytes memory write) public {
    bytes4 readSignature;
    assembly {
      readSignature := mload(add(read, 32))
    }

    (bool success, bytes memory data) = address(addr).call(read);

    require(success);

    uint256 value = abi.decode(data, (uint256));
    console.log("Read: %s, current: %s, desired: %s", bytes4ToString(readSignature), value, desired);
    if (value != desired) {
      (bool success, ) = address(addr).call(write);
      require(success);
      console.log("Updated!");
    } else {
      console.log("Skipped!");
    }
  }

  function updateIfNeeded(address addr, bytes memory read, address desired, bytes memory write) public {
    bytes4 readSignature;
    assembly {
      readSignature := mload(add(read, 32))
    }

    (bool success, bytes memory data) = address(addr).call(read);

    require(success);

    address value = abi.decode(data, (address));
    console.log("Read: %s, current: %s, desired: %s", bytes4ToString(readSignature), value, desired);
    if (value != desired) {
      (bool success, ) = address(addr).call(write);
      require(success);
      console.log("Updated!");
    } else {
      console.log("Skipped!");
    }
  }

  function bytes4ToString(bytes4 data) internal pure returns (string memory) {
    bytes memory bytesData = abi.encodePacked(data);
    bytes memory alphabet = "0123456789abcdef";
    bytes memory str = new bytes(8);

    for (uint256 i = 0; i < 4; i++) {
      str[i * 2] = alphabet[uint256(uint8(bytesData[i] >> 4))];
      str[i * 2 + 1] = alphabet[uint256(uint8(bytesData[i] & 0x0f))];
    }

    return string(str);
  }
}
