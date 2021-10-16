import { Logger } from "@connext/nxtp-utils";
import { BigNumber, constants, providers, utils, Wallet } from "ethers";
import PriorityQueue from "p-queue";

import { getOnchainBalance, sendGift } from "./chain";
import { ChainConfig } from "./config";

// const MINIMUM_FUNDING_MULTIPLE = 2;
// const USER_MIN_ETH = utils.parseEther("0.2");
// const USER_MIN_TOKEN = utils.parseEther("1000000");
const NUM_RETRIES = 20;
export class OnchainAccountManager {
  public readonly wallets: Wallet[] = [];
  walletsWSufficientBalance: number[] = [];

  public readonly funder: Wallet;

  private readonly funderQueues: Map<number, PriorityQueue> = new Map();

  private readonly funderNonces: Map<number, number> = new Map();

  constructor(
    public readonly chainProviders: ChainConfig,
    mnemonic: string,
    public readonly num_users: number,
    private readonly log: Logger,
    public readonly MINIMUM_ETH_FUNDING_MULTIPLE = 1,
    public readonly MINIMUM_TOKEN_FUNDING_MULTIPLE = 5,
    private readonly USER_MIN_ETH = utils.parseEther("0.001"),
    private readonly USER_MIN_TOKEN = utils.parseEther("0.2"),
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

    const isToken = assetId !== constants.AddressZero;
    const floor = isToken ? this.USER_MIN_TOKEN : this.USER_MIN_ETH;
    const initial = await getOnchainBalance(assetId, account, provider);
    if (initial.gte(floor)) {
      this.log.info("No need for top up", undefined, undefined, { assetId, account, chainId });
      return initial;
    }

    const toSend = isToken
      ? floor.mul(this.MINIMUM_TOKEN_FUNDING_MULTIPLE)
      : floor.sub(initial).mul(this.MINIMUM_ETH_FUNDING_MULTIPLE);

    if (!isToken) {
      // Check balance before sending
      const funderBalance = await getOnchainBalance(assetId, this.funder.address, provider);
      if (funderBalance.lt(toSend)) {
        throw new Error(
          `${this.funder.address} has insufficient funds of ${assetId} to top up. Has ${utils.formatEther(
            funderBalance,
          )}, needs ${utils.formatEther(toSend)}`,
        );
      }
    }

    const connectedFunder = this.funder.connect(provider);

    // send gift
    const response = await funderQueue.add(async () => {
      let response: providers.TransactionResponse | undefined = undefined;
      const errors: Error[] = [];
      for (let i = 0; i < NUM_RETRIES; i++) {
        try {
          response = await sendGift(assetId, toSend.toString(), account, connectedFunder, this.funderNonces.get(chainId));
          break;
        } catch (e) {
          errors.push(e);
        }
      }
      if (!response) {
        throw new Error(`Failed to send gift to ${account} after ${errors.length} attempts: ${errors[0].message}`);
      }
      this.funderNonces.set(chainId, response.nonce + 1);
      return response;
    });

    this.log.info("Submitted top up", undefined, undefined, { assetId, account, txHash: response.hash });
    const receipt = await response.wait();
    this.log.info("Topped up account", undefined, undefined, { assetId, account, txHash: receipt.transactionHash });
    // confirm balance
    const final = await provider.getBalance(account);

    return final;
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
