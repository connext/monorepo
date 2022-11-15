import { sendWithRelayerWithBackup } from "@connext/nxtp-adapters-relayer";
import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";

import { encodePropagate } from "../../../mockable";
import { NoChainIdForHubDomain, RootManagerPropagateWrapperNotFound } from "../errors";
import { getPropagateParams as getPropagateParamsArbitrum } from "../helpers/arbitrum";
import { getContext } from "../propagate";

export type ExtraPropagateParams = {
  encodedData: string;
  value: string;
};

const getParamsForDomainFn: Record<
  string,
  (
    spokeDomain: string,
    spokeChainId: number,
    hubChainId: number,
    requestContext: RequestContext,
  ) => Promise<ExtraPropagateParams>
> = {
  "1634886255": getPropagateParamsArbitrum,
};

export const propagate = async () => {
  const {
    logger,
    config,
    chainData,
    adapters: { chainreader, contracts, relayers, subgraph },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(propagate.name);
  logger.info("Starting propagate operation", requestContext, methodContext);
  const domains = await subgraph.getDomainsForHub(config.hubDomain);
  const hubChainId = chainData.get(config.hubDomain)?.chainId;
  if (!hubChainId) {
    throw new NoChainIdForHubDomain(config.hubDomain, requestContext, methodContext);
  }

  const params: ExtraPropagateParams[] = await Promise.all(
    domains.map(async (domain) => {
      logger.info("Starting propagation for domain", requestContext, methodContext, { domain });
      const getParamsForDomain = getParamsForDomainFn[domain];
      let params: ExtraPropagateParams = { encodedData: "0x", value: "0" };
      if (getParamsForDomain) {
        params = await getParamsForDomain(domain, chainData.get(domain)?.chainId, hubChainId, requestContext);
      }
      return params;
    }),
  );

  const target = contracts.rootManagerPropagateWrapper(hubChainId, config.environment === "staging" ? "Staging" : "");
  if (!target) {
    throw new RootManagerPropagateWrapperNotFound(config.hubDomain, requestContext, methodContext);
  }

  // encode data
  const encodedData = encodePropagate(target.abi as string[], params);
  const { taskId } = await sendWithRelayerWithBackup(
    hubChainId,
    config.hubDomain,
    target.address as string,
    encodedData,
    relayers,
    chainreader,
    logger,
    requestContext,
  );
  logger.info("Propagate tx sent", requestContext, methodContext, { taskId });
};
