import { createMethodContext } from "@connext/nxtp-utils";

import { axiosPost } from "../mockable";
import { Report } from "../types";

export const alertViaTelegram = async (report: Report, apiKey: string, chatId: string) => {
  const methodContext = createMethodContext(alertViaTelegram.name);
  const { timestamp, event, reason, errors, logger, requestContext, domains, relevantTransactions, rpcs } = report;

  logger.info("Sending message via telegram", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
  });

  const message = `
  <b>Watcher Alert!</b>
  <strong>Reason: </strong><code>${reason}</code>
  <strong>Type: </strong><code>${event}</code>
  <strong>Timestamp: </strong><code>${new Date(timestamp).toISOString()}</code>
  <strong>Domains: </strong> <code>${domains.join(", ")}</code>
  <strong>Errors: </strong>
  ${errors.map((e) => `<code>${e}</code>`)}
  <strong>Rpcs: </strong> 
  ${rpcs.map((e) => `<code>${e}</code>`)}
  `;

  return await axiosPost(`https://api.telegram.org/bot${apiKey}/sendMessage`, {
    chat_id: chatId,
    text: message,
    parse_mode: "Html",
  });
};
