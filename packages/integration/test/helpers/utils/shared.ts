import { delay, ERC20Abi } from "@connext/nxtp-utils";
import { constants, providers, utils, Wallet, BigNumber } from "ethers";

import { DomainInfo } from "../../constants/testnet";

import { OperationContext } from "./utils";

export const pollSomething = async (input: { attempts: number; parity: number; method: () => Promise<any> }) => {
  const { attempts, parity, method } = input;
  for (let i = 0; i < attempts; i++) {
    const result = await method();
    if (result) {
      return result;
    }
    await delay(parity);
  }
};

export const createAccountsFromMnemonic = async (params: {
  mnemonic: string;
  numberOfWallets: number;
}): Promise<Wallet[]> => {
  const { mnemonic, numberOfWallets } = params;
  const defaultHdNode = utils.HDNode.fromMnemonic(mnemonic); // defualt path m/44'/60'/0'/0/0

  const wallets: Wallet[] = [];

  for (let i = 0; i < numberOfWallets; i++) {
    const hdnode = defaultHdNode.derivePath(`m/44'/60'/0'/0/` + String(i));

    wallets.push(new Wallet(hdnode));
  }

  return wallets;
};

export const getBalance = async (
  context: OperationContext,
  input: {
    account: Wallet;
    assetId: string;
    domain: DomainInfo;
  },
): Promise<BigNumber> => {
  const { chainreader } = context;
  const {
    account,
    assetId,
    domain: { chain },
  } = input;

  const address = account.address;

  const result = await chainreader.getBalance(chain, address, assetId, ERC20Abi);
  return result;
};

export const microFunding = async (
  context: OperationContext,
  input: {
    accounts: Wallet[];
    sugarDaddy: Wallet;
    assetId: string;
    domain: DomainInfo;
    amount: BigNumber;
  },
): Promise<void> => {
  const { accounts, sugarDaddy, assetId, domain, amount } = input;

  const { config } = domain;

  const balance = await getBalance(context, { account: sugarDaddy, assetId, domain });
  console.log("Balance", balance);

  const testERC20 = new utils.Interface(ERC20Abi);
  const provider = new providers.JsonRpcProvider(config.providers[0]);

  await Promise.all(
    accounts.map(async (account: Wallet) => {
      if (assetId === constants.AddressZero) {
        sugarDaddy.connect(provider).sendTransaction({
          to: account.address,
          value: amount,
        });
      } else {
        const encoded = testERC20.encodeFunctionData("transfer", [account.address, amount]);

        const txRes = await sugarDaddy.connect(provider).sendTransaction({
          to: assetId,
          data: encoded,
          value: BigNumber.from("0"),
        });

        const txReceipt = await txRes.wait();

        console.log(txReceipt);
      }
    }),
  );
};

export const concurrentCalls = async (
  context: OperationContext,
  input: {
    accounts: Wallet[];
    transactionRequest: providers.TransactionRequest;
    domain: DomainInfo;
  },
): Promise<providers.TransactionReceipt[]> => {
  const { accounts, transactionRequest: txReq, domain } = input;
  const { config } = domain;

  const provider = new providers.JsonRpcProvider(config.providers[0]);

  const txReceipts: providers.TransactionReceipt[] = [];
  await Promise.all(
    accounts.map(async (account: Wallet) => {
      const txRes = await account.connect(provider).sendTransaction(txReq);

      txReceipts.push(await txRes.wait());
    }),
  );

  return txReceipts;
};
