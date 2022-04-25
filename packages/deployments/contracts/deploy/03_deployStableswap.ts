import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Wallet } from "ethers";

import { getDeploymentName } from "../src/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre;

  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying StableSwap ===============================");
  console.log("deployer: ", deployer.address);

  /////////////////////////////////////////////////////////////////////////////////
  ////  LP Token
  /////////////////////////////////////////////////////////////////////////////////
  // NOTE: *NOT* using -Staging deployment for LP token
  const lpToken = await deployments.getOrNull("LPToken");
  if (lpToken) {
    console.log(`reusing "LPToken" at ${lpToken.address}`);
  } else {
    await deployments.deploy("LPToken", {
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
    });

    await deployments.execute(
      "LPToken",
      { from: deployer.address, log: true },
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
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
    contract: "AmplificationUtils",
  });

  /////////////////////////////////////////////////////////////////////////////////
  ////  SwapUtils
  /////////////////////////////////////////////////////////////////////////////////
  const swapUtilsName = getDeploymentName("SwapUtils");
  const swapUtilsDeployment = await deployments.deploy(swapUtilsName, {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
    contract: "SwapUtils",
  });

  /////////////////////////////////////////////////////////////////////////////////
  ////  StableSwap
  /////////////////////////////////////////////////////////////////////////////////
  const stableSwapName = getDeploymentName("StableSwap");
  await deployments.deploy(stableSwapName, {
    from: deployer.address,
    log: true,
    libraries: {
      SwapUtils: swapUtilsDeployment.address,
      AmplificationUtils: amplificationUtilsDeployment.address,
    },
    skipIfAlreadyDeployed: true,
    contract: "StableSwap",
  });
};

export default func;
func.tags = ["StableSwap"];
