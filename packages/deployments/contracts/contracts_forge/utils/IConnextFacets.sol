// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {ConnextMessage} from "../../contracts/diamond/libraries/ConnextMessage.sol";
import {IStableSwap} from "../../contracts/interfaces/IStableSwap.sol";
import {ITokenRegistry} from "../../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {IWrapped} from "../../contracts/interfaces/IWrapped.sol";
import {IExecutor} from "../../contracts/interfaces/IExecutor.sol";
import {XAppConnectionManager} from "../../contracts/nomad-core/contracts/XAppConnectionManager.sol";
import {RelayerFeeRouter} from "../../contracts/nomad-xapps/contracts/relayer-fee-router/RelayerFeeRouter.sol";
import {XCallArgs, ExecuteArgs} from "../../contracts/diamond/libraries/LibConnextStorage.sol";

interface IConnextFacets {
  // AssetFacet
  function canonicalToAdopted(bytes32 _canonicalId) external view returns (address);
  function adoptedToCanonical(address _adopted) external view returns (ConnextMessage.TokenId memory);
  function approvedAssets(bytes32 _asset) external view returns (bool);
  function adoptedToLocalPools(bytes32 _adopted) external view returns (IStableSwap);
  function setupAsset(
    ConnextMessage.TokenId calldata _canonical,
    address _adoptedAssetId,
    address _stableSwapPool
  ) external;
  function addStableSwapPool(ConnextMessage.TokenId calldata _canonical, address _stableSwapPool) external;
  function removeAssetId(bytes32 _canonicalId, address _adoptedAssetId) external;
  // BaseConnextFacet
  function isRouterOwnershipRenounced() external view returns (bool);
  function isAssetOwnershipRenounced() external view returns (bool);
  // BridgeFacet
  function relayerFees(bytes32 _transferId) external view returns (uint256);
  function routedTransfers(bytes32 _transferId) external view returns (address[] memory);
  function reconciledTransfers(bytes32 _transferId) external view returns (bool);
  function tokenRegistry() external view returns (ITokenRegistry);
  function domain() external view returns (uint256);
  function executor() external view returns (IExecutor);
  function nonce() external view returns (uint256);
  function wrapper() external view returns (IWrapped);
  function xcall(XCallArgs calldata _args) external payable returns (bytes32);
  function handle(
    uint32 _origin,
    uint32 _nonce,
    bytes32 _sender,
    bytes memory _message
  ) external;
  function execute(ExecuteArgs calldata _args) external returns (bytes32 transferId);
  function bumpTransfer(bytes32 _transferId) external payable;
  // NomadFacet
  function xAppConnectionManager() external view returns (XAppConnectionManager);
  function remotes(uint32 _domain) external view returns (bytes32);
  function setXAppConnectionManager(address _xAppConnectionManager) external;
  function enrollRemoteRouter(uint32 _domain, bytes32 _router) external;
  // ProposedOwnableFacet
  function proposedOwnableOwner() external view returns (address);
  function proposed() external view returns (address);
  function proposedTimestamp() external view returns (uint256);
  function routerOwnershipTimestamp() external view returns (uint256);
  function assetOwnershipTimestamp() external view returns (uint256);
  function delay() external view returns (uint256);
  function proposeRouterOwnershipRenunciation() external;
  function renounceRouterOwnership() external;
  function proposeAssetOwnershipRenunciation() external;
  function renounceAssetOwnership() external;
  function renounced() external view returns (bool);
  function proposeNewOwner(address newlyProposed) external;
  function renounceOwnership() external;
  function acceptProposedOwner() external;
  // RelayerFacet
  function transferRelayer(bytes32 _transferId) external view returns (address);
  function approvedRelayers(address _relayer) external view returns (bool);
  function relayerFeeRouter() external view returns (RelayerFeeRouter);
  function LIQUIDITY_FEE_NUMERATOR() external view returns (uint256);
  function LIQUIDITY_FEE_DENOMINATOR() external view returns (uint256);
  function addRelayer(address _relayer) external;
  function removeRelayer(address _relayer) external;
  function initiateClaim(
    uint32 _domain,
    address _recipient,
    bytes32[] calldata _transferIds
  ) external;
  function claim(address _recipient, bytes32[] calldata _transferIds) external;
  // RoutersFacet
  function getRouterApproval(address _router) external view returns (bool);
  function getRouterRecipient(address _router) external view returns (address);
  function getRouterOwner(address _router) external view returns (address);
  function getProposedRouterOwner(address _router) external view returns (address);
  function getProposedRouterOwnerTimestamp(address _router) external view returns (uint256);
  function maxRoutersPerTransfer() external view returns (uint256);
  function routerBalances(address _router, address _asset) external view returns (uint256);
  function setRouterRecipient(address router, address recipient) external;
  function proposeRouterOwner(address router, address proposed) external;
  function acceptProposedRouterOwner(address router) external;
  function setupRouter(
    address router,
    address owner,
    address recipient
  ) external;
  function removeRouter(address router) external;
  function setMaxRoutersPerTransfer(uint256 _newMaxRouters) external;
  function addLiquidityFor(
    uint256 _amount,
    address _local,
    address _router
  ) external payable;
  function addLiquidity(uint256 _amount, address _local) external payable;
  function removeLiquidity(
    uint256 _amount,
    address _local,
    address payable _to
  ) external;

}
