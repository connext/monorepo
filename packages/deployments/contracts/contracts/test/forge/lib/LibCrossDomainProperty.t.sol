// SPDX-License-Identifier: UNLICENSED
import "../ForgeHelper.sol";

import "../../../interpreters/Executor.sol";

contract LibCrossDomainPropertyTest is ForgeHelper {
  // ============ Libraries ============

  using stdStorage for StdStorage;
  using TypedMemView for bytes29;

  // ============ Storage ============

  uint32 domain = uint32(1000);
  address sender = address(1);

  // ============ Setup ============

  function setUp() public {}

  // ============ Utils ============
  function getProperty() public returns (bytes29) {
    return LibCrossDomainProperty.formatDomainAndSender(domain, sender);
  }

  // ============ isValidPropertyLength ============

  // Should work
  function testLength() public {
    bytes29 property = getProperty();
    assertTrue(LibCrossDomainProperty.isValidPropertyLength(property));
    assertTrue(!LibCrossDomainProperty.isValidPropertyLength(LibCrossDomainProperty.DEFAULT_VALUE));
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

  // ============ sender ============

  // Should fail if its not the right type
  function testFailSenderIncorrectType() public {
    // bug with internal reverts, should revert with:
    // Type assertion failed. Got 0xffffffffff. Expected 0x0000000001
    LibCrossDomainProperty.sender(LibCrossDomainProperty.DEFAULT_VALUE);
  }

  // Should work
  function testSender() public {
    assertEq(LibCrossDomainProperty.sender(getProperty()), sender);
  }

  // ============ domain ============

  // Should fail if its not the right type
  function testFailDomainIncorrectType() public {
    // bug with internal reverts, should revert with:
    // Type assertion failed. Got 0xffffffffff. Expected 0x0000000001
    LibCrossDomainProperty.domain(LibCrossDomainProperty.DEFAULT_VALUE);
  }

  // Should work
  function testDomain() public {
    assertEq(LibCrossDomainProperty.domain(getProperty()), domain);
  }
}