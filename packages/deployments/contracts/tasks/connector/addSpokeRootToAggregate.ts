import { Contract } from "ethers";
import { task } from "hardhat/config";
import { domainToChainId } from "@connext/nxtp-utils";

import {
  Env,
  getConnectorName,
  getDeploymentName,
  getMessagingProtocolConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../../src/utils";

type TaskArgs = {
  root: string;
  spoke: string;
  env?: Env;
  networkType?: ProtocolNetwork;
};

export default task("add-spoke-root", "Call `AdminHubConnector.addSpokeRootToAggregate()` to distribute outbound root")
  .addParam("root", "The spoke root to insert into the root manager")
  .addParam("spoke", "The spoke domain")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ root, spoke, env: _env, networkType: _networkType }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    const networkType = _networkType ?? process.env.NETWORK ?? ProtocolNetwork.TESTNET;
    console.log("networkType: ", networkType);
    console.log("env:", env);
    const protocolConfig = getMessagingProtocolConfig(networkType as ProtocolNetwork);

    const deploymentName = getDeploymentName(
      getConnectorName(protocolConfig, domainToChainId(+spoke), protocolConfig.hub),
      undefined,
      protocolConfig.configs[domainToChainId(+spoke)].networkName,
    );
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
