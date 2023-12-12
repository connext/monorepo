// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

/**
 * @title ISignalService
 * @notice The SignalService contract serves as a secure cross-chain message
 * passing system. It defines methods for sending and verifying signals with
 * merkle proofs. The trust assumption is that the target chain has secure
 * access to the merkle root (such as Taiko injects it in the anchor
 * transaction). With this, verifying a signal is reduced to simply verifying
 * a merkle proof.
 */

interface ISignalService {
  /**
   * @notice Send a signal (message) by setting the storage slot to a value of 1.
   * @param _signal The signal (message) to send.
   * @return _storageSlot The location in storage where this signal is stored.
   */
  function sendSignal(bytes32 _signal) external returns (bytes32 _storageSlot);

  /// @notice Verifies if a particular signal has already been sent.
  /// @param app The address that initiated the signal.
  /// @param signal The signal (message) to send.
  /// @return True if the signal has been sent, otherwise false.

  /**
   * @notice Verifies if a particular signal has already been sent.
   * @param _app The address that initiated the signal.
   * @param _signal The signal (message) to send.
   * @return _sent if the signal has been sent, otherwise false.
   */
  function isSignalSent(address _app, bytes32 _signal) external view returns (bool _sent);

  /**
   * @notice Verifies if a signal has been received on the target chain.
   * @param _srcChainId The identifier for the source chain from which the signal originated.
   * @param _app The address that initiated the signal.
   * @param _signal The signal (message) to send.
   * @param _proof Merkle proof that the signal was persisted on the source chain.
   * @return _received if the signal has been received, otherwise false.
   */
  function isSignalReceived(
    uint256 _srcChainId,
    address _app,
    bytes32 _signal,
    bytes calldata _proof
  ) external view returns (bool _received);
}
