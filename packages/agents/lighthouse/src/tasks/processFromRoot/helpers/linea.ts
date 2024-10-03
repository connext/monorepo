import { createLoggingContext } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { LineaSDK } from "../../../mockable";
import { AlreadyProcessed, NoRootAvailable } from "../errors";
import { getContext } from "../processFromRoot";

import { GetProcessArgsParams } from ".";

export const getProcessFromLineaRootArgs = async ({
  spokeChainId,
  hubChainId,
  hubProvider,
  spokeProvider,
  message: _message,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<[string, BigNumber]> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(getProcessFromLineaRootArgs.name, _requestContext);
  logger.info("Method start", requestContext, methodContext);

  const sdk = new LineaSDK({
    l1RpcUrl: hubProvider, // L1 rpc url
    l2RpcUrl: spokeProvider, // L2 rpc url
    network: hubChainId === 1 ? "linea-mainnet" : "linea-goerli", // network you want to interact with (either linea-mainnet or linea-goerli)
    mode: "read-only", // contract wrapper class mode (read-only or read-write), read-only: only read contracts state, read-write: read contracts state and claim messages
  });

  // get Message Status
  const messages = await sdk.getL2Contract().getMessagesByTransactionHash(sendHash);

  if (!messages?.length) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: `${sendHash} has no message sent`,
    });
  }

  //  returns on-chain message status by message hash
  const messageStatus = await sdk.getL1Contract().getMessageStatus(messages[0].messageHash);
  logger.info("Got Message status on hub chain from linea", requestContext, methodContext, {
    sendHash,
    message: messages[0],
    messageStatus,
  });

  if (messageStatus === "CLAIMED") {
    throw new AlreadyProcessed(spokeChainId, hubChainId, requestContext, methodContext, {
      sendHash,
      messageStatus,
    });
  } else if (messageStatus === "CLAIMABLE") {
    return [messages[0].calldata, BigNumber.from(messages[0].messageNonce)];
  } else {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext, {
      error: `Linea Unknown message status`,
      hash: sendHash,
    });
  }
};
