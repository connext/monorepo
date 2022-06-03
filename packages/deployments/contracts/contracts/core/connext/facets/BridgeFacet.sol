// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";
import {TypeCasts} from "../../../nomad-core/contracts/XAppConnectionManager.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

import {ConnextMessage} from "../libraries/ConnextMessage.sol";
import {AssetLogic} from "../libraries/AssetLogic.sol";
import {XCallArgs, ExecuteArgs} from "../libraries/LibConnextStorage.sol";
import {LibCrossDomainProperty} from "../libraries/LibCrossDomainProperty.sol";

import {PromiseRouter} from "../../promise/PromiseRouter.sol";

import {IBridgeToken} from "../interfaces/IBridgeToken.sol";
import {IExecutor} from "../interfaces/IExecutor.sol";
import {IWrapped} from "../interfaces/IWrapped.sol";
import {ISponsorVault} from "../interfaces/ISponsorVault.sol";

contract BridgeFacet is BaseConnextFacet {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using ConnextMessage for bytes29;

  // ========== Structs ===========

  struct XCalledEventArgs {
    address transactingAssetId;
    uint256 amount;
    uint256 bridgedAmt;
    address bridged;
  }

  // ========== Custom Errors ===========

  error BridgeFacet__setPromiseRouter_invalidPromiseRouter();
  error BridgeFacet__setExecutor_invalidExecutor();
  error BridgeFacet__setSponsorVault_invalidSponsorVault();
  error BridgeFacet__xcall_wrongDomain();
  error BridgeFacet__xcall_emptyTo();
  error BridgeFacet__xcall_notSupportedAsset();
  error BridgeFacet__xcall_nonZeroCallbackFeeForCallback();
  error BridgeFacet__xcall_callbackNotAContract();
  error BridgeFacet__reconcile_invalidAction();
  error BridgeFacet__reconcile_alreadyReconciled();
  error BridgeFacet__execute_unapprovedRelayer();
  error BridgeFacet__execute_maxRoutersExceeded();
  error BridgeFacet__execute_notSupportedRouter();
  error BridgeFacet__execute_invalidRouterSignature();
  error BridgeFacet__execute_alreadyExecuted();
  error BridgeFacet__execute_alreadyReconciled();
  error BridgeFacet__execute_notReconciled();
  error BridgeFacet__handleExecuteTransaction_invalidSponsoredAmount();
  error BridgeFacet__bumpTransfer_valueIsZero();

  // ============ Events ============

  /**
   * @notice Emitted when `xcall` is called on the origin domain
   */
  event XCalled(
    bytes32 indexed transferId,
    XCallArgs xcallArgs,
    XCalledEventArgs args,
    uint256 nonce,
    bytes message,
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
    ExecuteArgs args,
    address transactingAsset,
    uint256 transactingAmount,
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
   * @notice Emitted when the sponsorVault variable is updated
   * @param oldSponsorVault - The sponsorVault old value
   * @param newSponsorVault - The sponsorVault new value
   * @param caller - The account that called the function
   */
  event SponsorVaultUpdated(address oldSponsorVault, address newSponsorVault, address caller);

  /**
   * @notice Emitted when the promiseRouter variable is updated
   * @param oldRouter - The promiseRouter old value
   * @param newRouter - The promiseRouter new value
   * @param caller - The account that called the function
   */
  event PromiseRouterUpdated(address oldRouter, address newRouter, address caller);

  /**
   * @notice Emitted when the executor variable is updated
   * @param oldExecutor - The executor old value
   * @param newExecutor - The executor new value
   * @param caller - The account that called the function
   */
  event ExecutorUpdated(address oldExecutor, address newExecutor, address caller);

  // ============ Getters ============

  function relayerFees(bytes32 _transferId) public view returns (uint256) {
    return s.relayerFees[_transferId];
  }

  function routedTransfers(bytes32 _transferId) public view returns (address[] memory) {
    return s.routedTransfers[_transferId];
  }

  function reconciledTransfers(bytes32 _transferId) public view returns (bool) {
    return s.reconciledTransfers[_transferId];
  }

  function domain() public view returns (uint256) {
    return s.domain;
  }

  function executor() public view returns (IExecutor) {
    return s.executor;
  }

  function nonce() public view returns (uint256) {
    return s.nonce;
  }

  function sponsorVault() public view returns (ISponsorVault) {
    return s.sponsorVault;
  }

  function promiseRouter() external view returns (PromiseRouter) {
    return s.promiseRouter;
  }

  // ============ Admin methods ==============

  function setPromiseRouter(address payable _promiseRouter) external onlyOwner {
    address old = address(s.promiseRouter);
    if (old == _promiseRouter || !Address.isContract(_promiseRouter))
      revert BridgeFacet__setPromiseRouter_invalidPromiseRouter();

    s.promiseRouter = PromiseRouter(_promiseRouter);
    emit PromiseRouterUpdated(old, _promiseRouter, msg.sender);
  }

  function setExecutor(address _executor) external onlyOwner {
    address old = address(s.executor);
    if (old == _executor || !Address.isContract(_executor)) revert BridgeFacet__setExecutor_invalidExecutor();

    s.executor = IExecutor(_executor);
    emit ExecutorUpdated(old, _executor, msg.sender);
  }

  function setSponsorVault(address _sponsorVault) external onlyOwner {
    address old = address(s.sponsorVault);
    if (old == _sponsorVault) revert BridgeFacet__setSponsorVault_invalidSponsorVault();

    s.sponsorVault = ISponsorVault(_sponsorVault);
    emit SponsorVaultUpdated(old, _sponsorVault, msg.sender);
  }

  // ============ Public methods ==============

  /**
   * @notice This function is called by a user who is looking to bridge funds
   * @dev This contract must have approval to transfer the adopted assets. They are then swapped to
   * the local nomad assets via the configured AMM and sent over the bridge router.
   * @param _args - The XCallArgs
   * @return The transfer id of the crosschain transfer
   */
  function xcall(XCallArgs calldata _args) external payable whenBridgeNotPaused returns (bytes32) {
    _xcallSanityChecks(_args);

    // get the true transacting asset id (using wrapped native instead native)
    (bytes32 transferId, bytes memory message, XCalledEventArgs memory eventArgs) = _xcallProcess(_args);

    // Store the relayer fee
    s.relayerFees[transferId] = _args.relayerFee;

    // emit event
    emit XCalled(transferId, _args, eventArgs, s.nonce, message, msg.sender);

    s.nonce += 1;

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
  ) external onlyReplica onlyRemoteRouter(_origin, _sender) {
    // handle the action
    _reconcile(_origin, _message);
  }

  /**
   * @notice Called on the destination domain to disburse correct assets to end recipient
   * and execute any included calldata
   * @dev Can be called prior to or after `handle`, depending if fast liquidity is being
   * used.
   */
  function execute(ExecuteArgs calldata _args) external whenBridgeNotPaused returns (bytes32) {
    (bytes32 transferId, bool reconciled) = _executeSanityChecks(_args);

    // execute router liquidity when this is a fast transfer
    (uint256 amount, address adopted) = _handleExecuteLiquidity(transferId, !reconciled, _args);

    // execute the transaction
    _handleExecuteTransaction(_args, amount, adopted, transferId, reconciled);

    // Set the relayer for this transaction to allow for future claim
    s.transferRelayer[transferId] = msg.sender;

    // emit event
    emit Executed(transferId, _args.params.to, _args, adopted, amount, msg.sender);

    return transferId;
  }

  /**

   * @notice Anyone can call this function on the origin domain to increase the relayer fee for a transfer.
   * @param _transferId - The unique identifier of the crosschain transaction
   */
  function bumpTransfer(bytes32 _transferId) external payable whenBridgeNotPaused {
    if (msg.value == 0) revert BridgeFacet__bumpTransfer_valueIsZero();

    s.relayerFees[_transferId] += msg.value;

    emit TransferRelayerFeesUpdated(_transferId, s.relayerFees[_transferId], msg.sender);
  }

  // ============ Private Functions ============

  /**
   * @notice Performs some sanity checks for `xcall`
   * @dev Need this to prevent stack too deep
   */
  function _xcallSanityChecks(XCallArgs calldata _args) internal {
    // ensure this is the right domain
    if (_args.params.originDomain != s.domain) {
      revert BridgeFacet__xcall_wrongDomain();
    }

    // ensure theres a recipient defined
    if (_args.params.to == address(0)) {
      revert BridgeFacet__xcall_emptyTo();
    }

    // ensure callback fee is zero when callback address is empty
    if (_args.params.callback == address(0) && _args.params.callbackFee > 0) {
      revert BridgeFacet__xcall_nonZeroCallbackFeeForCallback();
    }

    // ensure callback is contract if supplied
    if (_args.params.callback != address(0) && !Address.isContract(_args.params.callback)) {
      revert BridgeFacet__xcall_callbackNotAContract();
    }
  }

  /**
   * @notice Processes an `xcall`
   * @dev Need this to prevent stack too deep
   */
  function _xcallProcess(XCallArgs calldata _args)
    internal
    returns (
      bytes32,
      bytes memory,
      XCalledEventArgs memory
    )
  {
    // get remote BridgeRouter address; revert if not found
    bytes32 remote = _mustHaveRemote(_args.params.destinationDomain);

    address transactingAssetId = _args.transactingAssetId == address(0) ? address(s.wrapper) : _args.transactingAssetId;

    // check that the asset is supported -- can be either adopted or local
    ConnextMessage.TokenId memory canonical = s.adoptedToCanonical[transactingAssetId];
    if (canonical.id == bytes32(0)) {
      revert BridgeFacet__xcall_notSupportedAsset();
    }

    // transfer funds of transacting asset to the contract from user
    // NOTE: will wrap any native asset transferred to wrapped-native automatically
    (, uint256 amount) = AssetLogic.handleIncomingAsset(
      _args.transactingAssetId,
      _args.amount,
      _args.relayerFee + _args.params.callbackFee
    );

    // swap to the local asset from adopted
    (uint256 bridgedAmt, address bridged) = AssetLogic.swapToLocalAssetIfNeeded(canonical, transactingAssetId, amount);

    bytes32 transferId = _getTransferId(_args, canonical);

    // Transfer callback fee to PromiseRouter if set
    if (_args.params.callbackFee != 0) {
      s.promiseRouter.initCallbackFee{value: _args.params.callbackFee}(transferId);
    }

    bytes memory message = _formatMessage(_args, bridged, transferId, bridgedAmt);
    s.xAppConnectionManager.home().dispatch(_args.params.destinationDomain, remote, message);

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
   * @notice Calculates a transferId based on `xcall` arguments
   * @dev Need this to prevent stack too deep
   */
  function _getTransferId(XCallArgs calldata _args, ConnextMessage.TokenId memory _canonical)
    private
    view
    returns (bytes32)
  {
    return keccak256(abi.encode(s.nonce, _args.params, msg.sender, _canonical.id, _canonical.domain, _args.amount));
  }

  /**
   * @notice Formats a nomad message generated by `xcall`
   * @dev Need this to prevent stack too deep
   */
  function _formatMessage(
    XCallArgs calldata _args,
    address _asset,
    bytes32 _transferId,
    uint256 _amount
  ) internal returns (bytes memory) {
    // get token
    IBridgeToken token = IBridgeToken(_asset);

    // declare details
    bytes32 detailsHash;

    if (s.tokenRegistry.isLocalOrigin(_asset)) {
      // TODO: do we want to store a mapping of custodied token balances here?

      // token is local, custody token on this chain
      // query token contract for details and calculate detailsHash
      detailsHash = ConnextMessage.formatDetailsHash(token.name(), token.symbol(), token.decimals());
    } else {
      // if the token originates on a remote chain,
      // burn the representation tokens on this chain
      if (_amount > 0) {
        token.burn(address(this), _amount);
      }
      detailsHash = token.detailsHash();
    }

    // format action
    bytes29 action = ConnextMessage.formatTransfer(
      TypeCasts.addressToBytes32(_args.params.to),
      _amount,
      detailsHash,
      _transferId
    );

    // get the tokenID
    (uint32 domain, bytes32 id) = s.tokenRegistry.getTokenId(_asset);

    // format token id
    bytes29 tokenId = ConnextMessage.formatTokenId(domain, id);

    // send message
    return ConnextMessage.formatMessage(tokenId, action);
  }

  /**
   * @notice Called via `handle` to manage funds associated with a transaction
   * @dev Will either (a) credit router or (b) make funds available for execution. Don't
   * include execution here
   */
  function _reconcile(uint32 _origin, bytes memory _message) internal {
    // parse tokenId and action from message
    bytes29 msg_ = _message.ref(0).mustBeMessage();
    bytes29 tokenId = msg_.tokenId();
    bytes29 action = msg_.action();

    // assert the action is valid
    if (!action.isTransfer()) {
      revert BridgeFacet__reconcile_invalidAction();
    }

    // load the transferId
    bytes32 transferId = action.transferId();

    // ensure the transaction has not been handled
    if (s.reconciledTransfers[transferId]) {
      revert BridgeFacet__reconcile_alreadyReconciled();
    }

    // get the token contract for the given tokenId on this chain
    // (if the token is of remote origin and there is
    // no existing representation token contract, the TokenRegistry will
    // deploy a new one)
    address token = s.tokenRegistry.ensureLocalToken(tokenId.domain(), tokenId.id());

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
    if (!s.tokenRegistry.isLocalOrigin(token)) {
      IBridgeToken(token).mint(address(this), amount);
      // Tell the token what its detailsHash is
      IBridgeToken(token).setDetailsHash(details);
    }
    // NOTE: if the token is of local origin, it means it was escrowed
    // in this contract at xcall

    // mark the transfer as reconciled
    s.reconciledTransfers[transferId] = true;

    // get the transfer
    address[] storage routers = s.routedTransfers[transferId];

    uint256 pathLen = routers.length;
    if (pathLen != 0) {
      // fast liquidity path
      // credit the router the asset
      uint256 routerAmt = amount / pathLen;
      for (uint256 i; i < pathLen; ) {
        s.routerBalances[routers[i]][token] += routerAmt;
        unchecked {
          i++;
        }
      }
    }

    emit Reconciled(transferId, _origin, routers, token, amount, msg.sender);
  }

  /**
   * @notice Holds the logic to recover the signer from an encoded payload.
   * @dev Will hash and convert to an eth signed message.
   * @param _signed The hash that was signed
   * @param _sig The signature you are recovering the signer from
   */
  function _recoverSignature(bytes32 _signed, bytes calldata _sig) internal pure returns (address) {
    // Recover
    return ECDSA.recover(ECDSA.toEthSignedMessageHash(_signed), _sig);
  }

  /**
   * @notice Performs some sanity checks for `execute`
   * @dev Need this to prevent stack too deep
   */
  function _executeSanityChecks(ExecuteArgs calldata _args) private returns (bytes32, bool) {
    // If the sender is not approved relayer, revert()
    if (!s.approvedRelayers[msg.sender]) {
      revert BridgeFacet__execute_unapprovedRelayer();
    }

    // get number of facilitating routers
    uint256 pathLength = _args.routers.length;

    // make sure number of routers is valid
    if (pathLength > s.maxRoutersPerTransfer) revert BridgeFacet__execute_maxRoutersExceeded();

    // get transfer id
    bytes32 transferId = _getTransferId(_args);

    // get reconciled record
    bool reconciled = s.reconciledTransfers[transferId];
    if (_args.params.forceSlow && !reconciled) revert BridgeFacet__execute_notReconciled();

    // get the payload the router should have signed
    bytes32 routerHash = keccak256(abi.encode(transferId, pathLength));

    // check the reconciled status is correct
    // (i.e. if there are routers provided, the transfer must *not* be reconciled)
    if (pathLength > 0) // make sure routers are all approved if needed
    {
      if (reconciled) revert BridgeFacet__execute_alreadyReconciled();

      for (uint256 i; i < pathLength; ) {
        if (!_isRouterOwnershipRenounced() && !s.routerPermissionInfo.approvedRouters[_args.routers[i]]) {
          revert BridgeFacet__execute_notSupportedRouter();
        }
        if (_args.routers[i] != _recoverSignature(routerHash, _args.routerSignatures[i])) {
          revert BridgeFacet__execute_invalidRouterSignature();
        }
        unchecked {
          i++;
        }
      }
    } else {
      // otherwise, make sure liquidity delivered
      if (!reconciled) revert BridgeFacet__execute_notReconciled();
    }

    // require this transfer has not already been executed
    if (s.transferRelayer[transferId] != address(0)) {
      revert BridgeFacet__execute_alreadyExecuted();
    }

    return (transferId, reconciled);
  }

  /**
   * @notice Calculates a transferId based on `execute` arguments
   * @dev Need this to prevent stack too deep
   */
  function _getTransferId(ExecuteArgs calldata _args) private view returns (bytes32) {
    (uint32 tokenDomain, bytes32 tokenId) = s.tokenRegistry.getTokenId(_args.local);

    return keccak256(abi.encode(_args.nonce, _args.params, _args.originSender, tokenId, tokenDomain, _args.amount));
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
   * @notice Execute liquidity process used when calling `execute`
   * @dev Need this to prevent stack too deep
   */
  function _handleExecuteLiquidity(
    bytes32 _transferId,
    bool _isFast,
    ExecuteArgs calldata _args
  ) private returns (uint256, address) {
    uint256 toSwap = _args.amount;
    uint256 pathLen = _args.routers.length;
    if (_isFast) {
      // this is the fast liquidity path
      // ensure the router is whitelisted

      // calculate amount with fast liquidity fee
      toSwap = _getFastTransferAmount(_args.amount, s.LIQUIDITY_FEE_NUMERATOR, s.LIQUIDITY_FEE_DENOMINATOR);

      // store the routers address
      s.routedTransfers[_transferId] = _args.routers;

      // for each router, assert they are approved, and deduct liquidity
      uint256 routerAmount = toSwap / pathLen;
      for (uint256 i; i < pathLen; ) {
        // decrement routers liquidity
        s.routerBalances[_args.routers[i]][_args.local] -= routerAmount;

        unchecked {
          i++;
        }
      }
    }

    // if the local asset is specified, exit
    if (_args.params.receiveLocal) {
      return (toSwap, _args.local);
    }

    // swap out of mad* asset into adopted asset if needed
    return AssetLogic.swapFromLocalAssetIfNeeded(_args.local, toSwap);
  }

  /**
   * @notice Process the transfer, and calldata if needed, when calling `execute`
   * @dev Need this to prevent stack too deep
   */
  function _handleExecuteTransaction(
    ExecuteArgs calldata _args,
    uint256 _amount,
    address _adopted,
    bytes32 _transferId,
    bool _reconciled
  ) private {
    // If the domain if sponsored
    if (address(s.sponsorVault) != address(0)) {
      // fast liquidity path
      if (!_reconciled) {
        // Vault will return the amount of the fee they sponsored in the native fee
        // NOTE: some considerations here around fee on transfer tokens and ensuring
        // there are no malicious `Vaults` that do not transfer the correct amount. Should likely do a
        // balance read about it

        uint256 starting = IERC20(_adopted).balanceOf(address(this));
        uint256 sponsored = s.sponsorVault.reimburseLiquidityFees(_adopted, _args.amount, _args.params.to);

        // Validate correct amounts are transferred
        if (IERC20(_adopted).balanceOf(address(this)) != starting + sponsored) {
          revert BridgeFacet__handleExecuteTransaction_invalidSponsoredAmount();
        }

        _amount = _amount + sponsored;
      }

      // Should dust the recipient with the lesser of a vault-defined cap or the converted relayer fee
      // If there is no conversion available (i.e. no oracles for origin domain asset <> dest asset pair),
      // then the vault should just pay out the configured constant
      s.sponsorVault.reimburseRelayerFees(_args.params.originDomain, payable(_args.params.to), _args.relayerFee);
    }

    // execute the the transaction
    if (keccak256(_args.params.callData) == EMPTY) {
      // no call data, send funds to the user
      AssetLogic.transferAssetFromContract(_adopted, _args.params.to, _amount);
    } else {
      // execute calldata w/funds
      AssetLogic.transferAssetFromContract(_adopted, address(s.executor), _amount);
      (bool success, bytes memory returnData) = s.executor.execute(
        IExecutor.ExecutorArgs(
          _transferId,
          _amount,
          _args.params.to,
          _args.params.recovery,
          _adopted,
          _reconciled
            ? LibCrossDomainProperty.formatDomainAndSenderBytes(_args.params.originDomain, _args.originSender)
            : LibCrossDomainProperty.EMPTY_BYTES,
          _args.params.callData
        )
      );

      // If callback address is not zero, send on the PromiseRouter
      if (_args.params.callback != address(0)) {
        s.promiseRouter.send(_args.params.originDomain, _transferId, _args.params.callback, success, returnData);
      }
    }
  }
}
