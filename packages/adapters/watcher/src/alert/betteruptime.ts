import { createMethodContext } from "@connext/nxtp-utils";

import { Report } from "../types";
import { axiosPost } from "../mockable";

export const alertViaBetterUptime = async (report: Report, apiKey: string, requesterEmail: string) => {
  const methodContext = createMethodContext(alertViaBetterUptime.name);
  const { timestamp, event, reason, errors, logger, requestContext, domains, relevantTransactions, rpcs } = report;
  logger.info("Sending message to better uptime", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
    requesterEmail,
  });

  const response = await axiosPost(
    "https://betteruptime.com/api/v2/incidents",
    {
      name: `Connext Watcher Pause`,
      summary: `Connext Watcher Alert - ${reason}`,
      description: JSON.stringify({
        severity: "critical",
        timestamp,
        event,
        reason,
        errors,
        domains,
        relevantTransactions,
        rpcs,
      }),
      push: true,
      sms: true,
      call: true,
      email: true,
      team_wait: 1,
      requester_email: requesterEmail,
    },
    {
      headers: { Authorization: `Bearer ${apiKey}` },
    },
  );
  return response;
};
