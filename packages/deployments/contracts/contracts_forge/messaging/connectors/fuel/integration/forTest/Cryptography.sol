// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

/// @notice This is the Fuel protocol cryptography library.
library CryptographyLib {
  /////////////
  // Methods //
  /////////////

  // secp256k1n / 2
  uint256 private constant MAX_SIGNATURE_S_VALUE = 0x7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0;

  /// @notice The primary hash method for Fuel.
  /// @param data The bytes input data.
  /// @return The returned hash result.
  function hash(bytes memory data) internal pure returns (bytes32) {
    return sha256(data);
  }

  function addressFromSignatureComponents(
    uint8 v,
    bytes32 r,
    bytes32 s,
    bytes32 message
  ) internal pure returns (address) {
    // reject high s values to prevent signature malleability
    // https://eips.ethereum.org/EIPS/eip-2
    require(uint256(s) <= MAX_SIGNATURE_S_VALUE, "signature-invalid-s");

    address signer = ecrecover(message, v, r, s);
    require(signer != address(0), "signature-invalid");

    return signer;
  }

  /// @notice Get the signing address from a signature and the signed data
  /// @param signature: The compact (64 byte) ECDSA signature
  /// @param message: The message which was signed over
  /// @return : The address of the signer, or address(0) in case of an error
  function addressFromSignature(bytes memory signature, bytes32 message) internal pure returns (address) {
    // ECDSA signatures must be 64 bytes (https://eips.ethereum.org/EIPS/eip-2098)
    require(signature.length == 64, "signature-invalid-length");

    // Signature is concatenation of r and v-s, both 32 bytes
    // https://github.com/celestiaorg/celestia-specs/blob/ec98170398dfc6394423ee79b00b71038879e211/src/specs/data_structures.md#signature
    bytes32 vs;
    bytes32 r;
    bytes32 s;
    uint8 v;

    (r, vs) = abi.decode(signature, (bytes32, bytes32));

    // v is first bit of vs as uint8
    // yParity parameter is always either 0 or 1 (canonically the values used have been 27 and 28), so adjust accordingly
    v = 27 + uint8(uint256(vs) & (1 << 255) > 0 ? 1 : 0);

    // s is vs with first bit replaced by a 0
    s = bytes32((uint256(vs) << 1) >> 1);

    return addressFromSignatureComponents(v, r, s, message);
  }
}
