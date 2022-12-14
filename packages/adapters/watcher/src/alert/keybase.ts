import Bot from "keybase-bot";

import { KeybaseChannel, Report } from "../types";

export const alertViaKeybase = async (report: Report, user: string, keys: string, channel?: KeybaseChannel) => {
  const { event, reason, errors, domains, relevantTransactions } = report;

  const bot = new Bot();
  await bot.init(user, keys, { verbose: false });

  await bot.chat.send(
    channel ?? {
      name: "connext",
      public: false,
      topicType: "chat",
      membersType: "team",
      topicName: "alerts",
    },
    {
      body:
        `WATCHER ALERT!\nReason: ${reason}\nType: ${event}\nDomains: ${domains.join(",")}` +
        `\nRelevant Txs: ${relevantTransactions.join(",")}\nErrors: ${errors.join(",")}`,
    },
  );

  await bot.deinit();
};
