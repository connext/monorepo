// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {TypedMemView} from "../../shared/libraries/TypedMemView.sol";
import {ProposedOwnable} from "../../shared/ProposedOwnable.sol";

import {IBridgeRouter} from "../../core/connext/interfaces/IBridgeRouter.sol";

import {MerkleLib} from "../libraries/Merkle.sol";
import {Message} from "../libraries/Message.sol";
import {IConnector} from "../interfaces/IConnector.sol";

import {MerkleTreeManager} from "../Merkle.sol";

import {ConnectorManager} from "./ConnectorManager.sol";

// FIXME: This is an extremely rough contract designed to be an early PoC. Check every line before prod!
// TODO for Eth L1, we should write an AMB aggregator/router contract

/**
 * @notice This contract holds all the logic for managing outbound roots and aggregate roots. It will handle
 * all outbound messages by adding the transfer to the `outboundRoot`, and store the aggregate root for proofs.
 *
 * The implementer contract - which should adhere to the naming convention <Domain><L1|L2>Connector - will
 * override virtual methods in this abstract contract to interface with a domain-specific AMB.
 * @dev Optimization: combine with the connector contract
 */

// TODO: Home.sol uses a queue to manage updates into the merkle tree, is this required?
abstract contract Connector is ProposedOwnable, MerkleTreeManager, ConnectorManager, IConnector {
  // ============ Libraries ============

  using MerkleLib for MerkleLib.Tree;
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using Message for bytes29;

  // ============ Events ============
  event SenderAdded(address sender);

  event SenderRemoved(address sender);

  event AggregateRootUpdated(bytes32 current, bytes32 previous);

  event Dispatch(bytes32 leaf, uint256 index, bytes32 root, bytes message);

  event Process(bytes32 leaf, bool success, bytes returnData);

  event MessageSent(bytes data, address caller);

  event MessageProcessed(bytes data, address caller);

  event MirrorConnectorUpdated(address previous, address current);

  // ============ Structs ============
  // Status of Message:
  //   0 - None - message has not been proven or processed
  //   1 - Proven - message inclusion proof has been validated
  //   2 - Processed - message has been dispatched to recipient
  enum MessageStatus {
    None,
    Proven,
    Processed
  }

  // ============ Public storage ============
  /**
   * @notice The domain of this Messaging (i.e. Connector) contract.
   */
  uint32 public immutable DOMAIN;

  /**
   * @notice Address of the AMB on this domain.
   */
  address public immutable AMB;

  /**
   * @notice RootManager contract address.
   */
  address public immutable ROOT_MANAGER;

  /**
   * @notice Connector on L2 for L1 connectors, and vice versa.
   */
  address public mirrorConnector;

  /**
   * @notice Domain of mirror connector.
   * @dev Immutable, as the domain should be known at deployment time.
   */
  uint32 public immutable mirrorDomain;

  /**
   * @notice Gas costs forwarded to the `processMessage` call on the mirror domain
   */
  uint256 public mirrorProcessGas;

  /**
   * @notice This tracks the root of the tree containing outbound roots from all other supported
   * domains
   * @dev This root is the root of the tree that is aggregated on mainnet (composed of all the roots
   * of previous trees)
   */
  bytes32 public aggregateRoot;

  /**
   * @notice This tracks whether the root has been proven to exist within the given aggregate root
   * @dev Tracking this is an optimization so you dont have to prove inclusion of the same constituent
   * root many times
   */
  mapping(bytes32 => bool) public provenRoots;

  /**
   * @dev This is used for the `onlyWhitelistedSender` modifier, which gates who
   * can send messages using `dispatch`
   */
  mapping(address => bool) public whitelistedSenders;

  // Minimum gas for message processing
  uint256 public immutable PROCESS_GAS;

  // Reserved gas (to ensure tx completes in case message processing runs out)
  uint256 public immutable RESERVE_GAS;

  // domain => next available nonce for the domain
  mapping(uint32 => uint32) public nonces;

  // Mapping of message leaves to MessageStatus
  mapping(bytes32 => MessageStatus) public messages;

  // ============ Modifiers ============
  modifier onlyAMB() {
    require(msg.sender == AMB, "!AMB");
    _;
  }

  modifier onlyRootManager() {
    // NOTE: RootManager will be zero address for spoke connectors.
    // Only root manager can dispatch a message to spokes/L2s via the hub connector.
    require(msg.sender == ROOT_MANAGER, "!rootManager");
    _;
  }

  modifier onlyWhitelistedSender() {
    require(whitelistedSenders[msg.sender], "!whitelisted");
    _;
  }

  // ============ Constructor ============

  /**
   * @notice Creates a new Connector instance
   * @dev The connectors are deployed such that there is one on each side of an AMB (i.e.
   * for optimism, there is one connector on optimism and one connector on mainnet)
   * @param _domain The domain this connector lives on
   * @param _mirrorDomain The domain the corresponding connector lives on
   * @param _amb The address of the amb on the domain this connector lives on
   * @param _rootManager The address of the RootManager on mainnet
   * @param _mirrorConnector The address of the corresponding connector on the mirror domain
   * @param _mirrorProcessGas The gas costs to call `.processMessage` on the mirror connector
   * @param _processGas The gas costs used in `handle` to ensure meaningful state changes can occur (minimum gas needed
   * to handle transaction)
   * @param _reserveGas The gas costs reserved when `handle` is called to ensure failures are handled
   */
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorProcessGas,
    uint256 _processGas,
    uint256 _reserveGas
  ) ProposedOwnable() MerkleTreeManager() ConnectorManager(_domain) {
    // Sanity checks.
    require(_domain > 0, "!domain");
    // require(_amb != address(0), "!amb"); // May be address(0) if on mainnet
    require(_rootManager != address(0), "!rootManager");

    _setOwner(msg.sender);

    DOMAIN = _domain;
    AMB = _amb;
    ROOT_MANAGER = _rootManager;

    mirrorDomain = _mirrorDomain;
    mirrorConnector = _mirrorConnector;
    mirrorProcessGas = _mirrorProcessGas;

    // TODO: constants for these min values
    require(_processGas >= 850_000, "!process gas");
    require(_reserveGas >= 15_000, "!reserve gas");
    PROCESS_GAS = _processGas;
    RESERVE_GAS = _reserveGas;
  }

  // ============ Admin fns ============
  /**
   * @notice Sets the address of the l2Connector for this domain
   */
  function setMirrorConnector(address _mirrorConnector) public onlyOwner {
    emit MirrorConnectorUpdated(mirrorConnector, _mirrorConnector);
    mirrorConnector = _mirrorConnector;
  }

  /**
   * @notice Adds a sender to the whitelist
   * @dev Only whitelisted routers can call `dispatch`
   */
  function addSender(address _sender) public onlyOwner {
    whitelistedSenders[_sender] = true;
    emit SenderAdded(_sender);
  }

  /**
   * @notice Removes a sender from the whitelist
   * @dev Only whitelisted routers can call `dispatch`
   */
  function removeSender(address _sender) public onlyOwner {
    whitelistedSenders[_sender] = false;
    emit SenderRemoved(_sender);
  }

  // ============ Public fns ============
  /**
   * @notice This returns the root of all messages with the origin domain as this domain (i.e.
   * all outbound messages)
   */
  function outboundRoot() external view returns (bytes32) {
    return root();
  }

  /**
   * @notice This is called by relayers to trigger passing of current root to mainnet root manager.
   * @dev At runtime, this method should be called at specific time intervals.
   */
  function send() external {
    bytes memory _data = abi.encodePacked(root());
    _sendMessage(_data);
    emit MessageSent(_data, msg.sender);
  }

  /**
   * @notice This is called by the root manager *only* on mainnet to propagate the aggregate root
   */
  function sendMessage(bytes memory _data) external onlyRootManager {
    _sendMessage(_data);
    emit MessageSent(_data, msg.sender);
  }

  /**
   * @notice This is called by AMBs to process messages originating from mirror connector
   */
  function processMessage(bytes memory _data) external onlyAMB {
    _processMessage(_data);
    emit MessageProcessed(_data, msg.sender);
  }

  /**
   * @notice Checks the cross domain sender for a given address
   */
  function verifySender(address _expected) external returns (bool) {
    return _verifySender(_expected);
  }

  /**
   * @notice This function adds transfers to the outbound transfer merkle tree.
   * @dev The root of this tree will eventually be dispatched to mainnet via `send`. On mainnet (the "hub"),
   * it will be combined into a single aggregate root by RootManager (along with outbound roots from other
   * chains). This aggregate root will be redistributed to all destination chains.
   */
  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external onlyWhitelistedSender {
    // get the next nonce for the destination domain, then increment it
    uint32 _nonce = nonces[_destinationDomain];
    nonces[_destinationDomain] = _nonce + 1;
    // format the message into packed bytes
    bytes memory _message = Message.formatMessage(
      DOMAIN,
      bytes32(uint256(uint160(msg.sender))), // TODO necessary?
      _nonce,
      _destinationDomain,
      _recipientAddress,
      _messageBody
    );
    // insert the hashed message into the Merkle tree
    bytes32 _messageHash = keccak256(_message);
    tree.insert(_messageHash);
    // TODO: see comment on queue manager at the top
    // Emit Dispatch event with message information
    // note: leafIndex is count() - 1 since new leaf has already been inserted
    emit Dispatch(_messageHash, count() - 1, root(), _message);
  }

  /**
   * @notice Must be able to call the `handle` function on the BridgeRouter contract. This is called
   * on the destination domain to handle incoming messages.
   * @dev Intended to be called by the relayer at specific intervals during runtime.
   */
  function proveAndProcess(
    bytes memory _message,
    bytes32[32] calldata _proof,
    uint256 _index
  ) external {
    // 1. must prove existence of the given outbound root from destination domain
    // 2. must prove the existence of the given message in the destination
    // domain outbound root
    require(prove(keccak256(_message), _proof, _index), "!prove");
    // FIXME: implement proofs above before processing the message
    process(_message);
  }

  // ============ Virtual fns ============
  /**
   * @notice This function is used by the Connext contract on the l2 domain to send a message to the
   * l1 domain (i.e. called by Connext on optimism to send a message to mainnet with roots)
   */
  function _sendMessage(bytes memory _data) internal virtual;

  /**
   * @notice This function is used by the AMBs to handle incoming messages. Should store the latest
   * root generated on the l2 domain.
   */
  function _processMessage(bytes memory _data) internal virtual;

  /**
   * @notice Verify that the msg.sender is the correct AMB contract, and that the message's origin sender
   * is the expected address.
   * @dev Should be overridden by the implementing Connector contract.
   */
  function _verifySender(address _expected) internal virtual returns (bool);

  // ============ Private fns ============

  /**
   * @notice This is either called by the Connector (AKA `this`) on the spoke (L2) chain after retrieving
   * latest `aggregateRoot` from the AMB (sourced from mainnet) OR called by the AMB directly.
   * @dev Must check the msg.sender on the origin chain to ensure only the root manager is passing
   * these roots.
   */
  function update(bytes32 _newRoot) internal {
    emit AggregateRootUpdated(_newRoot, aggregateRoot);
    aggregateRoot = _newRoot;
  }

  /**
   * @notice Attempts to prove the validity of message given its leaf, the
   * merkle proof of inclusion for the leaf, and the index of the leaf.
   * @dev Reverts if message's MessageStatus != None (i.e. if message was
   * already proven or processed)
   * @dev For convenience, we allow proving against any previous root.
   * This means that witnesses never need to be updated for the new root
   * @param _leaf Leaf of message to prove
   * @param _proof Merkle proof of inclusion for leaf
   * @param _index Index of leaf in home's merkle tree
   * @return Returns true if proof was valid and `prove` call succeeded
   **/
  function prove(
    bytes32 _leaf,
    bytes32[32] calldata _proof,
    uint256 _index
  ) internal returns (bool) {
    // FIXME: actually implement this later
    // ensure that message has not been proven or processed
    require(messages[_leaf] == MessageStatus.None, "!MessageStatus.None");
    // // calculate the expected root based on the proof
    // bytes32 _calculatedRoot = MerkleLib.branchRoot(_leaf, _proof, _index);
    // // if the root is valid, change status to Proven
    // if (acceptableRoot(_calculatedRoot)) {
    //   messages[_leaf] = MessageStatus.Proven;
    //   return true;
    // }
    // return false;

    messages[_leaf] = MessageStatus.Proven;
    return true;
  }

  /**
   * @notice Given formatted message, attempts to dispatch
   * message payload to end recipient.
   * @dev Recipient must implement a `handle` method (refer to IMessageRecipient.sol)
   * Reverts if formatted message's destination domain is not the Replica's domain,
   * if message has not been proven,
   * or if not enough gas is provided for the dispatch transaction.
   * @param _message Formatted message
   * @return _success TRUE iff dispatch transaction succeeded
   */
  // TODO Reentrancy
  function process(bytes memory _message) internal returns (bool _success) {
    bytes29 _m = _message.ref(0);
    // ensure message was meant for this domain
    require(_m.destination() == DOMAIN, "!destination");
    // ensure message has been proven
    bytes32 _messageHash = _m.keccak();
    require(messages[_messageHash] == MessageStatus.Proven, "!proven");
    // check re-entrancy guard
    // require(entered == 1, "!reentrant");
    // entered = 0;
    // update message status as processed
    messages[_messageHash] = MessageStatus.Processed;
    // A call running out of gas TYPICALLY errors the whole tx. We want to
    // a) ensure the call has a sufficient amount of gas to make a
    //    meaningful state change.
    // b) ensure that if the subcall runs out of gas, that the tx as a whole
    //    does not revert (i.e. we still mark the message processed)
    // To do this, we require that we have enough gas to process
    // and still return. We then delegate only the minimum processing gas.
    require(gasleft() >= PROCESS_GAS + RESERVE_GAS, "!gas");
    // get the message recipient
    address _recipient = _m.recipientAddress();
    // set up for assembly call
    uint256 _toCopy;
    uint256 _maxCopy = 256;
    uint256 _gas = PROCESS_GAS;
    // allocate memory for returndata
    bytes memory _returnData = new bytes(_maxCopy);
    bytes memory _calldata = abi.encodeWithSignature(
      "handle(uint32,uint32,bytes32,bytes)",
      _m.origin(),
      _m.nonce(),
      _m.sender(),
      _m.body().clone()
    );
    // dispatch message to recipient
    // by assembly calling "handle" function
    // we call via assembly to avoid memcopying a very large returndata
    // returned by a malicious contract
    assembly {
      _success := call(
        _gas, // gas
        _recipient, // recipient
        0, // ether value
        add(_calldata, 0x20), // inloc
        mload(_calldata), // inlen
        0, // outloc
        0 // outlen
      )
      // limit our copy to 256 bytes
      _toCopy := returndatasize()
      if gt(_toCopy, _maxCopy) {
        _toCopy := _maxCopy
      }
      // Store the length of the copied bytes
      mstore(_returnData, _toCopy)
      // copy the bytes from returndata[0:_toCopy]
      returndatacopy(add(_returnData, 0x20), 0, _toCopy)
    }
    // emit process results
    emit Process(_messageHash, _success, _returnData);
    // reset re-entrancy guard
    // entered = 1;
  }
}
