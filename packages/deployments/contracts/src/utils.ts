import { config } from "dotenv";
import { HardhatRuntimeEnvironment } from "hardhat/types";
config();

export const getDeploymentName = (contractName: string) => {
  const env = process.env.ENV ?? "staging";
  if (env !== "staging" && env !== "production") {
    throw new Error(`Unrecognized env: ${env}`);
  }

  if (env === "staging") {
    return `${contractName}Staging`;
  }
  return contractName;
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
  } catch (e: unknown) {
    console.log(`Error verifying contract at ${address}`, e);
  }
};
