// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

// import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IXReceiver} from "../../core/connext/interfaces/IXReceiver.sol";

interface IWrapper {
  function withdraw(uint256 wad) external;

  function transfer(address dst, uint256 wad) external returns (bool);
}

/**
 * @notice A utility contract for unwrapping native tokens at the destination. Various fallbacks
 * for any failures that might occur during the process of receiving tokens and unwrapping them
 * are accounted for.
 */
contract Unwrapper is IXReceiver {
  // ============ Libraries ============

  // using SafeERC20 for IERC20;

  // ============ Events ============

  /**
   * @notice Emitted if an unwrapping attempt (namely, `withdraw` call) fails.
   * @param recipient - The target recipient address.
   * @param reason - The reason why the failure occurred; we will emit this in an event.
   */
  event UnwrappingFailed(address recipient, bytes reason);

  /**
   * @notice Emitted if sending the unwrapped asset failed.
   * @param recipient - The target recipient address.
   * @param reason - The reason why the failure occurred; we will emit this in an event.
   */
  event SendUnwrappedFailed(address recipient, bytes reason);

  /**
   * @notice Emitted if transferring the wrapped asset failed.
   * @param recipient - The target recipient address.
   * @param reason - The reason why the failure occurred; we will emit this in an event.
   */
  event TransferWrappedFailed(address recipient, bytes reason);

  /**
   * @notice Emitted if the wrong wrapper asset is sent.
   * @param recipient - The target recipient address.
   * @param asset - The asset sent.
   * @param reason - The reason why the failure occurred; we will emit this in an event.
   */
  event WrongAsset(address recipient, address asset, bytes reason);

  // ============ Properties ============

  /**
   * @notice Connext (diamond proxy) address, the only address permissioned to call `xReceive`.
   */
  address public immutable CONNEXT;

  /**
   * @notice The wrapper contract that this contract will always use for unwrapping native token.
   */
  IWrapper public immutable WRAPPER;

  // ============= Modifiers ==============

  /**
   * @notice Ensure caller is only the designated CONNEXT bridge address.
   */
  modifier onlyConnext() {
    require(msg.sender == CONNEXT, "unwrap: !connext");
    _;
  }

  // ============ Constructor ============

  constructor(address connext, address wrapper) {
    WRAPPER = IWrapper(wrapper);
    CONNEXT = connext;
  }

  // ================ Getters ================

  /**
   * @notice Read method to get the target wrapper contract. Make sure this is the wrapper
   * you're looking for!
   */
  function getTargetWrapperContract() external view returns (address) {
    return address(WRAPPER);
  }

  /**
   * @notice Read method to get Connext bridge address, the only address permissioned to call
   * `xReceive` below.
   */
  function getConnext() external view returns (address) {
    return address(CONNEXT);
  }

  // ============ Public Functions ============

  /**
   * @notice xReceive implementation for receiving cross-chain calls from Connext.
   * @dev We mostly ignore `originSender` argument: this could be a contract or EOA, but our
   * recipient should be specified in our `callData`! We only fallback to using `originSender` IFF
   * recipient argument is missing.
   * @dev If unwrapping (i.e. `withdraw`) fails, will emit UnwrappingFailed event! We will attempt
   * to transfer the wrapped tokens to the
   *
   * @param amount - The amount to transfer. Should NOT be 0, or this call will revert.
   * @param asset - This *should be* the wrapper contract address, an ERC20 token approved by the
   * Connext bridge. IFF this does NOT match the WRAPPER contract address stored in this contract,
   * we'll try to `IERC20.transfer` the assets to the intended recipient.
   * @param originSender - Not used except in the edge case where the `callData` is missing a valid
   * intended recipient address.
   * @param callData - Should be a tuple of just `(address)`. The address is the intended
   * recipient of the unwrapped native tokens. Whether it's ether or wether (i.e. whether it's
   * wrapped native tokens or native tokens) depends on whether we succeeded in the unwrapping
   * process.
   */
  function xReceive(
    bytes32,
    uint256 amount,
    address asset,
    address originSender,
    uint32,
    bytes memory callData
  ) external onlyConnext returns (bytes memory) {
    // Sanity check: amount is non-zero (otherwise, what are we unwrapping?).
    require(amount != 0, "unwrap: !amount");

    // Get the target recipient, which should be in the callData.
    /// @dev If recipient is the zero address, funds will be burned!
    address recipient = abi.decode(callData, (address));

    // Sanity check: asset we've received matches our target wrapper.
    if (asset != address(WRAPPER)) {
      // If the delivered asset does not match our target wrapper, we try sending it anyway.
      try IERC20(asset).transfer(recipient, amount) returns (bool success) {
        if (!success) {
          emit WrongAsset(recipient, asset, "wrong asset used for unwrap and fallback transfer failed");
        }
      } catch (bytes memory reason) {
        emit WrongAsset(recipient, asset, reason);
      }
      return bytes("");
    }

    // We've received wrapped native tokens; withdraw native tokens from the wrapper contract.
    try WRAPPER.withdraw(amount) {
      // Try to send the native token to the intended recipient.
      // TODO: This will revert in the 1 edge case where we send to a contract that calls
      // self-destruct. We need to use a safe sending method here we can wrap in try/catch.
      bool sent = payable(recipient).send(amount);
      if (!sent) {
        emit SendUnwrappedFailed(recipient, "unwrap succeeded but sending unwrapped asset to recipient failed");
      }
    } catch (bytes memory reason) {
      // Handle transferring wrapped funds to the intended recipient in the event that the
      // unwrapping attempt (`withdraw`) fails.
      // Always make sure funds are delivered to intended recipient on failing external calls!
      emit UnwrappingFailed(recipient, reason);
      try WRAPPER.transfer(recipient, amount) returns (bool success) {
        if (!success) {
          emit TransferWrappedFailed(recipient, "fallback transfer of wrapped asset failed");
        }
      } catch (bytes memory otherReason) {
        emit TransferWrappedFailed(recipient, otherReason);
      }
    }
    return bytes("");
  }

  receive() external payable {}

  fallback() external payable {}
}
