// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../lib/LibAsset.sol";

/// @title LibAssetTest
/// @author Connext
/// @notice Used to easily test the internal methods of
///         LibAsset.sol by aliasing them to public
///         methods.

contract LibAssetTest {
  
  constructor() {}

  function isEther(address assetId) public pure returns (bool) {
    return LibAsset.isEther(assetId);
  }

  function getOwnBalance(address assetId) public view returns (uint256) {
    return LibAsset.getOwnBalance(assetId);
  }

  function transferEther(address payable recipient, uint256 amount) public returns (bool) {
    return LibAsset.transferEther(recipient, amount);
  }

  function transferERC20(
    address assetId,
    address recipient,
    uint256 amount
  ) public returns (bool) {
    return LibAsset.transferERC20(assetId, recipient, amount);
  }

  // This function is a wrapper for transfers of Ether or ERC20 tokens,
  // both standard-compliant ones as well as tokens that exhibit the
  // missing-return-value bug.
  function transferAsset(
    address assetId,
    address payable recipient,
    uint256 amount
  ) public returns (bool) {
    return LibAsset.transferAsset(assetId, recipient, amount);
  }
}
