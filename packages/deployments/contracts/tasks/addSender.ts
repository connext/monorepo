import { Contract } from "ethers";
import { task } from "hardhat/config";

import {
  Env,
  getConnectorName,
  getDeploymentName,
  getMessagingProtocolConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../src/utils";
import { getHexDomainFromString } from "../src";

type TaskArgs = {
  sender: string;
  connectorAddress?: string;
  env?: Env;
  networkType?: ProtocolNetwork;
};

export default task("add-sender", "Add sender to connector allowlist")
  .addParam("sender", "The address of sender to add")
  .addOptionalParam("connectorAddress", "Override connector address")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(
    async (
      { sender, connectorAddress: _connectorAddress, env: _env, networkType: _networkType }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const env = mustGetEnv(_env);
      console.log("env:", env);
      console.log("sender: ", sender);

      console.log(getHexDomainFromString("linm"));
      return;

      const network = await ethers.provider.getNetwork();
      const networkType = _networkType ?? ProtocolNetwork.TESTNET;

      const protocol = getMessagingProtocolConfig(networkType);

      const connectorName = getDeploymentName(getConnectorName(protocol, +network.chainId), env);
      console.log("connectorName:", connectorName);
      const connectorDeployment = await deployments.get(connectorName);
      const connectorAddress = _connectorAddress ?? connectorDeployment.address;
      console.log("connectorAddress:", connectorAddress);

      const connector = new Contract(connectorAddress, connectorDeployment.abi, deployer);

      if (await connector.allowlistedSenders(connectorAddress)) {
        console.log(`sender already allowlisted`);
        return;
      }

      const tx = await connector.addSender(sender);
      console.log("addSender tx: ", tx);
      const receipt = await tx.wait();
      console.log("addSender tx mined: ", receipt.transactionHash);
    },
  );
