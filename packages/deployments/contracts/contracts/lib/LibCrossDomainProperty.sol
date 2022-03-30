// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../nomad-core/libs/TypedMemView.sol";

library LibCrossDomainProperty {
  // ============ Libraries ============

  using TypedMemView for bytes29;
  using TypedMemView for bytes;

  // ============ Enums ============

  /**
   * Contains information so the properties can be type-checked properly
   */
  enum Types {
    Invalid, // 0
    DomainAndSender // 1
  }

  // ============ Structs ============

  /**
   * Struct containing the domain and an address of the caller of a function on that
   * domain.
   */
  struct DomainAndSender {
    uint32 domain;
    address sender;
  }

  // ============ Constants ============

  uint256 private constant PROPERTY_LEN = 25; // 1 byte identifer + 4 bytes domain + 20 bytes address
  // default value is the TypedMemView null view
  bytes29 public constant EMPTY = hex"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  bytes public constant EMPTY_BYTES = hex"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

  // ============ Modifiers ============

  /**
   * @notice Asserts a property is of type `_t`
   * @param _view The stored property
   * @param _t The expected type
   */
  modifier typeAssert(bytes29 _view, Types _t) {
    _view.assertType(uint40(_t));
    _;
  }

  // ============ Internal Functions ============

  /**
   * @notice Checks that view is a valid property length
   * @param _view The bytes string
   * @return TRUE if length is valid
   */
  function isValidPropertyLength(bytes29 _view) internal pure returns (bool) {
    uint256 _len = _view.len();
    return _len == PROPERTY_LEN;
  }

  /**
   * @notice Checks that the property is of the specified type
   * @param _type the type to check for
   * @param _property The property
   * @return True if the property is of the specified type
   */
  function isType(bytes29 _property, Types _type) internal pure returns (bool) {
    return propertyType(_property) == uint8(_type);
  }

  /**
   * @notice Checks that the property is of type DomainAndSender
   * @param _property The property
   * @return True if the property is of type DomainAndSender
   */
  function isDomainAndSender(bytes29 _property) internal pure returns (bool) {
    return isValidPropertyLength(_property) && isType(_property, Types.DomainAndSender);
  }

  /**
   * @notice Retrieves the identifier from property
   * @param _property The property
   * @return The property type
   */
  function propertyType(bytes29 _property) internal pure returns (uint8) {
    return uint8(_property.indexUint(0, 1));
  }

  /**
   * @notice Converts to a Property
   * @param _view The property
   * @return The newly typed property
   */
  function tryAsProperty(bytes29 _view) internal pure returns (bytes29) {
    if (isValidPropertyLength(_view)) {
      return _view.castTo(uint40(Types.DomainAndSender));
    }
    return TypedMemView.nullView();
  }

  /**
   * @notice Asserts that the property is of type DomainAndSender
   * @param _view The property
   * @return The property
   */
  function mustBeProperty(bytes29 _view) internal pure returns (bytes29) {
    return tryAsProperty(_view).assertValid();
  }

  /**
   * @notice Retrieves the sender from a property
   * @param _property The property
   * @return The sender address
   */
  function sender(bytes29 _property) internal pure typeAssert(_property, Types.DomainAndSender) returns (address) {
    // before = 1 byte id + 4 bytes domain = 5 bytes
    return _property.indexAddress(5);
  }

  /**
   * @notice Retrieves the domain from a property
   * @param _property The property
   * @return The sender address
   */
  function domain(bytes29 _property) internal pure typeAssert(_property, Types.DomainAndSender) returns (uint32) {
    // before = 1 byte identifier = 1 byte
    return uint32(_property.indexUint(1, 4));
  }

  /**
   * @notice Creates a serialized property from components
   * @param _domain The domain
   * @param _sender The sender
   * @return The formatted view
   */
  function formatDomainAndSender(uint32 _domain, address _sender) internal pure returns (bytes29) {
    return abi.encodePacked(Types.DomainAndSender, _domain, _sender).ref(0).castTo(uint40(Types.DomainAndSender));
  }

  /**
   * @notice Creates a serialized property from components
   * @param _domain The domain
   * @param _sender The sender
   * @return The formatted view
   */
  function formatDomainAndSenderBytes(uint32 _domain, address _sender) internal pure returns (bytes memory) {
    return abi.encodePacked(Types.DomainAndSender, _domain, _sender);
  }

  /**
   * @notice Creates a serialized property from components
   * @param _property The bytes representation of the property
   */
  function parseDomainAndSenderBytes(bytes memory _property) internal pure returns (bytes29) {
    return mustBeProperty(_property.ref(0));
  }
}
