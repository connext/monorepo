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

    // Reconcile the transfer.
    _reconcile(_action.transferId(), _origin, _token, _amount);
    emit Receive(_originAndNonce(_origin, _nonce), _token, address(this), address(0), _amount); //TODO should this be here? removed creditTokens fn
  }

  // ============ Internal Functions ============

  /**
   * @notice Reconcile the transfer, marking the transfer ID in storage as authenticated. Reimburses
   * routers with asset if it was a fast-liquidity transfer (i.e. it was previously executed).
   * @param _transferId Unique identifier of the transfer.
   * @param _origin Origin domain of the transfer.
   * @param _asset Local asset address (representational or canonical).
   * @param _amount The amount of the asset.
   */
  function _reconcile(bytes32 _transferId, uint32 _origin, address _asset, uint256 _amount) internal {
    // TODO why is this in this facet? Confusing.

    /**
     * Reconcile steps:
     * 1. Sanity check params
     * 2. Verify that this domain is the settlementDomain
     * 3. Verify that an xcallMessage associated with passed in transferId exists (via merkle proof)
     * 4. Verify that an executeMessage associated with passed in transferId exists (via merkle proof)
      NOTE: for either of the above, it's possible that no merkle proof is needed if the domain is either source or target domain
     * 5. Look up the asset to determine its settlement strategy
     * 6. Call handleReconcileSettlement on the given strategy
     * 7. Use returned values to increase routerBalance
     * 8. Emit event
     */

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
}
