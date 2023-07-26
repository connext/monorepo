// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Deployer} from "forge-deploy/Deployer.sol";
import {GenericProxiedDeployerFunction, ProxiedDeployOptions} from "forge-deploy-proxy/GenericProxiedDeployerFunction.sol";

// --------------------------------------------------------------------------------------------
// GENERATED
// --------------------------------------------------------------------------------------------

import ".././contracts/core/xreceivers/Unwrapper.sol" as _Unwrapper;
import {Unwrapper} from ".././contracts/core/xreceivers/Unwrapper.sol";

import ".././contracts/core/connext/facets/DiamondCutFacet.sol" as _DiamondCutFacet;
import {DiamondCutFacet} from ".././contracts/core/connext/facets/DiamondCutFacet.sol";

import ".././contracts/core/connext/facets/BaseConnextFacet.sol" as _BaseConnextFacet;
import {BaseConnextFacet} from ".././contracts/core/connext/facets/BaseConnextFacet.sol";

import ".././contracts/core/connext/facets/SwapAdminFacet.sol" as _SwapAdminFacet;
import {SwapAdminFacet} from ".././contracts/core/connext/facets/SwapAdminFacet.sol";

import ".././contracts/core/connext/facets/BridgeFacet.sol" as _BridgeFacet;
import {BridgeFacet} from ".././contracts/core/connext/facets/BridgeFacet.sol";

import ".././contracts/core/connext/facets/StableSwapFacet.sol" as _StableSwapFacet;
import {StableSwapFacet} from ".././contracts/core/connext/facets/StableSwapFacet.sol";

import ".././contracts/core/connext/facets/PortalFacet.sol" as _PortalFacet;
import {PortalFacet} from ".././contracts/core/connext/facets/PortalFacet.sol";

import ".././contracts/core/connext/facets/RoutersFacet.sol" as _RoutersFacet;
import {RoutersFacet} from ".././contracts/core/connext/facets/RoutersFacet.sol";

import ".././contracts/core/connext/facets/DiamondLoupeFacet.sol" as _DiamondLoupeFacet;
import {DiamondLoupeFacet} from ".././contracts/core/connext/facets/DiamondLoupeFacet.sol";

import ".././contracts/core/connext/facets/InboxFacet.sol" as _InboxFacet;
import {InboxFacet} from ".././contracts/core/connext/facets/InboxFacet.sol";

import ".././contracts/core/connext/facets/RelayerFacet.sol" as _RelayerFacet;
import {RelayerFacet} from ".././contracts/core/connext/facets/RelayerFacet.sol";

import ".././contracts/core/connext/facets/TokenFacet.sol" as _TokenFacet;
import {TokenFacet} from ".././contracts/core/connext/facets/TokenFacet.sol";

import ".././contracts/core/connext/facets/ProposedOwnableFacet.sol" as _ProposedOwnableFacet;
import {ProposedOwnableFacet} from ".././contracts/core/connext/facets/ProposedOwnableFacet.sol";

import ".././contracts/core/connext/facets/upgrade-initializers/DiamondInit.sol" as _DiamondInit;
import {DiamondInit} from ".././contracts/core/connext/facets/upgrade-initializers/DiamondInit.sol";

import ".././contracts/core/connext/helpers/RelayerProxyHub.sol" as _RelayerProxyHub;
import {RelayerProxyHub} from ".././contracts/core/connext/helpers/RelayerProxyHub.sol";

import ".././contracts/core/connext/helpers/OZERC20.sol" as _ERC20;
import {ERC20} from ".././contracts/core/connext/helpers/OZERC20.sol";

import ".././contracts/core/connext/helpers/ConnextProxyAdmin.sol" as _ConnextProxyAdmin;
import {ConnextProxyAdmin} from ".././contracts/core/connext/helpers/ConnextProxyAdmin.sol";

import ".././contracts/core/connext/helpers/ConnextPriceOracle.sol" as _ConnextPriceOracle;
import {ConnextPriceOracle} from ".././contracts/core/connext/helpers/ConnextPriceOracle.sol";

import ".././contracts/core/connext/helpers/RelayerProxy.sol" as _RelayerProxy;
import {RelayerProxy} from ".././contracts/core/connext/helpers/RelayerProxy.sol";

import ".././contracts/core/connext/helpers/LPToken.sol" as _LPToken;
import {LPToken} from ".././contracts/core/connext/helpers/LPToken.sol";

