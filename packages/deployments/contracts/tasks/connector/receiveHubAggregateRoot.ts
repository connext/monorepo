import { Contract, Wallet } from "ethers";
import { task } from "hardhat/config";

import {
  Env,
  ProtocolNetwork,
  getConnectorName,
  getContractAddressAndAbi,
  getDeploymentName,
  getMessagingProtocolConfig,
  getProviderFromHardhatConfig,
  mustGetEnv,
} from "../../src/utils";
import hardhatConfig from "../../hardhat.config";

type TaskArgs = {
  env?: Env;
};

export default task("receive-hub-root", "Call `AdminSpokeConnector.receiveHubAggregateRoot()` to receive outbound root")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ env: _env }: TaskArgs, { deployments, ethers }) => {
    const network = await ethers.provider.getNetwork();
    const chainId = +network.chainId;
    const networkConfig = Object.values(hardhatConfig.networks!).find((n) => n?.chainId === chainId)!;
    const deployer = Wallet.fromMnemonic((networkConfig.accounts as any).mnemonic as unknown as string);

    const env = mustGetEnv(_env);
    console.log("env:", env);

    const protocolConfig = getMessagingProtocolConfig("testnet" as ProtocolNetwork);
    const hubChainId = protocolConfig.hub.chain;
    const connectorName = getConnectorName(protocolConfig, chainId);
    if (!connectorName.includes("AdminSpoke")) {
      throw new Error("Not Admin Spoke Connector Chain!");
    }

    const rootManagerDeployment = getContractAddressAndAbi(getDeploymentName("RootManager"), hubChainId);
    if (!rootManagerDeployment.address) {
      throw new Error(`RootManager (hub) not deployed`);
    }
    const hubProvider = getProviderFromHardhatConfig(hubChainId);
    const rootManagerContract = new Contract(rootManagerDeployment.address, rootManagerDeployment.abi, hubProvider);
    const lastSavedAggregateRootTimestamp = await rootManagerContract.lastSavedAggregateRootTimestamp();
    const aggregateRoot = await rootManagerContract.validAggregateRoots(lastSavedAggregateRootTimestamp);

    const deploymentName = getDeploymentName(connectorName, "production", protocolConfig.configs[chainId].networkName);
    const deployment = await deployments.get(deploymentName);
    const address = deployment.address;
    console.log(deploymentName, "connector:", address);

    const connector = new Contract(address, deployment.abi, deployer);

    const tx = {
      to: connector.address,
      from: await connector.owner(),
      data: connector.interface.encodeFunctionData("receiveHubAggregateRoot", [aggregateRoot]),
      value: "0",
    };
    console.log("receiveHubAggregateRoot data: ", tx);

    if (deployer.address.toLowerCase() !== tx.from.toLowerCase()) {
      throw new Error("Deployer address is not owner");
    }

    const submitted = await deployer.sendTransaction(tx);
    console.log("submitted: ", submitted);
    const receipt = await submitted.wait();
    console.log("mined: ", receipt.transactionHash);
  });
