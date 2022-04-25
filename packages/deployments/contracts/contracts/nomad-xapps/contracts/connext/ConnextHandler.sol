// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

// ============ Imports ============
// TODO: import from nomad, summa packages
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";
import {Home} from "../../../nomad-core/contracts/Home.sol";
import {Version0} from "../../../nomad-core/contracts/Version0.sol";
import {TypeCasts} from "../../../nomad-core/contracts/XAppConnectionManager.sol";
import {RelayerFeeRouter} from "../../../nomad-xapps/contracts/relayer-fee-router/RelayerFeeRouter.sol";
import {Router} from "../Router.sol";

import {ConnextMessage} from "./ConnextMessage.sol";

import {AssetLogic} from "../../../lib/Connext/AssetLogic.sol";
import {ConnextUtils} from "../../../lib/Connext/ConnextUtils.sol";
import {LibCrossDomainProperty} from "../../../lib/LibCrossDomainProperty.sol";

import {IBridgeToken} from "../../interfaces/bridge/IBridgeToken.sol";
import {ITokenRegistry} from "../../interfaces/bridge/ITokenRegistry.sol";

import {IWrapped} from "../../../interfaces/IWrapped.sol";
import {IConnext} from "../../../interfaces/IConnext.sol";
import {IExecutor} from "../../../interfaces/IExecutor.sol";
import {IStableSwap} from "../../../interfaces/IStableSwap.sol";

import {Executor} from "../../../interpreters/Executor.sol";

import {ProposedOwnableUpgradeable} from "../../../ProposedOwnableUpgradeable.sol";
import {RouterPermissionsManager} from "../../../RouterPermissionsManager.sol";

import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/**
 * @title ConnextHandler
 * @author Connext Labs
 * @dev Contains logic to facilitate bridging via nomad, including the provision of
 * fast liquidity
 */
