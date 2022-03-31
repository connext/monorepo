// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// import "@summa-tx/memview-sol/contracts/TypedMemView.sol";

import "../../../nomad-core/libs/TypedMemView.sol";

/*
============ Overview: xApp Message Library ============
Messages are the actual data passed between chains.
We define messages as a byte vector in memory.

To make sure that messages are compact and chain agnostic,
we recommend a simple, custom serialization format (rather than ABI encoding).

TypedMemView is a library for working with memory in Solidity.
We use TypedMemView to create a custom serialization format for xApp messages.
We use a 1-byte type tag on the front of the message.
(The typed tag is optional if the user is familiar with writing wire protocols)

Message Flow Between xApps:
1. xApp Router A receives a command on chain A
2. xApp Router A encodes (formats) the information into a message
2. xApp Router A sends the message to xApp Router B on chain B via Nomad
3. xApp Router B receives the message via Nomad
4. xApp Router B decodes (gets) the information from the message and acts on it

The Message Library should contain the following for each type of message:
1. Formatter: a function which takes information as Solidity arguments and
   encodes it as a byte vector in a defined format, producing the message

2. Identifier: a function which takes a byte vector and returns TRUE
   if the vector is matches the expected format of this message type

3. Getter(s): function(s) which parse the information stored in the message
   and return them in the form of Solidity arguments
*/
library Message {
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  enum Types {
    Invalid, // 0
    A // 1 - a message which contains a single number
  }

  // ============ Formatters ============

  /**
   * @notice Given the information needed for a message TypeA
   * (in this example case, the information is just a single number)
   * format a bytes message encoding the information
   * @param _number The number to be included in the TypeA message
   * @return The encoded bytes message
   */
  function formatTypeA(uint256 _number) internal pure returns (bytes memory) {
    return abi.encodePacked(uint8(Types.A), _number);
  }

  // ============ Identifiers ============

  /**
   * @notice Get the type that the TypedMemView is cast to
   * @param _view The message
   * @return _type The type of the message (one of the enum Types)
   */
  function messageType(bytes29 _view) internal pure returns (Types _type) {
    _type = Types(uint8(_view.typeOf()));
  }

  /**
   * @notice Determine whether the message is a message TypeA
   * @param _view The message
   * @return _isTypeA True if the message is TypeA
   */
  function isTypeA(bytes29 _view) internal pure returns (bool _isTypeA) {
    _isTypeA = messageType(_view) == Types.A;
  }

  // ============ Getters ============

  /**
   * @notice Parse the number sent within a TypeA message
   * @param _view The message
   * @return _number The number encoded in the message
   */
  function number(bytes29 _view) internal pure returns (uint256 _number) {
    require(isTypeA(_view), "MessageTemplate/number: view must be of type A");
    _number = uint256(_view.index(0, 32));
  }
}
