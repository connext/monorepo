import { axiosPost } from "@connext/nxtp-utils";

import { Report } from "../types";

// TODO should be in config
const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1048160441009979452/dz6BmIxJdQGP-91W82jJTpKR3KTGzMQwtrVvoIPfY3cR31YgNaz0r8u2eCGL1_H3UiCz";

export const alertViaDiscord = async (report: Report) => {
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
        color: 0xff4444,
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

  return await axiosPost(WEBHOOK_URL, params);
};
