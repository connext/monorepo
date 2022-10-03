import {TransferIdInformation} from "../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {IBridgeToken} from "../../contracts/core/connext/interfaces/IBridgeToken.sol";
import {BridgeMessage} from "../../contracts/core/connext/libraries/BridgeMessage.sol";

library MessagingUtils {
  // Format cross-chain message from call params.
  function formatMessage(
    TransferIdInformation memory params,
    address local,
    bool isCanonical
  ) public returns (bytes memory) {
    bytes32 transferId = keccak256(abi.encode(params));
    IBridgeToken token = IBridgeToken(local);

    bytes29 tokenId = BridgeMessage.formatTokenId(params.canonicalDomain, params.canonicalId);

    bytes29 action = BridgeMessage.formatTransfer(params.bridgedAmt, transferId);

    return BridgeMessage.formatMessage(tokenId, action);
  }
}
