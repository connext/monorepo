import { createLoggingContext, jsonifyError } from "@connext/nxtp-utils";
import { Report, WatcherAlertsConfig } from "../types";
import { alertViaDiscord } from "./discord";
import { alertViaPagerDuty } from "./pagerduty";
import { alertViaSms } from "./sms";
import { alertViaTelegram } from "./telegram";
import { alertViaBetterUptime } from "./betteruptime";

export class Alerter {
  public async alert(report: Report, config: WatcherAlertsConfig): Promise<void> {
    const { requestContext, logger, ...res } = report;
    const { methodContext } = createLoggingContext(this.alert.name);
    const {
      discordHookUrl,
      pagerDutyRoutingKey,
      twilioNumber,
      twilioAccountSid,
      twilioAuthToken,
      twilioToPhoneNumbers,
      telegramApiKey,
      telegramChatId,
      betterUptimeApiKey,
      betterUptimeRequesterEmail,
    } = config;

    const discordAlert = !!discordHookUrl;
    const pagerDutyAlert = !!pagerDutyRoutingKey;
    const smsAlert = !!(twilioAccountSid && twilioAuthToken && twilioNumber && twilioToPhoneNumbers?.length);
    const telegramAlert = telegramApiKey && telegramChatId;
    const betterUptimeAlert = !!(betterUptimeApiKey && betterUptimeRequesterEmail);
    logger.info("alert: Attempt to alert", requestContext, methodContext, {
      report: res,
      alerts: {
        discord: discordAlert,
        pagerDuty: pagerDutyAlert,
        sms: smsAlert,
        telegram: telegramAlert,
        betterUptime: betterUptimeAlert,
      },
    });

    const errors = await Promise.all([
      // attempt to alert via discord
      (async () => {
        if (discordAlert) {
          try {
            await alertViaDiscord(report, discordHookUrl);
          } catch (e: unknown) {
            logger.error("alert: failed to alert via discord", requestContext, methodContext, jsonifyError(e as Error));
            return e;
          }
        }
      })(),
      // attempt to alert via pager duty
      (async () => {
        if (pagerDutyAlert) {
          try {
            await alertViaPagerDuty(report, pagerDutyRoutingKey);
          } catch (e: unknown) {
            logger.error(
              "alert: failed to alert via pager duty",
              requestContext,
              methodContext,
              jsonifyError(e as Error),
            );
            return e;
          }
        }
      })(),
      // attempt to alert via sms (twilio service)
      (async () => {
        if (smsAlert) {
          try {
            await alertViaSms(report, twilioAccountSid, twilioAuthToken, twilioNumber, twilioToPhoneNumbers);
          } catch (e: unknown) {
            logger.error("alert: failed to alert via sms", requestContext, methodContext, jsonifyError(e as Error));
            return e;
          }
        }
      })(),
      // attempt to alert via telegram
      (async () => {
        if (telegramAlert) {
          try {
            await alertViaTelegram(report, telegramApiKey, telegramChatId);
          } catch (e: unknown) {
            logger.error(
              "alert: failed to alert via telegram",
              requestContext,
              methodContext,
              jsonifyError(e as Error),
            );
            return e;
          }
        }
      })(),
      // attempt to alert via telegram
      (async () => {
        if (betterUptimeAlert) {
          try {
            await alertViaBetterUptime(report, betterUptimeApiKey, betterUptimeRequesterEmail);
          } catch (e: unknown) {
            logger.error(
              "alert: failed to alert via better uptime",
              requestContext,
              methodContext,
              jsonifyError(e as Error),
            );
            return e;
          }
        }
      })(),
    ]);

    if (errors.filter((x) => !!x).length > 0) {
      throw errors;
    }
  }
}
