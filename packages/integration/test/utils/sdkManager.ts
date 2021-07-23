import { CrossChainParams } from "@connext/nxtp-sdk";
import { delay, getRandomBytes32 } from "@connext/nxtp-utils";

import { OnchainAccountManager } from "./accountManager";
import { SdkAgent, SdkAgentEvents } from "./sdkAgent";

export type TransactionInfo = {
  start: number;
  end?: number;
  error?: string;
};

/**
 * @classdesc Manages multiple sdk agent instances. Ensures they are all funded onchain
 */
// TODO:
// - better logging (use pino)
// - setup cyclical transfers
// - better config setup
// - metrics?
export class SdkManager {
  public readonly transactionInfo: { [transactionId: string]: TransactionInfo } = {};

  private constructor(private readonly onchainMgmt: OnchainAccountManager, private readonly agents: SdkAgent[]) {}

  static async connect(mnemonic: string, numberUsers: number, natsUrl?: string, authUrl?: string): Promise<SdkManager> {
    // Create onchain account manager with given number of wallets
    const onchain = new OnchainAccountManager(mnemonic, numberUsers);
    await onchain.init(numberUsers);

    // Create sdk agents
    const agents = await Promise.all(
      Array(numberUsers)
        .fill(0)
        .map((_, idx) => {
          return SdkAgent.connect(onchain.chainProviders, onchain.wallets[idx], natsUrl, authUrl);
        }),
    );

    // Create manager
    const manager = new SdkManager(onchain, agents);

    // Setup manager listeners
    manager.setupTransferListeners();

    return manager;
  }

  /**
   * Tracks the transfer status for each of the agents
   */
  setupTransferListeners(): void {
    // Setup listeners to track transfer statuses
    this.agents.forEach((agent) => {
      agent.attach(SdkAgentEvents.TransactionCompleted, (data) => {
        this.transactionInfo[data.transactionId] = {
          ...(this.transactionInfo[data.transactionId] ?? {}),
          end: data.timestamp,
          error: data.error,
        };
      });
    });
  }

  /**
   * Will resolve once the entire transfer is completed with the summary.
   *
   * Just performs a simple transfer to itself across chains, or errors if timeout is passed.
   */
  async transfer(
    params: Omit<CrossChainParams, "receivingAddress" | "expiry">,
    timeout: number,
    _agent: SdkAgent,
  ): Promise<TransactionInfo> {
    const agent = _agent ?? this.getRandomAgent();

    const transactionId = getRandomBytes32();
    const promise = agent.waitFor(SdkAgentEvents.TransactionCompleted, timeout);
    // TODO: better param handling
    this.transactionInfo[transactionId] = { start: Date.now() };
    await agent.initiateCrosschainTransfer({
      transactionId,
      receivingAddress: agent.address,
      ...params,
    });
    await promise;

    // Wait for small offset for events from agent to propagate to internal
    // class storage
    await delay(500);

    return this.transactionInfo[transactionId];
  }

  /**
   * Chooses an sdk agent at random
   *
   * @param excluding - (optional) Agent to exclude from selection
   * @returns SdkAgent
   */
  public getRandomAgent(excluding: SdkAgent[] = []): SdkAgent {
    const filtered = this.agents.filter((n) => {
      const addrs = excluding.map((e) => e.address);
      return !addrs.includes(n.address);
    });
    if (filtered.length === 0) {
      throw new Error("Failed to get random agent");
    }
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  /**
   * Prints summary information about transactions
   */
  public printTransferSummary(): void {
    const times = Object.entries(this.transactionInfo)
      .map(([_transactionId, transfer]) => {
        if (!transfer.end) {
          return undefined;
        }
        return transfer.end - transfer.start;
      })
      .filter((x) => !!x) as number[];
    const total = times.reduce((a, b) => a + b, 0);
    const average = total / times.length;
    const longest = times.sort((a, b) => b - a)[0];
    const shortest = times.sort((a, b) => a - b)[0];
    const errored = Object.entries(this.transactionInfo)
      .map(([_transactionId, transfer]) => {
        if (transfer.error) {
          return transfer.error;
        }
        return undefined;
      })
      .filter((x) => !!x);
    console.log(
      {
        errors: errored,
        agents: this.agents.length,
        average,
        longest,
        shortest,
        created: Object.entries(this.transactionInfo).length,
        completed: times.length,
        failed: errored.length,
      },
      "Transfer summary",
    );
  }
}
