import commandLineArgs from "command-line-args";
import { BigNumber, constants, Contract, providers, Wallet } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { chainIdToDomain, domainToChainId } from "@connext/nxtp-utils";

import { Env, getProviderFromHardhatConfig } from "../../utils";
import { hardhatNetworks } from "../../config";
import { HUBS, SUPPORTED_DOMAINS, Deployment, updateIfNeeded } from "../helpers";

import {
  DAO_CONTRACTS,
  getOwnableDeployments,
  HubMessagingOwnableDeployments,
  OwnableDeployment,
  PROTOCOL_ADMINS,
  ROUTER_ADMINS,
  TO_LOCAL_ADMINS,
} from "./helpers";

export const optionDefinitions = [
  { name: "env", type: String, defaultOption: true },
  { name: "network", type: String },
  { name: "apply", type: Boolean, defaultValue: false },
  { name: "domains", type: Number, multiple: true },
];

export const transferOwnership = async () => {
  let cmdArgs: any;
  try {
    cmdArgs = commandLineArgs(optionDefinitions);
  } catch (err: any) {
    throw new Error(`Parsing arguments failed, cmdArgs: ${process.argv}`);
  }

  // get desired wallet if possible
  let desiredWallet: Wallet | undefined;
  if (process.env.DESIRED_WALLET) {
    desiredWallet = Wallet.fromMnemonic(process.env.DESIRED_WALLET!);
  }

  // get deployer
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
  const { env: _env, domains: _domains, network: _network, apply } = cmdArgs;
  const env: Env = _env ?? process.env.ENV ?? "staging";
  const network: "testnet" | "mainnet" = _network ?? process.env.NETWORK ?? "testnet";
  const domains = (_domains as number[]) ?? SUPPORTED_DOMAINS[network];

  console.log("wallet: ", wallet.address);
  console.log("apply:  ", apply);
  console.log("env:    ", env);
  console.log("network:", network);
  console.log("domains:", domains);

  // config validation
  if (!["staging", "production"].includes(env as string)) {
    throw new Error(`Environment should be either staging or production, env: ${env}`);
  }

  if (!["testnet", "mainnet"].includes(network as string)) {
    throw new Error(`Network should be either testnet or mainnet, network: ${network}`);
  }

  // pull all ownable deployments
  const allDeployments: { [chain: number]: OwnableDeployment } = {};
  domains.forEach((domain) => {
    const chain = domainToChainId(domain);
    const config: any = Object.values(hardhatNetworks).find((h: any) => h.chainId === chain);
    if (!config?.url) {
      throw new Error(`No hardhat network config provider found for chain ${chain}`);
    }
    const deployments = getOwnableDeployments(
      chain,
      wallet.connect(getProviderFromHardhatConfig(chain)),
      HUBS[network] === domain,
      env,
    );
    allDeployments[chain] = deployments;
  });

  // for each deployment:
  // - if current owner is correct, ignore
  // - if proposed owner is correct, check deadline.
  //   - if deadline is passed, execute
  //   - if deadline is not passed, ignore
  // - if proposed owner is incorrect, propose new owner
  // only send txs if apply is true, otherwise just log

  // define helper for ^^
  const handleOwnership = async (
    name: string,
    contract: Contract,
    provider: providers.JsonRpcProvider,
    domain: number,
    desired: string,
  ) => {
    // Check the owner
    const owner = await contract.owner();

    if (owner.toLowerCase() === desired.toLowerCase()) {
      // already done, continue
      console.log(
        `no action needed for ${name} (${contract.address.substring(0, 7)}..). owner: ${owner.toLowerCase()}`,
      );
      return;
    }

    const proposed = await contract.proposed();

    let canApply = apply;

    // handle case where the desired owner is already proposed
    if (proposed.toLowerCase() === desired.toLowerCase()) {
      // check deadline
      const timestamp: BigNumber = await contract.proposedTimestamp();
      const delay: BigNumber = await contract.delay();
      const sec = Math.floor(Date.now() / 1000) + 5;
      if (timestamp.add(delay).gt(sec)) {
        // deadline not passed, do nothing
        console.log(
          `desired owner for ${name} (${contract.address.substring(
            0,
            7,
          )}...) already proposed, deadline not elapsed. Waiting ${timestamp.add(delay).sub(sec).toNumber()}s`,
        );
        return;
      }

      // Deadline is passed, execute
      let sender = wallet.connect(provider);
      if (desiredWallet && desiredWallet.address.toLowerCase() === proposed.toLowerCase()) {
        sender = desiredWallet.connect(provider);
      }

      // Sanity check: wallet is proposed
      if (sender.address.toLowerCase() !== proposed.toLowerCase() && apply) {
        canApply = false;
        console.error(`Wallet is not proposed owner, sender: ${sender.address}, proposed: ${proposed}.`);
        console.error(`Skipping transaction.`);
      }

      console.log(`\nAccepting new owner for ${name} (${contract.address}):`);
      console.log(`- current  : ${owner}`);
      console.log(`- accepting: ${desired}`);
      if (canApply) {
        const tx = await contract.connect(sender).acceptProposedOwner();
        console.log(`- tx      : ${tx.hash}`);
        await tx.wait();
        console.log(`- tx mined`);
      } else {
        const data = contract.interface.encodeFunctionData("acceptProposedOwner", []);
        const tx = { to: contract.address, data, chain: domainToChainId(domain) };
        console.log(`- tx      :`, tx);
      }
      return;
    }

    // need to propose new owner
    // Sanity check: wallet is current owner
    if (wallet.address.toLowerCase() !== owner.toLowerCase() && apply) {
      canApply = false;
      console.error(`Wallet is not current owner, wallet: ${wallet.address}, owner: ${owner}`);
      console.error(`Will only log transactions..`);
    }

    // propose new owner
    console.log(`proposing new owner for ${name} (${contract.address}):`);
    console.log(`- current  : ${owner}`);
    console.log(`- proposing: ${desired}`);
    if (canApply) {
      const tx = await contract.connect(wallet.connect(provider)).proposeNewOwner(desired);
      console.log(`- tx       : ${tx.hash}`);
      await tx.wait();
      console.log(`- tx mined`);
    } else {
      const data = contract.interface.encodeFunctionData("proposeNewOwner", [desired]);
      const tx = { to: contract.address, data, chain: domainToChainId(domain) };
      console.log(`- tx       :`, tx);
      console.log(``);
    }
  };

  const shouldTransferToAdmin = (deploymentName: string) =>
    TO_LOCAL_ADMINS.findIndex((contract: string) => deploymentName.includes(contract)) > -1;

  // for each deployment, update the owner
  for (const chain of Object.keys(allDeployments)) {
    const domain = chainIdToDomain(+chain);
    const provider = getProviderFromHardhatConfig(+chain);

    const localDao = DAO_CONTRACTS[network][domain];
    if (!localDao || localDao === constants.AddressZero || !isAddress(localDao)) {
      throw new Error(`Local DAO must be a valid address: ${localDao}`);
    }

    const localAdmin = PROTOCOL_ADMINS[network][domain];
    if (!localAdmin || localAdmin === constants.AddressZero || !isAddress(localAdmin)) {
      throw new Error(`Local Admin must be a valid address: ${localAdmin}`);
    }

    const localRouter = ROUTER_ADMINS[network][domain];
    if (!localRouter || localRouter === constants.AddressZero || !isAddress(localRouter)) {
      throw new Error(`Local router admin must be a valid address: ${localRouter}`);
    }

    console.log(`\n========== Handling router admin on ${chain} ==========`);
    const { Connext } = allDeployments[+chain].execution;
    await updateIfNeeded({
      apply,
      deployment: Connext,
      desired: 1,
      read: { method: "queryRole", args: [localRouter] },
      write: { method: "assignRoleRouterAdmin", args: [localRouter] },
      auth: [
        { method: "owner", eval: (ret: string) => ret.toLowerCase() === wallet.address.toLowerCase() },
        { method: "queryRole", args: [wallet.address], eval: (ret: number) => ret === 3 },
      ],
    });

    console.log(`\n========== Handling execution layer ownership on ${chain} ==========`);
    for (const deployment of Object.values(allDeployments[+chain].execution)) {
      await handleOwnership(
        deployment.name,
        deployment.contract,
        provider,
        domain,
        shouldTransferToAdmin(deployment.name) ? localAdmin : localDao,
      );
    }

    console.log(`\n========== Handling messaging layer ownership on ${chain} ==========`);
    for (const [key, deployments] of Object.entries(allDeployments[+chain].messaging)) {
      if (key === "HubConnectors") {
        // handle separately
        continue;
      }

      await handleOwnership(
        (deployments as Deployment).name,
        (deployments as Deployment).contract,
        provider,
        domain,
        shouldTransferToAdmin((deployments as Deployment).name) ? localAdmin : localDao,
      );
    }

    // handle hub connectors if on hub
    if (HUBS[network] === chainIdToDomain(+chain)) {
      for (const deployments of Object.values(
        (allDeployments[+chain].messaging as HubMessagingOwnableDeployments).HubConnectors,
      )) {
        await handleOwnership(deployments.name, deployments.contract, provider, domain, localDao);
      }
    }
  }
};
