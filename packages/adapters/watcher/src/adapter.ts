import { createLoggingContext, jsonifyError, RequestContext, domainToChainId } from "@connext/nxtp-utils";

import { alertViaBetterUptime, alertViaDiscord, alertViaPagerDuty, alertViaSms, alertViaTelegram } from "./alert";
import { Pauser } from "./pause";
import {
  Verifier,
  VerifierContext,
  AssetInfo,
  Report,
  PauseResponse,
  WatcherAlertsConfig,
  WatcherInvariantResponse,
  ValidateResponse,
} from "./types";
import { AssetVerifier } from "./verifiers";

// Aggregation class for interfacing with all adapter functionality.
export class WatcherAdapter {
  private readonly verifiers: Verifier[];
  private readonly pauser: Pauser;
  private readonly context: VerifierContext;

  // transactions sent to connext within the polling interval. cleared after
  // each time `checkInvariants` is called
  private readonly latestTransactions: Record<string, string[]> = {};

  // this is set when `checkInvariants` determines that the system needs to be
  // paused. will hold all transactions between checks that have gone to
  // connext
  private transactionSnapshot: Record<string, string[]> | undefined;

  constructor(context: VerifierContext, assets: AssetInfo[]) {
    this.context = context;
    // Should set all applicable verifiers here!
    this.verifiers = [new AssetVerifier(context, assets)];
    this.pauser = new Pauser(context);
    this.beginRecordingTransactions();
  }

  // TODO: Return invariant check value and let consumer decide whether to pause, or immediately try to pause?
  public async checkInvariants(requestContext: RequestContext): Promise<WatcherInvariantResponse> {
    for (const verifier of this.verifiers) {
      const result = await verifier.checkInvariant(requestContext);
      if (result.needsPause) {
        // store potential offending transactions
        this.recordTransactions();
        this.clearTransactions();
        return { ...result, transactions: this.transactionSnapshot! };
      }
    }
    // if there was no alerting, clear all of the saved transactions
    this.clearTransactions();
    return {
      needsPause: false,
    };
  }

  public async pause(_requestContext: RequestContext, reason: string, domains: string[]): Promise<PauseResponse[]> {
    // TODO: Check to make sure domains are subset of what was provided in VerifierContext in constructor...?
    return await this.pauser.pause(_requestContext, reason, domains);
  }

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

  /**
   * @notice Resets the latest transactions to ensure we only capture
   * ones relevant to intervals of invariant calls
   */
  private clearTransactions(): void {
    this.context.domains.forEach((domain) => {
      this.latestTransactions[domain] = [];
    });
  }

  /**
   * @notice Stores transactions at the first instance of invariant failures
   */
  private recordTransactions(): void {
    if (this.transactionSnapshot) {
      // Do not override, likely already set from previous round of alerting
      return;
    }
    // Store transactions sent to connext in latest interval
    this.transactionSnapshot = { ...this.latestTransactions };
  }

  /**
   * @notice Kicks off a listener to log any transaction hash that has been sent to connext
   * between the `checkInvariant` calls. This allows us to log any transactions that may
   * have caused the invariant failure immediately.
   */
  private beginRecordingTransactions(): void {
    // clear out all the existing transactions. also ensures an array will always be present
    this.clearTransactions();
    // start listeners for each transaction
    this.context.domains.forEach((_domain) => {
      const domain = +_domain;
      const chain = domainToChainId(domain);
      const provider = this.context.txservice.getProvider(domain);
      // FIXME: the only way to access events is by using the fallback provider, which
      // will soon be deprecated
      const { address: connext } = this.verifiers[0].getConnextDeployment(chain);
      provider.fallbackProvider.on(
        { address: connext.toLowerCase() /*connext.toLowerCase()*/ },
        (data: { transactionHash: string }) => {
          this.latestTransactions[domain].push(data.transactionHash);
        },
      );
    });
  }
}

export class OpModeMonitor {
  public async validateProposal(requestContext: RequestContext): Promise<ValidateResponse> {
    console.log(requestContext);
    return { needsSwitch: false, reason: "" };
  }
  public async switch(requestContext: RequestContext, reason: string): Promise<void> {
    console.log(requestContext, reason);
  }
  public async alert(alert: any, config: any): Promise<void> {
    console.log(alert, config);
  }
}
