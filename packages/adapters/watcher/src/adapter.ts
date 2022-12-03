import { RequestContext } from "@connext/nxtp-utils";

import { alertViaDiscord, alertViaPagerDuty, alertViaSms, alertViaTelegram } from "./alert";
import { Pauser } from "./pause";
import { Verifier, VerifierContext, AssetInfo, Report, ReportEventType } from "./types";
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
  public async checkInvariants(requestContext: RequestContext): Promise<boolean> {
    for (const verifier of this.verifiers) {
      const result = await verifier.checkInvariant(requestContext);
      if (!result) {
        return false;
      }
    }
    return true;
  }

  public async pause(_requestContext: RequestContext, reason: string, domains: string[]): Promise<boolean[]> {
    // TODO: Check to make sure domains are subset of what was provided in VerifierContext in constructor...?
    return await this.pauser.pause(reason, domains);
  }

  public async alert(_requestContext: RequestContext, event: ReportEventType, report: Report): Promise<void> {
    // TODO: Log attempt to alert.
    await alertViaDiscord(report);
    await alertViaPagerDuty(report);
    await alertViaSms(report);
    await alertViaTelegram(report);
  }
}
