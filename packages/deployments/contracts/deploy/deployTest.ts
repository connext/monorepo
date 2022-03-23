import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre;

  let deployer;
  ({ deployer } = await hre.getNamedAccounts());
  if (!deployer) {
    [deployer] = await hre.getUnnamedAccounts();
  }
  console.log("deploying stable swap");
  console.log("deployer: ", deployer);

  /////////////////////////////////////////////////////////////////////////////////
  ////  LP Token
  /////////////////////////////////////////////////////////////////////////////////
  const BridgeRouter = await deployments.deploy("BridgeRouter", {
    from: deployer,
    log: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        methodName: "initialize",
        args: ["0x5ab3BE5702925702c70e7fF328790C0c4dCB88E1", "0x6C2D6E405830c9C00519502E51cBB07d1ba24FA7"],
      },
    },
  });
  console.log(BridgeRouter);
};

export default func;
func.tags = ["Test"];
