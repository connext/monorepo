import { jsonifyError } from "@connext/nxtp-utils";

import { axiosPost } from "../mockable";
import { Report } from "../types";

enum Telegram_ParseModes {
  MarkdownV2,
  HTML,
}

export const alertViaTelegram = async (report: Report, apiKey?: string, chatId?: string) => {
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

  if (!chatId || !apiKey) {
    logger.error(
      "Failed to alert via telegram",
      requestContext,
      methodContext,
      jsonifyError(new Error("Telegram alert config is invalid!")),
    );
    throw new Error("alertViaTelegram: Telegram alert config is invalid!");
  }

  logger.info("Sending message via telegram", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
  });

  const message = `### Watcher Alert!
   **Reason:** ${reason}
   **Type:** ${event}
   **Timestamp:** ${new Date(timestamp * 1000).toString()}
   **Errors:** ${errors.join("\n")}
   **Domains:** ${domains.join(", ")}
   **Rpcs:** ${rpcs.join("\n")}
   `;

  return await axiosPost(`https://api.telegram.org/bot/${apiKey}/sendMessage`, {
    chat_id: chatId,
    text: message,
    parse_mode: Telegram_ParseModes.MarkdownV2,
  });
};
