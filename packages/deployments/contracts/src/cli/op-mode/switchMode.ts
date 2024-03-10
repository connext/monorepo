import commandLineArgs from "command-line-args";

import { Wallet } from "ethers";
import { Env, getProviderFromHardhatConfig } from "../..";
import { SUPPORTED_DOMAINS, HUBS, updateIfNeeded } from "../helpers";
import {
  OptimisticEnabledDeployments,
  OptimisticEnabledDeploymentsHub,
  getOptimisticEnabledDeployments,
} from "./helpers";
import { domainToChainId } from "@connext/nxtp-utils";
import { hardhatNetworks } from "../../config";

export const optionDefinitions = [
  { name: "env", type: String, defaultOption: true },
  { name: "network", type: String },
  { name: "apply", type: String, defaultValue: "false" },
  { name: "domains", type: Number, multiple: true },
  { name: "optimistic", type: String, defaultValue: "true" },
];

export const switchMode = async () => {
  let cmdArgs: any;
  try {
    cmdArgs = commandLineArgs(optionDefinitions);
  } catch (err: any) {
    console.error(err);
    throw new Error(`Parsing arguments failed, cmdArgs: ${process.argv}`);
  }

  // get signer
  const privateKey = process.env.PRIVATE_KEY;
  const mnemonic = process.env.DEPLOYER || process.env.DEPLOYER_MNEMONIC || process.env.MNEMONIC;
  if (!mnemonic && !privateKey) {
    throw new Error(
      "Deployer mnemonic was not specified. Please specify `deployer` in the config file, " +
        "or set DEPLOYER or DEPLOYER_MNEMONIC in env.",
    );
  }
  // Convert deployer from mnemonic to Wallet.
  let wallet: Wallet;
  if (privateKey) {
    wallet = new Wallet(privateKey);
  } else {
    wallet = Wallet.fromMnemonic(mnemonic!);
  }

  // get default config values
  const { env: _env, domains: _domains, network: _network, apply: _apply, optimistic: _optimistic } = cmdArgs;
  const apply = _apply === "true";
  const optimistic = _optimistic === "true";
  const env: Env = _env ?? process.env.ENV ?? "staging";
  const network: "testnet" | "mainnet" = _network ?? process.env.NETWORK ?? "testnet";

  // get domains
  const domains: number[] = _domains ?? SUPPORTED_DOMAINS[network];

  console.log("wallet: ", wallet.address);
  console.log("apply:  ", apply);
  console.log("env:    ", env);
  console.log("network:", network);
  console.log("domains:", domains);
  console.log("optimistic:", optimistic);

  // config validation
  if (!["staging", "production"].includes(env as string)) {
    throw new Error(`Environment should be either staging or production, env: ${env}`);
  }

  if (!["testnet", "mainnet"].includes(network as string)) {
    throw new Error(`Network should be either testnet or mainnet, network: ${network}`);
  }

  // pull all optimistic-enabled deployments
  const allDeployments: { [chain: number]: OptimisticEnabledDeployments } = {};
  domains.forEach((domain) => {
    const chain = domainToChainId(domain);
    const config: any = Object.values(hardhatNetworks).find((h: any) => h.chainId === chain);
    if (!config?.url) {
      throw new Error(`No hardhat network config provider found for chain ${chain}`);
    }
    const deployments = getOptimisticEnabledDeployments(
      chain,
      wallet.connect(getProviderFromHardhatConfig(chain)),
      HUBS[network] === domain,
      env,
    );
    allDeployments[chain] = deployments;
  });

  // for each deployment
  // - check mode
  // - if in correct mode, continue
  // - if needs activate op-mode, call "activateOptimisticMode"
  // - if needs activate slow-mode, call "activateSlowMode"
  // - else throw error

  for (const [chain, deployments] of Object.entries(allDeployments)) {
    console.log(`\nActivating ${optimistic ? "optimistic" : "slow"} mode for chain ${chain}...`);
    const schema = {
      apply,
      deployment: deployments.SpokeConnector,
      desired: optimistic,
      read: { method: "optimisticMode" },
      write: { method: optimistic ? "activateOptimisticMode" : "activateSlowMode" },
    };

    // Update SpokeConnector
    console.log(`\tUpdating SpokeConnector (${deployments.SpokeConnector.address})...`);
    await updateIfNeeded(
      optimistic
        ? {
            ...schema,
            auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === wallet.address.toLowerCase() },
          }
        : schema,
    );

    if (!(deployments as OptimisticEnabledDeploymentsHub).RootManager) {
      continue;
    }

    // Update RootManager
    const hub = deployments as OptimisticEnabledDeploymentsHub;
    console.log(`\tUpdating RootManager (${hub.RootManager.address})...`);
    await updateIfNeeded(
      optimistic
        ? {
            ...schema,
            deployment: hub.RootManager,
            auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === wallet.address.toLowerCase() },
          }
        : {
            ...schema,
            deployment: hub.RootManager,
          },
    );
  }
};
