import { Twilio } from "twilio";

import { Report } from "../types";

const twilioNumber = "your-twilio-number";
const accountSid = "AC-something";
const authToken = "something-something";
const phoneNumbers = ["phone-number-1", "phone-number-2"];

const client = new Twilio(accountSid, authToken);

export const alertViaSms = async (report: Report) => {
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

  logger.info("Sending message via twilio", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
  });

  for (const phoneNumber of phoneNumbers) {
    if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      throw new Error("number must be E164 format!");
    }

    const textContent = {
      body: `Watcher Alert!`,
      to: phoneNumber,
      from: twilioNumber,
    };

    try {
      await client.messages.create(textContent);
    } catch (e: unknown) {
      console.log(e);
    }
  }
};
