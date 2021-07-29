import { BigNumber, utils, Wallet } from "ethers";

import { ChainConfig } from "./config";

export class OnchainAccountManager {
  USER_MIN_ETH = utils.parseEther("0.2");

  public readonly wallets: Wallet[] = [];
  walletsWSufficientBalance: number[] = [];

  constructor(public readonly chainProviders: ChainConfig, mnemonic: string, num_users: number) {
    for (let i = 0; i < num_users; i++) {
      const newWallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`);
      if (newWallet) {
        this.wallets.push(newWallet);
      }
    }
  }

  async init(num_wallets: number, chainId: number): Promise<BigNumber[]> {
    const wallets = this.getCanonicalWallets(num_wallets);
    const resultBalances: BigNumber[] = [];

    await Promise.all(
      wallets.map(async (wallet) => {
        const res = await this.verifyAndReupAccountBalance(wallet.address, chainId);
        return resultBalances.push(res);
      }),
    );
    return resultBalances;
  }

  async verifyAndReupAccountBalance(account: string, chainId: number): Promise<BigNumber> {
    const initial = await this.chainProviders[chainId].provider.getBalance(account);
    if (initial.lte(this.USER_MIN_ETH)) {
      return initial;
    }

    const { provider } = this.chainProviders[chainId];
    if (!provider) {
      throw new Error(`Provider not configured for ${chainId}`);
    }

    const remainder = this.USER_MIN_ETH.sub(initial);
    const funderBalance = await provider.getBalance(this.wallets[0].address);
    if (funderBalance.lt(remainder)) {
      throw new Error(
        `${
          this.wallets[0].address
        } has insufficient funds to top up. Has ${funderBalance.toString()}, needs ${remainder.toString()}`,
      );
    }

    // fund with sugardaddy
    const tx = await this.wallets[0].connect(provider).sendTransaction({ to: account, value: remainder });

    const receipt = await tx.wait();
    console.log(`Sent ETH to topup: ${account},  txHash: ${receipt.transactionHash}`);
    //confirm balance
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
}
