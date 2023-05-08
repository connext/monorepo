import { SwitchResponse, ReportEventType } from "@connext/nxtp-adapters-watcher";
import { createMethodContext, RequestContext } from "@connext/nxtp-utils";
import { getContext } from "../watcher";

export const validateAndSwitch = async (requestContext: RequestContext) => {
  const {
    adapters: { monitor },
    logger,
  } = getContext();
  const { needsAction, reason } = await monitor.validateProposal(requestContext);
  if (needsAction) {
    await switchAndAlert(requestContext, reason);
  } else if (reason) {
    logger.info(reason);
  }
};

export const switchAndAlert = async (requestContext: RequestContext, reason: string = ""): Promise<SwitchResponse> => {
  const {
    adapters: { monitor },
    logger,
    config,
  } = getContext();
  const methodContext = createMethodContext(switchAndAlert.name);

  const hubDomain = config.hubDomain;
  logger.warn("SWITCHING TO SLOW MODE!!!", requestContext, methodContext, { reason, transactions: undefined });
  const result = await monitor.switch(requestContext, reason);
  logger.warn("Switched to slow mode, alerting", requestContext, methodContext, { result, domains: [hubDomain] });
  await monitor.alert(
    {
      //TODO: Check with connext if alerter approach is correct, and modify to only pass hubDomain instead of domains
      domains: [hubDomain],
      errors: [result.error],
      reason,
      timestamp: Date.now(),
      event: ReportEventType.Switch,
      logger,
      relevantTransactions: [result.relevantTransaction],
      requestContext,
      rpcs: config.chains[+hubDomain].providers,
    },
    config,
  );
  logger.info("Finished alerting after fraud", requestContext, methodContext);
  return result;
};
