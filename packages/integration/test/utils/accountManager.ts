import { BigNumber, constants, utils, Wallet } from "ethers";
import PriorityQueue from "p-queue";

import { getOnchainBalance, sendGift } from "./chain";
import { ChainConfig } from "./config";

// TODO: make per-chain
const funderQueue = new PriorityQueue({ concurrency: 1 });

export class OnchainAccountManager {
  USER_MIN_ETH = utils.parseEther("0.2");
  USER_MIN_TOKEN = utils.parseEther("1000000");

  public readonly wallets: Wallet[] = [];
  walletsWSufficientBalance: number[] = [];

  public readonly funder: Wallet;

  constructor(public readonly chainProviders: ChainConfig, mnemonic: string, public readonly num_users: number) {
    this.funder = Wallet.fromMnemonic(mnemonic);
    for (let i = 0; i < num_users; i++) {
      const newWallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i + 1}`);
      if (newWallet) {
        this.wallets.push(newWallet);
      }
    }
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
    //not sending native token
    if (assetId !== constants.AddressZero) {
      const initial = await getOnchainBalance(assetId, account, provider);
      if (initial.gte(this.USER_MIN_TOKEN)) {
        console.log(`No need to top up token balance of ${account}`);
        return initial;
      }
      //no need to check if sugar daddy has balance we just mint directly to them
      const receipt = await funderQueue.add(() =>
        sendGift(assetId, this.USER_MIN_TOKEN.mul("2").toString(), account, this.funder.connect(provider)),
      );
      console.log(`Sent token ${assetId} to topup: ${account},  txHash: ${receipt.transactionHash}`);
      const final = await getOnchainBalance(assetId, account, provider);
      return final;
    } else {
      const initial = await getOnchainBalance(assetId, account, provider);
      if (initial.gte(this.USER_MIN_ETH)) {
        console.log(`No need to top up eth balance of ${account}`);
        return initial;
      }

      const remainder = this.USER_MIN_ETH.sub(initial);
      const funderBalance = await getOnchainBalance(assetId, this.funder.address, provider);
      if (funderBalance.lt(remainder)) {
        throw new Error(
          `${
            this.funder.address
          } has insufficient funds to top up. Has ${funderBalance.toString()}, needs ${remainder.toString()}`,
        );
      }

      // fund with sugardaddy
      const receipt = await funderQueue.add(() =>
        sendGift(assetId, remainder.toString(), account, this.funder.connect(provider)),
      );

      console.log(`Sent ${assetId} to topup: ${account},  txHash: ${receipt.transactionHash}`);
      // confirm balance
      const final = await getOnchainBalance(assetId, account, provider);
      return final;
    }
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
