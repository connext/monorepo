// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "../ForgeHelper.sol";

import "../../contracts/interpreters/Executor.sol";

contract LibCrossDomainPropertyTest is ForgeHelper {
  // ============ Libraries ============

  using stdStorage for StdStorage;
  using TypedMemView for bytes29;
  using TypedMemView for bytes;

  // ============ Storage ============

  uint32 domain = uint32(1000);
  address sender = address(1);

  // ============ Setup ============

  function setUp() public {}

  // ============ Utils ============
  function getProperty() public returns (bytes29) {
    return LibCrossDomainProperty.formatDomainAndSender(domain, sender);
  }

  function getPropertyBytes() public returns (bytes memory) {
    return LibCrossDomainProperty.formatDomainAndSenderBytes(domain, sender);
  }

  // ============ isValidPropertyLength ============

  // Should work
  function testValidPropertyLength() public {
    bytes29 property = getProperty();
    assertTrue(LibCrossDomainProperty.isValidPropertyLength(property));
    assertTrue(!LibCrossDomainProperty.isValidPropertyLength(LibCrossDomainProperty.EMPTY));
  }

  // ============ isType ============

  // Should work
  function testIsType() public {
    bytes29 property = getProperty();
    assertTrue(LibCrossDomainProperty.isType(property, LibCrossDomainProperty.Types.DomainAndSender));
    assertTrue(!LibCrossDomainProperty.isType(property, LibCrossDomainProperty.Types.Invalid));
  }

  // ============ isDomainAndSender ============

  // Should work
  function testIsDomainAndSender() public {
    bytes29 property = getProperty();
    assertTrue(LibCrossDomainProperty.isDomainAndSender(property));
    assertTrue(!LibCrossDomainProperty.isDomainAndSender(TypedMemView.nullView()));
  }

  // ============ propertyType ============

  // Should work
  function testPropertyType() public {
    uint8 propertyType = LibCrossDomainProperty.propertyType(getProperty());
    assertEq(propertyType, uint8(1));
  }

  // ============ tryAsProperty ============

  // Should return null if its invalid length
  function testTryAsPropertyInvalidLength() public {
    bytes29 ret = LibCrossDomainProperty.tryAsProperty(LibCrossDomainProperty.EMPTY);
    assertTrue(ret.isNull());
  }

  // Should work if it is a property
  function testTryAsProperty() public {
    bytes29 property = getProperty();
    bytes29 ret = LibCrossDomainProperty.tryAsProperty(property);
    assertTrue(ret.notNull());
    assertTrue(ret.equal(property));
  }

  // ============ mustBeProperty ============

  // Should work if it is not a property
  function testFailMustBeProperty() public {
    // https://github.com/gakonst/foundry/issues/864
    // bug with internal reverts, should revert with:
    // Validity assertion failed
    LibCrossDomainProperty.mustBeProperty(LibCrossDomainProperty.EMPTY);
  }

  // Should work if it is a property
  function testMustBeProperty() public {
    LibCrossDomainProperty.mustBeProperty(getProperty());
  }

  // ============ sender ============

  // Should fail if its not the right type
  function testFailSenderIncorrectType() public {
    // bug with internal reverts, should revert with:
    // Type assertion failed. Got 0xffffffffff. Expected 0x0000000001
    LibCrossDomainProperty.sender(LibCrossDomainProperty.EMPTY);
  }

  // Should work
  function testSender() public {
    assertEq(LibCrossDomainProperty.sender(getProperty()), sender);
  }

  // ============ domain ============

  // Should fail if its not the right type
  function testFailDomainIncorrectType() public {
    // https://github.com/gakonst/foundry/issues/864
    // bug with internal reverts, should revert with:
    // Type assertion failed. Got 0xffffffffff. Expected 0x0000000001
    LibCrossDomainProperty.domain(LibCrossDomainProperty.EMPTY);
  }

  // Should work
  function testDomain() public {
    assertEq(LibCrossDomainProperty.domain(getProperty()), domain);
  }

  // ============ formatDomainAndSender ============

  // Should work
  function testFormatDomainAndSender() public {
    bytes29 property = getProperty();
    assertTrue(LibCrossDomainProperty.isDomainAndSender(property));
    bytes memory propertyBytes = getPropertyBytes();
    bytes29 converted = LibCrossDomainProperty.mustBeProperty(propertyBytes.ref(0));
    assertTrue(LibCrossDomainProperty.isDomainAndSender(converted));
  }

  // ============ formatDomainAndSenderBytes ============

  // Should work
  function testFormatDomainAndSenderBytes() public {
    bytes memory propertyBytes = getPropertyBytes();
    bytes29 converted = LibCrossDomainProperty.mustBeProperty(propertyBytes.ref(0));
    assertTrue(LibCrossDomainProperty.isDomainAndSender(converted));
  }

  // ============ formatDomainAndSenderBytes ============

  // Should work
  function testParseDomainAndSenderBytes() public {
    bytes memory propertyBytes = getPropertyBytes();
    bytes29 converted = LibCrossDomainProperty.parseDomainAndSenderBytes(propertyBytes);
    assertTrue(LibCrossDomainProperty.isDomainAndSender(converted));
    assertTrue(converted.equal(getProperty()));
  }
}
