// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "../lib/LibERC20.sol";

/// @title LibERC20Test
/// @author Connext
/// @notice Used to easily test the internal methods of
///         LibERC20.sol by aliasing them to public
///         methods.

contract LibERC20Test {
  function wrapCall(address assetId, bytes memory callData) internal returns (bool) {
    return LibERC20.wrapCall(assetId, callData);
  }

  function approve(
    address assetId,
    address spender,
    uint256 amount
  ) internal returns (bool) {
    return LibERC20.approve(assetId, spender, amount);
  }

  function transferFrom(
    address assetId,
    address sender,
    address recipient,
    uint256 amount
  ) internal returns (bool) {
    return LibERC20.transferFrom(assetId, sender, recipient, amount);
  }

  function transfer(
    address assetId,
    address recipient,
    uint256 amount
  ) internal returns (bool) {
    return LibERC20.transfer(assetId, recipient, amount);
  }
}
