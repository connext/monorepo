import { config } from "dotenv";
import commandLineArgs from "command-line-args";
import { providers, utils, Wallet } from "ethers";
import { HttpNetworkUserConfig } from "hardhat/types";

import { hardhatNetworks } from "../../config";
import { delay, domainToChainId } from "../../domain";

import { NetworkStack, MAX_PERIOD, MIN_PERIOD, SUPPORTED_DOMAINS, getDeployments, MIN_WALLET_GAS } from "./helpers";

config();

export const optionDefinitions: commandLineArgs.OptionDefinition[] = [
  { name: "env", type: String },
  { name: "domains", type: String, multiple: true },
  { name: "period", type: Number, defaultValue: 172_800_000 }, // default 48h
];

export const wouldYouLikeToPlayAGame = async () => {
  let cmdArgs: any;
  try {
    cmdArgs = commandLineArgs(optionDefinitions);
  } catch (err: any) {
    throw new Error(`Parsing arguments failed, cmdArgs: ${process.argv}`);
  }

  /// MARK - Validate command line arguments
  // validate env
  const { env, domains: _domains, period } = cmdArgs;
  if (!["staging"].includes(env as string)) {
    throw new Error(`Firedrill should be run on staging, env: ${env}`);
  }

  // validate domains
  const domains = (_domains ?? SUPPORTED_DOMAINS[env]) as string[];
  for (const domain of domains) {
    if (!SUPPORTED_DOMAINS[env].includes(domain)) {
      throw new Error(`Unsupported domain parsed!, domain: ${domain}, supported: ${SUPPORTED_DOMAINS[env]}`);
    }
  }

  // validate period
  if (period < MIN_PERIOD || period > MAX_PERIOD) {
    throw new Error(`Period is outside of boundary, must be between 5m and 1w: ${period}`);
  }

  /// MARK - Deployer
  // Get deployer mnemonic, which should be provided in env if not in the config.
  const mnemonic = process.env.DEPLOYER || process.env.DEPLOYER_MNEMONIC || process.env.MNEMONIC;
  if (!mnemonic) {
    throw new Error(
      "Deployer mnemonic was not specified. Please specify `deployer` in the config file, " +
        "or set DEPLOYER or DEPLOYER_MNEMONIC in env.",
    );
  }
  // Convert deployer from mnemonic to Wallet.
  const deployer = Wallet.fromMnemonic(mnemonic);

  const networks: NetworkStack[] = [];
  const filteredHardhatNetworks = Object.values(hardhatNetworks).filter(
    (hardhatNetwork) =>
      Object.keys(hardhatNetwork as object).includes("chainId") &&
      Object.keys(hardhatNetwork as object).includes("url"),
  );

  // Get deployments for each domain if not specified in the config.
  // NOTE: will error if cannot find BigBroERC20
  for (const domain of domains) {
    const chainId = domainToChainId(+domain);

    const chainConfig = Object.values(filteredHardhatNetworks).find(
      (networkConfig: any) => networkConfig["chainId"] == chainId,
    ) as HttpNetworkUserConfig;

    if (!chainConfig || !chainConfig.url) {
      throw new Error(`Not configured network for chainId: ${chainId} in hardhat config`);
    }

    const rpc = new providers.JsonRpcProvider(chainConfig.url);

    // ensure deployer has funds
    const balance = await deployer.connect(rpc).getBalance();
    if (balance.lt(MIN_WALLET_GAS)) {
      throw new Error(
        `Deployer (${deployer.address}) needs more funds on ${chainId}. Has: ${utils.formatEther(
          balance,
        )}; Needs: ${utils.formatEther(MIN_WALLET_GAS)}`,
      );
    }

    const deployments = getDeployments({
      deployer,
      chainInfo: { chain: chainId.toString(), rpc },
    });

    networks.push({
      chain: chainId.toString(),
      domain,
      rpc,
      deployments,
    });
  }

  /// MARK - mint big bro token
  // randomly select network (hub excluded by supported domains check)
  const idx = Math.floor(Math.random() * networks.length);
  const {
    deployments: {
      WatcherToken: { contract },
    },
  } = networks[idx];

  // create callback
  const mint = async () => {
    console.log(`sending mint tx to: ${contract.address}`);
    const mintTx = await contract.mint(deployer.address, utils.parseEther("1"));
    console.log(`submitted mint tx to: ${contract.address}: ${mintTx.hash}`);
    const receipt = await mintTx.wait();
    console.log(`mined mint tx: ${receipt.transactionHash}`);
  };

  // randomly select timeout
  const timeout = Math.ceil(Math.random() * period);

  // initiate test
  console.log(`watcher alert timeout set...`);
  console.log(`gl....`);
  await delay(timeout);
  await mint();
};
