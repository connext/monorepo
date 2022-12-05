import { ReportEventType } from "@connext/nxtp-adapters-watcher";
import { createLoggingContext } from "@connext/nxtp-utils";

import { getContext } from "../watcher";

export const validateAndPause = async () => {
  const {
    adapters: { watcher },
    logger,
    config,
  } = getContext();

  const { requestContext, methodContext } = createLoggingContext("validateAndPause");

  const needsPause = await watcher.checkInvariants(requestContext);
  if (needsPause) {
    const domains = Object.keys(config.chains);
    logger.warn("Pausing contracts!!!", requestContext, methodContext);
    const paused = await watcher.pause(requestContext, "TODO", domains);
    logger.warn("Paused contracts", requestContext, methodContext, { paused });
    await watcher.alert(requestContext, ReportEventType.Pause, {
      domains,
      errors: [],
      reason: "", // TODO: need to return this from checkInvariants
      timestamp: Date.now(),
      event: ReportEventType.Pause,
      logger,
      methodContext,
      relevantTransactions: [], // TODO: need to return this from pause function
      requestContext,
      rpcs: Object.entries(config.chains)
        .map((chain) => chain[1].providers)
        .flat(),
    });
  }
};
