import { createLoggingContext } from "@connext/nxtp-utils";
import { getContext } from "../../shared";

export const updateMessageStatus = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateMessageStatus.name);

  for (const domain of domains) {
    const limit = 100;
  }
};
