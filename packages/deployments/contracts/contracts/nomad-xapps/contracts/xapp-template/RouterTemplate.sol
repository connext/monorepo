// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// ============ External Imports ============
// import {TypedMemView} from "@summa-tx/memview-sol/contracts/TypedMemView.sol";
import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";
// ============ Internal Imports ============
import {Message} from "./MessageTemplate.sol";
import {Router} from "../Router.sol";
import {XAppConnectionClient} from "../XAppConnectionClient.sol";

/*
============ Overview: Building a xApp ============
To implement a xApp, define the actions you would like to execute across chains.
For each type of action,
- in the xApp Router
    - implement a function like doTypeA to initiate the action from one domain to another (add your own parameters and logic)
    - implement a corresponding _handle function to receive, parse, and execute this type of message on the remote domain
    - add logic to the handle function to route incoming messages to the appropriate _handle function
- in the Message library,
    - implement functions to *format* the message to send to the other chain (encodes all necessary information for the action)
    - implement functions to *parse* the message once it is received on the other chain (decode all necessary information for the action)
*/
contract RouterTemplate is Router {
  // ============ Libraries ============

  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using Message for bytes29;

  // ============ Events ============

  event TypeAReceived(uint256 number);

  // ============ Constructor ============

  constructor(address _xAppConnectionManager) {
    __XAppConnectionClient_initialize(_xAppConnectionManager);
  }

  // ============ Handle message functions ============

  /**
   * @notice Receive messages sent via Nomad from other remote xApp Routers;
   * parse the contents of the message and enact the message's effects on the local chain
   * @dev Called by an Nomad Replica contract while processing a message sent via Nomad
   * @param _origin The domain the message is coming from
   * @param _sender The address the message is coming from
   * @param _message The message in the form of raw bytes
   */
  function handle(
    uint32 _origin,
    uint32, // nonce
    bytes32 _sender,
    bytes memory _message
  ) external override onlyReplica onlyRemoteRouter(_origin, _sender) {
    bytes29 _msg = _message.ref(0);
    // route message to appropriate _handle function
    // based on what type of message is encoded
    if (_msg.isTypeA()) {
      _handleTypeA(_msg);
    } else {
      // if _message doesn't match any valid actions, revert
      require(false, "!valid action");
    }
  }

  /**
   * @notice Once the Router has parsed a message in the handle function and determined it is Type A,
   * call this internal function to parse specific information from the message,
   * and enact the message's action on this chain
   * @param _message The message in the form of raw bytes
   */
  function _handleTypeA(bytes29 _message) internal {
    // parse the information from the message
    uint256 _number = _message.number();
    // implement the logic for executing the action
    // (in this example case, emit an event with the number that was sent)
    emit TypeAReceived(_number);
  }

  // ============ Dispatch message functions ============

  /**
   * @notice Send a message of "Type A" to a remote xApp Router via Nomad;
   * this message is called to take some action in the cross-chain context
   * Example message types:
   * Sending tokens from this chain to the destination chain;
   * params would be the address of the token, the amount of the token to send, and the address of the recipient
   * @param _destinationDomain The domain to send the message to
   * @param _number Example parameter used in message TypeA - a number to send to another chain
   */
  function dispatchTypeA(uint32 _destinationDomain, uint256 _number) external {
    // get the xApp Router at the destinationDomain
    bytes32 _remoteRouterAddress = _mustHaveRemote(_destinationDomain);
    // encode a message to send to the remote xApp Router
    bytes memory _outboundMessage = Message.formatTypeA(_number);
    // send the message to the xApp Router
    _home().dispatch(_destinationDomain, _remoteRouterAddress, _outboundMessage);
  }
}
