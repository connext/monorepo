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

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

import {AssetLogic} from "../libraries/AssetLogic.sol";
import {ExecuteArgs, CallParams, TokenId} from "../libraries/LibConnextStorage.sol";

import {IWeth} from "../interfaces/IWeth.sol";
import {ITokenRegistry} from "../interfaces/ITokenRegistry.sol";
import {IXReceiver} from "../interfaces/IXReceiver.sol";
import {IAavePool} from "../interfaces/IAavePool.sol";

contract BridgeFacet is BaseConnextFacet {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // ========== Structs ===========

  // ========== Custom Errors ===========

  error BridgeFacet__onlyDelegate_notDelegate();
  error BridgeFacet__addConnextion_invalidDomain();
  error BridgeFacet__addSequencer_alreadyApproved();
  error BridgeFacet__removeSequencer_notApproved();
  error BridgeFacet__xcall_nativeAssetNotSupported();
  error BridgeFacet__xcall_destinationNotSupported();
  error BridgeFacet__xcall_emptyTo();
  error BridgeFacet__xcall_notSupportedAsset();
  error BridgeFacet__xcall_invalidSlippage();
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
  error BridgeFacet__forceUpdateSlippage_invalidSlippage();
  error BridgeFacet__forceUpdateSlippage_notDestination();

  // ============ Properties ============

  uint16 public constant AAVE_REFERRAL_CODE = 0;

  // ============ Events ============

  /**
   * @notice Emitted when `xcall` is called on the origin domain
   * @param transferId - The unique identifier of the crosschain transfer.
   * @param nonce - The bridge nonce of the transfer on the origin domain.
   * @param params - The `CallParams` provided to the function.
   */
  event XCalled(bytes32 indexed transferId, uint256 indexed nonce, bytes32 indexed messageHash, CallParams params);

  /**
   * @notice Emitted when a transfer has its external data executed
   * @param transferId - The unique identifier of the crosschain transfer.
   * @param success - Whether calldata succeeded
   * @param returnData - Return bytes from the IXReceiver
   */
  event ExternalCalldataExecuted(bytes32 indexed transferId, bool success, bytes returnData);

  /**
   * @notice Emitted when `execute` is called on the destination chain
   * @dev `execute` may be called when providing fast liquidity *or* when processing a reconciled transfer
   * @param transferId - The unique identifier of the crosschain transfer.
   * @param to - The recipient `CallParams.to` provided, created as indexed parameter.
   * @param args - The `ExecuteArgs` provided to the function.
   * @param asset - The asset the to gets or the external call is executed with. Should be the
   * adopted asset on that chain.
   * @param amount - The amount of transferring asset the to address receives or the external call is
   * executed with.
   * @param caller - The account that called the function.
   */
  event Executed(
    bytes32 indexed transferId,
    address indexed to,
    ExecuteArgs args,
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

  // ============ Modifiers ============
  modifier onlyDelegate(CallParams calldata _params) {
    if (_params.delegate != msg.sender) revert BridgeFacet__onlyDelegate_notDelegate();
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

  function nonce() public view returns (uint256) {
    return s.nonce;
  }

  function approvedSequencers(address _sequencer) external view returns (bool) {
    return s.approvedSequencers[_sequencer];
  }

  // ============ Admin methods ==============

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

  function xcall(
    uint32 _destination,
    address _to,
    address _asset,
    address _delegate,
    uint256 _amount,
    uint256 _slippage,
    bytes calldata _callData
  ) external payable returns (bytes32) {
    // NOTE: These CallParams fill in as much information as they can, but
    // some info is left blank and will be assigned in the internal _xcall
    // function (i.e. normalizedIn, bridgedAmt, canonical info, etc).
    CallParams memory params = CallParams({
      to: _to,
      callData: _callData,
      originDomain: s.domain,
      destinationDomain: _destination,
      delegate: _delegate,
      receiveLocal: false, // Always swap into adopted in xcall pass.
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
    // NOTE: These CallParams fill in as much information as they can, but
    // some info is left blank and will be assigned in the internal _xcall
    // function (i.e. normalizedIn, bridgedAmt, canonical info, etc).
    CallParams memory params = CallParams({
      to: _to,
      callData: _callData,
      originDomain: s.domain,
      destinationDomain: _destination,
      delegate: _delegate,
      receiveLocal: true, // Don't swap into adopted.
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
    (bytes32 transferId, bool reconciled) = _executeSanityChecks(_args);

    // Set the relayer for this transaction to allow for future claim
    s.transferRelayer[transferId] = msg.sender;

    // execute router liquidity when this is a fast transfer
    // asset will be adopted unless specified to be local in params
    (uint256 amountOut, address asset) = _handleExecuteLiquidity(
      transferId,
      _calculateCanonicalHash(_args.params.canonicalId, _args.params.canonicalDomain),
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
   * @notice Allows a user-specified account to update the slippage they are willing
   * to take on destination transfers.
   *
   * @param _params CallParams associated with the transfer
   * @param _slippage The updated slippage
   */
  function forceUpdateSlippage(CallParams calldata _params, uint256 _slippage) external onlyDelegate(_params) {
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

  // ============ Private Functions ============

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
   * @param _params - The CallParams arguments.
   * @return bytes32 - The transfer ID of the newly created crosschain transfer.
   */
  function _xcall(
    CallParams memory _params,
    address _asset,
    uint256 _amount
  ) internal whenNotPaused returns (bytes32) {
    // Sanity checks.
    bytes32 remoteInstance;
    {
      // Not native asset.
      // NOTE: We support using address(0) as an intuitive default if you are sending a 0-value
      // transfer. In that edge case, address(0) will not be registered as a supported asset, but should
      // pass the `isLocalOrigin` check on the TokenRegistry.
      if (_asset == address(0) && _amount != 0) {
        revert BridgeFacet__xcall_nativeAssetNotSupported();
      }

      // Destination domain is supported.
      // NOTE: This check implicitly also checks that `.params.destinationDomain != s.domain`, because the index
      // `s.domain` of `s.connextions` should always be `bytes32(0)`.
      remoteInstance = s.connextions[_params.destinationDomain];
      if (remoteInstance == bytes32(0)) {
        revert BridgeFacet__xcall_destinationNotSupported();
      }

      // Recipient defined.
      if (_params.to == address(0)) {
        revert BridgeFacet__xcall_emptyTo();
      }

      if (_params.slippage > BPS_FEE_DENOMINATOR) {
        revert BridgeFacet__xcall_invalidSlippage();
      }
    }

    // NOTE: The local asset will stay address(0) if input asset is address(0) in the event of a
    // 0-value transfer. Otherwise, the local address will be retrieved from the TokenRegistry below.
    address local;
    bytes32 transferId;
    bytes32 messageHash;
    {
      // Check that the asset is supported -- can be either adopted or local.
      TokenId memory canonical;

      // NOTE: Above we check that you can only have `address(0)` as the input asset if this is a
      // 0-value transfer. Because 0-value transfers short-circuit all checks on mappings keyed on
      // hash(canonicalId, canonicalDomain), this is safe even when the address(0) asset is not
      // whitelisted.
      if (_asset != address(0)) {
        // Retrieve the canonical token information.
        canonical = s.adoptedToCanonical[_asset];

        if (canonical.id == bytes32(0)) {
          // Here, the asset is *not* the adopted asset. The only other valid option
          // is for this asset to be the local asset (e.g. transferring madEth on optimism).
          // NOTE: It *cannot* be the canonical asset; the canonical asset is only used on
          // the canonical domain, where it is *also* the adopted asset.
          if (s.tokenRegistry.isLocalOrigin(_asset)) {
            // Revert, using a token of local origin that is not registered as adopted.
            revert BridgeFacet__xcall_notSupportedAsset();
          }
          // The input asset is the local asset.
          local = _asset;

          // Get the global Token ID for this token.
          (uint32 canonicalDomain, bytes32 canonicalId) = s.tokenRegistry.getTokenId(_asset);
          canonical = TokenId(canonicalDomain, canonicalId);
        } else {
          // Input asset is either an adopted asset or the canonical asset.
          // Retrieve the local asset address. If the input asset is the canonical asset,
          // this call will just return the input asset address.
          local = s.tokenRegistry.getLocalAddress(canonical.domain, canonical.id);
        }

        // Update CallParams to reflect the canonical token information.
        _params.canonicalDomain = canonical.domain;
        _params.canonicalId = canonical.id;
      }

      if (_amount > 0) {
        // Transfer funds of transacting asset to the contract from the user.
        AssetLogic.transferAssetToContract(_asset, _amount);

        // Swap to the local asset from adopted if applicable.
        _params.bridgedAmt = AssetLogic.swapToLocalAssetIfNeeded(
          _params.canonicalId,
          _params.canonicalDomain,
          _asset,
          local,
          _amount,
          _params.slippage
        );

        // Approve bridge router
        SafeERC20.safeApprove(IERC20(local), address(s.bridgeRouter), 0);
        SafeERC20.safeIncreaseAllowance(IERC20(local), address(s.bridgeRouter), _params.bridgedAmt);
      }

      // Get the normalized amount in (amount sent in by user in 18 decimals).
      uint256 normalized = _asset == address(0)
        ? 0 // we know from assertions above this is the case IFF amount == 0
        : AssetLogic.normalizeDecimals(ERC20(_asset).decimals(), uint8(18), _amount);
      _params.normalizedIn = normalized;

      // Calculate the transfer ID.
      transferId = _calculateTransferId(_params);
      _params.nonce = s.nonce++;
    }

    {
      // Store the relayer fee.
      // NOTE: This has to be done *after* transferring in + swapping assets because
      // the transfer id uses the amount that is bridged (i.e. amount in local asset).
      s.relayerFees[transferId] += msg.value;

      // Send the crosschain message.
      messageHash = s.bridgeRouter.sendToHook(
        local,
        _params.bridgedAmt,
        _params.destinationDomain,
        remoteInstance,
        abi.encode(transferId)
      );
    }

    // emit event
    emit XCalled(transferId, _params.nonce, messageHash, _params);

    return transferId;
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

    // Make sure number of routers is below the configured maximum.
    if (pathLength > s.maxRoutersPerTransfer) revert BridgeFacet__execute_maxRoutersExceeded();

    // Derive transfer ID based on given arguments.
    bytes32 transferId = _calculateTransferId(_args.params);

    // Retrieve the reconciled record.
    bool reconciled = s.reconciledTransfers[transferId];

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

    // Get the local asset
    address local = s.tokenRegistry.getLocalAddress(_args.params.canonicalDomain, _args.params.canonicalId);

    if (_args.params.bridgedAmt == 0) {
      return (0, local);
    }
    uint256 toSwap = _args.params.bridgedAmt;
    // If this is a fast liquidity path, we should handle deducting from applicable routers' liquidity.
    // If this is a slow liquidity path, the transfer must have been reconciled (if we've reached this point),
    // and the funds would have been custodied in this contract. The exact custodied amount is untracked in state
    // (since the amount is hashed in the transfer ID itself) - thus, no updates are required.
    if (_isFast) {
      uint256 pathLen = _args.routers.length;

      // Calculate amount that routers will provide with the fast-liquidity fee deducted.
      toSwap = _muldiv(_args.params.bridgedAmt, s.LIQUIDITY_FEE_NUMERATOR, BPS_FEE_DENOMINATOR);

      if (pathLen == 1) {
        // If router does not have enough liquidity, try to use Aave Portals.
        // only one router should be responsible for taking on this credit risk, and it should only
        // deal with transfers expecting adopted assets (to avoid introducing runtime slippage).
        if (
          !_args.params.receiveLocal && s.routerBalances[_args.routers[0]][local] < toSwap && s.aavePool != address(0)
        ) {
          if (!s.routerPermissionInfo.approvedForPortalRouters[_args.routers[0]])
            revert BridgeFacet__execute_notApprovedForPortals();

          // Portal provides the adopted asset so we early return here
          return _executePortalTransfer(_transferId, _key, toSwap, _args.routers[0]);
        } else {
          // Decrement the router's liquidity.
          s.routerBalances[_args.routers[0]][local] -= toSwap;
        }
      } else {
        // For each router, assert they are approved, and deduct liquidity.
        uint256 routerAmount = toSwap / pathLen;
        for (uint256 i; i < pathLen - 1; ) {
          // Decrement router's liquidity.
          s.routerBalances[_args.routers[i]][local] -= routerAmount;

          unchecked {
            ++i;
          }
        }
        // The last router in the multipath will sweep the remaining balance to account for remainder dust.
        uint256 toSweep = routerAmount + (toSwap % pathLen);
        s.routerBalances[_args.routers[pathLen - 1]][local] -= toSweep;
      }
    }

    // if the local asset is specified, or the adopted asset was overridden (i.e. when
    // user facing slippage conditions outside of their boundaries), exit
    if (_args.params.receiveLocal) {
      return (toSwap, local);
    }

    // swap out of mad* asset into adopted asset if needed
    uint256 slippageOverride = s.slippage[_transferId];
    return
      AssetLogic.swapFromLocalAssetIfNeeded(
        _key,
        local,
        toSwap,
        slippageOverride != 0 ? slippageOverride : _args.params.slippage,
        _args.params.normalizedIn
      );
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
    CallParams calldata _params
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
    address adopted = _getAdoptedAsset(_key);

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
}
