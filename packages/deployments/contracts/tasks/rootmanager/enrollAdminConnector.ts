import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  deployment: string;
  env?: Env;
  apply?: string;
};

export default task("enroll-admin-connector", "A task to enroll an AdminHubConnector for the given chain")
  .addParam("deployment", "Name of the AdminHubConnector to enroll on RootManager")
  .addOptionalParam("apply", "Whether to apply or just log transactions. Defaults to false.")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env, apply: _apply, deployment }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);
    const apply = _apply === "true" || false;
    console.log("apply:", apply);

    // get rootmanager
    const rootManagerName = getDeploymentName("RootManager", env);
    const rootManagerDeployment = await deployments.get(rootManagerName);
    if (!rootManagerDeployment) {
      throw new Error(`No ${rootManagerName} found`);
    }
    console.log("rootManagerAddress: ", rootManagerDeployment.address);
    const rootManager = new Contract(rootManagerDeployment.address, rootManagerDeployment.abi, deployer);

    // get admin connector
    const adminConnectorName = getDeploymentName(deployment, env);
    const adminConnectorDeployment = await deployments.get(adminConnectorName);
    if (!adminConnectorDeployment) {
      throw new Error(`No ${adminConnectorName} found`);
    }
    console.log("adminConnectorAddress: ", adminConnectorDeployment.address);
    const connector = new Contract(adminConnectorDeployment.address, adminConnectorDeployment.abi, deployer);

    // remove connector if needed
    const enrolledDomain = await connector.MIRROR_DOMAIN();
    const isEnrolled = await rootManager.isDomainSupported(enrolledDomain);
    if (isEnrolled) {
      console.log(`Need to replace existing domain connector.`);
      const tx = {
        value: "0",
        to: rootManager.address,
        data: rootManager.interface.encodeFunctionData("removeConnector", [enrolledDomain]),
      };
      console.log("removeConnector tx data: ", tx);
      if (apply) {
        const submitted = await deployer.sendTransaction(tx);
        console.log("removeConnector tx: ", submitted);
        const receipt = await submitted.wait();
        console.log("removeConnector tx mined: ", receipt.transactionHash);
      }
    }

    // enroll the admin connector
    const tx = {
      value: "0",
      to: rootManager.address,
      data: rootManager.interface.encodeFunctionData("addConnector", [enrolledDomain, connector.address]),
    };
    console.log("addConnector tx data: ", tx);
    if (apply) {
      const submitted = await deployer.sendTransaction(tx);
      console.log("addConnector tx: ", submitted);
      const receipt = await submitted.wait();
      console.log("addConnector tx mined: ", receipt.transactionHash);
    }
  });
