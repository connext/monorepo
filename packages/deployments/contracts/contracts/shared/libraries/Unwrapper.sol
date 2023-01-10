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
  Wrapper wrapper;

  constructor(address _wrapper) {
    wrapper = Wrapper(_wrapper);
  }

  /**
   * @notice Read method to get the target wrapper contract. Make sure this is the wrapper
   * you're looking for!
   */
  function getTargetWrapperContract() external view returns (address) {
    return address(wrapper);
  }

  /**
   * @notice xReceive implementation for receiving cross-chain calls from Connext.
   * @dev We ignore `originSender` argument: this could be a contract or EOA, but our recipient
   * should be specified in our `callData`!
   * @param callData - Should be a tuple of just (address). The address is the intended
   * recipient of the unwrapped native tokens.
   *
   */
  function xReceive(
    bytes32,
    uint256 amount,
    address asset,
    address, // originSender
    uint32,
    bytes memory callData
  ) external returns (bytes memory) {
    // Get the target recipient, which should be in the callData.
    address recipient = abi.decode(callData, (address));
    // Sanity check: recipient is non-zero.
    require(recipient != address(0), "unwrap: !recipient");

    Wrapper _wrapper = wrapper;

    // Sanity check: asset we've received matches our target wrapper.
    require(asset == address(_wrapper), "unwrap: !asset");

    // We've received wrapped native tokens; withdraw native tokens from the wrapper contract.
    _wrapper.withdraw(amount);
    // Transfer to the intended recipient.
    _wrapper.transfer(recipient, amount);
  }
}
