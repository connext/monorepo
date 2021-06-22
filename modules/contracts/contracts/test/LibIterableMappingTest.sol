// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "../lib/LibIterableMapping.sol";

/// @title LibIterableMappingTest
/// @author Connext
/// @notice Used to easily test the internal methods of
///         LibIterableMapping.sol by aliasing them to public
///         methods.

contract LibIterableMappingTest {
  using LibIterableMapping for LibIterableMapping.IterableMapping;

  LibIterableMapping.IterableMapping data;

  constructor() {}

  function digestEqual(bytes32 s, bytes32 t) public pure returns (bool) {
    return LibIterableMapping.digestEqual(s, t);
  }

  function isEmptyString(bytes32 s) public pure returns (bool) {
    return LibIterableMapping.isEmptyString(s);
  }

  function digestExists(bytes32 digest) public view returns (bool) {
    return LibIterableMapping.digestExists(data, digest);
  }

  function length() public view returns (uint256) {
    return LibIterableMapping.length(data);
  }

  function getTransactionByDigest(bytes32 digest) public view returns (UnsignedTransactionData memory) {
    return LibIterableMapping.getTransactionByDigest(data, digest);
  }

  function getTransactionByIndex(uint256 index) public view returns (UnsignedTransactionData memory) {
    return LibIterableMapping.getTransactionByIndex(data, index);
  }

  function getTransactions() public view returns (UnsignedTransactionData[] memory) {
    return LibIterableMapping.getTransactions(data);
  }

  function addTransaction(UnsignedTransactionData memory transfer) public {
    return LibIterableMapping.addTransaction(data, transfer);
  }

  function removeTransaction(bytes32 digest) public {
    return LibIterableMapping.removeTransaction(data, digest);
  }
}
