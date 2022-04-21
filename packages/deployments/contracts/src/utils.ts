import { config } from "dotenv";
import { HardhatRuntimeEnvironment } from "hardhat/types";
config();

export type Env = "staging" | "production";

export const mustGetEnv = (_env?: string) => {
  const env = _env ?? process.env.ENV ?? "staging";
  if (env !== "staging" && env !== "production") {
    throw new Error(`Unrecognized env: ${env}`);
  }
  return env;
};

// These contracts do not have a `Staging` deployment
const NON_STAGING_CONTRACTS = ["TestERC20", "LPToken"];

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
