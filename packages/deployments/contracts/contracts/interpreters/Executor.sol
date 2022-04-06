// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../interfaces/IExecutor.sol";

import "../lib/LibCrossDomainProperty.sol";

import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

/**
 * @title Executor
 * @author Connext <support@connext.network>
 * @notice This library contains an `execute` function that is callabale by
 * an associated Connext contract. This is used to execute
 * arbitrary calldata on a receiving chain.
 */
contract Executor is IExecutor {
  // ============ Libraries =============

  using TypedMemView for bytes29;
  using TypedMemView for bytes;

  // ============ Properties =============

  address private immutable connext;
  bytes private properties = LibCrossDomainProperty.EMPTY_BYTES;

  // ============ Constructor =============

  constructor(address _connext) {
    connext = _connext;
  }

  // ============ Modifiers =============

  /**
   * @notice Errors if the sender is not Connext
   */
  modifier onlyConnext() {
    require(msg.sender == connext, "#OC:027");
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
   * @notice Executes some arbitrary call data on a given address. The
   * call data executes can be payable, and will have `amount` sent
   * along with the function (or approved to the contract). If the
   * call fails, rather than reverting, funds are sent directly to
   * some provided fallback address
   * @param _transferId Unique identifier of transaction id that necessitated
   * calldata execution
   * @param _amount The amount to approve or send with the call
   * @param _to The address to execute the calldata on
   * @param _assetId The assetId of the funds to approve to the contract or
   * send along with the call
   * @param _properties The origin properties
   * @param _callData The data to execute
   */
  function execute(
    bytes32 _transferId,
    uint256 _amount,
    address payable _to,
    address _assetId,
    bytes memory _properties,
    bytes calldata _callData
  ) external payable override onlyConnext returns (bool, bytes memory) {
    // If it is not ether, approve the callTo
    // We approve here rather than transfer since many external contracts
    // simply require an approval, and it is unclear if they can handle
    // funds transferred directly to them (i.e. Uniswap)
    bool isNative = _assetId == address(0);
    if (!isNative) {
      SafeERC20Upgradeable.safeIncreaseAllowance(IERC20Upgradeable(_assetId), _to, _amount);
    }

    // Check if the callTo is a contract
    bool success;
    bytes memory returnData;
    require(AddressUpgradeable.isContract(_to), "!contract");

    // If it should set the properties, set them.
    // NOTE: safe to set the properties always because modifier will revert if
    // it is the wrong type on conversion, and revert occurs with empty type as
    // well
    properties = _properties;

    // Try to execute the callData
    // the low level call will return `false` if its execution reverts
    (success, returnData) = _to.call{value: isNative ? _amount : 0}(_callData);

    // Unset properties
    properties = LibCrossDomainProperty.EMPTY_BYTES;

    // Handle failure cases
    if (!success && !isNative) {
      // Decrease allowance
      SafeERC20Upgradeable.safeDecreaseAllowance(IERC20Upgradeable(_assetId), _to, _amount);
    }

    // Emit event
    emit Executed(_transferId, _to, _assetId, _amount, _properties, _callData, returnData, success);
    return (success, returnData);
  }
}
