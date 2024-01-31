// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/* Library Imports */
import {RLPReader} from "./RLPReader.sol";

/**
 * @title OVMCodec
 *
 * @dev modified from: https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/codec/Lib_OVMCodec.sol
 */
library OVMCodec {
  /***********
   * Structs *
   ***********/

  struct EVMAccount {
    uint256 nonce;
    uint256 balance;
    bytes32 storageRoot;
    bytes32 codeHash;
  }

  /**
   * @notice Decodes an RLP-encoded account state into a useful struct.
   * @param _encoded RLP-encoded account state.
   * @return Account state struct.
   */
  function decodeEVMAccount(bytes memory _encoded) internal pure returns (EVMAccount memory) {
    RLPReader.RLPItem[] memory accountState = RLPReader.readList(_encoded);

    return
      EVMAccount({
        nonce: RLPReader.readUint256(accountState[0]),
        balance: RLPReader.readUint256(accountState[1]),
        storageRoot: RLPReader.readBytes32(accountState[2]),
        codeHash: RLPReader.readBytes32(accountState[3])
      });
  }
}
