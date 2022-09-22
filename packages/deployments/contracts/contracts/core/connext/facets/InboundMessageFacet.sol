// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";

import {AssetLogic} from "../libraries/AssetLogic.sol";
import {BridgeMessage} from "../libraries/BridgeMessage.sol";

import {IAavePool} from "../interfaces/IAavePool.sol";
import {IBridgeToken} from "../interfaces/IBridgeToken.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

/**
 * @title InboundMessageFacet
 * @notice This is the facet that holds all the functionality needed for nomad to reconcile
 * the transfer
 *
 */
contract InboundMessageFacet is BaseConnextFacet {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using BridgeMessage for bytes29;

  // ========== Custom Errors ===========
  error NomadFacet__onlyReplica_notReplica();
  error NomadFacet__onlyRemoteRouter_notRemote();
  error NomadFacet__handle_notTransfer();
  error NomadFacet__reconcile_notConnext();
  error NomadFacet__reconcile_alreadyReconciled();
  error NomadFacet__reconcile_noPortalRouter();

  // ============ Modifiers ============

  /**
   * @notice Only accept messages from an Nomad Replica contract.
   */
  modifier onlyReplica() {
    if (!_isReplica(msg.sender)) {
      revert NomadFacet__onlyReplica_notReplica();
    }
    _;
  }

  /**
   * @notice Only accept messages from a remote Router contract.
   * @param _origin The domain the message is coming from.
   * @param _router The address the message is coming from.
   */
  modifier onlyRemoteRouter(uint32 _origin, bytes32 _router) {
    if (!_isRemoteRouter(_origin, _router)) {
      revert NomadFacet__onlyRemoteRouter_notRemote();
    }
    _;
  }

  // ============ Events ============

  /**
   * @notice Emitted when `reconciled` is called by the bridge on the destination domain
   * @param transferId - The unique identifier of the crosschain transaction
   * @param originDomain - The originating domain
   * @param routers - The CallParams.recipient provided, created as indexed parameter
   * @param asset - The asset that was provided by the bridge
   * @param amount - The amount that was provided by the bridge
   * @param caller - The account that called the function
   */
  event Reconciled(
    bytes32 indexed transferId,
    uint32 originDomain,
    address[] routers,
    address asset,
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

  // ============ External functions ============

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
  ) external onlyReplica onlyRemoteRouter(_origin, _sender) {
    // parse tokenId and action from message
    bytes29 _msg = _message.ref(0).mustBeMessage();
    bytes29 _tokenId = _msg.tokenId();
    bytes29 _action = _msg.action();
    // handle message based on the intended action
    if (!_action.isTransfer()) {
      revert NomadFacet__handle_notTransfer();
    }
    // mint tokens
    address _token = _giveTokens(_origin, _nonce, _tokenId, _action);
    // call _reconcile
    _reconcile(_origin, _token, _action.amnt(), _action.transferId());
  }

  // ============ Internal functions ============

  function _reconcile(
    uint32 _origin,
    address _localToken,
    uint256 _amount,
    bytes32 _transferId
  ) internal {
    // Ensure the transaction has not already been handled (i.e. previously reconciled).
    if (s.reconciledTransfers[_transferId]) {
      revert NomadFacet__reconcile_alreadyReconciled();
    }

    // Mark the transfer as reconciled.
    s.reconciledTransfers[_transferId] = true;

    // If the transfer was executed using fast-liquidity provided by routers, then this value would be set
    // to the participating routers.
    // NOTE: If the transfer was not executed using fast-liquidity, then the funds will be reserved for
    // execution (i.e. funds will be delivered to the transfer's recipient in a subsequent `execute` call).
    address[] memory routers = s.routedTransfers[_transferId];

    // If fast transfer was made using portal liquidity, we need to repay
    // NOTE: routers can repay any-amount out-of-band using the `repayAavePortal` method
    // or by interacting with the aave contracts directly
    uint256 portalTransferAmount = s.portalDebt[_transferId] + s.portalFeeDebt[_transferId];

    uint256 pathLen = routers.length;
    if (portalTransferAmount != 0 && pathLen != 1) {
      // ensure a router took on credit risk
      revert NomadFacet__reconcile_noPortalRouter();
    }

    if (pathLen != 0) {
      // fast liquidity path
      // Credit each router that provided liquidity their due 'share' of the asset.
      uint256 routerAmt = _amount / pathLen;
      for (uint256 i; i < pathLen - 1; ) {
        s.routerBalances[routers[i]][_localToken] += routerAmt;
        unchecked {
          ++i;
        }
      }
      // The last router in the multipath will sweep the remaining balance to account for remainder dust.
      uint256 toSweep = routerAmt + (_amount % pathLen);
      s.routerBalances[routers[pathLen - 1]][_localToken] += toSweep;
    }

    emit Reconciled(_transferId, _origin, routers, _localToken, _amount, msg.sender);
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
   * @param _router The address of the potential remote xApp Router
   */
  function _isRemoteRouter(uint32 _domain, bytes32 _router) internal view returns (bool) {
    return s.remotes[_domain] == _router && _router != bytes32(0);
  }

  /**
   * @notice Mint tokens corresponding to the inbound message
   * @param _origin The domain of the chain from which the transfer originated
   * @param _nonce The unique identifier for the message from origin to
   *        destination
   * @param _tokenId The canonical token identifier to credit
   * @param _action The contents of the transfer message
   * @return _token The address of the local token contract
   */
  function _giveTokens(
    uint32 _origin,
    uint32 _nonce,
    bytes29 _tokenId,
    bytes29 _action
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
      emit Receive(_originAndNonce(_origin, _nonce), _token, address(this), address(0), _amount);
      // exit early
      return _token;
    }
    // send the tokens into circulation on this chain
    if (!s.tokenRegistry.isLocalOrigin(_token)) {
      // if the token is of remote origin, mint the tokens to the
      // recipient on this chain
      IBridgeToken(_token).mint(address(this), _amount);
      // Tell the token what its detailsHash is
      IBridgeToken(_token).setDetailsHash(_action.detailsHash());
    }
    // otherwise, if the token is of local origin,
    // the tokens have been held in escrow in this contract
    // while they have been circulating on remote chains;

    // emit Receive event
    emit Receive(_originAndNonce(_origin, _nonce), _token, address(this), address(0), _amount);
  }
}
