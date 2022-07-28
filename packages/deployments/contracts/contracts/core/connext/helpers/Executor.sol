// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ExcessivelySafeCall} from "../../../nomad-core/libs/ExcessivelySafeCall.sol";

import {IExecutor} from "../interfaces/IExecutor.sol";

import {LibCrossDomainProperty, TypedMemView} from "../libraries/LibCrossDomainProperty.sol";

/**
 * @title Executor
 * @author Connext <support@connext.network>
 * @notice This library contains an `execute` function that is callable by
 * an associated Connext contract. This is used to execute
 * arbitrary calldata on a receiving chain.
 * @dev In the event this external call fails, funds will be sent to a provided
 * recovery address. Consequently, funds held in this contract should be transitory
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
  function execute(ExecutorArgs memory _args) external payable override onlyConnext returns (bool, bytes memory) {
    // Check if the callTo is a contract
    bool success;
    bytes memory returnData;

    bool isNative = _args.assetId == address(0);

    // If the amount is not the same as the value, send what exists to the recovery address
    // and emit the executed event. This allows callers to process the failure and
    // ensures funds sent to contract always redirected to recovery
    if (isNative && msg.value != _args.amount) {
      _sendToRecovery(isNative, false, _args.assetId, payable(_args.to), payable(_args.recovery), msg.value);
      // Emit event
      emit Executed(
        _args.transferId,
        _args.to,
        _args.recovery,
        _args.assetId,
        msg.value,
        _args.originSender,
        _args.originDomain,
        _args.callData,
        returnData,
        success
      );
      return (success, returnData);
    }

    if (!Address.isContract(_args.to)) {
      _sendToRecovery(isNative, false, _args.assetId, payable(_args.to), payable(_args.recovery), _args.amount);
      // Emit event
      emit Executed(
        _args.transferId,
        _args.to,
        _args.recovery,
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

    // If it is not ether, approve the callTo
    // We approve here rather than transfer since many external contracts
    // simply require an approval, and it is unclear if they can handle
    // funds transferred directly to them (i.e. Uniswap)

    bool hasValue = _args.amount != 0;

    if (!isNative && hasValue) {
      SafeERC20.safeApprove(IERC20(_args.assetId), _args.to, 0);
      SafeERC20.safeIncreaseAllowance(IERC20(_args.assetId), _args.to, _args.amount);
    }

    // Try to execute the callData
    // the low level call will return `false` if its execution reverts
    (success, returnData) = ExcessivelySafeCall.excessivelySafeCall(
      _args.to,
      gasleft() - FAILURE_GAS,
      isNative ? _args.amount : 0,
      MAX_COPY,
      LibCrossDomainProperty.formatCalldataWithProperties(
        _args.amount,
        _args.originDomain,
        _args.originSender,
        _args.callData
      )
    );

    // Handle failure cases
    if (!success) {
      _sendToRecovery(isNative, hasValue, _args.assetId, payable(_args.to), payable(_args.recovery), _args.amount);
    }

    // Emit event
    emit Executed(
      _args.transferId,
      _args.to,
      _args.recovery,
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

  /**
   * @notice Sends funds to the specified recovery address
   * @dev Called if the external call data fails, it's not a contract, or the amount in native
   * asset is incorrect.
   * @param _isNative - Whether the asset is native or not
   * @param _hasIncreased - Whether the allowance was increased
   * @param _assetId - Asset associated with call
   * @param _to - Where call was attempted
   * @param _recovery - Where to send funds
   * @param _amount - Amount to send
   */
  function _sendToRecovery(
    bool _isNative,
    bool _hasIncreased,
    address _assetId,
    address payable _to,
    address payable _recovery,
    uint256 _amount
  ) internal {
    if (_amount == 0) {
      // Nothing to do, exit early
      return;
    }
    if (!_isNative) {
      // Decrease allowance
      if (_hasIncreased) {
        SafeERC20.safeDecreaseAllowance(IERC20(_assetId), _to, _amount);
      }
      // Transfer funds
      SafeERC20.safeTransfer(IERC20(_assetId), _recovery, _amount);
    } else {
      // Transfer funds
      Address.sendValue(_recovery, _amount);
    }
  }
}
