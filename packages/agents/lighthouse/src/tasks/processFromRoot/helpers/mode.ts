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

type LegacyModeProcessArgs = [string, string, string, BigNumber, CrossChainMessageProof];

type ModeProcessArgs = BedrockProcessArgs | LegacyModeProcessArgs;

export const getProcessFromModeRootArgs = async ({
  spokeChainId,
  hubChainId,
  spokeProvider,
  hubProvider,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<ModeProcessArgs> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getProcessFromModeRootArgs.name, _requestContext);
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
        AddressManager: "0x50eF494573f28Cad6B64C31b7a00Cdaa48306e15",
        L1CrossDomainMessenger: "0x735aDBbE72226BD52e818E7181953f42E3b0FF21",
        L1StandardBridge: "0x9c67ACcb38137CB761587032179b176c9276Eb5a",
        StateCommitmentChain: "0x0000000000000000000000000000000000000000",
        CanonicalTransactionChain: "0x0000000000000000000000000000000000000000",
        BondManager: "0x0000000000000000000000000000000000000000",
        OptimismPortal: "0xad3DC277d3242938F8Be18f0560e3d9B9988C46A",
        L2OutputOracle: "0x4317ba146D4933D889518a3e5E11Fe7a53199b04",
      },
      l2: DEFAULT_L2_CONTRACT_ADDRESSES,
    },
    bedrock: true,
  });

  // Handle bedrock proof
  const status = await messenger.getMessageStatus(sendHash);
  if (status !== MessageStatus.READY_TO_PROVE) {
    throw new Error(`Mode message status is not ready to prove: ${status}`);
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
  logger.info("Got L2 message proof from mode network", requestContext, methodContext, { proof });
  if (!proof) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext);
  }
  const { l2OutputIndex, outputRootProof, withdrawalProof } = proof;

  // Format arguments
  return [tx, l2OutputIndex, outputRootProof, withdrawalProof];
};
