// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// import {ExcessivelySafeCall} from "@nomad-xyz/excessively-safe-call/src/ExcessivelySafeCall.sol";
// TODO: see note in below file re: npm
import {ExcessivelySafeCall} from "../../../nomad-core/libs/ExcessivelySafeCall.sol";

import {IExecutor} from "../interfaces/IExecutor.sol";

import {LibCrossDomainProperty, TypedMemView} from "../libraries/LibCrossDomainProperty.sol";

/**
 * @title Executor
 * @author Connext <support@connext.network>
 * @notice This library contains an `execute` function that is callabale by
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
   * @notice Properties set for access via reentrancy
   * @dev Contracts that are being called during `execute` may set
   * properties. Generally, these properties will only be non-null
   * if the data was authenticated (i.e. reconciled / fraud window
   * elapsed).
   *
   * Callers can access these by using code:
   * `IExecutor(msg.sender).originSender();`
   */
  bytes private properties = LibCrossDomainProperty.EMPTY_BYTES;

  /**
   * @notice Amount transferred
   * @dev This is always accessible via reentrancy. May *NOT* be the exact amount
   * transferred due to AMM slippage
   *
   * Callers can access these by using code:
   * `IExecutor(msg.sender).amount();`
   */
  uint256 private amnt;

  /**
   * @notice The amount of gas needed to execute _handleFailure
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
   * @notice Allows a `_to` contract to access origin domain sender (i.e. msg.sender of `xcall`)
   * @dev These properties are set via reentrancy a la L2CrossDomainMessenger from
   * optimism
   */
  function originSender() external view override returns (address) {
    // The following will revert if it is empty
    bytes29 _parsed = LibCrossDomainProperty.parseDomainAndSenderBytes(properties);
    return LibCrossDomainProperty.sender(_parsed);
  }

  /**
   * @notice Allows a `_to` contract to access origin domain (i.e. domain of `xcall`)
   * @dev These properties are set via reentrancy a la L2CrossDomainMessenger from
   * optimism
   */
  function origin() external view override returns (uint32) {
    // The following will revert if it is empty
    bytes29 _parsed = LibCrossDomainProperty.parseDomainAndSenderBytes(properties);
    return LibCrossDomainProperty.domain(_parsed);
  }

  /**
   * @notice Allows a `_to` contract to access the amount that was delivered from the
   * bridge. This is also set during reentrancy, but is set during fast *and* slow
   * liquidity paths
   * @dev These properties are set via reentrancy a la L2CrossDomainMessenger from
   * optimism
   */
  function amount() external view override returns (uint256) {
    return amnt;
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

    if (isNative) require(msg.value == _args.amount, "!amount");

    if (!Address.isContract(_args.to)) {
      _handleFailure(isNative, false, _args.assetId, payable(_args.to), payable(_args.recovery), _args.amount);
      // Emit event
      emit Executed(
        _args.transferId,
        _args.to,
        _args.recovery,
        _args.assetId,
        _args.amount,
        _args.properties,
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

    if (!isNative) {
      SafeERC20.safeIncreaseAllowance(IERC20(_args.assetId), _args.to, _args.amount);
    }

    // If it should set the properties, set them.
    // NOTE: safe to set the properties always because modifier will revert if
    // it is the wrong type on conversion, and revert occurs with empty type as
    // well
    properties = _args.properties;

    // Set the amount as well
    amnt = _args.amount;

    // Ensure there is enough gas to handle failures
    uint256 gas = gasleft() - FAILURE_GAS;

    // Try to execute the callData
    // the low level call will return `false` if its execution reverts
    (success, returnData) = ExcessivelySafeCall.excessivelySafeCall(
      _args.to,
      gas,
      isNative ? _args.amount : 0,
      MAX_COPY,
      _args.callData
    );

    // Unset properties
    properties = LibCrossDomainProperty.EMPTY_BYTES;

    // Unset amount
    amnt = 0;

    // Handle failure cases
    if (!success) {
      _handleFailure(isNative, true, _args.assetId, payable(_args.to), payable(_args.recovery), _args.amount);
    }

    // Emit event
    emit Executed(
      _args.transferId,
      _args.to,
      _args.recovery,
      _args.assetId,
      _args.amount,
      _args.properties,
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
  function _handleFailure(
    bool _isNative,
    bool _hasIncreased,
    address _assetId,
    address payable _to,
    address payable _recovery,
    uint256 _amount
  ) private {
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
