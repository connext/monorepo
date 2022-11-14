import { createLoggingContext } from "@connext/nxtp-utils";

import { getContext } from "../propagate";

type ExtraPropagateParams = {
  encodedData: string;
  value: string;
};

const getParamsForDomainFn: Record<string, () => Promise<ExtraPropagateParams>> = {};

export const propagate = async () => {
  const {
    logger,
    config,
    adapters: { chainreader, contracts, relayers, subgraph },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(propagate.name);
  logger.info("Starting propagate operation", requestContext, methodContext);
  const domains = await subgraph.getDomainsForHub(config.hubDomain);
  const params: ExtraPropagateParams[] = await Promise.all(
    domains.map(async (domain) => {
      logger.info("Starting propagation for domain", requestContext, methodContext, { domain });
      const getParamsForDomain = getParamsForDomainFn[domain];
      let params: ExtraPropagateParams = { encodedData: "0x", value: "0" };
      if (getParamsForDomain) {
        params = await getParamsForDomain();
      }
    }),
  );
};
