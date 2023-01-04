import Bot from "keybase-bot";

import { KeybaseChannel, Report } from "../types";

export const alertViaKeybase = async (report: Report, user: string, keys: string, channel: KeybaseChannel) => {
  const { event, reason, errors, domains, relevantTransactions } = report;

  const bot = new Bot();
  await bot.init(user, keys, { verbose: false });

  await bot.chat.send(channel, {
    body:
      `*WATCHER ALERT!*\n\n*Reason:* ${reason}\n\n*Type:* ${event}\n\n*Domains:* ${domains.join(", ")}` +
      `\n\n*Relevant Txs:* ${relevantTransactions
        .map((t) => (typeof t === "string" ? t : t.hash))
        .join(", ")}\n\n*Errors:* ${errors.join(", ")}`,
  });

  await bot.deinit();
};