contract ConnextHandler is
  Initializable,
  Version0,
  ReentrancyGuardUpgradeable,
  Router,
  RouterPermissionsManager,
  IConnext
{
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using ConnextMessage for bytes29;
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
  mapping(bytes32 => bool) reconciledTransfers;

  /**
   * @notice Mapping holding router address that provided fast liquidity
   */
  mapping(bytes32 => address[]) routedTransfers;

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

  error ConnextHandler__addRelayer_alreadyApproved();
  error ConnextHandler__removeRelayer_notApproved();
  error ConnextHandler__removeLiquidity_recipientEmpty();
  error ConnextHandler__removeLiquidity_amountIsZero();
  error ConnextHandler__removeLiquidity_insufficientFunds();
  error ConnextHandler__removeAssetId_notAdded();
  error ConnextHandler__xcall_wrongDomain();
  error ConnextHandler__xcall_notSupportedAsset();
  error ConnextHandler__xcall_emptyTo();
  error ConnextHandler__handle_invalidAction();
  error ConnextHandler__execute_unapprovedRelayer();
  error ConnextHandler__execute_alreadyExecuted();
  error ConnextHandler__execute_notSupportedRouter();
  error ConnextHandler__execute_notApprovedRelayer();
  error ConnextHandler__execute_invalidProperties();
  error ConnextHandler__execute_maxRoutersExceeded();
  error ConnextHandler__reconcile_alreadyReconciled();
  error ConnextHandler__addLiquidityForRouter_routerEmpty();
  error ConnextHandler__addLiquidityForRouter_amountIsZero();
  error ConnextHandler__addLiquidityForRouter_badRouter();
  error ConnextHandler__addLiquidityForRouter_badAsset();
  error ConnextHandler__addAssetId_alreadyAdded();
  error ConnextHandler__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer();
  error ConnextHandler__onlyRelayerFeeRouter_notRelayerFeeRouter();
  error ConnextHandler__bumpTransfer_valueIsZero();

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
   * @param router Router address to setup
   * @param owner Initial Owner of router
   * @param recipient Initial Recipient of router
   */
  function setupRouter(
    address router,
    address owner,
    address recipient
  ) external onlyOwner {
    _setupRouter(router, owner, recipient);
  }

  /**
   * @notice Used to remove routers that can transact crosschain
   * @param router Router address to remove
   */
  function removeRouter(address router) external override onlyOwner {
    _removeRouter(router);
  }

  /**
   * @notice Adds a stable swap pool for the local <> adopted asset.
   */
  function addStableSwapPool(ConnextMessage.TokenId calldata canonical, address stableSwapPool)
    external
    override
    onlyOwner
  {
    _addStableSwapPool(canonical, stableSwapPool);
  }

  /**
   * @notice Used to add supported assets. This is an admin only function
   * @dev When whitelisting the canonical asset, all representational assets would be
   * whitelisted as well. In the event you have a different adopted asset (i.e. PoS USDC
   * on polygon), you should *not* whitelist the adopted asset. The stable swap pool
   * address used should allow you to swap between the local <> adopted asset
   * @param canonical - The canonical asset to add by id and domain. All representations
   * will be whitelisted as well
   * @param adoptedAssetId - The used asset id for this domain (i.e. PoS USDC for
   * polygon)
   * @param stableSwapPool - Address of the pool to swap adopted <> local asset
   */
  function setupAsset(
    ConnextMessage.TokenId calldata canonical,
    address adoptedAssetId,
    address stableSwapPool
  ) external override onlyOwner {
    // Add the asset
    _addAssetId(canonical, adoptedAssetId);

    // Add the swap pool
    _addStableSwapPool(canonical, stableSwapPool);
  }

  /**
   * @notice Used to remove assets from the whitelist
   * @param canonicalId - Token id to remove
   * @param adoptedAssetId - Corresponding adopted asset to remove
   */
  function removeAssetId(bytes32 canonicalId, address adoptedAssetId) external override onlyOwner {
    // Sanity check: already approval
    if (!approvedAssets[canonicalId]) revert ConnextHandler__removeAssetId_notAdded();

    // Update mapping
    delete approvedAssets[canonicalId];

    // Update pools
    delete adoptedToLocalPools[canonicalId];

    // Update adopted mapping
    delete adoptedToCanonical[adoptedAssetId == address(0) ? address(wrapper) : adoptedAssetId];

    // Emit event
    emit AssetRemoved(canonicalId, msg.sender);
  }

  /**
   * @notice Used to add approved relayer
   * @param relayer - The relayer address to add
   */
  function addRelayer(address relayer) external override onlyOwner {
    if (approvedRelayers[relayer]) revert ConnextHandler__addRelayer_alreadyApproved();
    approvedRelayers[relayer] = true;

    emit RelayerAdded(relayer, msg.sender);
  }

  /**
   * @notice Used to remove approved relayer
   * @param relayer - The relayer address to remove
   */
  function removeRelayer(address relayer) external override onlyOwner {
    if (!approvedRelayers[relayer]) revert ConnextHandler__removeRelayer_notApproved();
    delete approvedRelayers[relayer];

    emit RelayerRemoved(relayer, msg.sender);
  }

  /**
   * @notice Used to set the max amount of routers a payment can be routed through
   * @param newMaxRouters The new max amount of routers
   */
  function setMaxRoutersPerTransfer(uint256 newMaxRouters) external override onlyOwner {
    if (newMaxRouters == 0 || newMaxRouters == maxRoutersPerTransfer)
      revert ConnextHandler__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer();

    maxRoutersPerTransfer = newMaxRouters;

    emit MaxRoutersPerTransferUpdated(newMaxRouters, msg.sender);
  }

  // ============ External functions ============

  receive() external payable {}

  /**
   * @notice This is used by anyone to increase a router's available liquidity for a given asset.
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   * @param amount - The amount of liquidity to add for the router
   * @param local - The address of the asset you're adding liquidity for. If adding liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   * @param router The router you are adding liquidity on behalf of
   */
  function addLiquidityFor(
    uint256 amount,
    address local,
    address router
  ) external payable override nonReentrant {
    _addLiquidityForRouter(amount, local, router);
  }

  /**
   * @notice This is used by any router to increase their available liquidity for a given asset.
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   * @param amount - The amount of liquidity to add for the router
   * @param local - The address of the asset you're adding liquidity for. If adding liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   */
  function addLiquidity(uint256 amount, address local) external payable override nonReentrant {
    _addLiquidityForRouter(amount, local, msg.sender);
  }

  /**
   * @notice This is used by any router to decrease their available liquidity for a given asset.
   * @param amount - The amount of liquidity to remove for the router
   * @param local - The address of the asset you're removing liquidity from. If removing liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   * @param to The address that will receive the liquidity being removed
   */
  function removeLiquidity(
    uint256 amount,
    address local,
    address payable to
  ) external override nonReentrant {
    // transfer to specicfied recipient IF recipient not set
    address _recipient = routerRecipients(msg.sender);
    _recipient = _recipient == address(0) ? to : _recipient;

    // Sanity check: to is sensible
    if (_recipient == address(0)) revert ConnextHandler__removeLiquidity_recipientEmpty();

    // Sanity check: nonzero amounts
    if (amount == 0) revert ConnextHandler__removeLiquidity_amountIsZero();

    uint256 routerBalance = routerBalances[msg.sender][local];
    // Sanity check: amount can be deducted for the router
    if (routerBalance < amount) revert ConnextHandler__removeLiquidity_insufficientFunds();

    // Update router balances
    unchecked {
      routerBalances[msg.sender][local] = routerBalance - amount;
    }

    // Transfer from contract to specified to
    AssetLogic.transferAssetFromContract(local, _recipient, amount, wrapper);

    // Emit event
    emit LiquidityRemoved(msg.sender, _recipient, local, amount, msg.sender);
  }

  function xcall(XCallArgs calldata _args) external payable override returns (bytes32 transferId) {
    // ensure this is the right domain
    if (_args.params.originDomain != domain) {
      revert ConnextHandler__xcall_wrongDomain();
    }

    // ensure theres a recipient defined
    if (_args.params.to == address(0)) {
      revert ConnextHandler__xcall_emptyTo();
    }

    // get the true transacting asset id (using wrapped native instead native)
    address _transactingAssetId = _args.transactingAssetId == address(0) ? address(wrapper) : _args.transactingAssetId;

    // check that the asset is supported -- can be either adopted or local
    ConnextMessage.TokenId memory _canonical = adoptedToCanonical[_transactingAssetId];
    if (_canonical.id == bytes32(0)) {
      revert ConnextHandler__xcall_notSupportedAsset();
    }

    // compute the transfer id
    bytes32 _transferId = _getTransferId(
      nonce,
      _args.params,
      msg.sender,
      _canonical.domain,
      _canonical.id,
      _args.amount
    );
    // update nonce
    nonce++;

    // transfer funds of transacting asset to the contract from user
    // NOTE: will wrap any native asset transferred to wrapped-native automatically
    (, uint256 _amount) = AssetLogic.handleIncomingAsset(
      _args.transactingAssetId,
      _args.amount,
      _args.relayerFee,
      wrapper
    );

    // swap to the local asset from adopted
    (uint256 _bridgedAmt, address _bridged) = ConnextUtils.swapToLocalAssetIfNeeded(
      _canonical,
      adoptedToLocalPools[_canonical.id],
      tokenRegistry,
      _transactingAssetId,
      _amount
    );

    // Store the relayer fee
    relayerFees[_transferId] = _args.relayerFee;

    // send message over nomad
    bytes memory _message = _sendMessage(
      _args.params.destinationDomain,
      _bridged,
      _args.params.to,
      _transferId,
      _bridgedAmt
    );

    // emit event
    emit XCalled(
      _transferId,
      _args.params.to,
      _args.params,
      _transactingAssetId, // NOTE: this will switch from input to wrapper if native used
      _bridged,
      _amount,
      _bridgedAmt,
      0, // TODO use _args.relayerFee (stack too deep error)
      nonce - 1,
      _message,
      msg.sender
    );

    return _transferId;
  }

  /**
   * @notice Anyone can call this function on the origin domain to increase the relayer fee for a transfer.
   * @param _transferId - The unique identifier of the crosschain transaction
   */
  function bumpTransfer(bytes32 _transferId) external payable {
    if (msg.value == 0) revert ConnextHandler__bumpTransfer_valueIsZero();

    relayerFees[_transferId] += msg.value;

    emit TransferRelayerFeesUpdated(_transferId, relayerFees[_transferId], msg.sender);
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
    // parse tokenId and action from message
    bytes29 _msg = _message.ref(0).mustBeMessage();
    bytes29 _tokenId = _msg.tokenId();
    bytes29 _action = _msg.action();

    // assert the action is valid
    if (!_action.isTransfer()) {
      revert ConnextHandler__handle_invalidAction();
    }

    // handle the action
    _reconcile(_origin, _tokenId, _action);
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
      revert ConnextHandler__execute_notApprovedRelayer();
    }

    // get token id
    (uint32 _tokenDomain, bytes32 _tokenId) = tokenRegistry.getTokenId(_args.local);

    // get the transferId
    bytes32 _transferId = _getTransferId(
      _args.nonce,
      _args.params,
      _args.originSender,
      _tokenDomain,
      _tokenId,
      _args.amount
    );

    // require this transfer has not already been executed
    // NOTE: in slow liquidity path, the router should *never* be filled
    if (routedTransfers[_transferId].length != 0) {
      revert ConnextHandler__execute_alreadyExecuted();
    }

    // get reconciled record
    bool _reconciled = reconciledTransfers[_transferId];

    // check to see if the transfer was reconciled
    (uint256 _amount, address _adopted) = _handleExecuteLiquidity(_transferId, _args, !_reconciled);

    // Set the relayer for this transaction to allow for future claim
    transferRelayer[_transferId] = msg.sender;

    // execute the the transaction
    if (keccak256(_args.params.callData) == EMPTY) {
      // no call data, send funds to the user
      AssetLogic.transferAssetFromContract(_adopted, _args.params.to, _amount, wrapper);
    } else {
      // execute calldata w/funds
      AssetLogic.transferAssetFromContract(_adopted, address(executor), _amount, wrapper);
      executor.execute(
        _transferId,
        _amount,
        payable(_args.params.to),
        _adopted,
        _reconciled
          ? LibCrossDomainProperty.formatDomainAndSenderBytes(_args.params.originDomain, _args.originSender)
          : LibCrossDomainProperty.EMPTY_BYTES,
        _args.params.callData
      );
    }

    // emit event
    emit Executed(_transferId, _args.params.to, _args, _adopted, _amount, msg.sender);

    return _transferId;
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
    ConnextUtils.initiateClaim(_domain, _recipient, _transferIds, relayerFeeRouter, transferRelayer);

    emit InitiatedClaim(_domain, _recipient, msg.sender, _transferIds);
  }

  /**
   * @notice Pays out a relayer for the given fees
   * @dev Called by the RelayerFeeRouter.handle message. The validity of the transferIds is
   * asserted before dispatching the message.
   * @param _recipient - address on origin chain to send claimed funds to
   * @param _transferIds - transferIds to claim
   */
  function claim(address _recipient, bytes32[] calldata _transferIds) external override onlyRelayerFeeRouter {
    uint256 total = ConnextUtils.claim(_recipient, _transferIds, relayerFees);

    emit Claimed(_recipient, total, _transferIds);
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
    if (!isRouterOwnershipRenounced() && !routerInfo.approvedRouters[_router])
      revert ConnextHandler__addLiquidityForRouter_badRouter();

    // Asset is approved
    if (!isAssetOwnershipRenounced() && !approvedAssets[id]) revert ConnextHandler__addLiquidityForRouter_badAsset();

    // Transfer funds to contract
    (address _asset, uint256 _received) = AssetLogic.handleIncomingAsset(_local, _amount, 0, wrapper);

    // Update the router balances. Happens after pulling funds to account for
    // the fee on transfer tokens
    routerBalances[_router][_asset] += _received;

    // Emit event
    emit LiquidityAdded(_router, _asset, id, _received, msg.sender);
  }

  /**
   * @notice Used to add assets on same chain as contract that can be transferred.
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _adoptedAssetId - The used asset id for this domain (i.e. PoS USDC for
   * polygon)
   */
  function _addAssetId(ConnextMessage.TokenId calldata _canonical, address _adoptedAssetId) internal {
    // Sanity check: needs approval
    if (approvedAssets[_canonical.id]) revert ConnextHandler__addAssetId_alreadyAdded();

    // Update approved assets mapping
    approvedAssets[_canonical.id] = true;

    // Update the adopted mapping
    adoptedToCanonical[_adoptedAssetId] = _canonical;

    // Update the canonical mapping
    address supported = _adoptedAssetId == address(0) ? address(wrapper) : _adoptedAssetId;
    canonicalToAdopted[_canonical.id] = supported;

    // Emit event
    emit AssetAdded(_canonical.id, _canonical.domain, _adoptedAssetId, supported, msg.sender);
  }

  /**
   * @notice Used to add an AMM for adopted <> local assets
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _stableSwap - The address of the amm to add
   */
  function _addStableSwapPool(ConnextMessage.TokenId calldata _canonical, address _stableSwap) internal {
    // Update the pool mapping
    adoptedToLocalPools[_canonical.id] = IStableSwap(_stableSwap);

    emit StableSwapAdded(_canonical.id, _canonical.domain, _stableSwap, msg.sender);
  }

  /**
   * @notice Called via `handle` to manage funds associated with a transaction
   * @dev Will either (a) credit router or (b) make funds available for execution. Don't
   * include execution here
   */
  function _reconcile(
    uint32 _origin,
    bytes29 _tokenId,
    bytes29 _action
  ) internal {
    // load the transferId
    bytes32 _transferId = _action.transferId();

    // ensure the transaction has not been handled
    if (reconciledTransfers[_transferId]) {
      revert ConnextHandler__reconcile_alreadyReconciled();
    }

    // get the token contract for the given tokenId on this chain
    // (if the token is of remote origin and there is
    // no existing representation token contract, the TokenRegistry will
    // deploy a new one)
    address _token = tokenRegistry.ensureLocalToken(_tokenId.domain(), _tokenId.id());

    // load amount once
    uint256 _amount = _action.amnt();

    // NOTE: tokenId + amount must be in plaintext in message so funds can
    // *only* be minted by `handle`. They are still used in the generation of
    // the transferId so routers must provide them correctly to be reimbursed

    // TODO: do we need to keep this
    bytes32 _details = _action.detailsHash();

    // if the token is of remote origin, mint the tokens. will either
    // - be credited to router (fast liquidity)
    // - be reserved for execution (slow liquidity)
    if (!tokenRegistry.isLocalOrigin(_token)) {
      IBridgeToken(_token).mint(address(this), _amount);
      // Tell the token what its detailsHash is
      IBridgeToken(_token).setDetailsHash(_details);
    }
    // NOTE: if the token is of local origin, it means it was escrowed
    // in this contract at xcall

    // mark the transfer as reconciled
    reconciledTransfers[_transferId] = true;

    // get the transfer
    address[] storage _routers = routedTransfers[_transferId];

    uint256 _pathLen = _routers.length;
    if (_pathLen != 0) {
      // fast liquidity path
      // credit the router the asset
      uint256 _routerAmt = _amount / _pathLen;
      for (uint256 i; i < _pathLen; ) {
        routerBalances[_routers[i]][_token] += _routerAmt;
        unchecked {
          i++;
        }
      }
    }

    emit Reconciled(_transferId, _origin, _routers, _token, _amount, msg.sender);
  }

  // TODO: move logic into ConnextUtils
  function _getTransferId(
    uint256 _nonce,
    CallParams calldata _params,
    address _originSender,
    uint32 _tokenDomain,
    bytes32 _tokenId,
    uint256 _amount
  ) internal view returns (bytes32) {
    return keccak256(abi.encode(_nonce, _params, _originSender, _tokenId, _tokenDomain, _amount));
  }

  // TODO: move logic into ConnextUtils
  function _getFastTransferAmount(uint256 _amount) internal view returns (uint256) {
    return (_amount * LIQUIDITY_FEE_NUMERATOR) / LIQUIDITY_FEE_DENOMINATOR;
  }

  // TODO: move into ConnextUtils?
  function _sendMessage(
    uint32 _destination,
    address _asset,
    address _to,
    bytes32 _transferId,
    uint256 _amount
  ) internal returns (bytes memory) {
    // get remote BridgeRouter address; revert if not found
    bytes32 _remote = _mustHaveRemote(_destination);

    // get token
    IBridgeToken _token = IBridgeToken(_asset);

    // declare details
    bytes32 _detailsHash;

    if (tokenRegistry.isLocalOrigin(_asset)) {
      // TODO: do we want to store a mapping of custodied token balances here?

      // token is local, custody token on this chain
      // query token contract for details and calculate detailsHash
      _detailsHash = ConnextMessage.formatDetailsHash(_token.name(), _token.symbol(), _token.decimals());
    } else {
      // if the token originates on a remote chain,
      // burn the representation tokens on this chain
      if (_amount > 0) {
        _token.burn(msg.sender, _amount);
      }
      _detailsHash = _token.detailsHash();
    }

    // format action
    bytes29 _action = ConnextMessage.formatTransfer(
      TypeCasts.addressToBytes32(_to),
      _amount,
      _detailsHash,
      _transferId
    );

    // get the tokenID
    (uint32 _domain, bytes32 _id) = tokenRegistry.getTokenId(_asset);

    // format token id
    bytes29 _tokenId = ConnextMessage.formatTokenId(_domain, _id);

    // send message
    bytes memory _message = ConnextMessage.formatMessage(_tokenId, _action);
    Home(xAppConnectionManager.home()).dispatch(_destination, _remote, _message);

    return _message;
  }

  // TODO: move to ConnextUtils
  function _handleExecuteLiquidity(
    bytes32 _transferId,
    ExecuteArgs calldata _args,
    bool isFast
  ) internal returns (uint256, address) {
    uint256 _pathLen = _args.routers.length;
    if (_pathLen > maxRoutersPerTransfer) revert ConnextHandler__execute_maxRoutersExceeded();

    uint256 _toSwap = _args.amount;
    if (isFast) {
      // this is the fast liquidity path
      // ensure the router is whitelisted

      // calculate amount with fast liquidity fee
      _toSwap = _getFastTransferAmount(_args.amount);

      // TODO: validate routers signature on path / transferId

      // store the routers address
      routedTransfers[_transferId] = _args.routers;

      // for each router, assert they are approved, and deduct liquidity
      uint256 _routerAmount = _toSwap / _pathLen;
      for (uint256 i; i < _pathLen; ) {
        // while theres no way for a router to have sufficient liquidity
        // if they have never been approved, this check ensures they weren't
        // removed from the whitelist
        if (!routerInfo.approvedRouters[_args.routers[i]]) {
          revert ConnextHandler__execute_notSupportedRouter();
        }

        // decrement routers liquidity
        routerBalances[_args.routers[i]][_args.local] -= _routerAmount;

        unchecked {
          i++;
        }
      }
    } else {
      // this is the slow liquidity path

      // save a dummy address for the router to ensure the transfer is not able
      // to be executed twice
      // TODO: better ways to enforce this safety check?
      routedTransfers[_transferId] = [address(1)];
    }

    // TODO: payout relayer fee

    // swap out of mad* asset into adopted asset if needed
    (uint256 _amount, address _adopted) = ConnextUtils.swapFromLocalAssetIfNeeded(
      canonicalToAdopted,
      adoptedToLocalPools,
      tokenRegistry,
      _args.local,
      _toSwap
    );

    return (_amount, _adopted);
  }
}
