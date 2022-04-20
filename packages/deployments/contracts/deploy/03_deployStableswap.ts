import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

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
  await deployments.deploy("AmplificationUtils", {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  /////////////////////////////////////////////////////////////////////////////////
  ////  SwapUtils
  /////////////////////////////////////////////////////////////////////////////////
  await deployments.deploy("SwapUtils", {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  /////////////////////////////////////////////////////////////////////////////////
  ////  StableSwap
  /////////////////////////////////////////////////////////////////////////////////
  const stableSwapDeployment = await deployments.deploy("StableSwap", {
    from: deployer,
    log: true,
    libraries: {
      SwapUtils: (await deployments.get("SwapUtils")).address,
      AmplificationUtils: (await deployments.get("AmplificationUtils")).address,
    },
    skipIfAlreadyDeployed: true,
  });

  try {
    //verify stable swap contract
    await hre.run("verify:verify", {
      address: stableSwapDeployment.address,
      constructorArguments: [],
      libraries: {
        SwapUtils: (await deployments.get("SwapUtils")).address,
        AmplificationUtils: (await deployments.get("AmplificationUtils")).address,
      },
    });
  } catch (e: unknown) {
    console.log("Errow while verify stableswap contract", stableSwapDeployment.address);
  }
};

export default func;
func.tags = ["StableSwap"];
