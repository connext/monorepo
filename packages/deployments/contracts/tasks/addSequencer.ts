import { Contract } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  sequencer: string;
  connextAddress?: string;
  env?: Env;
};

export default task("add-sequencer", "Add Sequencer to allowlist")
  .addParam("sequencer", "The address of sequencer to add")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ sequencer, connextAddress: _connextAddress, env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }
    console.log("deployer: ", deployer.address);

    const env = mustGetEnv(_env);
    console.log("env:", env);
    console.log("sequencer: ", sequencer);

    const connextName = getDeploymentName("Connext", env);
    const connextDeployment = await deployments.get(connextName);
    const connextAddress = _connextAddress ?? connextDeployment.address;
    console.log("connextAddress: ", connextAddress);

    const connext = new Contract(connextAddress, connextDeployment.abi, deployer);

    if (!isAddress(sequencer) || sequencer === ethers.constants.AddressZero) {
      throw new Error("Invalid Sequencer address");
    }

    const approvedSequencer = await connext.approvedSequencers(sequencer);
    console.log("approvedSequencer: ", approvedSequencer);
    if (approvedSequencer) {
      throw new Error("Already approved sequencer");
    }

    const tx = await connext.addSequencer(sequencer);
    console.log("addSequencer tx: ", tx);
    const receipt = await tx.wait();
    console.log("addSequencer tx mined: ", receipt.transactionHash);
  });
