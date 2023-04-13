// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {TransferInfo} from "../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {IBridgeToken} from "../../contracts/core/connext/interfaces/IBridgeToken.sol";
import {BridgeMessage} from "../../contracts/core/connext/libraries/BridgeMessage.sol";

import {Message} from "../../contracts/messaging/libraries/Message.sol";
import {TypeCasts} from "../../contracts/shared/libraries/TypeCasts.sol";

library MessagingUtils {
  // Format cross-chain message from call params.
  function formatTransferMessage(TransferInfo memory params) public view returns (bytes memory) {
    bytes32 transferId = keccak256(abi.encode(params));

    bytes29 tokenId = BridgeMessage.formatTokenId(params.canonicalDomain, params.canonicalId);

    bytes29 action = BridgeMessage.formatTransfer(params.bridgedAmt, transferId);

    return BridgeMessage.formatMessage(tokenId, action);
  }

  function formatDispatchedMessage(
    uint32 originDomain,
    uint32 destinationDomain,
    uint32 nonce, // on SpokeConnector / messaging layer
    address caller,
    address recipient,
    bytes memory messageDispatched
  ) public pure returns (bytes memory) {
    return
      Message.formatMessage(
        originDomain,
        TypeCasts.addressToBytes32(caller),
        nonce,
        destinationDomain,
        TypeCasts.addressToBytes32(recipient),
        messageDispatched
      );
  }

  function formatDispatchedTransferMessage(
    TransferInfo memory params,
    address originConnext,
    address destinationConnext,
    uint32 nonce
  ) public view returns (bytes memory) {
    return
      formatDispatchedMessage(
        params.originDomain,
        params.destinationDomain,
        nonce,
        originConnext,
        destinationConnext,
        formatTransferMessage(params)
      );
  }
}
