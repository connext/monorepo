import { CrossChainParams } from "@connext/nxtp-sdk";
import { delay, getRandomBytes32, NxtpErrorJson, Logger, jsonifyError } from "@connext/nxtp-utils";

import { OnchainAccountManager } from "./accountManager";
import { ChainConfig } from "./config";
import { SdkAgent, SdkAgentEvents } from "./sdkAgent";

export type TransactionInfo = {
  start: number;
  end?: number;
  error?: NxtpErrorJson;
};

export type TransferSummary = {
  errors: NxtpErrorJson[];
  agents: number;
  average: number;
  longest: number;
  shortest: number;
  created: number;
  completed: number;
  failed: number;
};

/**
 * @classdesc Manages multiple sdk agent instances. Ensures they are all funded onchain
 */
// TODO:
// - better config setup
// - metrics?
export class SdkManager {
  public readonly transactionInfo: { [transactionId: string]: TransactionInfo } = {};

  private constructor(
    private readonly onchainMgmt: OnchainAccountManager,
    private readonly agents: SdkAgent[],
    private readonly log: Logger,
  ) {}

  static async connect(
    chainConfig: ChainConfig,
    mnemonic: string,
    numberUsers: number,
    log: Logger,
    natsUrl?: string,
    authUrl?: string,
    network?: string,
  ): Promise<SdkManager> {
    // Create onchain account manager with given number of wallets
    const onchain = new OnchainAccountManager(
      chainConfig,
      mnemonic,
      numberUsers,
      log.child({ name: "OnchainAccountManager" }),
    );
    // TODO: this will be slow af
    const agents: SdkAgent[] = [];
    for (const chain of Object.keys(chainConfig)) {
      log.debug(`sending native token gift`);
      await onchain.updateBalances(parseInt(chain));

      // await Promise.all(
      //   Object.keys(chainConfig)
      //     .map((c) => parseInt(c))
      //     .map((chain) => onchain.init(numberUsers, chain)),
      // );

      // Create sdk agents
      const _agents = await Promise.all(
        Array(numberUsers)
          .fill(0)
          .map(async (_, idx) => {
            log.debug("Wallet info", undefined, undefined, { idx, address: onchain.wallets[idx].address });
            const agent = await SdkAgent.connect(
              parseInt(chain),
              onchain.chainProviders,
              onchain.wallets[idx],
              log,
              natsUrl,
              authUrl,
              network,
            );

            //sanitize hanging transactions from previous runs.
            // await agent.sanitizeAgentTransactions(onchain.wallets[idx]);

            return agent;
          }),
      );
      agents.push(..._agents);
    }

    // Create manager

    const manager = new SdkManager(onchain, agents, log.child({ name: "SdkManager" }));
    // Setup manager listeners
    manager.setupTransferListeners();
    return manager;
  }

  async giftAgentsOnchain(assetId: string, chainId: number) {
    await this.onchainMgmt.updateBalances(chainId, assetId);
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

    const transactionId = params.transactionId ?? getRandomBytes32();
    const promise = agent.waitFor(SdkAgentEvents.TransactionCompleted, timeout);
    // TODO: better param handling
    this.transactionInfo[transactionId] = { start: Date.now() };
    await agent.initiateCrosschainTransfer({
      transactionId,
      receivingAddress: agent.address,
      ...params,
    });
    try {
      await promise;
    } catch (e) {
      this.log.error("Did not get promise", undefined, undefined, jsonifyError(e), { timeout });
      throw new Error(`Transfer not completed within ${timeout / 1000}s`);
    }

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
    const addrs = excluding.map((e) => e.address);
    const filtered = this.agents.filter((n) => {
      return !addrs.includes(n.address);
    });
    if (filtered.length === 0) {
      throw new Error("Failed to get random agent");
    }
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  /**
   * Starts a cyclical transfer test:
   * - sets each agent into "cyclical transfer" mode, meaning they
   *   will send a transfer *back* to the origin chain once they have
   *   fulfilled a transfer on the destination chain
   * - makes sure each agent is ping-pong-ing transfers back and
   *   forth between each other
   *
   * @param initialParams - The params to start ping-ponging transfers with.
   *
   * Returns a function that will kill the cyclical transfers and stop any new
   * ones from being created
   */
  public async startCyclicalTransfers(
    initialParams: Omit<CrossChainParams, "receivingAddress" | "expiry" | "transactionId">,
  ): Promise<() => void> {
    // NOTE; we initiate all transactions serially because this isnt
    // a concurrency test. But we don't wait for them to complete
    for (const agent of this.agents) {
      agent.establishCyclicalTransfers();

      const transactionId = getRandomBytes32();
      this.transactionInfo[transactionId] = { start: Date.now() };

      await agent.initiateCrosschainTransfer({
        transactionId,
        receivingAddress: agent.address,
        ...initialParams,
      });

    }
 
    const killSwitch = () => {
      this.agents.map((agent) => {
        agent.cancelCyclicalTransfers();
      });
    };

    return killSwitch;
  }

  /**
   * Returns summary information about transactions
   */
  public getTransferSummary(): TransferSummary {
    const times = Object.entries(this.transactionInfo)
      .map(([_transactionId, transfer]) => {
        if (!transfer.end) {
          return undefined;
        }
        return transfer.end - transfer.start;
      })
      .filter((x) => typeof x !== "undefined") as number[];
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
    // Log at error to ensure it is always logged
    const summary = {
      errors: errored as NxtpErrorJson[],
      agents: this.agents.length,
      average,
      longest,
      shortest,
      created: Object.entries(this.transactionInfo).length,
      completed: times.length,
      failed: errored.length,
    };
    return summary;
  }
}