import ".././contracts/core/connext/helpers/StableSwap.sol" as _StableSwap;
import {StableSwap} from ".././contracts/core/connext/helpers/StableSwap.sol";

import ".././contracts/core/connext/helpers/ConnextDiamond.sol" as _ConnextDiamond;
import {ConnextDiamond} from ".././contracts/core/connext/helpers/ConnextDiamond.sol";

import ".././contracts/core/connext/helpers/BridgeToken.sol" as _BridgeToken;
import {BridgeToken} from ".././contracts/core/connext/helpers/BridgeToken.sol";

import ".././contracts/test/TestAggregator.sol" as _TestAggregator;
import {TestAggregator} from ".././contracts/test/TestAggregator.sol";

import ".././contracts/test/TestAavePool.sol" as _TestAavePool;
import {TestAavePool} from ".././contracts/test/TestAavePool.sol";

import ".././contracts/test/TestERC20.sol" as _TestERC20;
import {TestERC20} from ".././contracts/test/TestERC20.sol";

import ".././contracts/shared/upgrade/UpgradeBeaconController.sol" as _UpgradeBeaconController;
import {UpgradeBeaconController} from ".././contracts/shared/upgrade/UpgradeBeaconController.sol";

import ".././contracts/shared/upgrade/UpgradeBeaconProxy.sol" as _UpgradeBeaconProxy;
import {UpgradeBeaconProxy} from ".././contracts/shared/upgrade/UpgradeBeaconProxy.sol";

import ".././contracts/shared/upgrade/UpgradeBeacon.sol" as _UpgradeBeacon;
import {UpgradeBeacon} from ".././contracts/shared/upgrade/UpgradeBeacon.sol";

import ".././contracts/shared/libraries/Multisend.sol" as _MultiSend;
import {MultiSend} from ".././contracts/shared/libraries/Multisend.sol";

import ".././contracts/messaging/WatcherClient.sol" as _WatcherClient;
import {WatcherClient} from ".././contracts/messaging/WatcherClient.sol";

import ".././contracts/messaging/connectors/optimism/OptimismSpokeConnector.sol" as _OptimismSpokeConnector;
import {OptimismSpokeConnector} from ".././contracts/messaging/connectors/optimism/OptimismSpokeConnector.sol";

import ".././contracts/messaging/connectors/optimism/OptimismHubConnector.sol" as _OptimismHubConnector;
import {OptimismHubConnector} from ".././contracts/messaging/connectors/optimism/OptimismHubConnector.sol";

import ".././contracts/messaging/connectors/polygonzk/PolygonZkHubConnector.sol" as _PolygonZkHubConnector;
import {PolygonZkHubConnector} from ".././contracts/messaging/connectors/polygonzk/PolygonZkHubConnector.sol";

import ".././contracts/messaging/connectors/polygonzk/PolygonZkSpokeConnector.sol" as _PolygonZkSpokeConnector;
import {PolygonZkSpokeConnector} from ".././contracts/messaging/connectors/polygonzk/PolygonZkSpokeConnector.sol";

import ".././contracts/messaging/connectors/arbitrum/ArbitrumHubConnector.sol" as _ArbitrumHubConnector;
import {ArbitrumHubConnector} from ".././contracts/messaging/connectors/arbitrum/ArbitrumHubConnector.sol";

import ".././contracts/messaging/connectors/arbitrum/ArbitrumSpokeConnector.sol" as _ArbitrumSpokeConnector;
import {ArbitrumSpokeConnector} from ".././contracts/messaging/connectors/arbitrum/ArbitrumSpokeConnector.sol";

import ".././contracts/messaging/connectors/multichain/MultichainHubConnector.sol" as _MultichainHubConnector;
import {MultichainHubConnector} from ".././contracts/messaging/connectors/multichain/MultichainHubConnector.sol";

import ".././contracts/messaging/connectors/multichain/MultichainSpokeConnector.sol" as _MultichainSpokeConnector;
import {MultichainSpokeConnector} from ".././contracts/messaging/connectors/multichain/MultichainSpokeConnector.sol";

import ".././contracts/messaging/connectors/admin/AdminHubConnector.sol" as _AdminHubConnector;
import {AdminHubConnector} from ".././contracts/messaging/connectors/admin/AdminHubConnector.sol";

import ".././contracts/messaging/connectors/polygon/PolygonSpokeConnector.sol" as _PolygonSpokeConnector;
import {PolygonSpokeConnector} from ".././contracts/messaging/connectors/polygon/PolygonSpokeConnector.sol";

