// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {ExecuteArgs, TransferInfo, DestinationTransferStatus} from "../libraries/LibConnextStorage.sol";
import {LibDiamond} from "../libraries/LibDiamond.sol";
import {SwapUtils} from "../libraries/SwapUtils.sol";
import {TokenId} from "../libraries/TokenId.sol";

import {IStableSwap} from "./IStableSwap.sol";

import {IDiamondCut} from "./IDiamondCut.sol";
import {IDiamondLoupe} from "./IDiamondLoupe.sol";

interface IConnext is IDiamondLoupe, IDiamondCut {
  // TokenFacet
  function canonicalToAdopted(bytes32 _key) external view returns (address);

  function canonicalToAdopted(TokenId calldata _canonical) external view returns (address);

  function adoptedToCanonical(address _adopted) external view returns (TokenId memory);

  function canonicalToRepresentation(bytes32 _key) external view returns (address);

  function canonicalToRepresentation(TokenId calldata _canonical) external view returns (address);

  function representationToCanonical(address _adopted) external view returns (TokenId memory);

  function getLocalAndAdoptedToken(bytes32 _id, uint32 _domain) external view returns (address, address);

  function approvedAssets(bytes32 _key) external view returns (bool);

  function approvedAssets(TokenId calldata _canonical) external view returns (bool);

  function adoptedToLocalExternalPools(bytes32 _key) external view returns (IStableSwap);

  function adoptedToLocalExternalPools(TokenId calldata _canonical) external view returns (IStableSwap);

  function getTokenId(address _candidate) external view returns (TokenId memory);

  function getCustodiedAmount(bytes32 _key) external view returns (uint256);

  function setupAsset(
    TokenId calldata _canonical,
    uint8 _canonicalDecimals,
    string memory _representationName,
    string memory _representationSymbol,
    address _adoptedAssetId,
    address _stableSwapPool,
    uint256 _cap
  ) external returns (address);

  function setupAssetWithDeployedRepresentation(
    TokenId calldata _canonical,
    address _representation,
    address _adoptedAssetId,
    address _stableSwapPool
  ) external returns (address);

  function addStableSwapPool(TokenId calldata _canonical, address _stableSwapPool) external;

  function updateLiquidityCap(TokenId calldata _canonical, uint256 _updated) external;

  function removeAssetId(bytes32 _key, address _adoptedAssetId, address _representation) external;

  function removeAssetId(TokenId calldata _canonical, address _adoptedAssetId, address _representation) external;

  function updateDetails(TokenId calldata _canonical, string memory _name, string memory _symbol) external;

  // BaseConnextFacet

  // BridgeFacet
  function routedTransfers(bytes32 _transferId) external view returns (address[] memory);

  function transferStatus(bytes32 _transferId) external view returns (DestinationTransferStatus);

  function remote(uint32 _domain) external view returns (address);

  function domain() external view returns (uint256);

  function nonce() external view returns (uint256);

  function approvedSequencers(address _sequencer) external view returns (bool);

  function xAppConnectionManager() external view returns (address);

  function addConnextion(uint32 _domain, address _connext) external;

  function addSequencer(address _sequencer) external;

  function removeSequencer(address _sequencer) external;

  function xcall(
    uint32 _destination,
    address _to,
    address _asset,
    address _delegate,
    uint256 _amount,
    uint256 _slippage,
    bytes calldata _callData
  ) external payable returns (bytes32);

  function xcall(
    uint32 _destination,
    address _to,
    address _asset,
    uint256 _amount,
    bytes calldata _callData
  ) external payable returns (bytes32);

  function xcallIntoLocal(
    uint32 _destination,
    address _to,
    address _asset,
    address _delegate,
    uint256 _amount,
    uint256 _slippage,
    bytes calldata _callData
  ) external payable returns (bytes32);

  function execute(ExecuteArgs calldata _args) external returns (bytes32 transferId);

  function bumpTransfer(bytes32 _transferId) external payable;

  function setXAppConnectionManager(address _xAppConnectionManager) external;

  function enrollRemoteRouter(uint32 _domain, bytes32 _router) external;

  function enrollCustom(uint32 _domain, bytes32 _id, address _custom) external;

  // InboxFacet

  function handle(uint32 _origin, uint32 _nonce, bytes32 _sender, bytes memory _message) external;

  // ProposedOwnableFacet

  function owner() external view returns (address);

  function routerAllowlistRemoved() external view returns (bool);

  function proposed() external view returns (address);

  function proposedTimestamp() external view returns (uint256);

  function routerAllowlistTimestamp() external view returns (uint256);

  function delay() external view returns (uint256);

  function paused() external view returns (bool);

  function proposeRouterAllowlistRemoval() external;

  function removeRouterAllowlist() external;

  function proposeNewOwner(address newlyProposed) external;

  function acceptProposedOwner() external;

  function pause() external;

  function unpause() external;

  // RelayerFacet
  function approvedRelayers(address _relayer) external view returns (bool);

  function relayerFeeVault() external view returns (address);

  function setRelayerFeeVault(address _relayerFeeVault) external;

  function addRelayer(address _relayer) external;

  function removeRelayer(address _relayer) external;

  // RoutersFacet
  function LIQUIDITY_FEE_NUMERATOR() external view returns (uint256);

  function LIQUIDITY_FEE_DENOMINATOR() external view returns (uint256);

  function getRouterApproval(address _router) external view returns (bool);

  function getRouterRecipient(address _router) external view returns (address);

  function getRouterOwner(address _router) external view returns (address);

  function getProposedRouterOwner(address _router) external view returns (address);

  function getProposedRouterOwnerTimestamp(address _router) external view returns (uint256);

  function maxRoutersPerTransfer() external view returns (uint256);

  function routerBalances(address _router, address _asset) external view returns (uint256);

  function approveRouter(address _router) external;

  function initializeRouter(address _owner, address _recipient) external;

  function unapproveRouter(address _router) external;

  function setMaxRoutersPerTransfer(uint256 _newMaxRouters) external;

  function setLiquidityFeeNumerator(uint256 _numerator) external;

  function setRouterRecipient(address _router, address _recipient) external;

  function proposeRouterOwner(address _router, address _proposed) external;

  function acceptProposedRouterOwner(address _router) external;

  function addRouterLiquidityFor(uint256 _amount, address _local, address _router) external payable;

  function addRouterLiquidity(uint256 _amount, address _local) external payable;

  function removeRouterLiquidityFor(
    TokenId memory _canonical,
    uint256 _amount,
    address payable _to,
    address _router
  ) external;

  function removeRouterLiquidity(TokenId memory _canonical, uint256 _amount, address payable _to) external;
}
