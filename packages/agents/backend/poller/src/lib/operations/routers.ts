import {
  createLoggingContext,
  getSubgraphHealth,
  getSubgraphName,
  OriginTransfer,
  XTransferStatus,
} from "@connext/nxtp-utils";

import { getContext } from "../../backend";

export const updateRouters = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    config,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateRouters.name);
};
