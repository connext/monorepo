import { PauseResponse, ReportEventType } from "@connext/nxtp-adapters-watcher";
import { createMethodContext, RequestContext } from "@connext/nxtp-utils";

import { getContext } from "../watcher";

export const validateAndPause = async (requestContext: RequestContext) => {
  const {
    adapters: { watcher },
  } = getContext();

  const { needsPause, reason, transactions } = await watcher.checkInvariants(requestContext);
  if (needsPause) {
    await pauseAndAlert(requestContext, reason || "", transactions);
  }
};

export const pauseAndAlert = async (
  requestContext: RequestContext,
  reason: string,
  transactions?: Record<string, string[]>,
): Promise<PauseResponse[]> => {
  const {
    adapters: { watcher },
    logger,
    config,
  } = getContext();
  const methodContext = createMethodContext(pauseAndAlert.name);

  const domains = Object.keys(config.chains);
  logger.warn("Pausing contracts!!!", requestContext, methodContext, { reason, transactions, domains });
  const paused = await watcher.pause(requestContext, reason, domains);
  logger.warn("Paused contracts, alerting", requestContext, methodContext, { paused });
  await watcher.alert(
    {
      domains,
      errors: paused.map((p) => p.error),
      reason,
      timestamp: Date.now(),
      event: ReportEventType.Pause,
      logger,
      relevantTransactions: paused.map((p) => p.relevantTransaction),
      requestContext,
      rpcs: Object.entries(config.chains)
        .map((chain) => chain[1].providers)
        .flat(),
    },
    config,
  );
  logger.info("Finished alerting after pause", requestContext, methodContext);
  return paused;
};
