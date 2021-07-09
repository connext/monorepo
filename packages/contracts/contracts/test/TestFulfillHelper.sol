// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../interfaces/IFulfillHelper.sol";
import "../lib/LibAsset.sol";
import "../lib/LibERC20.sol";

contract TestFulfillHelper is IFulfillHelper {
  /// @dev Mapping of user to balance specific to asset
  mapping(address => mapping(address => uint256)) public userBalances;

  struct TestData {
    address payable recipient;
  }

  // events
  event FundsAdded(address user, address assetId, uint256 amount, bytes32 transactionId);
  event Executed(address user, address assetId, uint256 amount, bytes32 transactionId, bytes callData);

  function getCallData(TestData calldata testData) public pure returns (bytes memory) {
    return abi.encode(testData);
  }

  function addFunds(
    address user,
    bytes32 transactionId,
    address assetId,
    uint256 amount
  ) external payable override {
    // Sanity check: nonzero amounts
    require(amount > 0, "addFunds: AMOUNT_IS_ZERO");

    // Validate correct amounts are transferred
    if (LibAsset.isEther(assetId)) {
      require(msg.value == amount, "addFunds: VALUE_MISMATCH");
    } else {
      require(msg.value == 0, "addFunds: ETH_WITH_ERC_TRANSFER");
      require(LibERC20.transferFrom(assetId, msg.sender, address(this), amount), "addFunds: ERC20_TRANSFER_FAILED");
    }

    // Update the router balances
    userBalances[user][assetId] += amount;

    // Emit event
    emit FundsAdded(user, assetId, amount, transactionId);
  }

  function execute(
    address user,
    bytes32 transactionId,
    address assetId,
    uint256 amount,
    bytes calldata callData
  ) external override {
    TestData memory testData = abi.decode(callData, (TestData));

    require(amount > 0, "execute: AMOUNT_IS_ZERO");

    require(userBalances[user][assetId] >= amount, "execute: User_Balance_Insuffice");

    // Update the router balances
    userBalances[user][assetId] -= amount;

    require(LibAsset.transferAsset(assetId, testData.recipient, amount), "execute: TRANSFER_FAILED");

    emit Executed(user, assetId, amount, transactionId, callData);
  }
}
