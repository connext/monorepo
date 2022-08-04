// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IMessaging} from "./interfaces/IMessaging.sol";
import {IBridgeRouter} from "../connext/interfaces/IBridgeRouter.sol";
import {MerkleLib} from "../../nomad-core/libs/Merkle.sol";
import {MerkleTreeManager} from "../../nomad-core/contracts/Merkle.sol";
import {Message} from "../../nomad-core/libs/Message.sol";
import {NomadBase} from "../../nomad-core/contracts/NomadBase.sol";

// FIXME: This is an extremely rough contract designed to be an early PoC. Check every line before prod!

contract Messaging is MerkleTreeManager, NomadBase {
  using MerkleLib for MerkleLib.Tree;

  IBridgeRouter bridgeRouter;
  IConnector connector;
  // TODO for Eth L1, we should write an AMB aggregator/router contract
  address AMBaddress;
  uint32 localDomain;

  /**
   * @notice This tracks the root of the tree containing outbound roots from all other supported
   * domains
   * @dev This root is the root of the tree that is aggregated on mainnet (composed of all the roots
   * of previous trees)
   */
  bytes32 public inboundRoot;

  /**
   * @notice This tracks the root of all transfers with the origin domain as this domain (i.e.
   * all outbound transfers)
   */
  bytes32 public outboundRoot;

  // Status of Message:
  //   0 - None - message has not been proven or processed
  //   1 - Proven - message inclusion proof has been validated
  //   2 - Processed - message has been dispatched to recipient
  enum MessageStatus {
    None,
    Proven,
    Processed
  }

  // Minimum gas for message processing
  uint256 public immutable PROCESS_GAS;

  // Reserved gas (to ensure tx completes in case message processing runs out)
  uint256 public immutable RESERVE_GAS;

  // domain => next available nonce for the domain
  mapping(uint32 => uint32) public nonces;

  // Mapping of message leaves to MessageStatus
  mapping(bytes32 => MessageStatus) public messages;

  modifier onlyBridgeRouter() {
    require(msg.sender == address(bridgeRouter), "!bridgeRouter");
    _;
  }

  modifier onlyAMB() {
    require(msg.sender == AMBaddress, "!AMBaddress");
    _;
  }

  /**
   * @notice This function should send a message through the AMB by adding it to the merkle root
   * stored on that chain.
   */
  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external onlyBridgeRouter {
    // require(_messageBody.length <= MAX_MESSAGE_BODY_BYTES, "msg too long");
    // get the next nonce for the destination domain, then increment it
    uint32 _nonce = nonces[_destinationDomain]; // TODO how do we want to handle nonces?
    nonces[_destinationDomain] = _nonce + 1;
    // format the message into packed bytes
    bytes memory _message = Message.formatMessage(
      localDomain,
      bytes32(uint256(uint160(msg.sender))), // TODO necessary?
      _nonce,
      _destinationDomain,
      _recipientAddress,
      _messageBody
    );
    // insert the hashed message into the Merkle tree
    bytes32 _messageHash = keccak256(_message);
    tree.insert(_messageHash);
    // enqueue the new Merkle root after inserting the message
    currentRoot = root();
    // Emit Dispatch event with message information
    // note: leafIndex is count() - 1 since new leaf has already been inserted
    // emit Dispatch(_messageHash, count() - 1, _destinationAndNonce(_destinationDomain, _nonce), committedRoot, _message);
  }

  /**
   * @notice Must be able to call the `handle` function on the BridgeRouter contract. This is called
   * on the destination domain to handle incoming messages
   */
  function proveAndProcess(
    bytes memory _message,
    bytes32[32] calldata _proof,
    uint256 _index
  ) external {
    require(prove(keccak256(_message), _proof, _index), "!prove");
    process(_message);
  }

  /**
   * @notice This is called by the AMB when roots are passed up from mainnet
   * @dev Must check the msg.sender on the origin chain to ensure only the root manager is passing
   * these roots
   */
  function update(bytes32 _newRoot) external onlyAMB {}

  /**
   * @notice This is called by relayers to trigger passing of current root to mainnet root manager
   * @dev This is called at specific time intervals
   */
  function send() external {}

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
    // TODO actually implement this later
    return true;
    // ensure that message has not been proven or processed
    // require(messages[_leaf] == MessageStatus.None, "!MessageStatus.None");
    // // calculate the expected root based on the proof
    // bytes32 _calculatedRoot = MerkleLib.branchRoot(_leaf, _proof, _index);
    // // if the root is valid, change status to Proven
    // if (acceptableRoot(_calculatedRoot)) {
    //   messages[_leaf] = MessageStatus.Proven;
    //   return true;
    // }
    // return false;
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
    require(_m.destination() == localDomain, "!destination");
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
    // emit Process(_messageHash, _success, _returnData);
    // reset re-entrancy guard
    // entered = 1;
  }
}
