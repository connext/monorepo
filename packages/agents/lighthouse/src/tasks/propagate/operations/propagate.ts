import { createLoggingContext, RequestContext, RootManagerMeta } from "@connext/nxtp-utils";

import { encodePropagate, sendWithRelayerWithBackup } from "../../../mockable";
import { NoChainIdForHubDomain, RootManagerPropagateWrapperNotFound } from "../errors";
import { getPropagateParamsArbitrum, getPropagateParamsBnb } from "../helpers";
import { getContext } from "../propagate";

export type ExtraPropagateParams = {
  _connectors: string[];
  _fees: string[];
  _encodedData: string[];
};

export const getParamsForDomainFn: Record<
  string,
  (
    spokeDomain: string,
    spokeChainId: number,
    hubChainId: number,
    requestContext: RequestContext,
  ) => Promise<ExtraPropagateParams>
> = {
  "1634886255": getPropagateParamsArbitrum,
  "6450786": getPropagateParamsBnb,
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
  const rootManagerMeta: RootManagerMeta = await subgraph.getDomainsForHub(config.hubDomain);
  const domains = rootManagerMeta.domains;
  const hubChainId = chainData.get(config.hubDomain)?.chainId;
  if (!hubChainId) {
    throw new NoChainIdForHubDomain(config.hubDomain, requestContext, methodContext);
  }

  const target = contracts.rootManagerPropagateWrapper(hubChainId, config.environment === "staging" ? "Staging" : "");
  console.log("target", target);
  if (!target) {
    throw new RootManagerPropagateWrapperNotFound(config.hubDomain, requestContext, methodContext);
  }

  const params: ExtraPropagateParams[] = await Promise.all(
    domains.map(async (domain) => {
      logger.info("Starting propagation for domain", requestContext, methodContext, { domain });
      const getParamsForDomain = getParamsForDomainFn[domain];
      let params: ExtraPropagateParams = {
        _connectors: [rootManagerMeta.connectors[domains.indexOf(domain)]],
        _fees: ["0"],
        _encodedData: ["0x"],
      };
      if (getParamsForDomain) {
        // no try catch here because we want to throw if we can't get params
        params = await getParamsForDomain(domain, chainData.get(domain)!.chainId, hubChainId, requestContext);
      }
      return params;
    }),
  );

  // encode data
  const encodedData = encodePropagate(target.abi as string[], params);
  const { taskId } = await sendWithRelayerWithBackup(
    hubChainId,
    config.hubDomain,
    target.address,
    encodedData,
    relayers,
    chainreader,
    logger,
    requestContext,
  );
  logger.info("Propagate tx sent", requestContext, methodContext, { taskId });
};
