// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../ProposedOwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TestProposedOwnable is Initializable, ProposedOwnableUpgradeable {
  uint256 private value;

  function initialize(uint256 _newValue) public initializer {
    __ProposedOwnable_init();

    value = _newValue;
  }

  function setValue(uint256 _newValue) public {
    value = _newValue;
  }

  function getValue() public view returns (uint256) {
    return value;
  }
}
