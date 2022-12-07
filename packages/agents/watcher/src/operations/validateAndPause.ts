import { PauseResponse, ReportEventType } from "@connext/nxtp-adapters-watcher";
import { createLoggingContext, createMethodContext, RequestContext } from "@connext/nxtp-utils";

import { getContext } from "../watcher";

export const validateAndPause = async () => {
  const {
    adapters: { watcher },
  } = getContext();

  const { requestContext } = createLoggingContext("validateAndPause");

  const { needsPause, reason } = await watcher.checkInvariants(requestContext);
  if (needsPause) {
    await pauseAndAlert(requestContext, reason || "");
  }
};

export const pauseAndAlert = async (requestContext: RequestContext, reason: string): Promise<PauseResponse[]> => {
  const {
    adapters: { watcher },
    logger,
    config,
  } = getContext();
  const methodContext = createMethodContext("pauseAndAlert");

  const domains = Object.keys(config.chains);
  logger.warn("Pausing contracts!!!", requestContext, methodContext, { reason: "ADD REASON" });
  const paused = await watcher.pause(requestContext, reason, domains);
  logger.warn("Paused contracts, alerting", requestContext, methodContext, { paused });
  await watcher.alert({
    domains,
    errors: paused.map((p) => p.error),
    reason,
    timestamp: Date.now(),
    event: ReportEventType.Pause,
    logger,
    methodContext,
    relevantTransactions: paused.map((p) => p.relevantTransaction),
    requestContext,
    rpcs: Object.entries(config.chains)
      .map((chain) => chain[1].providers)
      .flat(),
  });
  logger.info("Finished alerting after pause", requestContext, methodContext);
  return paused;
};
