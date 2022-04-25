import { HardhatRuntimeEnvironment } from "hardhat/types";

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
