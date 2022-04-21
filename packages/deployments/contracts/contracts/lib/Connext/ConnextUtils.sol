// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../../interfaces/IConnext.sol";
import "../../interfaces/IStableSwap.sol";
import "../../interfaces/IWrapped.sol";
import {IExecutor} from "../../interfaces/IExecutor.sol";
import {LibCrossDomainProperty} from "../LibCrossDomainProperty.sol";
import {RouterPermissionsManagerInfo} from "./RouterPermissionsManagerLogic.sol";

import "../../nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import "../../nomad-xapps/contracts/connext/ConnextMessage.sol";
import {TypedMemView} from "../../nomad-core/libs/TypedMemView.sol";
import {TypeCasts} from "../../nomad-core/contracts/XAppConnectionManager.sol";
import {Home} from "../../nomad-core/contracts/Home.sol";

import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

library ConnextUtils {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using ConnextMessage for bytes29;

  bytes32 internal constant EMPTY = hex"c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";

  // ============ Errors ============

  error ConnextUtils__addAssetId_alreadyAdded();
  error ConnextUtils__removeAssetId_notAdded();
  error ConnextUtils__addRelayer_alreadyApproved();
  error ConnextUtils__removeRelayer_notApproved();
  error ConnextUtils__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer();
  error ConnextUtils__reconcile_invalidAction();
  error ConnextUtils__reconcile_alreadyReconciled();
  error ConnextUtils__transferAssetFromContract_notNative();
  error ConnextUtils__transferAssetToContract_notAmount();
  error ConnextUtils__transferAssetToContract_ethWithErcTransfer();
  error ConnextUtils__removeLiquidity_recipientEmpty();
  error ConnextUtils__removeLiquidity_amountIsZero();
  error ConnextUtils__removeLiquidity_insufficientFunds();
  error ConnextUtils__xcall_wrongDomain();
  error ConnextUtils__xcall_emptyTo();
  error ConnextUtils__xcall_notSupportedAsset();
  error ConnextUtils__execute_unapprovedRelayer();
  error ConnextUtils__execute_maxRoutersExceeded();
  error ConnextUtils__execute_alreadyExecuted();
  error ConnextUtils__execute_notSupportedRouter();

  // ============ Structs ============

  struct xCallLibArgs {
    IConnext.XCallArgs xCallArgs;
    IWrapped wrapper;
    uint256 nonce;
    ITokenRegistry tokenRegistry;
    uint256 domain;
    Home home;
    bytes32 remote;
  }

  struct xCalledEventArgs {
    address transactingAssetId;
    uint256 amount;
    uint256 bridgedAmt;
    address bridged;
  }

  struct ExecuteLibArgs {
    IConnext.ExecuteArgs executeArgs;
    uint256 maxRoutersPerTransfer;
    ITokenRegistry tokenRegistry;
    IWrapped wrapper;
    IExecutor executor;
    uint256 LIQUIDITY_FEE_NUMERATOR;
    uint256 LIQUIDITY_FEE_DENOMINATOR;
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
   * @notice Emitted when a router withdraws liquidity from the contract
   * @param router - The router you are removing liquidity from
   * @param to - The address the funds were withdrawn to
   * @param local - The address of the token withdrawn
   * @param amount - The amount of liquidity withdrawn
   * @param caller - The account that called the function
   */
  event LiquidityRemoved(address indexed router, address to, address local, uint256 amount, address caller);

  /**
   * @notice Emitted when `xcall` is called on the origin domain
   */
  event XCalled(
    bytes32 indexed transferId,
    IConnext.CallParams params,
    xCalledEventArgs args,
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
    IConnext.ExecuteArgs args,
    address transactingAsset,
    uint256 transactingAmount,
    address caller
  );

  /**
   * @notice Emitted when a router adds liquidity to the contract
   * @param router - The address of the router the funds were credited to
   * @param local - The address of the token added (all liquidity held in local asset)
   * @param amount - The amount of liquidity added
   * @param caller - The account that called the function
   */
  event LiquidityAdded(address indexed router, address local, bytes32 canonicalId, uint256 amount, address caller);

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
    if (_approvedAssets[_canonical.id]) revert ConnextUtils__addAssetId_alreadyAdded();

    // Update approved assets mapping
    _approvedAssets[_canonical.id] = true;

    // Update the adopted mapping
    _adoptedToCanonical[_adoptedAssetId] = _canonical;

    // Update the canonical mapping
    address supported = _adoptedAssetId == address(0) ? _wrapper : _adoptedAssetId;
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
    if (!_approvedAssets[_canonicalId]) revert ConnextUtils__removeAssetId_notAdded();

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
    if (_approvedRelayers[_relayer]) revert ConnextUtils__addRelayer_alreadyApproved();
    _approvedRelayers[_relayer] = true;

    emit RelayerAdded(_relayer, msg.sender);
  }

  /**
   * @notice Used to remove approved relayer
   * @param _relayer - The relayer address to remove
   */
  function removeRelayer(address _relayer, mapping(address => bool) storage _approvedRelayers) external {
    if (!_approvedRelayers[_relayer]) revert ConnextUtils__removeRelayer_notApproved();
    delete _approvedRelayers[_relayer];

    emit RelayerRemoved(_relayer, msg.sender);
  }

  // ============ Functions ============

  /**
   * @notice Holds the logic to recover the signer from an encoded payload.
   * @dev Will hash and convert to an eth signed message.
   * @param _encoded The payload that was signed
   * @param _sig The signature you are recovering the signer from
   */
  function recoverSignature(bytes memory _encoded, bytes calldata _sig) external pure returns (address) {
    // Recover
    return ECDSAUpgradeable.recover(ECDSAUpgradeable.toEthSignedMessageHash(keccak256(_encoded)), _sig);
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
      revert ConnextUtils__reconcile_invalidAction();
    }

    // load the transferId
    bytes32 transferId = action.transferId();

    // ensure the transaction has not been handled
    if (_reconciledTransfers[transferId]) {
      revert ConnextUtils__reconcile_alreadyReconciled();
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
    if (_recipient == address(0)) revert ConnextUtils__removeLiquidity_recipientEmpty();

    // Sanity check: nonzero amounts
    if (_amount == 0) revert ConnextUtils__removeLiquidity_amountIsZero();

    uint256 routerBalance = _routerBalances[msg.sender][_local];
    // Sanity check: amount can be deducted for the router
    if (routerBalance < _amount) revert ConnextUtils__removeLiquidity_insufficientFunds();

    // Update router balances
    unchecked {
      _routerBalances[msg.sender][_local] = routerBalance - _amount;
    }

    // Transfer from contract to specified to
    _transferAssetFromContract(_local, _recipient, _amount, _wrapper);

    // Emit event
    emit LiquidityRemoved(msg.sender, _recipient, _local, _amount, msg.sender);
  }

  function xcall(
    xCallLibArgs calldata _args,
    mapping(address => ConnextMessage.TokenId) storage _adoptedToCanonical,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools
  ) external returns (bytes32, uint256) {
    _xcallSanityChecks(_args);

    // get the true transacting asset id (using wrapped native instead native)
    (bytes32 transferId, bytes memory message, xCalledEventArgs memory evetArgs) = _processXcall(
      _args,
      _adoptedToCanonical,
      _adoptedToLocalPools
    );

    // emit event
    emit XCalled(transferId, _args.xCallArgs.params, evetArgs, _args.nonce, message, msg.sender);

    return (transferId, _args.nonce + 1);
  }

  /**
   * @notice Called on the destination domain to disburse correct assets to end recipient
   * and execute any included calldata
   * @dev Can be called prior to or after `handle`, depending if fast liquidity is being
   * used.
   */
  function execute(
    ExecuteLibArgs calldata _args,
    mapping(address => bool) storage _approvedRelayers,
    mapping(bytes32 => address[]) storage _routedTransfers,
    mapping(bytes32 => bool) storage _reconciledTransfers,
    mapping(address => mapping(address => uint256)) storage _routerBalances,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools,
    mapping(bytes32 => address) storage canonicalToAdopted,
    RouterPermissionsManagerInfo storage _routerInfo
  ) external returns (bytes32 transferId) {
    // ensure accepted relayer
    if (!_approvedRelayers[msg.sender]) {
      revert ConnextUtils__execute_unapprovedRelayer();
    }

    if (_args.executeArgs.routers.length > _args.maxRoutersPerTransfer)
      revert ConnextUtils__execute_maxRoutersExceeded();

    bytes32 transferId = _getTransferId(_args);

    // require this transfer has not already been executed
    // NOTE: in slow liquidity path, the router should *never* be filled
    if (_routedTransfers[transferId].length != 0) {
      revert ConnextUtils__execute_alreadyExecuted();
    }

    // get reconciled record
    bool reconciled = _reconciledTransfers[transferId];

    // check to see if the transfer was reconciled
    (uint256 amount, address adopted) = _handleExecuteLiquidity(
      transferId,
      !reconciled,
      _args,
      _routedTransfers,
      _routerBalances,
      _adoptedToLocalPools,
      canonicalToAdopted,
      _routerInfo
    );

    // TODO: payout relayer fee

    // execute the transaction
    _handleExecuteTransaction(_args, amount, adopted, transferId, reconciled);

    // emit event
    emit Executed(transferId, _args.executeArgs.params.to, _args.executeArgs, adopted, amount, msg.sender);

    return transferId;
  }

  /**
   * @notice Contains the logic to verify + increment a given routers liquidity
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   * @param _amount - The amount of liquidity to add for the router
   * @param _local - The address of the nomad representation of the asset
   * @param _router - The router you are adding liquidity on behalf of
   */
  function addLiquidityForRouter(
    uint256 _amount,
    address _local,
    address _router,
    mapping(address => mapping(address => uint256)) storage _routerBalances,
    bytes32 _id,
    IWrapped _wrapper
  ) external {
    // Transfer funds to coethWithErcTransferact
    (address asset, uint256 received) = _transferAssetToContract(_local, _amount, _wrapper);

    // Update the router balances. Happens after pulling funds to account for
    // the fee on transfer tokens
    _routerBalances[_router][asset] += received;

    // Emit event
    emit LiquidityAdded(_router, asset, _id, received, msg.sender);
  }

  // ============ Private Functions ============

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
   * @notice Swaps an adopted asset to the local (representation or canonical) nomad asset
   * @dev Will not swap if the asset passed in is the local asset
   * @param _canonical - The canonical token
   * @param _pool - The StableSwap pool
   * @param _tokenRegistry - The local nomad token registry
   * @param _asset - The address of the adopted asset to swap into the local asset
   * @param _amount - The amount of the adopted asset to swap
   * @return The amount of local asset received from swap
   * @return The address of asset received post-swap
   */
  function _swapToLocalAssetIfNeeded(
    ConnextMessage.TokenId memory _canonical,
    IStableSwap _pool,
    ITokenRegistry _tokenRegistry,
    address _asset,
    uint256 _amount
  ) private returns (uint256, address) {
    // Check to see if the asset must be swapped because it is not the local asset
    if (_canonical.id == bytes32(0)) {
      // This is *not* the adopted asset, meaning it must be the local asset
      return (_amount, _asset);
    }

    // Get the local token for this domain (may return canonical or representation)
    address local = _tokenRegistry.getLocalAddress(_canonical.domain, _canonical.id);

    // if theres no amount, no need to swap
    if (_amount == 0) {
      return (_amount, local);
    }

    // Check the case where the adopted asset *is* the local asset
    if (local == _asset) {
      // No need to swap
      return (_amount, _asset);
    }

    // Approve pool
    SafeERC20Upgradeable.safeApprove(IERC20Upgradeable(_asset), address(_pool), _amount);

    // Swap the asset to the proper local asset
    return (_pool.swapExact(_amount, _asset, local), local);
  }

  /**
   * @notice Swaps a local nomad asset for the adopted asset using the stored stable swap
   * @dev Will not swap if the asset passed in is the adopted asset
   * @param _canonicalToAdopted - Mapping of adopted to canonical on this domain
   * @param _adoptedToLocalPools - Mapping holding the AMMs for swapping in and out of local assets
   * @param _tokenRegistry - The local nomad token registry
   * @param _asset - The address of the local asset to swap into the adopted asset
   * @param _amount - The amount of the local asset to swap
   * @return The amount of adopted asset received from swap
   * @return The address of asset received post-swap
   */
  function _swapFromLocalAssetIfNeeded(
    mapping(bytes32 => address) storage _canonicalToAdopted,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools,
    ITokenRegistry _tokenRegistry,
    address _asset,
    uint256 _amount
  ) private returns (uint256, address) {
    // Get the token id
    (, bytes32 id) = _tokenRegistry.getTokenId(_asset);

    // If the adopted asset is the local asset, no need to swap
    address adopted = _canonicalToAdopted[id];
    if (adopted == _asset) {
      return (_amount, _asset);
    }

    // Approve pool
    IStableSwap pool = _adoptedToLocalPools[id];
    SafeERC20Upgradeable.safeApprove(IERC20Upgradeable(_asset), address(pool), _amount);

    // Otherwise, swap to adopted asset
    return (pool.swapExact(_amount, _asset, adopted), adopted);
  }

  /**
   * @notice Performs some sanity checks for `xcall`
   * @dev Need this to prevent stack too deep
   */
  function _xcallSanityChecks(xCallLibArgs calldata _args) private {
    // ensure this is the right domain
    if (_args.xCallArgs.params.originDomain != _args.domain) {
      revert ConnextUtils__xcall_wrongDomain();
    }

    // ensure theres a recipient defined
    if (_args.xCallArgs.params.to == address(0)) {
      revert ConnextUtils__xcall_emptyTo();
    }
  }

  /**
   * @notice Processes an `xcall`
   * @dev Need this to prevent stack too deep
   */
  function _processXcall(
    xCallLibArgs calldata _args,
    mapping(address => ConnextMessage.TokenId) storage _adoptedToCanonical,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools
  )
    private
    returns (
      bytes32,
      bytes memory,
      xCalledEventArgs memory
    )
  {
    address transactingAssetId = _args.xCallArgs.transactingAssetId == address(0)
      ? address(_args.wrapper)
      : _args.xCallArgs.transactingAssetId;

    // check that the asset is supported -- can be either adopted or local
    ConnextMessage.TokenId memory canonical = _adoptedToCanonical[transactingAssetId];
    if (canonical.id == bytes32(0)) {
      revert ConnextUtils__xcall_notSupportedAsset();
    }

    // transfer funds of transacting asset to the contract from user
    // NOTE: will wrap any native asset transferred to wrapped-native automatically
    (, uint256 amount) = _transferAssetToContract(_args);

    // swap to the local asset from adopted
    (uint256 bridgedAmt, address bridged) = _swapToLocalAssetIfNeeded(
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
      xCalledEventArgs({
        transactingAssetId: transactingAssetId,
        amount: amount,
        bridgedAmt: bridgedAmt,
        bridged: bridged
      })
    );
  }

  /**
   * @notice Calculates a transferId base son `execute` arguments
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
   * @notice Calculates a transferId base son `xcall` arguments
   * @dev Need this to prevent stack too deep
   */
  function _getTransferId(xCallLibArgs calldata _args, ConnextMessage.TokenId memory _canonical)
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
    xCallLibArgs calldata _args,
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
      _transferAssetFromContract(_adopted, _args.executeArgs.params.to, _amount, _args.wrapper);
    } else {
      // execute calldata w/funds
      _transferAssetFromContract(_adopted, address(_args.executor), _amount, _args.wrapper);
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
    mapping(bytes32 => address) storage _canonicalToAdopted,
    RouterPermissionsManagerInfo storage _routerInfo
  ) private returns (uint256, address) {
    uint256 toSwap = _args.executeArgs.amount;
    uint256 pathLen = _args.executeArgs.routers.length;
    if (_isFast) {
      // this is the fast liquidity path
      // ensure the router is whitelisted

      // calculate amount with fast liquidity fee
      toSwap = _getFastTransferAmount(
        _args.executeArgs.amount,
        _args.LIQUIDITY_FEE_NUMERATOR,
        _args.LIQUIDITY_FEE_DENOMINATOR
      );

      // TODO: validate routers signature on path / transferId

      // store the routers address
      _routedTransfers[_transferId] = _args.executeArgs.routers;

      // for each router, assert they are approved, and deduct liquidity
      uint256 routerAmount = toSwap / pathLen;
      for (uint256 i; i < pathLen; ) {
        // while theres no way for a router to have sufficient liquidity
        // if they have never been approved, this check ensures they weren't
        // removed from the whitelist
        if (!_routerInfo.approvedRouters[_args.executeArgs.routers[i]]) {
          revert ConnextUtils__execute_notSupportedRouter();
        }

        // decrement routers liquidity
        _routerBalances[_args.executeArgs.routers[i]][_args.executeArgs.local] -= routerAmount;

        unchecked {
          i++;
        }
      }
    } else {
      // this is the slow liquidity path

      // save a dummy address for the router to ensure the transfer is not able
      // to be executed twice
      // TODO: better ways to enforce this safety check?
      _routedTransfers[_transferId] = [address(1)];
    }

    // TODO: payout relayer fee

    // swap out of mad* asset into adopted asset if needed
    return _swapFromLocalAssetIfNeeded(
      _canonicalToAdopted,
      _adoptedToLocalPools,
      _args.tokenRegistry,
      _args.executeArgs.local,
      toSwap
    );
  }

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev This overload is used to prevent stack too deep errors
   * @return The amount of the asset that was seen by the contract (may not be the specifiedAmount
   * if the token is a fee-on-transfer token)
   */
  function _transferAssetToContract(xCallLibArgs calldata _args) private returns (address, uint256) {
    return _transferAssetToContract(_args.xCallArgs.transactingAssetId, _args.xCallArgs.amount, _args.wrapper);
  }

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically wrap
   * @param _assetId - The address to transfer
   * @param _specifiedAmount - The specified amount to transfer. May not be the
   * actual amount transferred (i.e. fee on transfer tokens)
   * @param _wrapper - The address of the wrapper for the native asset on this domain
   * @return The assetId of the transferred asset
   * @return The amount of the asset that was seen by the contract (may not be the specifiedAmount
   * if the token is a fee-on-transfer token)
   */
  function _transferAssetToContract(
    address _assetId,
    uint256 _specifiedAmount,
    IWrapped _wrapper
  ) private returns (address, uint256) {
    uint256 trueAmount = _specifiedAmount;
    address transactingAssetId = _assetId;

    if (_assetId == address(0)) {
      // When transferring native asset to the contract, always make sure that the
      // asset is properly wrapped
      if (msg.value != _specifiedAmount) revert ConnextUtils__transferAssetToContract_notAmount();
      _wrapper.deposit{value: _specifiedAmount}();
      transactingAssetId = address(_wrapper);
    } else {
      // Validate correct amounts are transferred
      uint256 starting = IERC20Upgradeable(_assetId).balanceOf(address(this));
      if (msg.value != 0) revert ConnextUtils__transferAssetToContract_ethWithErcTransfer();
      SafeERC20Upgradeable.safeTransferFrom(IERC20Upgradeable(_assetId), msg.sender, address(this), _specifiedAmount);
      // Calculate the *actual* amount that was sent here
      trueAmount = IERC20Upgradeable(_assetId).balanceOf(address(this)) - starting;
    }

    return (transactingAssetId, trueAmount);
  }

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically unwrap
   * @param _assetId - The address to transfer
   * @param _to - The account that will receive the withdrawn funds
   * @param _amount - The amount to withdraw from contract
   * @param _wrapper - The address of the wrapper for the native asset on this domain
   */
  function _transferAssetFromContract(
    address _assetId,
    address _to,
    uint256 _amount,
    IWrapped _wrapper
  ) private {
    // No native assets should ever be stored on this contract
    if (_assetId == address(0)) revert ConnextUtils__transferAssetFromContract_notNative();

    if (_assetId == address(_wrapper)) {
      // If dealing with wrapped assets, make sure they are properly unwrapped
      // before sending from contract
      _wrapper.withdraw(_amount);
      AddressUpgradeable.sendValue(payable(_to), _amount);
    } else {
      // Transfer ERC20 asset
      SafeERC20Upgradeable.safeTransfer(IERC20Upgradeable(_assetId), _to, _amount);
    }
  }
}
