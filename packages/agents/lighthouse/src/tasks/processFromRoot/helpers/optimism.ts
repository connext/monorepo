import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";
import { CrossChainMessageProof } from "@eth-optimism/sdk";
import { BigNumber, providers } from "ethers";

import { CrossChainMessenger } from "../../../mockable";
import { NoRootAvailable } from "../errors";
import { getContext } from "../processFromRoot";

export const getProcessFromOptimismRootArgs = async (
  l2ChainId: number,
  l1ChainId: number,
  l2Provider: providers.JsonRpcProvider,
  l1Provider: providers.JsonRpcProvider,
  sendHash: string,
  _requestContext: RequestContext,
): Promise<[string, string, string, BigNumber, CrossChainMessageProof]> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext("processFromOptimismRoot", _requestContext);
  logger.info("processFromOptimismRoot method start", requestContext, methodContext);
  // When processing from root on optimism, you need the following information:
  //   address _target, -> connector
  //   address _sender, -> mirror connector
  //   bytes memory _message, -> calldata
  //   uint256 _messageNonce, -> ?
  //   L2MessageInclusionProof memory _proof -> taken from sdk

  // create the messenger
  const messenger = new CrossChainMessenger({
    l2ChainId,
    l2SignerOrProvider: l2Provider,
    l1ChainId,
    l1SignerOrProvider: l1Provider,
  });

  // check to make sure you can prove
  const root = await messenger.getMessageStateRoot(sendHash);
  if (!root) {
    throw new NoRootAvailable(l2ChainId, l1ChainId, requestContext, methodContext);
  }

  // get the message to get the message nonce
  const [message] = await messenger.getMessagesByTransaction(sendHash);
  logger.info("Got message from optimism", requestContext, methodContext, { message });

  // get the inclusion proof
  const proof = await messenger.getMessageProof(sendHash);
  logger.info("Got proof from optimism", requestContext, methodContext, { proof });

  return [message.target, message.sender, message.message, message.messageNonce, proof];
};
