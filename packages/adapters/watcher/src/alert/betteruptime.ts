import { jsonifyError } from "@connext/nxtp-utils";

import { Report } from "../types";
import { axiosPost } from "../mockable";

export const alertViaBetterUptime = async (report: Report, apiKey?: string) => {
  const {
    timestamp,
    event,
    reason,
    errors,
    logger,
    requestContext,
    methodContext,
    domains,
    relevantTransactions,
    rpcs,
  } = report;
  if (!apiKey) {
    const error = new Error("alertViaBetterUptime: api key is invalid!");
    logger.error("Failed to alert via betteruptime", requestContext, methodContext, jsonifyError(error));
    throw error;
  }

  logger.info("Sending message to pager duty", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
  });

  const response = await axiosPost("https://betteruptime.com/api/v2/incidents", {
    token: apiKey,
    data: {
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
    },
  });
  return response;
};
