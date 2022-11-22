// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";

import {AssetLogic} from "../libraries/AssetLogic.sol";
import {BridgeMessage} from "../libraries/BridgeMessage.sol";
import {DestinationTransferStatus} from "../libraries/LibConnextStorage.sol";

import {IBridgeToken} from "../interfaces/IBridgeToken.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

/**
 * @title InboxFacet
 * @notice This is the facet that holds all the functionality needed for Connext's messaging layer to
 * reconcile cross-chain transfers. Authenticated (proven) message data is delivered to the `reconcile`
 * function, where it is parsed to determine the message action. Tokens are credited (representational
 * assets are minted, canonical tokens are unlocked from escrow) if applicable.
 *
 */
contract InboxFacet is BaseConnextFacet {
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using BridgeMessage for bytes29;

  // ========== Custom Errors ===========

  error InboxFacet__onlyReplica_notReplica();
  error InboxFacet__onlyRemoteRouter_notRemote();
  error InboxFacet__handle_notTransfer();
  error InboxFacet__reconcile_alreadyReconciled();
  error InboxFacet__reconcile_noPortalRouter();

  // ============ Events ============

  /**
   * @notice Emitted when `reconciled` is called by the bridge on the destination domain.
   * @param transferId - The unique identifier of the transfer.
   * @param originDomain - The originating domain of the transfer.
   * @param local - The local asset that was provided by the bridge.
   * @param routers - The routers that were reimbursed the bridged token, if fast liquidity was
   * provided for the given transfer.
   * @param amount - The amount that was provided by the bridge.
   * @param caller - The account that called the function
   */
  event Reconciled(
    bytes32 indexed transferId,
    uint32 indexed originDomain,
    address indexed local,
    address[] routers,
    uint256 amount,
    address caller
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
   * @notice Only accept messages from a registered inbox contract.
   */
  modifier onlyReplica() {
    if (!_isReplica(msg.sender)) {
      revert InboxFacet__onlyReplica_notReplica();
    }
    _;
  }

  /**
   * @notice Only accept messages from a remote Router contract.
   * @param _origin The domain the message is coming from.
   * @param _router The address the message is coming from.
   */
  modifier onlyRemoteHandler(uint32 _origin, bytes32 _router) {
    if (!_isRemoteHandler(_origin, _router)) {
      revert InboxFacet__onlyRemoteRouter_notRemote();
    }
    _;
  }

  // ============ External Functions ============

  /**
   * @notice Handles an incoming cross-chain message.
   *
   * @param _origin The origin domain.
   * @param _nonce The unique identifier for the message from origin to destination.
   * @param _sender The sender address.
   * @param _message The message body.
   */
  function handle(
    uint32 _origin,
    uint32 _nonce,
    bytes32 _sender,
    bytes memory _message
  ) external onlyReplica onlyRemoteHandler(_origin, _sender) {
    // Parse token ID and action from message body.
    bytes29 _msg = _message.ref(0).mustBeMessage();
    bytes29 _tokenId = _msg.tokenId();
    bytes29 _action = _msg.action();

    // Sanity check: action must be a valid transfer.
    if (!_action.isTransfer()) {
      revert InboxFacet__handle_notTransfer();
    }

    // If applicable, mint the local asset that corresponds with the message's token ID in the
    // amount specified by the message.
    // Returns the local asset address and message's amount.
    (address _token, uint256 _amount) = _creditTokens(_origin, _nonce, _tokenId, _action);

    // Reconcile the transfer.
    _reconcile(_action.transferId(), _origin, _token, _amount);
  }

  // ============ Internal Functions ============

  /**
   * @notice Reconcile the transfer, marking the transfer ID in storage as authenticated. Reimburses
   * routers with local asset if it was a fast-liquidity transfer (i.e. it was previously executed).
   * @param _transferId Unique identifier of the transfer.
   * @param _origin Origin domain of the transfer.
   * @param _asset Local asset address (representational or canonical).
   * @param _amount The amount of the local asset.
   */
  function _reconcile(
    bytes32 _transferId,
    uint32 _origin,
    address _asset,
    uint256 _amount
  ) internal {
    // Ensure the transfer has not already been handled (i.e. previously reconciled).
    // Will be previously reconciled IFF status == reconciled -or- status == executed
    // and there is no path length on the transfers (no fast liquidity)
    DestinationTransferStatus status = s.transferStatus[_transferId];
    if (status != DestinationTransferStatus.None && status != DestinationTransferStatus.Executed) {
      revert InboxFacet__reconcile_alreadyReconciled();
    }

    // Mark the transfer as reconciled.
    s.transferStatus[_transferId] = status == DestinationTransferStatus.None
      ? DestinationTransferStatus.Reconciled
      : DestinationTransferStatus.Completed;

    // If the transfer was executed using fast-liquidity provided by routers, then this value would be set
    // to the participating routers.
    // NOTE: If the transfer was not executed using fast-liquidity, then the funds will be reserved for
    // execution (i.e. funds will be delivered to the transfer's recipient in a subsequent `execute` call).
    address[] memory routers = s.routedTransfers[_transferId];

    // If fast transfer was made using portal liquidity, portal debt must be repaid first.
    // NOTE: Routers can repay any-amount out-of-band using the `repayAavePortal` method
    // or by interacting with the aave contracts directly.
    uint256 portalTransferAmount = s.portalDebt[_transferId] + s.portalFeeDebt[_transferId];

    uint256 pathLen = routers.length;
    // Sanity check: ensure a router took on the credit risk.
    if (portalTransferAmount != 0 && pathLen != 1) {
      revert InboxFacet__reconcile_noPortalRouter();
    }

    if (pathLen != 0) {
      // Credit each router that provided liquidity their due 'share' of the asset.
      uint256 routerAmount = _amount / pathLen;
      for (uint256 i; i < pathLen - 1; ) {
        s.routerBalances[routers[i]][_asset] += routerAmount;
        unchecked {
          ++i;
        }
      }
      // The last router in the multipath will sweep the remaining balance to account for remainder dust.
      uint256 toSweep = routerAmount + (_amount % pathLen);
      s.routerBalances[routers[pathLen - 1]][_asset] += toSweep;
    }

    emit Reconciled(_transferId, _origin, _asset, routers, _amount, msg.sender);
  }

  /**
   * @notice Determine whether _potentialReplica is an enrolled Replica from the xAppConnectionManager
   * @return True if _potentialReplica is an enrolled Replica
   */
  function _isReplica(address _potentialReplica) internal view returns (bool) {
    return s.xAppConnectionManager.isReplica(_potentialReplica);
  }

  /**
   * @notice Return true if the given domain / router is the address of a remote xApp Router
   * @param _domain The domain of the potential remote xApp Router
   * @param _xAppHandler The address of the potential remote xApp handler
   */
  function _isRemoteHandler(uint32 _domain, bytes32 _xAppHandler) internal view returns (bool) {
    return s.remotes[_domain] == _xAppHandler && _xAppHandler != bytes32(0);
  }

  /**
   * @notice If applicable, mints tokens corresponding to the inbound message action.
   * @dev IFF the asset is representational (i.e. originates from a remote chain), tokens will be minted.
   * Otherwise, the token must be canonical (i.e. we are on the token's home chain), and the corresponding
   * amount will already be available in escrow in this contract.
   *
   * @param _origin The domain of the chain from which the transfer originated.
   * @param _nonce The unique identifier for the message from origin to destination.
   * @param _tokenId The canonical token identifier to credit.
   * @param _action The contents of the transfer message.
   * @return _token The address of the local token contract.
   */
  function _creditTokens(
    uint32 _origin,
    uint32 _nonce,
    bytes29 _tokenId,
    bytes29 _action
  ) internal returns (address, uint256) {
    bytes32 _canonicalId = _tokenId.id();
    uint32 _canonicalDomain = _tokenId.domain();

    // Load amount once.
    uint256 _amount = _action.amnt();

    // Check for the empty case -- if it is 0 value there is no strict requirement for the
    // canonical information be defined (i.e. you can supply address(0) to xcall). If this
    // is the case, return _token as address(0)
    if (_amount == 0 && _canonicalDomain == 0 && _canonicalId == bytes32(0)) {
      // Emit Receive event and short-circuit remaining logic: no tokens need to be delivered.
      emit Receive(_originAndNonce(_origin, _nonce), address(0), address(this), address(0), _amount);
      return (address(0), 0);
    }

    // Get the token contract for the given tokenId on this chain.
    address _token = _getLocalAsset(
      AssetLogic.calculateCanonicalHash(_canonicalId, _canonicalDomain),
      _canonicalId,
      _canonicalDomain
    );

    if (_amount == 0) {
      // Emit Receive event and short-circuit remaining logic: no tokens need to be delivered.
      emit Receive(_originAndNonce(_origin, _nonce), _token, address(this), address(0), _amount);
      return (_token, 0);
    }

    // Mint the tokens into circulation on this chain.
    if (!_isLocalOrigin(_token)) {
      // If the token is of remote origin, mint the representational asset into circulation here.
      // NOTE: The bridge tokens should be distributed to their intended recipient outside
      IBridgeToken(_token).mint(address(this), _amount);
    }
    // NOTE: If the tokens are locally originating - meaning they are the canonical asset - then they
    // would be held in escrow in this contract. If we're receiving this message, it must mean
    // corresponding representational assets circulating on a remote chain were burnt when it was sent.

    // Emit Receive event.
    emit Receive(_originAndNonce(_origin, _nonce), _token, address(this), address(0), _amount);
    return (_token, _amount);
  }
}
