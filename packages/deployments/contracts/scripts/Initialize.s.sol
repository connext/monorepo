// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";
import {Test} from "forge-std/Test.sol";
import {console2 as console} from "forge-std/console2.sol";
import {stdJson} from "forge-std/StdJson.sol";

import {Deployer} from "./Deployer.sol";

import {DeployConfig} from "./DeployConfig.s.sol";

import {TestERC20, IERC20} from "../contracts/test/TestERC20.sol";
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
import {TokenId} from "../contracts/core/connext/libraries/TokenId.sol";

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
    initAssets();
    initAgents();
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

  /// @notice Initialize Next/Adopted Assets
  function initAssets() public broadcast {
    IConnext connext = IConnext(getConnextContractAddress(block.chainid));
    address canonicalAsset = mustGetAddress("TestERC20", getContextFromChainId(cfg.hubChainId()));
    console.log("canonical asset on mainnet: %s", canonicalAsset);

    TokenId memory canonicalId = TokenId({
      domain: getDomainFromChainId(cfg.hubChainId()),
      id: TypeCasts.addressToBytes32(canonicalAsset)
    });
    bytes32 key = keccak256(abi.encode(canonicalId.id, canonicalId.domain));
    console.log("canonical asset key on mainnet: %s", vm.toString(key));

    address oldAdopted = address(0);
    try connext.canonicalToAdopted(key) returns (address addr) {
      oldAdopted = addr;
    } catch {}
    console.log("old adopted asset on this chain: %s", oldAdopted);

    if (block.chainid == cfg.hubChainId()) {
      // canonical domain
      if (oldAdopted != canonicalAsset) {
        connext.setupAsset(canonicalId, 18, "nextTEST", "nextTEST", canonicalAsset, address(0), 0);
      }
    } else {
      // Set up all the representational assets on their respective domains.
      address desiredAdopted = mustGetAddress("TestERC20");
      if (oldAdopted != address(0) && oldAdopted != desiredAdopted) {
        console.log("already approved asset. remove asset Id...");
        updateIfNeeded(
          address(connext),
          abi.encodeWithSignature("approvedAssets(bytes32)", key),
          false,
          abi.encodeWithSignature(
            "removeAssetId((uint32,bytes32),address,address)",
            canonicalId,
            desiredAdopted,
            connext.canonicalToRepresentation(key)
          )
        );
      }

      console.log("setupAsset old adopted: %s, desired adopted: %s", oldAdopted, desiredAdopted);
      if (oldAdopted != desiredAdopted) {
        connext.setupAsset(canonicalId, 18, "nextTEST", "nextTEST", desiredAdopted, address(0), 0);
      }

      // setup stableswap pool
      console.log("setup stableswap pool between Test - nextTEST");
      (address local, address adopted) = connext.getLocalAndAdoptedToken(canonicalId.id, canonicalId.domain);
      if (local == adopted) {
        console.log("local == adopted. %s, skipping", local);
      } else {
        uint256 INITIAL_A = 200;
        IERC20[] memory _pooledTokens = new IERC20[](2);
        _pooledTokens[0] = IERC20(local);
        _pooledTokens[1] = IERC20(adopted);
        uint8[] memory _decimals = new uint8[](2);
        _decimals[0] = 18;
        _decimals[1] = 18;

        updateIfNeeded(
          address(connext),
          abi.encodeWithSignature("getSwapA(bytes32)", key),
          INITIAL_A,
          abi.encodeWithSignature(
            "initializeSwap(bytes32,address[],uint8[],string,string,uint256,uint256,uint256)",
            key,
            _pooledTokens,
            _decimals,
            "Connext Test Token StableSwap LP",
            "CTestLP",
            INITIAL_A,
            "4000000",
            "0"
          )
        );
      }
    }
  }

  /// @notice Initialize Agents
  function initAgents() public broadcast {
    IConnext connext = IConnext(getConnextContractAddress(block.chainid));
    uint256 chainId = block.chainid;

    // Watchers
    if (chainId == cfg.hubChainId()) {
      console.log("setup watchers...");
      (address[] memory watchersAllowList, address[] memory watchersBlackList) = cfg.getAgentWatchersConfig();
      for (uint256 i = 0; i < watchersAllowList.length; i++) {
        updateIfNeeded(
          mustGetAddress("WatcherManager"),
          abi.encodeWithSignature("isWatcher(address)", watchersAllowList[i]),
          true,
          abi.encodeWithSignature("addWatcher(address)", watchersAllowList[i])
        );
      }
      for (uint256 i = 0; i < watchersBlackList.length; i++) {
        updateIfNeeded(
          mustGetAddress("WatcherManager"),
          abi.encodeWithSignature("isWatcher(address)", watchersBlackList[i]),
          false,
          abi.encodeWithSignature("removeWatcher(address)", watchersBlackList[i])
        );
      }
    }

    // Relayers
    console.log("setup relayers...");
    address payable relayerProxy = chainId == cfg.hubChainId()
      ? mustGetAddress("RelayerProxyHub")
      : mustGetAddress("RelayerProxy");

    console.log("setup addRelayer relayer proxy contract to connext...");
    updateIfNeeded(
      address(connext),
      abi.encodeWithSignature("approvedRelayers(address)", relayerProxy),
      true,
      abi.encodeWithSignature("addRelayer(address)", relayerProxy)
    );

    address feeCollector = cfg.getAgentRelayerFeeVault(chainId);
    console.log("setup setFeeCollector to relayer proxy...");
    updateIfNeeded(
      relayerProxy,
      abi.encodeWithSignature("feeCollector()"),
      feeCollector,
      abi.encodeWithSignature("setFeeCollector(address)", feeCollector)
    );

    (address[] memory relayersAllowList, address[] memory relayersBlackList) = cfg.getAgentRelayersConfig();
    for (uint256 i = 0; i < relayersAllowList.length; i++) {
      console.log("setup addRelayer to relayer proxy...");
      updateIfNeeded(
        relayerProxy,
        abi.encodeWithSignature("allowedRelayer(address)", relayersAllowList[i]),
        true,
        abi.encodeWithSignature("addRelayer(address)", relayersAllowList[i])
      );
      console.log("setup addRelayer to connext...");
      updateIfNeeded(
        address(connext),
        abi.encodeWithSignature("approvedRelayers(address)", relayersAllowList[i]),
        true,
        abi.encodeWithSignature("addRelayer(address)", relayersAllowList[i])
      );
    }
    for (uint256 i = 0; i < relayersBlackList.length; i++) {
      console.log("setup removeRelayer to relayer proxy...");
      updateIfNeeded(
        relayerProxy,
        abi.encodeWithSignature("allowedRelayer(address)", relayersBlackList[i]),
        false,
        abi.encodeWithSignature("removeRelayer(address)", relayersBlackList[i])
      );
      console.log("setup addRelayer to connext...");
      updateIfNeeded(
        address(connext),
        abi.encodeWithSignature("approvedRelayers(address)", relayersBlackList[i]),
        false,
        abi.encodeWithSignature("removeRelayer(address)", relayersBlackList[i])
      );
    }

    // Sequencers
    console.log("setup Sequencers...");
    (address[] memory sequencersAllowList, address[] memory sequencersBlackList) = cfg.getAgentSequencersConfig();
    for (uint256 i = 0; i < sequencersAllowList.length; i++) {
      console.log("setup addSequencer to connext...");
      updateIfNeeded(
        address(connext),
        abi.encodeWithSignature("approvedSequencers(address)", sequencersAllowList[i]),
        true,
        abi.encodeWithSignature("addSequencer(address)", sequencersAllowList[i])
      );
    }
    for (uint256 i = 0; i < sequencersBlackList.length; i++) {
      console.log("setup removeSequencer to connext...");
      updateIfNeeded(
        address(connext),
        abi.encodeWithSignature("approvedSequencers(address)", sequencersBlackList[i]),
        false,
        abi.encodeWithSignature("removeSequencer(address)", sequencersBlackList[i])
      );
    }

    // Routers
    console.log("setup Routers...");
    (address[] memory routersAllowList, address[] memory routersBlackList) = cfg.getAgentRoutersConfig();
    for (uint256 i = 0; i < routersAllowList.length; i++) {
      console.log("setup approveRouter to connext...");
      updateIfNeeded(
        address(connext),
        abi.encodeWithSignature("getRouterApproval(address)", routersAllowList[i]),
        true,
        abi.encodeWithSignature("approveRouter(address)", routersAllowList[i])
      );
    }
    for (uint256 i = 0; i < routersBlackList.length; i++) {
      console.log("setup unapproveRouter to connext...");
      updateIfNeeded(
        address(connext),
        abi.encodeWithSignature("getRouterApproval(address)", routersBlackList[i]),
        false,
        abi.encodeWithSignature("unapproveRouter(address)", routersBlackList[i])
      );
    }
  }

  /// @notice utility functions
  function getConnextContractAddress(uint256 chainId) public view returns (address) {
    return mustGetAddress("Connext_DiamondProxy", getContextFromChainId(chainId));
  }

  function getContextFromChainId(uint256 chainId) public view returns (string memory context) {
    return cfg.getMessagingConfig(chainId).name;
  }

  function getDomainFromChainId(uint256 chainId) public view returns (uint32) {
    return uint32(cfg.getMessagingConfig(chainId).domain);
  }

  function updateIfNeeded(address addr, bytes memory read, uint256 desired, bytes memory write) public {
    bytes4 readSignature;
    assembly {
      readSignature := mload(add(read, 32))
    }

    (bool readSuccess, bytes memory data) = address(addr).call(read);
    bool need = !readSuccess;
    uint256 value;
    if (readSuccess) {
      value = abi.decode(data, (uint256));
      console.log("Read: %s, current: %s, desired: %s", vm.toString(readSignature), value, desired);

      need = value != desired;
    }

    if (need) {
      (bool writeSuccess, ) = address(addr).call(write);
      require(writeSuccess);
      console.log("--Updated!");
    } else {
      console.log("--Skipped!");
    }
  }

  function updateIfNeeded(address addr, bytes memory read, address desired, bytes memory write) public {
    bytes4 readSignature;
    assembly {
      readSignature := mload(add(read, 32))
    }

    (bool readSuccess, bytes memory data) = address(addr).call(read);
    bool need = !readSuccess;
    address value;
    if (readSuccess) {
      value = abi.decode(data, (address));
      console.log("Read: %s, current: %s, desired: %s", vm.toString(readSignature), value, desired);

      need = value != desired;
    }

    if (need) {
      (bool writeSuccess, ) = address(addr).call(write);
      require(writeSuccess);
      console.log("--Updated!");
    } else {
      console.log("--Skipped!");
    }
  }

  function updateIfNeeded(address addr, bytes memory read, bool desired, bytes memory write) public {
    bytes4 readSignature;
    assembly {
      readSignature := mload(add(read, 32))
    }

    (bool readSuccess, bytes memory data) = address(addr).call(read);
    bool need = !readSuccess;
    bool value;
    if (readSuccess) {
      value = abi.decode(data, (bool));
      console.log("Read: %s, current: %s, desired: %s", vm.toString(readSignature), value, desired);

      need = value != desired;
    }

    if (need) {
      (bool writeSuccess, ) = address(addr).call(write);
      require(writeSuccess);
      console.log("--Updated!");
    } else {
      console.log("--Skipped!");
    }
  }
}
