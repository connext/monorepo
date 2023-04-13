import { createMethodContext } from "@connext/nxtp-utils";

import { axiosPost } from "../mockable";
import { Report, ReportEventType } from "../types";

export const alertViaDiscord = async (report: Report, discordHookUrl: string) => {
  const methodContext = createMethodContext(alertViaDiscord.name);
  const { timestamp, event, reason, errors, logger, requestContext, domains, relevantTransactions, rpcs } = report;

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
    username: "Watcher Alerter",
    avatar_url: "",
    allowed_mentions: {
      parse: ["everyone"],
    },
    embeds: [
      {
        color: event == ReportEventType.Tx || ReportEventType.Rpc ? 0xff3827 : 0x0052cc,
        timestamp: new Date(timestamp).toISOString(),
        title: "Reason",
        description: "",
        fields: [
          {
            name: "Type",
            value: event,
          },
          {
            name: "Reason",
            value: reason || "No Reason",
          },
          {
            name: "Domains",
            value: domains.length ? domains.join("\n") : "None",
          },
          {
            name: "Errors",
            value: errors.filter((e) => !!e).length ? errors.join("\n") : "None",
          },
          {
            name: "Relevant Transactions",
            value: relevantTransactions.filter((tx) => !!tx).length
              ? relevantTransactions.map((tx) => (typeof tx === "string" ? tx : tx.hash)).join("\n")
              : "None",
          },
          {
            name: "Rpcs",
            value: rpcs.filter((r) => !!r).length ? rpcs.join("\n") : "None",
          },
        ],
        url: "", //This will set an URL for the title
      },
    ],
  };

  return await axiosPost(discordHookUrl, JSON.parse(JSON.stringify(params)));
};
