// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {ExcessivelySafeCall} from "../../../shared/libraries/ExcessivelySafeCall.sol";
import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";

import {IExecutor} from "../interfaces/IExecutor.sol";

import {LibCrossDomainProperty} from "../libraries/LibCrossDomainProperty.sol";

/**
 * @title Executor
 * @author Connext <support@connext.network>
 * @notice This library contains an `execute` function that is callable by
 * an associated Connext contract. This is used to execute
 * arbitrary calldata on a receiving chain.
 */
contract Executor is IExecutor {
  // ============ Libraries =============

  using TypedMemView for bytes29;
  using TypedMemView for bytes;

  // ============ Properties =============

  /**
   * @notice Address of associated connext
   */
  address private immutable connext;

  /**
   * @notice The amount of gas needed to execute _sendToRecovery
   * @dev Used to calculate the amount of gas to reserve from transaction
   * to properly handle failure cases
   */
  uint256 public FAILURE_GAS = 100_000; // Allowance decrease + transfer

  /**
   * @notice The maximum number of bytes to store in the return data
   */
  uint16 public MAX_COPY = 256;

  // ============ Constructor =============

  constructor(address _connext) {
    connext = _connext;
  }

  // ============ Modifiers =============

  /**
   * @notice Errors if the sender is not Connext
   */
  modifier onlyConnext() {
    require(msg.sender == connext, "!connext");
    _;
  }

  // ============ Public Functions =============

  /**
   * @notice Returns the connext contract address (only address that can
   * call the `execute` function)
   * @return The address of the associated connext contract
   */
  function getConnext() external view override returns (address) {
    return connext;
  }

  /**
   * @notice Executes some arbitrary call data on a given address. The
   * call data executes can be payable, and will have `amount` sent
   * along with the function (or approved to the contract). If the
   * call fails, rather than reverting, funds are sent directly to
   * some provided fallback address
   * @param _args ExecutorArgs to function.
   */
  function execute(ExecutorArgs memory _args) external override onlyConnext returns (bool, bytes memory) {
    // Check if the `to` target is a contract.
    bool success;
    bytes memory returnData;

    require(Address.isContract(_args.to), "!code");

    // Approve the `to` address for spending tokens.
    // We approve here rather than transfer since many external contracts simply require an approval, and
    // it is unclear if they can handle funds transferred directly to them (i.e. Uniswap).

    bool hasValue = _args.amount != 0;

    if (hasValue) {
      SafeERC20.safeApprove(IERC20(_args.assetId), _args.to, 0);
      SafeERC20.safeIncreaseAllowance(IERC20(_args.assetId), _args.to, _args.amount);
    }

    // Ensure there is enough gas to handle failures
    uint256 gas = gasleft() - FAILURE_GAS;

    // Try to execute the callData
    // the low level call will return `false` if its execution reverts
    (success, returnData) = ExcessivelySafeCall.excessivelySafeCall(
      _args.to,
      gas,
      0,
      MAX_COPY,
      LibCrossDomainProperty.formatCalldataWithProperties(
        _args.amount,
        _args.originDomain,
        _args.originSender,
        _args.callData
      )
    );

    // Emit event
    emit Executed(
      _args.transferId,
      _args.to,
      _args.assetId,
      _args.amount,
      _args.originSender,
      _args.originDomain,
      _args.callData,
      returnData,
      success
    );
    return (success, returnData);
  }
}
