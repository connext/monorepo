// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../../interfaces/IConnext.sol";
import "../../interfaces/IStableSwap.sol";
import "../../interfaces/IWrapped.sol";

import "../../nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import "../../nomad-xapps/contracts/connext/ConnextMessage.sol";
import {TypedMemView} from "../../nomad-core/libs/TypedMemView.sol";
import {TypeCasts} from "../../nomad-core/contracts/XAppConnectionManager.sol";
import {Home} from "../../nomad-core/contracts/Home.sol";

import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

library ConnextUtils {
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using ConnextMessage for bytes29;

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
   * @notice Emitted when the maxRoutersPerTransfer variable is updated
   * @param maxRoutersPerTransfer - The maxRoutersPerTransfer new value
   * @param caller - The account that called the function
   */
  event MaxRoutersPerTransferUpdated(uint256 maxRoutersPerTransfer, address caller);

  /**
  //  * @notice Emitted when `reconciled` is called by the bridge on the destination domain
   * @param transferId - The unique identifier of the crosschain transaction
   * @param origin - The origin domain of the transfer
   * @param routers - The CallParams.recipient provided, created as indexed parameter
   * @param asset - The asset that was provided by the bridge
   * @param amount - The amount that was provided by the bridge
   * @param caller - The account that called the function
   */
  // TODO: make `routers` indexed?
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

  // ============ Admin Functions ============

  /**
   * @notice Used to add an AMM for adopted <> local assets
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _stableSwap - The address of the amm to add
   */
  function addStableSwapPool(
    ConnextMessage.TokenId calldata _canonical,
    address _stableSwap,
    mapping(bytes32 => IStableSwap) storage adoptedToLocalPools
  ) external {
    // Update the pool mapping
    adoptedToLocalPools[_canonical.id] = IStableSwap(_stableSwap);

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
    address wrapper,
    mapping(bytes32 => bool) storage approvedAssets,
    mapping(address => ConnextMessage.TokenId) storage adoptedToCanonical,
    mapping(bytes32 => address) storage canonicalToAdopted
  ) external {
    // Sanity check: needs approval
    if (approvedAssets[_canonical.id]) revert ConnextUtils__addAssetId_alreadyAdded();

    // Update approved assets mapping
    approvedAssets[_canonical.id] = true;

    // Update the adopted mapping
    adoptedToCanonical[_adoptedAssetId] = _canonical;

    // Update the canonical mapping
    address supported = _adoptedAssetId == address(0) ? wrapper : _adoptedAssetId;
    canonicalToAdopted[_canonical.id] = supported;

    // Emit event
    emit AssetAdded(_canonical.id, _canonical.domain, _adoptedAssetId, supported, msg.sender);
  }

  /**
   * @notice Used to remove assets from the whitelist
   * @param canonicalId - Token id to remove
   * @param adoptedAssetId - Corresponding adopted asset to remove
   */
  function removeAssetId(
    bytes32 canonicalId,
    address adoptedAssetId,
    address wrapper,
    mapping(bytes32 => bool) storage approvedAssets,
    mapping(bytes32 => IStableSwap) storage adoptedToLocalPools,
    mapping(address => ConnextMessage.TokenId) storage adoptedToCanonical
  ) external {
    // Sanity check: already approval
    if (!approvedAssets[canonicalId]) revert ConnextUtils__removeAssetId_notAdded();

    // Update mapping
    delete approvedAssets[canonicalId];

    // Update pools
    delete adoptedToLocalPools[canonicalId];

    // Update adopted mapping
    delete adoptedToCanonical[adoptedAssetId == address(0) ? wrapper : adoptedAssetId];

    // Emit event
    emit AssetRemoved(canonicalId, msg.sender);
  }

  /**
   * @notice Used to add approved relayer
   * @param relayer - The relayer address to add
   */
  function addRelayer(address relayer, mapping(address => bool) storage approvedRelayers) external {
    if (approvedRelayers[relayer]) revert ConnextUtils__addRelayer_alreadyApproved();
    approvedRelayers[relayer] = true;

    emit RelayerAdded(relayer, msg.sender);
  }

  /**
   * @notice Used to remove approved relayer
   * @param relayer - The relayer address to remove
   */
  function removeRelayer(address relayer, mapping(address => bool) storage approvedRelayers) external {
    if (!approvedRelayers[relayer]) revert ConnextUtils__removeRelayer_notApproved();
    delete approvedRelayers[relayer];

    emit RelayerRemoved(relayer, msg.sender);
  }

  /**
   * @notice Used to set the max amount of routers a payment can be routed through
   * @param newMaxRouters The new max amount of routers
   */
  // TODO - Does this work? maxRoutersPerTransfer is storage in ConnextUtils, Does it get updated?
  function setMaxRoutersPerTransfer(uint256 newMaxRouters, uint256 maxRoutersPerTransfer) external {
    if (newMaxRouters == 0 || newMaxRouters == maxRoutersPerTransfer)
      revert ConnextUtils__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer();

    maxRoutersPerTransfer = newMaxRouters;

    emit MaxRoutersPerTransferUpdated(newMaxRouters, msg.sender);
  }

  /**
   * @notice Gets unique identifier from nonce + domain
   * @param _nonce - The nonce of the contract
   * @param _params - The call params of the transfer
   * @param _originSender - TODO
   * @param _tokenDomain - TODO
   * @param _tokenId - TODO
   * @param _amount - TODO
   * @return The transfer id
   */
  // TODO - Remove this function?
  function getTransferId(
    uint256 _nonce,
    IConnext.CallParams calldata _params,
    address _originSender,
    uint32 _tokenDomain,
    bytes32 _tokenId,
    uint256 _amount
  ) public pure returns (bytes32) {
    return keccak256(abi.encode(_nonce, _params, _originSender, _tokenId, _tokenDomain, _amount));
  }

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

  function getFastTransferAmount(
    uint256 _amount,
    uint256 _liquidityFeeNum,
    uint256 _liquidityFeeDen
  ) external pure returns (uint256) {
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
  // TODO - Make this private?
  function swapToLocalAssetIfNeeded(
    ConnextMessage.TokenId memory _canonical,
    IStableSwap _pool,
    ITokenRegistry _tokenRegistry,
    address _asset,
    uint256 _amount
  ) public returns (uint256, address) {
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
  // TODO - Make this private?
  function swapFromLocalAssetIfNeeded(
    mapping(bytes32 => address) storage _canonicalToAdopted,
    mapping(bytes32 => IStableSwap) storage _adoptedToLocalPools,
    ITokenRegistry _tokenRegistry,
    address _asset,
    uint256 _amount
  ) public returns (uint256, address) {
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
   * @notice Called via `handle` to manage funds associated with a transaction
   * @dev Will either (a) credit router or (b) make funds available for execution. Don't
   * include execution here
   */
  function reconcile(
    uint32 _origin,
    bytes memory _message,
    mapping(bytes32 => bool) storage reconciledTransfers,
    ITokenRegistry tokenRegistry,
    mapping(bytes32 => address[]) storage routedTransfers,
    mapping(address => mapping(address => uint256)) storage routerBalances
  ) external {
    // parse tokenId and action from message
    bytes29 _msg = _message.ref(0).mustBeMessage();
    bytes29 _tokenId = _msg.tokenId();
    bytes29 _action = _msg.action();

    // assert the action is valid
    if (!_action.isTransfer()) {
      revert ConnextUtils__reconcile_invalidAction();
    }

    // load the transferId
    bytes32 _transferId = _action.transferId();

    // ensure the transaction has not been handled
    if (reconciledTransfers[_transferId]) {
      revert ConnextUtils__reconcile_alreadyReconciled();
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

  /**
   * @notice This is used by any router to decrease their available liquidity for a given asset.
   * @param amount - The amount of liquidity to remove for the router
   * @param local - The address of the asset you're removing liquidity from. If removing liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   * @param _recipient The address that will receive the liquidity being removed
   */
  function removeLiquidity(
    uint256 amount,
    address local,
    address _recipient,
    mapping(address => mapping(address => uint256)) storage routerBalances,
    IWrapped _wrapper
  ) external {
    // Sanity check: to is sensible
    if (_recipient == address(0)) revert ConnextUtils__removeLiquidity_recipientEmpty();

    // Sanity check: nonzero amounts
    if (amount == 0) revert ConnextUtils__removeLiquidity_amountIsZero();

    uint256 routerBalance = routerBalances[msg.sender][local];
    // Sanity check: amount can be deducted for the router
    if (routerBalance < amount) revert ConnextUtils__removeLiquidity_insufficientFunds();

    // Update router balances
    unchecked {
      routerBalances[msg.sender][local] = routerBalance - amount;
    }

    // Transfer from contract to specified to
    transferAssetFromContract(local, _recipient, amount, _wrapper);

    // Emit event
    emit LiquidityRemoved(msg.sender, _recipient, local, amount, msg.sender);
  }

  // need this to prevent stack too deep
  function xcallSanityChecks(xCallLibArgs calldata _args) private {
    // ensure this is the right domain
    if (_args.xCallArgs.params.originDomain != _args.domain) {
      revert ConnextUtils__xcall_wrongDomain();
    }

    // ensure theres a recipient defined
    if (_args.xCallArgs.params.to == address(0)) {
      revert ConnextUtils__xcall_emptyTo();
    }
  }

  // need this to prevent stack too deep
  function processXcall(
    xCallLibArgs calldata _args,
    mapping(address => ConnextMessage.TokenId) storage adoptedToCanonical,
    mapping(bytes32 => IStableSwap) storage adoptedToLocalPools
  )
    private
    returns (
      bytes32,
      bytes memory,
      xCalledEventArgs memory
    )
  {
    address _transactingAssetId = _args.xCallArgs.transactingAssetId == address(0)
      ? address(_args.wrapper)
      : _args.xCallArgs.transactingAssetId;

    // check that the asset is supported -- can be either adopted or local
    ConnextMessage.TokenId memory _canonical = adoptedToCanonical[_transactingAssetId];
    if (_canonical.id == bytes32(0)) {
      revert ConnextUtils__xcall_notSupportedAsset();
    }

    // transfer funds of transacting asset to the contract from user
    // NOTE: will wrap any native asset transferred to wrapped-native automatically
    (, uint256 _amount) = transferAssetToContract(_args);

    // swap to the local asset from adopted
    (uint256 _bridgedAmt, address _bridged) = swapToLocalAssetIfNeeded(
      _canonical,
      adoptedToLocalPools[_canonical.id],
      _args.tokenRegistry,
      _transactingAssetId,
      _amount
    );

    bytes32 _transferId = getTransferId(_args, _canonical);

    bytes memory _message = formatMessage(_args, _bridged, _transferId, _bridgedAmt);
    _args.home.dispatch(_args.xCallArgs.params.destinationDomain, _args.remote, _message);

    return (
      _transferId,
      _message,
      xCalledEventArgs({
        transactingAssetId: _transactingAssetId,
        amount: _amount,
        bridgedAmt: _bridgedAmt,
        bridged: _bridged
      })
    );
  }

  // need this to prevent stack too deep
  function getTransferId(xCallLibArgs calldata _args, ConnextMessage.TokenId memory _canonical)
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

  function xcall(
    xCallLibArgs calldata _args,
    mapping(address => ConnextMessage.TokenId) storage adoptedToCanonical,
    mapping(bytes32 => IStableSwap) storage adoptedToLocalPools
  ) external returns (bytes32, uint256) {
    xcallSanityChecks(_args);

    // get the true transacting asset id (using wrapped native instead native)
    (bytes32 _transferId, bytes memory _message, xCalledEventArgs memory evetArgs) = processXcall(
      _args,
      adoptedToCanonical,
      adoptedToLocalPools
    );

    // emit event
    emit XCalled(_transferId, _args.xCallArgs.params, evetArgs, _args.nonce, _message, msg.sender);

    return (_transferId, _args.nonce + 1);
  }

  function formatMessage(
    xCallLibArgs calldata _args,
    address _asset,
    bytes32 _transferId,
    uint256 _amount
  ) private returns (bytes memory) {
    // get token
    IBridgeToken _token = IBridgeToken(_asset);

    // declare details
    bytes32 _detailsHash;

    if (_args.tokenRegistry.isLocalOrigin(_asset)) {
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
      TypeCasts.addressToBytes32(_args.xCallArgs.params.to),
      _amount,
      _detailsHash,
      _transferId
    );

    // get the tokenID
    (uint32 _domain, bytes32 _id) = _args.tokenRegistry.getTokenId(_asset);

    // format token id
    bytes29 _tokenId = ConnextMessage.formatTokenId(_domain, _id);

    // send message
    bytes memory _message = ConnextMessage.formatMessage(_tokenId, _action);

    return _message;
  }

  // ============ Assets Functions ============

  function transferAssetToContract(xCallLibArgs calldata _args) private returns (address, uint256) {
    uint256 trueAmount = _args.xCallArgs.amount;
    address transactingAssetId = _args.xCallArgs.transactingAssetId;

    if (_args.xCallArgs.transactingAssetId == address(0)) {
      // When transferring native asset to the contract, always make sure that the
      // asset is properly wrapped
      if (msg.value != _args.xCallArgs.amount) revert ConnextUtils__transferAssetToContract_notAmount();
      _args.wrapper.deposit{value: _args.xCallArgs.amount}();
      transactingAssetId = address(_args.wrapper);
    } else {
      // Validate correct amounts are transferred
      uint256 starting = IERC20Upgradeable(_args.xCallArgs.transactingAssetId).balanceOf(address(this));
      if (msg.value != 0) revert ConnextUtils__transferAssetToContract_ethWithErcTransfer();
      SafeERC20Upgradeable.safeTransferFrom(
        IERC20Upgradeable(_args.xCallArgs.transactingAssetId),
        msg.sender,
        address(this),
        _args.xCallArgs.amount
      );
      // Calculate the *actual* amount that was sent here
      trueAmount = IERC20Upgradeable(_args.xCallArgs.transactingAssetId).balanceOf(address(this)) - starting;
    }

    return (transactingAssetId, trueAmount);
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
  function transferAssetToContract(
    address _assetId,
    uint256 _specifiedAmount,
    IWrapped _wrapper
  ) public returns (address, uint256) {
    uint256 trueAmount = _specifiedAmount;

    if (_assetId == address(0)) {
      // When transferring native asset to the contract, always make sure that the
      // asset is properly wrapped
      if (msg.value != _specifiedAmount) revert ConnextUtils__transferAssetToContract_notAmount();
      _wrapper.deposit{value: _specifiedAmount}();
      _assetId = address(_wrapper);
    } else {
      // Validate correct amounts are transferred
      uint256 starting = IERC20Upgradeable(_assetId).balanceOf(address(this));
      if (msg.value != 0) revert ConnextUtils__transferAssetToContract_ethWithErcTransfer();
      SafeERC20Upgradeable.safeTransferFrom(IERC20Upgradeable(_assetId), msg.sender, address(this), _specifiedAmount);
      // Calculate the *actual* amount that was sent here
      trueAmount = IERC20Upgradeable(_assetId).balanceOf(address(this)) - starting;
    }

    return (_assetId, trueAmount);
  }

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically unwrap
   * @param _assetId - The address to transfer
   * @param _to - The account that will receive the withdrawn funds
   * @param _amount - The amount to withdraw from contract
   * @param _wrapper - The address of the wrapper for the native asset on this domain
   */
  function transferAssetFromContract(
    address _assetId,
    address _to,
    uint256 _amount,
    IWrapped _wrapper
  ) public {
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
