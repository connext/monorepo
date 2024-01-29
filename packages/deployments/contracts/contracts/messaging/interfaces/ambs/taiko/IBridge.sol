// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

/// @title IBridge
/// @notice The bridge used in conjunction with the {ISignalService}.
/// @dev Ether is held by Bridges on L1 and by the EtherVault on L2,
/// not by token vaults.
interface IBridge {
  enum MessageStatus {
    NEW,
    RETRIABLE,
    DONE,
    FAILED
  }

  // Struct representing a message sent across the bridge.
  struct Message {
    // Message ID.
    uint256 id;
    // Message sender address (auto filled).
    address from;
    // Source chain ID (auto filled).
    uint256 srcChainId;
    // Destination chain ID where the `to` address lives (auto filled).
    uint256 destChainId;
    // User address of the bridged asset.
    address user;
    // Destination address.
    address to;
    // Alternate address to send any refund. If blank, defaults to user.
    address refundTo;
    // value to invoke on the destination chain, for ERC20 transfers.
    uint256 value;
    // Processing fee for the relayer. Zero if user will process themself.
    uint256 fee;
    // gasLimit to invoke on the destination chain, for ERC20 transfers.
    uint256 gasLimit;
    // callData to invoke on the destination chain, for ERC20 transfers.
    bytes data;
    // Optional memo.
    string memo;
  }

  struct SignalProof {
    uint64 height;
    bytes proof; // A storage proof
  }

  // Struct representing the context of a bridge operation.
  struct Context {
    bytes32 msgHash; // Message hash.
    address from; // Sender's address.
    uint256 srcChainId; // Source chain ID.
  }

  event MessageSent(bytes32 indexed msgHash, Message message);

  /// @notice Sends a message to the destination chain and takes custody
  /// of Ether required in this contract. All extra Ether will be refunded.
  /// @param message The message to be sent.
  /// @return msgHash The hash of the sent message.
  function sendMessage(Message memory message) external payable returns (bytes32 msgHash);

  /// @notice Processes a message received from another chain.
  /// @param message The message to process.
  /// @param proof The proof of the cross-chain transfer.
  function processMessage(Message calldata message, bytes calldata proof) external;

  /// @notice Checks if the message with the given hash has been sent on its
  /// source chain.
  /// @param msgHash The hash of the message.
  /// @return Returns true if the message has been sent, false otherwise.
  function isMessageSent(bytes32 msgHash) external view returns (bool);

  /// @notice Checks if the message with the given hash has been received on
  /// its destination chain.
  /// @param msgHash The hash of the message.
  /// @param srcChainId The source chain ID.
  /// @param proof The proof of message receipt.
  /// @return Returns true if the message has been received, false otherwise.
  function isMessageReceived(bytes32 msgHash, uint256 srcChainId, bytes calldata proof) external view returns (bool);

  /// @notice Checks if a msgHash has failed on its destination chain.
  /// @param msgHash The hash of the message.
  /// @param destChainId The destination chain ID.
  /// @param proof The proof of message failure.
  /// @return Returns true if the message has failed, false otherwise.
  function isMessageFailed(bytes32 msgHash, uint256 destChainId, bytes calldata proof) external view returns (bool);

  /// @notice Checks if a failed message has been recalled on its source
  /// chain.
  /// @param msgHash The hash of the message.
  /// @return Returns true if the Ether has been released, false otherwise.
  function isMessageRecalled(bytes32 msgHash) external view returns (bool);

  /// @notice Returns the bridge state context.
  /// @return context The context of the current bridge operation.
  function context() external view returns (Context memory context);

  /// @notice Computes the hash of a given message.
  /// @param message The message to compute the hash for.
  /// @return Returns the hash of the message.
  function hashMessage(IBridge.Message calldata message) external pure returns (bytes32);

  /// @notice Gets the execution status of the message with the given hash on
  /// its destination chain.
  /// @param msgHash The hash of the message.
  /// @return Returns the status of the message.
  function getMessageStatus(bytes32 msgHash) external view returns (MessageStatus);
}
