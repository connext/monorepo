import { createLoggingContext } from "@connext/nxtp-utils";
import { Provider } from "zksync-web3";
import { BigNumber } from "ethers";

import { NoRootAvailable } from "../errors";
import { getContext } from "../processFromRoot";

import { GetProcessArgsParams } from ".";

export const getProcessFromZkSyncRootArgs = async ({
  spokeChainId,
  hubChainId,
  spokeProvider,
  message,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<[BigNumber, BigNumber, BigNumber, string, string[]]> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getProcessFromZkSyncRootArgs.name, _requestContext);
  logger.info("Method start", requestContext, methodContext);
  // When processing from root on zksync, you need the following information:
  // // zkSync block number in which the message was sent
  // uint256 _l2BlockNumber,
  // // Message index, that can be received via API
  // uint256 _index,
  // // The tx number in block
  // uint16 _l2TxNumberInBlock,
  // // The message that was sent from l2
  // bytes calldata _message,
  // // Merkle proof for the message
  // bytes32[] calldata _proof

  // create L2 provider
  const l2Provider = new Provider(spokeProvider);

  // get transaction receipt from hash on l2
  const { l2ToL1Logs, l1BatchNumber, l1BatchTxIndex } = await l2Provider.getTransactionReceipt(sendHash);
  const l2Tol1Log = l2ToL1Logs.find((l) => l.transactionHash === sendHash);
  if (!l2Tol1Log) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext);
  }

  // Getting L2 message proof for block
  const l2MessageProof = await l2Provider.getLogProof(sendHash, l2Tol1Log.logIndex);

  // if l2MessageProof == null. no such message
  if (!l2MessageProof) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext);
  }

  logger.info("Got proof from zksync", requestContext, methodContext, {
    sendHash,
    l2ToL1Logs,
    l1BatchNumber,
    l1BatchTxIndex,
    l2MessageProof,
  });

  return [
    BigNumber.from(l1BatchNumber),
    BigNumber.from(l2MessageProof.id),
    BigNumber.from(l1BatchTxIndex),
    message,
    l2MessageProof.proof,
  ];
};
