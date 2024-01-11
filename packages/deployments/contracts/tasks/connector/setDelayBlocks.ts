import { Contract } from "ethers";
import { task } from "hardhat/config";

import {
  Env,
  getConnectorName,
  getDeploymentName,
  getMessagingProtocolConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../../src/utils";

type TaskArgs = {
  blocks: number;
  disputeBlocks?: number;
  minDisputeBlocks?: number;
  env?: Env;
  networkType?: ProtocolNetwork;
};

export default task("delay-blocks-connector", "set delay blocks at connector")
  .addOptionalParam("blocks", "number of blocks set for delay")
  .addOptionalParam("disputeBlocks", "number of blocks set for dispute")
  .addOptionalParam("minDisputeBlocks", "number of min blocks set for dispute")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(
    async (
      {
        blocks: _blocks,
        disputeBlocks: _disputeBlocks,
        minDisputeBlocks: _minDisputeBlocks,
        env: _env,
        networkType,
      }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);
      const blocks = _blocks ?? 0;
      const disputeBlocks = _disputeBlocks ?? blocks;
      const minDisputeBlocks = _minDisputeBlocks ?? disputeBlocks / 2;

      console.log("env:", env);
      console.log("blocks:", blocks);
      console.log("disputeBlocks:", disputeBlocks);
      console.log("minDisputeBlocks:", minDisputeBlocks);
      console.log("networkType: ", networkType);
      const network = await ethers.provider.getNetwork();
      const protocolConfig = getMessagingProtocolConfig(networkType ?? ProtocolNetwork.TESTNET);

      const deploymentName = getDeploymentName(
        getConnectorName(protocolConfig, +network.chainId),
        env,
        protocolConfig.configs[network.chainId].networkName,
      );
      const deployment = await deployments.get(deploymentName);
      const address = deployment.address;
      console.log(deploymentName, "connector:", address);

      const connector = new Contract(address, deployment.abi, deployer);

      const minDisputeBlocksTx = await connector.setMinDisputeBlocks(minDisputeBlocks);
      console.log("connector setMinDisputeBlocks tx: ", minDisputeBlocksTx);
      let receipt = await minDisputeBlocksTx.wait();
      console.log("connector setMinDisputeBlocks tx mined: ", receipt.transactionHash);

      const disputeBlocksTx = await connector.setDisputeBlocks(disputeBlocks);
      console.log("connector setDisputeBlocks tx: ", disputeBlocksTx);
      receipt = await disputeBlocksTx.wait();
      console.log("connector setDelayBlocks tx mined: ", receipt.transactionHash);

      const delayBlocksTx = await connector.setDelayBlocks(blocks);
      console.log("connector setDelayBlocks tx: ", delayBlocksTx);
      receipt = await delayBlocksTx.wait();
      console.log("connector setDelayBlocks tx mined: ", receipt.transactionHash);
    },
  );
