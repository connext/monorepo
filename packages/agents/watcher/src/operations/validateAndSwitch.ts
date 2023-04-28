import { SwitchResponse, ReportEventType } from "@connext/nxtp-adapters-watcher";
import { createMethodContext, RequestContext } from "@connext/nxtp-utils";
import { getContext } from "../watcher";

export const validateAndSwitch = async (requestContext: RequestContext, transactions?: Record<string, string[]>) => {
  const {
    adapters: { monitor },
  } = getContext();
  const { needsAction, reason } = await monitor.validateProposal(requestContext);
  if (needsAction) {
    await switchAndAlert(requestContext, reason || "", transactions);
  }
};

export const switchAndAlert = async (
  requestContext: RequestContext,
  reason: string,
  transactions?: Record<string, string[]>,
): Promise<SwitchResponse> => {
  const {
    adapters: { monitor },
    logger,
    config,
  } = getContext();
  const methodContext = createMethodContext(switchAndAlert.name);

  // TODO: We need just hubDomain for this one
  const domains = Object.keys(config.chains);
  logger.warn("SWITCHING TO SLOW MODE!!!", requestContext, methodContext, { reason, transactions });
  const result = await monitor.switch(requestContext, reason);
  logger.warn("Switched to slow mode, alerting", requestContext, methodContext, { result, domains: domains });
  await monitor.alert(
    {
      //TODO: Check with connext if alerter approach is correct, and modify to only pass hubDomain instead of domains
      domains,
      errors: [result.error],
      reason,
      timestamp: Date.now(),
      event: ReportEventType.Switch,
      logger,
      relevantTransactions: [result.relevantTransaction],
      requestContext,
      // TODO: also change to only send the hubDomain rpc
      rpcs: Object.entries(config.chains)
        .map((chain) => chain[1].providers)
        .flat(),
    },
    config,
  );
  logger.info("Finished alerting after fraud", requestContext, methodContext);
  return result;
};
