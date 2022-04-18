import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import { getDeploymentName } from "../src/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre;

  let deployer;
  ({ deployer } = await hre.getNamedAccounts());
  if (!deployer) {
    [deployer] = await hre.getUnnamedAccounts();
  }
  console.log("============================= Deploying StableSwap ===============================");
  console.log("deployer: ", deployer);

  /////////////////////////////////////////////////////////////////////////////////
  ////  LP Token
  /////////////////////////////////////////////////////////////////////////////////
  // NOTE: *NOT* using -Staging deployment for LP token
  const lpToken = await deployments.getOrNull("LPToken");
  if (lpToken) {
    console.log(`reusing "LPToken" at ${lpToken.address}`);
  } else {
    await deployments.deploy("LPToken", {
      from: deployer,
      log: true,
      skipIfAlreadyDeployed: true,
    });

    await deployments.execute(
      "LPToken",
      { from: deployer, log: true },
      "initialize",
      "Nxtp Stable LP Token",
      "NxtpStableLPToken",
    );
  }

  /////////////////////////////////////////////////////////////////////////////////
  ////  AmplificationUtils
  /////////////////////////////////////////////////////////////////////////////////
  const amplificationUtilsName = getDeploymentName("AmplificationUtils");
  const amplificationUtilsDeployment = await deployments.deploy(amplificationUtilsName, {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
    contract: "AmplificationUtils",
  });

  /////////////////////////////////////////////////////////////////////////////////
  ////  SwapUtils
  /////////////////////////////////////////////////////////////////////////////////
  const swapUtilsName = getDeploymentName("SwapUtils");
  const swapUtilsDeployment = await deployments.deploy(swapUtilsName, {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
    contract: "SwapUtils",
  });

  /////////////////////////////////////////////////////////////////////////////////
  ////  StableSwap
  /////////////////////////////////////////////////////////////////////////////////
  const stableSwapName = getDeploymentName("StableSwap");
  const stableSwapDeployment = await deployments.deploy(stableSwapName, {
    from: deployer,
    log: true,
    libraries: {
      SwapUtils: swapUtilsDeployment.address,
      AmplificationUtils: amplificationUtilsDeployment.address,
    },
    skipIfAlreadyDeployed: true,
    contract: "StableSwap",
  });

  try {
    //verify stable swap contract
    await hre.run("verify:verify", {
      address: stableSwapDeployment.address,
      constructorArguments: [],
      libraries: {
        SwapUtils: swapUtilsDeployment.address,
        AmplificationUtils: amplificationUtilsDeployment.address,
      },
    });
  } catch (e: unknown) {
    console.log("Error while verify stableswap contract", stableSwapDeployment.address, e);
  }
};

export default func;
func.tags = ["StableSwap"];
