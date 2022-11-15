import { ethers } from "ethers";
import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";

import { NoHubConnector, NoProviderForDomain, NoSpokeConnector } from "../errors";
import { ExtraPropagateParams } from "../operations/propagate";
import { getContext } from "../propagate";

export const getPropagateParams = async (
  l2domain: string,
  l2ChainId: number,
  l1ChainId: number,
  _requestContext: RequestContext,
): Promise<ExtraPropagateParams> => {
  const {
    config,
    logger,
    adapters: { contracts, ambs },
  } = getContext();
  const { methodContext, requestContext } = createLoggingContext(getPropagateParams.name, _requestContext);
  logger.info("Getting propagate params for Arbitrum", requestContext, methodContext, { l2domain });
  const l2RpcUrl = config.chains[l2domain]?.providers[0];

  if (!l2RpcUrl) {
    throw new NoProviderForDomain(l2domain, requestContext, methodContext);
  }
  const l1RpcUrl = config.chains[config.hubDomain]?.providers[0];
  if (!l1RpcUrl) {
    throw new NoProviderForDomain(config.hubDomain, requestContext, methodContext);
  }

  const l2SpokeConnector = contracts.spokeConnector(
    l2ChainId,
    "Arbitrum",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l2SpokeConnector) {
    throw new NoSpokeConnector(l2ChainId, requestContext, methodContext);
  }

  const l1HubConnector = contracts.hubConnector(
    l1ChainId,
    "Arbitrum",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l1HubConnector) {
    throw new NoHubConnector(l1ChainId, requestContext, methodContext);
  }

  const l1Provider = new ethers.providers.JsonRpcProvider(l1RpcUrl);
  const l1HubConnectorContract = new ethers.Contract(l1HubConnector.address, l1HubConnector.abi as any[], l1Provider);
  const ambAddress = await l1HubConnectorContract.AMB();

  const ambContract = new ethers.Contract(ambAddress as string, ambs.bnb, l1Provider);
  const fee = await ambContract.calcSrcFees("", l2ChainId, 32);

  return { encodedData: "0x", value: fee };
};
