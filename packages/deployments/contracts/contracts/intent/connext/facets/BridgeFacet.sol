// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {ExcessivelySafeCall} from "../../../shared/libraries/ExcessivelySafeCall.sol";
import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";
import {TypeCasts} from "../../../shared/libraries/TypeCasts.sol";

import {IOutbox} from "../../../messaging/interfaces/IOutbox.sol";
import {IConnectorManager} from "../../../messaging/interfaces/IConnectorManager.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

import {AssetLogic} from "../libraries/AssetLogic.sol";
import {ExecuteArgs, TransferInfo, DestinationTransferStatus, TokenConfig} from "../libraries/LibConnextStorage.sol";
import {BridgeMessage} from "../libraries/BridgeMessage.sol";
import {Constants} from "../libraries/Constants.sol";
import {TokenId} from "../libraries/TokenId.sol";

import {IXReceiver} from "../interfaces/IXReceiver.sol";
import {IBridgeToken} from "../interfaces/IBridgeToken.sol";

/**
 * @notice Defines the fields needed for an asset transfer
 * @param asset - The address of the asset
 * @param amount - The amount of the asset
 */
struct AssetTransfer {
  address asset;
  uint256 amount;
}

contract BridgeFacet is BaseConnextFacet {
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using BridgeMessage for bytes29;
  using SafeERC20 for IERC20Metadata;

  // ========== Custom Errors ===========

  error BridgeFacet__addRemote_invalidRouter();
  error BridgeFacet__addRemote_invalidDomain();
  error BridgeFacet__onlyDelegate_notDelegate();
  error BridgeFacet__addSequencer_invalidSequencer();
  error BridgeFacet__addSequencer_alreadyApproved();
  error BridgeFacet__removeSequencer_notApproved();
  error BridgeFacet__setXAppConnectionManager_domainsDontMatch();
  error BridgeFacet__xcall_nativeAssetNotSupported();
  error BridgeFacet__xcall_emptyTo();
  error BridgeFacet__execute_unapprovedSender();
  error BridgeFacet__execute_wrongDomain();
  error BridgeFacet__execute_notSupportedSequencer();
  error BridgeFacet__execute_invalidSequencerSignature();
  error BridgeFacet__execute_maxRoutersExceeded();
  error BridgeFacet__execute_notSupportedRouter();
  error BridgeFacet__execute_invalidRouterSignature();
  error BridgeFacet__execute_badFastLiquidityStatus();
  error BridgeFacet__execute_notReconciled();
  error BridgeFacet__execute_externalCallFailed();
  error BridgeFacet__excecute_insufficientGas();
  error BridgeFacet__executePortalTransfer_insufficientAmountWithdrawn();
  error BridgeFacet__bumpTransfer_valueIsZero();
  error BridgeFacet__bumpTransfer_noRelayerVault();
  error BridgeFacet__mustHaveRemote_destinationNotSupported();

  // ============ Properties ============

  // ============ Events ============

  /**
   * @notice Emitted when `xcall` is called on the origin domain of a transfer.
   * @param transferId - The unique identifier of the crosschain transfer.
   * @param nonce - The bridge nonce of the transfer on the origin domain.
   * @param messageHash - The hash of the message bytes (containing all transfer info) that were bridged.
   * @param params - The `TransferInfo` provided to the function.
   * @param asset - The asset sent in with xcall
   * @param amount - The amount sent in with xcall
   * @param local - The local asset that is controlled by the bridge and can be burned/minted
   */
  event XCalled(
    bytes32 indexed transferId,
    uint256 indexed nonce,
    bytes32 indexed messageHash,
    TransferInfo params,
    address asset,
    uint256 amount,
    address local,
    bytes messageBody
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
   * @param settlementDomain - Domain the router will settle on.
   */
  event Executed(
    bytes32 indexed transferId,
    address indexed to,
    address indexed asset,
    ExecuteArgs args,
    address local,
    uint256 amount,
    address caller,
    uint32 settlementDomain
  );

  /**
   * @notice Emitted when `_bumpTransfer` is called by an user on the origin domain both in
   * `xcall` and `bumpTransfer`
   * @param transferId - The unique identifier of the crosschain transaction
   * @param increase - The additional amount fees increased by
   * @param asset - The asset the fee was increased with
   * @param caller - The account that called the function
   */
  event TransferRelayerFeesIncreased(bytes32 indexed transferId, uint256 increase, address asset, address caller);

  /**
   * @notice Emitted when a new remote instance is added
   * @param domain - The domain the remote instance is on
   * @param remote - The address of the remote instance
   * @param caller - The account that called the function
   */
  event RemoteAdded(uint32 domain, address remote, address caller);

  /**
   * @notice Emitted when a sequencer is added or removed from allowlists
   * @param sequencer - The sequencer address to be added or removed
   * @param caller - The account that called the function
   */
  event SequencerAdded(address sequencer, address caller);

  /**
   * @notice Emitted when a sequencer is added or removed from allowlists
   * @param sequencer - The sequencer address to be added or removed
   * @param caller - The account that called the function
   */
  event SequencerRemoved(address sequencer, address caller);

  /**
   * @notice Emitted `xAppConnectionManager` is updated
   * @param updated - The updated address
   * @param caller - The account that called the function
   */
  event XAppConnectionManagerSet(address updated, address caller);

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
   * @notice Used to add an approved sequencer to the allowlist.
   * @param _sequencer - The sequencer address to add.
   */
  function addSequencer(address _sequencer) external onlyOwnerOrAdmin {
    if (_sequencer == address(0)) revert BridgeFacet__addSequencer_invalidSequencer();

    if (s.approvedSequencers[_sequencer]) revert BridgeFacet__addSequencer_alreadyApproved();
    s.approvedSequencers[_sequencer] = true;

    emit SequencerAdded(_sequencer, msg.sender);
  }

  /**
   * @notice Used to remove an approved sequencer from the allowlist.
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
    IConnectorManager manager = IConnectorManager(_xAppConnectionManager);
    if (manager.localDomain() != s.domain) {
      revert BridgeFacet__setXAppConnectionManager_domainsDontMatch();
    }
    emit XAppConnectionManagerSet(_xAppConnectionManager, msg.sender);
    s.xAppConnectionManager = manager;
  }

  /**
   * @notice Register the address of a Router contract for the same xApp on a remote chain
   * @param _domain The domain of the remote xApp Router
   * @param _router The address of the remote xApp Router
   */
  function enrollRemoteRouter(uint32 _domain, bytes32 _router) external onlyOwnerOrAdmin {
    if (_router == bytes32("")) revert BridgeFacet__addRemote_invalidRouter();

    // Make sure we aren't setting the current domain (or an empty one) as the connextion.
    if (_domain == 0 || _domain == s.domain) {
      revert BridgeFacet__addRemote_invalidDomain();
    }

    s.remotes[_domain] = _router;
    emit RemoteAdded(_domain, TypeCasts.bytes32ToAddress(_router), msg.sender);
  }

  // ============ Public Functions: Bridge ==============

  /**
   * @notice Legacy interface for backwards compatibility
   */
  function xcall(
    uint32 _destination,
    address _to,
    address _asset,
    address _delegate,
    uint256 _amount,
    uint256 _slippage,
    bytes calldata _callData
  ) external payable nonXCallReentrant returns (bytes32) {
    // NOTE: Here, we fill in as much information as we can for the TransferInfo.
    // Some info is left blank and will be assigned in the internal `_xcall` function (e.g.
    // `normalizedIn`, `bridgedAmt`, canonical info, etc).
    TransferInfo memory params = TransferInfo({
      to: _to,
      callData: _callData,
      originDomain: s.domain,
      destinationDomain: _destination,
      originSender: msg.sender,
      // The following values should be assigned in _xcall.
      nonce: 0,
      canonicalDomain: 0,
      bridgedAmt: 0,
      normalizedIn: 0,
      canonicalId: bytes32(0)
    });
    return _xcall(params, AssetTransfer(_asset, _amount), AssetTransfer(address(0), msg.value));
  }

  function xcall(
    uint32 _destination,
    address _to,
    address _asset,
    address _delegate,
    uint256 _amount,
    uint256 _slippage,
    bytes calldata _callData,
    uint256 _relayerFee
  ) external nonXCallReentrant returns (bytes32) {
    // NOTE: Here, we fill in as much information as we can for the TransferInfo.
    // Some info is left blank and will be assigned in the internal `_xcall` function (e.g.
    // `normalizedIn`, `bridgedAmt`, canonical info, etc).
    TransferInfo memory params = TransferInfo({
      to: _to,
      callData: _callData,
      originDomain: s.domain,
      destinationDomain: _destination,
      originSender: msg.sender,
      // The following values should be assigned in _xcall.
      nonce: 0,
      canonicalDomain: 0,
      bridgedAmt: 0,
      normalizedIn: 0,
      canonicalId: bytes32(0)
    });
    return _xcall(params, AssetTransfer(_asset, _amount), AssetTransfer(_asset, _relayerFee));
  }

  function xcall(
    uint32 _destination,
    address _to,
    address _asset,
    uint256 _amount,
    bytes calldata _callData
  ) external nonXCallReentrant returns (bytes32) {
    // NOTE: Here, we fill in as much information as we can for the TransferInfo.
    // Some info is left blank and will be assigned in the internal `_xcall` function (e.g.
    // `normalizedIn`, `bridgedAmt`, canonical info, etc).
    TransferInfo memory params = TransferInfo({
      to: _to,
      callData: _callData,
      originDomain: s.domain,
      destinationDomain: _destination,
      originSender: msg.sender,
      // The following values should be assigned in _xcall.
      nonce: 0,
      canonicalDomain: 0,
      bridgedAmt: 0,
      normalizedIn: 0,
      canonicalId: bytes32(0)
    });
    return _xcall(params, AssetTransfer(_asset, _amount), AssetTransfer(address(0), msg.value));
  }

  function xcall(
    uint32 _destination,
    address _to,
    address _asset,
    uint256 _amount,
    bytes calldata _callData,
    uint256 _relayerFee
  ) external nonXCallReentrant returns (bytes32) {
    // NOTE: Here, we fill in as much information as we can for the TransferInfo.
    // Some info is left blank and will be assigned in the internal `_xcall` function (e.g.
    // `normalizedIn`, `bridgedAmt`, canonical info, etc).
    TransferInfo memory params = TransferInfo({
      to: _to,
      callData: _callData,
      originDomain: s.domain,
      destinationDomain: _destination,
      originSender: msg.sender,
      // The following values should be assigned in _xcall.
      nonce: 0,
      canonicalDomain: 0,
      bridgedAmt: 0,
      normalizedIn: 0,
      canonicalId: bytes32(0)
    });
    return _xcall(params, AssetTransfer(_asset, _amount), AssetTransfer(_asset, _relayerFee));
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
    // NOTE: This function should ideally behave similar to xcall and call a lower level internal function for consistency

    /**
     * Execute steps:
     * Sanity check params
     * Generate transferId
     * Decrement router balance (TODO or minted assets? need to think about this for slow path)
     * Generate executeMessage from router params and send it to settlementDomain. 
       Note: if target domain is settlementDomain then it should just save the transferId for reconcile later
     * Look up configured fees for the token
     * Send tokens minus fees + execute the transaction
     * Emit execute event
     */

    // (bytes32 transferId, DestinationTransferStatus status) = _executeSanityChecks(_args);

    // DestinationTransferStatus updated = status == DestinationTransferStatus.Reconciled
    //   ? DestinationTransferStatus.Completed
    //   : DestinationTransferStatus.Executed;

    // s.transferStatus[transferId] = updated;

    // // Supply assets to target recipient. Use router liquidity when this is a fast transfer, or mint bridge tokens
    // // when this is a slow transfer.
    // // NOTE: Asset will be adopted unless specified to `receiveLocal` in params.
    // (uint256 amountOut, address asset, address local) = _handleExecuteLiquidity(
    //   transferId,
    //   AssetLogic.calculateCanonicalHash(_args.params.canonicalId, _args.params.canonicalDomain),
    //   updated != DestinationTransferStatus.Completed,
    //   _args
    // );

    // // Execute the transaction using the designated calldata.
    // uint256 amount = _handleExecuteTransaction(
    //   _args,
    //   amountOut,
    //   asset,
    //   transferId,
    //   updated == DestinationTransferStatus.Completed
    // );

    // Emit event.
    emit Executed(transferId, _args.params.to, asset, _args, local, amount, msg.sender, settlementDomain);

    return transferId;
  }

  /**
   * @notice Anyone can call this function on the origin domain to increase the relayer fee for a transfer.
   * @param _transferId - The unique identifier of the crosschain transaction
   */
  function bumpTransfer(bytes32 _transferId) external payable nonReentrant whenNotPaused {
    if (msg.value == 0) revert BridgeFacet__bumpTransfer_valueIsZero();
    _bumpTransfer(_transferId, address(0), msg.value);
  }

  /**
   * @notice Anyone can call this function on the origin domain t o increase the relayer fee for
   * a given transfer using a specific asset.
   * @param _transferId - The unique identifier of the crosschain transaction
   * @param _relayerFeeAsset - The asset you are bumping fee with
   * @param _relayerFee - The amount you want to bump transfer fee with
   */
  function bumpTransfer(
    bytes32 _transferId,
    address _relayerFeeAsset,
    uint256 _relayerFee
  ) external nonReentrant whenNotPaused {
    if (_relayerFee == 0) revert BridgeFacet__bumpTransfer_valueIsZero();
    // check that the asset is whitelisted (the following reverts if asset
    // is not approved)
    _getApprovedCanonicalId(_relayerFeeAsset);
    // handle transferring asset to the relayer fee vault
    _bumpTransfer(_transferId, _relayerFeeAsset, _relayerFee);
  }

  // ============ Internal: Bridge ============

  /**
   * @notice Initiates a cross-chain transfer of funds and/or calldata
   *
   * @dev For ERC20 transfers, this contract must have approval to transfer the input (transacting) assets. The adopted
   * assets will be swapped for their local asset counterparts (i.e. bridgeable tokens) via the configured AMM if
   * necessary. In the event that the adopted assets *are* local bridge assets, no swap is needed. The local tokens will
   * then be sent via the bridge router. If the local assets are representational for an asset on another chain, we will
   * burn the tokens here. If the local assets are canonical (meaning that the adopted<>local asset pairing is native
   * to this chain), we will custody the tokens here.
   *
   * @param _params - The TransferInfo arguments.
   * @return bytes32 - The transfer ID of the newly created crosschain transfer.
   */
  function _xcall(
    TransferInfo memory _params,
    AssetTransfer memory _asset,
    AssetTransfer memory _relayer
  ) internal whenNotPaused returns (bytes32) {
    /**
     * XCall steps:
     * 1. Param validation + sanity checks
     * 2. Generate transferId
     * 3. Transfer fees to contract
     * 4. Look up asset in registry and get settlement strategy
     * 5. Route to correct settlement module
     * 6. Create message and send --> TODO what if messages are settlement-dependent?
     * 7. Emit xcall event
     */

    // // Sanity checks.
    // bytes32 remoteInstance;
    // {
    //   // Not native asset.
    //   // NOTE: We support using address(0) as an intuitive default if you are sending a 0-value
    //   // transfer. In that edge case, address(0) will not be registered as a supported asset, but should
    //   // pass the `isLocalOrigin` check
    //   if (_asset.asset == address(0) && _asset.amount != 0) {
    //     revert BridgeFacet__xcall_nativeAssetNotSupported();
    //   }

    //   // Destination domain is supported.
    //   // NOTE: This check implicitly also checks that `_params.destinationDomain != s.domain`, because the index
    //   // `s.domain` of `s.remotes` should always be `bytes32(0)`.
    //   remoteInstance = _mustHaveRemote(_params.destinationDomain);
    // }

    // // Handle the relayer fee.
    // if (_relayer.amount > 0) {
    //   _bumpTransfer(transferId, _relayer.asset, _relayer.amount);
    // }

    // Send the crosschain message. TODO Some strategies will not have messages -> blank msg?
    _sendMessage(transferId, _params, _asset.asset, _asset.amount, remoteInstance, canonical, local, isCanonical);

    // emit event
    emit XCalled(_transferId, _params.nonce, messageHash, _params, _asset, _amount, _local, messageBody);

    return transferId;
  }

  /**
   * @notice An internal function to handle the bumping of transfers
   * @param _transferId - The unique identifier of the crosschain transaction
   * @param _relayerFeeAsset - The asset you are bumping fee with
   * @param _relayerFee - The amount you want to bump transfer fee with
   */
  function _bumpTransfer(bytes32 _transferId, address _relayerFeeAsset, uint256 _relayerFee) internal {
    address relayerVault = s.relayerFeeVault;
    if (relayerVault == address(0)) revert BridgeFacet__bumpTransfer_noRelayerVault();
    if (_relayerFeeAsset == address(0)) {
      Address.sendValue(payable(relayerVault), _relayerFee);
    } else {
      // Pull funds from user to this contract
      // NOTE: could transfer to `relayerFeeVault`, but that would be unintuitive for user
      // approvals
      AssetLogic.handleIncomingAsset(_relayerFeeAsset, _relayerFee);

      // Transfer asset to relayerVault.
      AssetLogic.handleOutgoingAsset(_relayerFeeAsset, relayerVault, _relayerFee);
    }

    emit TransferRelayerFeesIncreased(_transferId, _relayerFee, _relayerFeeAsset, msg.sender);
  }

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
   * @notice Performs some sanity checks for `execute`.
   * @dev Need this to prevent stack too deep.
   * @param _args ExecuteArgs that were passed in to the `execute` call.
   */
  function _executeSanityChecks(ExecuteArgs calldata _args) private view returns (bytes32, DestinationTransferStatus) {
    // If the sender is not approved relayer, revert
    if (!s.approvedRelayers[msg.sender] && msg.sender != _args.params.delegate) {
      revert BridgeFacet__execute_unapprovedSender();
    }

    // If this is not the destination domain revert
    if (_args.params.destinationDomain != s.domain) {
      revert BridgeFacet__execute_wrongDomain();
    }

    // Path length refers to the number of facilitating routers. A transfer is considered 'multipath'
    // if multiple routers provide liquidity (in even 'shares') for it.
    uint256 pathLength = _args.routers.length;

    // Derive transfer ID based on given arguments.
    bytes32 transferId = _calculateTransferId(_args.params);

    // Retrieve the reconciled record.
    DestinationTransferStatus status = s.transferStatus[transferId];

    if (pathLength != 0) {
      // Make sure number of routers is below the configured maximum.
      if (pathLength > s.maxRoutersPerTransfer) revert BridgeFacet__execute_maxRoutersExceeded();

      // Check to make sure the transfer has not been reconciled (no need for routers if the transfer is
      // already reconciled; i.e. if there are routers provided, the transfer must *not* be reconciled).
      if (status != DestinationTransferStatus.None) revert BridgeFacet__execute_badFastLiquidityStatus();

      // NOTE: The sequencer address may be empty and no signature needs to be provided in the case of the
      // slow liquidity route (i.e. no routers involved). Additionally, the sequencer does not need to be the
      // msg.sender.
      // Check to make sure the sequencer address provided is approved
      if (!s.approvedSequencers[_args.sequencer]) {
        revert BridgeFacet__execute_notSupportedSequencer();
      }
      // Check to make sure the sequencer provided did sign the transfer ID and router path provided.
      // NOTE: when caps are enforced, this signature also acts as protection from malicious routers looking
      // to block the network. routers could `execute` a fake transaction, and use up the rest of the `custodied`
      // bandwidth, causing future `execute`s to fail. this would also cause a break in the accounting, where the
      // `custodied` balance no longer tracks representation asset minting / burning
      if (
        _args.sequencer != _recoverSignature(keccak256(abi.encode(transferId, _args.routers)), _args.sequencerSignature)
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
        // If router ownership is renounced (_RouterOwnershipRenounced() is true), then the router allowlist
        // no longer applies and we can skip this approval step.
        if (!_isRouterAllowlistRemoved() && !s.routerConfigs[_args.routers[i]].approved) {
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
      if (status != DestinationTransferStatus.Reconciled) revert BridgeFacet__execute_notReconciled();
    }

    return (transferId, status);
  }

  /**
   * @notice Calculates fast transfer amount.
   * @param _amount Transfer amount
   * @param _numerator Numerator
   * @param _denominator Denominator
   */
  function _muldiv(uint256 _amount, uint256 _numerator, uint256 _denominator) private pure returns (uint256) {
    return (_amount * _numerator) / _denominator;
  }

  /**
   * @notice Execute liquidity process used when calling `execute`.
   * @dev Will revert with underflow if any router in the path has insufficient liquidity to provide
   * for the transfer.
   * @dev Need this to prevent stack too deep.
   */
  function _handleExecuteLiquidity(
    bytes32 _transferId,
    bytes32 _key,
    bool _isFast,
    ExecuteArgs calldata _args
  ) private returns (uint256, address, address) {
    // Save the addresses of all routers providing liquidity for this transfer.
    s.routedTransfers[_transferId] = _args.routers;

    // If this is a zero-value transfer, short-circuit remaining logic.
    if (_args.params.bridgedAmt == 0) {
      return (0, local, local);
    }

    // If this is a fast liquidity path, we should handle deducting from applicable routers' liquidity.
    // If this is a slow liquidity path, the transfer must have been reconciled (if we've reached this point),
    // and the funds would have been custodied in this contract. The exact custodied amount is untracked in state
    // (since the amount is hashed in the transfer ID itself) - thus, no updates are required.
    if (_isFast) {
      uint256 pathLen = _args.routers.length;

      // Calculate amount that routers will provide with the fast-liquidity fee deducted.
      toSwap = _muldiv(_args.params.bridgedAmt, s.LIQUIDITY_FEE_NUMERATOR, Constants.BPS_FEE_DENOMINATOR);

      // For each router, assert they are approved, and deduct liquidity.
      uint256 routerAmount = toSwap / pathLen;
      for (uint256 i; i < pathLen - 1; ) {
        // Decrement router's liquidity.
        // NOTE: If any router in the path has insufficient liquidity, this will revert with an underflow error.
        s.routerBalances[_args.routers[i]][local] -= routerAmount;

        unchecked {
          ++i;
        }
      }
      // The last router in the multipath will sweep the remaining balance to account for remainder dust.
      uint256 toSweep = routerAmount + (toSwap % pathLen);
      s.routerBalances[_args.routers[pathLen - 1]][local] -= toSweep;
    }

    return (amount, adopted, local);
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
    // transfer funds to recipient
    AssetLogic.handleOutgoingAsset(_asset, _args.params.to, _amountOut);

    // execute the calldata
    _executeCalldata(_transferId, _amountOut, _asset, _reconciled, _args.params);

    return _amountOut;
  }

  /**
   * @notice Executes external calldata.
   * 
   * @dev Once a transfer is reconciled (i.e. data is authenticated), external calls will
   * fail gracefully. This means errors will be emitted in an event, but the function itself
   * will not revert.

   * In the case where a transaction is *not* reconciled (i.e. data is unauthenticated), this
   * external call will fail loudly. This allows all functions that rely on authenticated data
   * (using a specific check on the origin sender), to be forced into the slow path for
   * execution to succeed.
   * 
   */
  function _executeCalldata(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    bool _reconciled,
    TransferInfo calldata _params
  ) internal {
    // execute the calldata
    if (keccak256(_params.callData) == Constants.EMPTY_HASH) {
      // no call data, return amount out
      return;
    }

    (bool success, bytes memory returnData) = ExcessivelySafeCall.excessivelySafeCall(
      _params.to,
      gasleft() - Constants.EXECUTE_CALLDATA_RESERVE_GAS,
      0, // native asset value (always 0)
      Constants.DEFAULT_COPY_BYTES, // only copy 256 bytes back as calldata
      abi.encodeWithSelector(
        IXReceiver.xReceive.selector,
        _transferId,
        _amount,
        _asset,
        _reconciled ? _params.originSender : address(0), // use passed in value iff authenticated
        _params.originDomain,
        _params.callData
      )
    );

    if (!_reconciled && !success) {
      // See above devnote, reverts if unsuccessful on fast path
      revert BridgeFacet__execute_externalCallFailed();
    }

    emit ExternalCalldataExecuted(_transferId, success, returnData);
  }

  // ============ Internal: Send & Emit Xcalled============

  /**
   * @notice Format and send transfer message to a remote chain.
   *
   * @param _transferId Unique identifier for the transfer.
   * @param _params The TransferInfo.
   * @param _connextion The connext instance on the destination domain.
   * @param _canonical The canonical token ID/domain info.
   * @param _amount The token amount.
   */
  function _sendMessage(
    bytes32 _transferId,
    TransferInfo memory _params,
    address _asset,
    uint256 _amount,
    bytes32 _connextion,
    TokenId memory _canonical
  ) private {
    bytes memory _messageBody = abi.encodePacked(
      _canonical.domain,
      _canonical.id,
      BridgeMessage.Types.Transfer,
      bridgedAmt,
      _transferId
    );

    // Send message to destination chain bridge router.
    // return message hash and unhashed body
    (bytes32 messageHash, bytes memory messageBody) = IOutbox(s.xAppConnectionManager.home()).dispatch(
      _params.destinationDomain,
      _connextion,
      _messageBody
    );
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
}
