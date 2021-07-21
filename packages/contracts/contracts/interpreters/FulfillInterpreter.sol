// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../interfaces/IFulfillInterpreter.sol";
import "../lib/LibAsset.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract FulfillInterpreter is ReentrancyGuard, IFulfillInterpreter {
  /// @notice Executes some arbitrary call data on a given address. The
  ///         call data executes can be payable, and will have `amount` sent
  ///         along with the function (or approved to the contract). If the
  ///         call fails, rather than reverting, funds are sent directly to 
  ///         some provided fallbaack address
  /// @param callTo The address to execute the calldata on
  /// @param assetId The assetId of the funds to approve to the contract or
  ///                send along with the call
  /// @param fallbackAddress The address to send funds to if the `call` fails
  /// @param amount The amount to approve or send with the call
  /// @param callData The data to execute
  function execute(
    address payable callTo,
    address assetId,
    address payable fallbackAddress,
    uint256 amount,
    bytes calldata callData
  ) override external payable nonReentrant {
    // If it is not ether, approve the callTo
    bool isEther = LibAsset.isEther(assetId);
    if (!isEther) {
      LibAsset.increaseERC20Allowance(assetId, callTo, amount);
    }

    // Try to execute the callData
    // the low level call will return `false` if its execution reverts
    (bool success,) = payable(callTo).call{value: isEther ? amount : 0}(callData);

    if (!success) {
      // If it fails, transfer to fallback
      LibAsset.transferAsset(assetId, fallbackAddress, amount);
      // Decrease allowance
      if (!isEther) {
        LibAsset.decreaseERC20Allowance(assetId, callTo, amount);
      }
    }
  }
}