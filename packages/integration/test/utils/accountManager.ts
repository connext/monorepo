import { BigNumber, constants, utils, Wallet } from "ethers";
import PriorityQueue from "p-queue";
import { BaseLogger } from "pino";

import { getOnchainBalance, sendGift } from "./chain";
import { ChainConfig } from "./config";

const MINIMUM_FUNDING_MULTIPLE = 2;
const USER_MIN_ETH = utils.parseEther("0.2");
const USER_MIN_TOKEN = utils.parseEther("1000000");

export class OnchainAccountManager {
  public readonly wallets: Wallet[] = [];
  walletsWSufficientBalance: number[] = [];

  public readonly funder: Wallet;

  private readonly funderQueues: Map<number, PriorityQueue> = new Map();

  constructor(
    public readonly chainProviders: ChainConfig,
    mnemonic: string,
    public readonly num_users: number,
    private readonly log: BaseLogger,
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

    const isToken = assetId === constants.AddressZero;
    const floor = isToken ? USER_MIN_TOKEN : USER_MIN_ETH;
    const initial = await getOnchainBalance(assetId, account, provider);
    if (initial.gte(floor)) {
      this.log.info({ assetId, account, chainId }, "No need for top up");
      return initial;
    }

    const toSend = floor.sub(initial).mul(MINIMUM_FUNDING_MULTIPLE);

    if (assetId === constants.AddressZero) {
      // Check balance before sending
      const funderBalance = await getOnchainBalance(assetId, this.funder.address, provider);
      if (funderBalance.lt(toSend)) {
        throw new Error(
          `${
            this.funder.address
          } has insufficient funds to top up. Has ${funderBalance.toString()}, needs ${toSend.toString()}`,
        );
      }
    }

    // send gift
    const response = await funderQueue.add(() => {
      this.log.debug({ assetId, to: account, from: this.funder.address, value: toSend.toString() }, "Sending gift");
      return sendGift(assetId, toSend.toString(), account, this.funder.connect(provider));
    });

    const receipt = await response.wait(1);
    this.log.info({ assetId, account, txHash: receipt.transactionHash }, "Topped up account");
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
