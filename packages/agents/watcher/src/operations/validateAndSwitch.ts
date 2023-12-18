import { PauseResponse } from "@connext/nxtp-adapters-watcher";
import { createMethodContext, RequestContext } from "@connext/nxtp-utils";

import { getContext } from "../watcher";

export const validateAndSwitch = async (requestContext: RequestContext, transactions?: Record<string, string[]>) => {
  const {
    adapters: { monitor },
  } = getContext();

  const { needsSwitch, reason } = await monitor.validateProposal(requestContext);
  if (needsSwitch) {
    await switchAndAlert(requestContext, reason || "", transactions);
  }
};

export const switchAndAlert = async (
  requestContext: RequestContext,
  reason: string,
  transactions?: Record<string, string[]>,
): Promise<PauseResponse[] | void> => {
  const {
    adapters: { monitor },
    logger,
    config,
  } = getContext();
  const methodContext = createMethodContext(switchAndAlert.name);

  const domains = Object.keys(config.chains);
  logger.warn("SWITCHING TO SLOW MODE!!!", requestContext, methodContext, { reason, transactions });
  const result = await monitor.switch(requestContext, reason);
  logger.warn("Switched to slow mode, alerting", requestContext, methodContext, { result, domains: domains });
  await monitor.alert(
    {
      // TODO: Setup alert params
      // domains,
      // errors: result.map((p) => p.error),
      // reason,
      // timestamp: Date.now(),
      // event: ReportEventType.Switch,
      // logger,
      // relevantTransactions: result.map((p) => p.relevantTransaction),
      // requestContext,
      // rpcs: Object.entries(config.chains)
      //   .map((chain) => chain[1].providers)
      //   .flat(),
    },
    config,
  );
  logger.info("Finished alerting after fraud", requestContext, methodContext);
  return result;
};
