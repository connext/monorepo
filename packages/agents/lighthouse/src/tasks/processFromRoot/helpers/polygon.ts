import { createLoggingContext, generateExitPayload } from "@connext/nxtp-utils";

import { getContext } from "../processFromRoot";
import { NoRootAvailable } from "../errors";

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
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext("getProcessFromPolygonRootArgs", _requestContext);
  logger.info("getProcessFromPolygonRootArgs method start", requestContext, methodContext);

  const SEND_MESSAGE_EVENT_SIG = "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036"; // keccak256(MessageSent(bytes))

  // domains should always exist at this point

  const providers = new Map<string, string[]>();
  providers.set(spokeDomainId, [spokeProvider]);
  providers.set(hubDomainId, [hubProvider]);
  const payload = await generateExitPayload(spokeDomainId, hubDomainId, sendHash, SEND_MESSAGE_EVENT_SIG, providers);

  if (!payload) {
    throw new NoRootAvailable(spokeChainId, hubChainId, requestContext, methodContext);
  }
  return [payload];
};
