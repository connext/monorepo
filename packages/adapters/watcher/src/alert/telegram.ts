import { jsonifyError } from "@connext/nxtp-utils";

import { WatcherConfig } from "../config";
import { axiosPost } from "../mockable";
import { Report } from "../types";

enum Telegram_ParseModes {
  MarkdownV2,
  HTML,
}

export const alertViaTelegram = async (report: Report, config: WatcherConfig) => {
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

  const { telegramChatId, telegramApiKey } = config;
  if (!telegramChatId || !telegramApiKey) {
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

  return await axiosPost(`https://api.telegram.org/bot/${telegramApiKey}/sendMessage`, {
    chat_id: telegramChatId,
    text: message,
    parse_mode: Telegram_ParseModes.MarkdownV2,
  });
};
