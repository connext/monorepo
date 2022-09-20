// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";
import {TypeCasts} from "../../../shared/libraries/TypeCasts.sol";
import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";

import {IOutbox} from "../../../messaging/interfaces/IOutbox.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

import {AssetLogic} from "../libraries/AssetLogic.sol";
import {XCallArgs, ExecuteArgs, CallParams, TokenId, TransferIdInformation} from "../libraries/LibConnextStorage.sol";
import {LibCrossDomainProperty} from "../libraries/LibCrossDomainProperty.sol";
import {BridgeMessage} from "../helpers/BridgeMessage.sol";

import {PromiseRouter} from "../../promise/PromiseRouter.sol";
import {Router} from "../../Router.sol";

import {IWeth} from "../interfaces/IWeth.sol";
import {ITokenRegistry} from "../interfaces/ITokenRegistry.sol";
import {IExecutor} from "../interfaces/IExecutor.sol";
import {IAavePool} from "../interfaces/IAavePool.sol";
import {ISponsorVault} from "../interfaces/ISponsorVault.sol";
import {IBridgeHook} from "../interfaces/IBridgeHook.sol";
import {IBridgeToken} from "../interfaces/IBridgeToken.sol";

contract BridgeFacet is BaseConnextFacet {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using BridgeMessage for bytes29;
  using SafeERC20 for IERC20;

  // ========== Structs ===========

  // ========== Custom Errors ===========

  error BridgeFacet__setPromiseRouter_invalidPromiseRouter();
  error BridgeFacet__setExecutor_invalidExecutor();
  error BridgeFacet__setSponsorVault_invalidSponsorVault();
  error BridgeFacet__addConnextion_invalidDomain();
  error BridgeFacet__addSequencer_alreadyApproved();
  error BridgeFacet__removeSequencer_notApproved();
  error BridgeFacet__xcall_nativeAssetNotSupported();
  error BridgeFacet__xcall_wrongDomain();
  error BridgeFacet__xcall_destinationNotSupported();
  error BridgeFacet__xcall_emptyToOrRecovery();
  error BridgeFacet__xcall_notSupportedAsset();
  error BridgeFacet__xcall_nonZeroCallbackFeeForCallback();
  error BridgeFacet__xcall_callbackNotAContract();
  error BridgeFacet__xcall_missingAgent();
  error BridgeFacet__xcall_invalidSlippageTol();
  error BridgeFacet__xcall_ethValueMismatchedFees();
  error BridgeFacet__execute_unapprovedSender();
  error BridgeFacet__execute_wrongDomain();
  error BridgeFacet__execute_notSupportedSequencer();
  error BridgeFacet__execute_invalidSequencerSignature();
  error BridgeFacet__execute_maxRoutersExceeded();
  error BridgeFacet__execute_notSupportedRouter();
  error BridgeFacet__execute_invalidRouterSignature();
  error BridgeFacet__execute_alreadyExecuted();
  error BridgeFacet__execute_notApprovedForPortals();
  error BridgeFacet__execute_alreadyReconciled();
  error BridgeFacet__execute_notReconciled();
  error BridgeFacet__handleExecuteTransaction_invalidSponsoredAmount();
  error BridgeFacet__executePortalTransfer_insufficientAmountWithdrawn();
  error BridgeFacet__bumpTransfer_valueIsZero();
  error BridgeFacet__forceReceiveLocal_invalidSender();

  // ============ Properties ============

  uint16 public constant AAVE_REFERRAL_CODE = 0;
  uint256 public constant DUST_AMOUNT = 0.06 ether;

  // ============ Events ============

  /**
   * @notice Emitted when `xcall` is called on the origin domain
   * @param transferId - The unique identifier of the crosschain transfer.
   * @param nonce - The bridge nonce of the transfer on the origin domain.
   * @param xcallArgs - The `XCallArgs` provided to the function.
   * @param bridgedAsset - The local (mad) asset being bridged. Could be the same as the transactingAsset (adopted
   * asset), or may be different (indicating the transactingAsset was swapped for this bridgedAsset).
   * @param bridgedAmount - The amount of the bridgedAsset being sent, after AMM swap from adopted asset if it was
   * necessary.
   * @param caller - The account that called the function.
   */
  event XCalled(
    bytes32 indexed transferId,
    uint256 indexed nonce,
    bytes32 indexed messageHash,
    XCallArgs xcallArgs,
    address bridgedAsset,
    uint256 bridgedAmount,
    address caller
  );

  /**
   * @notice Emitted when `execute` is called on the destination chain
   * @dev `execute` may be called when providing fast liquidity *or* when processing a reconciled transfer
   * @param transferId - The unique identifier of the crosschain transfer.
   * @param to - The recipient `CallParams.to` provided, created as indexed parameter.
   * @param args - The `ExecuteArgs` provided to the function.
   * @param transactingAsset - The asset the to gets or the external call is executed with. Should be the
   * adopted asset on that chain.
   * @param transactingAmount - The amount of transferring asset the to address receives or the external call is
   * executed with.
   * @param caller - The account that called the function.
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
   * @notice Emitted when a transfer will accept the local asset instead of the
   * previously specified adopted asset.
   * @param transferId - The unique identifier of the crosschain transaction
   * @param canonicalId - The canonical identifier for the local asset
   * @param canonicalDomain - The canonical domain for the local asset
   * @param amount - The amount for the transfer
   */
  event ForcedReceiveLocal(
    bytes32 indexed transferId,
    bytes32 indexed canonicalId,
    uint32 canonicalDomain,
    uint256 amount
  );

  /**
   * @notice Emitted when a router used Aave Portal liquidity for fast transfer
   * @param transferId - The unique identifier of the crosschain transaction
   * @param router - The authorized router that used Aave Portal liquidity
   * @param asset - The asset that was provided by Aave Portal
   * @param amount - The amount of asset that was provided by Aave Portal
   */
  event AavePortalMintUnbacked(bytes32 indexed transferId, address indexed router, address asset, uint256 amount);

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

  /**
   * @notice Emitted when a new connext instance is added
   * @param domain - The domain the connext instance is on
   * @param connext - The address of the connext instance
   * @param caller - The account that called the function
   */
  event ConnextionAdded(uint32 domain, address connext, address caller);

  /**
   * @notice Emitted when a sequencer is added or removed from whitelists
   * @param sequencer - The sequencer address to be added or removed
   * @param caller - The account that called the function
   */
  event SequencerAdded(address sequencer, address caller);

  /**
   * @notice Emitted when a sequencer is added or removed from whitelists
   * @param sequencer - The sequencer address to be added or removed
   * @param caller - The account that called the function
   */
  event SequencerRemoved(address sequencer, address caller);

  /**
   * @notice emitted when tokens are sent from this domain to another domain
   * @param token the address of the token contract
   * @param from the address sending tokens
   * @param toDomain the domain of the chain the tokens are being sent to
   * @param toId the bytes32 address of the recipient of the tokens
   * @param amount the amount of tokens sent
   * @param toHook True if sent to a hook, on the remote chain, false
   *        otherwise
   */
  event Send(
    address indexed token,
    address indexed from,
    uint32 indexed toDomain,
    bytes32 toId,
    uint256 amount,
    bool toHook
  );

  /**
   * @notice emitted when tokens are dispensed to an account on this domain
   *         emitted both when fast liquidity is provided, and when the
   *         transfer ultimately settles
   * @param originAndNonce Domain where the transfer originated and the
   *        unique identifier for the message from origin to destination,
   *        combined in a single field ((origin << 32) & nonce)
   * @param token The address of the local token contract being received
   * @param recipient The address receiving the tokens; the original
   *        recipient of the transfer
   * @param liquidityProvider The account providing liquidity
   * @param amount The amount of tokens being received
   */
  event Receive(
    uint64 indexed originAndNonce,
    address indexed token,
    address indexed recipient,
    address liquidityProvider,
    uint256 amount
  );

  // ============ Modifiers ============

  /**
   * @notice Only accept messages from an Nomad Replica contract
   */
  modifier onlyReplica() {
    require(_isReplica(msg.sender), "!replica");
    _;
  }

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

  function connextion(uint32 _domain) public view returns (address) {
    return TypeCasts.bytes32ToAddress(s.connextions[_domain]);
  }

  function domain() public view returns (uint32) {
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

  function approvedSequencers(address _sequencer) external view returns (bool) {
    return s.approvedSequencers[_sequencer];
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
    if (old == _sponsorVault || !Address.isContract(_sponsorVault))
      revert BridgeFacet__setSponsorVault_invalidSponsorVault();

    s.sponsorVault = ISponsorVault(_sponsorVault);
    emit SponsorVaultUpdated(old, _sponsorVault, msg.sender);
  }

  function addConnextion(uint32 _domain, address _connext) external onlyOwner {
    // Make sure we aren't setting the current domain as the connextion.
    if (_domain == s.domain) {
      revert BridgeFacet__addConnextion_invalidDomain();
    }

    s.connextions[_domain] = TypeCasts.addressToBytes32(_connext);
    emit ConnextionAdded(_domain, _connext, msg.sender);
  }

  /**
   * @notice Used to add an approved sequencer to the whitelist.
   * @param _sequencer - The sequencer address to add.
   */
  function addSequencer(address _sequencer) external onlyOwner {
    if (s.approvedSequencers[_sequencer]) revert BridgeFacet__addSequencer_alreadyApproved();
    s.approvedSequencers[_sequencer] = true;

    emit SequencerAdded(_sequencer, msg.sender);
  }

  /**
   * @notice Used to remove an approved sequencer from the whitelist.
   * @param _sequencer - The sequencer address to remove.
   */
  function removeSequencer(address _sequencer) external onlyOwner {
    if (!s.approvedSequencers[_sequencer]) revert BridgeFacet__removeSequencer_notApproved();
    delete s.approvedSequencers[_sequencer];

    emit SequencerRemoved(_sequencer, msg.sender);
  }

  // ============ Public methods ==============

  /**
   * @notice Initiates a cross-chain transfer of funds, calldata, and/or various named properties using the nomad
   * network.
   *
   * @dev For ERC20 transfers, this contract must have approval to transfer the input (transacting) assets. The adopted
   * assets will be swapped for their local nomad asset counterparts (i.e. bridgeable tokens) via the configured AMM if
   * necessary. In the event that the adopted assets *are* local nomad assets, no swap is needed. The local tokens will
   * then be sent via the bridge router. If the local assets are representational for an asset on another chain, we will
   * burn the tokens here. If the local assets are canonical (meaning that the adopted<>local asset pairing is native
   * to this chain), we will custody the tokens here.
   *
   * @param _args - The XCallArgs arguments.
   * @return bytes32 - The transfer ID of the newly created crosschain transfer.
   */
  function xcall(XCallArgs calldata _args) external payable nonReentrant whenNotPaused returns (bytes32) {
    // Sanity checks.
    bytes32 remoteInstance;
    {
      // Not native asset
      // NOTE: we support using address(0) as an intuitive default if you are sending a 0-value
      // transfer. in that edgecase, address(0) will not be registered as a supported asset, but should
      // pass the `isLocalOrigin` check on the TokenRegistry
      if (_args.transactingAsset == address(0) && _args.transactingAmount != 0) {
        revert BridgeFacet__xcall_nativeAssetNotSupported();
      }

      // Correct origin domain.
      if (_args.params.originDomain != s.domain) {
        revert BridgeFacet__xcall_wrongDomain();
      }

      // Destination domain is supported.
      // NOTE: This check implicitly also checks that `_args.params.destinationDomain != s.domain`, because the index
      // `s.domain` of `s.connextions` should always be `bytes32(0)`.
      remoteInstance = s.connextions[_args.params.destinationDomain];
      if (remoteInstance == bytes32(0)) {
        revert BridgeFacet__xcall_destinationNotSupported();
      }

      // Recipient and recovery defined.
      if (_args.params.to == address(0) || _args.params.recovery == address(0)) {
        revert BridgeFacet__xcall_emptyToOrRecovery();
      }

      // If the user might be receiving adopted assets on the destination chain, they ought to have a defined agent
      // so that they can call `forceReceiveLocal` if need be.
      if (_args.params.agent == address(0) && !_args.params.receiveLocal) {
        revert BridgeFacet__xcall_missingAgent();
      }

      if (_args.params.callback != address(0)) {
        // Callback address must be a contract if it is supplied.
        if (!Address.isContract(_args.params.callback)) {
          revert BridgeFacet__xcall_callbackNotAContract();
        }
      } else if (_args.params.callbackFee != 0) {
        // Othewrise, if callback address is not set, callback fee should be 0.
        revert BridgeFacet__xcall_nonZeroCallbackFeeForCallback();
      }

      // Check to make sure fee amount in argument is equal to msg.value.
      if (msg.value != _args.params.relayerFee + _args.params.callbackFee) {
        revert BridgeFacet__xcall_ethValueMismatchedFees();
      }
    }

    bytes32 transferId;
    uint256 _sNonce;
    address bridgedAsset;
    uint256 bridgedAmount;
    bytes32 messageHash;
    {
      // Check that the asset is supported -- can be either adopted or local.
      TokenId memory canonical;

      // NOTE: above we check that you can only have `address(0)` as a transacting asset when
      // you are sending 0-amounts. Because 0-amount transfers shortcircuit all checks on
      // mappings keyed on hash(canonicalId, canonicalDomain), this is safe even when the
      // address(0) asset is not whitelisted. These values are only used for the `transactionId`
      // generation
      if (_args.transactingAsset != address(0)) {
        canonical = s.adoptedToCanonical[_args.transactingAsset];

        if (canonical.id == bytes32(0)) {
          // Here, the asset is *not* the adopted asset. The only other valid option
          // is for this asset to be the local asset (i.e. transferring madEth on optimism)
          // NOTE: it *cannot* be the canonical asset. the canonical asset is only used on
          // the canonical domain, where it is *also* the adopted asset.
          if (s.tokenRegistry.isLocalOrigin(_args.transactingAsset)) {
            // revert, using a token of local origin that is not registered as adopted
            revert BridgeFacet__xcall_notSupportedAsset();
          }

          (uint32 canonicalDomain, bytes32 canonicalId) = s.tokenRegistry.getTokenId(_args.transactingAsset);
          canonical = TokenId(canonicalDomain, canonicalId);
        }
      }

      if (_args.transactingAmount > 0) {
        // Transfer funds of transacting asset to the contract from the user.
        AssetLogic.transferAssetToContract(_args.transactingAsset, _args.transactingAmount);

        // Swap to the local asset from adopted if applicable.
        (bridgedAmount, bridgedAsset) = AssetLogic.swapToLocalAssetIfNeeded(
          canonical,
          _args.transactingAsset,
          _args.transactingAmount,
          _args.originMinOut
        );

        // Approve bridge router
        SafeERC20.safeApprove(IERC20(bridgedAsset), address(s.bridgeRouter), 0);
        SafeERC20.safeIncreaseAllowance(IERC20(bridgedAsset), address(s.bridgeRouter), bridgedAmount);
      } else {
        // Get the bridged asset so you can emit it properly within the event
        bridgedAsset = _args.transactingAsset == address(0)
          ? address(0)
          : s.tokenRegistry.getLocalAddress(canonical.domain, canonical.id);
      }

      // Calculate the transfer id
      transferId = _getTransferId(_args, canonical, bridgedAmount);
      _sNonce = s.nonce++;
    }

    {
      // Store the relayer fee
      // NOTE: this has to be done *after* transferring in + swapping assets because
      // the transfer id uses the amount that is bridged (i.e. amount in local asset)
      s.relayerFees[transferId] += _args.params.relayerFee;

      // Transfer callback fee to PromiseRouter if set
      if (_args.params.callbackFee != 0) {
        s.promiseRouter.initCallbackFee{value: _args.params.callbackFee}(transferId);
      }

      // Send message
      messageHash = s.bridgeRouter.sendToHook(
        bridgedAsset,
        bridgedAmount,
        _args.params.destinationDomain,
        remoteInstance,
        abi.encode(TransferIdInformation(_args.params, _sNonce, msg.sender))
      );
    }

    // emit event
    emit XCalled(transferId, _sNonce, messageHash, _args, bridgedAsset, bridgedAmount, msg.sender);

    return transferId;
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
  function execute(ExecuteArgs calldata _args) external nonReentrant whenNotPaused returns (bytes32) {
    // Retrieve canonical domain and ID for the transacting asset.
    (uint32 canonicalDomain, bytes32 canonicalId) = s.tokenRegistry.getTokenId(_args.local);

    (bytes32 transferId, bool reconciled) = _executeSanityChecks(_args, canonicalDomain, canonicalId);

    // Set the relayer for this transaction to allow for future claim
    s.transferRelayer[transferId] = msg.sender;

    // execute router liquidity when this is a fast transfer
    // asset will be adopted unless specified to be local in params
    (uint256 amountOut, address asset) = _handleExecuteLiquidity(
      transferId,
      _calculateCanonicalHash(canonicalId, canonicalDomain),
      !reconciled,
      _args
    );

    // execute the transaction
    uint256 amountWithSponsors = _handleExecuteTransaction(_args, amountOut, asset, transferId, reconciled);

    // emit event
    emit Executed(transferId, _args.params.to, _args, asset, amountWithSponsors, msg.sender);

    return transferId;
  }

  /**
   * @notice Anyone can call this function on the origin domain to increase the relayer fee for a transfer.
   * @param _transferId - The unique identifier of the crosschain transaction
   */
  function bumpTransfer(bytes32 _transferId) external payable nonReentrant whenNotPaused {
    if (msg.value == 0) revert BridgeFacet__bumpTransfer_valueIsZero();

    s.relayerFees[_transferId] += msg.value;

    emit TransferRelayerFeesUpdated(_transferId, s.relayerFees[_transferId], msg.sender);
  }

  /**
   * @notice A user-specified agent can call this to accept the local asset instead of the
   * previously specified adopted asset.
   * @dev Should be called in situations where transfers are facing unfavorable slippage
   * conditions for extended periods
   * @param _params - The call params for the transaction
   * @param _amount - The amount of transferring asset the tx called xcall with
   * @param _nonce - The nonce for the transfer
   * @param _canonicalId - The identifier of the canonical asset associated with the transfer
   * @param _canonicalDomain - The domain of the canonical asset associated with the transfer
   * @param _originSender - The msg.sender of the origin call
   */
  function forceReceiveLocal(
    CallParams calldata _params,
    uint256 _amount,
    uint256 _nonce,
    bytes32 _canonicalId,
    uint32 _canonicalDomain,
    address _originSender
  ) external nonReentrant {
    // Enforce caller
    if (msg.sender != _params.agent) revert BridgeFacet__forceReceiveLocal_invalidSender();

    // Calculate transfer id
    bytes32 transferId = _calculateTransferId(_params, _amount, _nonce, _canonicalId, _canonicalDomain, _originSender);

    // Store receive local
    s.receiveLocalOverrides[transferId] = true;

    // Emit event
    emit ForcedReceiveLocal(transferId, _canonicalId, _canonicalDomain, _amount);
  }

  // ============ Private Functions ============

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
  function _executeSanityChecks(
    ExecuteArgs calldata _args,
    uint32 canonicalDomain,
    bytes32 canonicalId
  ) private view returns (bytes32, bool) {
    // If the sender is not approved relayer, revert
    if (!s.approvedRelayers[msg.sender] && msg.sender != _args.params.agent) {
      revert BridgeFacet__execute_unapprovedSender();
    }

    // If this is not the destination domain revert
    if (_args.params.destinationDomain != s.domain) {
      revert BridgeFacet__execute_wrongDomain();
    }

    // Path length refers to the number of facilitating routers. A transfer is considered 'multipath'
    // if multiple routers provide liquidity (in even 'shares') for it.
    uint256 pathLength = _args.routers.length;

    // Make sure number of routers is below the configured maximum.
    if (pathLength > s.maxRoutersPerTransfer) revert BridgeFacet__execute_maxRoutersExceeded();

    // Derive transfer ID based on given arguments.
    bytes32 transferId = _getTransferId(_args, canonicalDomain, canonicalId);

    // Retrieve the reconciled record. If the transfer is `forceSlow` then it must be reconciled first
    // before it's executed.
    bool reconciled = s.reconciledTransfers[transferId];
    if (_args.params.forceSlow && !reconciled) revert BridgeFacet__execute_notReconciled();

    // Hash the payload for which each router should have produced a signature.
    // Each router should have signed the `transferId` (which implicitly signs call params,
    // amount, and tokenId) as well as the `pathLength`, or the number of routers with which
    // they are splitting liquidity provision.
    bytes32 routerHash = keccak256(abi.encode(transferId, pathLength));

    if (pathLength != 0) {
      // Check to make sure the transfer has not been reconciled (no need for routers if the transfer is
      // already reconciled; i.e. if there are routers provided, the transfer must *not* be reconciled).
      if (reconciled) revert BridgeFacet__execute_alreadyReconciled();

      // NOTE: The sequencer address may be empty and no signature needs to be provided in the case of the
      // slow liquidity route (i.e. no routers involved). Additionally, the sequencer does not need to be the
      // msg.sender.
      // Check to make sure the sequencer address provided is approved
      if (!s.approvedSequencers[_args.sequencer]) {
        revert BridgeFacet__execute_notSupportedSequencer();
      }
      // Check to make sure the sequencer provided did sign the transfer ID and router path provided.
      if (
        _args.sequencer != _recoverSignature(keccak256(abi.encode(transferId, _args.routers)), _args.sequencerSignature)
      ) {
        revert BridgeFacet__execute_invalidSequencerSignature();
      }

      for (uint256 i; i < pathLength; ) {
        // Make sure the router is approved, if applicable.
        // If router ownership is renounced (_RouterOwnershipRenounced() is true), then the router whitelist
        // no longer applies and we can skip this approval step.
        if (!_isRouterWhitelistRemoved() && !s.routerPermissionInfo.approvedRouters[_args.routers[i]]) {
          revert BridgeFacet__execute_notSupportedRouter();
        }

        // Validate the signature. We'll recover the signer's address using the expected payload and basic ECDSA
        // signature scheme recovery. The address for each signature must match the router's address.
        if (_args.routers[i] != _recoverSignature(routerHash, _args.routerSignatures[i])) {
          revert BridgeFacet__execute_invalidRouterSignature();
        }

        unchecked {
          ++i;
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
   * @notice Calculates a transferId based on `xcall` arguments
   * @dev Need this to prevent stack too deep
   */
  function _getTransferId(
    XCallArgs calldata _args,
    TokenId memory _canonical,
    uint256 bridgedAmount
  ) private view returns (bytes32) {
    return _calculateTransferId(_args.params, bridgedAmount, s.nonce, _canonical.id, _canonical.domain, msg.sender);
  }

  /**
   * @notice Calculates a transferId based on `execute` arguments
   * @dev Need this to prevent stack too deep
   */
  function _getTransferId(
    ExecuteArgs calldata _args,
    uint32 canonicalDomain,
    bytes32 canonicalId
  ) private pure returns (bytes32) {
    return
      _calculateTransferId(_args.params, _args.amount, _args.nonce, canonicalId, canonicalDomain, _args.originSender);
  }

  /**
   * @notice Calculates fast transfer amount.
   * @param _amount Transfer amount
   * @param _numerator Numerator
   * @param _denominator Denominator
   */
  function _muldiv(
    uint256 _amount,
    uint256 _numerator,
    uint256 _denominator
  ) private pure returns (uint256) {
    return (_amount * _numerator) / _denominator;
  }

  /**
   * @notice Execute liquidity process used when calling `execute`
   * @dev Need this to prevent stack too deep
   */
  function _handleExecuteLiquidity(
    bytes32 _transferId,
    bytes32 _key,
    bool _isFast,
    ExecuteArgs calldata _args
  ) private returns (uint256, address) {
    // Save the addresses of all routers providing liquidity for this transfer.
    s.routedTransfers[_transferId] = _args.routers;

    if (_args.amount == 0) {
      return (0, _args.local);
    }

    bool localRequested = _args.params.receiveLocal || s.receiveLocalOverrides[_transferId];

    uint256 toSwap = _args.amount;
    // If this is a fast liquidity path, we should handle deducting from applicable routers' liquidity.
    // If this is a slow liquidity path, the transfer must have been reconciled (if we've reached this point),
    // and the funds would have been custodied in this contract. The exact custodied amount is untracked in state
    // (since the amount is hashed in the transfer ID itself) - thus, no updates are required.
    if (_isFast) {
      uint256 pathLen = _args.routers.length;

      // Calculate amount that routers will provide with the fast-liquidity fee deducted.
      toSwap = _muldiv(_args.amount, s.LIQUIDITY_FEE_NUMERATOR, BPS_FEE_DENOMINATOR);

      if (pathLen == 1) {
        // If router does not have enough liquidity, try to use Aave Portals.
        // only one router should be responsible for taking on this credit risk, and it should only
        // deal with transfers expecting adopted assets (to avoid introducing runtime slippage).
        if (!localRequested && s.routerBalances[_args.routers[0]][_args.local] < toSwap && s.aavePool != address(0)) {
          if (!s.routerPermissionInfo.approvedForPortalRouters[_args.routers[0]])
            revert BridgeFacet__execute_notApprovedForPortals();

          // Portal provides the adopted asset so we early return here
          return _executePortalTransfer(_transferId, _key, toSwap, _args.routers[0]);
        } else {
          // Decrement the router's liquidity.
          s.routerBalances[_args.routers[0]][_args.local] -= toSwap;
        }
      } else {
        // For each router, assert they are approved, and deduct liquidity.
        uint256 routerAmount = toSwap / pathLen;
        for (uint256 i; i < pathLen - 1; ) {
          // Decrement router's liquidity.
          s.routerBalances[_args.routers[i]][_args.local] -= routerAmount;

          unchecked {
            ++i;
          }
        }
        // The last router in the multipath will sweep the remaining balance to account for remainder dust.
        uint256 toSweep = routerAmount + (toSwap % pathLen);
        s.routerBalances[_args.routers[pathLen - 1]][_args.local] -= toSweep;
      }
    }

    // if the local asset is specified, or the adopted asset was overridden (i.e. when
    // user facing slippage conditions outside of their boundaries), exit
    if (localRequested) {
      return (toSwap, _args.local);
    }

    // swap out of mad* asset into adopted asset if needed
    return AssetLogic.swapFromLocalAssetIfNeeded(_key, _args.local, toSwap, _args.params.destinationMinOut);
  }

  /**
   * @notice Process the transfer, and calldata if needed, when calling `execute`
   * @dev Need this to prevent stack too deep
   */
  function _handleExecuteTransaction(
    ExecuteArgs calldata _args,
    uint256 _amountOut,
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
        uint256 denom = BPS_FEE_DENOMINATOR;
        // NOTE: using the amount that was transferred to calculate the liquidity fee, not the _amountOut
        // which already has fees debited and was swapped
        uint256 liquidityFee = _muldiv(_args.amount, (denom - s.LIQUIDITY_FEE_NUMERATOR), denom);

        (bool success, bytes memory data) = address(s.sponsorVault).call(
          abi.encodeWithSelector(s.sponsorVault.reimburseLiquidityFees.selector, _asset, liquidityFee, _args.params.to)
        );

        if (success) {
          uint256 sponsored = abi.decode(data, (uint256));

          // Validate correct amounts are transferred
          if (IERC20(_asset).balanceOf(address(this)) != starting + sponsored) {
            revert BridgeFacet__handleExecuteTransaction_invalidSponsoredAmount();
          }

          _amountOut += sponsored;
        }
      }

      // Should dust the recipient with the lesser of a vault-defined cap or the converted relayer fee
      // If there is no conversion available (i.e. no oracles for origin domain asset <> dest asset pair),
      // then the vault should just pay out the configured constant
      address(s.sponsorVault).call(
        abi.encodeWithSelector(
          s.sponsorVault.reimburseRelayerFees.selector,
          _args.params.originDomain,
          payable(_args.params.to),
          _args.params.relayerFee
        )
      );
    }

    // execute the the transaction
    if (keccak256(_args.params.callData) == EMPTY_HASH) {
      // no call data, send funds to the user
      AssetLogic.handleOutgoingAsset(_asset, _args.params.to, _amountOut);
    } else {
      // execute calldata w/funds
      AssetLogic.handleOutgoingAsset(_asset, address(s.executor), _amountOut);

      (bool success, bytes memory returnData) = s.executor.execute(
        IExecutor.ExecutorArgs(
          _transferId,
          _amountOut,
          _args.params.to,
          _args.params.recovery,
          _asset,
          _reconciled ? _args.originSender : address(0),
          _reconciled ? _args.params.originDomain : uint32(0),
          _args.params.callData
        )
      );

      // If callback address is not zero, send on the PromiseRouter
      if (_args.params.callback != address(0)) {
        s.promiseRouter.send(_args.params.originDomain, _transferId, _args.params.callback, success, returnData);
      }
    }

    return _amountOut;
  }

  /**
   * @notice Uses Aave Portals to provide fast liquidity
   */
  function _executePortalTransfer(
    bytes32 _transferId,
    bytes32 _key,
    uint256 _fastTransferAmount,
    address _router
  ) internal returns (uint256, address) {
    // Calculate local to adopted swap output if needed
    address adopted = s.canonicalToAdopted[_key];

    IAavePool(s.aavePool).mintUnbacked(adopted, _fastTransferAmount, address(this), AAVE_REFERRAL_CODE);

    // Improvement: Instead of withdrawing to address(this), withdraw directly to the user or executor to save 1 transfer
    uint256 amountWithdrawn = IAavePool(s.aavePool).withdraw(adopted, _fastTransferAmount, address(this));

    if (amountWithdrawn < _fastTransferAmount) revert BridgeFacet__executePortalTransfer_insufficientAmountWithdrawn();

    // Store principle debt
    s.portalDebt[_transferId] = _fastTransferAmount;

    // Store fee debt
    s.portalFeeDebt[_transferId] = (s.aavePortalFeeNumerator * _fastTransferAmount) / BPS_FEE_DENOMINATOR;

    emit AavePortalMintUnbacked(_transferId, _router, adopted, _fastTransferAmount);

    return (_fastTransferAmount, adopted);
  }

  // BRIDGE ROUTER FUNCTIONS
  /**
   * @notice Handles an incoming message
   * @param _origin The origin domain
   * @param _nonce The unique identifier for the message from origin to
   *        destination
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
    // handle message based on the intended action
    if (_action.isTransfer()) {
      _handleTransfer(_origin, _nonce, _tokenId, _action);
    } else if (_action.isTransferToHook()) {
      _handleTransferToHook(_origin, _nonce, _tokenId, _action);
    } else {
      require(false, "!valid action");
    }
  }

  // ======== External: Send Token =========

  /**
   * @notice Send tokens to a recipient on a remote chain
   * @param _token The token address
   * @param _amount The token amount
   * @param _destination The destination domain
   * @param _recipient The recipient address
   */
  function send(
    address _token,
    uint256 _amount,
    uint32 _destination,
    bytes32 _recipient,
    bool /*_enableFast - deprecated field, left argument for backwards compatibility */
  ) external {
    // validate inputs
    require(_recipient != bytes32(0), "!recip");
    // get the token id
    (bytes29 _tokenId, bytes32 _detailsHash, bool _isLocal) = _getTokenIdAndDetailsHash(_token);
    // debit tokens from the sender
    _takeTokens(_token, _amount, _isLocal);
    // format Transfer message
    bytes29 _action = BridgeMessage.formatTransfer(_recipient, _amount, _detailsHash);
    // send message to destination chain bridge router
    _sendTransferMessage(_destination, _tokenId, _action);
    // emit Send event to record token sender
    emit Send(_token, msg.sender, _destination, _recipient, _amount, false);
  }

  /**
   * @notice Send tokens to a hook on the remote chain
   * @param _token The token address
   * @param _amount The token amount
   * @param _destination The destination domain
   * @param _remoteHook The hook contract on the remote chain
   * @param _extraData Extra data that will be passed to the hook for
   *        execution
   */
  function sendToHook(
    address _token,
    uint256 _amount,
    uint32 _destination,
    bytes32 _remoteHook,
    bytes calldata _extraData
  ) external returns (bytes32) {
    // get the token id
    (bytes29 _tokenId, bytes32 _detailsHash, bool _isLocal) = _getTokenIdAndDetailsHash(_token);
    // debit tokens from the sender
    _takeTokens(_token, _amount, _isLocal);
    // format Hook transfer message
    bytes29 _action = BridgeMessage.formatTransferToHook(
      _remoteHook,
      _amount,
      _detailsHash,
      TypeCasts.addressToBytes32(msg.sender),
      _extraData
    );
    // send message to destination chain bridge router
    bytes32 _messageHash = _sendTransferMessage(_destination, _tokenId, _action);
    // emit Send event to record token sender
    emit Send(_token, msg.sender, _destination, _remoteHook, _amount, true);
    return _messageHash;
  }

  // ======== External: Custom Tokens =========

  /**
   * @notice Enroll a custom token. This allows projects to work with
   *         governance to specify a custom representation.
   * @param _domain the domain of the canonical Token to enroll
   * @param _id the bytes32 ID of the canonical of the Token to enroll
   * @param _custom the address of the custom implementation to use.
   */
  function enrollCustom(
    uint32 _domain,
    bytes32 _id,
    address _custom
  ) external onlyOwner {
    // Sanity check. Ensures that human error doesn't cause an
    // unpermissioned contract to be enrolled.
    IBridgeToken(_custom).mint(address(this), 1);
    IBridgeToken(_custom).burn(address(this), 1);
    s.tokenRegistry.enrollCustom(_domain, _id, _custom);
  }

  /**
   * @notice Migrate all tokens in a previous representation to the latest
   *         custom representation. This works by looking up local mappings
   *         and then burning old tokens and minting new tokens.
   * @dev This is explicitly opt-in to allow dapps to decide when and how to
   *      upgrade to the new representation.
   * @param _oldRepr The address of the old token to migrate
   */
  function migrate(address _oldRepr) external {
    address _currentRepr = s.tokenRegistry.oldReprToCurrentRepr(_oldRepr);
    require(_currentRepr != _oldRepr, "!different");
    // burn the total balance of old tokens & mint the new ones
    IBridgeToken _old = IBridgeToken(_oldRepr);
    uint256 _bal = _old.balanceOf(msg.sender);
    _old.burn(msg.sender, _bal);
    IBridgeToken(_currentRepr).mint(msg.sender, _bal);
  }

  // ============ Internal: Send ============

  /**
   * @notice Take from msg.sender as part of sending tokens across chains
   * @dev Locks canonical tokens in escrow in BridgeRouter
   *      OR Burns representation tokens
   * @param _token The token to pull from the sender
   * @param _amount The amount to pull from the sender
   * @param _isLocal Whether or not the token is locally originating
   */
  function _takeTokens(
    address _token,
    uint256 _amount,
    bool _isLocal
  ) internal {
    // Exit early if the _amount is 0
    if (_amount == 0) {
      return;
    }
    // Setup vars used in both if branches
    IBridgeToken _t = IBridgeToken(_token);
    // remove tokens from circulation on this chain
    if (_isLocal) {
      // if the token originates on this chain,
      // hold the tokens in escrow in the Router
      IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);
    } else {
      // if the token originates on a remote chain,
      // burn the representation tokens on this chain
      _t.burn(msg.sender, _amount);
    }
  }

  /**
   * @notice Returns the token id for a given _token
   * @param _token The token to pull ID for
   * @return _tokenId the bytes canonical token identifier
   * @return _detailsHash the hash of the canonical token details (name,
   *         symbol, decimal)
   */
  function _getTokenIdAndDetailsHash(address _token)
    internal
    returns (
      bytes29 _tokenId,
      bytes32 _detailsHash,
      bool _isLocal
    )
  {
    // get the tokenID
    (uint32 _domain, bytes32 _id) = s.tokenRegistry.getTokenId(_token);
    _tokenId = BridgeMessage.formatTokenId(_domain, _id);
    // handle the 0-case
    if (_token == address(0)) {
      _detailsHash = bytes32(0);
      _isLocal = false;
      return (_tokenId, _detailsHash, _isLocal);
    }
    // Setup vars used in both if branches
    IBridgeToken _t = IBridgeToken(_token);
    // get the details hash
    if (s.tokenRegistry.isLocalOrigin(_token)) {
      // query token contract for details and calculate detailsHash
      _detailsHash = BridgeMessage.getDetailsHash(_t.name(), _t.symbol(), _t.decimals());
      _isLocal = true;
    } else {
      _detailsHash = _t.detailsHash();
      _isLocal = false;
    }
  }

  /**
   * @notice Dispatch a message via Nomad to a destination domain
   *         addressed to the remote BridgeRouter on that chain
   * @dev Message will trigger `handle` method on the remote BridgeRouter
   *      when it is received on the destination chain
   * @param _destination The domain of the destination chain
   * @param _tokenId The canonical token identifier for the transfer message
   * @param _action The contents of the transfer message
   */
  function _sendTransferMessage(
    uint32 _destination,
    bytes29 _tokenId,
    bytes29 _action
  ) internal returns (bytes32) {
    // get remote BridgeRouter address; revert if not found
    bytes32 _remote = _mustHaveRemote(_destination);
    // send message to remote chain via Nomad
    return
      IOutbox(xAppConnectionManager.home()).dispatch(
        _destination,
        _remote,
        BridgeMessage.formatMessage(_tokenId, _action)
      );
  }

  // ============ Internal: Handle ============

  /**
   * @notice Handles an incoming Transfer message.
   *
   * If the token is of local origin, the amount is sent from escrow.
   * Otherwise, a representation token is minted.
   *
   * @param _origin The domain of the chain from which the transfer originated
   * @param _nonce The unique identifier for the message from origin to
   *        destination
   * @param _tokenId The token ID
   * @param _action The action
   */
  function _handleTransfer(
    uint32 _origin,
    uint32 _nonce,
    bytes29 _tokenId,
    bytes29 _action
  ) internal {
    // tokens will be sent to the specified recipient
    address _recipient = _action.evmRecipient();
    // send tokens
    _giveTokens(_origin, _nonce, _tokenId, _action, _recipient);
    // dust the recipient with gas tokens
    _dust(_recipient);
  }

  /**
   * @notice Handles an incoming TransferToHook message.
   *
   * @dev The hook is called AFTER tokens have been transferred to the hook
   *      contract. If this hook errors, the bridge WILL NOT revert, and the
   *      hook contract will own those tokens. Hook contracts MUST have a
   *      recovery plan in place for these situations.
   *
   * @param _origin The domain of the chain from which the transfer originated
   * @param _nonce The unique identifier for the message from origin to destination
   * @param _tokenId The token ID
   * @param _action The action
   */
  function _handleTransferToHook(
    uint32 _origin,
    uint32 _nonce,
    bytes29 _tokenId,
    bytes29 _action
  ) internal {
    // tokens will be sent to user-specified hook
    address _hook = _action.evmHook();
    // send tokens
    address _token = _giveTokens(_origin, _nonce, _tokenId, _action, _hook);
    // NOTE: in the case of 0-value transfers, the token will be empty
    // ABI-encode the calldata for a `Hook.onRecive` call
    bytes memory _call = abi.encodeWithSelector(
      IBridgeHook.onReceive.selector,
      _origin,
      _action.sender(),
      _tokenId.domain(),
      _tokenId.id(),
      _token,
      _action.amnt(),
      _action.extraData().clone()
    );
    // Call the hook with the ABI-encoded payload
    // We use a low-level call here so that solc will skip pre-call
    // and post-call checks. Specifically we want to skip
    // 1. pre-flight extcode check
    // 2. post-flight success check
    // We do this so that the hook contract need not exist, and need
    // not execute succesfully
    _hook.call(_call);
  }

  /**
   * @notice Send tokens to a specified recipient.
   * @dev Unlocks canonical tokens from escrow in BridgeRouter
   *      OR Mints representation tokens
   * @param _origin The domain of the chain from which the transfer originated
   * @param _nonce The unique identifier for the message from origin to
   *        destination
   * @param _tokenId The canonical token identifier to credit
   * @param _action The contents of the transfer message
   * @param _recipient The recipient that will receive tokens
   * @return _token The address of the local token contract
   */
  function _giveTokens(
    uint32 _origin,
    uint32 _nonce,
    bytes29 _tokenId,
    bytes29 _action,
    address _recipient
  ) internal returns (address _token) {
    // get the token contract for the given tokenId on this chain;
    // (if the token is of remote origin and there is
    // no existing representation token contract, the TokenRegistry will
    // deploy a new one)
    _token = s.tokenRegistry.ensureLocalToken(_tokenId.domain(), _tokenId.id());
    // load amount once
    uint256 _amount = _action.amnt();
    if (_amount == 0) {
      // emit receive event
      emit Receive(_originAndNonce(_origin, _nonce), _token, _recipient, address(0), _amount);
      // exit early
      return _token;
    }
    // send the tokens into circulation on this chain
    if (s.tokenRegistry.isLocalOrigin(_token)) {
      // if the token is of local origin, the tokens have been held in
      // escrow in this contract
      // while they have been circulating on remote chains;
      // transfer the tokens to the recipient
      IERC20(_token).safeTransfer(_recipient, _amount);
    } else {
      // if the token is of remote origin, mint the tokens to the
      // recipient on this chain
      IBridgeToken(_token).mint(_recipient, _amount);
      // Tell the token what its detailsHash is
      IBridgeToken(_token).setDetailsHash(_action.detailsHash());
    }
    // emit Receive event
    emit Receive(_originAndNonce(_origin, _nonce), _token, _recipient, address(0), _amount);
  }

  // ============ Internal: Dust with Gas ============

  /**
   * @notice Dust the recipient. This feature allows chain operators to use
   * the Bridge as a faucet if so desired. Any gas asset held by the
   * bridge will be slowly sent to users who need initial gas bootstrapping
   * @dev Does not dust if insufficient funds, or if user has funds already
   */
  function _dust(address _recipient) internal {
    if (_recipient.balance < DUST_AMOUNT && address(this).balance >= DUST_AMOUNT) {
      // `send` gives execution 2300 gas and returns a `success` boolean.
      // however, we do not care if the call fails. A failed call
      // indicates a smart contract attempting to execute logic, which we
      // specifically do not want.
      // While we could check EXTCODESIZE, it seems sufficient to rely on
      // the 2300 gas stipend to ensure that no state change logic can
      // be executed.
      payable(_recipient).send(DUST_AMOUNT);
    }
  }

  // ============ Internal: Utils ============

  /**
     * @notice Internal utility function that combines
     *         `_origin` and `_nonce`.
     * @dev Both origin and nonce should be less than 2^32 - 1
     * @param _origin Domain of chain where the transfer originated
     * @param _nonce The unique identifier for the message from origin to
              destination
     * @return Returns (`_origin` << 32) & `_nonce`
     */
  function _originAndNonce(uint32 _origin, uint32 _nonce) internal pure returns (uint64) {
    return (uint64(_origin) << 32) | _nonce;
  }

  // ============ XAppConnectionManager functions ============
  // ============ External functions ============

  /**
   * @notice Modify the contract the xApp uses to validate Replica contracts
   * @param _xAppConnectionManager The address of the xAppConnectionManager contract
   */
  function setXAppConnectionManager(address _xAppConnectionManager) external onlyOwner {
    s.xAppConnectionManager = IConnectorManager(_xAppConnectionManager);
  }

  // ============ Internal functions ============

  /**
   * @notice Get the local Home contract from the xAppConnectionManager
   * @return The local Home contract
   */
  function _home() internal view returns (IOutbox) {
    return s.xAppConnectionManager.home();
  }

  /**
   * @notice Determine whether _potentialReplica is an enrolled Replica from the xAppConnectionManager
   * @return True if _potentialReplica is an enrolled Replica
   */
  function _isReplica(address _potentialReplica) internal view returns (bool) {
    return s.xAppConnectionManager.isReplica(_potentialReplica);
  }

  /**
   * @notice Get the local domain from the xAppConnectionManager
   * @return The local domain
   */
  function _localDomain() internal view virtual returns (uint32) {
    return s.xAppConnectionManager.localDomain();
  }
}
