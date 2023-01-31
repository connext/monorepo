import { createMethodContext, jsonifyError } from "@connext/nxtp-utils";

import { pagerDutyTrigger } from "../mockable";
import { Report } from "../types";

export const alertViaPagerDuty = async (report: Report, routingKey: string) => {
  const methodContext = createMethodContext(alertViaPagerDuty.name);
  const { timestamp, event, reason, errors, logger, requestContext, domains, relevantTransactions, rpcs } = report;

  if (routingKey.length != 32) {
    logger.error(
      "Failed to alert via pager duty",
      requestContext,
      methodContext,
      jsonifyError(new Error("pagerDuty Routing Key is invalid!")),
    );
    throw new Error("alertViaPagerDuty: pagerDuty Routing Key is invalid!");
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

  return await pagerDutyTrigger({
    data: {
      payload: {
        summary: `Connext Watcher Alert - ${reason}`,
        timestamp: new Date(timestamp).toISOString(),
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
      routing_key: routingKey,
      dedup_key: routingKey,
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
};
