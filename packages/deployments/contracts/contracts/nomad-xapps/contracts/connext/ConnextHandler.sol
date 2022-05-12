// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

// ============ Imports ============
// TODO: import from nomad, summa packages
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";
import {Home} from "../../../nomad-core/contracts/Home.sol";
import {RelayerFeeRouter} from "../../../nomad-xapps/contracts/relayer-fee-router/RelayerFeeRouter.sol";
import {Router} from "../Router.sol";

import {ConnextMessage} from "./ConnextMessage.sol";

import {ConnextLogic} from "../../../lib/Connext/ConnextLogic.sol";

import {ITokenRegistry} from "../../interfaces/bridge/ITokenRegistry.sol";
import {IWrapped} from "../../../interfaces/IWrapped.sol";
import {IConnextHandler} from "../../../interfaces/IConnextHandler.sol";
import {IExecutor} from "../../../interfaces/IExecutor.sol";
import {IStableSwap} from "../../../interfaces/IStableSwap.sol";

import {Executor} from "../../../interpreters/Executor.sol";
import {RouterPermissionsManager} from "../../../RouterPermissionsManager.sol";

import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/**
 * @title ConnextHandler
 * @author Connext Labs
 * @notice Contains logic to facilitate bridging via nomad, including the provision of
 * fast liquidity
 * @dev This contract primarily contains the storage used by the functions within the
 * `ConnextLogic` contract, which contains the meaningful logic
 */
