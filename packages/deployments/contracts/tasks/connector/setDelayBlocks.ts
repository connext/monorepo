import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getConnectorName, getDeploymentName, getMessagingProtocolConfig, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  blocks: number;
  env?: Env;
};

export default task("delay-blocks-connector", "set delay blocks at connector")
  .addOptionalParam("blocks", "number of blocks set for delay")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ blocks: _blocks, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    const blocks = _blocks ?? 0;
    console.log("env:", env);
    console.log("blocks:", blocks);
    const network = await ethers.provider.getNetwork();
    const protocolConfig = getMessagingProtocolConfig(env);

    const deploymentName = getDeploymentName(getConnectorName(protocolConfig, +network.chainId), env);
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log(deploymentName, "connector:", address);

    const connector = new Contract(address, deployment.abi, deployer);

    const tx = await connector.setDelayBlocks(blocks);
    console.log("connector setDelayBlocks tx: ", tx);
    const receipt = await tx.wait();
    console.log("connector setDelayBlocks tx mined: ", receipt.transactionHash);
  });
