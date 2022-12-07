import { jsonifyError } from "@connext/nxtp-utils";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

import { sendMessageViaTwilio } from "../mockable";
import { Report } from "../types";

export const alertViaSms = async (
  report: Report,
  accountSid?: string,
  authToken?: string,
  twilioNumber?: string,
  toPhoneNumbers?: string[],
): Promise<MessageInstance[]> => {
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

  if (!twilioNumber || !accountSid || !authToken || !toPhoneNumbers || toPhoneNumbers.length == 0) {
    logger.error(
      "Failed to alert via sms",
      requestContext,
      methodContext,
      jsonifyError(new Error("Twilio config is invalid!")),
    );
    throw new Error("alertViaSms: Twilio config is invalid!");
  }

  logger.info("Sending message via twilio", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
  });

  const messages: MessageInstance[] = [];
  for (const phoneNumber of toPhoneNumbers) {
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
      )}`,
      to: phoneNumber,
      from: twilioNumber,
    };

    const message = await sendMessageViaTwilio(accountSid, authToken, textContent);
    messages.push(message);
  }
  return messages;
};
