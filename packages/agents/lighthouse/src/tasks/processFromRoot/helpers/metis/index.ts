import { createLoggingContext } from "@connext/nxtp-utils";
import { CrossChainMessageProof, DEFAULT_L2_CONTRACT_ADDRESSES } from "@eth-optimism/sdk";
import { BigNumber, providers } from "ethers";

import { OptimismCrossChainMessenger } from "../../../../mockable";
import { NoRootAvailable } from "../../errors";
import { getContext } from "../../processFromRoot";
import { GetProcessArgsParams } from "..";

import { getMessageProof, getMessageStateRoot, getMessagesByTransaction } from "./utils";

/**
 * This is for pre-bedrock versions of the optimism contracts. Currently, this is used by:
 * - Mantle
 * - Metis
 */
export const getProcessFromMetisRootArgs = async ({
  spokeChainId,
  hubChainId,
  spokeProvider,
  hubProvider,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<[string, string, string, BigNumber, CrossChainMessageProof]> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getProcessFromMetisRootArgs.name, _requestContext);
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
        AddressManager: "0x918778e825747a892b17C66fe7D24C618262867d",
        L1CrossDomainMessenger: "0x081D1101855bD523bA69A9794e0217F0DB6323ff",
        L1StandardBridge: "0x3980c9ed79d2c191A89E02Fa3529C60eD6e9c04b",
        StateCommitmentChain: "0xf209815E595Cdf3ed0aAF9665b1772e608AB9380",
        CanonicalTransactionChain: "0x56a76bcC92361f6DF8D75476feD8843EdC70e1C9",
        BondManager: "0xf51B9C9a1c12e7E48BEC15DC358D0C1f0d7Eb3be",
        OptimismPortal: "0x0000000000000000000000000000000000000000",
        L2OutputOracle: "0x0000000000000000000000000000000000000000",
      },
      l2: DEFAULT_L2_CONTRACT_ADDRESSES,
    },
    bedrock: false,
  });

  // check to make sure you can prove
  const root = await getMessageStateRoot(messenger, sendHash);
  if (!root) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext);
  }

  // get the message to get the message nonce
  const [message] = await getMessagesByTransaction(messenger, sendHash);
  logger.info("Got message from metis", requestContext, methodContext, { message });

  // get the inclusion proof
  const proof = await getMessageProof(messenger, sendHash);
  logger.info("Got proof from metis", requestContext, methodContext, { proof });

  return [message.target, message.sender, message.message, message.messageNonce, proof];
};
