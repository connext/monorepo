import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../src/utils";

type TaskArgs = {
  transferId: string;
  relayerFee: string;
  sequencer: string;
  connextAddress?: string;
  env?: Env;
};

export default task("bump-transfer", "Bump a transfer")
  .addParam("transferId", "The transfer Id")
  .addParam("relayerFee", "The fee amount to pay")
  .addOptionalParam("connextAddress", "Override connext address")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(
    async (
      { transferId, relayerFee, connextAddress: _connextAddress, env: _env }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }
      console.log("deployer: ", deployer.address);

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("sequencer: ", transferId);
      console.log("relayerFee: ", relayerFee);

      const connextName = getDeploymentName("Connext", env);
      const connextDeployment = await deployments.get(connextName);
      const connextAddress = _connextAddress ?? connextDeployment.address;
      console.log("connextAddress: ", connextAddress);

      const connext = new Contract(connextAddress, connextDeployment.abi, deployer);

      const tx = await connext["bumpTransfer(bytes32)"](transferId, { value: relayerFee });

      console.log("bumpTransfer tx: ", tx);
      const receipt = await tx.wait();
      console.log("bumpTransfer tx mined: ", receipt.transactionHash);
    },
  );
