import { createLoggingContext } from "@connext/nxtp-utils";
import { CrossChainMessageProof, DEFAULT_L2_CONTRACT_ADDRESSES, MessageStatus } from "@eth-optimism/sdk";
import { BigNumber, providers } from "ethers";

import { OptimismCrossChainMessenger } from "../../../mockable";
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

export const getProcessFromBaseRootArgs = async ({
  spokeChainId,
  hubChainId,
  spokeProvider,
  hubProvider,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<OptimismProcessArgs> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getProcessFromBaseRootArgs.name, _requestContext);
  logger.info("Method start", requestContext, methodContext);
  // When processing from root on optimism, you need the following information:
  //   address _target, -> connector
  //   address _sender, -> mirror connector
  //   bytes memory _message, -> calldata
  //   uint256 _messageNonce, -> ?
  //   L2MessageInclusionProof memory _proof -> taken from sdk

  // create the messenger
  const messenger = new OptimismCrossChainMessenger({
    l2ChainId: spokeChainId,
    l2SignerOrProvider: new providers.JsonRpcProvider(spokeProvider),
    l1ChainId: hubChainId,
    l1SignerOrProvider: new providers.JsonRpcProvider(hubProvider),
    contracts: {
      l1: {
        AddressManager: "0x8EfB6B5c4767B09Dc9AA6Af4eAA89F749522BaE2",
        L1CrossDomainMessenger: "0x866E82a600A1414e583f7F13623F1aC5d58b0Afa",
        L1StandardBridge: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        StateCommitmentChain: "0x0000000000000000000000000000000000000000",
        CanonicalTransactionChain: "0x0000000000000000000000000000000000000000",
        BondManager: "0x0000000000000000000000000000000000000000",
        OptimismPortal: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
        L2OutputOracle: "0x56315b90c40730925ec5485cf004d835058518A0",
      },
      l2: DEFAULT_L2_CONTRACT_ADDRESSES,
    },
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
  logger.info("Got withdrawal tx from base", requestContext, methodContext, { tx });

  // get the proof
  const proof = await messenger.getBedrockMessageProof(sendHash);
  logger.info("Got L2 message proof from base", requestContext, methodContext, { proof });
  if (!proof) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext);
  }
  const { l2OutputIndex, outputRootProof, withdrawalProof } = proof;

  // Format arguments
  return [tx, l2OutputIndex, outputRootProof, withdrawalProof];
};
