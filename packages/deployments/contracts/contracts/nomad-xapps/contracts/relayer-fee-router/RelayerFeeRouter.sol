// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.11;

// ============ Internal Imports ============
import {IConnext} from "../../../interfaces/IConnext.sol";
import {Router} from "../Router.sol";
import {XAppConnectionClient} from "../XAppConnectionClient.sol";
import {RelayerFeeMessage} from "./RelayerFeeMessage.sol";
import {IBridgeToken} from "../../interfaces/bridge/IBridgeToken.sol";

// ============ External Imports ============
import {Home} from "../../../nomad-core/contracts/Home.sol";
import {Version0} from "../../../nomad-core/contracts/Version0.sol";
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";

// import "../../../../lib/forge-std/src/console.sol";

/**
 * @title BridgeRouter
 */
contract RelayerFeeRouter is Version0, Router {
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using RelayerFeeMessage for bytes29;

  // ========== Custom Errors ===========

  error RelayerFeeRouter__onlyConnext_notConnext();
  error RelayerFeeRouter__send_claimEmpty();
  error RelayerFeeRouter__send_recipientEmpty();

  // ============ Public Storage ============

  IConnext public connext;

  // ============ Upgrade Gap ============

  // gap for upgrade safety
  uint256[49] private __GAP;

  // ======== Events =========

  /**
   * @notice Emitted when a fees claim has been initialized in this domain
   * @param domain The domain where to claim the fees
   * @param recipient The address of the relayer
   * @param amount The amount of fees to claim
   * @param transactionIds A group of transaction ids to claim for fee bumps
   * @param remote Remote RelayerFeeRouter address
   * @param message The message sent to the destination domain
   */
  event Send(uint32 domain, address recipient, uint256 amount, bytes32[] transactionIds, bytes32 remote, bytes message);

  /**
   * @notice Emitted when the a fees claim message has arrived to this domain
   * @param originAndNonce Domain where the transfer originated and the unique identifier
   * for the message from origin to destination, combined in a single field ((origin << 32) & nonce)
   * @param origin Domain where the transfer originated
   * @param recipient The address of the relayer
   * @param amount The amount of fees to claim
   * @param transactionIds A group of transaction ids to claim for fee bumps
   */
  event Receive(
    uint64 indexed originAndNonce,
    uint32 indexed origin,
    address indexed recipient,
    uint256 amount,
    bytes32[] transactionIds
  );

  /**
   * @notice Emitted when a new Connext address is set
   * @param connext The new connext address
   */
  event SetConnext(address indexed connext);

  // ======== Receive =======
  receive() external payable {}

  fallback() external payable {}

  // ============ Modifiers ============

  /**
   * @notice Restricts the caller to the local bridge router
   */
  modifier onlyConnext() {
    if (msg.sender != address(connext)) revert RelayerFeeRouter__onlyConnext_notConnext();
    _;
  }

  // ======== Initializer ========

  function initialize(address _xAppConnectionManager, address _connext) public initializer {
    connext = IConnext(_connext);
    __XAppConnectionClient_initialize(_xAppConnectionManager);

    emit SetConnext(_connext);
  }

  /**
   * @notice Sets the transaction manager.
   * @dev Connext and relayer fee router store references to each other
   * @param _connext The address of the Connext implementation
   */
  function setConnext(address _connext) external onlyOwner {
    connext = IConnext(_connext);
    emit SetConnext(_connext);
  }

  // ======== External: Send Claim =========

  /**
   * @notice Sends a request to claim the fees in the originated domain
   * @param _domain The domain where to claim the fees
   * @param _recipient The address of the relayer
   * @param _amount The amount of fees to claim
   * @param _transactionIds A group of transaction ids to claim for fee bumps
   */
  function send(
    uint32 _domain,
    address _recipient,
    uint256 _amount,
    bytes32[] calldata _transactionIds
  ) external onlyConnext {
    if (_amount == 0 && _transactionIds.length == 0) revert RelayerFeeRouter__send_claimEmpty();
    if (_recipient == address(0)) revert RelayerFeeRouter__send_recipientEmpty();

    // get remote RelayerFeeRouter address; revert if not found
    bytes32 remote = _mustHaveRemote(_domain);

    bytes memory message = RelayerFeeMessage.formatClaimFees(_recipient, _amount, _transactionIds);

    xAppConnectionManager.home().dispatch(_domain, remote, message);

    // emit Send event
    emit Send(_domain, _recipient, _amount, _transactionIds, remote, message);
  }

  // ======== External: Handle =========

  /**
   * @notice Handles an incoming message
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
  ) external override onlyReplica onlyRemoteRouter(_origin, _sender) {
    // parse tokenId and action from message
    bytes29 _msg = _message.ref(0).mustBeClaimFees();

    address recipient = _msg.recipient();
    uint256 amount = _msg.amount();
    bytes32[] memory transactionIds = _msg.transactionIds();

    // TODO - claim fee in connext

    // emit Receive event
    emit Receive(_originAndNonce(_origin, _nonce), _origin, recipient, amount, transactionIds);
  }

  /**
   * @dev explicit override for compiler inheritance
   * @dev explicit override for compiler inheritance
   * @return domain of chain on which the contract is deployed
   */
  function _localDomain() internal view override(XAppConnectionClient) returns (uint32) {
    return XAppConnectionClient._localDomain();
  }

  /**
   * @notice Internal utility function that combines
   * `_origin` and `_nonce`.
   * @dev Both origin and nonce should be less than 2^32 - 1
   * @param _origin Domain of chain where the transfer originated
   * @param _nonce The unique identifier for the message from origin to destination
   * @return Returns (`_origin` << 32) & `_nonce`
   */
  function _originAndNonce(uint32 _origin, uint32 _nonce) internal pure returns (uint64) {
    return (uint64(_origin) << 32) | _nonce;
  }
}
