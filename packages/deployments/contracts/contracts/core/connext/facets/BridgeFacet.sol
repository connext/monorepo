// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
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
import {IAavePool} from "../interfaces/IAavePool.sol";
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
  error BridgeFacet__reconcile_noPortalRouter();
  error BridgeFacet__execute_unapprovedRelayer();
  error BridgeFacet__execute_maxRoutersExceeded();
  error BridgeFacet__execute_notSupportedRouter();
  error BridgeFacet__execute_invalidRouterSignature();
  error BridgeFacet__execute_alreadyExecuted();
  error BridgeFacet__execute_notApprovedForPortals();
  error BridgeFacet__execute_alreadyReconciled();
  error BridgeFacet__execute_notReconciled();
  error BridgeFacet__handleExecuteTransaction_invalidSponsoredAmount();
  error BridgeFacet__bumpTransfer_valueIsZero();

  // ============ Properties ============

  uint16 public constant AAVE_REFERRAL_CODE = 0;

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
   * @notice Emitted when a router used Aave Portal liquidity for fast transfer
   * @param transferId - The unique identifier of the crosschain transaction
   * @param router - The authorized router that used Aave Portal liquidity
   * @param asset - The asset that was provided by Aave Portal
   * @param amount - The amount of asset that was provided by Aave Portal
   */
  event AavePortalMintUnbacked(bytes32 indexed transferId, address indexed router, address asset, uint256 amount);

  /**
   * @notice Emitted when executed a Portal repayment
   * @param transferId - The unique identifier of the crosschain transaction
   * @param asset - The asset that was repaid
   * @param amount - The amount that was repaid
   * @param fee - The fee amount that was repaid
   */
  event AavePortalRepayment(bytes32 indexed transferId, address asset, uint256 amount, uint256 fee);

  /**
   * @notice Emitted when there is no enough assets to repay or the repayment failed
   * @param transferId - The unique identifier of the crosschain transaction
   * @param asset - The asset that in which the debt is nominated
   * @param amount - The amount that is pending to be repaid
   * @param fee - The fee amount that is pending to be repaid
   */
  event AavePortalRepaymentDebt(bytes32 indexed transferId, address asset, uint256 amount, uint256 fee);

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
   * @notice Initiates a cross-chain transfer of funds, calldata, and/or various named properties using the nomad
   * network.
   *
   * @dev For ERC20 transfers, this contract must have approval to transfer the input (transacting) assets. The adopted
   * assets will be swapped for their local nomad asset counterparts (i.e. bridgable tokens) via the configured AMM if
   * necessary. In the event that the adopted assets *are* local nomad assets, no swap is needed. The local tokens will
   * then be sent via the bridge router. If the local assets are representational for an asset on another chain, we will
   * burn the tokens here. If the local assets are canonical (meaning that the adopted<>local asset pairing is native
   * to this chain), we will custody the tokens here.
   *
   * For native transfers, the native asset will be wrapped by depositing them to the configured Wrapper contract. Next,
   * the wrapper tokens (e.g. WETH) are swapped for their local nomad asset counterparts via the configured AMM.
   * Those local tokens will then be sent via the bridge router. Since the local assets would always be canonical in this
   * case, custody of the local assets will be kept here.
   *
   * @param _args - The XCallArgs arguments.
   * @return bytes32 - The transfer ID of the newly created crosschain transfer.
   */
  function xcall(XCallArgs calldata _args) external payable whenBridgeNotPaused nonReentrant returns (bytes32) {
    // Sanity checks.
    {
      // Correct origin domain.
      if (_args.params.originDomain != s.domain) {
        revert BridgeFacet__xcall_wrongDomain();
      }

      // Recipient is defined.
      if (_args.params.to == address(0)) {
        revert BridgeFacet__xcall_emptyTo();
      }

      // If callback address is not set, callback fee should be 0.
      if (_args.params.callback == address(0) && _args.params.callbackFee > 0) {
        revert BridgeFacet__xcall_nonZeroCallbackFeeForCallback();
      }

      // Callback is contract if supplied.
      if (_args.params.callback != address(0) && !Address.isContract(_args.params.callback)) {
        revert BridgeFacet__xcall_callbackNotAContract();
      }
    }

    bytes32 transferId;
    bytes memory message;
    XCalledEventArgs memory eventArgs;
    {
      // Get the remote BridgeRouter address; revert if not found.
      bytes32 remote = _mustHaveRemote(_args.params.destinationDomain);

      // Get the true transacting asset ID (using wrapper instead of native, if applicable).
      address transactingAssetId = _args.transactingAssetId == address(0)
        ? address(s.wrapper)
        : _args.transactingAssetId;

      // Check that the asset is supported -- can be either adopted or local.
      ConnextMessage.TokenId memory canonical = s.adoptedToCanonical[transactingAssetId];
      if (canonical.id == bytes32(0)) {
        // Here, the asset is *not* the adopted asset. The only other valid option
        // is for this asset to be the local asset (i.e. transferring madEth on optimism)
        // NOTE: it *cannot* be the canonical asset. the canonical asset is only used on
        // the canonical domain, where it is *also* the adopted asset.
        if (s.tokenRegistry.isLocalOrigin(transactingAssetId)) {
          // revert, using a token of local origin that is not registered as adopted
          revert BridgeFacet__xcall_notSupportedAsset();
        }

        (uint32 canonicalDomain, bytes32 canonicalId) = s.tokenRegistry.getTokenId(transactingAssetId);
        canonical = ConnextMessage.TokenId(canonicalDomain, canonicalId);
      }

      transferId = _getTransferId(_args, canonical);
      s.nonce += 1;

      // Store the relayer fee
      s.relayerFees[transferId] = _args.relayerFee;

      // Transfer funds of transacting asset to the contract from the user.
      // NOTE: Will wrap any native asset transferred to wrapped-native automatically.
      (, uint256 amount) = AssetLogic.handleIncomingAsset(
        _args.transactingAssetId,
        _args.amount,
        _args.relayerFee + _args.params.callbackFee
      );

      // Swap to the local asset from adopted if applicable.
      (uint256 bridgedAmt, address bridged) = AssetLogic.swapToLocalAssetIfNeeded(
        canonical,
        transactingAssetId,
        amount
      );

      // Transfer callback fee to PromiseRouter if set
      if (_args.params.callbackFee != 0) {
        s.promiseRouter.initCallbackFee{value: _args.params.callbackFee}(transferId);
      }

      message = _formatMessage(_args, bridged, transferId, bridgedAmt);
      s.xAppConnectionManager.home().dispatch(_args.params.destinationDomain, remote, message);

      // Format arguments for XCalled event that will be emitted below.
      eventArgs = XCalledEventArgs({
        transactingAssetId: transactingAssetId,
        amount: amount,
        bridgedAmt: bridgedAmt,
        bridged: bridged
      });
    }

    // emit event
    emit XCalled(transferId, _args, eventArgs, s.nonce - 1, message, msg.sender);

    return transferId;
  }

  /**
   * @notice The interface-compliant entrypoint for nomad relayers. Handles an incoming nomad router message that has
   * been verified optimistically. Wraps `_reconcile`, which contains the business logic involved in completing the
   * xchain update.
   *
   * @dev Since this method will be called by nomad relayers, it should not consume arbitrary amounts of gas under
   * any circumstances.
   *
   * @param _origin - The origin domain's numeric ID.
   * @param _nonce - The unique numeric identifier for the message from origin to destination.
   * @param _sender - The sender identifier.
   * @param _message - The message bytes.
   */
  function handle(
    uint32 _origin,
    uint32 _nonce,
    bytes32 _sender,
    bytes memory _message
  ) external onlyReplica onlyRemoteRouter(_origin, _sender) {
    _reconcile(_origin, _message);
  }

  /**
   * @notice Called on a destination domain to disburse correct assets to end recipient and execute any included
   * calldata.
   *
   * @dev Can be called before or after `handle` [reconcile] is called (regarding the same transfer), depending on
   * whether the fast liquidity route (i.e. funds provided by routers) is being used for this transfer. As a result,
   * executed calldata (including properties like `originSender`) may or may not be verified depending on whether the
   * reconcile has been completed (i.e. the optimistic confirmation period has elapsed).
   *
   * @param _args - ExecuteArgs arguments.
   * @return bytes32 - The transfer ID of the crosschain transfer. Should match the xcall's transfer ID in order for
   * reconciliation to occur.
   */
  function execute(ExecuteArgs calldata _args) external whenBridgeNotPaused nonReentrant returns (bytes32) {
    (bytes32 transferId, bool reconciled) = _executeSanityChecks(_args);

    // Set the relayer for this transaction to allow for future claim
    s.transferRelayer[transferId] = msg.sender;

    // execute router liquidity when this is a fast transfer
    // asset will be adopted unless specified to be local in params
    (uint256 amount, address asset) = _handleExecuteLiquidity(transferId, !reconciled, _args);

    // execute the transaction
    uint256 amountWithSponsors = _handleExecuteTransaction(_args, amount, asset, transferId, reconciled);

    // emit event
    emit Executed(transferId, _args.params.to, _args, asset, amountWithSponsors, msg.sender);

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
    // Cast asset to bridge token interface.
    IBridgeToken token = IBridgeToken(_asset);

    bytes32 detailsHash;
    if (s.tokenRegistry.isLocalOrigin(_asset)) {
      // TODO: do we want to store a mapping of custodied token balances here?

      // Token is local for this domain. We should custody the token here.
      // Query token contract for details and calculate detailsHash.
      detailsHash = ConnextMessage.formatDetailsHash(token.name(), token.symbol(), token.decimals());
    } else {
      // If the token originates on a remote chain, burn the representation tokens on this chain.
      if (_amount > 0) {
        token.burn(address(this), _amount);
      }
      detailsHash = token.detailsHash();
    }

    // Format the message action.
    // The action is the part of the message that represents what has to happen for the transfer.
    // It includes the `detailsHash` in case a new token must be deployed, the transfer recipient,
    // the amount, and the transfer ID. The `amount` here is used by reconcile, once the message is
    // confirmed, to potentially mint more tokens
    bytes29 action = ConnextMessage.formatTransfer(
      TypeCasts.addressToBytes32(_args.params.to),
      _amount,
      detailsHash,
      _transferId
    );

    // Get the token's canonical domain and ID.
    (uint32 canonicalDomain, bytes32 canonicalId) = s.tokenRegistry.getTokenId(_asset);

    // Format the token's ID for messaging.
    bytes29 tokenId = ConnextMessage.formatTokenId(canonicalDomain, canonicalId);

    return ConnextMessage.formatMessage(tokenId, action);
  }

  /**
   * @notice Called via `handle`. Will either (a) credit the router(s) if fast liquidity was provided (i.e. `execute`
   * has already occurred) or (b) make funds available for execution, updating state to mark the transfer as having
   * been reconciled (i.e. verified).
   *
   * @dev The output asset will be the one registered under the canonical token ID in the TokenRegistry. If the output
   * asset is an adopted token, the bridged nomad counterpart (i.e. the local asset) will be minted then swapped via
   * the configured AMM to the adopted token. If the target output is the canonical token (i.e. this domain is the
   * canonical domain for the token), then we will release custody of the appropriate amount of that canonical token
   * (tokens which were previously deposited into this bridge via outgoing `xcall`s). If the target adopted token
   * is also the local nomad asset (which would be minted here), then no swap is necessary.
   *
   * @param _origin - The origin domain's numeric ID.
   * @param _message - The bridged message bytes.
   */
  function _reconcile(uint32 _origin, bytes memory _message) internal {
    // Parse tokenId and action from the message.
    bytes29 msg_ = _message.ref(0).mustBeMessage();
    bytes29 tokenId = msg_.tokenId();
    bytes29 action = msg_.action();

    // Assert that the action is valid.
    if (!action.isTransfer()) {
      revert BridgeFacet__reconcile_invalidAction();
    }

    // Load the transferId.
    bytes32 transferId = action.transferId();

    // Ensure the transaction has not already been handled (i.e. previously reconciled).
    if (s.reconciledTransfers[transferId]) {
      revert BridgeFacet__reconcile_alreadyReconciled();
    }

    // NOTE: `tokenId` and `amount` must be in plaintext in the message so funds can *only* be minted by
    // `handle`. They are both used in the generation of the `transferId` so routers must provide them
    // correctly to be reimbursed.

    // Get the appropriate local token contract for the given tokenId on this chain.
    // NOTE: If the token is of remote origin and there is no existing representation token contract,
    // the TokenRegistry will deploy a new one.
    address token = s.tokenRegistry.ensureLocalToken(tokenId.domain(), tokenId.id());

    // Load amount once.
    uint256 amount = action.amnt();

    // Mint tokens if the asset is of remote origin (i.e. is representational).
    // NOTE: If the asset IS of local origin (meaning it's canonical), then the tokens will already be held
    // in escrow in this contract (from previous `xcall`s).
    if (!s.tokenRegistry.isLocalOrigin(token)) {
      IBridgeToken(token).mint(address(this), amount);

      // Update the recorded `detailsHash` for the token (name, symbol, decimals).
      // TODO: do we need to keep this
      bytes32 details = action.detailsHash();
      IBridgeToken(token).setDetailsHash(details);
    }

    // Mark the transfer as reconciled.
    s.reconciledTransfers[transferId] = true;

    // If the transfer was executed using fast-liquidity provided by routers, then this value would be set
    // to the participating routers.
    // NOTE: If the transfer was not executed using fast-liquidity, then the funds will be reserved for
    // execution (i.e. funds will be delivered to the transfer's recipient in a subsequent `execute` call).
    address[] memory routers = s.routedTransfers[transferId];

    // If fast transfer was made using portal liquidity, we need to repay
    // FIXME: routers can repay any-amount out-of-band using the `repayAavePortal` method
    // or by interacting with the aave contracts directly
    uint256 portalTransferAmount = s.portalDebt[transferId] + s.portalFeeDebt[transferId];

    uint256 toDistribute = amount;
    uint256 pathLen = routers.length;
    if (portalTransferAmount != 0) {
      // ensure a router took on credit risk
      if (pathLen != 1) revert BridgeFacet__reconcile_noPortalRouter();
      toDistribute = _reconcileProcessPortal(amount, local, routers[0], transferId);
    }

    if (pathLen != 0) {
      // fast liquidity path
      // Credit each router that provided liquidity their due 'share' of the asset.
      uint256 routerAmt = toDistribute / pathLen;
      for (uint256 i; i < pathLen; ) {
        s.routerBalances[routers[i]][local] += routerAmt;
        unchecked {
          i++;
        }
      }
    }

    emit Reconciled(transferId, _origin, routers, local, amount, msg.sender);
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
  function _executeSanityChecks(ExecuteArgs calldata _args) private view returns (bytes32, bool) {
    // If the caller is not an approved relayer, revert.
    if (!s.approvedRelayers[msg.sender]) {
      revert BridgeFacet__execute_unapprovedRelayer();
    }

    // Path length refers to the number of facilitating routers. A transfer is considered 'multipath'
    // if multiple routers provide liquidity (in even 'shares') for it.
    uint256 pathLength = _args.routers.length;

    // Make sure number of routers is below the configured maximum.
    if (pathLength > s.maxRoutersPerTransfer) revert BridgeFacet__execute_maxRoutersExceeded();

    // Derive transfer ID based on given arguments.
    bytes32 transferId = _getTransferId(_args);

    // Retrieve the reconciled record. If the transfer is `forceSlow` then it must be reconciled first
    // before it's executed.
    bool reconciled = s.reconciledTransfers[transferId];
    if (_args.params.forceSlow && !reconciled) revert BridgeFacet__execute_notReconciled();

    // Hash the payload for which each router should have produced a signature.
    // Each router should have signed the `transferId` (which implicitly signs call params,
    // amount, and tokenId) as well as the `pathLength`, or the number of routers with which
    // they are splitting liquidity provision.
    bytes32 routerHash = keccak256(abi.encode(transferId, pathLength));

    // check the reconciled status is correct
    // (i.e. if there are routers provided, the transfer must *not* be reconciled)
    if (pathLength > 0) // make sure routers are all approved if needed
    {
      if (reconciled) revert BridgeFacet__execute_alreadyReconciled();

      for (uint256 i; i < pathLength; ) {
        // Make sure the router is approved, if applicable.
        // If router ownership is renounced (_RouterOwnershipRenounced() is true), then the router whitelist
        // no longer applies and we can skip this approval step.
        if (!_isRouterOwnershipRenounced() && !s.routerPermissionInfo.approvedRouters[_args.routers[i]]) {
          revert BridgeFacet__execute_notSupportedRouter();
        }

        // Validate the signature. We'll recover the signer's address using the expected payload and basic ECDSA
        // signature scheme recovery. The address for each signature must match the router's address.
        if (_args.routers[i] != _recoverSignature(routerHash, _args.routerSignatures[i])) {
          revert BridgeFacet__execute_invalidRouterSignature();
        }

        unchecked {
          i++;
        }
      }
    } else {
      // If there are no routers for this transfer, this `execute` must be a slow liquidity route; in which
      // case, we must make sure the transfer's been reconciled.
      if (!reconciled) revert BridgeFacet__execute_notReconciled();
    }

    // Require that this transfer has not already been executed. If it were executed, the `transferRelayer`
    // would have been set in the previous call (to enable the caller to claim relayer fees).
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

    // If this is a fast liquidity path, we should handle deducting from applicable routers' liquidity.
    // If this is a slow liquidity path, the transfer must have been reconciled (if we've reached this point),
    // and the funds would have been custodied in this contract. The exact custodied amount is untracked in state
    // (since the amount is hashed in the transfer ID itself) - thus, no updates are required.
    if (_isFast) {
      uint256 pathLen = _args.routers.length;

      // Calculate amount that routers will provide with the fast-liquidity fee deducted.
      toSwap = _getFastTransferAmount(_args.amount, s.LIQUIDITY_FEE_NUMERATOR, s.LIQUIDITY_FEE_DENOMINATOR);

      // Save the addressess of all routers providing liquidity for this transfer.
      s.routedTransfers[_transferId] = _args.routers;

      // If router does not have enough liquidity, try to use Aave Portals.
      // only one router should be responsible for taking on this credit risk, and it should only
      // deal with transfers expecting adopted assets (to avoid introducing runtime slippage)
      if (
        !_args.params.receiveLocal &&
        pathLen == 1 &&
        s.routerBalances[_args.routers[0]][_args.local] < toSwap &&
        s.aavePool != address(0)
      ) {
        if (!s.routerPermissionInfo.approvedForPortalRouters[_args.routers[0]])
          revert BridgeFacet__execute_notApprovedForPortals();

        // Portal provides the adopted asset so we early return here
        return _executePortalTransfer(_transferId, toSwap, _args.local, _args.routers[0]);
      } else {
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
    }

    // If the local asset is specified as desired by definition of the transfer, exit.
    if (_args.params.receiveLocal) {
      return (toSwap, _args.local);
    }

    // Swap out of mad* asset into adopted asset if needed.
    return AssetLogic.swapFromLocalAssetIfNeeded(_args.local, toSwap);
  }

  /**
   * @notice Process the transfer, and calldata if needed, when calling `execute`
   * @dev Need this to prevent stack too deep
   */
  function _handleExecuteTransaction(
    ExecuteArgs calldata _args,
    uint256 _amount,
    address _asset, // adopted (or local if specified)
    bytes32 _transferId,
    bool _reconciled
  ) private returns (uint256) {
    // If the domain if sponsored
    if (address(s.sponsorVault) != address(0)) {
      // fast liquidity path
      if (!_reconciled) {
        // Vault will return the amount of the fee they sponsored in the native fee
        // NOTE: some considerations here around fee on transfer tokens and ensuring
        // there are no malicious `Vaults` that do not transfer the correct amount. Should likely do a
        // balance read about it

        uint256 starting = IERC20(_asset).balanceOf(address(this));
        uint256 sponsored = s.sponsorVault.reimburseLiquidityFees(_asset, _args.amount, _args.params.to);

        // Validate correct amounts are transferred
        if (IERC20(_asset).balanceOf(address(this)) != starting + sponsored) {
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
      AssetLogic.transferAssetFromContract(_asset, _args.params.to, _amount);
    } else {
      // execute calldata w/funds
      AssetLogic.transferAssetFromContract(_asset, address(s.executor), _amount);
      (bool success, bytes memory returnData) = s.executor.execute(
        IExecutor.ExecutorArgs(
          _transferId,
          _amount,
          _args.params.to,
          _args.params.recovery,
          _asset,
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

    return _amount;
  }

  /**
   * @notice Uses Aave Portals to provide fast liquidity
   */
  function _executePortalTransfer(
    bytes32 _transferId,
    uint256 _fastTransferAmount,
    address _local,
    address _router
  ) internal returns (uint256, address) {
    // Calculate local to adopted swap output if needed
    (uint256 userAmount, address adopted) = AssetLogic.calculateSwapFromLocalAssetIfNeeded(_local, _fastTransferAmount);

    IAavePool(s.aavePool).mintUnbacked(adopted, userAmount, address(this), AAVE_REFERRAL_CODE);

    // Improvement: Instead of withdrawing to address(this), withdraw directly to the user or executor to save 1 transfer
    IAavePool(s.aavePool).withdraw(adopted, userAmount, address(this));

    // Store principle debt
    s.portalDebt[_transferId] = userAmount;

    // Store fee debt
    s.portalFeeDebt[_transferId] = (s.aavePortalFeeNumerator * userAmount) / s.LIQUIDITY_FEE_DENOMINATOR;

    emit AavePortalMintUnbacked(_transferId, _router, adopted, userAmount);

    return (userAmount, adopted);
  }

  /**
   * @notice Parses the message and process the transfer
   * @dev Will mint the tokens if the token originates on a remote origin
   * @return The message amount
   * @return The message token
   * @return The message transfer id
   */
  function _reconcileProcessMessage(bytes memory _message)
    internal
    returns (
      uint256,
      address,
      bytes32
    )
  {
    // parse tokenId and action from message
    bytes29 msg_ = _message.ref(0).mustBeMessage();
    bytes29 tokenId = msg_.tokenId();
    bytes29 action = msg_.action();

    // load the transferId
    bytes32 transferId = action.transferId();

    // ensure the transaction has not been handled
    if (s.reconciledTransfers[transferId]) {
      revert BridgeFacet__reconcile_alreadyReconciled();
    }

    // assert the action is valid
    if (!action.isTransfer()) {
      revert BridgeFacet__reconcile_invalidAction();
    }

    // get the token contract for the given tokenId on this chain
    // (if the token is of remote origin and there is
    // no existing representation token contract, the TokenRegistry will
    // deploy a new one)
    bytes32 canonical = tokenId.id();
    address token = s.tokenRegistry.ensureLocalToken(tokenId.domain(), canonical);

    // load amount once
    uint256 amount = action.amnt();

    // NOTE: tokenId + amount must be in plaintext in message so funds can
    // *only* be minted by `handle`. They are still used in the generation of
    // the transferId so routers must provide them correctly to be reimbursed

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

    return (amount, token, transferId);
  }

  /**
   * @notice Repays to Aave Portal if the transfer was executed with fast path using Portal liquidity
   * @param _amount - The amount passed through bridge
   * @param _local - The local  asset
   * @param _router - The router who took on portal risk
   * @param _transferId - The transfer identifier
   * @return The amount to distribute amongst the routers after repayment
   */
  function _reconcileProcessPortal(
    uint256 _amount,
    address _local,
    address _router,
    bytes32 _transferId
  ) private returns (uint256) {
    // When repaying a portal, should use available liquidity if there is not enough balance from
    // the bridge. First, calculate the amount to be repaid in adopted asset then swap for exactly
    // that amount. This prevents having to swap excess (i.e. from positive amm slippage) from debt
    // repayment back into local asset to credit routers

    // Calculates the amount to be repaid to the portal in adopted asset
    (uint256 totalRepayAmount, uint256 backUnbackedAmount, uint256 portalFee) = _calculatePortalRepayment(
      _amount,
      _transferId,
      _local
    );

    // Update the debt amounts before swapping
    s.portalDebt[_transferId] -= backUnbackedAmount;
    s.portalFeeDebt[_transferId] -= portalFee;

    // Swap for exact `totalRepayAmount` of adopted asset to repay aave, with a maximum of the minted amount
    // as the slippage ceiling
    // amountIn is the amount that was actually taken to perform the swap (i.e. amount of local asset swapped)
    // NOTE: this function can revert if the slippage ceiling is hit. Using the low-level calls helps us
    // handle the case where slippage was hit
    (bool swapSuccess, uint256 amountIn, address adopted) = AssetLogic.swapFromLocalAssetIfNeededForExactOut(
      _local,
      totalRepayAmount,
      _amount
    );
    if (!swapSuccess) {
      // Emit debt event of full portal value and exit
      emit AavePortalRepaymentDebt(_transferId, adopted, backUnbackedAmount, portalFee);
      return (_amount);
    }

    // Edge case with some tokens: Example USDT in ETH Mainnet, after the backUnbacked call there could be a remaining allowance if not the whole amount is pulled by aave.
    // Later, if we try to increase the allowance it will fail. USDT demands if allowance is not 0, it has to be set to 0 first.
    // TODO: Should we call approve(0) and approve(totalRepayAmount) instead? or with a try catch to not affect gas on all cases?
    // Example: https://github.com/aave/aave-v3-periphery/blob/ca184e5278bcbc10d28c3dbbc604041d7cfac50b/contracts/adapters/paraswap/ParaSwapRepayAdapter.sol#L138-L140
    SafeERC20.safeIncreaseAllowance(IERC20(adopted), s.aavePool, totalRepayAmount);

    (bool success, ) = s.aavePool.call(
      abi.encodeWithSelector(IAavePool.backUnbacked.selector, adopted, backUnbackedAmount, portalFee)
    );

    if (success) {
      emit AavePortalRepayment(_transferId, adopted, backUnbackedAmount, portalFee);
    } else {
      // Decrease the allowance
      SafeERC20.safeDecreaseAllowance(IERC20(adopted), s.aavePool, totalRepayAmount);

      // Update the amount repaid to 0, so the amount is credited to the router
      amountIn = 0;
      emit AavePortalRepaymentDebt(_transferId, adopted, backUnbackedAmount, portalFee);
    }

    // NOTE: Aave accounts a global unbacked variable per asset for all, not by address/bridge.
    // Someone can repay more than it should, so then a the moment of calling backUnbacked()
    // aave can pull a smaller amount than backUnbackedAmount. So there will be an extra amount of assets that needs to be assigned
    // See https://github.com/aave/aave-v3-core/blob/feb3f20885c73025f40cc272b59e7eacfaa02fe4/contracts/protocol/libraries/logic/BridgeLogic.sol#L121
    // If we wanted to handle this difference, we should check the balance before and after calling
    // `backUnbacked` and credit the difference to the router

    // Calculate the amount to distribute to the router. There are cases (i.e. positive slippage)
    // where router has gained extra because of the AMM, these funds should be distributed.
    // Because we are using the `_amount` a sthe maximum amount in, the `amountIn` should always be
    // <= _amount (i.e. this will be +ive)
    return (_amount - amountIn);
  }

  /**
   * @notice Calculates the amount to be repaid to Aave Portal in adopted asset. If there is no enough amount to repay
   * the unbacked and the fee, it will partially repay prioritizing the unbacked amount.
   * @dev Assumes the fee is proportional to the unbackedAmount.
   * @param _localAmount - The available balance for a repayment
   * @param _transferId - The unique identifier of the crosschain transaction
   * @param _local - The address of the adopted asset that needs to be backed
   * @return The total amount to be repaid
   * @return The unbacked amount to be backed
   * @return The fee amount to be paid
   */
  function _calculatePortalRepayment(
    uint256 _localAmount,
    bytes32 _transferId,
    address _local
  )
    internal
    returns (
      uint256,
      uint256,
      uint256
    )
  {
    uint256 portalFee = s.portalFeeDebt[_transferId];
    uint256 backUnbackedAmount = s.portalDebt[_transferId];
    uint256 totalRepayAmount = backUnbackedAmount + portalFee;
    // see how much of local asset you would have available post-swap
    (uint256 availableAmount, address adopted) = AssetLogic.calculateSwapFromLocalAssetIfNeeded(_local, _localAmount);

    // If not enough funds to repay the transfer + fees
    // try to repay as much as unbacked as possible
    if (totalRepayAmount > availableAmount) {
      uint256 backUnbackedDebt = backUnbackedAmount;
      uint256 portalFeeDebt = portalFee;

      if (availableAmount > backUnbackedAmount) {
        // Repay the whole transfer and a partial amount of fees
        portalFee = availableAmount - backUnbackedAmount;

        backUnbackedDebt = 0;
        portalFeeDebt -= portalFee;
      } else {
        // Repay a partial amount of the transfer and no fees
        backUnbackedAmount = availableAmount;
        portalFee = 0;

        backUnbackedDebt -= backUnbackedAmount;
      }

      totalRepayAmount = backUnbackedAmount + portalFee;

      emit AavePortalRepaymentDebt(_transferId, adopted, backUnbackedDebt, portalFeeDebt);
    }

    return (totalRepayAmount, backUnbackedAmount, portalFee);
  }
}
