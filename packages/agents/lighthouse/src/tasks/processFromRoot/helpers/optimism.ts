import { createLoggingContext } from "@connext/nxtp-utils";
import { CrossChainMessageProof, MessageStatus } from "@eth-optimism/sdk";
import { BigNumber, providers } from "ethers";

import { CrossChainMessenger } from "../../../mockable";
import { NoRootAvailable } from "../errors";
import { getContext } from "../processFromRoot";

import { GetProcessArgsParams } from ".";

type BedrockProcessArgs = [
  any, // Types.WithdrawalTx
  number,
  any, // OutboxRootProof
  string[],
];

type LegacyOptimismProcessArgs = [string, string, string, BigNumber, CrossChainMessageProof];

type OptimismProcessArgs = BedrockProcessArgs | LegacyOptimismProcessArgs;

export const getProcessFromOptimismRootArgs = async ({
  spokeChainId,
  hubChainId,
  spokeProvider,
  hubProvider,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<OptimismProcessArgs> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getProcessFromOptimismRootArgs.name, _requestContext);
  logger.info("Method start", requestContext, methodContext);
  // When processing from root on optimism, you need the following information:
  //   address _target, -> connector
  //   address _sender, -> mirror connector
  //   bytes memory _message, -> calldata
  //   uint256 _messageNonce, -> ?
  //   L2MessageInclusionProof memory _proof -> taken from sdk

  // create the messenger
  const messenger = new CrossChainMessenger({
    l2ChainId: spokeChainId,
    l2SignerOrProvider: new providers.JsonRpcProvider(spokeProvider),
    l1ChainId: hubChainId,
    l1SignerOrProvider: new providers.JsonRpcProvider(hubProvider),
    bedrock: true,
  });

  // Handle bedrock proof
  const status = await messenger.getMessageStatus(sendHash);
  if (status !== MessageStatus.READY_TO_PROVE) {
    throw new Error(`Optimism message status is not ready to prove: ${status}`);
  }
  // get the message
  const resolved = await messenger.toCrossChainMessage(sendHash);
  const {
    messageNonce: nonce,
    sender,
    target,
    value,
    message: data,
    minGasLimit: gasLimit,
  } = await messenger.toLowLevelMessage(resolved);

  // get the tx
  const tx = {
    nonce: nonce.toString(),
    sender,
    target,
    value,
    gasLimit,
    data,
  };
  logger.info("Got withdrawal tx from optimism", requestContext, methodContext, { tx });

  // get the proof
  const proof = await messenger.getBedrockMessageProof(sendHash);
  logger.info("Got L2 message proof from optimism", requestContext, methodContext, { proof });
  if (!proof) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext);
  }
  const { l2OutputIndex, outputRootProof, withdrawalProof } = proof;

  // Format arguments
  return [tx, l2OutputIndex, outputRootProof, withdrawalProof];
};
