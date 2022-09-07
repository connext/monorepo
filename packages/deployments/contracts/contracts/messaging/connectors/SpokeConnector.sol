// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import {TypedMemView} from "../../shared/libraries/TypedMemView.sol";

import {MerkleLib} from "../libraries/Merkle.sol";
import {Message} from "../libraries/Message.sol";

import {MerkleTreeManager} from "../Merkle.sol";

import {Connector} from "./Connector.sol";
import {ConnectorManager} from "./ConnectorManager.sol";

/**
 * @title SpokeConnector
 * @author Connext Labs, Inc.
 * @notice This contract implements the messaging functions needed on the spoke-side of a given AMB.
 * The SpokeConnector extends the HubConnector functionality by being able to send, store, and prove
 * messages.
 *
 * @dev If you are deploying this contract to mainnet, then the mirror values stored in the HubConnector
 * will be unused
 *
 * TODO: what about the queue manager? see Home.sol for context
 */
abstract contract SpokeConnector is Connector, ConnectorManager, MerkleTreeManager, ReentrancyGuard {
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
   * @notice Minimum gas for processing a received message (reserved for handle)
   */
  uint256 public immutable PROCESS_GAS;

  /**
   * @notice Reserved gas (to ensure tx completes in case message processing runs out)
   */
  uint256 public immutable RESERVE_GAS;

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

  /**
   * @notice domain => next available nonce for the domain
   */
  mapping(uint32 => uint32) public nonces;

  /**
   * @notice Mapping of message leaves to MessageStatus, keyed on leaf
   */
  mapping(bytes32 => MessageStatus) public messages;

  // ============ Modifiers ============

  modifier onlyWhitelistedSender() {
    require(whitelistedSenders[msg.sender], "!whitelisted");
    _;
  }

  // ============ Constructor ============

  /**
   * @notice Creates a new SpokeConnector instance
   * @param _domain The domain this connector lives on
   * @param _mirrorDomain The spoke domain
   * @param _amb The address of the amb on the domain this connector lives on
   * @param _rootManager The address of the RootManager on mainnet
   * @param _mirrorConnector The address of the spoke connector
   * @param _mirrorGas The gas costs required to process a message on mirror
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
    uint256 _mirrorGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    ConnectorManager()
    MerkleTreeManager()
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorGas)
  {
    // sanity check constants
    require(_processGas >= 850_000, "!process gas");
    require(_reserveGas >= 15_000, "!reserve gas");

    //
    PROCESS_GAS = _processGas;
    RESERVE_GAS = _reserveGas;
  }

  // ============ Admin fns ============
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
    return tree.root();
  }

  /**
   * @notice This provides the implementation for what is defined in the ConnectorManager
   * to avoid storing the domain redundantly
   */
  function localDomain() external view override returns (uint32) {
    return DOMAIN;
  }

  /**
   * @notice This returns the root of all messages with the origin domain as this domain (i.e.
   * all outbound messages)
   */
  function send() external {
    bytes memory _data = abi.encodePacked(tree.root());
    _sendMessage(_data);
    emit MessageSent(_data, msg.sender);
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
  ) external onlyWhitelistedSender returns (bytes32) {
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
    emit Dispatch(_messageHash, count() - 1, tree.root(), _message);
    return _messageHash;
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

  // ============ Private fns ============
  /**
   * @notice This is either called by the Connector (AKA `this`) on the spoke (L2) chain after retrieving
   * latest `aggregateRoot` from the AMB (sourced from mainnet) OR called by the AMB directly.
   * @dev Must check the msg.sender on the origin chain to ensure only the root manager is passing
   * these roots.
   */
  function updateAggregateRoot(bytes32 _newRoot) internal {
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
  // TODO: Reentrancy
  function process(bytes memory _message) internal nonReentrant returns (bool _success) {
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
  }
}