import ".././contracts/messaging/connectors/polygon/PolygonHubConnector.sol" as _PolygonHubConnector;
import {PolygonHubConnector} from ".././contracts/messaging/connectors/polygon/PolygonHubConnector.sol";

import ".././contracts/messaging/connectors/polygon/tunnel/FxBaseRootTunnel.sol" as _ICheckpointManager;
import {ICheckpointManager} from ".././contracts/messaging/connectors/polygon/tunnel/FxBaseRootTunnel.sol";

import ".././contracts/messaging/connectors/consensys/ConsensysHubConnector.sol" as _ConsensysHubConnector;
import {ConsensysHubConnector} from ".././contracts/messaging/connectors/consensys/ConsensysHubConnector.sol";

import ".././contracts/messaging/connectors/consensys/ConsensysSpokeConnector.sol" as _ConsensysSpokeConnector;
import {ConsensysSpokeConnector} from ".././contracts/messaging/connectors/consensys/ConsensysSpokeConnector.sol";

import ".././contracts/messaging/connectors/wormhole/WormholeHubConnector.sol" as _WormholeHubConnector;
import {WormholeHubConnector} from ".././contracts/messaging/connectors/wormhole/WormholeHubConnector.sol";

import ".././contracts/messaging/connectors/wormhole/WormholeSpokeConnector.sol" as _WormholeSpokeConnector;
import {WormholeSpokeConnector} from ".././contracts/messaging/connectors/wormhole/WormholeSpokeConnector.sol";

import ".././contracts/messaging/connectors/mainnet/MainnetSpokeConnector.sol" as _MainnetSpokeConnector;
import {MainnetSpokeConnector} from ".././contracts/messaging/connectors/mainnet/MainnetSpokeConnector.sol";

import ".././contracts/messaging/connectors/zksync/ZkSyncSpokeConnector.sol" as _ZkSyncSpokeConnector;
import {ZkSyncSpokeConnector} from ".././contracts/messaging/connectors/zksync/ZkSyncSpokeConnector.sol";

import ".././contracts/messaging/connectors/zksync/ZkSyncHubConnector.sol" as _ZkSyncHubConnector;
import {ZkSyncHubConnector} from ".././contracts/messaging/connectors/zksync/ZkSyncHubConnector.sol";

import ".././contracts/messaging/connectors/gnosis/GnosisSpokeConnector.sol" as _GnosisSpokeConnector;
import {GnosisSpokeConnector} from ".././contracts/messaging/connectors/gnosis/GnosisSpokeConnector.sol";

import ".././contracts/messaging/connectors/gnosis/GnosisHubConnector.sol" as _GnosisHubConnector;
import {GnosisHubConnector} from ".././contracts/messaging/connectors/gnosis/GnosisHubConnector.sol";

import ".././contracts/messaging/MerkleTreeManager.sol" as _MerkleTreeManager;
import {MerkleTreeManager} from ".././contracts/messaging/MerkleTreeManager.sol";

import ".././contracts/messaging/WatcherManager.sol" as _WatcherManager;
import {WatcherManager} from ".././contracts/messaging/WatcherManager.sol";

import ".././contracts/messaging/RootManager.sol" as _RootManager;
import {RootManager} from ".././contracts/messaging/RootManager.sol";

string constant Artifact_Unwrapper = "Unwrapper.sol:Unwrapper";

string constant Artifact_DiamondCutFacet = "DiamondCutFacet.sol:DiamondCutFacet";

string constant Artifact_BaseConnextFacet = "BaseConnextFacet.sol:BaseConnextFacet";

string constant Artifact_SwapAdminFacet = "SwapAdminFacet.sol:SwapAdminFacet";

string constant Artifact_BridgeFacet = "BridgeFacet.sol:BridgeFacet";

string constant Artifact_StableSwapFacet = "StableSwapFacet.sol:StableSwapFacet";

string constant Artifact_PortalFacet = "PortalFacet.sol:PortalFacet";

string constant Artifact_RoutersFacet = "RoutersFacet.sol:RoutersFacet";

string constant Artifact_DiamondLoupeFacet = "DiamondLoupeFacet.sol:DiamondLoupeFacet";

string constant Artifact_InboxFacet = "InboxFacet.sol:InboxFacet";

string constant Artifact_RelayerFacet = "RelayerFacet.sol:RelayerFacet";

