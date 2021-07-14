// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../interfaces/IFulfillHelper.sol";
import "../lib/LibAsset.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TestFulfillHelper is IFulfillHelper {

  struct TestData {
    address payable recipient;
  }

  // events
  event Executed(address user, address assetId, uint256 amount, bytes32 transactionId, bytes callData);

  function getCallData(TestData calldata testData) public pure returns (bytes memory) {
    return abi.encode(testData);
  }

  function execute(
    address user,
    address assetId,
    address fallbackAddress,
    bytes32 transactionId,
    uint256 amount,
    bytes calldata callData
  ) external payable override {
    // Validate correct amounts are transferred
    if (LibAsset.isEther(assetId)) {
      require(msg.value == amount, "addFunds: VALUE_MISMATCH");
    } else {
      require(msg.value == 0, "addFunds: ETH_WITH_ERC_TRANSFER");
    }
    
    TestData memory testData = abi.decode(callData, (TestData));

    require(amount > 0, "execute: AMOUNT_IS_ZERO");

    LibAsset.transferAsset(assetId, testData.recipient, amount);

    emit Executed(user, assetId, amount, transactionId, callData);
  }
}
