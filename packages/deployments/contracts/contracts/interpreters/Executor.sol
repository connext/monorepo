// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../interfaces/IExecutor.sol";
import "../lib/LibAsset.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title Executor
 * @author Connext <support@connext.network>
 * @notice This library contains an `execute` function that is callabale by
 *         an associated Connext contract. This is used to execute
 *         arbitrary calldata on a receiving chain.
 */
contract Executor is ReentrancyGuard, IExecutor {
  address private immutable connext;

  constructor(address _connext) {
    connext = _connext;
  }

  /**
   * @notice Errors if the sender is not the transaction manager
   */
  modifier onlyConnext {
    require(msg.sender == connext, "#OC:027");
    _;
  }

  /** 
   * @notice Returns the transaction manager address (only address that can 
   *         call the `execute` function)
   * @return The address of the associated transaction manager
   */
  function getConnext() override external view returns (address) {
    return connext;
  }


  /** 
   * @notice Executes some arbitrary call data on a given address. The
   *         call data executes can be payable, and will have `amount` sent
   *         along with the function (or approved to the contract). If the
   *         call fails, rather than reverting, funds are sent directly to 
   *         some provided fallbaack address
   * @param transferId Unique identifier of transaction id that necessitated
   *        calldata execution
   * @param to The address to execute the calldata on
   * @param assetId The assetId of the funds to approve to the contract or
   *                send along with the call
   * @param amount The amount to approve or send with the call
   * @param callData The data to execute
   */
  function execute(
    bytes32 transferId,
    address payable to,
    address assetId,
    uint256 amount,
    bytes calldata callData
  ) override external payable onlyConnext returns (bool, bool, bytes memory) {
    // If it is not ether, approve the callTo
    // We approve here rather than transfer since many external contracts
    // simply require an approval, and it is unclear if they can handle 
    // funds transferred directly to them (i.e. Uniswap)
    bool isNative = LibAsset.isNativeAsset(assetId);
    if (!isNative) {
      LibAsset.increaseERC20Allowance(assetId, to, amount);
    }

    // Check if the callTo is a contract
    bool success;
    bytes memory returnData;
    bool isContract = Address.isContract(to);
    if (isContract) {
      // Try to execute the callData
      // the low level call will return `false` if its execution reverts
      (success, returnData) = to.call{value: isNative ? amount : 0}(callData);
    }

    // Handle failure cases
    if (!success) {
      // Decrease allowance
      if (!isNative) {
        LibAsset.decreaseERC20Allowance(assetId, to, amount);
      }
    }

    // Emit event
    emit Executed(
      transferId,
      to,
      assetId,
      amount,
      callData,
      returnData,
      success,
      isContract
    );
    return (success, isContract, returnData);
  }
}