contract ConnextHandler is
  Initializable,
  ReentrancyGuardUpgradeable,
  Router,
  RouterPermissionsManager,
  IConnextHandler
{
  // ============ Libraries ============

  using SafeERC20Upgradeable for IERC20Upgradeable;

  // ============ Constants ============

  // TODO: enable setting these constants via admin fn
  uint256 public LIQUIDITY_FEE_NUMERATOR;
  uint256 public LIQUIDITY_FEE_DENOMINATOR;

  /**
   * @notice Contains hash of empty bytes
   */
  bytes32 internal EMPTY;

  // ============ Private storage ============
  /**
   * @dev This empty reserved space is put in place to allow future versions to add new
   * variables without shifting down storage in the inheritance chain.
   * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
   */
  uint256[49] private __gap;

  // ============ Public storage ============

  /**
   * @notice The local nomad relayer fee router
   */
  RelayerFeeRouter public relayerFeeRouter;

  /**
   * @notice The address of the wrapper for the native asset on this domain
   * @dev Needed because the nomad only handles ERC20 assets
   */
  IWrapped public wrapper;

  /**
   * @notice Nonce for the contract, used to keep unique transfer ids.
   * @dev Assigned at first interaction (xcall on origin domain);
   */
  uint256 public nonce;

  /**
   * @notice The external contract that will execute crosschain calldata
   */
  IExecutor public executor;

  /**
   * @notice The domain this contract exists on
   * @dev Must match the nomad domain, which is distinct from the "chainId"
   */
  uint256 public domain;

  /**
   * @notice The local nomad token registry
   */
  ITokenRegistry public tokenRegistry;

  /**
   * @notice Mapping holding the AMMs for swapping in and out of local assets
   * @dev Swaps for an adopted asset <> nomad local asset (i.e. POS USDC <> madUSDC on polygon)
   */
  mapping(bytes32 => IStableSwap) public adoptedToLocalPools;

  /**
   * @notice Mapping of whitelisted assets on same domain as contract
   * @dev Mapping is keyed on the canonical token identifier matching what is stored in the token
   * registry
   */
  mapping(bytes32 => bool) public approvedAssets;

  /**
   * @notice Mapping of canonical to adopted assets on this domain
   * @dev If the adopted asset is the native asset, the keyed address will
   * be the wrapped asset address
   */
  mapping(address => ConnextMessage.TokenId) public adoptedToCanonical;

  /**
   * @notice Mapping of adopted to canonical on this domain
   * @dev If the adopted asset is the native asset, the stored address will be the
   * wrapped asset address
   */
  mapping(bytes32 => address) public canonicalToAdopted;

  /**
   * @notice Mapping to determine if transfer is reconciled
   */
  mapping(bytes32 => bool) public reconciledTransfers;

  /**
   * @notice Mapping holding router address that provided fast liquidity
   */
  mapping(bytes32 => address[]) public routedTransfers;

  /**
   * @notice Mapping of router to available balance of an asset
   * @dev Routers should always store liquidity that they can expect to receive via the bridge on
   * this domain (the nomad local asset)
   */
  mapping(address => mapping(address => uint256)) public routerBalances;

  /**
   * @notice Mapping of approved relayers
   * @dev Send relayer fee if msg.sender is approvedRelayer. otherwise revert()
   */
  mapping(address => bool) public approvedRelayers;

  /**
   * @notice Stores the relayer fee for a transfer. Updated on origin domain when a user calls xcall or bump
   * @dev This will track all of the relayer fees assigned to a transfer by id, including any bumps made by the relayer
   */
  mapping(bytes32 => uint256) public relayerFees;

  /**
   * @notice Stores the relayer of a transfer. Updated on the destination domain when a relayer calls execute
   * for transfer
   * @dev When relayer claims, must check that the msg.sender has forwarded transfer
   */
  mapping(bytes32 => address) public transferRelayer;

  /**
   * @notice The max amount of routers a payment can be routed through
   */
  uint256 public maxRoutersPerTransfer;

  // ============ Errors ============

  error ConnextHandler__addLiquidityForRouter_routerEmpty();
  error ConnextHandler__addLiquidityForRouter_amountIsZero();
  error ConnextHandler__addLiquidityForRouter_badRouter();
  error ConnextHandler__addLiquidityForRouter_badAsset();
  error ConnextHandler__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer();
  error ConnextHandler__onlyRelayerFeeRouter_notRelayerFeeRouter();
  error ConnextHandler__bumpTransfer_valueIsZero();
  error ConnextHandler__execute_unapprovedRelayer();

  // ============ Modifiers ============

  /**
   * @notice Restricts the caller to the local relayer fee router
   */
  modifier onlyRelayerFeeRouter() {
    if (msg.sender != address(relayerFeeRouter)) revert ConnextHandler__onlyRelayerFeeRouter_notRelayerFeeRouter();
    _;
  }

  // ========== Initializer ============

  function initialize(
    uint256 _domain,
    address _xAppConnectionManager,
    address _tokenRegistry, // Nomad token registry
    address _wrappedNative,
    address _relayerFeeRouter
  ) public override initializer {
    __XAppConnectionClient_initialize(_xAppConnectionManager);
    __ReentrancyGuard_init();
    __RouterPermissionsManager_init();

    nonce = 0;
    domain = _domain;
    relayerFeeRouter = RelayerFeeRouter(_relayerFeeRouter);
    executor = new Executor(address(this));
    tokenRegistry = ITokenRegistry(_tokenRegistry);
    wrapper = IWrapped(_wrappedNative);
    EMPTY = hex"c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
    LIQUIDITY_FEE_NUMERATOR = 9995;
    LIQUIDITY_FEE_DENOMINATOR = 10000;
    maxRoutersPerTransfer = 5;
  }

  // ============ Owner Functions ============

  /**
   * @notice Used to set router initial properties
   * @param _router Router address to setup
   * @param _owner Initial Owner of router
   * @param _recipient Initial Recipient of router
   */
  function setupRouter(
    address _router,
    address _owner,
    address _recipient
  ) external onlyOwner {
    _setupRouter(_router, _owner, _recipient);
  }

  /**
   * @notice Used to remove routers that can transact crosschain
   * @param _router Router address to remove
   */
  function removeRouter(address _router) external override onlyOwner {
    _removeRouter(_router);
  }

  /**
   * @notice Adds a stable swap pool for the local <> adopted asset.
   */
  function addStableSwapPool(ConnextMessage.TokenId calldata _canonical, address _stableSwapPool)
    external
    override
    onlyOwner
  {
    ConnextLogic.addStableSwapPool(_canonical, _stableSwapPool, adoptedToLocalPools);
  }

  /**
   * @notice Used to add supported assets. This is an admin only function
   * @dev When whitelisting the canonical asset, all representational assets would be
   * whitelisted as well. In the event you have a different adopted asset (i.e. PoS USDC
   * on polygon), you should *not* whitelist the adopted asset. The stable swap pool
   * address used should allow you to swap between the local <> adopted asset
   * @param _canonical - The canonical asset to add by id and domain. All representations
   * will be whitelisted as well
   * @param _adoptedAssetId - The used asset id for this domain (i.e. PoS USDC for
   * polygon)
   */
  function setupAsset(
    ConnextMessage.TokenId calldata _canonical,
    address _adoptedAssetId,
    address _stableSwapPool
  ) external override onlyOwner {
    // Add the asset
    ConnextLogic.addAssetId(
      _canonical,
      _adoptedAssetId,
      address(wrapper),
      approvedAssets,
      adoptedToCanonical,
      canonicalToAdopted
    );

    // Add the swap pool
    ConnextLogic.addStableSwapPool(_canonical, _stableSwapPool, adoptedToLocalPools);
  }

  /**
   * @notice Used to remove assets from the whitelist
   * @param _canonicalId - Token id to remove
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   */
  function removeAssetId(bytes32 _canonicalId, address _adoptedAssetId) external override onlyOwner {
    ConnextLogic.removeAssetId(
      _canonicalId,
      _adoptedAssetId,
      address(wrapper),
      approvedAssets,
      adoptedToLocalPools,
      adoptedToCanonical
    );
  }

  /**
   * @notice Used to add approved relayer
   * @param _relayer - The relayer address to add
   */
  function addRelayer(address _relayer) external override onlyOwner {
    ConnextLogic.addRelayer(_relayer, approvedRelayers);
  }

  /**
   * @notice Used to remove approved relayer
   * @param _relayer - The relayer address to remove
   */
  function removeRelayer(address _relayer) external override onlyOwner {
    ConnextLogic.removeRelayer(_relayer, approvedRelayers);
  }

  /**
   * @notice Used to set the max amount of routers a payment can be routed through
   * @param _newMaxRouters The new max amount of routers
   */
  function setMaxRoutersPerTransfer(uint256 _newMaxRouters) external override onlyOwner {
    ConnextLogic.setMaxRoutersPerTransfer(_newMaxRouters, maxRoutersPerTransfer);

    maxRoutersPerTransfer = _newMaxRouters;
  }

  // ============ External functions ============

  receive() external payable {}

  function getExecutor() external view override returns (address) {
    return address(executor);
  }

  /**
   * @notice This is used by anyone to increase a router's available liquidity for a given asset.
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   * @param _amount - The amount of liquidity to add for the router
   * @param _local - The address of the asset you're adding liquidity for. If adding liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   * @param _router The router you are adding liquidity on behalf of
   */
  function addLiquidityFor(
    uint256 _amount,
    address _local,
    address _router
  ) external payable override nonReentrant {
    _addLiquidityForRouter(_amount, _local, _router);
  }

  /**
   * @notice This is used by any router to increase their available liquidity for a given asset.
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   * @param _amount - The amount of liquidity to add for the router
   * @param _local - The address of the asset you're adding liquidity for. If adding liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   */
  function addLiquidity(uint256 _amount, address _local) external payable override nonReentrant {
    _addLiquidityForRouter(_amount, _local, msg.sender);
  }

  /**
   * @notice This is used by any router to decrease their available liquidity for a given asset.
   * @param _amount - The amount of liquidity to remove for the router
   * @param _local - The address of the asset you're removing liquidity from. If removing liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   * @param _to The address that will receive the liquidity being removed
   */
  function removeLiquidity(
    uint256 _amount,
    address _local,
    address payable _to
  ) external override nonReentrant {
    // transfer to specicfied recipient IF recipient not set
    address recipient = getRouterRecipient(msg.sender);
    recipient = recipient == address(0) ? _to : recipient;

    ConnextLogic.removeLiquidity(_amount, _local, recipient, routerBalances, wrapper);
  }

  /**
   * @notice This function is called by a user who is looking to bridge funds
   * @dev This contract must have approval to transfer the adopted assets. They are then swapped to
   * the local nomad assets via the configured AMM and sent over the bridge router.
   * @param _args - The XCallArgs
   * @return The transfer id of the crosschain transfer
   */
  function xcall(XCallArgs calldata _args) external payable override returns (bytes32) {
    // get remote BridgeRouter address; revert if not found
    bytes32 remote = _mustHaveRemote(_args.params.destinationDomain);

    ConnextLogic.XCallLibArgs memory libArgs = ConnextLogic.XCallLibArgs({
      xCallArgs: _args,
      wrapper: wrapper,
      nonce: nonce,
      tokenRegistry: tokenRegistry,
      domain: domain,
      home: xAppConnectionManager.home(),
      remote: remote
    });

    (bytes32 transferId, uint256 newNonce) = ConnextLogic.xcall(
      libArgs,
      adoptedToCanonical,
      adoptedToLocalPools,
      relayerFees
    );

    nonce = newNonce;

    return transferId;
  }

  /**
   * @notice Handles an incoming message
   * @dev This function relies on nomad relayers and should not consume arbitrary amounts of
   * gas
   * @param _origin The origin domain
   * @param _nonce The unique identifier for the message from origin to destination
   * @param _sender The sender address
   * @param _message The message
   */
  function handle(
    uint32 _origin,
    uint32 _nonce,
    bytes32 _sender,
    bytes memory _message
  ) external override onlyReplica onlyRemoteRouter(_origin, _sender) {
    // handle the action
    ConnextLogic.reconcile(_origin, _message, reconciledTransfers, tokenRegistry, routedTransfers, routerBalances);
  }

  /**
   * @notice Called on the destination domain to disburse correct assets to end recipient
   * and execute any included calldata
   * @dev Can be called prior to or after `handle`, depending if fast liquidity is being
   * used.
   */
  function execute(ExecuteArgs calldata _args) external override returns (bytes32 transferId) {
    // If the sender is not approved relayer, revert()
    if (!approvedRelayers[msg.sender]) {
      revert ConnextHandler__execute_unapprovedRelayer();
    }

    ConnextLogic.ExecuteLibArgs memory libArgs = ConnextLogic.ExecuteLibArgs({
      executeArgs: _args,
      isRouterOwnershipRenounced: isRouterOwnershipRenounced(),
      maxRoutersPerTransfer: maxRoutersPerTransfer,
      tokenRegistry: tokenRegistry,
      wrapper: wrapper,
      executor: executor,
      liquidityFeeNumerator: LIQUIDITY_FEE_NUMERATOR,
      liquidityFeeDenominator: LIQUIDITY_FEE_DENOMINATOR
    });

    return
      ConnextLogic.execute(
        libArgs,
        routedTransfers,
        reconciledTransfers,
        routerBalances,
        adoptedToLocalPools,
        canonicalToAdopted,
        routerInfo,
        transferRelayer
      );
  }

  /**
   * @notice Anyone can call this function on the origin domain to increase the relayer fee for a transfer.
   * @param _transferId - The unique identifier of the crosschain transaction
   */
  function bumpTransfer(bytes32 _transferId) external payable {
    ConnextLogic.bumpTransfer(_transferId, relayerFees);
  }

  /**
   * @notice Called by relayer when they want to claim owed funds on a given domain
   * @dev Domain should be the origin domain of all the transfer ids
   * @param _recipient - address on origin chain to send claimed funds to
   * @param _domain - domain to claim funds on
   * @param _transferIds - transferIds to claim
   */
  function initiateClaim(
    uint32 _domain,
    address _recipient,
    bytes32[] calldata _transferIds
  ) external override {
    ConnextLogic.initiateClaim(_domain, _recipient, _transferIds, relayerFeeRouter, transferRelayer);
  }

  /**
   * @notice Pays out a relayer for the given fees
   * @dev Called by the RelayerFeeRouter.handle message. The validity of the transferIds is
   * asserted before dispatching the message.
   * @param _recipient - address on origin chain to send claimed funds to
   * @param _transferIds - transferIds to claim
   */
  function claim(address _recipient, bytes32[] calldata _transferIds) external override onlyRelayerFeeRouter {
    ConnextLogic.claim(_recipient, _transferIds, relayerFees);
  }

  // ============ Internal functions ============

  /**
   * @notice Contains the logic to verify + increment a given routers liquidity
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   * @param _amount - The amount of liquidity to add for the router
   * @param _local - The address of the nomad representation of the asset
   * @param _router - The router you are adding liquidity on behalf of
   */
  function _addLiquidityForRouter(
    uint256 _amount,
    address _local,
    address _router
  ) internal {
    // Sanity check: router is sensible
    if (_router == address(0)) revert ConnextHandler__addLiquidityForRouter_routerEmpty();

    // Sanity check: nonzero amounts
    if (_amount == 0) revert ConnextHandler__addLiquidityForRouter_amountIsZero();

    // Get the canonical asset id from the representation
    (, bytes32 id) = tokenRegistry.getTokenId(_local == address(0) ? address(wrapper) : _local);

    // Router is approved
    if (!isRouterOwnershipRenounced() && !getRouterApproval(_router))
      revert ConnextHandler__addLiquidityForRouter_badRouter();

    // Asset is approved
    if (!isAssetOwnershipRenounced() && !approvedAssets[id]) revert ConnextHandler__addLiquidityForRouter_badAsset();

    ConnextLogic.addLiquidityForRouter(_amount, _local, _router, routerBalances, id, wrapper);
  }
}
