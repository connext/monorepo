import { delay, ERC20Abi, XCallArgs } from "@connext/nxtp-utils";
import { constants, providers, utils, Wallet, BigNumber } from "ethers";
import { NxtpSdkBase } from "@connext/nxtp-sdk";

import { DomainInfo } from "../../constants/testnet";
import { OperationContext } from "../utils";
import { DEPLOYER_WALLET, PARAMETERS } from "../../constants/local";

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

export const microFunding = async (input: {
  accounts: Wallet[];
  sugarDaddy: Wallet;
  assetId: string;
  providerURL: string;
  amount: BigNumber;
}): Promise<void> => {
  const { accounts, sugarDaddy, assetId, providerURL, amount } = input;

  // const { config } = domain;

  // const balance = await getBalance(context, { account: sugarDaddy, assetId, domain });
  // console.log("Balance", balance);

  const testERC20 = new utils.Interface(ERC20Abi);
  const provider = new providers.JsonRpcProvider(providerURL);

  for (const account of accounts) {
    try {
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
    } catch (e: any) {
      console.log(e);
    }
  }
};

export const prepareTx = async (wallet: Wallet): Promise<providers.TransactionRequest> => {
  const sdkConfig = {
    chains: {
      [PARAMETERS.A.DOMAIN]: {
        assets: [{ address: PARAMETERS.ASSET.address, name: PARAMETERS.ASSET.name, symbol: PARAMETERS.ASSET.symbol }],
        providers: PARAMETERS.A.RPC,
        deployments: {
          connext: PARAMETERS.A.DEPLOYMENTS.ConnextHandler,
          tokenRegistry: PARAMETERS.A.DEPLOYMENTS.TokenRegistry,
          stableSwap: constants.AddressZero,
        },
      },
      [PARAMETERS.B.DOMAIN]: {
        assets: [{ address: PARAMETERS.ASSET.address, name: PARAMETERS.ASSET.name, symbol: PARAMETERS.ASSET.symbol }],
        providers: PARAMETERS.B.RPC,
        deployments: {
          connext: PARAMETERS.B.DEPLOYMENTS.ConnextHandler,
          tokenRegistry: PARAMETERS.B.DEPLOYMENTS.TokenRegistry,
          stableSwap: constants.AddressZero,
        },
      },
    },
    cartographerUrl: PARAMETERS.AGENTS.CARTOGRAPHER.url,
    environment: PARAMETERS.ENVIRONMENT as "production" | "staging",
    signerAddress: wallet.address,
  };
  const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
  await originProvider.send("evm_setAutomine", [false]);
  await originProvider.send("hardhat_setBalance", [PARAMETERS.AGENTS.USER.address, "0x84595161401484A000000"]);
  const destinationProvider = new providers.JsonRpcProvider(PARAMETERS.B.RPC[0]);
  await destinationProvider.send("evm_setAutomine", [false]);
  await destinationProvider.send("hardhat_setBalance", [PARAMETERS.AGENTS.USER.address, "0x84595161401484A000000"]);
  const sdkBase = await NxtpSdkBase.create(sdkConfig);
  const xcallData: XCallArgs = {
    transactingAmount: "1000",
    params: {
      to: wallet.address,
      originDomain: PARAMETERS.A.DOMAIN,
      destinationDomain: PARAMETERS.B.DOMAIN,
      agent: constants.AddressZero,
      callback: constants.AddressZero,
      callbackFee: "0",
      callData: "0x",
      forceSlow: false,
      receiveLocal: false,
      recovery: wallet.address,
      relayerFee: "0",
      destinationMinOut: "0",
    },
    transactingAsset: PARAMETERS.ASSET.address,
    originMinOut: "0",
  };
  return sdkBase.xcall(xcallData);
};

export const concurrentCalls = async (input: {
  accounts: Wallet[];
  providerURL: string;
}): Promise<providers.TransactionReceipt[]> => {
  const { accounts, providerURL } = input;
  // const { config } = domain;

  const provider = new providers.JsonRpcProvider(providerURL);

  const txReceipts: providers.TransactionReceipt[] = [];
  await Promise.all(
    accounts.map(async (account: Wallet) => {
      const tx = await prepareTx(account);
      tx.gasLimit = 10000000;
      tx.gasPrice = 50000;

      const txRes = await account.connect(provider).sendTransaction(tx);

      txReceipts.push(await txRes.wait());
    }),
  );

  return txReceipts;
};

export const run = async () => {
  const USER_MNEMONIC = Wallet.createRandom()._mnemonic().phrase;
  const wallets: Wallet[] = await createAccountsFromMnemonic({ mnemonic: USER_MNEMONIC, numberOfWallets: 10 });

  const inputToken = {
    accounts: wallets,
    sugarDaddy: DEPLOYER_WALLET,
    assetId: "0x1411CB266FCEd1587b0AA29E9d5a9Ef3Db64A9C5",
    providerURL: "http://localhost:8547",
    amount: BigNumber.from("1000000000000000"),
  };
  const inputEth = {
    accounts: wallets,
    sugarDaddy: DEPLOYER_WALLET,
    assetId: constants.AddressZero,
    providerURL: "http://localhost:8547",
    amount: BigNumber.from("1000000000000000"),
  };

  console.log("Funding");
  await microFunding(inputEth);
  console.log("Funded ETH");
  await microFunding(inputToken);
  console.log("Funded");
  await concurrentCalls({ accounts: wallets, providerURL: inputToken.providerURL });
};

// TODO: Hook this into parent *.spec.ts parent script to run
// run();
