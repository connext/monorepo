// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


/// @title LibAsset
/// @author Connext <support@connext.network>
/// @notice This library contains helpers for dealing with onchain transfers
///         of assets, including accounting for the native asset `assetId`
///         conventions and any noncompliant ERC20 transfers

library LibAsset {
    address constant NATIVE_ASSETID = address(0);

    function isEther(address assetId) internal pure returns (bool) {
      return assetId == NATIVE_ASSETID;
    }

    function getOwnBalance(address assetId) internal view returns (uint256) {
      return
        isEther(assetId)
          ? address(this).balance
          : IERC20(assetId).balanceOf(address(this));
    }

    function transferEther(address payable recipient, uint256 amount)
        internal
    {
      (bool success,) = recipient.call{value: amount}("");
      require(success, "#TE:028");
    }

    function transferERC20(
        address assetId,
        address recipient,
        uint256 amount
    ) internal {
      SafeERC20.safeTransfer(IERC20(assetId), recipient, amount);
    }

    function transferFromERC20(
      address assetId,
      address from,
      address to,
      uint256 amount
    ) internal {
      SafeERC20.safeTransferFrom(IERC20(assetId), from, to, amount);
    }

    function increaseERC20Allowance(
      address assetId,
      address spender,
      uint256 amount
    ) internal {
      SafeERC20.safeIncreaseAllowance(IERC20(assetId), spender, amount);
    }

    function decreaseERC20Allowance(
      address assetId,
      address spender,
      uint256 amount
    ) internal {
      SafeERC20.safeDecreaseAllowance(IERC20(assetId), spender, amount);
    }

    // This function is a wrapper for transfers of Ether or ERC20 tokens,
    // both standard-compliant ones as well as tokens that exhibit the
    // missing-return-value bug.
    function transferAsset(
        address assetId,
        address payable recipient,
        uint256 amount
    ) internal {
      isEther(assetId)
        ? transferEther(recipient, amount)
        : transferERC20(assetId, recipient, amount);
    }
}
