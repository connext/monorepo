// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../interfaces/IConditionInterpreter.sol";
import "../interfaces/Types.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SignatureInterpreter is IConditionInterpreter {

  // The structure of the signed data for fulfill
  struct SignedFulfillData {
    bytes32 transactionId;
    uint256 relayerFee;
    string functionIdentifier; // "fulfill" or "cancel"
    uint256 receivingChainId; // For domain separation
    address receivingChainTxManagerAddress; // For domain separation
  }

  // The structure of the signed data for cancellation
  struct SignedCancelData {
    bytes32 transactionId;
    string functionIdentifier;
    uint256 receivingChainId;
    address receivingChainTxManagerAddress; // For domain separation
  }

  function shouldFulfill(
    TransactionData calldata txData,
    bytes calldata unlockData,
    uint256 relayerFee,
    uint256 transactionManagerChainId
  ) external pure override returns (bool) {
    // Check chain-id is sensible
    if (transactionManagerChainId != txData.sendingChainId) {
      require(transactionManagerChainId == txData.receivingChainId, "#SI:012");
    }

    return recoverFulfillSignature(
      txData.transactionId,
      relayerFee,
      txData.receivingChainId,
      txData.receivingChainTxManagerAddress,
      unlockData
    ) == txData.user;
  }

  function shouldCancel(
    TransactionData calldata txData,
    bytes calldata unlockData,
    uint256 transactionManagerChainId
  ) external pure override returns (bool) {
     // Check chain-id is sensible
    if (transactionManagerChainId != txData.sendingChainId) {
      require(transactionManagerChainId == txData.receivingChainId, "#SI:012");
    }

    return recoverCancelSignature(
      txData.transactionId,
      txData.receivingChainId,
      txData.receivingChainTxManagerAddress,
      unlockData
    ) == txData.user;
  }

   /// @notice Recovers the signer from the signature provided by the user
  /// @param transactionId Transaction identifier of tx being recovered
  /// @param signature The signature you are recovering the signer from
  function recoverCancelSignature(
    bytes32 transactionId,
    uint256 receivingChainId,
    address receivingChainTxManagerAddress,
    bytes calldata signature
  ) internal pure returns (address) {
    // Create the signed payload
    SignedCancelData memory payload = SignedCancelData({
      transactionId: transactionId,
      functionIdentifier: "cancel",
      receivingChainId: receivingChainId,
      receivingChainTxManagerAddress: receivingChainTxManagerAddress
    });

    // Recover
    return recoverSignature(abi.encode(payload), signature);
  }

  /**
    * @notice Recovers the signer from the signature provided by the user
    * @param transactionId Transaction identifier of tx being recovered
    * @param relayerFee The fee paid to the relayer for submitting the
    *                   tx on behalf of the user.
    * @param signature The signature you are recovering the signer from
    */
  function recoverFulfillSignature(
    bytes32 transactionId,
    uint256 relayerFee,
    uint256 receivingChainId,
    address receivingChainTxManagerAddress,
    bytes calldata signature
  ) internal pure returns (address) {
    // Create the signed payload
    SignedFulfillData memory payload = SignedFulfillData({
      transactionId: transactionId,
      relayerFee: relayerFee,
      functionIdentifier: "fulfill",
      receivingChainId: receivingChainId,
      receivingChainTxManagerAddress: receivingChainTxManagerAddress
    });

    // Recover
    return recoverSignature(abi.encode(payload), signature);
  }

  /**
    * @notice Holds the logic to recover the signer from an encoded payload.
    *         Will hash and convert to an eth signed message.
    * @param encodedPayload The payload that was signed
    * @param signature The signature you are recovering the signer from
    */
  function recoverSignature(bytes memory encodedPayload, bytes calldata  signature) internal pure returns (address) {
    // Recover
    return ECDSA.recover(
      ECDSA.toEthSignedMessageHash(keccak256(encodedPayload)),
      signature
    );
  }
}