import { jsonifyError, Logger } from "@connext/nxtp-utils";
import { BigNumber, constants, providers, utils, Wallet } from "ethers";
import PriorityQueue from "p-queue";

import { getDecimals, getOnchainBalance, sendGift } from "./chain";
import { ChainConfig } from "./config";

// const MINIMUM_FUNDING_MULTIPLE = 2;
// const USER_MIN_ETH = utils.parseEther("0.2");
// const USER_MIN_TOKEN = utils.parseEther("1000000");
const NUM_RETRIES = 5;
export class OnchainAccountManager {
  public readonly wallets: Wallet[] = [];
  walletsWSufficientBalance: number[] = [];

  public readonly funder: Wallet;

  private readonly funderQueues: Map<number, PriorityQueue> = new Map();

  private readonly funderNonces: Map<number, number> = new Map();

  private cachedDecimals: Record<string, number> = {};

  constructor(
    public readonly chainProviders: ChainConfig,
    mnemonic: string,
    public readonly num_users: number,
    private readonly log: Logger,
    public readonly MINIMUM_ETH_FUNDING_MULTIPLE = 1,
    public readonly MINIMUM_TOKEN_FUNDING_MULTIPLE = 5,
    private readonly USER_MIN_ETH = utils.parseEther("0.001"),
    private readonly USER_MIN_TOKEN = "0.001",
  ) {
    this.funder = Wallet.fromMnemonic(mnemonic);
    for (let i = 0; i < num_users; i++) {
      const newWallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i + 1}`);
      if (newWallet) {
        this.wallets.push(newWallet);
      }
    }

    // Create chain-by-chain funder queues
    Object.keys(chainProviders).map((chain) => {
      this.funderQueues.set(parseInt(chain), new PriorityQueue({ concurrency: 1 }));
    });
  }

  async updateBalances(chainId: number, assetId: string = constants.AddressZero): Promise<BigNumber[]> {
    const wallets = this.getCanonicalWallets(this.num_users);
    const resultBalances: BigNumber[] = [];

    const { provider } = this.chainProviders[chainId];
    if (!provider) {
      throw new Error(`Provider not configured for ${chainId}`);
    }

    const funder = this.funder.connect(provider);

    // Calculate amount of liquidity required for tests.
    try {
      const decimals = this.cachedDecimals[assetId] ? this.cachedDecimals[assetId] : await getDecimals(assetId, funder);
      this.cachedDecimals[assetId] = decimals;
    } catch (e) {
      this.log.error("Failed to get decimals!", undefined, undefined, jsonifyError(e), { chainId, assetId });
    }

    await Promise.all(
      wallets.map(async (wallet) => {
        const res = await this.verifyAndReupAccountBalance(wallet.address, chainId, assetId);
        return resultBalances.push(res);
      }),
    );
    return resultBalances;
  }

  async verifyAndReupAccountBalance(account: string, chainId: number, assetId: string): Promise<BigNumber> {
    const { provider } = this.chainProviders[chainId];
    if (!provider) {
      throw new Error(`Provider not configured for ${chainId}`);
    }

    const funderQueue = this.funderQueues.get(chainId);
    if (!funderQueue) {
      throw new Error(`No queue found for ${chainId}`);
    }

    const funder = this.funder.connect(provider);

    const decimals = this.cachedDecimals[assetId] ? this.cachedDecimals[assetId] : await getDecimals(assetId, funder);
    this.cachedDecimals[assetId] = decimals;

    const isToken = assetId !== constants.AddressZero;
    const floor = isToken ? utils.parseUnits(this.USER_MIN_TOKEN, decimals) : this.USER_MIN_ETH;
    const initial = await getOnchainBalance(assetId, account, provider);
    if (initial.gte(floor)) {
      this.log.info("No need for top up", undefined, undefined, { assetId, account, chainId });
      return initial;
    }

    const toSend = isToken
      ? floor.mul(this.MINIMUM_TOKEN_FUNDING_MULTIPLE)
      : floor.sub(initial).mul(this.MINIMUM_ETH_FUNDING_MULTIPLE);

    // Check balance before sending
    const funderBalance = await getOnchainBalance(assetId, this.funder.address, provider);
    if (funderBalance.lt(toSend)) {
      throw new Error(
        `${this.funder.address} has insufficient funds of ${assetId} to top up. Has ${utils.formatEther(
          funderBalance,
        )}, needs ${utils.formatEther(toSend)}`,
      );
    }

    const connectedFunder = this.funder.connect(provider);
    if (!this.funderNonces.get(chainId)) {
      this.funderNonces.set(chainId, await connectedFunder.getTransactionCount("pending"));
    }

    // send gift
    const _response = await funderQueue.add<Promise<{ value?: providers.TransactionResponse; error?: Error }>>(
      async (): Promise<{ value?: providers.TransactionResponse; error?: Error }> => {
        let response: providers.TransactionResponse | undefined = undefined;
        const errors: Error[] = [];
        for (let i = 0; i < NUM_RETRIES; i++) {
          try {
            const accountBalance = await getOnchainBalance(assetId, account, provider);
            if (accountBalance.gte(toSend)) {
              this.log.info("Account has sufficient balance", undefined, undefined, { account, assetId, chainId });
              return { value: response, error: undefined };
            }
            response = await sendGift(
              assetId,
              toSend.toString(),
              account,
              connectedFunder,
              this.funderNonces.get(chainId),
            );
            break;
          } catch (e) {
            errors.push(e);
          }
        }
        if (response) {
          this.funderNonces.set(chainId, response.nonce + 1);
        }
        return {
          value: response,
          error: !response
            ? new Error(
                `(${chainId}) Failed to send gift to ${account} after ${errors.length} attempts: ${errors[0].message}`,
              )
            : undefined,
        };
      },
    );

    if (!_response.value) {
      if (_response.error) {
        throw _response.error;
      }
    } else {
      const response = _response.value;
      this.log.info("Submitted top up", undefined, undefined, { assetId, account, txHash: response.hash });
      const receipt = await response.wait();
      this.log.info("Topped up account", undefined, undefined, { assetId, account, txHash: receipt.transactionHash });
    }

    // confirm balance
    return await provider.getBalance(account);
  }

  getCanonicalWallets(num: number): Wallet[] {
    const wallets: Wallet[] = [];
    for (let i = 0; i < num; i++) {
      if (this.wallets[i]) {
        wallets.push(this.wallets[i]);
      }
    }
    return wallets;
  }

  getRandomWallet(excluding: Wallet[] = []) {
    const addrs = excluding.map((e) => e.address);
    const filtered = this.wallets.filter((n) => {
      return !addrs.includes(n.address);
    });
    if (filtered.length === 0) {
      throw new Error("Failed to get random wallet");
    }
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
}
