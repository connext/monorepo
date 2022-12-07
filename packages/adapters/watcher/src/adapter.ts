import { jsonifyError, RequestContext } from "@connext/nxtp-utils";

import { alertViaDiscord, alertViaPagerDuty, alertViaSms, alertViaTelegram } from "./alert";
import { Pauser } from "./pause";
import { Verifier, VerifierContext, AssetInfo, Report, PauseResponse, VerifyResponse, WatcherConfig } from "./types";
import { AssetVerifier } from "./verifiers";

// Aggregation class for interfacing with all adapter functionality.
export class WatcherAdapter {
  private readonly verifiers: Verifier[];
  private readonly pauser: Pauser;

  constructor(context: VerifierContext, assets: AssetInfo[]) {
    // Should set all applicable verifiers here!
    this.verifiers = [new AssetVerifier(context, assets)];
    this.pauser = new Pauser(context);
  }

  // TODO: Return invariant check value and let consumer decide whether to pause, or immediately try to pause?
  public async checkInvariants(requestContext: RequestContext): Promise<VerifyResponse> {
    for (const verifier of this.verifiers) {
      const result = await verifier.checkInvariant(requestContext);
      if (result.needsPause) {
        return result;
      }
    }
    return {
      needsPause: false,
    };
  }

  public async pause(_requestContext: RequestContext, reason: string, domains: string[]): Promise<PauseResponse[]> {
    // TODO: Check to make sure domains are subset of what was provided in VerifierContext in constructor...?
    return await this.pauser.pause(reason, domains);
  }

  public async alert(report: Report, config: WatcherConfig): Promise<void> {
    const { requestContext, methodContext, logger } = report;
    logger.info("alert: Attempt to alert", requestContext, methodContext, report);

    const {
      discordHookUrl,
      pagerDutyRoutingKey,
      twilioNumber,
      twilioAccountSid,
      twilioAuthToken,
      twilioToPhoneNumbers,
      telegramApiKey,
      telegramChatId,
    } = config;

    const errors = [];
    // attempt to alert via discord
    try {
      await alertViaDiscord(report, discordHookUrl);
    } catch (e: unknown) {
      logger.error("alert: failed to alert via discord", requestContext, methodContext, jsonifyError(e as Error));
      errors.push(e);
    }

    // attempt to alert via pager duty
    try {
      await alertViaPagerDuty(report, pagerDutyRoutingKey);
    } catch (e: unknown) {
      logger.error("alert: failed to alert via pager duty", requestContext, methodContext, jsonifyError(e as Error));
      errors.push(e);
    }

    // attempt to alert via sms (twilio service)
    try {
      await alertViaSms(report, twilioAccountSid, twilioAuthToken, twilioNumber, twilioToPhoneNumbers);
    } catch (e: unknown) {
      logger.error("alert: failed to alert via sms", requestContext, methodContext, jsonifyError(e as Error));
      errors.push(e);
    }

    // attempt to alert via telegram
    try {
      await alertViaTelegram(report, config);
    } catch (e: unknown) {
      logger.error("alert: failed to alert via telegram", requestContext, methodContext, jsonifyError(e as Error));
      errors.push(e);
    }

    if (errors.length) {
      throw errors;
    }
  }
}
