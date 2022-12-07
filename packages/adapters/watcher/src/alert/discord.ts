import { jsonifyError } from "@connext/nxtp-utils";

import { axiosPost } from "../mockable";
import { Report, ReportEventType, WatcherConfig } from "../types";

export const alertViaDiscord = async (report: Report, config: WatcherConfig) => {
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

  const { discordHookUrl } = config;
  if (!discordHookUrl) {
    logger.error(
      "Failed to alert via discord",
      requestContext,
      methodContext,
      jsonifyError(new Error("Invalid discord hook url")),
    );
    throw new Error("alertViaDiscord: invalid hook url!");
  }

  logger.info("Sending message to discord channel", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
  });

  const params = {
    content: `Watcher ${event} Alert!!!!`, //This will be the regular message above the embed
    username: "Watcher Alert",
    avatar_url: "",
    allowed_mentions: {
      parse: ["everyone"],
    },
    embeds: [
      {
        color: event == ReportEventType.Tx || ReportEventType.Rpc ? 0xff3827 : 0x0052cc,
        timestamp: new Date(timestamp * 1000),
        title: "Reason",
        description: "",
        fields: [
          {
            name: "Type",
            value: event,
          },
          {
            name: "Reason",
            value: reason,
          },
          {
            name: "Domains",
            value: domains.join(","),
          },
          {
            name: "Errors",
            value: errors.join("\n"),
          },
          {
            name: "Relevant Transactions",
            value: relevantTransactions.map((tx) => (typeof tx === "string" ? tx : tx.hash)).join(","),
          },
          {
            name: "Rpcs",
            value: rpcs.join(","),
          },
        ],
        url: "", //This will set an URL for the title
      },
    ],
  };

  return await axiosPost(config.discordHookUrl!, params);
};
