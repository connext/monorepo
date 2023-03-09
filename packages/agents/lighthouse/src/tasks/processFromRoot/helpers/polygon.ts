import { ethers } from "ethers";
import { createLoggingContext } from "@connext/nxtp-utils";

import { getContext } from "../processFromRoot";
import { NoRootAvailable, AlreadyProcessed } from "../errors";
import { generateExitPayload, getContract } from "../../../mockable";

import { GetProcessArgsParams } from ".";

export const getProcessFromPolygonRootArgs = async ({
  spokeDomainId,
  hubDomainId,
  spokeChainId,
  hubChainId,
  spokeProvider,
  hubProvider,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<[string]> => {
  const {
    logger,
    config,
    adapters: { contracts },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext("getProcessFromPolygonRootArgs", _requestContext);
  logger.info("getProcessFromPolygonRootArgs method start", requestContext, methodContext);

  const SEND_MESSAGE_EVENT_SIG = "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036"; // keccak256(MessageSent(bytes))

  // domains should always exist at this point

  const providers = new Map<string, string[]>();
  providers.set(spokeDomainId, [spokeProvider]);
  providers.set(hubDomainId, [hubProvider]);
  const { payload, hash } = await generateExitPayload(
    spokeDomainId,
    hubDomainId,
    sendHash,
    SEND_MESSAGE_EVENT_SIG,
    providers,
  );

  if (!payload) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext);
  }

  if (hash) {
    // check if already processed!!
    const hubConnector = contracts.hubConnector(
      hubChainId ?? 0,
      "Polygon",
      config.environment === "staging" ? "Staging" : "",
    );
    const rpcProvider = new ethers.providers.JsonRpcProvider(hubProvider);
    const hubConnectorContract = getContract(hubConnector!.address, hubConnector!.abi as any[], rpcProvider);

    const processed = await hubConnectorContract.processedExits(hash);
    logger.info("Got exitHash and checked if processed from polygon", requestContext, methodContext, {
      hash,
      processed,
    });
    if (processed) {
      throw new AlreadyProcessed(spokeChainId, hubChainId, requestContext, methodContext, {
        txHash: sendHash,
        exitHash: hash,
      });
    }
  }

  return [payload];
};
