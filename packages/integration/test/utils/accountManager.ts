import { BigNumber, constants, Contract, providers, utils, Wallet } from "ethers";

export class OnchainAccountManager {
  public chainProviders = {
    4: new providers.FallbackProvider([
      new providers.JsonRpcProvider("https://rinkeby.infura.io/v3/06a5f5f50dcb49da9b57f0647fde2082"),
    ]),
    5: new providers.FallbackProvider([
      new providers.JsonRpcProvider("https://goerli.infura.io/v3/06a5f5f50dcb49da9b57f0647fde2082"),
    ]),
  };

  USER_MIN_ETH = utils.parseEther("0.2");

  public readonly wallets: Wallet[] = [];
  walletsWSufficientBalance: number[] = [];

  constructor(mnemonic: string, num_users: number) {
    for (let i = 0; i < num_users; i++) {
      const newWallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`);
      if (newWallet) {
        this.wallets.push(newWallet);
      }
    }
  }

  async init(num_wallets: number): Promise<BigNumber[]> {
    const wallets = this.getCanonicalWallets(num_wallets);
    const resultBalances: BigNumber[] = [];

      await Promise.all(
      wallets.map(async (wallet) => {
        const res = await this.verifyAndReupAccountBalance(wallet.address);
        return resultBalances.push(res);
      })
      );
    return resultBalances;

  }

  async verifyAndReupAccountBalance(account: string): Promise<BigNumber> {

    let bal = await this.chainProviders["4"].getBalance(account);

    if (bal && bal.lt(this.USER_MIN_ETH)) {
      const remainder = this.USER_MIN_ETH.sub(bal);
      //fund with sugardaddy
      const tx = await this.wallets[0]
        .connect(this.chainProviders[4])
        .sendTransaction({ to: account, value: remainder });
      const receipt = await tx.wait();
      console.log(`Sent ETH to topup: ${account},  txHash: ${receipt.transactionHash}`);
      //confirm balance
      bal = await this.chainProviders["4"].getBalance(account);
    }
    return bal;
  }

  getCanonicalWallets(num: number): Wallet[]  {
    const wallets: Wallet[] = [];
    for (let i = 0; i < num; i++) {
      if (this.wallets[i]) {
        wallets.push(this.wallets[i]);
      }
    }
      return wallets;
  }
}