string constant Artifact_TokenFacet = "TokenFacet.sol:TokenFacet";

string constant Artifact_ProposedOwnableFacet = "ProposedOwnableFacet.sol:ProposedOwnableFacet";

string constant Artifact_DiamondInit = "DiamondInit.sol:DiamondInit";

string constant Artifact_RelayerProxyHub = "RelayerProxyHub.sol:RelayerProxyHub";

string constant Artifact_ERC20 = "OZERC20.sol:ERC20";

string constant Artifact_ConnextProxyAdmin = "ConnextProxyAdmin.sol:ConnextProxyAdmin";

string constant Artifact_ConnextPriceOracle = "ConnextPriceOracle.sol:ConnextPriceOracle";

string constant Artifact_RelayerProxy = "RelayerProxy.sol:RelayerProxy";

string constant Artifact_LPToken = "LPToken.sol:LPToken";

string constant Artifact_StableSwap = "StableSwap.sol:StableSwap";

string constant Artifact_ConnextDiamond = "ConnextDiamond.sol:ConnextDiamond";

string constant Artifact_BridgeToken = "BridgeToken.sol:BridgeToken";

string constant Artifact_TestAggregator = "TestAggregator.sol:TestAggregator";

string constant Artifact_TestAavePool = "TestAavePool.sol:TestAavePool";

string constant Artifact_TestERC20 = "TestERC20.sol:TestERC20";

string constant Artifact_UpgradeBeaconController = "UpgradeBeaconController.sol:UpgradeBeaconController";

string constant Artifact_UpgradeBeaconProxy = "UpgradeBeaconProxy.sol:UpgradeBeaconProxy";

string constant Artifact_UpgradeBeacon = "UpgradeBeacon.sol:UpgradeBeacon";

string constant Artifact_MultiSend = "Multisend.sol:MultiSend";

string constant Artifact_WatcherClient = "WatcherClient.sol:WatcherClient";

string constant Artifact_OptimismSpokeConnector = "OptimismSpokeConnector.sol:OptimismSpokeConnector";

string constant Artifact_OptimismHubConnector = "OptimismHubConnector.sol:OptimismHubConnector";

string constant Artifact_PolygonZkHubConnector = "PolygonZkHubConnector.sol:PolygonZkHubConnector";

string constant Artifact_PolygonZkSpokeConnector = "PolygonZkSpokeConnector.sol:PolygonZkSpokeConnector";

string constant Artifact_ArbitrumHubConnector = "ArbitrumHubConnector.sol:ArbitrumHubConnector";

string constant Artifact_ArbitrumSpokeConnector = "ArbitrumSpokeConnector.sol:ArbitrumSpokeConnector";

string constant Artifact_MultichainHubConnector = "MultichainHubConnector.sol:MultichainHubConnector";

string constant Artifact_MultichainSpokeConnector = "MultichainSpokeConnector.sol:MultichainSpokeConnector";

string constant Artifact_AdminHubConnector = "AdminHubConnector.sol:AdminHubConnector";

string constant Artifact_PolygonSpokeConnector = "PolygonSpokeConnector.sol:PolygonSpokeConnector";

string constant Artifact_PolygonHubConnector = "PolygonHubConnector.sol:PolygonHubConnector";

string constant Artifact_ICheckpointManager = "FxBaseRootTunnel.sol:ICheckpointManager";

string constant Artifact_ConsensysHubConnector = "ConsensysHubConnector.sol:ConsensysHubConnector";

string constant Artifact_ConsensysSpokeConnector = "ConsensysSpokeConnector.sol:ConsensysSpokeConnector";

string constant Artifact_WormholeHubConnector = "WormholeHubConnector.sol:WormholeHubConnector";

string constant Artifact_WormholeSpokeConnector = "WormholeSpokeConnector.sol:WormholeSpokeConnector";

string constant Artifact_MainnetSpokeConnector = "MainnetSpokeConnector.sol:MainnetSpokeConnector";

string constant Artifact_ZkSyncSpokeConnector = "ZkSyncSpokeConnector.sol:ZkSyncSpokeConnector";

string constant Artifact_ZkSyncHubConnector = "ZkSyncHubConnector.sol:ZkSyncHubConnector";

string constant Artifact_GnosisSpokeConnector = "GnosisSpokeConnector.sol:GnosisSpokeConnector";

string constant Artifact_GnosisHubConnector = "GnosisHubConnector.sol:GnosisHubConnector";

