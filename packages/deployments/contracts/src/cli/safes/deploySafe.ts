import commandLineArgs from "command-line-args";
import { writeFileSync } from "fs";
import { constants, Contract, providers, utils, Wallet } from "ethers";
import { domainToChainId } from "@connext/nxtp-utils";

import { getProviderFromHardhatConfig } from "../../utils";
import { SUPPORTED_DOMAINS } from "../helpers";
import { getSafeConfigForChain } from "./helpers";
import { TransactionReceipt } from "zksync-ethers/build/src/types";

export const optionDefinitions = [
  { name: "domains", type: Number, multiple: true },
  { name: "owners", type: String, multiple: true },
  { name: "threshold", type: Number, defaultValue: 1 },
  { name: "salt", type: String, defaultValue: Date.now().toString() },
  { name: "apply", type: Boolean, defaultValue: false },
  { name: "write", type: Boolean, defaultValue: true },
];

export const deploySafe = async () => {
  let cmdArgs: any;
  try {
    cmdArgs = commandLineArgs(optionDefinitions);
  } catch (err: any) {
    throw new Error(`Parsing arguments failed, cmdArgs: ${process.argv}`);
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
  const wallet = privateKey ? new Wallet(privateKey) : Wallet.fromMnemonic(mnemonic!);

  // get default config values
  const { domains: _domains, owners, salt, threshold, apply, write } = cmdArgs;
  const domains = (_domains as number[]) ?? SUPPORTED_DOMAINS["mainnet"];

  if (owners.length === 0) {
    throw new Error("Owners must be specified");
  }

  if (threshold > owners.length) {
    throw new Error("Threshold must be less than or equal to the number of owners");
  }

  // Get the following for each domain:
  // - rpc url
  // - safe mastercopy
  // - fallback handler
  // - proxy factory
  const config: Record<
    number,
    {
      provider: providers.JsonRpcProvider;
      safeMastercopy: Contract;
      fallbackHandler: Contract;
      proxyFactory: Contract;
    }
  > = {};
  for (const domain of domains) {
    // Get the rpc
    const chain = domainToChainId(domain);
    const provider = getProviderFromHardhatConfig(chain);

    // Ensure the sender has sufficient balance
    if ((await provider.getBalance(wallet.address)).lt(utils.parseEther("0.01"))) {
      throw new Error("Insufficient balance of " + wallet.address + "on" + chain.toString());
    }

    // Generate the config
    config[domain] = {
      provider,
      ...(await getSafeConfigForChain(provider, wallet)),
    };
  }

  // Deploy the safe for each chain
  const ret: Record<number, string> = {};
  for (const domain of domains) {
    const { safeMastercopy, fallbackHandler, proxyFactory, provider } = config[domain];

    // Get the safe version
    const version = await safeMastercopy.VERSION();

    // Get the init code
    const initCode = safeMastercopy.interface.encodeFunctionData("setup", [
      owners,
      threshold,
      constants.AddressZero, // to
      "0x", // data
      fallbackHandler.address,
      constants.AddressZero, // payment token
      constants.Zero, // payment
      constants.AddressZero, // payment receiver
    ]);

    // Calculate the address
    const chain = domainToChainId(domain);
    const expectedSlot = await provider.call({
      to: proxyFactory.address,
      data: proxyFactory.interface.encodeFunctionData("createProxyWithNonce", [safeMastercopy.address, initCode, salt]),
      chainId: chain,
    });
    const expected = "0x" + expectedSlot.split(`0x`)[1].substring(24);

    // Calculate the address
    console.log(`Deploying SAFE on ${domain} (${chain}):`);
    console.log(`- Sender      :`, wallet.address);
    console.log(`- Owners      :`, owners.join(", "));
    console.log(`- Threshold   :`, threshold);
    console.log(`- Salt        :`, salt);
    console.log(`- Version     :`, version);
    console.log(`- Mastercopy  :`, safeMastercopy.address);
    console.log(`- Fallback    :`, fallbackHandler.address);
    console.log(`- ProxyFactory:`, proxyFactory.address);
    console.log(`- Expected    :`, expected);

    ret[domain] = expected;

    if (!apply) {
      console.log(``);
      continue;
    }

    // Deploy the safe
    const tx = await proxyFactory.createProxyWithNonce(safeMastercopy.address, initCode, salt);
    console.log(`\tTx hash :`, tx.hash);
    const receipt: TransactionReceipt = await tx.wait(1);
    console.log(`\tTx mined:`, receipt.transactionHash);
    console.log(`\tDeployed:`, (await provider.getCode(expected)) !== "0x" ? expected : "error");
    console.log(``);
  }

  if (!write) {
    return;
  }

  writeFileSync("safes.json", JSON.stringify(ret));
};
