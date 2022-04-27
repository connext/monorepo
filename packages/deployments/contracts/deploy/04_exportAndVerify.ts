import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import { getDeploymentName, verify } from "../src/utils";

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  console.log("\n============================= Exporting + Verifying Deployments ===============================");
  await hre.run("export", {
    exportAll: "./deployments.json",
  });

  await hre.run("etherscan-verify", {
    solcInput: true,
  });

  // NOTE: because of the library usage, the `Connext_Implementation`, `StableSwap` contracts
  // often do not verify properly. Verify those contracts independently

  const UNVERIFIABLE_CONTRACTS = [
    {
      name: getDeploymentName("ConnextHandler") + "_Implementation",
      libraries: {
        // AssetLogic: (await hre.deployments.get(getDeploymentName("AssetLogic"))).address,
        ConnextLogic: (await hre.deployments.get(getDeploymentName("ConnextLogic"))).address,
        RouterPermissionsManagerLogic: (await hre.deployments.get(getDeploymentName("RouterPermissionsManagerLogic")))
          .address,
      },
      constructorArgs: [],
    },
    {
      name: getDeploymentName("StableSwap"),
      libraries: {
        SwapUtils: (await hre.deployments.get(getDeploymentName("SwapUtils"))).address,
        AmplificationUtils: (await hre.deployments.get(getDeploymentName("AmplificationUtils"))).address,
      },
      constructorArgs: [],
    },
  ];

  await Promise.all(
    UNVERIFIABLE_CONTRACTS.map(async ({ name, libraries, constructorArgs }) => {
      console.log("verifying:", name);
      const implementation = await hre.deployments.get(name);
      await verify(hre, implementation.address, constructorArgs, libraries as unknown as Record<string, string>);
    }),
  );
};

export default func;
func.tags = ["ExportAndVerify"];
func.dependencies = ["Connext", "StableSwap"];
