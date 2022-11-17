import { createLoggingContext, mkBytes32, RequestContext, RootManagerMeta } from "@connext/nxtp-utils";

import { encodePropagate, sendWithRelayerWithBackup } from "../../../mockable";
import { NoChainIdForHubDomain, RootManagerPropagateWrapperNotFound } from "../errors";
import { getPropagateParamsArbitrum, getPropagateParamsBnb } from "../helpers";
import { getContext } from "../propagate";

export type ExtraPropagateParam = {
  _connector: string;
  _fee: string;
  _encodedData: string;
};

export const getParamsForDomainFn: Record<
  string,
  (
    spokeDomain: string,
    spokeChainId: number,
    hubChainId: number,
    requestContext: RequestContext,
  ) => Promise<ExtraPropagateParam>
> = {
  "1634886255": getPropagateParamsArbitrum,
  "1734439522": getPropagateParamsArbitrum,
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
  if (!target) {
    throw new RootManagerPropagateWrapperNotFound(config.hubDomain, requestContext, methodContext);
  }

  const _connectors: string[] = [];
  const _encodedData: string[] = [];
  const _fees: string[] = [];

  for (const domain of domains) {
    const connector = rootManagerMeta.connectors[domains.indexOf(domain)];
    _connectors.push(connector);

    if (Object.keys(getParamsForDomainFn).includes(domain)) {
      const getParamsForDomain = getParamsForDomainFn[domain];
      const propagateParam = await getParamsForDomain(
        domain,
        chainData.get(domain)!.chainId,
        hubChainId,
        requestContext,
      );
      _encodedData.push(propagateParam._encodedData);
      _fees.push(propagateParam._fee);
    } else {
      _encodedData.push(mkBytes32("0x"));
      _fees.push("0");
    }
  }

  console.log({ _connectors, _encodedData, _fees });

  // encode data
  const encodedData = encodePropagate(target.abi as string[], [_connectors, _fees, _encodedData]);
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
