// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {BaseConnextFacet} from "./BaseConnextFacet.sol";
import {LibDiamond} from "../libraries/LibDiamond.sol";

/**
 * @title TestFacet
 */
contract TestFacet is BaseConnextFacet {
  // ========== Custom Errors ===========

  // ============ Properties ============

  // ============ Events ============

  event TestedUint(uint256);

  // ============ External: Getters ============
  function testUint() public view returns (uint256) {
    return s.testUint;
  }

  function testAddress() public view returns (address) {
    return s.testAddress;
  }

  function testUint2UnitMapping(uint256 key) public view returns (uint256) {
    return s.testUint2UnitMapping[key];
  }

  function testUintForCrash() public view returns (uint256) {
    return s.testUintForCrash;
  }

  // ============ External ============

  function setTestUint(uint256 newVar) public {
    s.testUint = newVar;

    emit TestedUint(newVar);
  }

  function setTestAddress(address newAddr) public {
    s.testAddress = newAddr;
  }

  function setTestUint2UintMapping(uint256 key, uint256 newVar) public {
    s.testUint2UnitMapping[key] = newVar;
  }

  function setTestUintForCrash(uint256 newVar) public {
    s.testUintForCrash = newVar;
  }
}
