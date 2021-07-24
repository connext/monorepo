// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../interfaces/IFulfillInterpreter.sol";
import "../libraries/Asset.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title FulfillInterpreter
 * @author Connext <support@connext.network>
 * @notice This library contains an `execute` function that is callabale by
 *         an associated TransactionManager contract. This is used to execute
 *         arbitrary calldata on a receiving chain.
 */
contract FulfillInterpreter is ReentrancyGuard, IFulfillInterpreter {
  address private _transactionManager;

  constructor(address transactionManager) {
    _transactionManager = transactionManager;
  }

  /**
   * @notice Errors if the sender is not the transaction manager
   */
  modifier onlyTransactionManager {
    require(msg.sender == _transactionManager, "#OTM:027");
    _;
  }

  /** 
   * @notice Returns the transaction manager address (only address that can 
   *         call the `execute` function)
   * @return The address of the associated transaction manager
   */
  function getTransactionManager() override external view returns (address) {
    return _transactionManager;
  }

  /** 
   * @notice Executes some arbitrary call data on a given address. The
   *         call data executes can be payable, and will have `amount` sent
   *         along with the function (or approved to the contract). If the
   *         call fails, rather than reverting, funds are sent directly to 
   *         some provided fallbaack address
   * @param transactionId Unique identifier of transaction id that necessitated
   *        calldata execution
   * @param callTo The address to execute the calldata on
   * @param assetId The assetId of the funds to approve to the contract or
   *                send along with the call
   * @param fallbackAddress The address to send funds to if the `call` fails
   * @param amount The amount to approve or send with the call
   * @param callData The data to execute
   */
  function execute(
    bytes32 transactionId,
    address payable callTo,
    address assetId,
    address payable fallbackAddress,
    uint256 amount,
    bytes calldata callData
  ) override external payable nonReentrant onlyTransactionManager {
    // If it is not ether, approve the callTo
    // We approve here rather than transfer since many external contracts
    // simply require an approval, and it is unclear if they can handle 
    // funds transferred directly to them (i.e. Uniswap)
    bool isEther = Asset.isNativeAsset(assetId);
    if (!isEther) {
      Asset.increaseERC20Allowance(assetId, callTo, amount);
    }

    // Try to execute the callData
    // the low level call will return `false` if its execution reverts
    (bool success, bytes memory returnData) = callTo.call{value: isEther ? amount : 0}(callData);

    if (!success) {
      // If it fails, transfer to fallback
      Asset.transferAsset(assetId, fallbackAddress, amount);
      // Decrease allowance
      if (!isEther) {
        Asset.decreaseERC20Allowance(assetId, callTo, amount);
      }
    }

    // Emit event
    emit Executed(
      transactionId,
      callTo,
      assetId,
      fallbackAddress,
      amount,
      callData,
      returnData,
      success
    );
  }
}