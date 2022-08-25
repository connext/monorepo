import { config } from "dotenv";
import { HardhatRuntimeEnvironment } from "hardhat/types";
config();

export type Env = "staging" | "production" | "local";

export const mustGetEnv = (_env?: string) => {
  const env = _env ?? process.env.ENV ?? "staging";
  if (env !== "staging" && env !== "production" && env !== "local") {
    throw new Error(`Unrecognized env: ${env}`);
  }
  return env;
};

export const getProtocolNetwork = (_chain: string | number, _env?: string): "mainnet" | "testnet" | "local" => {
  const chain = _chain.toString();
  const env = _env ?? mustGetEnv();
  // If chain 1337 or 1338, use local network.
  return chain === "1337" || chain === "1338"
    ? "local"
    : // TODO: we need production testnet and mainnet
    // @jake pls take another look at this
    env === "production"
    ? "testnet"
    : // 'staging' env => testnet
    env === "staging"
    ? "testnet"
    : // Default to local otherwise.
      "local";
};

// These contracts do not have a `Staging` deployment
const NON_STAGING_CONTRACTS = ["TestERC20", "TestWETH", "LPToken"];

export const getDeploymentName = (contractName: string, _env?: string) => {
  const env = mustGetEnv(_env);

  if (env !== "staging" || NON_STAGING_CONTRACTS.includes(contractName)) {
    return contractName;
  }
  return `${contractName}Staging`;
};

export const verify = async (
  hre: HardhatRuntimeEnvironment,
  address: string,
  constructorArguments: any[] = [],
  libraries: Record<string, string> = {},
) => {
  try {
    await hre.run("verify:verify", {
      address,
      constructorArguments,
      libraries,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log(`${address} already verified`);
      return;
    }
    console.log(`Error verifying contract at ${address}:`, e);
  }
};
