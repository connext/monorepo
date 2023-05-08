import { RequestContext, domainToChainId } from "@connext/nxtp-utils";

import { Pauser } from "./pause";
import {
  Verifier,
  VerifierContext,
  AssetInfo,
  Report,
  PauseResponse,
  WatcherAlertsConfig,
  WatcherInvariantResponse,
  SwitchResponse,
  VerifyResponse,
} from "./types";
import { AssetVerifier } from "./verifiers";
import { Switcher } from "./switch";
import { ProposedRootVerifier } from "./verifiers/proposal";
import { Alerter } from "./alert/alerter";
import { providers } from "ethers";

// Aggregation class for interfacing with all adapter functionality.
export class WatcherAdapter {
  private readonly verifiers: Verifier[];
  private readonly alerter: Alerter;
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
    this.verifiers = [new AssetVerifier(context, assets)];
    this.alerter = new Alerter();
    this.pauser = new Pauser(context);
    this.context = context;
    // Should set all applicable verifiers here!
    this.beginRecordingTransactions();
  }

  // TODO: Return invariant check value and let consumer decide whether to pause, or immediately try to pause?
  public async checkInvariants(requestContext: RequestContext): Promise<WatcherInvariantResponse> {
    for (const verifier of this.verifiers) {
      const result = await verifier.checkInvariant(requestContext);
      if (result.needsAction) {
        // store potential offending transactions
        this.recordTransactions();
        this.clearTransactions();
        return { ...result, transactions: this.transactionSnapshot! };
      }
    }
    // if there was no alerting, clear all of the saved transactions
    this.clearTransactions();
    return {
      needsAction: false,
    };
  }

  public async pause(requestContext: RequestContext, reason: string, domains: string[]): Promise<PauseResponse[]> {
    // TODO: Check to make sure domains are subset of what was provided in VerifierContext in constructor...?
    return await this.pauser.pause(requestContext, reason, domains);
  }

  public async alert(report: Report, config: WatcherAlertsConfig): Promise<void> {
    return await this.alerter.alert(report, config);
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
  private readonly alerter: Alerter;
  private readonly hubDomain: number;
  private readonly switcher: Switcher;
  private readonly verifier: ProposedRootVerifier;

  constructor(context: VerifierContext, hubDomain: number, hubProvider: providers.JsonRpcProvider) {
    this.alerter = new Alerter();
    this.switcher = new Switcher(context);
    this.verifier = new ProposedRootVerifier(context, hubDomain, hubProvider);
    this.hubDomain = hubDomain;
  }

  public async validateProposal(requestContext: RequestContext): Promise<VerifyResponse> {
    // This is redundant but we keep it to be consistent with flow
    return await this.verifier.checkInvariant(requestContext);
  }

  public async switch(requestContext: RequestContext, reason: string): Promise<SwitchResponse> {
    // This is redundant but we keep it to be consistent with flow
    return await this.switcher.switch(requestContext, reason, this.hubDomain);
  }

  public async alert(report: Report, config: WatcherAlertsConfig): Promise<void> {
    return await this.alerter.alert(report, config);
  }
}
