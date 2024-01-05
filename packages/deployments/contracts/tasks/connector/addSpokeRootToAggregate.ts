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

export default task("add-spoke-root", "Call `AdminHubConnector.addSpokeRootToAggregate()` to distribute outbound root")
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

    const hubConnectorDeployment = getContractAddressAndAbi(
      getDeploymentName(
        getConnectorName(protocolConfig, chainId, hubChainId),
        "production",
        protocolConfig.configs[chainId].networkName,
      ),
      hubChainId,
    );
    if (!hubConnectorDeployment.address) {
      throw new Error(`Hub Connector not deployed`);
    }

    const deploymentName = getDeploymentName(connectorName, "production", protocolConfig.configs[chainId].networkName);
    const spokeConnectorDeployment = await deployments.get(deploymentName);
    const spokeConnector = new Contract(
      spokeConnectorDeployment.address,
      spokeConnectorDeployment.abi,
      getProviderFromHardhatConfig(chainId),
    );
    const outboundRoot = await spokeConnector.outboundRoot();
    console.log("outbound root of spoke connector", connectorName, outboundRoot);

    const hubProvider = getProviderFromHardhatConfig(hubChainId);
    const hubConnectorContract = new Contract(hubConnectorDeployment.address, hubConnectorDeployment.abi, hubProvider);

    const tx = {
      to: hubConnectorContract.address,
      from: await hubConnectorContract.owner(),
      data: hubConnectorContract.interface.encodeFunctionData("addSpokeRootToAggregate", [outboundRoot]),
      value: "0",
    };
    console.log("addSpokeRootToAggregate data: ", tx);

    if (deployer.address.toLowerCase() !== tx.from.toLowerCase()) {
      throw new Error("Deployer address is not owner");
    }

    const submitted = await deployer.connect(hubProvider!).sendTransaction(tx);
    console.log("submitted: ", submitted);
    const receipt = await submitted.wait();
    console.log("mined: ", receipt.transactionHash);
  });
