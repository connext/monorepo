import { createLoggingContext } from "@connext/nxtp-utils";

import { getContext } from "../propagate";

export const propagate = async () => {
  const {
    logger,
    config,
    adapters: { chainreader, contracts, relayers },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(propagate.name);
  logger.info("Starting propagate operation", requestContext, methodContext);
  const domains = Object.entries(config.chains);
  await Promise.all(
    domains.map(async ([domain, config]) => {
      logger.info("Starting propagation for domain", requestContext, methodContext, { domain });
    }),
  );
};
