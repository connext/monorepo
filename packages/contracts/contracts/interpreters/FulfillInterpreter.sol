// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../interfaces/IFulfillInterpreter.sol";
import "../libraries/Asset.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract FulfillInterpreter is ReentrancyGuard, IFulfillInterpreter {
  function execute(
    address payable callTo,
    address assetId,
    address payable fallbackAddress,
    uint256 amount,
    bytes calldata callData
  ) override external payable nonReentrant {
    // If it is not ether, approve the callTo
    bool isEther = Asset.isEther(assetId);
    if (!isEther) {
      Asset.increaseERC20Allowance(assetId, callTo, amount);
    }

    // Try to execute the callData
    // the low level call will return `false` if its execution reverts
    (bool success, bytes memory returnData) = payable(callTo).call{value: isEther ? amount : 0}(callData);

    if (!success) {
      // If it fails, transfer to fallback
      Asset.transferAsset(assetId, fallbackAddress, amount);
      // Decrease allowance
      if (!isEther) {
        Asset.decreaseERC20Allowance(assetId, callTo, amount);
      }
    }
  }
}