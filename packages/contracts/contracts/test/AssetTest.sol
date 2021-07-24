// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../libraries/Asset.sol";

/// @title AssetTest
/// @author Connext
/// @notice Used to easily test the internal methods of
///         Asset.sol by aliasing them to public
///         methods.

contract AssetTest {
  
  constructor() {}

  receive() external payable {}

  function isEther(address assetId) public pure returns (bool) {
    return Asset.isEther(assetId);
  }

  function getOwnBalance(address assetId) public view returns (uint256) {
    return Asset.getOwnBalance(assetId);
  }

  function transferEther(address payable recipient, uint256 amount) public {
    Asset.transferEther(recipient, amount);
  }

  function increaseERC20Allowance(address assetId, address spender, uint256 amount) public {
    LibAsset.increaseERC20Allowance(assetId, spender, amount);
  }

  function decreaseERC20Allowance(address assetId, address spender, uint256 amount) public {
    LibAsset.decreaseERC20Allowance(assetId, spender, amount);
  }

  function transferERC20(
    address assetId,
    address recipient,
    uint256 amount
  ) public {
    Asset.transferERC20(assetId, recipient, amount);
  }

  // This function is a wrapper for transfers of Ether or ERC20 tokens,
  // both standard-compliant ones as well as tokens that exhibit the
  // missing-return-value bug.
  function transferAsset(
    address assetId,
    address payable recipient,
    uint256 amount
  ) public {
    Asset.transferAsset(assetId, recipient, amount);
  }
}
