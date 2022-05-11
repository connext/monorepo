// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {IConnextHandler} from "../../interfaces/IConnextHandler.sol";
import {IStableSwap} from "../../interfaces/IStableSwap.sol";
import {IWrapped} from "../../interfaces/IWrapped.sol";
import {IExecutor} from "../../interfaces/IExecutor.sol";
import {LibCrossDomainProperty} from "../LibCrossDomainProperty.sol";
import {RouterPermissionsManagerInfo} from "./RouterPermissionsManagerLogic.sol";
import {AssetLogic} from "./AssetLogic.sol";

import {RelayerFeeRouter} from "../../nomad-xapps/contracts/relayer-fee-router/RelayerFeeRouter.sol";
import {ITokenRegistry, IBridgeToken} from "../../nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {ConnextMessage} from "../../nomad-xapps/contracts/connext/ConnextMessage.sol";
import {TypedMemView} from "../../nomad-core/libs/TypedMemView.sol";
import {TypeCasts} from "../../nomad-core/contracts/XAppConnectionManager.sol";
import {Home} from "../../nomad-core/contracts/Home.sol";

import {ECDSAUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import {SafeERC20Upgradeable, AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

library ConnextLogic {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using ConnextMessage for bytes29;

  bytes32 internal constant EMPTY = hex"c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";

  // ============ Errors ============

  error ConnextLogic__addAssetId_alreadyAdded();
  error ConnextLogic__removeAssetId_notAdded();
  error ConnextLogic__addRelayer_alreadyApproved();
  error ConnextLogic__removeRelayer_notApproved();
  error ConnextLogic__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer();
  error ConnextLogic__reconcile_invalidAction();
  error ConnextLogic__reconcile_alreadyReconciled();
  error ConnextLogic__removeLiquidity_recipientEmpty();
  error ConnextLogic__removeLiquidity_amountIsZero();
  error ConnextLogic__removeLiquidity_insufficientFunds();
  error ConnextLogic__xcall_wrongDomain();
  error ConnextLogic__xcall_emptyTo();
  error ConnextLogic__xcall_notSupportedAsset();
  error ConnextLogic__xcall_relayerFeeIsZero();
  error ConnextLogic__execute_notReconciled();
  error ConnextLogic__execute_unapprovedRelayer();
  error ConnextLogic__execute_maxRoutersExceeded();
  error ConnextLogic__execute_alreadyExecuted();
  error ConnextLogic__execute_notSupportedRouter();
  error ConnextLogic__execute_invalidRouterSignature();
  error ConnextLogic__initiateClaim_notRelayer(bytes32 transferId);
  error ConnextLogic__bumpTransfer_invalidTransfer();
  error ConnextLogic__bumpTransfer_valueIsZero();

  // ============ Structs ============

  struct XCallLibArgs {
    IConnextHandler.XCallArgs xCallArgs;
    IWrapped wrapper;
    uint256 nonce;
    ITokenRegistry tokenRegistry;
    uint256 domain;
    Home home;
    bytes32 remote;
  }

  struct XCalledEventArgs {
    address transactingAssetId;
    uint256 amount;
    uint256 bridgedAmt;
    address bridged;
  }

  struct ExecuteLibArgs {
    IConnextHandler.ExecuteArgs executeArgs;
    bool isRouterOwnershipRenounced;
    uint256 maxRoutersPerTransfer;
    ITokenRegistry tokenRegistry;
    IWrapped wrapper;
    IExecutor executor;
    uint256 liquidityFeeNumerator;
    uint256 liquidityFeeDenominator;
  }

  // ============ Events ============

  /**
   * @notice Emitted when a new stable-swap AMM is added for the local <> adopted token
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param swapPool - The address of the AMM
   * @param caller - The account that called the function
   */
  event StableSwapAdded(bytes32 canonicalId, uint32 domain, address swapPool, address caller);

  /**
   * @notice Emitted when a new asset is added
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param adoptedAsset - The address of the adopted (user-expected) asset
   * @param supportedAsset - The address of the whitelisted asset. If the native asset is to be whitelisted,
   * the address of the wrapped version will be stored
   * @param caller - The account that called the function
   */
  event AssetAdded(bytes32 canonicalId, uint32 domain, address adoptedAsset, address supportedAsset, address caller);

  /**
   * @notice Emitted when an asset is removed from whitelists
   * @param canonicalId - The canonical identifier of the token removed
   * @param caller - The account that called the function
   */
  event AssetRemoved(bytes32 canonicalId, address caller);

  /**
   * @notice Emitted when a rlayer is added or removed from whitelists
   * @param relayer - The relayer address to be added or removed
   * @param caller - The account that called the function
   */
  event RelayerAdded(address relayer, address caller);

  /**
   * @notice Emitted when a rlayer is added or removed from whitelists
   * @param relayer - The relayer address to be added or removed
   * @param caller - The account that called the function
   */
  event RelayerRemoved(address relayer, address caller);

  /**
   * @notice Emitted when a router withdraws liquidity from the contract
   * @param router - The router you are removing liquidity from
   * @param to - The address the funds were withdrawn to
   * @param local - The address of the token withdrawn
   * @param amount - The amount of liquidity withdrawn
   * @param caller - The account that called the function
   */
  event LiquidityRemoved(address indexed router, address to, address local, uint256 amount, address caller);

  /**
   * @notice Emitted when a router adds liquidity to the contract
   * @param router - The address of the router the funds were credited to
   * @param local - The address of the token added (all liquidity held in local asset)
   * @param amount - The amount of liquidity added
   * @param caller - The account that called the function
   */
  event LiquidityAdded(address indexed router, address local, bytes32 canonicalId, uint256 amount, address caller);

  /**
   * @notice Emitted when the maxRoutersPerTransfer variable is updated
   * @param maxRoutersPerTransfer - The maxRoutersPerTransfer new value
   * @param caller - The account that called the function
   */
  event MaxRoutersPerTransferUpdated(uint256 maxRoutersPerTransfer, address caller);

  /**
   * @notice Emitted when `xcall` is called on the origin domain
   */
  event XCalled(
    bytes32 indexed transferId,
    IConnextHandler.XCallArgs xcallArgs,
    XCalledEventArgs args,
    uint256 nonce,
    bytes message,
    address caller
  );

  /**
   * @notice Emitted when `execute` is called on the destination chain
   * @dev `execute` may be called when providing fast liquidity *or* when processing a reconciled transfer
   * @param transferId - The unique identifier of the crosschain transfer
   * @param to - The CallParams.to provided, created as indexed parameter
   * @param args - The ExecuteArgs provided to the function
   * @param transactingAsset - The asset the to gets or the external call is executed with. Should be the
   * adopted asset on that chain.
   * @param transactingAmount - The amount of transferring asset the to address receives or the external call is
   * executed with
   * @param caller - The account that called the function
   */
  event Executed(
    bytes32 indexed transferId,
    address indexed to,
    IConnextHandler.ExecuteArgs args,
    address transactingAsset,
    uint256 transactingAmount,
    address caller
  );

  /**
   * @notice Emitted when `reconciled` is called by the bridge on the destination domain
   * @param transferId - The unique identifier of the crosschain transaction
   * @param origin - The origin domain of the transfer
   * @param routers - The CallParams.recipient provided, created as indexed parameter
   * @param asset - The asset that was provided by the bridge
   * @param amount - The amount that was provided by the bridge
   * @param caller - The account that called the function
   */
  event Reconciled(
    bytes32 indexed transferId,
    uint32 indexed origin,
    address[] routers,
    address asset,
    uint256 amount,
    address caller
  );

  /**
   * @notice Emitted when `bumpTransfer` is called by an user on the origin domain
   * @param transferId - The unique identifier of the crosschain transaction
   * @param relayerFee - The updated amount of relayer fee in native asset
   * @param caller - The account that called the function
   */
  event TransferRelayerFeesUpdated(bytes32 indexed transferId, uint256 relayerFee, address caller);

  /**
   * @notice Emitted when `initiateClaim` is called on the destination chain
   * @param domain - Domain to claim funds on
   * @param recipient - Address on origin chain to send claimed funds to
   * @param caller - The account that called the function
   * @param transferIds - TransferIds to claim
   */
  event InitiatedClaim(uint32 indexed domain, address indexed recipient, address caller, bytes32[] transferIds);

  /**
   * @notice Emitted when `claim` is called on the origin domain
   * @param recipient - Address on origin chain to send claimed funds to
   * @param total - Total amount claimed
   * @param transferIds - TransferIds to claim
   */
  event Claimed(address indexed recipient, uint256 total, bytes32[] transferIds);

  // ============ Admin Functions ============

  /**
   * @notice Used to add an AMM for adopted <> local assets
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _stableSwap - The address of the amm to add
   */
  function addStableSwapPool(
    ConnextMessage.TokenId calldata _canonical,
    address _stableSwap,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools
  ) external {
    // Update the pool mapping
    _adoptedToLocalPools[_canonical.id] = IStableSwap(_stableSwap);

    emit StableSwapAdded(_canonical.id, _canonical.domain, _stableSwap, msg.sender);
  }

  /**
   * @notice Used to add assets on same chain as contract that can be transferred.
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _adoptedAssetId - The used asset id for this domain (i.e. PoS USDC for
   * polygon)
   */
  function addAssetId(
    ConnextMessage.TokenId calldata _canonical,
    address _adoptedAssetId,
    address _wrapper,
    mapping(bytes32 => bool) storage _approvedAssets,
    mapping(address => ConnextMessage.TokenId) storage _adoptedToCanonical,
    mapping(bytes32 => address) storage _canonicalToAdopted
  ) external {
    // Sanity check: needs approval
    if (_approvedAssets[_canonical.id]) revert ConnextLogic__addAssetId_alreadyAdded();

    // Update approved assets mapping
    _approvedAssets[_canonical.id] = true;

    address supported = _adoptedAssetId == address(0) ? _wrapper : _adoptedAssetId;

    // Update the adopted mapping
    _adoptedToCanonical[supported] = _canonical;

    // Update the canonical mapping
    _canonicalToAdopted[_canonical.id] = supported;

    // Emit event
    emit AssetAdded(_canonical.id, _canonical.domain, _adoptedAssetId, supported, msg.sender);
  }

  /**
   * @notice Used to remove assets from the whitelist
   * @param _canonicalId - Token id to remove
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   */
  function removeAssetId(
    bytes32 _canonicalId,
    address _adoptedAssetId,
    address _wrapper,
    mapping(bytes32 => bool) storage _approvedAssets,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools,
    mapping(address => ConnextMessage.TokenId) storage _adoptedToCanonical
  ) external {
    // Sanity check: already approval
    if (!_approvedAssets[_canonicalId]) revert ConnextLogic__removeAssetId_notAdded();

    // Update mapping
    delete _approvedAssets[_canonicalId];

    // Update pools
    delete _adoptedToLocalPools[_canonicalId];

    // Update adopted mapping
    delete _adoptedToCanonical[_adoptedAssetId == address(0) ? _wrapper : _adoptedAssetId];

    // Emit event
    emit AssetRemoved(_canonicalId, msg.sender);
  }

  /**
   * @notice Used to add approved relayer
   * @param _relayer - The relayer address to add
   */
  function addRelayer(address _relayer, mapping(address => bool) storage _approvedRelayers) external {
    if (_approvedRelayers[_relayer]) revert ConnextLogic__addRelayer_alreadyApproved();
    _approvedRelayers[_relayer] = true;

    emit RelayerAdded(_relayer, msg.sender);
  }

  /**
   * @notice Used to remove approved relayer
   * @param _relayer - The relayer address to remove
   */
  function removeRelayer(address _relayer, mapping(address => bool) storage _approvedRelayers) external {
    if (!_approvedRelayers[_relayer]) revert ConnextLogic__removeRelayer_notApproved();
    delete _approvedRelayers[_relayer];

    emit RelayerRemoved(_relayer, msg.sender);
  }

  /**
   * @notice Used to set the max amount of routers a payment can be routed through
   * @param _newMax The new max amount of routers
   */
  function setMaxRoutersPerTransfer(uint256 _newMax, uint256 _currentMax) external {
    if (_newMax == 0 || _newMax == _currentMax)
      revert ConnextLogic__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer();

    emit MaxRoutersPerTransferUpdated(_newMax, msg.sender);
  }

  // ============ Functions ============

  /**
   * @notice Contains the logic to verify + increment a given routers liquidity
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   * @param _amount - The amount of liquidity to add for the router
   * @param _local - The address of the nomad representation of the asset
   * @param _router - The router you are adding liquidity on behalf of
   * @param _canonicalId - Canonical asset id from the representation
   */
  function addLiquidityForRouter(
    uint256 _amount,
    address _local,
    address _router,
    mapping(address => mapping(address => uint256)) storage _routerBalances,
    bytes32 _canonicalId,
    IWrapped _wrapper
  ) external {
    // Transfer funds to contract
    (address asset, uint256 received) = AssetLogic.handleIncomingAsset(_local, _amount, 0, _wrapper);

    // Update the router balances. Happens after pulling funds to account for
    // the fee on transfer tokens
    _routerBalances[_router][asset] += received;

    // Emit event
    emit LiquidityAdded(_router, asset, _canonicalId, received, msg.sender);
  }

  /**
   * @notice This is used by any router to decrease their available liquidity for a given asset.
   * @param _amount - The amount of liquidity to remove for the router
   * @param _local - The address of the asset you're removing liquidity from. If removing liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   * @param _recipient The address that will receive the liquidity being removed
   */
  function removeLiquidity(
    uint256 _amount,
    address _local,
    address _recipient,
    mapping(address => mapping(address => uint256)) storage _routerBalances,
    IWrapped _wrapper
  ) external {
    // Sanity check: to is sensible
    if (_recipient == address(0)) revert ConnextLogic__removeLiquidity_recipientEmpty();

    // Sanity check: nonzero amounts
    if (_amount == 0) revert ConnextLogic__removeLiquidity_amountIsZero();

    uint256 routerBalance = _routerBalances[msg.sender][_local];
    // Sanity check: amount can be deducted for the router
    if (routerBalance < _amount) revert ConnextLogic__removeLiquidity_insufficientFunds();

    // Update router balances
    unchecked {
      _routerBalances[msg.sender][_local] = routerBalance - _amount;
    }

    // Transfer from contract to specified to
    AssetLogic.transferAssetFromContract(_local, _recipient, _amount, _wrapper);

    // Emit event
    emit LiquidityRemoved(msg.sender, _recipient, _local, _amount, msg.sender);
  }

  /**
   * @notice This function is called ConnextHandler when a user who is looking to bridge funds
   * @param _args - The XCallArgs
   * @param _adoptedToCanonical - Mapping of canonical to adopted assets on this domain
   * @param _adoptedToLocalPools - Mapping holding the AMMs for swapping in and out of local assets
   * @param _relayerFees - Mapping of relayer fee for a transfer
   * @return The transfer id of the crosschain transfer
   */
  function xcall(
    XCallLibArgs calldata _args,
    mapping(address => ConnextMessage.TokenId) storage _adoptedToCanonical,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools,
    mapping(bytes32 => uint256) storage _relayerFees
  ) external returns (bytes32, uint256) {
    _xcallSanityChecks(_args);

    // get the true transacting asset id (using wrapped native instead native)
    (bytes32 transferId, bytes memory message, XCalledEventArgs memory eventArgs) = _xcallProcess(
      _args,
      _adoptedToCanonical,
      _adoptedToLocalPools
    );

    // Store the relayer fee
    _relayerFees[transferId] = _args.xCallArgs.relayerFee;

    // emit event
    emit XCalled(transferId, _args.xCallArgs, eventArgs, _args.nonce, message, msg.sender);

    return (transferId, _args.nonce + 1);
  }

  /**
   * @notice Called via `handle` to manage funds associated with a transaction
   * @dev Will either (a) credit router or (b) make funds available for execution. Don't
   * include execution here
   */
  function reconcile(
    uint32 _origin,
    bytes memory _message,
    mapping(bytes32 => bool) storage _reconciledTransfers,
    ITokenRegistry _tokenRegistry,
    mapping(bytes32 => address[]) storage _routedTransfers,
    mapping(address => mapping(address => uint256)) storage _routerBalances
  ) external {
    // parse tokenId and action from message
    bytes29 msg_ = _message.ref(0).mustBeMessage();
    bytes29 tokenId = msg_.tokenId();
    bytes29 action = msg_.action();

    // assert the action is valid
    if (!action.isTransfer()) {
      revert ConnextLogic__reconcile_invalidAction();
    }

    // load the transferId
    bytes32 transferId = action.transferId();

    // ensure the transaction has not been handled
    if (_reconciledTransfers[transferId]) {
      revert ConnextLogic__reconcile_alreadyReconciled();
    }

    // get the token contract for the given tokenId on this chain
    // (if the token is of remote origin and there is
    // no existing representation token contract, the TokenRegistry will
    // deploy a new one)
    address token = _tokenRegistry.ensureLocalToken(tokenId.domain(), tokenId.id());

    // load amount once
    uint256 amount = action.amnt();

    // NOTE: tokenId + amount must be in plaintext in message so funds can
    // *only* be minted by `handle`. They are still used in the generation of
    // the transferId so routers must provide them correctly to be reimbursed

    // TODO: do we need to keep this
    bytes32 details = action.detailsHash();

    // if the token is of remote origin, mint the tokens. will either
    // - be credited to router (fast liquidity)
    // - be reserved for execution (slow liquidity)
    if (!_tokenRegistry.isLocalOrigin(token)) {
      IBridgeToken(token).mint(address(this), amount);
      // Tell the token what its detailsHash is
      IBridgeToken(token).setDetailsHash(details);
    }
    // NOTE: if the token is of local origin, it means it was escrowed
    // in this contract at xcall

    // mark the transfer as reconciled
    _reconciledTransfers[transferId] = true;

    // get the transfer
    address[] storage routers = _routedTransfers[transferId];

    uint256 pathLen = routers.length;
    if (pathLen != 0) {
      // fast liquidity path
      // credit the router the asset
      uint256 routerAmt = amount / pathLen;
      for (uint256 i; i < pathLen; ) {
        _routerBalances[routers[i]][token] += routerAmt;
        unchecked {
          i++;
        }
      }
    }

    emit Reconciled(transferId, _origin, routers, token, amount, msg.sender);
  }

  /**
   * @notice Called on the destination domain to disburse correct assets to end recipient
   * and execute any included calldata
   * @dev Can be called prior to or after `handle`, depending if fast liquidity is being
   * used.
   */
  function execute(
    ExecuteLibArgs calldata _args,
    mapping(bytes32 => address[]) storage _routedTransfers,
    mapping(bytes32 => bool) storage _reconciledTransfers,
    mapping(address => mapping(address => uint256)) storage _routerBalances,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools,
    mapping(bytes32 => address) storage _canonicalToAdopted,
    RouterPermissionsManagerInfo storage _routerInfo,
    mapping(bytes32 => address) storage _transferRelayer
  ) external returns (bytes32) {
    (bytes32 transferId, bool reconciled) = _executeSanityChecks(
      _args,
      _transferRelayer,
      _reconciledTransfers,
      _routerInfo.approvedRouters
    );

    // if this is a fast transfer, debit router liquidity. in both the
    // fast and slow cases the asset should be swapped into the adopted
    // asset
    (uint256 amount, address adopted) = _handleExecuteLiquidity(
      transferId,
      !reconciled,
      _args,
      _routedTransfers,
      _routerBalances,
      _adoptedToLocalPools,
      _canonicalToAdopted
    );

    // execute the transaction
    _handleExecuteTransaction(_args, amount, adopted, transferId, reconciled);

    // Set the relayer for this transaction to allow for future claim
    _transferRelayer[transferId] = msg.sender;

    // emit event
    emit Executed(transferId, _args.executeArgs.params.to, _args.executeArgs, adopted, amount, msg.sender);

    return transferId;
  }

  /**
   * @notice Called by relayer when they want to claim owed funds on a given domain
   * @dev Domain should be the origin domain of all the transfer ids
   * @param _domain - domain to claim funds on
   * @param _recipient - address on origin chain to send claimed funds to
   * @param _transferIds - transferIds to claim
   * @param _relayerFeeRouter - The local nomad relayer fee router
   * @param _transferRelayer - Mapping of transactionIds to relayer
   */
  function initiateClaim(
    uint32 _domain,
    address _recipient,
    bytes32[] calldata _transferIds,
    RelayerFeeRouter _relayerFeeRouter,
    mapping(bytes32 => address) storage _transferRelayer
  ) external {
    // Ensure the relayer can claim all transfers specified
    for (uint256 i; i < _transferIds.length; ) {
      if (_transferRelayer[_transferIds[i]] != msg.sender)
        revert ConnextLogic__initiateClaim_notRelayer(_transferIds[i]);
      unchecked {
        i++;
      }
    }

    // Send transferIds via nomad
    _relayerFeeRouter.send(_domain, _recipient, _transferIds);

    emit InitiatedClaim(_domain, _recipient, msg.sender, _transferIds);
  }

  /**
   * @notice Pays out a relayer for the given fees
   * @dev Called by the RelayerFeeRouter.handle message. The validity of the transferIds is
   * asserted before dispatching the message.
   * @param _recipient - address on origin chain to send claimed funds to
   * @param _transferIds - transferIds to claim
   * @param _relayerFees - Mapping of transactionIds to fee
   */
  function claim(
    address _recipient,
    bytes32[] calldata _transferIds,
    mapping(bytes32 => uint256) storage _relayerFees
  ) external {
    // Tally amounts owed
    uint256 total;
    for (uint256 i; i < _transferIds.length; ) {
      total += _relayerFees[_transferIds[i]];
      _relayerFees[_transferIds[i]] = 0;
      unchecked {
        i++;
      }
    }

    AddressUpgradeable.sendValue(payable(_recipient), total);

    emit Claimed(_recipient, total, _transferIds);
  }

  /**
   * @notice Anyone can call this function on the origin domain to increase the relayer fee for a transfer.
   * @param _transferId - The unique identifier of the crosschain transaction
   */
  function bumpTransfer(bytes32 _transferId, mapping(bytes32 => uint256) storage relayerFees) external {
    if (msg.value == 0) revert ConnextLogic__bumpTransfer_valueIsZero();

    relayerFees[_transferId] += msg.value;

    emit TransferRelayerFeesUpdated(_transferId, relayerFees[_transferId], msg.sender);
  }

  // ============ Private Functions ============

  /**
   * @notice Performs some sanity checks for `execute`
   * @dev Need this to prevent stack too deep
   */
  function _executeSanityChecks(
    ExecuteLibArgs calldata _args,
    mapping(bytes32 => address) storage _transferRelayer,
    mapping(bytes32 => bool) storage _reconciledTransfers,
    mapping(address => bool) storage _approvedRouters
  ) private returns (bytes32, bool) {
    // get number of facilitating routers
    uint256 pathLength = _args.executeArgs.routers.length;

    // make sure number of routers is valid
    if (pathLength > _args.maxRoutersPerTransfer) revert ConnextLogic__execute_maxRoutersExceeded();

    // get transfer id
    bytes32 transferId = _getTransferId(_args);

    // get reconciled record
    bool reconciled = _reconciledTransfers[transferId];
    if (_args.executeArgs.params.forceSlow && !reconciled) revert ConnextLogic__execute_notReconciled();

    // get the payload the router should have signed
    bytes32 routerHash = keccak256(abi.encode(transferId, pathLength));

    // make sure routers are all approved if needed
    for (uint256 i; i < pathLength; ) {
      if (!_args.isRouterOwnershipRenounced && !_approvedRouters[_args.executeArgs.routers[i]]) {
        revert ConnextLogic__execute_notSupportedRouter();
      }
      if (_args.executeArgs.routers[i] != _recoverSignature(routerHash, _args.executeArgs.routerSignatures[i])) {
        revert ConnextLogic__execute_invalidRouterSignature();
      }
      unchecked {
        i++;
      }
    }

    // require this transfer has not already been executed
    if (_transferRelayer[transferId] != address(0)) {
      revert ConnextLogic__execute_alreadyExecuted();
    }

    return (transferId, reconciled);
  }

  /**
   * @notice Calculates fast transfer amount.
   * @param _amount Transfer amount
   * @param _liquidityFeeNum Liquidity fee numerator
   * @param _liquidityFeeDen Liquidity fee denominator
   */
  function _getFastTransferAmount(
    uint256 _amount,
    uint256 _liquidityFeeNum,
    uint256 _liquidityFeeDen
  ) private pure returns (uint256) {
    return (_amount * _liquidityFeeNum) / _liquidityFeeDen;
  }

  /**
   * @notice Performs some sanity checks for `xcall`
   * @dev Need this to prevent stack too deep
   */
  function _xcallSanityChecks(XCallLibArgs calldata _args) private {
    // ensure this is the right domain
    if (_args.xCallArgs.params.originDomain != _args.domain) {
      revert ConnextLogic__xcall_wrongDomain();
    }

    // ensure theres a recipient defined
    if (_args.xCallArgs.params.to == address(0)) {
      revert ConnextLogic__xcall_emptyTo();
    }
  }

  /**
   * @notice Processes an `xcall`
   * @dev Need this to prevent stack too deep
   */
  function _xcallProcess(
    XCallLibArgs calldata _args,
    mapping(address => ConnextMessage.TokenId) storage _adoptedToCanonical,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools
  )
    private
    returns (
      bytes32,
      bytes memory,
      XCalledEventArgs memory
    )
  {
    address transactingAssetId = _args.xCallArgs.transactingAssetId == address(0)
      ? address(_args.wrapper)
      : _args.xCallArgs.transactingAssetId;

    // check that the asset is supported -- can be either adopted or local
    ConnextMessage.TokenId memory canonical = _adoptedToCanonical[transactingAssetId];
    if (canonical.id == bytes32(0)) {
      revert ConnextLogic__xcall_notSupportedAsset();
    }

    // transfer funds of transacting asset to the contract from user
    // NOTE: will wrap any native asset transferred to wrapped-native automatically
    (, uint256 amount) = AssetLogic.handleIncomingAsset(
      _args.xCallArgs.transactingAssetId,
      _args.xCallArgs.amount,
      _args.xCallArgs.relayerFee,
      _args.wrapper
    );

    // swap to the local asset from adopted
    (uint256 bridgedAmt, address bridged) = AssetLogic.swapToLocalAssetIfNeeded(
      canonical,
      _adoptedToLocalPools[canonical.id],
      _args.tokenRegistry,
      transactingAssetId,
      amount
    );

    bytes32 transferId = _getTransferId(_args, canonical);

    bytes memory message = _formatMessage(_args, bridged, transferId, bridgedAmt);
    _args.home.dispatch(_args.xCallArgs.params.destinationDomain, _args.remote, message);

    return (
      transferId,
      message,
      XCalledEventArgs({
        transactingAssetId: transactingAssetId,
        amount: amount,
        bridgedAmt: bridgedAmt,
        bridged: bridged
      })
    );
  }

  /**
   * @notice Calculates a transferId based on `execute` arguments
   * @dev Need this to prevent stack too deep
   */
  function _getTransferId(ExecuteLibArgs calldata _args) private view returns (bytes32) {
    (uint32 tokenDomain, bytes32 tokenId) = _args.tokenRegistry.getTokenId(_args.executeArgs.local);

    return
      keccak256(
        abi.encode(
          _args.executeArgs.nonce,
          _args.executeArgs.params,
          _args.executeArgs.originSender,
          tokenId,
          tokenDomain,
          _args.executeArgs.amount
        )
      );
  }

  /**
   * @notice Calculates a transferId based on `xcall` arguments
   * @dev Need this to prevent stack too deep
   */
  function _getTransferId(XCallLibArgs calldata _args, ConnextMessage.TokenId memory _canonical)
    private
    view
    returns (bytes32)
  {
    return
      keccak256(
        abi.encode(
          _args.nonce,
          _args.xCallArgs.params,
          msg.sender,
          _canonical.id,
          _canonical.domain,
          _args.xCallArgs.amount
        )
      );
  }

  /**
   * @notice Formats a nomad message generated by `xcall`
   * @dev Need this to prevent stack too deep
   */
  function _formatMessage(
    XCallLibArgs calldata _args,
    address _asset,
    bytes32 _transferId,
    uint256 _amount
  ) private returns (bytes memory) {
    // get token
    IBridgeToken token = IBridgeToken(_asset);

    // declare details
    bytes32 detailsHash;

    if (_args.tokenRegistry.isLocalOrigin(_asset)) {
      // TODO: do we want to store a mapping of custodied token balances here?

      // token is local, custody token on this chain
      // query token contract for details and calculate detailsHash
      detailsHash = ConnextMessage.formatDetailsHash(token.name(), token.symbol(), token.decimals());
    } else {
      // if the token originates on a remote chain,
      // burn the representation tokens on this chain
      if (_amount > 0) {
        token.burn(msg.sender, _amount);
      }
      detailsHash = token.detailsHash();
    }

    // format action
    bytes29 action = ConnextMessage.formatTransfer(
      TypeCasts.addressToBytes32(_args.xCallArgs.params.to),
      _amount,
      detailsHash,
      _transferId
    );

    // get the tokenID
    (uint32 domain, bytes32 id) = _args.tokenRegistry.getTokenId(_asset);

    // format token id
    bytes29 tokenId = ConnextMessage.formatTokenId(domain, id);

    // send message
    return ConnextMessage.formatMessage(tokenId, action);
  }

  /**
   * @notice Process the transfer, and calldata if needed, when calling `execute`
   * @dev Need this to prevent stack too deep
   */
  function _handleExecuteTransaction(
    ExecuteLibArgs calldata _args,
    uint256 _amount,
    address _adopted,
    bytes32 _transferId,
    bool _reconciled
  ) private {
    // execute the the transaction
    if (keccak256(_args.executeArgs.params.callData) == EMPTY) {
      // no call data, send funds to the user
      AssetLogic.transferAssetFromContract(_adopted, _args.executeArgs.params.to, _amount, _args.wrapper);
    } else {
      // execute calldata w/funds
      AssetLogic.transferAssetFromContract(_adopted, address(_args.executor), _amount, _args.wrapper);
      _args.executor.execute(
        _transferId,
        _amount,
        payable(_args.executeArgs.params.to),
        _adopted,
        _reconciled
          ? LibCrossDomainProperty.formatDomainAndSenderBytes(
            _args.executeArgs.params.originDomain,
            _args.executeArgs.originSender
          )
          : LibCrossDomainProperty.EMPTY_BYTES,
        _args.executeArgs.params.callData
      );
    }
  }

  /**
   * @notice Execute liquidity process used when calling `execute`
   * @dev Need this to prevent stack too deep
   */
  function _handleExecuteLiquidity(
    bytes32 _transferId,
    bool _isFast,
    ExecuteLibArgs calldata _args,
    mapping(bytes32 => address[]) storage _routedTransfers,
    mapping(address => mapping(address => uint256)) storage _routerBalances,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools,
    mapping(bytes32 => address) storage _canonicalToAdopted
  ) private returns (uint256, address) {
    uint256 toSwap = _args.executeArgs.amount;
    uint256 pathLen = _args.executeArgs.routers.length;
    if (_isFast) {
      // this is the fast liquidity path
      // ensure the router is whitelisted

      // calculate amount with fast liquidity fee
      toSwap = _getFastTransferAmount(
        _args.executeArgs.amount,
        _args.liquidityFeeNumerator,
        _args.liquidityFeeDenominator
      );

      // store the routers address
      _routedTransfers[_transferId] = _args.executeArgs.routers;

      // for each router, assert they are approved, and deduct liquidity
      uint256 routerAmount = toSwap / pathLen;
      for (uint256 i; i < pathLen; ) {
        // decrement routers liquidity
        _routerBalances[_args.executeArgs.routers[i]][_args.executeArgs.local] -= routerAmount;

        unchecked {
          i++;
        }
      }
    }

    // if the local asset is specified, exit
    if (_args.executeArgs.params.receiveLocal) {
      return (toSwap, _args.executeArgs.local);
    }

    // swap out of mad* asset into adopted asset if needed
    return
      AssetLogic.swapFromLocalAssetIfNeeded(
        _canonicalToAdopted,
        _adoptedToLocalPools,
        _args.tokenRegistry,
        _args.executeArgs.local,
        toSwap
      );
  }

  /**
   * @notice Holds the logic to recover the signer from an encoded payload.
   * @dev Will hash and convert to an eth signed message.
   * @param _signed The hash that was signed
   * @param _sig The signature you are recovering the signer from
   */
  function _recoverSignature(bytes32 _signed, bytes calldata _sig) internal pure returns (address) {
    // Recover
    return ECDSAUpgradeable.recover(ECDSAUpgradeable.toEthSignedMessageHash(_signed), _sig);
  }
}
