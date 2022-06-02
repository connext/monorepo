// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {XAppConnectionManager} from "../../../nomad-core/contracts/XAppConnectionManager.sol";

import {RelayerFeeRouter} from "../../relayer-fee/RelayerFeeRouter.sol";
import {PromiseRouter} from "../../promise/PromiseRouter.sol";

import {ConnextMessage} from "../libraries/ConnextMessage.sol";
import {XCallArgs, ExecuteArgs} from "../libraries/LibConnextStorage.sol";
import {SwapUtils} from "../libraries/SwapUtils.sol";

import {IStableSwap} from "./IStableSwap.sol";
import {ITokenRegistry} from "./ITokenRegistry.sol";
import {IWrapped} from "./IWrapped.sol";
import {IExecutor} from "./IExecutor.sol";
import {ISponsorVault} from "./ISponsorVault.sol";

interface IConnextHandler {
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

  function sponsorVault() external view returns (ISponsorVault);

  function promiseRouter() external view returns (PromiseRouter);

  function relayerFeeRouer() external view returns (RelayerFeeRouter);

  function setTokenRegistry(address _tokenRegistry) external;

  function setRelayerFeeRouter(address _relayerFeeRouter) external;

  function setPromiseRouter(address payable _promiseRouter) external;

  function setExecutor(address _executor) external;

  function setWrapper(address _wrapper) external;

  function setSponsorVault(address _sponsorVault) external;

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
  function routerOwnershipRenounced() external view returns (bool);

  function assetOwnershipRenounced() external view returns (bool);

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

  function addRelayer(address _relayer) external;

  function removeRelayer(address _relayer) external;

  function initiateClaim(
    uint32 _domain,
    address _recipient,
    bytes32[] calldata _transferIds
  ) external;

  function claim(address _recipient, bytes32[] calldata _transferIds) external;

  // RoutersFacet
  function LIQUIDITY_FEE_NUMERATOR() external view returns (uint256);

  function LIQUIDITY_FEE_DENOMINATOR() external view returns (uint256);

  function getRouterApproval(address _router) external view returns (bool);

  function getRouterRecipient(address _router) external view returns (address);

  function getRouterOwner(address _router) external view returns (address);

  function getProposedRouterOwner(address _router) external view returns (address);

  function getProposedRouterOwnerTimestamp(address _router) external view returns (uint256);

  function maxRoutersPerTransfer() external view returns (uint256);

  function setLiquidityFeeNumerator(uint256 _numerator) external;

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

  function addRouterLiquidityFor(
    uint256 _amount,
    address _local,
    address _router
  ) external payable;

  function addRouterLiquidity(uint256 _amount, address _local) external payable;

  function removeRouterLiquidityFor(
    uint256 _amount,
    address _local,
    address payable _to,
    address _router
  ) external;

  function removeRouterLiquidity(
    uint256 _amount,
    address _local,
    address payable _to
  ) external;

  // StableSwapFacet
  function getSwapStorage(bytes32 canonicalId) external view returns (SwapUtils.Swap memory);

  function getSwapLPToken(bytes32 canonicalId) external view returns (address);

  function getSwapA(bytes32 canonicalId) external view returns (uint256);

  function getSwapAPrecise(bytes32 canonicalId) external view returns (uint256);

  function getSwapToken(bytes32 canonicalId, uint8 index) external view returns (IERC20);

  function getSwapTokenIndex(bytes32 canonicalId, address tokenAddress) external view returns (uint8);

  function getSwapTokenBalance(bytes32 canonicalId, uint8 index) external view returns (uint256);

  function getSwapVirtualPrice(bytes32 canonicalId) external view returns (uint256);

  function calculateSwap(
    bytes32 canonicalId,
    uint8 tokenIndexFrom,
    uint8 tokenIndexTo,
    uint256 dx
  ) external view returns (uint256);

  function calculateSwapTokenAmount(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    bool deposit
  ) external view returns (uint256);

  function calculateRemoveSwapLiquidity(bytes32 canonicalId, uint256 amount) external view returns (uint256[] memory);

  function calculateRemoveSwapLiquidityOneToken(
    bytes32 canonicalId,
    uint256 tokenAmount,
    uint8 tokenIndex
  ) external view returns (uint256);

  function getSwapAdminBalance(bytes32 canonicalId, uint256 index) external view returns (uint256);

  function swap(
    bytes32 canonicalId,
    uint8 tokenIndexFrom,
    uint8 tokenIndexTo,
    uint256 dx,
    uint256 minDy,
    uint256 deadline
  ) external returns (uint256);

  function swapExact(
    bytes32 canonicalId,
    uint256 amountIn,
    address assetIn,
    address assetOut,
    uint256 minAmountOut,
    uint256 deadline
  ) external payable returns (uint256);

  function addSwapLiquidity(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    uint256 minToMint,
    uint256 deadline
  ) external returns (uint256);

  function removeSwapLiquidity(
    bytes32 canonicalId,
    uint256 amount,
    uint256[] calldata minAmounts,
    uint256 deadline
  ) external returns (uint256[] memory);

  function removeSwapLiquidityOneToken(
    bytes32 canonicalId,
    uint256 tokenAmount,
    uint8 tokenIndex,
    uint256 minAmount,
    uint256 deadline
  ) external returns (uint256);

  function removeSwapLiquidityImbalance(
    bytes32 canonicalId,
    uint256[] calldata amounts,
    uint256 maxBurnAmount,
    uint256 deadline
  ) external returns (uint256);

  function initializeSwap(
    bytes32 _canonicalId,
    IERC20[] memory _pooledTokens,
    uint8[] memory decimals,
    string memory lpTokenName,
    string memory lpTokenSymbol,
    uint256 _a,
    uint256 _fee,
    uint256 _adminFee,
    address lpTokenTargetAddress
  ) external;

  function withdrawSwapAdminFees(bytes32 canonicalId) external;

  function setSwapAdminFee(bytes32 canonicalId, uint256 newAdminFee) external;

  function setSwapFee(bytes32 canonicalId, uint256 newSwapFee) external;

  function rampA(
    bytes32 canonicalId,
    uint256 futureA,
    uint256 futureTime
  ) external;

  function stopRampA(bytes32 canonicalId) external;
}
