// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {ExecuteArgs, TransferInfo, DestinationTransferStatus} from "../libraries/LibConnextStorage.sol";
import {TokenId} from "../libraries/TokenId.sol";

interface IConnext {
  // Core Functions
  function xcallV1(
    uint32 _destination,
    address _to,
    address _asset,
    uint256 _amount,
    bytes calldata _callData
  ) external payable returns (bytes32);

  function xcallV1(
    uint32 _destination,
    address _to,
    address _asset,
    uint256 _amount,
    bytes calldata _callData,
    uint256 _relayerFee
  ) external returns (bytes32);

  function xcall(
    uint32 _destination,
    address _to,
    address _asset,
    uint256 _amount,
    bytes calldata _callData
  ) external payable returns (bytes32);

  function xcall(
    uint32 _destination,
    address _to,
    address _asset,
    uint256 _amount,
    bytes calldata _callData,
    uint256 _relayerFee
  ) external returns (bytes32);

  // TODO will need to add settlement domain
  function execute(ExecuteArgs calldata _args, bytes _metadata) external returns (bytes32 transferId);

  function reconcile(
    bytes _xcallMessage,
    bytes _executeMessage,
    bytes _settlementMetadata,
    Proof[] calldata _proofs,
    bytes32 _aggregateRoot,
    bytes32[32] calldata _aggregatePath,
    uint256 _aggregateIndex
  ) external;

  function settleCredit(
    address _router,
    uint256 _amount,
    uint256 _asset
  ) external;

  function moveCredit(
    address _router,
    uint256 _amount,
    uint256 _asset,
    uint32 _destination
  ) external;

  function bumpTransfer(bytes32 _transferId) external payable;

  function domain() external view returns (uint256);

  // Router Functions
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

  // Asset Functions
  function setupAsset(
    TokenId calldata _canonical,
    uint8 _canonicalDecimals,
    string memory _representationName,
    string memory _representationSymbol,
    address _adoptedAssetId
  ) external returns (address);

  function assetIdToCanonicalId(bytes32 _key) external view returns (address);

  function canonicalIdToAssetId(TokenId calldata _canonical) external view returns (address);

  function approvedAssets(bytes32 _key) external view returns (bool);

  function approvedAssets(TokenId calldata _canonical) external view returns (bool);

  function removeAssetId(bytes32 _key, address _adoptedAssetId, address _representation) external;

  function removeAssetId(TokenId calldata _canonical, address _adoptedAssetId, address _representation) external;

  function updateDetails(TokenId calldata _canonical, string memory _name, string memory _symbol) external;

  // Relayer Functions
  function approvedRelayers(address _relayer) external view returns (bool);

  function relayerFeeVault() external view returns (address);

  function setRelayerFeeVault(address _relayerFeeVault) external;

  function addRelayer(address _relayer) external;

  function removeRelayer(address _relayer) external;
  
  // Admin Functions
  function approvedSequencers(address _sequencer) external view returns (bool);

  function xAppConnectionManager() external view returns (address);

  function addConnextion(uint32 _domain, address _connext) external;

  function addSequencer(address _sequencer) external;

  function removeSequencer(address _sequencer) external;

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

  function setXAppConnectionManager(address _xAppConnectionManager) external;

  function enrollRemoteRouter(uint32 _domain, bytes32 _router) external;

  function enrollCustom(uint32 _domain, bytes32 _id, address _custom) external;

  // TODO
  function routedTransfers(bytes32 _transferId) external view returns (address[] memory);

  function transferStatus(bytes32 _transferId) external view returns (DestinationTransferStatus);

  function remote(uint32 _domain) external view returns (address);

  function nonce() external view returns (uint256);

  function handle(uint32 _origin, uint32 _nonce, bytes32 _sender, bytes memory _message) external;

}
