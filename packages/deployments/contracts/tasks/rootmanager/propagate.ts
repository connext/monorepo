import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  env?: Env;
};

export default task("propagate", "Propagate aggregate root from RootManager")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);

    const deploymentName = getDeploymentName("RootManager", env);
    const rootManagerDeployment = await deployments.get(deploymentName);
    if (!rootManagerDeployment) {
      throw new Error(`No ${deploymentName} found`);
    }
    console.log("rootManagerAddress: ", rootManagerDeployment.address);

    const rootManager = new Contract(rootManagerDeployment.address, rootManagerDeployment.abi, deployer);

    const domains = [1887071092, 9991, 1735353714, 1734439522, 1735356532, 2053862260, 1668247156];
    const connectors = [
      "0xd045f03686575f042b21d0b3d20ffae4d3a3482f",
      "0x9060e2b92a4e8d4ead05b7f3d736e3da33955fa5",
      "0xe9c7095c956f9f75e21dd99027adf6bfffa9ba9a",
      "0x58d3464e5aab9c598a7059d182720a04ad59b01f",
      "0x49174424e29950ad18d07b4d9ad2f77d0cbdda2a",
      "0x80231092091d752e1506d4aab393675ebe388e9e",
      "0xe154f99dcef23005b58a445a8e7c654b399b5d4b",
    ];
    const fees = ["0", "0", "0", "115627218560000", "0", "2500000000000000", "0"];
    const encodedBytes = [
      "0x",
      "0x",
      "0x",
      "0x0000000000000000000000000000000000000000000000000000043564a8c58000000000000000000000000000000000000000000000000000000000000d07550000000000000000000000000000000000000000000000000000000007bfa480",
      "0x",
      "0x00000000000000000000000000000000000000000000000000000000004c4b40",
      "0x",
    ];

    console.log("domains:", domains);
    console.log("connectors:", connectors);
    const tx = await rootManager.propagate(connectors, fees, encodedBytes);
    console.log("propogate tx: ", tx);
    const receipt = await tx.wait();
    console.log("propogate tx mined: ", receipt.transactionHash);
  });
