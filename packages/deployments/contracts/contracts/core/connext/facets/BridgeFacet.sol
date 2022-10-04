// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {ExcessivelySafeCall} from "../../../shared/libraries/ExcessivelySafeCall.sol";
import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";
import {TypeCasts} from "../../../shared/libraries/TypeCasts.sol";
import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";

import {IOutbox} from "../../../messaging/interfaces/IOutbox.sol";
import {IConnectorManager} from "../../../messaging/interfaces/IConnectorManager.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

import {AssetLogic} from "../libraries/AssetLogic.sol";
import {ExecuteArgs, TransferInfo, TokenId, DestinationTransferStatus} from "../libraries/LibConnextStorage.sol";
import {BridgeMessage} from "../libraries/BridgeMessage.sol";

import {IXReceiver} from "../interfaces/IXReceiver.sol";
import {IAavePool} from "../interfaces/IAavePool.sol";
import {IBridgeToken} from "../interfaces/IBridgeToken.sol";

contract BridgeFacet is BaseConnextFacet {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using BridgeMessage for bytes29;
  using SafeERC20 for IERC20;

  // ========== Custom Errors ===========

  error BridgeFacet__addRemote_invalidDomain();
  error BridgeFacet__onlyDelegate_notDelegate();
  error BridgeFacet__addSequencer_alreadyApproved();
  error BridgeFacet__removeSequencer_notApproved();
  error BridgeFacet__xcall_nativeAssetNotSupported();
  error BridgeFacet__xcall_emptyTo();
  error BridgeFacet__xcall_notSupportedAsset();
  error BridgeFacet__xcall_invalidSlippage();
  error BridgeFacet__xcall_canonicalAssetNotReceived();
  error BridgeFacet__xcall_capReached();
  error BridgeFacet__execute_unapprovedSender();
  error BridgeFacet__execute_wrongDomain();
  error BridgeFacet__execute_notSupportedSequencer();
  error BridgeFacet__execute_invalidSequencerSignature();
  error BridgeFacet__execute_maxRoutersExceeded();
  error BridgeFacet__execute_notSupportedRouter();
  error BridgeFacet__execute_invalidRouterSignature();
  error BridgeFacet__execute_badFastLiquidityStatus();
  error BridgeFacet__execute_notReconciled();
  error BridgeFacet__withdrawRouterLiquidity_insufficientFastLiquidity(address router);
  error BridgeFacet__withdrawPortalLiquidity_insufficientAmountWithdrawn();
  error BridgeFacet__bumpTransfer_valueIsZero();
  error BridgeFacet__bumpTransfer_noRelayerVault();
  error BridgeFacet__forceUpdateSlippage_invalidSlippage();
  error BridgeFacet__forceUpdateSlippage_notDestination();
  error BridgeFacet__mustHaveRemote_destinationNotSupported();

  // ============ Properties ============

  uint16 public constant AAVE_REFERRAL_CODE = 0;

  // ============ Events ============

  /**
   * @notice Emitted when `xcall` is called on the origin domain of a transfer.
   * @param transferId - The unique identifier of the crosschain transfer.
   * @param nonce - The bridge nonce of the transfer on the origin domain.
   * @param messageHash - The hash of the message bytes (containing all transfer info) that were bridged.
   * @param params - The `TransferInfo` provided to the function.
   * @param asset - The asset sent in with xcall
   * @param amount - The amount sent in with xcall
   */
  event XCalled(
    bytes32 indexed transferId,
    uint256 indexed nonce,
    bytes32 indexed messageHash,
    TransferInfo params,
    address asset,
    uint256 amount
  );

  /**
   * @notice Emitted when a transfer has its external data executed
   * @param transferId - The unique identifier of the crosschain transfer.
   * @param success - Whether calldata succeeded
   * @param returnData - Return bytes from the IXReceiver
   */
  event ExternalCalldataExecuted(bytes32 indexed transferId, bool success, bytes returnData);

  /**
   * @notice Emitted when `execute` is called on the destination domain of a transfer.
   * @dev `execute` may be called when providing fast liquidity or when processing a reconciled (slow) transfer.
   * @param transferId - The unique identifier of the crosschain transfer.
   * @param to - The recipient `TransferInfo.to` provided, created as indexed parameter.
   * @param asset - The asset the recipient is given or the external call is executed with. Should be the
   * adopted asset on that chain.
   * @param args - The `ExecuteArgs` provided to the function.
   * @param local - The local asset that was either supplied by the router for a fast-liquidity transfer or
   * minted by the bridge in a reconciled (slow) transfer. Could be the same as the adopted `asset` param.
   * @param amount - The amount of transferring asset the recipient address receives or the external call is
   * executed with.
   * @param caller - The account that called the function.
   */
  event Executed(
    bytes32 indexed transferId,
    address indexed to,
    address indexed asset,
    ExecuteArgs args,
    address local,
    uint256 amount,
    address caller
  );

  /**
   * @notice Emitted when `_bumpTransfer` is called by an user on the origin domain both in
   * `xcall` and `bumpTransfer`
   * @param transferId - The unique identifier of the crosschain transaction
   * @param increase - The additional amount fees increased by
   * @param caller - The account that called the function
   */
  event TransferRelayerFeesIncreased(bytes32 indexed transferId, uint256 increase, address caller);

  /**
   * @notice Emitted when `forceUpdateSlippage` is called by an user on the destination domain
   * @param transferId - The unique identifier of the crosschain transaction
   * @param slippage - The updated slippage boundary
   */
  event SlippageUpdated(bytes32 indexed transferId, uint256 slippage);

  /**
   * @notice Emitted when a router used Aave Portal liquidity for fast transfer
   * @param transferId - The unique identifier of the crosschain transaction
   * @param router - The authorized router that used Aave Portal liquidity
   * @param asset - The asset that was provided by Aave Portal
   * @param amount - The amount of asset that was provided by Aave Portal
   */
  event AavePortalMintUnbacked(bytes32 indexed transferId, address indexed router, address asset, uint256 amount);

  /**
   * @notice Emitted when a new remote instance is added
   * @param domain - The domain the remote instance is on
   * @param remote - The address of the remote instance
   * @param caller - The account that called the function
   */
  event RemoteAdded(uint32 domain, address remote, address caller);

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

  // ============ Modifiers ============

  /**
   * @notice Only accept a transfer's designated delegate.
   * @param _params The TransferInfo of the transfer.
   */
  modifier onlyDelegate(TransferInfo calldata _params) {
    if (_params.delegate != msg.sender) revert BridgeFacet__onlyDelegate_notDelegate();
    _;
  }

  // ============ Getters ============

  function routedTransfers(bytes32 _transferId) public view returns (address[] memory) {
    return s.routedTransfers[_transferId];
  }

  function transferStatus(bytes32 _transferId) public view returns (DestinationTransferStatus) {
    return s.transferStatus[_transferId];
  }

  function remote(uint32 _domain) public view returns (address) {
    return TypeCasts.bytes32ToAddress(s.remotes[_domain]);
  }

  function domain() public view returns (uint32) {
    return s.domain;
  }

  function nonce() public view returns (uint256) {
    return s.nonce;
  }

  function approvedSequencers(address _sequencer) external view returns (bool) {
    return s.approvedSequencers[_sequencer];
  }

  function xAppConnectionManager() public view returns (address) {
    return address(s.xAppConnectionManager);
  }

  // ============ Admin Functions ==============

  /**
   * @notice Used to add an approved sequencer to the whitelist.
   * @param _sequencer - The sequencer address to add.
   */
  function addSequencer(address _sequencer) external onlyOwnerOrAdmin {
    if (s.approvedSequencers[_sequencer]) revert BridgeFacet__addSequencer_alreadyApproved();
    s.approvedSequencers[_sequencer] = true;

    emit SequencerAdded(_sequencer, msg.sender);
  }

  /**
   * @notice Used to remove an approved sequencer from the whitelist.
   * @param _sequencer - The sequencer address to remove.
   */
  function removeSequencer(address _sequencer) external onlyOwnerOrAdmin {
    if (!s.approvedSequencers[_sequencer]) revert BridgeFacet__removeSequencer_notApproved();
    delete s.approvedSequencers[_sequencer];

    emit SequencerRemoved(_sequencer, msg.sender);
  }

  /**
   * @notice Modify the contract the xApp uses to validate Replica contracts
   * @param _xAppConnectionManager The address of the xAppConnectionManager contract
   */
  function setXAppConnectionManager(address _xAppConnectionManager) external onlyOwnerOrAdmin {
    s.xAppConnectionManager = IConnectorManager(_xAppConnectionManager);
  }

  /**
   * @notice Register the address of a Router contract for the same xApp on a remote chain
   * @param _domain The domain of the remote xApp Router
   * @param _router The address of the remote xApp Router
   */
  function enrollRemoteRouter(uint32 _domain, bytes32 _router) external onlyOwnerOrAdmin {
    // Make sure we aren't setting the current domain as the connextion.
    if (_domain == s.domain) {
      revert BridgeFacet__addRemote_invalidDomain();
    }
    s.remotes[_domain] = _router;
    emit RemoteAdded(_domain, TypeCasts.bytes32ToAddress(_router), msg.sender);
  }

  // ============ Public Functions: Bridge ==============

  function xcall(
    uint32 _destination,
    address _to,
    address _asset,
    address _delegate,
    uint256 _amount,
    uint256 _slippage,
    bytes calldata _callData
  ) external payable returns (bytes32) {
    // NOTE: Here, we fill in as much information as we can for the TransferInfo.
    // Some info is left blank and will be assigned in the internal `_xcall` function (e.g.
    // `normalizedIn`, `bridgedAmt`, canonical info, etc).
    TransferInfo memory params = TransferInfo({
      to: _to,
      callData: _callData,
      originDomain: s.domain,
      destinationDomain: _destination,
      delegate: _delegate,
      // `receiveLocal: false` indicates we should always deliver the adopted asset on the
      // destination chain, swapping from the local asset if needed.
      receiveLocal: false,
      slippage: _slippage,
      originSender: msg.sender,
      // The following values should be assigned in _xcall.
      nonce: 0,
      canonicalDomain: 0,
      bridgedAmt: 0,
      normalizedIn: 0,
      canonicalId: bytes32(0)
    });
    return _xcall(params, _asset, _amount);
  }

  function xcallIntoLocal(
    uint32 _destination,
    address _to,
    address _asset,
    address _delegate,
    uint256 _amount,
    uint256 _slippage,
    bytes calldata _callData
  ) external payable returns (bytes32) {
    // NOTE: Here, we fill in as much information as we can for the TransferInfo.
    // Some info is left blank and will be assigned in the internal `_xcall` function (e.g.
    // `normalizedIn`, `bridgedAmt`, canonical info, etc).
    TransferInfo memory params = TransferInfo({
      to: _to,
      callData: _callData,
      originDomain: s.domain,
      destinationDomain: _destination,
      delegate: _delegate,
      // `receiveLocal: true` indicates we should always deliver the local asset on the
      // destination chain, and NOT swap into any adopted assets.
      receiveLocal: true,
      slippage: _slippage,
      originSender: msg.sender,
      // The following values should be assigned in _xcall.
      nonce: 0,
      canonicalDomain: 0,
      bridgedAmt: 0,
      normalizedIn: 0,
      canonicalId: bytes32(0)
    });
    return _xcall(params, _asset, _amount);
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
    bytes32 transferId;
    DestinationTransferStatus status;
    // Path length refers to the number of facilitating routers. A transfer is considered 'multipath'
    // if multiple routers provide liquidity (in even 'shares') for it.
    uint256 pathLength = _args.routers.length;
    // If the path is empty, this MUST be a reconciled transfer.
    // NOTE: A check exists below to assert that the current transfer status reflects this.
    bool wasReconciled = pathLength == 0;

    /// 1. Sanity and permissions checks.
    {
      // If the sender is not an approved relayer, revert.
      if (!s.approvedRelayers[msg.sender] && msg.sender != _args.params.delegate) {
        revert BridgeFacet__execute_unapprovedSender();
      }

      // If this is not the destination domain, revert.
      if (_args.params.destinationDomain != s.domain) {
        revert BridgeFacet__execute_wrongDomain();
      }

      // Derive transfer ID based on given arguments.
      transferId = _calculateTransferId(_args.params);

      // Retrieve the transfer status record. This will be empty (DestinationTransferStatus.None) in the
      // event of a fast-liquidity transfer, and DestinationTransferStatus.Reconciled in the event of
      // a slow-liquidity transfer.
      status = s.transferStatus[transferId];

      if (!wasReconciled) {
        // Make sure number of routers is below the configured maximum.
        if (pathLength > s.maxRoutersPerTransfer) revert BridgeFacet__execute_maxRoutersExceeded();

        // Check to make sure the transfer has not been reconciled (no need for routers if the transfer is
        // already reconciled; i.e. if there are routers provided, the transfer must *not* be reconciled).
        if (status != DestinationTransferStatus.None) revert BridgeFacet__execute_badFastLiquidityStatus();

        // NOTE: The sequencer address may be empty and no signature needs to be provided in the case of the
        // slow liquidity route (i.e. no routers involved).
        // NOTE: Additionally, the sequencer does NOT need to be the msg.sender: that would be the relayer.
        // Check to make sure the sequencer address provided is approved
        if (!s.approvedSequencers[_args.sequencer]) {
          revert BridgeFacet__execute_notSupportedSequencer();
        }
        // Check to make sure the sequencer provided did sign the transfer ID and router path provided.
        if (
          _args.sequencer !=
          _recoverSignature(keccak256(abi.encode(transferId, _args.routers)), _args.sequencerSignature)
        ) {
          revert BridgeFacet__execute_invalidSequencerSignature();
        }

        // Hash the payload for which each router should have produced a signature.
        // Each router should have signed the `transferId` (which implicitly signs call params,
        // amount, and tokenId) as well as the `pathLength`, or the number of routers with which
        // they are splitting liquidity provision.
        bytes32 routerHash = keccak256(abi.encode(transferId, pathLength));

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
      } else if (status != DestinationTransferStatus.Reconciled) {
        // If there are no routers for this transfer, this `execute` must be using slow-liquidity route; in
        // which case, the transfer MUST have been reconciled. If it wasn't, we should revert.
        revert BridgeFacet__execute_notReconciled();
      }
    }

    /// 2. Update status of the destination transfer and record it.
    // NOTE: Status flow for the transfer state machine:
    // reconciled -> executed -> completed
    // executed -> reconciled -> completed
    status = wasReconciled ? DestinationTransferStatus.Completed : DestinationTransferStatus.Executed;
    // Save the updated transfer status.
    s.transferStatus[transferId] = status;

    /// 3. Get asset information needed to handle transfer.
    // TODO: Would be more efficient if we avoid all these calls in the event of a 0-value transfer...
    // Get the canonical key for the asset we're transferring.
    bytes32 key = AssetLogic.calculateCanonicalHash(_args.params.canonicalId, _args.params.canonicalDomain);
    // Get the local asset contract address.
    address local = _getLocalAsset(key, _args.params.canonicalId, _args.params.canonicalDomain);
    // Delivered asset; local is default; if there's an adopted asset to be set, it should be in the block below.
    address assetOut = _args.params.receiveLocal ? local : _getAdoptedAsset(key);
    // The initial amountOut; this might change in the block below.
    uint256 amountOut = _args.params.bridgedAmt;

    /// 4. Source assets intended for recipient.
    // NOTE: If this is a zero-value transfer (i.e. `bridgedAmt` is 0), no need to handle liquidity here.
    if (amountOut != 0) {
      if (!wasReconciled) {
        // NOTE: This is the fast-liquidity path.
        // Fee deduction: calculate amount that routers will provide with the fast-liquidity fee deducted.
        amountOut = _muldiv(_args.params.bridgedAmt, s.LIQUIDITY_FEE_NUMERATOR, BPS_FEE_DENOMINATOR);
        // Deduct liquidity from applicable router accounts.
        _withdrawRouterLiquidity(transferId, _args.routers, local, assetOut, amountOut);
        // Save the addresses of all the routers providing liquidity for this transfer. This will be used to reimburse
        // them on reconcile.
        s.routedTransfers[transferId] = _args.routers;
      }
      // NOTE: If this is a slow-liquidity path (i.e. the transfer `wasReconciled`), the funds would have been minted
      // if needed and custodied in this contract. The exact custodied amount is untracked in state (since the amount
      // is hashed in the transfer ID itself) - thus, no updates are required here to handle accounting in that case.

      // If the local asset is specified, or the adopted asset was overridden (e.g. when user facing slippage
      // conditions outside of their boundaries), continue without swapping.
      // NOTE: In the event that `receiveLocal` is true, assetOut == local.
      if (assetOut != local) {
        // Check to see if there's an updated max slippage setting.
        uint256 slippageOverride = s.slippage[transferId];

        // Swap out of representational asset into adopted asset.
        amountOut = AssetLogic.swapFromLocalAsset(
          key,
          local,
          assetOut,
          amountOut,
          slippageOverride != 0 ? slippageOverride : _args.params.slippage,
          _args.params.normalizedIn
        );
      }
    }

    /// 5. Deliver funds to the intended recipient, and execute the transaction using the designated calldata,
    // if applicable.
    // Transfer funds to recipient.
    if (amountOut != 0) {
      AssetLogic.handleOutgoingAsset(assetOut, _args.params.to, amountOut);
    }
    // Execute external calldata.
    _executeCalldata(transferId, assetOut, amountOut, wasReconciled, _args.params);

    emit Executed(transferId, _args.params.to, assetOut, _args, local, amountOut, msg.sender);
    return transferId;
  }

  /**
   * @notice Anyone can call this function on the origin domain to increase the relayer fee for a transfer.
   * @param _transferId - The unique identifier of the crosschain transaction
   */
  function bumpTransfer(bytes32 _transferId) external payable nonReentrant whenNotPaused {
    if (msg.value == 0) revert BridgeFacet__bumpTransfer_valueIsZero();
    _bumpTransfer(_transferId);
  }

  function _bumpTransfer(bytes32 _transferId) internal {
    address relayerVault = s.relayerFeeVault;
    if (relayerVault == address(0)) revert BridgeFacet__bumpTransfer_noRelayerVault();
    Address.sendValue(payable(relayerVault), msg.value);

    emit TransferRelayerFeesIncreased(_transferId, msg.value, msg.sender);
  }

  /**
   * @notice Allows a user-specified account to update the slippage they are willing
   * to take on destination transfers.
   *
   * @param _params TransferInfo associated with the transfer
   * @param _slippage The updated slippage
   */
  function forceUpdateSlippage(TransferInfo calldata _params, uint256 _slippage) external onlyDelegate(_params) {
    // Sanity check slippage
    if (_slippage > BPS_FEE_DENOMINATOR) {
      revert BridgeFacet__forceUpdateSlippage_invalidSlippage();
    }

    // Should only be called on destination domain
    if (_params.destinationDomain != s.domain) {
      revert BridgeFacet__forceUpdateSlippage_notDestination();
    }

    // Get transferId
    bytes32 transferId = _calculateTransferId(_params);

    // Store overrides
    s.slippage[transferId] = _slippage;

    // Emit event
    emit SlippageUpdated(transferId, _slippage);
  }

  // ============ Internal: Bridge ============

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
   * @param _params - The TransferInfo arguments.
   * @return bytes32 - The transfer ID of the newly created crosschain transfer.
   */
  function _xcall(
    TransferInfo memory _params,
    address _asset,
    uint256 _amount
  ) internal whenNotPaused returns (bytes32) {
    // 1. Sanity and permissions checks.
    bytes32 remoteInstance;
    {
      // Not native asset.
      // NOTE: We support using address(0) as an intuitive default if you are sending a 0-value
      // transfer. In that edge case, address(0) will not be registered as a supported asset, but should
      // pass the `isLocalOrigin` check
      if (_asset == address(0) && _amount != 0) {
        revert BridgeFacet__xcall_nativeAssetNotSupported();
      }

      // Destination domain must be supported.
      // NOTE: This check implicitly also checks that `_params.destinationDomain != s.domain`, because the index
      // `s.domain` of `s.remotes` should always be `bytes32(0)`.
      remoteInstance = _mustHaveRemote(_params.destinationDomain);

      // Recipient must be defined.
      if (_params.to == address(0)) {
        revert BridgeFacet__xcall_emptyTo();
      }

      if (_params.slippage > BPS_FEE_DENOMINATOR) {
        revert BridgeFacet__xcall_invalidSlippage();
      }
    }

    // NOTE: The local asset will stay address(0) if input asset is address(0) in the event of a
    // 0-value transfer. Otherwise, the local address will be retrieved below.
    address local;
    bytes32 transferId;
    TokenId memory canonical;
    bool isCanonical;
    {
      // Check that the asset is supported -- can be either adopted or local.
      // NOTE: Above we check that you can only have `address(0)` as the input asset if this is a
      // 0-value transfer. Because 0-value transfers short-circuit all checks on mappings keyed on
      // hash(canonicalId, canonicalDomain), this is safe even when the address(0) asset is not
      // whitelisted.
      bytes32 key;
      if (_asset != address(0)) {
        // Retrieve the canonical token information.
        (canonical, key) = _getApprovedCanonicalId(_asset);

        // Get the local address
        local = _getLocalAsset(key, canonical.id, canonical.domain);

        // Set boolean flag
        isCanonical = _params.originDomain == canonical.domain && local == _asset;

        // Enforce liquidity caps
        // NOTE: safe to do this before the swap because canonical domains do
        // not hit the AMMs (local == canonical)
        if (isCanonical) {
          // NOTE: this method includes router liquidity as part of the caps,
          // not only the minted amount
          uint256 custodied = IERC20(local).balanceOf(address(this)) + _amount;
          uint256 cap = s.caps[key];
          if (cap > 0 && custodied > cap) {
            revert BridgeFacet__xcall_capReached();
          }
        }

        // Update TransferInfo to reflect the canonical token information.
        _params.canonicalDomain = canonical.domain;
        _params.canonicalId = canonical.id;
      }

      if (_amount > 0) {
        // Transfer funds of input asset to the contract from the user.
        AssetLogic.handleIncomingAsset(_asset, _amount);

        // Swap to the local asset from adopted if applicable.
        // TODO: drop the "IfNeeded", instead just check whether the asset is already local / needs swap here.
        _params.bridgedAmt = AssetLogic.swapToLocalAssetIfNeeded(key, _asset, local, _amount, _params.slippage);
      }

      // Get the normalized amount in (amount sent in by user in 18 decimals).
      _params.normalizedIn = _asset == address(0)
        ? 0 // we know from assertions above this is the case IFF amount == 0
        : AssetLogic.normalizeDecimals(ERC20(_asset).decimals(), uint8(18), _amount);

      // Calculate the transfer ID.
      transferId = _calculateTransferId(_params);
      _params.nonce = s.nonce++;
    }

    // Handle the relayer fee.
    // NOTE: This has to be done *after* transferring in + swapping assets because
    // the transfer id uses the amount that is bridged (i.e. amount in local asset).
    if (msg.value > 0) {
      _bumpTransfer(transferId);
    }

    // Send the crosschain message.
    bytes32 messageHash = _sendMessage(
      transferId,
      _params.destinationDomain,
      remoteInstance,
      canonical,
      local,
      _params.bridgedAmt,
      isCanonical
    );

    // emit event
    emit XCalled(transferId, _params.nonce, messageHash, _params, _asset, _amount);

    return transferId;
  }

  /**
   * @notice Safely executes external calldata.
   *
   * @dev If the transfer was reconciled (i.e. data is authenticated), external calls that would fail will do
   * so gracefully and not revert. This means that any applicable errors will be emitted in an event, but
   * the function itself will not revert.
   *
   * In the case where a transaction is *not* reconciled (i.e. data is unauthenticated), this external
   * call WILL revert. This allows all functions that rely on authenticated data (using a specific check
   * on the origin sender), to be forced into the slow path for execution to succeed.
   *
   * @param _transferId The transfer ID.
   * @param _asset Local asset address to deduct from routers' accounts.
   * @param _amount The amount of the given `_asset` to deliver to intended recipient.
   * @param _reconciled Whether the destination transfer has already been reconciled (i.e. slow-liquidity path).
   * @param _params The TransferInfo params to consult when formatting the external call.
   */
  function _executeCalldata(
    bytes32 _transferId,
    address _asset,
    uint256 _amount,
    bool _reconciled,
    TransferInfo calldata _params
  ) internal {
    // execute the calldata
    if (keccak256(_params.callData) == EMPTY_HASH) {
      // no call data, return amount out
      return;
    }

    bool success;
    bytes memory returnData;

    // See above devnote
    if (_reconciled) {
      // after this function executes:
      // - 2 events are emitted
      // - transfer id is returned
      // -> reserve 10K gas

      // FIXME: should the values used here be settable constants?

      // Use SafeCall here
      (success, returnData) = ExcessivelySafeCall.excessivelySafeCall(
        _params.to,
        gasleft() - 10_000,
        0, // native asset value (always 0)
        256, // only copy 256 bytes back as calldata
        abi.encodeWithSelector(
          IXReceiver.xReceive.selector,
          _transferId,
          _amount,
          _asset,
          _params.originSender, // use passed in value iff authenticated
          _params.originDomain,
          _params.callData
        )
      );
    } else {
      // use address(0) for origin sender on fast path
      returnData = IXReceiver(_params.to).xReceive(
        _transferId,
        _amount,
        _asset,
        address(0),
        _params.originDomain,
        _params.callData
      );
      success = true;
    }

    emit ExternalCalldataExecuted(_transferId, success, returnData);
  }

  // ============ Internal: Accounting ============

  /**
   * @notice Handle deducting liquidity from given routers' accounts for the specified asset. If there are
   * multiple routers in the path, debited amount will be divided up evenly between them.
   * @dev If a single router is in the path and the router doesn't have enough liquidity, we will try to
   * use Aave Portals to source the target asset.
   * @dev Reverts with convenient error if any one router does not have sufficient liquidity.
   *
   * @param transferId The transfer ID.
   * @param routers Path of routers from whose accounts we should deduct target funds.
   * @param local Local asset address to deduct from routers' accounts.
   * @param adopted The adopted asset address to try withdrawing from portals if router has insufficient
   * amount of local asset. If set to address(0), portals won't be used! Setting this value to local is
   * acceptable in the event that the local asset *is* the adopted asset and Aave Portals provides it.
   * @param total The amount that must be debited in total across all routers. Should be the amount AFTER
   * taking router fees, if applicable!
   */
  function _withdrawRouterLiquidity(
    bytes32 transferId,
    address[] calldata routers,
    address local,
    address adopted,
    uint256 total
  ) internal {
    uint256 pathLength = routers.length;
    if (pathLength == 1) {
      // NOTE: Separate handling for single-router path.
      address router = routers[0];
      uint256 routerLiquidity = s.routerBalances[router][local];

      // Check to see if router has enough liquidity.
      if (routerLiquidity < total) {
        // Decrement the target router's liquidity.
        unchecked {
          s.routerBalances[router][local] -= total;
        }
      } else if (
        adopted != address(0) && s.routerPermissionInfo.approvedForPortalRouters[router] && s.aavePool != address(0)
      ) {
        // If router does not have enough liquidity, and the router is approved for it, try to use Aave Portals.
        // NOTE: Only one router should be responsible for taking on this credit risk, and it should only deal
        // with transfers expecting adopted assets (to avoid introducing runtime slippage).

        // Portals deliver the adopted asset directly; return after portal execution is completed.
        _withdrawPortalLiquidity(transferId, router, adopted, total);
      } else {
        // Router did not have enough funds and was not approved for portals!
        revert BridgeFacet__withdrawRouterLiquidity_insufficientFastLiquidity(router);
      }
    } else {
      address router;
      uint256 routerLiquidity;
      // For each router, assert they are approved, and deduct liquidity.
      uint256 routerAmount = total / pathLength;
      for (uint256 i; i < pathLength - 1; ) {
        // Check to make sure router has sufficient liquidity.
        router = routers[i];
        routerLiquidity = s.routerBalances[router][local];
        if (routerLiquidity < routerAmount)
          revert BridgeFacet__withdrawRouterLiquidity_insufficientFastLiquidity(router);
        unchecked {
          // Decrement router's liquidity.
          s.routerBalances[router][local] = routerLiquidity - routerAmount;

          ++i;
        }
      }
      // The last router in the multipath will sweep the remaining balance to account for remainder dust.
      routerAmount = routerAmount + (total % pathLength);
      router = routers[pathLength - 1];
      routerLiquidity = s.routerBalances[router][local];
      if (routerLiquidity < routerAmount) revert BridgeFacet__withdrawRouterLiquidity_insufficientFastLiquidity(router);
      unchecked {
        // Decrement router's liquidity.
        s.routerBalances[router][local] = routerLiquidity - routerAmount;
      }
    }
  }

  /**
   * @notice Uses Aave Portals to provide fast liquidity via unbacked loans.
   * @dev Reverts if amount withdrawn from portals is not equal to the desired amount.
   *
   * @param transferId The transfer ID.
   * @param router The router who will take on the credit obligation.
   * @param adopted The adopted asset address to try withdrawing from the Aave pool.
   * @param amount The target amount we wish to loan from the Aave pool.
   */
  function _withdrawPortalLiquidity(
    bytes32 transferId,
    address router,
    address adopted,
    uint256 amount
  ) internal {
    IAavePool(s.aavePool).mintUnbacked(adopted, amount, address(this), AAVE_REFERRAL_CODE);

    // TODO: Instead of withdrawing to address(this), withdraw directly to the user or executor to save 1 transfer?
    uint256 amountWithdrawn = IAavePool(s.aavePool).withdraw(adopted, amount, address(this));

    if (amountWithdrawn != amount) revert BridgeFacet__withdrawPortalLiquidity_insufficientAmountWithdrawn();

    // Store principle debt.
    s.portalDebt[transferId] = amount;
    // Store fee debt.
    s.portalFeeDebt[transferId] = (s.aavePortalFeeNumerator * amount) / BPS_FEE_DENOMINATOR;

    emit AavePortalMintUnbacked(transferId, router, adopted, amount);
  }

  // ============ Internal: Messaging Layer ============

  /**
   * @notice Format and send transfer message to a remote chain.
   *
   * @param _transferId Unique identifier for the transfer.
   * @param _destination The destination domain.
   * @param _connextion The connext instance on the destination domain.
   * @param _canonical The canonical token ID/domain info.
   * @param _local The local token address.
   * @param _amount The token amount.
   * @param _isCanonical Whether or not the local token is the canonical asset (i.e. this is the token's
   * "home" chain).
   */
  function _sendMessage(
    bytes32 _transferId,
    uint32 _destination,
    bytes32 _connextion,
    TokenId memory _canonical,
    address _local,
    uint256 _amount,
    bool _isCanonical
  ) private returns (bytes32) {
    IBridgeToken _token = IBridgeToken(_local);

    // Get the formatted token ID
    bytes29 _tokenId = BridgeMessage.formatTokenId(_canonical.domain, _canonical.id);

    // Remove tokens from circulation on this chain if applicable.
    if (_amount > 0) {
      if (!_isCanonical) {
        // If the token originates on a remote chain, burn the representational tokens on this chain.
        _token.burn(address(this), _amount);
      }
      // IFF the token IS the canonical token (i.e. originates on this chain), we lock the input tokens in escrow
      // in this contract, as an equal amount of representational assets will be minted on the destination chain.
      // NOTE: The tokens should be in the contract already at this point from xcall.
    }

    // Format hook action.
    bytes29 _action = BridgeMessage.formatTransfer(_amount, _transferId);
    // Send message to destination chain bridge router.
    bytes32 _messageHash = IOutbox(s.xAppConnectionManager.home()).dispatch(
      _destination,
      _connextion,
      BridgeMessage.formatMessage(_tokenId, _action)
    );

    // return message hash
    return _messageHash;
  }

  /**
   * @notice Assert that the given domain has a xApp Router registered and return its address
   * @param _domain The domain of the chain for which to get the xApp Router
   * @return _remote The address of the remote xApp Router on _domain
   */
  function _mustHaveRemote(uint32 _domain) internal view returns (bytes32 _remote) {
    _remote = s.remotes[_domain];
    if (_remote == bytes32(0)) {
      revert BridgeFacet__mustHaveRemote_destinationNotSupported();
    }
  }

  // ============ Internal: Helpers ============

  /**
   * @notice Holds the logic to recover the signer from an encoded payload.
   * @dev Will hash and convert to an eth signed message.
   * @param _signed The hash that was signed.
   * @param _sig The signature from which we will recover the signer.
   */
  function _recoverSignature(bytes32 _signed, bytes calldata _sig) internal pure returns (address) {
    // Recover
    return ECDSA.recover(ECDSA.toEthSignedMessageHash(_signed), _sig);
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
}
