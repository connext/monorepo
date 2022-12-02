import { trigger } from "@pagerduty/pdjs";

import { Report } from "../types";

const ROUTING_KEY = "xxx";

export const alertViaPagerDuty = async (report: Report) => {
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

  logger.info("Sending message to pager duty", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
  });

  if (ROUTING_KEY.length != 32) {
    throw new Error("PagerDuty Routing Key is invalid");
  }

  try {
    await trigger({
      data: {
        payload: {
          summary: `Connext Watcher Alert - ${reason}`,
          timestamp: new Date(timestamp * 1000).toString(),
          source: "connext:watcher:mainnet", // unique id
          severity: "critical", // 'critical' | 'error' | 'warning' | 'info';
          component: "watcher",
          group: "watcher.pause",
          class: `${event} alert`,
          custom_details: {
            domains,
            errors,
            transactions: relevantTransactions.map((tx) => (typeof tx === "string" ? tx : tx.hash)),
            rpcs,
          },
        },
        routing_key: ROUTING_KEY,
        dedup_key: ROUTING_KEY,
        images: [
          {
            src: "https://connextscan.io/logos/logo.png",
            href: "https://connext.network/",
            alt: "Connext Watcher",
          },
        ],
        links: [
          {
            href: "https://connext.network/",
            text: "Connext Watcher",
          },
        ],
        event_action: "trigger",
      },
    });
  } catch (e: unknown) {
    console.log(e);
  }
};