string constant Artifact_MerkleTreeManager = "MerkleTreeManager.sol:MerkleTreeManager";

string constant Artifact_WatcherManager = "WatcherManager.sol:WatcherManager";

string constant Artifact_RootManager = "RootManager.sol:RootManager";

// --------------------------------------------------------------------------------------------

library ProxiedDeployerFunctions {
  // --------------------------------------------------------------------------------------------
  // GENERATED
  // --------------------------------------------------------------------------------------------

  function deploy_Unwrapper(
    Deployer deployer,
    string memory name,
    address connext,
    address wrapper,
    ProxiedDeployOptions memory options
  ) internal returns (Unwrapper) {
    bytes memory args = abi.encode(connext, wrapper);
    return Unwrapper(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_Unwrapper, args, options));
  }

  function deploy_DiamondCutFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (DiamondCutFacet) {
    bytes memory args = abi.encode();
    return
      DiamondCutFacet(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_DiamondCutFacet, args, options));
  }

  function deploy_BaseConnextFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (BaseConnextFacet) {
    bytes memory args = abi.encode();
    return
      BaseConnextFacet(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_BaseConnextFacet, args, options));
  }

  function deploy_SwapAdminFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (SwapAdminFacet) {
    bytes memory args = abi.encode();
    return
      SwapAdminFacet(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_SwapAdminFacet, args, options));
  }

  function deploy_BridgeFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (BridgeFacet) {
    bytes memory args = abi.encode();
    return BridgeFacet(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_BridgeFacet, args, options));
  }

  function deploy_StableSwapFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (StableSwapFacet) {
    bytes memory args = abi.encode();
    return
      StableSwapFacet(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_StableSwapFacet, args, options));
  }

  function deploy_PortalFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (PortalFacet) {
    bytes memory args = abi.encode();
    return PortalFacet(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_PortalFacet, args, options));
  }

  function deploy_RoutersFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (RoutersFacet) {
    bytes memory args = abi.encode();
    return RoutersFacet(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_RoutersFacet, args, options));
  }

  function deploy_DiamondLoupeFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (DiamondLoupeFacet) {
    bytes memory args = abi.encode();
    return
      DiamondLoupeFacet(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_DiamondLoupeFacet, args, options)
      );
  }

  function deploy_InboxFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (InboxFacet) {
    bytes memory args = abi.encode();
    return InboxFacet(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_InboxFacet, args, options));
  }

  function deploy_RelayerFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (RelayerFacet) {
    bytes memory args = abi.encode();
    return RelayerFacet(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_RelayerFacet, args, options));
  }

  function deploy_TokenFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (TokenFacet) {
    bytes memory args = abi.encode();
    return TokenFacet(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_TokenFacet, args, options));
  }

  function deploy_ProposedOwnableFacet(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (ProposedOwnableFacet) {
    bytes memory args = abi.encode();
    return
      ProposedOwnableFacet(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ProposedOwnableFacet, args, options)
      );
  }

  function deploy_DiamondInit(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (DiamondInit) {
    bytes memory args = abi.encode();
    return DiamondInit(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_DiamondInit, args, options));
  }

  function deploy_RelayerProxyHub(
    Deployer deployer,
    string memory name,
    address _connext,
    address _spokeConnector,
    address _gelatoRelayer,
    address _feeCollector,
    address _rootManager,
    address _keep3r,
    address _autonolas,
    uint8 _autonolasPriority,
    uint256 _propagateCooldown,
    address[] memory _hubConnectors,
    uint32[] memory _hubConnectorChains,
    ProxiedDeployOptions memory options
  ) internal returns (RelayerProxyHub) {
    bytes memory args = abi.encode(
      _connext,
      _spokeConnector,
      _gelatoRelayer,
      _feeCollector,
      _rootManager,
      _keep3r,
      _autonolas,
      _autonolasPriority,
      _propagateCooldown,
      _hubConnectors,
      _hubConnectorChains
    );
    return
      RelayerProxyHub(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_RelayerProxyHub, args, options));
  }

  function deploy_ERC20(
    Deployer deployer,
    string memory name,
    uint8 decimals_,
    string memory name_,
    string memory symbol_,
    string memory version_,
    ProxiedDeployOptions memory options
  ) internal returns (ERC20) {
    bytes memory args = abi.encode(decimals_, name_, symbol_, version_);
    return ERC20(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ERC20, args, options));
  }

  function deploy_ConnextProxyAdmin(
    Deployer deployer,
    string memory name,
    address owner,
    ProxiedDeployOptions memory options
  ) internal returns (ConnextProxyAdmin) {
    bytes memory args = abi.encode(owner);
    return
      ConnextProxyAdmin(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ConnextProxyAdmin, args, options)
      );
  }

  function deploy_ConnextPriceOracle(
    Deployer deployer,
    string memory name,
    address _wrapped,
    ProxiedDeployOptions memory options
  ) internal returns (ConnextPriceOracle) {
    bytes memory args = abi.encode(_wrapped);
    return
      ConnextPriceOracle(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ConnextPriceOracle, args, options)
      );
  }

  function deploy_RelayerProxy(
    Deployer deployer,
    string memory name,
    address _connext,
    address _spokeConnector,
    address _gelatoRelayer,
    address _feeCollector,
    address _keep3r,
    address _autonolas,
    uint8 _autonolasPriority,
    ProxiedDeployOptions memory options
  ) internal returns (RelayerProxy) {
    bytes memory args = abi.encode(
      _connext,
      _spokeConnector,
      _gelatoRelayer,
      _feeCollector,
      _keep3r,
      _autonolas,
      _autonolasPriority
    );
    return RelayerProxy(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_RelayerProxy, args, options));
  }

  function deploy_LPToken(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (LPToken) {
    bytes memory args = abi.encode();
    return LPToken(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_LPToken, args, options));
  }

  function deploy_StableSwap(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (StableSwap) {
    bytes memory args = abi.encode();
    return StableSwap(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_StableSwap, args, options));
  }

  function deploy_ConnextDiamond(
    Deployer deployer,
    string memory name,
    address _contractOwner,
    _ConnextDiamond.IDiamondCut.FacetCut[] memory _diamondCut,
    _ConnextDiamond.Initialization[] memory _initializations,
    ProxiedDeployOptions memory options
  ) internal returns (ConnextDiamond) {
    bytes memory args = abi.encode(_contractOwner, _diamondCut, _initializations);
    return
      ConnextDiamond(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ConnextDiamond, args, options));
  }

  function deploy_BridgeToken(
    Deployer deployer,
    string memory name,
    uint8 decimals_,
    string memory name_,
    string memory symbol_,
    ProxiedDeployOptions memory options
  ) internal returns (BridgeToken) {
    bytes memory args = abi.encode(decimals_, name_, symbol_);
    return BridgeToken(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_BridgeToken, args, options));
  }

  function deploy_TestAggregator(
    Deployer deployer,
    string memory name,
    uint8 _decimals,
    ProxiedDeployOptions memory options
  ) internal returns (TestAggregator) {
    bytes memory args = abi.encode(_decimals);
    return
      TestAggregator(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_TestAggregator, args, options));
  }

  function deploy_TestAavePool(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (TestAavePool) {
    bytes memory args = abi.encode();
    return TestAavePool(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_TestAavePool, args, options));
  }

  function deploy_TestERC20(
    Deployer deployer,
    string memory name,
    string memory _name,
    string memory _symbol,
    ProxiedDeployOptions memory options
  ) internal returns (TestERC20) {
    bytes memory args = abi.encode(_name, _symbol);
    return TestERC20(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_TestERC20, args, options));
  }

  function deploy_UpgradeBeaconController(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (UpgradeBeaconController) {
    bytes memory args = abi.encode();
    return
      UpgradeBeaconController(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_UpgradeBeaconController, args, options)
      );
  }

  function deploy_UpgradeBeaconProxy(
    Deployer deployer,
    string memory name,
    address _upgradeBeacon,
    bytes memory _initializationCalldata,
    ProxiedDeployOptions memory options
  ) internal returns (UpgradeBeaconProxy) {
    bytes memory args = abi.encode(_upgradeBeacon, _initializationCalldata);
    return
      UpgradeBeaconProxy(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_UpgradeBeaconProxy, args, options)
      );
  }

  function deploy_UpgradeBeacon(
    Deployer deployer,
    string memory name,
    address _initialImplementation,
    address _controller,
    ProxiedDeployOptions memory options
  ) internal returns (UpgradeBeacon) {
    bytes memory args = abi.encode(_initialImplementation, _controller);
    return UpgradeBeacon(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_UpgradeBeacon, args, options));
  }

  function deploy_MultiSend(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (MultiSend) {
    bytes memory args = abi.encode();
    return MultiSend(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_MultiSend, args, options));
  }

  function deploy_WatcherClient(
    Deployer deployer,
    string memory name,
    address _watcherManager,
    ProxiedDeployOptions memory options
  ) internal returns (WatcherClient) {
    bytes memory args = abi.encode(_watcherManager);
    return WatcherClient(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_WatcherClient, args, options));
  }

  function deploy_OptimismSpokeConnector(
    Deployer deployer,
    string memory name,
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
    uint256 _gasCap,
    ProxiedDeployOptions memory options
  ) internal returns (OptimismSpokeConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager,
      _gasCap
    );
    return
      OptimismSpokeConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_OptimismSpokeConnector, args, options)
      );
  }

  function deploy_OptimismHubConnector(
    Deployer deployer,
    string memory name,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _optimismPortal,
    uint256 _gasCap,
    ProxiedDeployOptions memory options
  ) internal returns (OptimismHubConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _optimismPortal,
      _gasCap
    );
    return
      OptimismHubConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_OptimismHubConnector, args, options)
      );
  }

  function deploy_PolygonZkHubConnector(
    Deployer deployer,
    string memory name,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint32 _mirrorNetworkId,
    ProxiedDeployOptions memory options
  ) internal returns (PolygonZkHubConnector) {
    bytes memory args = abi.encode(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorNetworkId);
    return
      PolygonZkHubConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_PolygonZkHubConnector, args, options)
      );
  }

  function deploy_PolygonZkSpokeConnector(
    Deployer deployer,
    string memory name,
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
    uint32 _mirrorNetworkId,
    ProxiedDeployOptions memory options
  ) internal returns (PolygonZkSpokeConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager,
      _mirrorNetworkId
    );
    return
      PolygonZkSpokeConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_PolygonZkSpokeConnector, args, options)
      );
  }

  function deploy_ArbitrumHubConnector(
    Deployer deployer,
    string memory name,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _outbox,
    uint256 _maxSubmissionCostCap,
    uint256 _maxGasCap,
    uint256 _gasPriceCap,
    ProxiedDeployOptions memory options
  ) internal returns (ArbitrumHubConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _outbox,
      _maxSubmissionCostCap,
      _maxGasCap,
      _gasPriceCap
    );
    return
      ArbitrumHubConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ArbitrumHubConnector, args, options)
      );
  }

  function deploy_ArbitrumSpokeConnector(
    Deployer deployer,
    string memory name,
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
    ProxiedDeployOptions memory options
  ) internal returns (ArbitrumSpokeConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    );
    return
      ArbitrumSpokeConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ArbitrumSpokeConnector, args, options)
      );
  }

  function deploy_MultichainHubConnector(
    Deployer deployer,
    string memory name,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorChainId,
    uint256 _gasCap,
    ProxiedDeployOptions memory options
  ) internal returns (MultichainHubConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorChainId,
      _gasCap
    );
    return
      MultichainHubConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_MultichainHubConnector, args, options)
      );
  }

  function deploy_MultichainSpokeConnector(
    Deployer deployer,
    string memory name,
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
    uint256 _mirrorChainId,
    uint256 _gasCap,
    ProxiedDeployOptions memory options
  ) internal returns (MultichainSpokeConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager,
      _mirrorChainId,
      _gasCap
    );
    return
      MultichainSpokeConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_MultichainSpokeConnector, args, options)
      );
  }

  function deploy_AdminHubConnector(
    Deployer deployer,
    string memory name,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _rootManager,
    ProxiedDeployOptions memory options
  ) internal returns (AdminHubConnector) {
    bytes memory args = abi.encode(_domain, _mirrorDomain, _rootManager);
    return
      AdminHubConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_AdminHubConnector, args, options)
      );
  }

  function deploy_PolygonSpokeConnector(
    Deployer deployer,
    string memory name,
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
    ProxiedDeployOptions memory options
  ) internal returns (PolygonSpokeConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    );
    return
      PolygonSpokeConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_PolygonSpokeConnector, args, options)
      );
  }

  function deploy_PolygonHubConnector(
    Deployer deployer,
    string memory name,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _checkPointManager,
    ProxiedDeployOptions memory options
  ) internal returns (PolygonHubConnector) {
    bytes memory args = abi.encode(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _checkPointManager);
    return
      PolygonHubConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_PolygonHubConnector, args, options)
      );
  }

  function deploy_ICheckpointManager(
    Deployer deployer,
    string memory name,
    address _checkpointManager,
    address _fxRoot,
    ProxiedDeployOptions memory options
  ) internal returns (ICheckpointManager) {
    bytes memory args = abi.encode(_checkpointManager, _fxRoot);
    return
      ICheckpointManager(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ICheckpointManager, args, options)
      );
  }

  function deploy_ConsensysHubConnector(
    Deployer deployer,
    string memory name,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    ProxiedDeployOptions memory options
  ) internal returns (ConsensysHubConnector) {
    bytes memory args = abi.encode(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector);
    return
      ConsensysHubConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ConsensysHubConnector, args, options)
      );
  }

  function deploy_ConsensysSpokeConnector(
    Deployer deployer,
    string memory name,
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
    ProxiedDeployOptions memory options
  ) internal returns (ConsensysSpokeConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    );
    return
      ConsensysSpokeConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ConsensysSpokeConnector, args, options)
      );
  }

  function deploy_WormholeHubConnector(
    Deployer deployer,
    string memory name,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _gasCap,
    uint16 _mirrorWormholeChainId,
    ProxiedDeployOptions memory options
  ) internal returns (WormholeHubConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _gasCap,
      _mirrorWormholeChainId
    );
    return
      WormholeHubConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_WormholeHubConnector, args, options)
      );
  }

  function deploy_WormholeSpokeConnector(
    Deployer deployer,
    string memory name,
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
    uint256 _gasCap,
    uint16 _mirrorWormholeChainId,
    ProxiedDeployOptions memory options
  ) internal returns (WormholeSpokeConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager,
      _gasCap,
      _mirrorWormholeChainId
    );
    return
      WormholeSpokeConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_WormholeSpokeConnector, args, options)
      );
  }

  function deploy_MainnetSpokeConnector(
    Deployer deployer,
    string memory name,
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
    ProxiedDeployOptions memory options
  ) internal returns (MainnetSpokeConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    );
    return
      MainnetSpokeConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_MainnetSpokeConnector, args, options)
      );
  }

  function deploy_ZkSyncSpokeConnector(
    Deployer deployer,
    string memory name,
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
    ProxiedDeployOptions memory options
  ) internal returns (ZkSyncSpokeConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    );
    return
      ZkSyncSpokeConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ZkSyncSpokeConnector, args, options)
      );
  }

  function deploy_ZkSyncHubConnector(
    Deployer deployer,
    string memory name,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _gasCap,
    ProxiedDeployOptions memory options
  ) internal returns (ZkSyncHubConnector) {
    bytes memory args = abi.encode(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _gasCap);
    return
      ZkSyncHubConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_ZkSyncHubConnector, args, options)
      );
  }

  function deploy_GnosisSpokeConnector(
    Deployer deployer,
    string memory name,
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
    uint256 _gasCap,
    uint256 _mirrorChainId,
    ProxiedDeployOptions memory options
  ) internal returns (GnosisSpokeConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager,
      _gasCap,
      _mirrorChainId
    );
    return
      GnosisSpokeConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_GnosisSpokeConnector, args, options)
      );
  }

  function deploy_GnosisHubConnector(
    Deployer deployer,
    string memory name,
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _gasCap,
    uint256 _mirrorChainId,
    ProxiedDeployOptions memory options
  ) internal returns (GnosisHubConnector) {
    bytes memory args = abi.encode(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _gasCap,
      _mirrorChainId
    );
    return
      GnosisHubConnector(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_GnosisHubConnector, args, options)
      );
  }

  function deploy_MerkleTreeManager(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (MerkleTreeManager) {
    bytes memory args = abi.encode();
    return
      MerkleTreeManager(
        GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_MerkleTreeManager, args, options)
      );
  }

  function deploy_WatcherManager(
    Deployer deployer,
    string memory name,
    ProxiedDeployOptions memory options
  ) internal returns (WatcherManager) {
    bytes memory args = abi.encode();
    return
      WatcherManager(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_WatcherManager, args, options));
  }

  function deploy_RootManager(
    Deployer deployer,
    string memory name,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager,
    ProxiedDeployOptions memory options
  ) internal returns (RootManager) {
    bytes memory args = abi.encode(_delayBlocks, _merkle, _watcherManager);
    return RootManager(GenericProxiedDeployerFunction.deploy(deployer, name, Artifact_RootManager, args, options));
  }

  // --------------------------------------------------------------------------------------------
}
