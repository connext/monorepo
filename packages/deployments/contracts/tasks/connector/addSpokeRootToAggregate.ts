import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  root: string;
  deployment: string;
  env?: Env;
};

export default task("add-spoke-root", "Call `AdminHubConnector.addSpokeRootToAggregate()` to distribute outbound root")
  .addParam("root", "The spoke root to insert into the root manager")
  .addParam("deployment", "The deployment name of the AdminHubConnector")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ root, deployment: _deployment, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    const deploymentName = _deployment;
    console.log("env:", env);
    console.log("deploymentName:", deploymentName);

    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log(deploymentName, "connector:", address);

    const connector = new Contract(address, deployment.abi, deployer);

    const tx = {
      to: connector.address,
      from: await connector.owner(),
      data: connector.interface.encodeFunctionData("addSpokeRootToAggregate", [root]),
      value: "0",
    };
    console.log("addSpokeRootToAggregate data: ", tx);

    if (deployer.address.toLowerCase() !== tx.from.toLowerCase()) {
      throw new Error("Deployer address is not owner");
    }

    const submitted = await deployer.sendTransaction(tx);
    console.log("submitted: ", submitted);
    const receipt = await submitted.wait();
    console.log("mined: ", receipt.transactionHash);
  });
