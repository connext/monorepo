import { jsonifyError } from "@connext/nxtp-utils";
import { Twilio } from "twilio";

import { WatcherConfig } from "../config";
import { Report } from "../types";

export const alertViaSms = async (report: Report, config: WatcherConfig) => {
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

  const { twilioNumber, twilioAccountSid, twilioAuthToken, twilioToPhoneNumbers } = config;

  if (
    !twilioNumber ||
    !twilioAccountSid ||
    !twilioAuthToken ||
    !twilioToPhoneNumbers ||
    twilioToPhoneNumbers.length == 0
  ) {
    logger.error(
      "Failed to alert via sms",
      requestContext,
      methodContext,
      jsonifyError(new Error("Twilio config is invalid!")),
    );
    throw new Error("alertViaSms: Twilio config is invalid!");
  }

  const client = new Twilio(twilioAccountSid, twilioAuthToken);

  logger.info("Sending message via twilio", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
  });

  for (const phoneNumber of twilioToPhoneNumbers) {
    if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      logger.warn(
        "Failed to alert via sms. to phoneNumber must be E164 format!, skipping...",
        requestContext,
        methodContext,
      );
      continue;
    }

    const textContent = {
      body: `Watcher Alert!. Reason: ${reason}, type: ${event}, domains: ${domains.join(",")}, errors: ${errors.join(
        ",",
      )}, repo`,
      to: phoneNumber,
      from: twilioNumber,
    };

    return await client.messages.create(textContent);
  }
};
