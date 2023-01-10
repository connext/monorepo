// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IXReceiver} from "../../core/connext/interfaces/IXReceiver.sol";

interface Wrapper {
  function withdraw(uint256 wad) external;

  function transfer(address dst, uint256 wad) external returns (bool);
}

/**
 * @notice A utility contract for unwrapping native tokens at the destination.
 */
contract Unwrapper is IXReceiver {
  // ============ Events ============

  /**
   * @notice An event that we emit in the event that the unwrapping attempt (namely, `withdraw`
   * call) fails.
   * @param recipient - The target recipient address.
   * @param reason - The reason why the failure occurred; we will emit this in an event.
   */
  event UnwrappingFailed(address recipient, bytes reason);

  // ============ Properties ============

  /**
   * @notice The wrapper contract that this contract will always use for unwrapping native token.
   */
  Wrapper public immutable WRAPPER;

  // ============ Constructor ============

  constructor(address _wrapper) {
    WRAPPER = Wrapper(_wrapper);
  }

  // ================ Getters ================

  /**
   * @notice Read method to get the target wrapper contract. Make sure this is the wrapper
   * you're looking for!
   */
  function getTargetWrapperContract() external view returns (address) {
    return address(WRAPPER);
  }

  // ============ Public Functions ============

  /**
   * @notice xReceive implementation for receiving cross-chain calls from Connext.
   * @dev We ignore `originSender` argument: this could be a contract or EOA, but our recipient
   * should be specified in our `callData`!
   *
   * @param amount - The amount to transfer.
   * @param asset - The wrapper contract address. If this does NOT match the wrapper contract address
   * stored in this contract, this call WILL revert!
   * @param callData - Should be a tuple of just (address). The address is the intended
   * recipient of the unwrapped native tokens.
   */
  function xReceive(
    bytes32,
    uint256 amount,
    address asset,
    address,
    uint32,
    bytes memory callData
  ) external returns (bytes memory) {
    // Get the target recipient, which should be in the callData.
    address recipient = abi.decode(callData, (address));
    // Sanity check: recipient is non-zero.
    require(recipient != address(0), "unwrap: !recipient");

    // Sanity check: asset we've received matches our target wrapper.
    require(asset == address(WRAPPER), "unwrap: !asset");

    // We've received wrapped native tokens; withdraw native tokens from the wrapper contract.
    try WRAPPER.withdraw(amount) {
      // Send the native token to the intended recipient.
      bool sent = payable(recipient).send(amount);
      require(sent, "unwrap: !sent");
    } catch (bytes memory reason) {
      // Handle transferring wrapped funds to the intended recipient in the event that the
      // unwrapping attempt (`withdraw`) fails.
      // Always make sure funds are delivered to intended recipient on failing external calls!
      emit UnwrappingFailed(recipient, reason);
      WRAPPER.transfer(recipient, amount);
    }
  }
}
